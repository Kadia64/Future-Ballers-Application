import React from 'react';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-fba-gray py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl text-center bg-gray-200 rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">About Future Ballers Association</h2>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          The Future Ballers Association (FBA) is a premier AAU basketball organization dedicated to nurturing the next generation of basketball talent in Illinois. We believe in providing a comprehensive platform where young athletes can develop their skills, compete at a high level, and foster a lifelong love for the game.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Our mission is to empower young players through competitive tournaments, top-tier coaching, and a supportive community. We host a variety of tournaments throughout the year, designed for both boys' and girls' AAU teams, ensuring equitable opportunities for all aspiring ballers. Our events are meticulously organized to provide a professional and exciting atmosphere for athletes, coaches, and fans.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Beyond competition, FBA is committed to recognizing excellence. Our website serves as a central hub where you can view the most up-to-date player rankings in Illinois, showcasing the dedication and achievements of our state's brightest stars. We also provide detailed information on upcoming events and camps, making it easy for teams and individual players to find their next challenge or opportunity for growth.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Join the Future Ballers Association community and be a part of a movement that's shaping the future of basketball, one dribble at a time.
        </p>
      </div>
    </div>
  );
}