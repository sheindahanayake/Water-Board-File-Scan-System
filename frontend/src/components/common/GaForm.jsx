import React, { useState } from 'react';
import axios from 'axios';

const GaForm = () => {
  const [formData, setFormData] = useState({
    recentCommissionPipelines: { description: '', photos: [], certificates: [] },
    openings: { description: '', photos: [], certificates: [] },
    csrActivities: { description: '', photos: [], certificates: [] },
    certifications150: { description: '', photos: [], certificates: [] },
    certifications5s: { description: '', photos: [], certificates: [] },
    wwdAchievements: { description: '', photos: [], certificates: [] },
    staffAchievements: { description: '', photos: [], certificates: [] },
    other: { description: '', photos: [], certificates: [] },
  });

  const [selectedCategory, setSelectedCategory] = useState('recentCommissionPipelines');

  const handleChange = (e, category, field) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: e.target.value,
      },
    });
  };

  const handleFileChange = (e, category, field) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: [...e.target.files],
      },
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

  const categories = {
    recentCommissionPipelines: 'Recent Commission Pipelines',
    openings: 'Openings',
    csrActivities: 'CSR Activities',
    certifications150: '150 Certifications',
    certifications5s: '5S Certifications',
    wwdAchievements: 'WWD Achievements',
    staffAchievements: 'Any Achievement by Staff Member',
    other: 'Other',
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit General Administration Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block mb-2">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          >
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {categories[category]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">{categories[selectedCategory]}</h3>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name={`${selectedCategory}Description`}
              value={formData[selectedCategory].description}
              onChange={(e) => handleChange(e, selectedCategory, 'description')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Photos</label>
            <input
              type="file"
              name={`${selectedCategory}Photos`}
              multiple
              onChange={(e) => handleFileChange(e, selectedCategory, 'photos')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Certificates</label>
            <input
              type="file"
              name={`${selectedCategory}Certificates`}
              multiple
              onChange={(e) => handleFileChange(e, selectedCategory, 'certificates')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
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

export default GaForm;