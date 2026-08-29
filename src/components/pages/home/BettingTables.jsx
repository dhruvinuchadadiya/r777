import LoginDialog from "@/components/layout/LoginDialog";
import BetSlipRow from "@/components/shared/bet-match/BetSlipRow";
import OddsCell from "@/components/shared/bet-match/OddsCell";
import { useAuth } from "@/core/context/AuthContext";
import { matchesData } from "@/core/data/matchesData";
import { ChevronRight, Tv } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BettingTables = () => {
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

  // Shared login-gate: place bet requires auth everywhere it's used
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

  return (
    <div className="bg-[#0b0b12] py-12">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />

      <div className="container mx-auto px-4 space-y-6">
        {/* Cricket Table */}
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white">Cricket</h2>
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
                {matchesData.cricket.map((match) => (
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
                        selectedBet={selectedBet}
                        onSelect={handleOddsSelect}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={match.odds.draw}
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

        {/* Soccer Table */}
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white">Soccer</h2>
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
                {matchesData.soccer.map((match) => (
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
                        selectedBet={selectedBet}
                        onSelect={handleOddsSelect}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={match.odds.draw}
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

        {/* Tennis Table — 3-column (1 / X / 2) even though tennis has no draw */}
        <div className="bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden border border-[#2a2a40]">
          <div className="flex items-center justify-between bg-[#151522] px-4 py-2.5 border-b border-[#2d2d44]">
            <h2 className="text-base font-bold text-white">Tennis</h2>
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
                {matchesData.tennis.map((match) => (
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
                          {match.team1} v {match.team2}
                        </div>
                      </td>
                      <OddsCell
                        matchId={match.id}
                        selectionName={match.team1}
                        odds={match.odds.team1}
                        selectedBet={selectedBet}
                        onSelect={handleOddsSelect}
                      />
                      <OddsCell
                        matchId={match.id}
                        selectionName="Draw"
                        odds={null}
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
    </div>
  );
};

export default BettingTables;
