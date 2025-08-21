'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dummyEvents } from './data/dummyData';

export default function Home() {
  const upcomingEvents = dummyEvents.boys.sort((a, b) => {
    const dateA = new Date(a.time.split(',')[0].trim() + `, 2025`);
    const dateB = new Date(b.time.split(',')[0].trim() + `, 2025`);
    return dateA.getTime() - dateB.getTime();
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showBottomButtons, setShowBottomButtons] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Phone: < 430, iPad Mini: 768, iPad Air: 820
      // Include horizontal phone mode (up to 932x430) for swipe functionality
      const isPhoneHorizontal = width <= 932 && height <= 430;
      setIsMobile(width <= 820 || isPhoneHorizontal); // Swipe functionality for phones (including horizontal) and iPads
      setIsTablet(width >= 430 && width <= 820); // Tablet range
      
      // Check for specific iPad conditions
      const isIPadProVertical = width === 1024 && height === 1366;
      const isIPadProHorizontal = width === 1366 && height === 1024;
      const isIPadAirMiniHorizontal = (width === 1180 && height === 820) || (width === 1024 && height === 768);
      
      setShowBottomButtons(isIPadProVertical || isIPadProHorizontal || isIPadAirMiniHorizontal);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  const eventsPerPage = isMobile ? (isTablet ? 2 : 1) : 4;
  const totalPossibleSlides = Math.max(1, Math.ceil(upcomingEvents.length / eventsPerPage));
  
  // Animation states
  const eventsRef = useRef(null);
  const [eventsVisible, setEventsVisible] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const eventsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEventsVisible(true);
          eventsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (eventsRef.current) {
      eventsObserver.observe(eventsRef.current);
    }

    return () => {
      eventsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (eventsVisible && initialRender) {
      const timer = setTimeout(() => {
        setInitialRender(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [eventsVisible]);

  const handleNextEvents = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalPossibleSlides);
  };

  const handlePrevEvents = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalPossibleSlides) % totalPossibleSlides);
  };

  const translateXValue = -currentSlideIndex * 100;

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero Section - Explicitly placed below navbar */}
      <section className="w-full bg-fba-gray">
        <div className="w-full">
          <div className="relative w-full h-[600px] lg:h-[1000px] rounded-b-xl shadow-lg overflow-hidden">
            <Image 
              src="/basketball-players.jpg"
              alt="Basketball players"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold text-center drop-shadow-2xl px-4">
                Igniting the Future of Hoops
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-fba-gray relative zigzag-border">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Welcome to the <span className="text-fba-gold">Future Ballers Association</span>
          </h2>
          <p className="mt-4 text-xl text-white leading-relaxed">
            Your premier destination for youth basketball in Illinois. We are dedicated to fostering talent, promoting sportsmanship, and creating competitive opportunities for young athletes.
          </p>
          <p className="mt-4 text-xl text-white leading-relaxed">
            Here, you can easily explore top player rankings across the state, discover exciting upcoming tournaments and events, and connect with a vibrant community of AAU teams. Our platform makes it simple for team managers to register their teams and organize thrilling competitions that showcase the future stars of basketball.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="inline-block">
              <button className="px-8 py-4 bg-fba-gold text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-fba-black transition transform hover:scale-105 duration-300">
                Register Now
              </button>
            </Link>
            <Link href="/teams" className="inline-block">
              <button className="px-8 py-4 bg-fba-black text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-fba-gold transition transform hover:scale-105 duration-300">
                View Teams
              </button>
            </Link>
            <Link href="/events" className="inline-block">
              <button className="px-8 py-4 bg-fba-black text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-fba-gold transition transform hover:scale-105 duration-300">
                Explore Events
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full bg-fba-gold border-t-4 border-fba-gold -mt-0" ref={eventsRef}>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-white mb-10">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="relative">
                <div className={`${isMobile ? 'overflow-x-auto scrollbar-hide scroll-smooth' : 'overflow-hidden'} py-4`}>
                  <div
                    className={`flex ${isMobile ? 'snap-x snap-mandatory' : 'transition-transform duration-700 ease-in-out'}`}
                    style={isMobile ? {} : { transform: `translateX(${translateXValue}%)` }}
                  >
                    {upcomingEvents.map((event, index) => (
                      <div 
                        key={event.id} 
                        className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-3 ${
                          isMobile ? 'snap-center' : ''
                        } ${
                          eventsVisible && initialRender && currentSlideIndex === 0 && index < 4 && !isMobile
                            ? `event-card-animate-${index + 1}` 
                            : !eventsVisible && index < 4 && !isMobile ? 'opacity-0' : ''
                        }`}
                      >
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
                
                {upcomingEvents.length > eventsPerPage && !isMobile && (
                  showBottomButtons ? (
                    <div className="flex justify-center gap-4 mt-6">
                      <button
                        onClick={handlePrevEvents}
                        className="bg-fba-black text-white p-3 rounded-full shadow-md hover:bg-white hover:text-black transition transform hover:scale-110 focus:outline-none"
                        aria-label="Previous events"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNextEvents}
                        className="bg-fba-black text-white p-3 rounded-full shadow-md hover:bg-white hover:text-black transition transform hover:scale-110 focus:outline-none"
                        aria-label="Next events"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handlePrevEvents}
                        className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-10 bg-fba-black text-white p-2 md:p-3 rounded-full shadow-md hover:bg-white hover:text-black transition transform hover:scale-110 focus:outline-none"
                        aria-label="Previous events"
                      >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                      </button>
                      <button
                        onClick={handleNextEvents}
                        className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-10 bg-fba-black text-white p-2 md:p-3 rounded-full shadow-md hover:bg-white hover:text-black transition transform hover:scale-110 focus:outline-none"
                        aria-label="Next events"
                      >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                      </button>
                    </>
                  )
                )}
              </div>
            ) : (
              <p className="text-center text-white text-xl">No upcoming events. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-fba-black">
        <div className="py-10 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-white">Find Players & Teams</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-2xl text-fba-gold font-semibold">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}