'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dummyTeams } from '../data/dummyData';

export default function TeamsPage() {
  const [gender, setGender] = useState('boys');
  const teams = dummyTeams[gender];

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Our Teams</h2>

      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setGender('boys')}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            gender === 'boys' ? 'bg-fba-gold text-fba-black shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Boys Teams
        </button>
        <button
          onClick={() => setGender('girls')}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            gender === 'girls' ? 'bg-fba-gold text-fba-black shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Girls Teams
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.length > 0 ? (
          teams.map((team) => (
            <Link
              key={team.id}
              href={`/teams/${team.id}?gender=${gender}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer p-6 flex flex-col items-center justify-center text-center border border-gray-200"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image 
                  src={team.logo} 
                  alt={team.name} 
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-2xl text-gray-600">No teams available at the moment.</p>
            <p className="text-lg text-gray-500 mt-2">Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}