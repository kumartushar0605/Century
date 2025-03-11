// pages/index.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
 
  

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
                <span className="font-bold text-xl text-gray-800">Welcome To Health Care</span>              </div>
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
                    href="/visitorhome"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Patient Portal
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link 
                    href="/hospitalhome"
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
      </div>
      );
      }