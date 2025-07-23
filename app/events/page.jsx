'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dummyEvents } from '../data/dummyData';

export default function EventsPage() {
  const events = dummyEvents.boys;

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter flex flex-col">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Upcoming Events</h2>

      <div className="bg-black p-2 mb-8 slanted-box-outer">
        <div className="bg-fba-gold p-[2px] slanted-box-inner">
          <div className="bg-fba-gray p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="block"
          >
            <div className="bg-fba-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden">
              <Image 
                src={event.image} 
                alt={event.name} 
                width={400}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-2xl text-gray-600">No events available</p>
            <p className="text-lg text-gray-500 mt-2">Check back later for upcoming tournaments</p>
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}