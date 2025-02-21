import React, { useState } from 'react';
import axios from 'axios';

const LbForm = () => {
  const [formData, setFormData] = useState({
    rawWater: '',
    treatedWaterTP: '',
    treatedWaterDistribution: '',
    wqIssues: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form data to the server
    try {
      const response = await axios.post('/api/submit', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit Water Quality Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Raw Water</label>
          <input
            type="text"
            name="rawWater"
            value={formData.rawWater}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Treated Water-TP</label>
          <input
            type="text"
            name="treatedWaterTP"
            value={formData.treatedWaterTP}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Treated Water-Distribution</label>
          <input
            type="text"
            name="treatedWaterDistribution"
            value={formData.treatedWaterDistribution}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">WQ Issues</label>
          <textarea
            name="wqIssues"
            value={formData.wqIssues}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LbForm;