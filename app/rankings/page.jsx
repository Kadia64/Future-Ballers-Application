import React from 'react';
import Image from 'next/image';
import { dummyRankings } from '../data/dummyData';

export default function RankingsPage() {
  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)] font-inter">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Illinois Boys Player Rankings</h2>

      {dummyRankings.length > 0 ? (
        <div className="bg-gray-200 rounded-xl shadow-lg p-8 border border-fba-black overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-fba-gold">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Player Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Height
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  AAU Team
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  High School
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 divide-y divide-fba-black">
              {dummyRankings.map((player) => (
                <tr key={player.rank} className="hover:bg-fba-gold">
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-fba-gold">{player.rank}.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                    <div className="relative w-10 h-10 mr-3">
                      <Image 
                        src={player.image} 
                        alt={player.name} 
                        fill
                        className="rounded-full object-cover border border-gray-300"
                      />
                    </div>
                    {player.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.height}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.aauTeam}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.highSchool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-200 rounded-xl shadow-lg p-16 border border-fba-black text-center">
          <p className="text-3xl text-gray-600 font-semibold">No rankings available</p>
          <p className="text-xl text-gray-500 mt-3">Coming soon</p>
        </div>
      )}
    </div>
  );
}