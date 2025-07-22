'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

export default function TeamDetailClient({ team, teamId }) {
  const [selectedGrade, setSelectedGrade] = useState(team?.ageGroups?.[0]?.grade || null);
  const [selectedColor, setSelectedColor] = useState(team?.ageGroups?.[0]?.teams?.[0]?.color || null);

  if (!team) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500 font-inter">
        Team not found.
        <Link href="/teams" className="mt-4 px-4 py-2 bg-fba-gold text-fba-black rounded-md hover:bg-fba-black hover:text-fba-gray transition duration-300 inline-block">
          Back to Teams
        </Link>
      </div>
    );
  }

  const selectedAgeGroup = team.ageGroups?.find(ag => ag.grade === selectedGrade);
  const selectedTeam = selectedAgeGroup?.teams?.find(t => t.color === selectedColor);

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter">
      <div className="flex items-center mb-8">
        <Link
          href="/teams"
          className="flex items-center text-fba-gold hover:text-fba-black transition duration-300 mr-4"
        >
          <ChevronLeft className="w-6 h-6 mr-1" /> Back to Teams
        </Link>
      </div>

      {/* Top Section with Logo and Team Info */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <div className="flex items-start gap-8">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image 
              src={team.logo} 
              alt={team.name} 
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{team.name}</h2>
            <div className="text-lg text-gray-700">
              <p className="font-semibold">Age Groups: 2nd Grade - 8th Grade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grade and Team Selection */}
      {team.ageGroups && team.ageGroups.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Grade & Team</h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {team.ageGroups.map((ageGroup) => (
              <button
                key={ageGroup.grade}
                onClick={() => {
                  setSelectedGrade(ageGroup.grade);
                  setSelectedColor(ageGroup.teams[0]?.color);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                  selectedGrade === ageGroup.grade 
                    ? 'bg-fba-gold text-fba-black' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {ageGroup.grade}
              </button>
            ))}
          </div>

          {selectedAgeGroup && selectedAgeGroup.teams.length > 1 && (
            <div className="flex gap-4">
              {selectedAgeGroup.teams.map((team) => (
                <button
                  key={team.color}
                  onClick={() => setSelectedColor(team.color)}
                  className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                    selectedColor === team.color 
                      ? 'bg-fba-black text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {team.color} Team
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Roster Table */}
      {selectedTeam && (
        <div className="bg-gray-200 rounded-xl shadow-lg p-8 mb-8 border border-fba-black">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
            {selectedGrade} - {selectedColor} Team Roster
          </h3>
          {selectedTeam.roster.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-fba-gold">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Player Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Height
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200 divide-y divide-fba-black">
                  {selectedTeam.roster.map((player, index) => (
                    <tr key={index} className="hover:bg-fba-gold">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No players available</p>
              <p className="text-lg text-gray-500 mt-2">Check back later for roster updates</p>
            </div>
          )}
        </div>
      )}

      {/* Recent Events */}
      <div className="bg-gray-200 rounded-xl shadow-lg p-8 mb-8 border border-fba-black">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Recent Events</h3>
        {team.recentEvents && team.recentEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-fba-gold">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Opponent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Tournament
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-200 divide-y divide-fba-black">
                {team.recentEvents.map((event, index) => (
                  <tr key={index} className="hover:bg-fba-gold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.opponent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.tournament}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No recent events</p>
            <p className="text-lg text-gray-500 mt-2">Check back later for game results</p>
          </div>
        )}
      </div>

      {/* Coaching Staff */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Coaching Staff</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.coachingStaff.map((coach, index) => (
            <div key={index} className="bg-fba-gold p-6 rounded-lg border border-fba-black shadow-sm flex items-center space-x-4">
              <div className="w-16 h-16 bg-fba-black rounded-full flex items-center justify-center text-fba-gray text-2xl font-bold">
                {coach.name.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">{coach.name}</p>
                <p className="text-gray-600">{coach.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}