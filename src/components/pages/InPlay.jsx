import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Radio, Grid3x3, ChevronRight } from "lucide-react";
import { matchesData, getSportLiveCount } from "../../data/matchesData";
import { useAuth } from "../../context/AuthContext";
import LoginDialog from "../layout/LoginDialog";
import OddsCell from "../shared/bet-match/OddsCell";
import BetSlipRow from "../shared/bet-match/BetSlipRow";

const InPlayPage = () => {
  const [activeTab, setActiveTab] = useState("all"); // "live" | "all" | "cricket" | "soccer" | "tennis"
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBet, setSelectedBet] = useState(null); // { matchId, selection, type }
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

  // Same login-gate as BettingTables — identical behavior in both places
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

  const getFilteredMatches = (sportKey) => {
    let matches = matchesData[sportKey] || [];
    if (activeTab === "live") {
      matches = matches.filter((m) => m.isLive);
    }
    if (searchQuery.trim()) {
      matches = matches.filter(
        (m) =>
          `${m.team1} ${m.team2}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          m.league.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return matches;
  };

  const filterItems = [
    {
      id: "live",
      label: "Watch Live",
      icon: Radio,
      count: null,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "all",
      label: "All Games",
      icon: Grid3x3,
      count: null,
      gradient: "from-gray-500 to-gray-700",
    },
    {
      id: "cricket",
      label: "Cricket",
      emoji: "🏏",
      count: getSportLiveCount("cricket"),
      gradient: "from-red-500 to-red-700",
    },
    {
      id: "soccer",
      label: "Soccer",
      emoji: "⚽",
      count: getSportLiveCount("soccer"),
      gradient: "from-green-400 to-green-600",
    },
    {
      id: "tennis",
      label: "Tennis",
      emoji: "🎾",
      count: getSportLiveCount("tennis"),
      gradient: "from-yellow-300 to-yellow-500",
    },
  ];

  // Match & score cell — blinking dot only when the match is actually live
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
      <div className="text-[10px] text-gray-400">{match.league}</div>
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

  const sectionVisible = (sportKey) =>
    (activeTab === "all" || activeTab === "live" || activeTab === sportKey) &&
    getFilteredMatches(sportKey).length > 0;

  const renderTable = (sportKey, label, linkTo, hasDraw) => {
    if (!sectionVisible(sportKey)) return null;
    const colSpan = hasDraw ? 5 : 4;

    return (
      <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
        <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {label} In-Play
          </h2>
          <Link
            to={linkTo}
            className="flex items-center text-xs text-[#34D399] hover:text-[#2db382] font-semibold transition"
          >
            View More
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#10101a] text-xs text-gray-400 uppercase border-b border-[#252538]">
              <tr>
                <th className="py-3 px-4">Match & Score</th>
                <th className="py-3 px-2 text-center w-36">Live Status</th>
                <th className="py-3 px-2 text-center w-24">1</th>
                {hasDraw && <th className="py-3 px-2 text-center w-24">X</th>}
                <th className="py-3 px-2 text-center w-24">2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252538]">
              {getFilteredMatches(sportKey).map((match) => (
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
                    {hasDraw && (
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={match.odds.draw}
                        selectedBet={selectedBet}
                        onSelect={handleOddsSelect}
                      />
                    )}
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
                      colSpan={colSpan}
                      selectedBet={selectedBet}
                      onClose={() => setSelectedBet(null)}
                      oddsValue={oddsValue}
                      setOddsValue={setOddsValue}
                      stakeValue={stakeValue}
                      setStakeValue={setStakeValue}
                      onPlaceBet={handlePlaceBet}
                      maxBalance={user?.balance}
                      buttonLabel="PLACE IN-PLAY BET"
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 bg-[#0b0b12] text-white min-h-screen">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2d44] pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
          </span>
          <h1 className="text-2xl font-black tracking-wide text-white uppercase">
            In-Play Live Betting
          </h1>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search live matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151522] border border-[#2d2d44] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#34D399]"
          />
        </div>
      </div>

      {/* Icon Filter Bar */}
      <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a40] p-3">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-none p-2">
          {filterItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-2 shrink-0 group"
              >
                <div
                  className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                    isActive
                      ? "ring-2 ring-[#34D399] ring-offset-2 ring-offset-[#1a1a2e]"
                      : ""
                  }`}
                >
                  {item.icon ? (
                    <item.icon size={24} className="text-white" />
                  ) : (
                    <span className="text-2xl">{item.emoji}</span>
                  )}
                  {item.count !== null && item.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-[#1a1a2e]">
                      {item.count}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-200 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {renderTable("cricket", "Cricket", "/cricket", false)}
      {renderTable("soccer", "Soccer", "/soccer", true)}
      {renderTable("tennis", "Tennis", "/tennis", false)}
    </div>
  );
};

export default InPlayPage;
