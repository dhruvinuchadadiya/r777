import React, { useState } from "react";
import { Tv, Plus, Minus, X, ChevronRight } from "lucide-react";
import { cricketMatches, soccerMatches, tennisMatches } from "../mockData";
import { useAuth } from "../context/AuthContext";
import LoginDialog from "./LoginDialog";
import { Link } from "react-router-dom";

const BettingTables = () => {
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

  // Stacked Back(top)/Lay(bottom) odds cell — same pattern and colors as InPlayPage
  const OddsCell = ({ matchId, selectionName, odds }) => {
    if (!odds) {
      return (
        <td className="py-2 px-1 text-center">
          <span className="text-gray-500">-</span>
        </td>
      );
    }
    const [backVal, layVal] = odds;
    return (
      <td className="py-2 px-1 text-center">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() =>
              handleOddsClick(matchId, selectionName, backVal, "back")
            }
            className={`w-full py-1.5 font-bold rounded-t transition text-slate-900 ${
              selectedBet?.matchId === matchId &&
              selectedBet?.selection === selectionName &&
              selectedBet?.type === "back"
                ? "ring-2 ring-white bg-[#5aaae5]"
                : "bg-[#72bbef] hover:bg-[#5aaae5]"
            }`}
          >
            {backVal}
          </button>
          <button
            onClick={() =>
              handleOddsClick(matchId, selectionName, layVal, "lay")
            }
            className={`w-full py-1.5 font-bold rounded-b transition text-slate-900 ${
              selectedBet?.matchId === matchId &&
              selectedBet?.selection === selectionName &&
              selectedBet?.type === "lay"
                ? "ring-2 ring-white bg-[#f891a6]"
                : "bg-[#faa9ba] hover:bg-[#f891a6]"
            }`}
          >
            {layVal}
          </button>
        </div>
      </td>
    );
  };

  const stakePresets = [50, 100, 200, 500, 1000, 5000];

  // Inline bet slip — full-width row, InPlayPage style
  const renderBetSlip = (matchId, colSpan) => {
    if (selectedBet?.matchId !== matchId) return null;

    return (
      <tr>
        <td
          colSpan={colSpan}
          className="bg-[#0f0f1c] border-t border-b border-[#2d2d44] p-4"
        >
          <div
            className={`flex items-center justify-between p-2 rounded-lg mb-3 ${
              selectedBet.type === "back"
                ? "bg-[#72bbef] text-slate-900"
                : "bg-[#faa9ba] text-slate-900"
            }`}
          >
            <div>
              <span className="text-xs font-black uppercase tracking-wider">
                {selectedBet.type === "back" ? "Back Bet" : "Lay Bet"}
              </span>
              <p className="text-sm font-bold truncate">
                {selectedBet.selection}
              </p>
            </div>
            <button
              onClick={() => setSelectedBet(null)}
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
                  onClick={() =>
                    setOddsValue((prev) =>
                      Math.max(1.01, +(prev - 0.01).toFixed(2)),
                    )
                  }
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  step="0.01"
                  value={oddsValue}
                  onChange={(e) =>
                    setOddsValue(parseFloat(e.target.value) || 1.01)
                  }
                  className="w-full text-center bg-transparent text-white font-bold outline-none"
                />
                <button
                  onClick={() =>
                    setOddsValue((prev) => +(prev + 0.01).toFixed(2))
                  }
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
                  onClick={() =>
                    setStakeValue((prev) => Math.max(0, prev - 50))
                  }
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={stakeValue}
                  onChange={(e) =>
                    setStakeValue(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full text-center bg-transparent text-white font-bold outline-none"
                />
                <button
                  onClick={() => setStakeValue((prev) => prev + 50)}
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
                  ${((oddsValue - 1) * stakeValue).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 mt-4">
            {stakePresets.map((amt) => (
              <button
                key={amt}
                onClick={() => setStakeValue((prev) => prev + amt)}
                className="py-1 bg-[#2b2b42] hover:bg-[#3d3d5c] text-xs font-semibold rounded text-gray-200 transition"
              >
                +{amt}
              </button>
            ))}
            <button
              onClick={() => setStakeValue(user?.balance || 1000)}
              className="py-1 bg-[#2b2b42] hover:bg-[#3d3d5c] text-xs font-semibold rounded text-yellow-400 transition"
            >
              ALL
            </button>
            <button
              onClick={() => setStakeValue(0)}
              className="col-span-2 py-1 bg-red-900/40 hover:bg-red-800/60 text-xs font-semibold rounded text-red-300 transition"
            >
              CLEAR
            </button>
          </div>

          <button
            onClick={handlePlaceBet}
            className={`w-full mt-4 py-2.5 font-black text-slate-950 rounded-lg transition ${
              selectedBet.type === "back"
                ? "bg-[#72bbef] hover:bg-[#5aaae5]"
                : "bg-[#faa9ba] hover:bg-[#f891a6]"
            }`}
          >
            PLACE BET
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-[#0b0b12] py-12">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

      <div className="container mx-auto px-4 space-y-6">
        {/* Cricket Table */}
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Cricket
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
                  <th className="py-3 px-4">Match</th>
                  <th className="py-3 px-2 text-center w-24">1</th>
                  <th className="py-3 px-2 text-center w-24">X</th>
                  <th className="py-3 px-2 text-center w-24">2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252538]">
                {cricketMatches.slice(0, 3).map((match) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-[#222238] transition">
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-gray-400 mb-0.5">
                          {match.date} | {match.league}
                        </div>
                        <div className="font-semibold text-white">
                          {match.team1} v {match.team2}
                        </div>
                        {match.hasBM && (
                          <span className="inline-block mt-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            BM
                          </span>
                        )}
                      </td>
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.team1}
                        odds={match.odds.team1}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={match.odds.draw}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.team2}
                        odds={match.odds.team2}
                      />
                    </tr>
                    {renderBetSlip(match.id, 4)}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Soccer Table */}
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Soccer
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
                  <th className="py-3 px-4">Match</th>
                  <th className="py-3 px-2 text-center w-24">1</th>
                  <th className="py-3 px-2 text-center w-24">X</th>
                  <th className="py-3 px-2 text-center w-24">2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252538]">
                {soccerMatches.slice(0, 3).map((match) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-[#222238] transition">
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-gray-400 mb-0.5">
                          {match.date} | {match.league}
                        </div>
                        <div className="font-semibold text-white">
                          {match.team1} v {match.team2}
                        </div>
                      </td>
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.team1}
                        odds={match.odds.team1}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={match.odds.draw}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.team2}
                        odds={match.odds.team2}
                      />
                    </tr>
                    {renderBetSlip(match.id, 4)}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tennis Table — kept 3-column (1 / X / 2) layout even though tennis has no draw */}
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Tennis
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
                  <th className="py-3 px-4">Match</th>
                  <th className="py-3 px-2 text-center w-24">1</th>
                  <th className="py-3 px-2 text-center w-24">X</th>
                  <th className="py-3 px-2 text-center w-24">2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252538]">
                {tennisMatches.slice(0, 3).map((match) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-[#222238] transition">
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-2">
                          <span>
                            {match.date} | {match.league}
                          </span>
                          {match.hasTV && (
                            <Tv size={14} className="text-green-500" />
                          )}
                          {match.hasBM && (
                            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              BM
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-white">
                          {match.player1} v {match.player2}
                        </div>
                      </td>
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.player1}
                        odds={match.odds.player1}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={null}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.player2}
                        odds={match.odds.player2}
                      />
                    </tr>
                    {renderBetSlip(match.id, 4)}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingTables;
