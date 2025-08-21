'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

export default function EventDetailClient({ event, eventId }) {
  if (!event) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500 font-inter">
        Event not found.
        <Link href="/events" className="mt-4 px-4 py-2 bg-fba-gold text-fba-black rounded-md hover:bg-fba-black hover:text-fba-gray transition duration-300 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  const isTournament = event.type === 'tournament';

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter">
      <div className="flex items-center mb-8">
        <Link
          href="/events"
          className="flex items-center text-black hover:underline hover:decoration-fba-gold hover:decoration-2 transition duration-300 mr-4"
        >
          <ChevronLeft className="w-6 h-6 mr-1" /> Back to Events
        </Link>
      </div>

      <div className="bg-gray-200 rounded-xl shadow-lg p-8 mb-8 text-center border border-gray-200">
        <div className="max-w-2xl mx-auto mb-6">
          <Image 
            src={event.image} 
            alt={event.name} 
            width={600}
            height={800}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{event.name}</h2>
        <p className="text-2xl text-gray-700">{event.time}</p>
      </div>

      <div className="bg-gray-200 rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
          {isTournament ? 'Tournament Details' : 'Camp Details'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
          {isTournament && (
            <>
              <p><strong className="font-semibold text-gray-900">Age Group:</strong> {event.details.ageGroup}</p>
              <p><strong className="font-semibold text-gray-900">Date:</strong> {event.details.date}</p>
              <p><strong className="font-semibold text-gray-900">Location:</strong> {event.details.location}</p>
              <p><strong className="font-semibold text-gray-900">Entry Fee:</strong> {event.details.entryFee}</p>
            </>
          )}
          <p><strong className="font-semibold text-gray-900">Manager:</strong> {event.details.manager.name}</p>
          <p><strong className="font-semibold text-gray-900">Phone:</strong> {event.details.manager.phone}</p>
          <p><strong className="font-semibold text-gray-900">Email:</strong> {event.details.manager.email}</p>
        </div>
        {event.registrationUrl && (
          <div className="mt-8 text-center">
            <Link href={`/register/${eventId}`}>
              <button className="px-8 py-4 bg-fba-gold text-fba-black text-xl font-semibold rounded-lg shadow-lg hover:bg-fba-black hover:text-fba-gray transition transform hover:scale-105 duration-300">
                Register Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}