import React, { useState } from 'react';
import { Tv } from 'lucide-react';
import { cricketMatches, soccerMatches, tennisMatches } from '../mockData';

const BettingTables = () => {
  const [activeTab, setActiveTab] = useState('cricket');

  const OddsButton = ({ odds }) => (
    <div className="flex flex-col">
      <button className="bg-[#93C5FD] hover:bg-[#60A5FA] text-black px-3 py-1 rounded text-sm font-semibold transition">
        {odds[0]}
      </button>
      <button className="bg-[#FBBF24] hover:bg-[#F59E0B] text-black px-3 py-1 rounded text-sm font-semibold transition mt-1">
        {odds[1]}
      </button>
    </div>
  );

  return (
    <div className="bg-[#1a1a2e] py-12">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('cricket')}
            className={`px-6 py-3 rounded-t-lg font-semibold transition ${
              activeTab === 'cricket'
                ? 'bg-[#0B5563] text-white'
                : 'bg-[#2d2d44] text-gray-400 hover:text-white'
            }`}
          >
            Cricket
          </button>
          <button
            onClick={() => setActiveTab('soccer')}
            className={`px-6 py-3 rounded-t-lg font-semibold transition ${
              activeTab === 'soccer'
                ? 'bg-[#0B5563] text-white'
                : 'bg-[#2d2d44] text-gray-400 hover:text-white'
            }`}
          >
            Soccer
          </button>
          <button
            onClick={() => setActiveTab('tennis')}
            className={`px-6 py-3 rounded-t-lg font-semibold transition ${
              activeTab === 'tennis'
                ? 'bg-[#0B5563] text-white'
                : 'bg-[#2d2d44] text-gray-400 hover:text-white'
            }`}
          >
            Tennis
          </button>
        </div>

        {/* Cricket Table */}
        {activeTab === 'cricket' && (
          <div className="bg-[#2d2d44] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B5563]">
                  <tr>
                    <th className="text-left text-white px-4 py-3 font-semibold">Match</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">1</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">X</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">2</th>
                    <th className="text-center text-white px-4 py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cricketMatches.map((match, index) => (
                    <tr
                      key={match.id}
                      className={`border-b border-[#1a1a2e] hover:bg-[#3d3d54] transition ${
                        index % 2 === 0 ? 'bg-[#2d2d44]' : 'bg-[#353550]'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="text-white">
                          <div className="text-sm text-gray-400 mb-1">
                            {match.date} | {match.league}
                          </div>
                          <div className="font-medium">
                            {match.team1} v {match.team2}
                          </div>
                          {match.hasBM && (
                            <span className="inline-block mt-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                              BM
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {match.odds.team1 && <OddsButton odds={match.odds.team1} />}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {match.odds.draw && <OddsButton odds={match.odds.draw} />}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {match.odds.team2 && <OddsButton odds={match.odds.team2} />}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center py-4">
              <button className="text-cyan-400 hover:text-cyan-300 font-medium">
                View More...
              </button>
            </div>
          </div>
        )}

        {/* Soccer Table */}
        {activeTab === 'soccer' && (
          <div className="bg-[#2d2d44] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B5563]">
                  <tr>
                    <th className="text-left text-white px-4 py-3 font-semibold">Match</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">1</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">X</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">2</th>
                    <th className="text-center text-white px-4 py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {soccerMatches.map((match, index) => (
                    <tr
                      key={match.id}
                      className={`border-b border-[#1a1a2e] hover:bg-[#3d3d54] transition ${
                        index % 2 === 0 ? 'bg-[#2d2d44]' : 'bg-[#353550]'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="text-white">
                          <div className="text-sm text-gray-400 mb-1">
                            {match.date} | {match.league}
                          </div>
                          <div className="font-medium">
                            {match.team1} v {match.team2}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <OddsButton odds={match.odds.team1} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <OddsButton odds={match.odds.draw} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <OddsButton odds={match.odds.team2} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tennis Table */}
        {activeTab === 'tennis' && (
          <div className="bg-[#2d2d44] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B5563]">
                  <tr>
                    <th className="text-left text-white px-4 py-3 font-semibold">Match</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">1</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">X</th>
                    <th className="text-center text-white px-4 py-3 font-semibold">2</th>
                    <th className="text-center text-white px-4 py-3 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {tennisMatches.map((match, index) => (
                    <tr
                      key={match.id}
                      className={`border-b border-[#1a1a2e] hover:bg-[#3d3d54] transition ${
                        index % 2 === 0 ? 'bg-[#2d2d44]' : 'bg-[#353550]'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="text-white">
                          <div className="text-sm text-gray-400 mb-1 flex items-center space-x-2">
                            <span>{match.date} | {match.league}</span>
                            {match.hasTV && <Tv size={16} className="text-green-500" />}
                            {match.hasBM && (
                              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                                BM
                              </span>
                            )}
                          </div>
                          <div className="font-medium">
                            {match.player1} v {match.player2}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <OddsButton odds={match.odds.player1} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-gray-500">-</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <OddsButton odds={match.odds.player2} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center py-4">
              <button className="text-cyan-400 hover:text-cyan-300 font-medium">
                View More...
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingTables;
