import { ChevronRight, Tv } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../core/context/AuthContext";
import { matchesData } from "../../../core/data/matchesData";
import LoginDialog from "../../layout/LoginDialog";
import BetSlipRow from "../../shared/bet-match/BetSlipRow";
import OddsCell from "../../shared/bet-match/OddsCell";

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
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-3 sm:space-y-4 bg-transparent">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      {/* Cricket Table */}
      <div className="rounded-none shadow-lg overflow-hidden">
        <div className="flex items-center justify-between bg-[#18adc5] text-white px-2 py-1">
          <h2 className="text-base font-bold">Cricket</h2>
          <Link
            to="/cricket"
            className="flex items-center text-xs hover:text-black font-semibold transition"
          >
            View More
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase border-b">
              <tr>
                <th className="px-2 py-1"></th>
                <th className="px-2 py-1 text-center w-24">1</th>
                <th className="px-2 py-1 text-center w-24">X</th>
                <th className="px-2 py-1 text-center w-24">2</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {matchesData.cricket.map((match) => (
                <React.Fragment key={match.id}>
                  <tr className="transition">
                    <td className="px-2 py-1">
                      <div className="text-xs mb-0.5 flex items-center gap-2">
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
                      <div className="font-semibold">
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

      {/* Soccer Table */}
      <div className="rounded-none shadow-lg overflow-hidden">
        <div className="flex items-center justify-between bg-[#18adc5] text-white px-2 py-1">
          <h2 className="text-base font-bold">Soccer</h2>
          <Link
            to="/soccer"
            className="flex items-center text-xs hover:text-black font-semibold transition"
          >
            View More
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase border-b">
              <tr>
                <th className="px-2 py-1"></th>
                <th className="px-2 py-1 text-center w-24">1</th>
                <th className="px-2 py-1 text-center w-24">X</th>
                <th className="px-2 py-1 text-center w-24">2</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {matchesData.soccer.map((match) => (
                <React.Fragment key={match.id}>
                  <tr className="transition">
                    <td className="px-2 py-1">
                      <div className="text-xs mb-0.5 flex items-center gap-2">
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
                      <div className="font-semibold">
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
      <div className="rounded-none shadow-lg overflow-hidden">
        <div className="flex items-center justify-between bg-[#18adc5] text-white px-2 py-1">
          <h2 className="text-base font-bold">Tennis</h2>
          <Link
            to="/tennis"
            className="flex items-center text-xs hover:text-black font-semibold transition"
          >
            View More
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase border-b">
              <tr>
                <th className="px-2 py-1"></th>
                <th className="px-2 py-1 text-center w-24">1</th>
                <th className="px-2 py-1 text-center w-24">X</th>
                <th className="px-2 py-1 text-center w-24">2</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {matchesData.tennis.map((match) => (
                <React.Fragment key={match.id}>
                  <tr className="transition">
                    <td className="px-2 py-1">
                      <div className="text-xs mb-0.5 flex items-center gap-2">
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
                      <div className="font-semibold">
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
    </div>
  );
};

export default BettingTables;
