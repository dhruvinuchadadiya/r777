import { Minus, Plus, X } from "lucide-react";

const stakePresets = [50, 100, 200, 500, 1000, 5000];

const BetSlipRow = ({
  colSpan,
  selectedBet,
  onClose,
  oddsValue,
  setOddsValue,
  stakeValue,
  setStakeValue,
  onPlaceBet,
  maxBalance,
  buttonLabel = "PLACE BET",
}) => {
  if (!selectedBet) return null;

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
            onClick={onClose}
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
                onClick={() => setStakeValue((prev) => Math.max(0, prev - 50))}
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
            onClick={() => setStakeValue(maxBalance || 1000)}
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
          onClick={onPlaceBet}
          className={`w-full mt-4 py-2.5 font-black text-slate-950 rounded-lg transition ${
            selectedBet.type === "back"
              ? "bg-[#72bbef] hover:bg-[#5aaae5]"
              : "bg-[#faa9ba] hover:bg-[#f891a6]"
          }`}
        >
          {buttonLabel}
        </button>
      </td>
    </tr>
  );
};

export default BetSlipRow;
