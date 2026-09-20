import { Minus, Plus, X } from "lucide-react";
import { useRef } from "react";

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
  const stakeInputRef = useRef(null);

  if (!selectedBet) return null;

  return (
    <tr className="flex flex-col sm:table-row p-0 bg-transparent transition">
      <td
        colSpan={colSpan}
        className={`${
          selectedBet.type === "back"
            ? "bg-[#cbe9ff] text-slate-900"
            : "bg-[#ffe6ec] text-slate-900"
        } border-t border-b py-1 px-0 w-full block sm:table-cell`}
      >
        {/* Top Header Section wrapped with padding so content stays nicely inset */}
        <div className="px-1 w-full">
          <div
            className={`flex items-center justify-between px-2 py-1 rounded-lg mb-1 ${
              selectedBet.type === "back"
                ? "bg-[#72bbef] text-slate-900"
                : "bg-[#faa9ba] text-slate-900"
            }`}
          >
            <div className="min-w-0 flex-1 break-all whitespace-normal">
              <span className="text-[10px] xs:text-xs font-black uppercase tracking-wider block mb-0.5">
                {selectedBet.type === "back" ? "Back Bet" : "Lay Bet"}
              </span>
              <p className="text-xs xs:text-sm font-bold leading-tight">
                {selectedBet.selection}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-black/10 rounded-full transition shrink-0 ml-2 self-start"
            >
              <X size={16} />
            </button>
          </div>

          {/* ================= SECTION 2: FLUID INPUT BOXES ================= */}
          <div className="flex flex-wrap gap-0.5 w-full">
            {/* Odds Input Box */}
            <div className="flex-1 min-w-full sm:min-w-[25%]">
              <label className="text-[10px] xs:text-xs block mb-0.5 font-medium">
                Odds
              </label>
              <div className="flex items-center bg-[#141422] rounded border border-[#33334d]">
                <button
                  onClick={() =>
                    setOddsValue((prev) =>
                      Math.max(1.01, +(prev - 0.01).toFixed(2)),
                    )
                  }
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition shrink-0"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  step="0.01"
                  value={oddsValue}
                  onChange={(e) =>
                    setOddsValue(parseFloat(e.target.value) || 1.01)
                  }
                  readOnly
                  className="w-full min-w-0 text-center bg-transparent text-white font-bold outline-none text-[11px] xs:text-sm p-0 appearance-none m-0 pointer-events-none select-none"
                />
                <button
                  onClick={() =>
                    setOddsValue((prev) => +(prev + 0.01).toFixed(2))
                  }
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition shrink-0"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Stake Input Box */}
            <div className="flex-1 min-w-full sm:min-w-[25%]">
              <label className="text-[10px] xs:text-xs block mb-0.5 font-medium">
                Stake ($)
              </label>
              <div className="flex items-center bg-[#141422] rounded border border-[#33334d]">
                <button
                  onClick={() =>
                    setStakeValue((prev) => Math.max(0, prev - 50))
                  }
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition shrink-0"
                >
                  <Minus size={14} />
                </button>

                <input
                  ref={stakeInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={stakeValue === 0 ? "" : stakeValue}
                  onChange={(e) => {
                    const rawVal = e.target.value;
                    const cleanDigits = rawVal.replace(/\D/g, "");

                    if (!cleanDigits) {
                      setStakeValue(0);
                      return;
                    }

                    if (cleanDigits.length > String(stakeValue).length) {
                      const lastTypedChar = cleanDigits[cleanDigits.length - 1];
                      const forcedEndValue =
                        parseInt(String(stakeValue) + lastTypedChar, 10) || 0;
                      setStakeValue(forcedEndValue);
                    } else {
                      setStakeValue(parseInt(cleanDigits, 10) || 0);
                    }

                    setTimeout(() => {
                      if (stakeInputRef.current) {
                        const len = stakeInputRef.current.value.length;
                        stakeInputRef.current.setSelectionRange(len, len);
                      }
                    }, 0);
                  }}
                  onSelect={(e) => {
                    const len = e.target.value.length;
                    if (
                      e.target.selectionStart !== len ||
                      e.target.selectionEnd !== len
                    ) {
                      e.target.setSelectionRange(len, len);
                    }
                  }}
                  className="w-full min-w-0 text-center bg-transparent text-white font-bold outline-none text-[11px] xs:text-sm p-0 m-0"
                />

                <button
                  onClick={() => setStakeValue((prev) => prev + 50)}
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2a2a40] transition shrink-0"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Est. Profit Box */}
            <div className="flex-1 min-w-full sm:min-w-[25%]">
              <label className="text-[10px] xs:text-xs block mb-0.5 font-medium">
                Est. Profit
              </label>
              <div className="bg-[#141422] rounded border border-[#33334d] h-[28px] flex items-center justify-center text-center px-0 min-w-0">
                <span className="text-emerald-400 font-bold text-[11px] xs:text-sm truncate block w-full">
                  ${((oddsValue - 1) * stakeValue).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] sm:grid-cols-8 gap-0.5 mt-2">
            {stakePresets.map((amt) => (
              <button
                key={amt}
                onClick={() => setStakeValue((prev) => prev + amt)}
                className="py-1 bg-[#2b2b42] hover:brightness-125 text-xs font-semibold rounded text-gray-200 transition"
              >
                +{amt}
              </button>
            ))}
            <button
              onClick={() => setStakeValue(maxBalance || 1000)}
              className="py-1 bg-[#2b2b42] hover:brightness-125 text-xs font-semibold rounded text-green-200 transition"
            >
              ALL
            </button>
            <button
              onClick={() => setStakeValue(0)}
              className="py-1 bg-red-500 hover:brightness-125 text-xs font-semibold rounded text-gray-200 transition"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* ================= SECTION 3: MOBILE KEYPAD (UNTOUCHED) ================= */}
        <div className="sm:hidden mt-1 w-full bg-white border border-gray-200 overflow-hidden text-slate-900 font-bold">
          {/* Keypad Layout Row 1 */}
          <div className="grid grid-cols-7 border-b border-gray-200 text-center divide-x divide-gray-200">
            <button
              onClick={() => setStakeValue((prev) => prev + "1")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              1
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "2")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              2
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "3")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              3
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "4")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              4
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "5")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              5
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "6")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              6
            </button>

            <button
              onClick={() =>
                setStakeValue((prev) => {
                  const currentStr = String(prev);
                  if (currentStr.length <= 1) return 0;
                  return parseInt(currentStr.slice(0, -1), 10) || 0;
                })
              }
              className="row-span-2 flex items-center justify-center bg-gray-50 active:bg-gray-200 transition text-gray-500 px-2"
            >
              <svg
                xmlns="http://w3.org"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <line x1="18" y1="9" x2="12" y2="15" />
                <line x1="12" y1="9" x2="18" y2="15" />
              </svg>
            </button>
          </div>

          {/* Keypad Layout Row 2 */}
          <div className="grid grid-cols-6 text-center divide-x divide-gray-200">
            <button
              onClick={() => setStakeValue((prev) => prev + "7")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              7
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "8")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              8
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "9")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              9
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "0")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              0
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + "00")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              00
            </button>
            <button
              onClick={() => setStakeValue((prev) => prev + ".")}
              className="py-0.5 active:bg-gray-100 transition text-sm"
            >
              .
            </button>
          </div>
        </div>

        {/* Place Bet Button wrapped with padding */}
        <div className="px-1 mt-2 w-full">
          <button
            onClick={onPlaceBet}
            className={`w-full py-1.5 font-black text-white rounded-lg transition bg-green-500 hover:brightness-110`}
          >
            {buttonLabel}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BetSlipRow;
