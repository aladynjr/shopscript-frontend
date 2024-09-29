import React, { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';

const AdminPanel = () => {
  const [videoLink, setVideoLink] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [brandSearch, setBrandSearch] = useState('');

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const storedBrands = JSON.parse(localStorage.getItem('brands')) || [];
    setCategories(storedCategories);
    setBrands(storedBrands);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const newSubmission = { videoLink, category: selectedCategory, brand: selectedBrand };
    localStorage.setItem('submissions', JSON.stringify([...submissions, newSubmission]));
    setVideoLink('');
    setSelectedCategory('');
    setSelectedBrand('');
  };

  const addCategory = () => {
    if (newCategory) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      setNewCategory('');
    }
  };

  const addBrand = () => {
    if (newBrand) {
      const updatedBrands = [...brands, newBrand];
      setBrands(updatedBrands);
      localStorage.setItem('brands', JSON.stringify(updatedBrands));
      setNewBrand('');
    }
  };

  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="max-w- mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Panel</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Add New Video</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-1">Video Link</label>
              <input
                type="text"
                id="videoLink"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <div className="relative">
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Search brands..."
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a brand</option>
                {filteredBrands.map((brand, index) => (
                  <option key={index} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit Video
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Category</h2>
            <div className="flex">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="New category"
              />
              <button onClick={addCategory} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <PlusCircle size={24} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Brand</h2>
            <div className="flex">
              <input
                type="text"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="New brand"
              />
              <button onClick={addBrand} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <PlusCircle size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;