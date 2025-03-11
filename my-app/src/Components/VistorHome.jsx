

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, Filter, X } from 'lucide-react';
import { useRouter } from "next/navigation";


import axios from 'axios'; // You'll need to install axios: npm install axios

// API base URL - replace with your actual backend API URL
const API_BASE_URL = 'http://localhost:5000';



// Suggestion data
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
];

const MAJOR_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 
  'Pune', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Coimbatore',"Bhubaneswar"
];

const VisitorHome = () => {
  // State for search inputs
  const router = useRouter();

 
  useEffect(() => {
    const name = localStorage.getItem("VName");
    console.log(name+"hi")
    if (!name) {
      router.push("/vregister"); // Redirect to the registration page
    }
  }, []);

  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // State for suggestions
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  
  // State for search results
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  const [name, setName] = useState("User");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("VName");
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("VName");
    router.push("/");
  };


  useEffect(() => {
    setAnimateIn(true);
  }, []);
  
  // Filter location suggestions based on input
  useEffect(() => {
    if (location) {
      const filteredLocations = MAJOR_CITIES.filter(city => 
        city.toLowerCase().includes(location.toLowerCase())
      );
      setLocationSuggestions(filteredLocations);
    } else {
      setLocationSuggestions([]);
    }
  }, [location]);
  
  // Filter state suggestions based on input
  useEffect(() => {
    if (state) {
      const filteredStates = INDIAN_STATES.filter(st => 
        st.toLowerCase().includes(state.toLowerCase())
      );
      setStateSuggestions(filteredStates);
    } else {
      setStateSuggestions([]);
    }
  }, [state]);
  
  // Fetch hospitals based on search criteria
  const searchHospitals = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/Visitor/pincode`, 
        { location, state }  // Send data in the body
      );
      
      
      setHospitals(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
      setError('Failed to fetch hospitals. Please try again.');
      setIsLoading(false);
    }
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
  
  // Handle hospital selection
  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setSelectedDepartment(null);
  };
  
  // Handle department selection
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };
  
  // Go back to hospital list
  const handleBackToHospitals = () => {
    setSelectedHospital(null);
    setSelectedDepartment(null);
  };
  
  // Go back to departments
  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
  };
  
  // Format availability hours
  const formatAvailability = (day) => {
    if (!day.isAvailable) return "Not Available";
    return day.hours;
  };
  
  // Render doctor schedule
  const renderDoctorSchedule = (doctor) => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    return (
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-lg mb-2">Weekly Schedule</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map((day) => (
            <div key={day} className="flex justify-between border-b pb-1">
              <span className="capitalize">{day}:</span>
              <span className={doctor.availability[day].isAvailable ? "text-green-600" : "text-red-500"}>
                {formatAvailability(doctor.availability[day])}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Book Appointment Modal Component
  const BookAppointmentModal = ({ doctor, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Book Appointment with Dr. {doctor.name}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <p className="mb-4">Specialization: {doctor.specialization}</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select className="w-full p-2 border rounded">
                <option value="">Select time</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Star component for background
  const Star = ({ className, style }) => {
    return (
      <div className={className} style={style}>
        ★
      </div>
    );
  };

  // Display hospital list
  if (!selectedHospital) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hospital Finder</h1>
          <p className="text-blue-100">Find hospitals and check availability</p>
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{name}</span>
            <span>👤</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2  bg-white text-black shadow-md rounded">
             <button
  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
  onClick={handleLogout}
>
  Logout
</button>

            </div>
          )}
        </div>
      </div>
    </header>
        
        {/* Main Content */}
        <main className="container mx-auto p-4">
          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Find Hospitals Near You</h2>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location/City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                    placeholder="Enter city or area"
                  />
                </div>
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
                    {locationSuggestions.map((city, index) => (
                      <li 
                        key={index} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setLocation(city);
                          setShowLocationSuggestions(false);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex-1 relative">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onFocus={() => setShowStateSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 border"
                  placeholder="Enter state"
                />
                {showStateSuggestions && stateSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
                    {stateSuggestions.map((st, index) => (
                      <li 
                        key={index} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setState(st);
                          setShowStateSuggestions(false);
                        }}
                      >
                        {st}
                      </li>
                    ))}
                  </ul>
                )}
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
          {!isLoading && hospitals.length > 0 && (
            <div className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden mt-16">
              {/* Star Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <Star
                    key={i}
                    className="absolute text-white animate-pulse"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      opacity: Math.random() * 0.5 + 0.2,
                      animationDuration: `${Math.random() * 5 + 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Heading */}
              <div
                className={`text-center mb-10 transition-all duration-1000 ${
                  animateIn ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
                  Hospitals Near You
                </h1>
                <p className="text-gray-600 text-lg mt-4">Find the best medical services nearby</p>
              </div>

              {/* Hospital Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital._id}
                    className="relative bg-white rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-blue-500 cursor-pointer p-6"
                    onClick={() => handleHospitalClick(hospital)}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"></div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{hospital.hospitalName}</h2>
                    <p className="text-gray-600">{hospital.city}, {hospital.state}</p>
                    <p className="text-gray-600">Pincode: {hospital.pincode}</p>
                    <p className="text-gray-700 mt-3"><span className="font-medium">Contact:</span> {hospital.contactNumber}</p>
                    <p className="mt-3 text-blue-600 font-medium">
                      {hospital.departments.length} Departments Available
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* No Results */}
          {!isLoading && hospitals.length === 0 && location && (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">No hospitals found matching your search criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search parameters or try a different location.</p>
            </div>
          )}
          
          {/* Initial State */}
          {!isLoading && hospitals.length === 0 && !location && !state && !pincode && (
            <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
              <div className={`transition-all duration-1000 ${
                animateIn ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Hospital Finder</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Use the search form above to find hospitals in your area. You can search by location, state, or pincode.
                </p>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-auto">
          <div className="container mx-auto">
            <p className="text-center text-gray-300">© 2025 Hospital Finder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Display department list for a selected hospital
  if (selectedHospital && !selectedDepartment) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Hospital Finder</h1>
            <p className="text-blue-100">Find hospitals and check availability</p>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <button 
            onClick={handleBackToHospitals}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Hospitals
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">{selectedHospital.hospitalName}</h1>
            <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-2">
              <p>{selectedHospital.city}, {selectedHospital.state} - {selectedHospital.pincode}</p>
              <span className="hidden md:inline mx-2">•</span>
              <p>Contact: {selectedHospital.contactNumber}</p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedHospital.departments.map((department, index) => (
              <div 
                key={index}
                className="border rounded-lg shadow hover:shadow-md transition-shadow p-6 cursor-pointer"
                onClick={() => handleDepartmentClick(department)}
              >
                <h3 className="text-lg font-medium mb-3">{department.name}</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total Beds:</span>
                  <span className="font-medium">{department.totalBeds}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Available Beds:</span>
                  <span className="font-medium text-green-600">{department.availableBeds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctors:</span>
                  <span className="font-medium">{department.doctors.length}</span>
                </div>
                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-auto">
          <div className="container mx-auto">
            <p className="text-center text-gray-300">© 2025 Hospital Finder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // Display department details
  if (selectedHospital && selectedDepartment) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Hospital Finder</h1>
            <p className="text-blue-100">Find hospitals and check availability</p>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <button 
              onClick={handleBackToDepartments}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2 md:mb-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Departments
            </button>
            
            <span className="hidden md:inline mx-3">|</span>
            
            <div className="text-gray-600">
              {selectedHospital.hospitalName} &gt; {selectedDepartment.name}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">{selectedDepartment.name} Department</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Total Beds</p>
                <p className="text-xl font-bold text-blue-800">{selectedDepartment.totalBeds}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Available Beds</p>
                <p className="text-xl font-bold text-green-800">{selectedDepartment.availableBeds}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Doctors</p>
                <p className="text-xl font-bold text-purple-800">{selectedDepartment.doctors.length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Occupancy</p>
                <p className="text-xl font-bold text-yellow-800">
                  {Math.round(((selectedDepartment.totalBeds - selectedDepartment.availableBeds) / selectedDepartment.totalBeds) * 100)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Doctors Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Doctors</h2>
                {selectedDepartment.doctors.length === 0 ? (
                  <p className="text-gray-500">No doctors available in this department.</p>
                ) : (
                  <div className="space-y-6">
                    {selectedDepartment.doctors.map((doctor, index) => (
                      <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <div>
                            <h3 className="text-lg font-medium">{doctor.name}</h3>
                            <p className="text-blue-600">{doctor.specialization}</p>
                          </div>
                          {/* <button
                            className="mt-2 md:mt-0 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            onClick={() => setSelectedDoctor(doctor)}
                          >
                            Book Appointment
                          </button> */}
                        </div>
                        {renderDoctorSchedule(doctor)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          
            {/* Facilities & Equipment */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Facilities</h2>
                {selectedDepartment.facilities.length === 0 ? (
                  <p className="text-gray-500">No facilities information available.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedDepartment.facilities.map((facility, index) => (
                      <li key={index} className="text-gray-700">{facility}</li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Equipment</h2>
                {selectedDepartment.equipment.length === 0 ? (
                  <p className="text-gray-500">No equipment information available.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedDepartment.equipment.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                )}
                
              </div>
            </div>
          </div>
          </main>
          </div>
  );
};
}

export default VisitorHome;