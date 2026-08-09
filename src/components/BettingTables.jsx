import React, { useState } from "react";
import { Tv, Plus, Minus, X } from "lucide-react";
import { cricketMatches, soccerMatches, tennisMatches } from "../mockData";
import { useAuth } from "../context/AuthContext";
import LoginDialog from "./LoginDialog";

const BettingTables = () => {
  const [activeTab, setActiveTab] = useState("cricket");

  // Bet slip state
  const [selectedBet, setSelectedBet] = useState(null); // { matchId, selection, type }
  const [oddsValue, setOddsValue] = useState(1.5);
  const [stakeValue, setStakeValue] = useState(100);
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const handleOddsClick = (matchId, selectionName, odds, type) => {
    if (
      selectedBet?.matchId === matchId &&
      selectedBet?.selection === selectionName &&
      selectedBet?.type === type
    ) {
      setSelectedBet(null);
      return;
    }
    setSelectedBet({ matchId, selection: selectionName, type });
    setOddsValue(parseFloat(odds) || 1.5);
  };

  const handlePlaceBet = () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    alert(
      `Bet placed successfully on ${selectedBet.selection}! Stake: $${stakeValue} @ ${oddsValue}`,
    );
    setSelectedBet(null);
  };

  const OddsButton = ({ odds, onSelect }) => (
    <div className="flex flex-col">
      <button
        onClick={() => onSelect && onSelect(odds[0], "back")}
        className="bg-[#93C5FD] hover:bg-[#60A5FA] text-black px-3 py-1 rounded text-sm font-semibold transition"
      >
        {odds[0]}
      </button>
      <button
        onClick={() => onSelect && onSelect(odds[1], "lay")}
        className="bg-[#FBBF24] hover:bg-[#F59E0B] text-black px-3 py-1 rounded text-sm font-semibold transition mt-1"
      >
        {odds[1]}
      </button>
    </div>
  );

  // Render Inline Bet Slip Drawer
  const renderBetSlip = (matchId) => {
    if (selectedBet?.matchId !== matchId) return null;

    return (
      <tr className="border-b border-[#1a1a2e]">
        <td colSpan={5} className="p-0">
          <div
            className={`p-4 transition-all ${
              selectedBet.type === "back"
                ? "bg-[#102a45] border-l-4 border-[#93C5FD]"
                : "bg-[#332b15] border-l-4 border-[#FBBF24]"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2 text-white">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold uppercase text-black ${
                    selectedBet.type === "back"
                      ? "bg-[#93C5FD]"
                      : "bg-[#FBBF24]"
                  }`}
                >
                  {selectedBet.type}
                </span>
                <span className="font-semibold text-sm">
                  {selectedBet.selection}
                </span>
              </div>
              <button
                onClick={() => setSelectedBet(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
              {/* Field 1: Odds Input */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs text-gray-300 font-medium">
                  Odds
                </label>
                <div className="flex items-center rounded overflow-hidden border border-gray-600 bg-[#1a1a2e]">
                  <button
                    onClick={() =>
                      setOddsValue((prev) =>
                        Math.max(1.01, +(prev - 0.01).toFixed(2)),
                      )
                    }
                    className="p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    step="0.01"
                    value={oddsValue}
                    onChange={(e) =>
                      setOddsValue(parseFloat(e.target.value) || 1.01)
                    }
                    className="w-full bg-transparent text-center font-bold text-white focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      setOddsValue((prev) => +(prev + 0.01).toFixed(2))
                    }
                    className="p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Field 2: Stake Amount Input */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs text-gray-300 font-medium">
                  Stake ($)
                </label>
                <div className="flex items-center rounded overflow-hidden border border-gray-600 bg-[#1a1a2e]">
                  <button
                    onClick={() =>
                      setStakeValue((prev) => Math.max(0, prev - 50))
                    }
                    className="p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={stakeValue}
                    onChange={(e) =>
                      setStakeValue(parseInt(e.target.value, 10) || 0)
                    }
                    className="w-full bg-transparent text-center font-bold text-white focus:outline-none"
                  />
                  <button
                    onClick={() => setStakeValue((prev) => prev + 50)}
                    className="p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stake Presets */}
            <div className="flex flex-wrap items-center gap-2 my-3">
              {[50, 100, 200, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setStakeValue((prev) => prev + amt)}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-[#2d2d44] hover:bg-[#3d3d54] text-white border border-gray-600 transition"
                >
                  +{amt}
                </button>
              ))}
              <button
                onClick={() => setStakeValue(user?.balance || 1000)}
                className="px-2.5 py-1 rounded text-xs font-semibold bg-green-600 hover:bg-green-500 text-white transition"
              >
                ALL
              </button>
              <button
                onClick={() => setStakeValue(0)}
                className="px-2.5 py-1 rounded text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition"
              >
                CLEAR
              </button>
            </div>

            {/* Profit & Action Button */}
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-300">
                Profit:{" "}
                <span className="text-green-400 font-bold">
                  ${((oddsValue - 1) * stakeValue).toFixed(2)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedBet(null)}
                  className="px-3 py-1.5 rounded text-xs bg-gray-700 hover:bg-gray-600 text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceBet}
                  className={`px-4 py-1.5 rounded text-xs font-bold text-black transition ${
                    selectedBet.type === "back"
                      ? "bg-[#93C5FD] hover:bg-[#60A5FA]"
                      : "bg-[#FBBF24] hover:bg-[#F59E0B]"
                  }`}
                >
                  Place Bet
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-[#1a1a2e] py-12">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab("cricket");
              setSelectedBet(null);
            }}
            className={`px-6 py-3 rounded-t-lg font-semibold transition ${
              activeTab === "cricket"
                ? "bg-[#0B5563] text-white"
                : "bg-[#2d2d44] text-gray-400 hover:text-white"
            }`}
          >
            Cricket
          </button>
          <button
            onClick={() => {
              setActiveTab("soccer");
              setSelectedBet(null);
            }}
            className={`px-6 py-3 rounded-t-lg font-semibold transition ${
              activeTab === "soccer"
                ? "bg-[#0B5563] text-white"
                : "bg-[#2d2d44] text-gray-400 hover:text-white"
            }`}
          >
            Soccer
          </button>
          <button
            onClick={() => {
              setActiveTab("tennis");
              setSelectedBet(null);
            }}
            className={`px-6 py-3 rounded-t-lg font-semibold transition ${
              activeTab === "tennis"
                ? "bg-[#0B5563] text-white"
                : "bg-[#2d2d44] text-gray-400 hover:text-white"
            }`}
          >
            Tennis
          </button>
        </div>

        {/* Cricket Table */}
        {activeTab === "cricket" && (
          <div className="bg-[#2d2d44] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B5563]">
                  <tr>
                    <th className="text-left text-white px-4 py-3 font-semibold">
                      Match
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      1
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      X
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      2
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cricketMatches.map((match, index) => (
                    <React.Fragment key={match.id}>
                      <tr
                        className={`border-b border-[#1a1a2e] hover:bg-[#3d3d54] transition ${
                          index % 2 === 0 ? "bg-[#2d2d44]" : "bg-[#353550]"
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
                          {match.odds.team1 && (
                            <OddsButton
                              odds={match.odds.team1}
                              onSelect={(odds, type) =>
                                handleOddsClick(
                                  match.id,
                                  match.team1,
                                  odds,
                                  type,
                                )
                              }
                            />
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {match.odds.draw && (
                            <OddsButton
                              odds={match.odds.draw}
                              onSelect={(odds, type) =>
                                handleOddsClick(match.id, "Draw", odds, type)
                              }
                            />
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {match.odds.team2 && (
                            <OddsButton
                              odds={match.odds.team2}
                              onSelect={(odds, type) =>
                                handleOddsClick(
                                  match.id,
                                  match.team2,
                                  odds,
                                  type,
                                )
                              }
                            />
                          )}
                        </td>
                      </tr>
                      {renderBetSlip(match.id)}
                    </React.Fragment>
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
        {activeTab === "soccer" && (
          <div className="bg-[#2d2d44] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B5563]">
                  <tr>
                    <th className="text-left text-white px-4 py-3 font-semibold">
                      Match
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      1
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      X
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      2
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {soccerMatches.map((match, index) => (
                    <React.Fragment key={match.id}>
                      <tr
                        className={`border-b border-[#1a1a2e] hover:bg-[#3d3d54] transition ${
                          index % 2 === 0 ? "bg-[#2d2d44]" : "bg-[#353550]"
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
                          <OddsButton
                            odds={match.odds.team1}
                            onSelect={(odds, type) =>
                              handleOddsClick(match.id, match.team1, odds, type)
                            }
                          />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <OddsButton
                            odds={match.odds.draw}
                            onSelect={(odds, type) =>
                              handleOddsClick(match.id, "Draw", odds, type)
                            }
                          />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <OddsButton
                            odds={match.odds.team2}
                            onSelect={(odds, type) =>
                              handleOddsClick(match.id, match.team2, odds, type)
                            }
                          />
                        </td>
                      </tr>
                      {renderBetSlip(match.id)}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tennis Table */}
        {activeTab === "tennis" && (
          <div className="bg-[#2d2d44] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B5563]">
                  <tr>
                    <th className="text-left text-white px-4 py-3 font-semibold">
                      Match
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      1
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      X
                    </th>
                    <th className="text-center text-white px-4 py-3 font-semibold">
                      2
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tennisMatches.map((match, index) => (
                    <React.Fragment key={match.id}>
                      <tr
                        className={`border-b border-[#1a1a2e] hover:bg-[#3d3d54] transition ${
                          index % 2 === 0 ? "bg-[#2d2d44]" : "bg-[#353550]"
                        }`}
                      >
                        <td className="px-4 py-4">
                          <div className="text-white">
                            <div className="text-sm text-gray-400 mb-1 flex items-center space-x-2">
                              <span>
                                {match.date} | {match.league}
                              </span>
                              {match.hasTV && (
                                <Tv size={16} className="text-green-500" />
                              )}
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
                          <OddsButton
                            odds={match.odds.player1}
                            onSelect={(odds, type) =>
                              handleOddsClick(
                                match.id,
                                match.player1,
                                odds,
                                type,
                              )
                            }
                          />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-gray-500">-</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <OddsButton
                            odds={match.odds.player2}
                            onSelect={(odds, type) =>
                              handleOddsClick(
                                match.id,
                                match.player2,
                                odds,
                                type,
                              )
                            }
                          />
                        </td>
                      </tr>
                      {renderBetSlip(match.id)}
                    </React.Fragment>
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
