'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeInSection from './components/FadeInSection';
import { dummyEvents } from './data/dummyData';

export default function Home() {
  const upcomingEvents = dummyEvents.boys.sort((a, b) => {
    const dateA = new Date(a.time.split(',')[0].trim() + `, 2025`);
    const dateB = new Date(b.time.split(',')[0].trim() + `, 2025`);
    return dateA.getTime() - dateB.getTime();
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const eventsPerPage = 4;

  const totalPossibleSlides = Math.max(1, Math.ceil(upcomingEvents.length / eventsPerPage));

  const handleNextEvents = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalPossibleSlides);
  };

  const handlePrevEvents = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalPossibleSlides) % totalPossibleSlides);
  };

  const translateXValue = -currentSlideIndex * 100;

  return (
    <div className="bg-fba-gray font-inter">
      <FadeInSection>
        <div className="w-full h-[600px] lg:h-[700px] relative rounded-b-xl shadow-lg overflow-hidden">
          <Image 
            src="/basketball-players.jpg"
            alt="Basketball players"
            fill
            className="object-cover object-[center_75%]"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-6xl font-extrabold text-center relative z-10 drop-shadow-2xl">
              Igniting the Future of Hoops
            </h1>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Welcome to the <span className="text-fba-gold">Future Ballers Association</span>
          </h2>
          <p className="mt-4 text-xl text-white leading-relaxed">
            Your premier destination for youth basketball in Illinois. We are dedicated to fostering talent, promoting sportsmanship, and creating competitive opportunities for young athletes.
          </p>
          <p className="mt-4 text-xl text-white leading-relaxed">
            Here, you can easily explore top player rankings across the state, discover exciting upcoming tournaments and events, and connect with a vibrant community of AAU teams. Our platform makes it simple for team managers to register their teams and organize thrilling competitions that showcase the future stars of basketball.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-fba-gold text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-fba-black transition transform hover:scale-105 duration-300">
              View Teams
            </button>
            <button className="px-8 py-4 bg-fba-black text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-fba-gold transition transform hover:scale-105 duration-300">
              Explore Events
            </button>
          </div>
        </div>
      </FadeInSection>

      <div className="w-full bg-fba-gold">
        <FadeInSection>
          <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-white mb-10">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="relative">
                <div className="overflow-hidden py-4">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(${translateXValue}%)` }}
                  >
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-3">
                        <Link href={`/events/${event.id}`} className="block">
                          <div className="bg-fba-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden">
                            <Image 
                              src={event.image} 
                              alt={event.name} 
                              width={300}
                              height={400}
                              className="w-full h-auto"
                            />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                
                {upcomingEvents.length > eventsPerPage && (
                  <>
                    <button
                      onClick={handlePrevEvents}
                      className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 bg-fba-black text-white p-3 rounded-full shadow-md hover:bg-white hover:text-black transition transform hover:scale-110 focus:outline-none"
                      aria-label="Previous events"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextEvents}
                      className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 bg-fba-black text-white p-3 rounded-full shadow-md hover:bg-white hover:text-black transition transform hover:scale-110 focus:outline-none"
                      aria-label="Next events"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className="text-center text-white text-xl">No upcoming events. Check back soon!</p>
            )}
          </div>
        </div>
        </FadeInSection>
      </div>

      <div className="bg-fba-black">
        <FadeInSection>
          <div className="py-10 px-4 sm:px-6 lg:px-8 text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-white">Find Players & Teams</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl text-fba-gold font-semibold">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </FadeInSection>
      </div>
    </div>
  );
}