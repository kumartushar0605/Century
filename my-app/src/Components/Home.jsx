// pages/index.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const departments = [
    { name: 'Cardiology', description: 'Heart care and treatments', icon: '❤️' },
    { name: 'Neurology', description: 'Brain and nervous system', icon: '🧠' },
    { name: 'Pediatrics', description: 'Children\'s healthcare', icon: '👶' },
    { name: 'Orthopedics', description: 'Bone and joint care', icon: '🦴' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>City General Hospital</title>
        <meta name="description" content="City General Hospital - Providing Quality Healthcare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">H</div>
                <span className="font-bold text-xl text-gray-800">City General Hospital</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Quality Healthcare</span>
                <span className="block text-blue-200">For Your Family</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Providing compassionate care with cutting-edge medical technology
              </p>
              
              {/* Action Buttons */}
              <div className="mt-10 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <Link 
                    href="/visitor"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Patient Portal
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link 
                    href="/management"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 md:py-4 md:text-lg md:px-10"
                  >
                    Hospital Management
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Available Beds */}
            <div className="p-6 bg-blue-50 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="ml-3 text-xl font-medium text-gray-900">Available Beds</h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ICU Beds:</span>
                  <span className="text-blue-600 font-medium">12/20</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">General Beds:</span>
                  <span className="text-blue-600 font-medium">45/100</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Special Care:</span>
                  <span className="text-blue-600 font-medium">8/15</span>
                </div>
              </div>
              <div className="mt-5">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  View all bed availability →
                </a>
              </div>
            </div>

            {/* Doctors */}
            <div className="p-6 bg-blue-50 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-xl font-medium text-gray-900">Our Doctors</h3>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                      <span className="text-gray-600 font-medium">DR</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Dr. Smith</p>
                    <p className="text-xs text-gray-500">Cardiology</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                      <span className="text-gray-600 font-medium">DR</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Dr. Johnson</p>
                    <p className="text-xs text-gray-500">Neurology</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Meet our physicians →
                </a>
              </div>
            </div>

            {/* Emergency */}
            <div className="p-6 bg-red-50 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-3">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-xl font-medium text-gray-900">Emergency</h3>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">24/7 Emergency Services Available</p>
                <p className="text-xl font-bold text-red-600 mt-2">Call: 911</p>
                <p className="text-gray-600 mt-2">Hospital Emergency:</p>
                <p className="text-lg font-medium text-red-600">(555) 123-4567</p>
              </div>
              <div className="mt-5">
                <a href="#" className="text-red-600 hover:text-red-800 font-medium">
                  Emergency information →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Departments
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Specialized care across multiple medical disciplines
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {departments.map((department) => (
                <div key={department.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg shadow-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg text-white text-2xl">
                          {department.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{department.name}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {department.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                View all departments
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Management Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Administration</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Hospital Management
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Dedicated to providing efficient healthcare administration and services
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Monitoring</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Real-time analytics and reporting to ensure optimal healthcare delivery
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Resource Management</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Efficient allocation of staff, equipment, and facilities
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Patient Safety</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Protocols and systems to ensure the highest standards of patient care
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Operational Efficiency</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Streamlined processes for better healthcare delivery and patient satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="/management"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Hospital Management Portal
            </Link>
          </div>
        </div>
      </div>
      </div>
      );
      }