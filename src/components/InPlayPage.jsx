import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  X,
  ChevronRight,
  Search,
  Radio,
  Grid3x3,
} from "lucide-react";
import { liveMatchesData, getSportLiveCount } from "../data/liveMatches";

const InPlayPage = () => {
  const [activeTab, setActiveTab] = useState("all"); // "live" | "all" | "cricket" | "soccer" | "tennis"
  const [searchQuery, setSearchQuery] = useState("");

  const [activeBet, setActiveBet] = useState(null);
  const [odds, setOdds] = useState(1.0);
  const [stake, setStake] = useState(100);

  const stakePresets = [50, 100, 500, 1000, 5000];

  const handleOddsClick = (matchId, matchTitle, runner, selectedOdds, type) => {
    if (
      activeBet &&
      activeBet.matchId === matchId &&
      activeBet.runner === runner &&
      activeBet.type === type
    ) {
      setActiveBet(null);
      return;
    }
    setActiveBet({ matchId, matchTitle, runner, type });
    setOdds(selectedOdds);
    setStake(100);
  };

  const handleOddsChange = (delta) => {
    setOdds((prev) => Math.max(1.01, +(prev + delta).toFixed(2)));
  };

  const handleStakeChange = (delta) => {
    setStake((prev) => Math.max(0, prev + delta));
  };

  // "live" tab shows only isLive matches; "all"/sport-specific tabs show everything for that scope
  const getFilteredMatches = (categoryKey) => {
    let matches = liveMatchesData[categoryKey] || [];
    if (activeTab === "live") {
      matches = matches.filter((m) => m.isLive);
    }
    if (searchQuery.trim()) {
      matches = matches.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.tournament.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const OddsCell = ({ matchId, matchTitle, runner, backVal, layVal }) => (
    <td className="py-2 px-1 text-center">
      <div className="flex flex-col gap-0.5">
        <button
          onClick={() =>
            handleOddsClick(matchId, matchTitle, runner, backVal, "back")
          }
          className={`w-full py-1.5 font-bold rounded-t transition text-slate-900 ${
            activeBet?.matchId === matchId &&
            activeBet?.runner === runner &&
            activeBet?.type === "back"
              ? "ring-2 ring-white bg-[#5aaae5]"
              : "bg-[#72bbef] hover:bg-[#5aaae5]"
          }`}
        >
          {backVal}
        </button>
        <button
          onClick={() =>
            handleOddsClick(matchId, matchTitle, runner, layVal, "lay")
          }
          className={`w-full py-1.5 font-bold rounded-b transition text-slate-900 ${
            activeBet?.matchId === matchId &&
            activeBet?.runner === runner &&
            activeBet?.type === "lay"
              ? "ring-2 ring-white bg-[#f891a6]"
              : "bg-[#faa9ba] hover:bg-[#f891a6]"
          }`}
        >
          {layVal}
        </button>
      </div>
    </td>
  );

  const InlineBetRow = ({ colSpan }) => (
    <tr>
      <td
        colSpan={colSpan}
        className="bg-[#0f0f1c] border-t border-b border-[#2d2d44] p-4"
      >
        <div
          className={`flex items-center justify-between p-2 rounded-lg mb-3 ${
            activeBet.type === "back"
              ? "bg-[#72bbef] text-slate-900"
              : "bg-[#faa9ba] text-slate-900"
          }`}
        >
          <div>
            <span className="text-xs font-black uppercase tracking-wider">
              {activeBet.type === "back" ? "Back Bet" : "Lay Bet"}
            </span>
            <p className="text-sm font-bold truncate">
              {activeBet.runner} ({activeBet.matchTitle})
            </p>
          </div>
          <button
            onClick={() => setActiveBet(null)}
            className="p-1 hover:bg-black/10 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Odds</label>
            <div className="flex items-center bg-[#141422] rounded border border-[#33334d]">
              <button
                onClick={() => handleOddsChange(-0.01)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                step="0.01"
                value={odds}
                onChange={(e) => setOdds(parseFloat(e.target.value) || 1.0)}
                className="w-full text-center bg-transparent text-white font-bold outline-none"
              />
              <button
                onClick={() => handleOddsChange(0.01)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Stake ($)
            </label>
            <div className="flex items-center bg-[#141422] rounded border border-[#33334d]">
              <button
                onClick={() => handleStakeChange(-10)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(parseInt(e.target.value) || 0)}
                className="w-full text-center bg-transparent text-white font-bold outline-none"
              />
              <button
                onClick={() => handleStakeChange(10)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Est. Profit
            </label>
            <div className="bg-[#141422] rounded border border-[#33334d] py-2.5 text-center">
              <span className="text-emerald-400 font-bold text-sm">
                ${((odds - 1) * stake).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 mt-4">
          {stakePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => setStake((prev) => prev + preset)}
              className="py-1 bg-[#2b2b42] hover:bg-[#3d3d5c] text-xs font-semibold rounded text-gray-200 transition"
            >
              +{preset}
            </button>
          ))}
          <button
            onClick={() => setStake(5000)}
            className="py-1 bg-[#2b2b42] hover:bg-[#3d3d5c] text-xs font-semibold rounded text-yellow-400 transition"
          >
            MAX
          </button>
          <button
            onClick={() => setStake(0)}
            className="col-span-2 py-1 bg-red-900/40 hover:bg-red-800/60 text-xs font-semibold rounded text-red-300 transition"
          >
            CLEAR
          </button>
        </div>

        <button
          onClick={handlePlaceBet}
          className={`w-full mt-4 py-2.5 font-black text-slate-950 rounded-lg transition ${
            activeBet.type === "back"
              ? "bg-[#72bbef] hover:bg-[#5aaae5]"
              : "bg-[#faa9ba] hover:bg-[#f891a6]"
          }`}
        >
          PLACE IN-PLAY BET
        </button>
      </td>
    </tr>
  );

  // Match & score cell — blinking dot only when the match is actually live
  const MatchCell = ({ match, subtitlePrefix }) => (
    <td className="py-3.5 px-4">
      <div className="flex items-center gap-2">
        {match.isLive && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
        <div className="font-semibold text-white">{match.title}</div>
      </div>
      <div className="text-xs text-[#34D399] font-mono mt-0.5">
        {subtitlePrefix}
        {match.score}
      </div>
      <div className="text-[10px] text-gray-400">{match.tournament}</div>
    </td>
  );

  const StatusCell = ({ match }) => (
    <td className="py-3.5 px-2 text-center">
      {match.isLive ? (
        <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-500/20 text-red-400 animate-pulse border border-red-500/30">
          {match.time}
        </span>
      ) : (
        <span className="px-2 py-1 rounded text-[10px] font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30">
          {match.time}
        </span>
      )}
    </td>
  );

  const sectionVisible = (sportKey) =>
    (activeTab === "all" || activeTab === "live" || activeTab === sportKey) &&
    getFilteredMatches(sportKey).length > 0;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 bg-[#0b0b12] text-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2d44] pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
          </span>
          <h1 className="text-2xl font-black tracking-wide text-white uppercase flex items-center gap-2">
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
      <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a40] p-5">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-none">
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

      {/* ================= CRICKET IN-PLAY ================= */}
      {sectionVisible("cricket") && (
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Cricket In-Play
            </h2>
            <Link
              to="/cricket"
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
                  <th className="py-3 px-2 text-center w-24">2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252538]">
                {getFilteredMatches("cricket").map((match) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-[#222238] transition">
                      <MatchCell match={match} />
                      <StatusCell match={match} />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Team 1"
                        backVal={match.back1}
                        layVal={match.lay1}
                      />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Team 2"
                        backVal={match.back2}
                        layVal={match.lay2}
                      />
                    </tr>
                    {activeBet?.matchId === match.id && (
                      <InlineBetRow colSpan={4} />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= SOCCER IN-PLAY ================= */}
      {sectionVisible("soccer") && (
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Soccer In-Play
            </h2>
            <Link
              to="/soccer"
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
                  <th className="py-3 px-2 text-center w-32">Live Status</th>
                  <th className="py-3 px-2 text-center w-20">1</th>
                  <th className="py-3 px-2 text-center w-20">X</th>
                  <th className="py-3 px-2 text-center w-20">2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252538]">
                {getFilteredMatches("soccer").map((match) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-[#222238] transition">
                      <MatchCell match={match} subtitlePrefix="Score: " />
                      <StatusCell match={match} />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Home"
                        backVal={match.back1}
                        layVal={match.lay1}
                      />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Draw"
                        backVal={match.backX}
                        layVal={match.layX}
                      />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Away"
                        backVal={match.back2}
                        layVal={match.lay2}
                      />
                    </tr>
                    {activeBet?.matchId === match.id && (
                      <InlineBetRow colSpan={5} />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TENNIS IN-PLAY ================= */}
      {sectionVisible("tennis") && (
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Tennis In-Play
            </h2>
            <Link
              to="/tennis"
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
                  <th className="py-3 px-2 text-center w-24">2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252538]">
                {getFilteredMatches("tennis").map((match) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-[#222238] transition">
                      <MatchCell match={match} />
                      <StatusCell match={match} />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Player 1"
                        backVal={match.back1}
                        layVal={match.lay1}
                      />
                      <OddsCell
                        matchId={match.id}
                        matchTitle={match.title}
                        runner="Player 2"
                        backVal={match.back2}
                        layVal={match.lay2}
                      />
                    </tr>
                    {activeBet?.matchId === match.id && (
                      <InlineBetRow colSpan={4} />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InPlayPage;
