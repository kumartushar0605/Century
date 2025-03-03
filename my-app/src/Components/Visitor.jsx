'use client';
import { useState } from 'react';
import Head from 'next/head';
import { Search, MapPin, Phone, Mail, User, Calendar, Clock, Heart, ChevronDown, ChevronRight, Filter } from 'lucide-react';

export default function Visitor() {
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample hospital data
  const hospitals = [
    {
      id: 1,
      name: "MediCare General Hospital",
      address: "123 Healthcare Ave, New York, NY 10001",
      distance: "1.2 miles away",
      phone: "(212) 555-1234",
      availableBeds: 12,
      totalBeds: 120,
      icuBeds: 3,
      emergencyWaitTime: "15 min",
      departments: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
      doctors: 32,
      rating: 4.7,
      image: "/api/placeholder/150/100"
    },
    {
      id: 2,
      name: "City Memorial Hospital",
      address: "456 Wellness Blvd, New York, NY 10002",
      distance: "2.5 miles away",
      phone: "(212) 555-5678",
      availableBeds: 8,
      totalBeds: 200,
      icuBeds: 1,
      emergencyWaitTime: "45 min",
      departments: ["Oncology", "Gynecology", "Urology", "Cardiology"],
      doctors: 48,
      rating: 4.5,
      image: "/api/placeholder/150/100"
    },
    {
      id: 3,
      name: "Harbor View Medical Center",
      address: "789 Healing Dr, Brooklyn, NY 11201",
      distance: "3.8 miles away",
      phone: "(718) 555-9012",
      availableBeds: 25,
      totalBeds: 175,
      icuBeds: 6,
      emergencyWaitTime: "10 min",
      departments: ["Pediatrics", "Dermatology", "Pulmonology", "Psychiatry"],
      doctors: 40,
      rating: 4.2,
      image: "/api/placeholder/150/100"
    }
  ];

  // Filter options
  const locations = ["All Locations", "New York", "Brooklyn", "Queens", "Bronx", "Staten Island"];
  const departments = ["All Departments", "Cardiology", "Neurology", "Oncology", "Pediatrics", "Orthopedics", "Gynecology", "Urology", "Dermatology", "Pulmonology", "Psychiatry"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hospital Availability | MediCare</title>
        <meta name="description" content="Find available hospital beds, departments and doctors near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">MediCare</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="/" className="text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-b-2 border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Find Hospitals
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Services
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About Us
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <a href="#" className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Emergency Services
              </a>
            </div>
            <div className="flex items-center md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Find Available Hospital Services Near You
              </h1>
              <p className="mt-3 text-lg text-blue-100 sm:mt-4">
                Get real-time information about hospital bed availability, departments, doctors, and wait times in your area.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:max-w-md">
                <div className="relative rounded-md shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your location or ZIP code"
                    className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-blue-500 text-blue-100 placeholder-blue-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button className="h-full px-4 text-white font-medium rounded-r-md bg-blue-700 hover:bg-blue-800">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-start-2 lg:text-right">
              <div className="bg-white p-5 rounded-lg shadow-md text-left">
                <h3 className="text-lg font-medium text-gray-900">Emergency Contacts</h3>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Emergency: 911</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Nurse Hotline: (800) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Mental Health: (800) 555-5678</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Hospital Availability</h2>
            <button 
              className="flex items-center text-blue-600 md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5 mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className={`${showFilters ? 'block' : 'hidden'} md:block mt-6`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                <select className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Any Distance</option>
                  <option>Within 5 miles</option>
                  <option>Within 10 miles</option>
                  <option>Within 20 miles</option>
                  <option>Within 50 miles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Any Availability</option>
                  <option>Available Beds</option>
                  <option>ICU Beds Available</option>
                  <option>Short Wait Times</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                  <div className="flex items-start">
                    <img src={hospital.image} alt={hospital.name} className="w-24 h-16 object-cover rounded-md" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{hospital.name}</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="ml-1 text-sm text-gray-500">{hospital.distance}</p>
                      </div>
                      <div className="mt-4 flex">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {hospital.rating} ★
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>{hospital.address}</p>
                    <p className="mt-1">{hospital.phone}</p>
                  </div>
                </div>
                
                <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Bed Availability</h4>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">General Beds</p>
                      <div className="mt-1 flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">{hospital.availableBeds}</p>
                        <p className="ml-1 text-sm text-gray-500">/ {hospital.totalBeds}</p>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(hospital.availableBeds / hospital.totalBeds) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ICU Beds</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">{hospital.icuBeds}</p>
                      <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${hospital.icuBeds > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {hospital.icuBeds > 0 ? 'Available' : 'Full'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Departments</h4>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-y-2">
                      {hospital.departments.map((dept, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-500">
                          <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                          {dept}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700">
                      <User className="h-4 w-4 text-gray-400 inline mr-1" />
                      {hospital.doctors} Doctors Available
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Wait Times</h4>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-red-500" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Emergency</p>
                        <p className="text-2xl font-semibold text-gray-900">{hospital.emergencyWaitTime}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-500">Make an appointment</p>
                      <div className="mt-2 flex space-x-2">
                        <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-md text-sm">
                          Book Now
                        </button>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                          Call Hospital
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center">
                  View Hospital Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Map Section */}
        <div className="mt-10 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Hospitals Near You</h2>
            <p className="mt-1 text-sm text-gray-500">View hospitals on the map to find the closest one to your location</p>
          </div>
          <div className="h-96 bg-gray-300 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Map view of hospitals would appear here</p>
              <p className="text-xs text-gray-400">Interactive map showing hospital locations with bed availability</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Popular Departments</h3>
              <ul className="mt-3 space-y-3">
                <li className="flex justify-between">
                  <span className="text-sm text-gray-600">Cardiology</span>
                  <span className="text-sm font-medium text-gray-900">12 Hospitals</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-600">Orthopedics</span>
                  <span className="text-sm font-medium text-gray-900">9 Hospitals</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-600">Pediatrics</span>
                  <span className="text-sm font-medium text-gray-900">15 Hospitals</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-600">Neurology</span>
                  <span className="text-sm font-medium text-gray-900">7 Hospitals</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-600">Oncology</span>
                  <span className="text-sm font-medium text-gray-900">6 Hospitals</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Insurance Accepted</h3>
              <ul className="mt-3 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Medicare</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Medicaid</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Blue Cross Blue Shield</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Aetna</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">UnitedHealthcare</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
              <p className="mt-2 text-sm text-gray-600">Our healthcare advisors are available 24/7 to help you find the right hospital for your needs.</p>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 w-full justify-center">
                  Contact Support
                </a>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  Support Hotline: (800) 555-9876
                </p>
                <p className="flex items-center mt-2">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  Email: support@medicare.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
}