import React from "react";

const OddsCell = ({ matchId, selectionName, odds, selectedBet, onSelect }) => {
  if (!odds) {
    return (
      <td className="py-2 px-1 text-center">
        <span className="text-gray-500">-</span>
      </td>
    );
  }
  const [backVal, layVal] = odds;
  const isBackActive =
    selectedBet?.matchId === matchId &&
    selectedBet?.selection === selectionName &&
    selectedBet?.type === "back";
  const isLayActive =
    selectedBet?.matchId === matchId &&
    selectedBet?.selection === selectionName &&
    selectedBet?.type === "lay";

  return (
    <td className="py-2 px-1 text-center">
      <div className="flex flex-col gap-0.5">
        <button
          onClick={() => onSelect(matchId, selectionName, backVal, "back")}
          className={`w-full py-1.5 font-bold rounded-t transition text-slate-900 ${
            isBackActive
              ? "ring-2 ring-white bg-[#5aaae5]"
              : "bg-[#72bbef] hover:bg-[#5aaae5]"
          }`}
        >
          {backVal}
        </button>
        <button
          onClick={() => onSelect(matchId, selectionName, layVal, "lay")}
          className={`w-full py-1.5 font-bold rounded-b transition text-slate-900 ${
            isLayActive
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

export default OddsCell;
