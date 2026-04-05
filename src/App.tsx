/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calculator, Info, Percent, Package, TrendingUp, RefreshCw, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [buyingQty, setBuyingQty] = useState<number>(10);
  const [bonusQty, setBonusQty] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(100);
  const [percentage, setPercentage] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);

  const calculate = () => {
    const totalQty = buyingQty + bonusQty;
    if (totalQty === 0) {
      setPercentage(0);
      setTotalProfit(0);
      return;
    }
    
    // Percentage = (Bonus / Total) * 100
    // This represents the effective discount or the "free" portion of the stock
    const pct = (bonusQty / totalQty) * 100;
    setPercentage(pct);

    // Total profit in value if sold at unit price
    const profit = bonusQty * unitPrice;
    setTotalProfit(profit);
  };

  useEffect(() => {
    calculate();
  }, [buyingQty, bonusQty, unitPrice]);

  const commonSchemes = [
    { buy: 5, bonus: 1 },
    { buy: 10, bonus: 1 },
    { buy: 15, bonus: 1 },
    { buy: 20, bonus: 1 },
    { buy: 30, bonus: 2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl mb-4 shadow-lg shadow-blue-200"
          >
            <Calculator size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Medicine Bonus Calculator</h1>
          <p className="text-slate-500 mt-2">Calculate effective profit percentages for purchase schemes</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-slate-100"
          >
            <div className="space-y-6">
              {/* Buying Quantity */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Package size={16} className="mr-2 text-blue-500" />
                  Buying Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setBuyingQty(Math.max(0, buyingQty - 1))}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    <Minus size={20} />
                  </button>
                  <input 
                    type="number" 
                    value={buyingQty}
                    onChange={(e) => setBuyingQty(Number(e.target.value))}
                    className="flex-1 bg-slate-50 border-none rounded-xl p-3 text-center text-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button 
                    onClick={() => setBuyingQty(buyingQty + 1)}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Bonus Quantity */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <TrendingUp size={16} className="mr-2 text-emerald-500" />
                  Bonus / Free Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setBonusQty(Math.max(0, bonusQty - 1))}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    <Minus size={20} />
                  </button>
                  <input 
                    type="number" 
                    value={bonusQty}
                    onChange={(e) => setBonusQty(Number(e.target.value))}
                    className="flex-1 bg-slate-50 border-none rounded-xl p-3 text-center text-xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button 
                    onClick={() => setBonusQty(bonusQty + 1)}
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Unit Price (Optional) */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <Info size={16} className="mr-2 text-amber-500" />
                  Unit Price (Optional)
                </label>
                <input 
                  type="number" 
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  placeholder="Enter unit price"
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-center text-xl font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              {/* Results Section */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-5 text-center">
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Bonus Percentage</p>
                    <p className="text-3xl font-black text-blue-700">{percentage.toFixed(2)}%</p>
                  </div>
                  <div className="bg-emerald-50 rounded-2xl p-5 text-center">
                    <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">Bonus Value</p>
                    <p className="text-3xl font-black text-emerald-700">
                      {totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Schemes Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg shadow-slate-200/40 p-6 border border-slate-100 mt-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <RefreshCw size={18} className="mr-2 text-slate-400" />
              Common Schemes
            </h3>
            <div className="flex flex-wrap gap-3">
              {commonSchemes.map((scheme, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setBuyingQty(scheme.buy);
                    setBonusQty(scheme.bonus);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    buyingQty === scheme.buy && bonusQty === scheme.bonus
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {scheme.buy} + {scheme.bonus}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Explanation Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 text-slate-300 rounded-3xl p-6 mt-6 shadow-xl"
          >
            <h3 className="text-white font-bold mb-3 flex items-center">
              <Percent size={18} className="mr-2 text-blue-400" />
              How it's calculated
            </h3>
            <p className="text-sm leading-relaxed">
              When you get a bonus (e.g., 10+1), your total stock becomes <span className="text-white font-mono">11</span> units. 
              The profit percentage is calculated as the ratio of free units to the total units received:
            </p>
            <div className="bg-slate-900/50 rounded-xl p-4 mt-4 font-mono text-sm text-blue-400">
              (Bonus Qty / (Buying Qty + Bonus Qty)) × 100
            </div>
            <p className="text-sm mt-4 italic">
              Example for 10+1: (1 / 11) × 100 = 9.09%
            </p>
          </motion.div>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Medicine Bonus Calculator • Professional Tool
        </footer>
      </div>
    </div>
  );
}
