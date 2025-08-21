'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    teamName: '',
    organization: '',
    ageGroup: '',
    gender: '',
    coachName: '',
    coachEmail: '',
    coachPhone: '',
    assistantCoach: '',
    managerName: '',
    managerEmail: '',
    managerPhone: '',
    city: '',
    state: 'IL',
    tournamentInterest: [],
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (tournament) => {
    setFormData(prev => ({
      ...prev,
      tournamentInterest: prev.tournamentInterest.includes(tournament)
        ? prev.tournamentInterest.filter(t => t !== tournament)
        : [...prev.tournamentInterest, tournament]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Registration submitted successfully! We will contact you soon.');
  };

  const tournaments = [
    '1 Day Slam',
    'Autism Awareness Tournament',
    'Dome Debut Classic',
    'Top 100 Classic',
    'Nationals',
    'Queens Classic',
    'Summer Tipoff Classic',
    'Summer Slam Part 1',
    'Summer Slam Part 2'
  ];

  const ageGroups = [
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '8th Grade',
    'High School'
  ];

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Team Registration</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-black p-2 mb-8 slanted-box-outer">
          <div className="bg-fba-gold p-[2px] slanted-box-inner">
            <div className="bg-fba-gray p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Team Information Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-fba-black mb-4">Team Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization/Club
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age Group/Grade *
                      </label>
                      <select
                        name="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      >
                        <option value="">Select Age Group</option>
                        {ageGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender Division *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      >
                        <option value="">Select Division</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Coach Information Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-fba-black mb-4">Coach Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Head Coach Name *
                      </label>
                      <input
                        type="text"
                        name="coachName"
                        value={formData.coachName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coach Email *
                      </label>
                      <input
                        type="email"
                        name="coachEmail"
                        value={formData.coachEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coach Phone *
                      </label>
                      <input
                        type="tel"
                        name="coachPhone"
                        value={formData.coachPhone}
                        onChange={handleInputChange}
                        required
                        placeholder="(123) 456-7890"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assistant Coach
                      </label>
                      <input
                        type="text"
                        name="assistantCoach"
                        value={formData.assistantCoach}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Manager Information Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-fba-black mb-4">Team Manager Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manager Name
                      </label>
                      <input
                        type="text"
                        name="managerName"
                        value={formData.managerName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manager Email
                      </label>
                      <input
                        type="email"
                        name="managerEmail"
                        value={formData.managerEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manager Phone
                      </label>
                      <input
                        type="tel"
                        name="managerPhone"
                        value={formData.managerPhone}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-fba-black mb-4">Location</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Tournament Interest Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-fba-black mb-4">Tournament Interest</h3>
                  <p className="text-sm text-gray-600 mb-3">Select tournaments you're interested in participating in:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tournaments.map(tournament => (
                      <label key={tournament} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.tournamentInterest.includes(tournament)}
                          onChange={() => handleCheckboxChange(tournament)}
                          className="w-4 h-4 text-fba-gold border-gray-300 rounded focus:ring-fba-gold"
                        />
                        <span className="text-sm text-gray-700">{tournament}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Notes Section */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-fba-black mb-4">Additional Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                      placeholder="Any additional information you'd like to share..."
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                  <Link href="/">
                    <button
                      type="button"
                      className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition transform hover:scale-105 duration-300"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-fba-gold text-white font-semibold rounded-lg shadow-lg hover:bg-fba-black transition transform hover:scale-105 duration-300"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}