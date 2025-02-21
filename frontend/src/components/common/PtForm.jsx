import React, { useState } from 'react';
import axios from 'axios';

const PtForm = () => {
  const [formData, setFormData] = useState({
    schemeBrief: '',
    designedPlantCapacity: '',
    operationalCapacity: '',
    waterSource: '',
    approvedExtractionQuantity: '',
    treatmentPlant: '',
    coverage: '',
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: [...e.target.files],
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
      <h2 className="text-2xl font-bold mb-6">Submit Plant Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Scheme Brief and History (Intake/TP)</label>
          <textarea
            name="schemeBrief"
            value={formData.schemeBrief}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            rows="4"
          />
        </div>
        <div>
          <label className="block mb-2">Photos</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Designed Plant Capacity (cum/day)</label>
          <input
            type="text"
            name="designedPlantCapacity"
            value={formData.designedPlantCapacity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Operational Capacity (cum/day)</label>
          <input
            type="text"
            name="operationalCapacity"
            value={formData.operationalCapacity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Water Source/Ownership</label>
          <input
            type="text"
            name="waterSource"
            value={formData.waterSource}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Approved Extraction Quantity (cum/day)</label>
          <input
            type="text"
            name="approvedExtractionQuantity"
            value={formData.approvedExtractionQuantity}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Treatment Plant (Full/Partial/Cl only/other)</label>
          <input
            type="text"
            name="treatmentPlant"
            value={formData.treatmentPlant}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Coverage (DS/GN areas)</label>
          <input
            type="text"
            name="coverage"
            value={formData.coverage}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
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

export default PtForm;