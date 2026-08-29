import LoginDialog from "@/components/layout/LoginDialog";
import BetSlipRow from "@/components/shared/bet-match/BetSlipRow";
import OddsCell from "@/components/shared/bet-match/OddsCell";
import { useAuth } from "@/core/context/AuthContext";
import { matchesData } from "@/core/data/matchesData";
import { Search, Tv } from "lucide-react";
import React, { useState } from "react";

const TennisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBet, setSelectedBet] = useState(null);
  const [oddsValue, setOddsValue] = useState(1.5);
  const [stakeValue, setStakeValue] = useState(100);
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, isAuthenticated } = useAuth();

  const handleOddsSelect = (matchId, selectionName, oddsVal, type) => {
    if (
      selectedBet?.matchId === matchId &&
      selectedBet?.selection === selectionName &&
      selectedBet?.type === type
    ) {
      setSelectedBet(null);
      return;
    }
    setSelectedBet({ matchId, selection: selectionName, type });
    setOddsValue(parseFloat(oddsVal) || 1.5);
    setStakeValue(100);
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

  const filteredMatches = matchesData.tennis.filter((m) => {
    if (!searchQuery.trim()) return true;
    return (
      `${m.team1} ${m.team2}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      m.league.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const MatchCell = ({ match }) => (
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-2">
        {match.isLive && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
        <div className="font-semibold text-white">
          {match.team1} v {match.team2}
        </div>
      </div>
      {match.score && (
        <div className="text-xs text-[#34D399] font-mono mt-0.5">
          {match.score}
        </div>
      )}
      <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
        <span>{match.league}</span>
        {match.hasTV && <Tv size={12} className="text-green-500" />}
        {match.hasBM && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            BM
          </span>
        )}
      </div>
    </td>
  );

  const StatusCell = ({ match }) => (
    <td className="py-3.5 px-2 text-center">
      {match.isLive ? (
        <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-500/20 text-red-400 animate-pulse border border-red-500/30">
          {match.liveStatus}
        </span>
      ) : (
        <span className="px-2 py-1 rounded text-[10px] font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30">
          {match.date}
        </span>
      )}
    </td>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 bg-[#0b0b12] text-white min-h-screen">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2d44] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎾</span>
          <h1 className="text-2xl font-black tracking-wide text-white uppercase">
            Tennis
          </h1>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search tennis matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151522] border border-[#2d2d44] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#34D399]"
          />
        </div>
      </div>

      {/* Tennis Table */}
      <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
        <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            All Tennis Matches
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#10101a] text-xs text-gray-400 uppercase border-b border-[#252538]">
              <tr>
                <th className="py-3 px-4">Match & Score</th>
                <th className="py-3 px-2 text-center w-36">Status</th>
                <th className="py-3 px-2 text-center w-24">1</th>
                <th className="py-3 px-2 text-center w-24">2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252538]">
              {filteredMatches.map((match) => (
                <React.Fragment key={match.id}>
                  <tr className="hover:bg-[#222238] transition">
                    <MatchCell match={match} />
                    <StatusCell match={match} />
                    <OddsCell
                      matchId={match.id}
                      selectionName={match.team1}
                      odds={match.odds.team1}
                      selectedBet={selectedBet}
                      onSelect={handleOddsSelect}
                    />
                    <OddsCell
                      matchId={match.id}
                      selectionName={match.team2}
                      odds={match.odds.team2}
                      selectedBet={selectedBet}
                      onSelect={handleOddsSelect}
                    />
                  </tr>
                  {selectedBet?.matchId === match.id && (
                    <BetSlipRow
                      colSpan={4}
                      selectedBet={selectedBet}
                      onClose={() => setSelectedBet(null)}
                      oddsValue={oddsValue}
                      setOddsValue={setOddsValue}
                      stakeValue={stakeValue}
                      setStakeValue={setStakeValue}
                      onPlaceBet={handlePlaceBet}
                      maxBalance={user?.balance}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TennisPage;
