'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function TournamentRegistrationClientStatic({ event, eventId }) {
  const [formData, setFormData] = useState({
    teamName: '',
    grade: '',
    gender: 'boys',
    division: '1',
    additionalNotes: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500 font-inter">
        Tournament not found.
        <Link href="/events" className="mt-4 px-4 py-2 bg-fba-gold text-fba-black rounded-md hover:bg-fba-black hover:text-fba-gray transition duration-300 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Direct submission to Supabase from client
      if (!supabase) {
        throw new Error('Database connection not configured');
      }

      // First, try to get the tournament ID
      const { data: tournament } = await supabase
        .from('tournaments')
        .select('id')
        .eq('event_id', eventId)
        .single();

      // Insert the registration directly
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            tournament_id: tournament?.id || null,
            tournament_event_id: eventId,
            tournament_name: event.name,
            team_name: formData.teamName,
            grade: formData.grade,
            team_type: formData.gender,
            division: parseInt(formData.division),
            additional_notes: formData.additionalNotes || null,
            registration_status: 'pending',
            payment_status: 'unpaid'
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('Registration saved:', data);
      setFormSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Failed to submit registration. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const grades = [
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '8th Grade'
  ];

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter text-black">
      <div className="flex items-center mb-8">
        <Link
          href={`/events/${eventId}`}
          className="flex items-center text-black hover:underline hover:decoration-fba-gold hover:decoration-2 transition duration-300 mr-4"
        >
          <ChevronLeft className="w-6 h-6 mr-1" /> Back to Event Details
        </Link>
      </div>

      {/* Tournament Info Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3">
            <Image 
              src={event.image} 
              alt={event.name} 
              width={300}
              height={400}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{event.name} Registration</h2>
            <p className="text-xl text-gray-700 mb-2">{event.time}</p>
            <p className="text-lg text-gray-600">{event.details.location}</p>
            <p className="text-lg text-fba-gold font-semibold mt-2">Entry Fee: {event.details.entryFee}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {!formSubmitted ? (
          <div className="bg-black p-2 mb-8 slanted-box-outer">
            <div className="bg-fba-gold p-[2px] slanted-box-inner">
              <div className="bg-fba-gray p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Team Registration Section */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-2xl font-bold text-fba-black mb-4">Team Registration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                          placeholder="Enter your team name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grade *
                        </label>
                        <div className="relative">
                          <select
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black appearance-none"
                            style={{ paddingBottom: '8px' }}
                          >
                            <option value="">Select Grade</option>
                            {grades.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Team Type *
                        </label>
                        <div className="relative">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black appearance-none"
                            style={{ paddingBottom: '8px' }}
                          >
                            <option value="">Select Team Type</option>
                            <option value="boys">Boys Team</option>
                            <option value="girls">Girls Team</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Division *
                        </label>
                        <div className="relative">
                          <select
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black appearance-none"
                            style={{ paddingBottom: '8px' }}
                          >
                            <option value="">Select Division</option>
                            <option value="1">Division 1</option>
                            <option value="2">Division 2</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                        {formData.division && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                            {formData.division === '1' ? (
                              <p className="text-sm text-gray-700">
                                <strong className="text-fba-gold">Division 1 - Competitive Level</strong><br/>
                                For teams seeking high-level tournament play and stronger competition. Ideal for experienced teams ready for intense, competitive basketball.
                              </p>
                            ) : (
                              <p className="text-sm text-gray-700">
                                <strong className="text-blue-600">Division 2 - Recreational Level</strong><br/>
                                For teams looking for a more developmental and less intense competitive experience. Perfect for teams focused on skill development and fun.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
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
                        disabled={isSubmitting}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fba-gold text-black"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Link href={`/events/${eventId}`}>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition transform hover:scale-105 duration-300 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-fba-gold text-white font-semibold rounded-lg shadow-lg hover:bg-fba-black transition transform hover:scale-105 duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Continue to Payment'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Confirmation Screen */
          <div className="bg-black p-2 mb-8 slanted-box-outer">
            <div className="bg-fba-gold p-[2px] slanted-box-inner">
              <div className="bg-white p-8 text-center">
                <h3 className="text-3xl font-bold text-fba-black mb-6">Registration Complete!</h3>
                <p className="text-lg text-gray-700 mb-8">
                  Your team registration for <strong className="text-black">{event.name}</strong> has been submitted successfully.
                </p>
                
                <div className="bg-gray-100 rounded-lg p-6 mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Registration Summary</h4>
                  <div className="text-left max-w-md mx-auto space-y-2 text-gray-800">
                    <p><strong className="text-black">Team:</strong> {formData.teamName}</p>
                    <p><strong className="text-black">Grade:</strong> {formData.grade}</p>
                    <p><strong className="text-black">Team Type:</strong> {formData.gender === 'boys' ? 'Boys Team' : 'Girls Team'}</p>
                    <p><strong className="text-black">Division:</strong> Division {formData.division}</p>
                    <p><strong className="text-black">Entry Fee:</strong> {event.details.entryFee}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-semibold text-gray-900">
                    Please proceed to payment to complete your registration:
                  </p>
                  
                  <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    <button className="px-10 py-4 bg-fba-gold text-white text-xl font-bold rounded-lg shadow-lg hover:bg-fba-black hover:text-white transition transform hover:scale-105 duration-300">
                      Proceed to Payment
                    </button>
                  </Link>
                  
                  <p className="text-sm text-gray-600 mt-4">
                    You will be redirected to our secure payment portal to complete your transaction.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300">
                  <Link href="/events">
                    <button className="px-6 py-2 text-fba-gold hover:text-fba-black transition duration-300">
                      Return to Events
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}