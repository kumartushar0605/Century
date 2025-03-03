import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, Filter, X } from 'lucide-react';
import axios from 'axios'; // You'll need to install axios: npm install axios

// API base URL - replace with your actual backend API URL
const API_BASE_URL = 'https://your-backend-api.com/api';

const VisitorHome = () => {
  // State for search inputs
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // State for search results
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch hospitals based on search criteria
  const searchHospitals = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/hospitals/search`, {
        params: {
          location,
          state,
          pincode
        }
      });
      
      setHospitals(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
      setError('Failed to fetch hospitals. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Fetch departments for a selected hospital
  const fetchDepartments = async (hospitalId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/hospitals/${hospitalId}/departments`);
      setDepartments(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Failed to fetch departments. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Fetch detailed information for a specific department
  const fetchDepartmentDetails = async (hospitalId, departmentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/hospitals/${hospitalId}/departments/${departmentId}`);
      setSelectedDepartment(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching department details:', err);
      setError('Failed to fetch department details. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Handle hospital selection
  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setSelectedDepartment(null);
    setDepartmentSearch('');
    fetchDepartments(hospital.id);
  };
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (location || state || pincode) {
      setSelectedHospital(null);
      setSelectedDepartment(null);
      searchHospitals();
    }
  };
  
  // Filter departments based on search
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Hospital Finder</h1>
          <p className="text-blue-100">Find hospitals and check availability</p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Find Hospitals Near You</h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location/City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                  placeholder="Enter city or area"
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                placeholder="Enter state"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                placeholder="Enter pincode"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <p className="text-lg font-medium text-gray-800 ml-2">Loading...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Hospital Results Section */}
        {!isLoading && hospitals.length > 0 && !selectedHospital && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Available Hospitals ({hospitals.length})</h2>
            {hospitals.length === 0 ? (
              <p className="text-gray-600">No hospitals found matching your search criteria.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitals.map(hospital => (
                  <div 
                    key={hospital.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-md"
                    onClick={() => handleHospitalSelect(hospital)}
                  >
                    <h3 className="text-lg font-medium text-blue-600">{hospital.name}</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{hospital.address}</p>
                      <p>{hospital.city}, {hospital.state} - {hospital.pincode}</p>
                    </div>
                    <div className="mt-3 flex items-center">
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        Rating: {hospital.rating}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Selected Hospital with Department Search */}
        {selectedHospital && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedHospital.name}</h2>
              <button 
                onClick={() => setSelectedHospital(null)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close hospital details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              {selectedHospital.address}, {selectedHospital.city}, {selectedHospital.state} - {selectedHospital.pincode}
            </p>
            
            {/* Department Search */}
            <div className="mb-6">
              <label htmlFor="departmentSearch" className="block text-sm font-medium text-gray-700 mb-2">
                Search Departments
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="departmentSearch"
                  value={departmentSearch}
                  onChange={(e) => setDepartmentSearch(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                  placeholder="Search for departments (e.g., Cardiology, Neurology)"
                />
              </div>
            </div>
            
            {/* Departments List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {filteredDepartments.length === 0 ? (
                <p className="col-span-full text-gray-600">No departments found matching your search.</p>
              ) : (
                filteredDepartments.map(dept => (
                  <div
                    key={dept.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedDepartment?.id === dept.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => fetchDepartmentDetails(selectedHospital.id, dept.id)}
                  >
                    <h3 className="font-medium">{dept.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Total Beds: {dept.beds}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        {/* Department Details */}
        {selectedDepartment && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedDepartment.name} Department</h2>
              <button 
                onClick={() => setSelectedDepartment(null)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close department details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Bed Availability */}
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Bed Availability</h3>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Beds</p>
                  <p className="text-2xl font-bold">{selectedDepartment.beds}</p>
                </div>
                <div className="h-10 border-l border-gray-300"></div>
                <div>
                  <p className="text-sm text-gray-600">Available Beds</p>
                  <p className={`text-2xl font-bold ${selectedDepartment.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedDepartment.availableBeds}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Doctors */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Available Doctors</h3>
              {selectedDepartment.doctors.length === 0 ? (
                <p className="text-gray-600">No doctors currently available in this department.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDepartment.doctors.map(doctor => (
                    <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <h4 className="font-medium text-blue-600">{doctor.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{doctor.specialization}</p>
                      <h5 className="text-xs font-medium uppercase text-gray-500 mb-2">Availability:</h5>
                      {doctor.availability.map((slot, index) => (
                        <div key={index} className="flex items-center text-sm mb-1 text-gray-700">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="mr-2">{slot.day}:</span>
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Equipment & Facilities */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Equipment */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Equipment Available</h3>
                {selectedDepartment.equipment.length === 0 ? (
                  <p className="text-gray-600">No equipment information available.</p>
                ) : (
                  <ul className="space-y-2">
                    {selectedDepartment.equipment.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Facilities */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Facilities Available</h3>
                {selectedDepartment.facilities.length === 0 ? (
                  <p className="text-gray-600">No facilities information available.</p>
                ) : (
                  <ul className="space-y-2">
                    {selectedDepartment.facilities.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto">
          <p className="text-center text-gray-300">© 2025 Hospital Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VisitorHome;