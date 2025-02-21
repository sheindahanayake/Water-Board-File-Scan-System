import React, { useState, useEffect } from 'react';
import axios from 'axios';

const regionMapping = {
  "CENTRAL EAST": "CENTRAL EAST",
  "CENTRAL NORTH": "CENTRAL NORTH",
  "CENTRAL SOUTH": "CENTRAL SOUTH",
  "MATALE": "MATALE"
};

const regionWSSMapping = {
  "CENTRAL EAST": ['Ampitiya', 'Medadumbara', 'Pallekele', 'Marassana', 'Haragama', 'Digana I', 'Digana II', 'Manikhinna', 'Buluwamuduna', 'Rikillagaskada', 'Ragala', 'Walapane'],
  "CENTRAL NORTH": ['Akurana', 'Ankumbura', 'Bokkawala', 'Galagedara', 'Harispattuwa', 'Galewela', 'Hedeniya', 'Pathadumbara'],
  "CENTRAL SOUTH": ['Udaperadeniya', 'Kadugannawa', 'Hanthna', 'Gannoruwa', 'Eriyagama', 'Nillambe', 'Hanthana', 'Welamboda', 'CY-1 Gampola', 'CY-4 Pussellawa', 'Nawalapitiya', 'Hatton', 'Maskeliya', 'Nallathanniya', 'Sripada', 'PudaluOya', 'Thalawakale', 'Ginigathhena', 'Meepilimanna'],
  "MATALE": ['Matale', 'Raththota', 'Pussella', 'Ukuwela', 'Dambulla', 'Wilgamuwa', 'Ambanganga', 'Naula', 'Galewela']
};

const InputField = ({ label, type, value, onChange, error, options, disabled }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    {type === 'select' ? (
      <select className="w-full p-4 border rounded-lg shadow-md" value={value} onChange={onChange} disabled={disabled}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input type={type} className="w-full p-4 border rounded-lg shadow-md" value={value} onChange={onChange} />
    )}
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
);

const Message = ({ message }) => (
  message && (
    <div className="mt-6 p-4 bg-green-500 text-white rounded-lg text-center">
      {message}
    </div>
  )
);

function Hero() {
  const [region, setRegion] = useState("");
  const [wss, setWss] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [nicNo, setNicNo] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [action, setAction] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [accountNoError, setAccountNoError] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/consumers/count')
      .then(response => setTotalRecords(response.data.total))
      .catch(error => console.error('Error fetching total records:', error));
  }, []);

  const handleUploadClick = () => {
    if (!validateAccountNo()) return;
    const formData = new FormData();
    formData.append('region', region);
    formData.append('wss', wss);
    formData.append('account_no', accountNo);
    formData.append('nic_no', nicNo);
    if (pdfFile) formData.append('pdfFile', pdfFile);

    axios.post('http://127.0.0.1:8000/api/consumers', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => setBackendMessage('Data sent successfully'))
      .catch(error => console.error('Error sending data:', error));
  };

  const handleViewClick = () => {
    if (!validateAccountNo(true)) return;
    const query = accountNo ? `account_no=${accountNo}` : `nic_no=${nicNo}`;
    if (query) {
      axios.get(`http://127.0.0.1:8000/api/consumers/search?${query}`)
        .then(response => {
          const data = response.data;
          if (data.account_numbers) {
            setAccountNumbers(data.account_numbers);
            setBackendMessage(`Multiple account numbers found: ${data.account_numbers.join(', ')}`);
          } else {
            const consumer = data;
            if (consumer.pdf_path) {
              const pdfUrl = `http://127.0.0.1:8000/storage/${consumer.pdf_path}`;
              window.open(pdfUrl, '_blank');
            } else {
              setBackendMessage('PDF not found');
            }
          }
        })
        .catch(error => {
          console.error('Error retrieving data:', error);
          setBackendMessage(error.response?.status === 404 ? 'Consumer not found' : 'Error retrieving data');
        });
    } else {
      setBackendMessage('Please enter either Account No or NIC No');
    }
  };

  const handleDeleteClick = () => {
    if (!validateAccountNo()) return;
    axios.delete(`http://127.0.0.1:8000/api/consumers/${accountNo}`)
      .then(response => setBackendMessage('Data deleted successfully'))
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleAccountNumberClick = (accNo) => {
    setAccountNo(accNo);
    handleViewClick();
  };

  const validateAccountNo = (allowEmpty = false) => {
    if (!allowEmpty && !accountNo) {
      setAccountNoError('Account number is required');
      return false;
    }
    if (accountNo && !/^\d{12}$/.test(accountNo)) {
      setAccountNoError('Account number must be exactly 12 digits');
      return false;
    }
    setAccountNoError('');
    return true;
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white sm:text-7xl md:text-6xl" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(0, 0, 0, 0.6)" }}>
            Consumer Digital Dashboard
          </h1>
          <p className="text-2xl text-white mt-4">Scanned Files: {totalRecords}</p>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl shadow-lg transition-all transform hover:scale-105" onClick={() => setAction('add')}>Add Consumer File</button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl shadow-lg transition-all transform hover:scale-105" onClick={() => setAction('view')}>View Consumer File</button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-xl shadow-lg transition-all transform hover:scale-105" onClick={() => setAction('delete')}>Delete Consumer File</button>
      </div>

      {action === 'add' && (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">Add Consumer File</h2>
          <InputField label="Select Region" type="select" value={region} onChange={(e) => setRegion(e.target.value)} options={Object.keys(regionMapping)} />
          <InputField label="Select WSS" type="select" value={wss} onChange={(e) => setWss(e.target.value)} options={regionWSSMapping[region] || []} disabled={!region} />
          <InputField label="A/C No" type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} error={accountNoError} />
          <InputField label="NIC No" type="text" value={nicNo} onChange={(e) => setNicNo(e.target.value)} />
          <InputField label="Upload PDF" type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
          <div className="flex justify-center gap-8 mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105" onClick={handleUploadClick}>Upload</button>
          </div>
          <Message message={backendMessage} />
        </div>
      )}

      {action === 'view' && (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">View Consumer File</h2>
          <InputField label="A/C No" type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} error={accountNoError} />
          <InputField label="NIC No" type="text" value={nicNo} onChange={(e) => setNicNo(e.target.value)} />
          <div className="flex justify-center mt-6">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105" onClick={handleViewClick}>View PDF</button>
          </div>
          {accountNumbers.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-center mb-4">Select Account Number</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {accountNumbers.map((accNo, index) => (
                  <button key={index} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all transform hover:scale-105" onClick={() => handleAccountNumberClick(accNo)}>
                    {accNo}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Message message={backendMessage} />
        </div>
      )}

      {action === 'delete' && (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">Delete Consumer File</h2>
          <InputField label="A/C No" type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} error={accountNoError} />
          <InputField label="NIC No" type="text" value={nicNo} onChange={(e) => setNicNo(e.target.value)} />
          <div className="flex justify-center mt-6">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105" onClick={handleDeleteClick}>Delete</button>
          </div>
          <Message message={backendMessage} />
        </div>
      )}
    </>
  );
}

export default Hero;