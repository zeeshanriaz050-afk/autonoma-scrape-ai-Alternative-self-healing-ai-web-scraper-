import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Zap,
  CheckCircle2,
  RefreshCw,
  Code2,
  SlidersHorizontal,
  Flame,
  Check,
  Cpu,
  Layers,
  Sparkles,
  FileCode2,
  ExternalLink,
} from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../data/sampleWebsites';

export const SelfHealingSandbox: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('laptops-ecommerce');
  const [isRunningComparison, setIsRunningComparison] = useState<boolean>(false);
  const [hasRunTest, setHasRunTest] = useState<boolean>(true);
  const [activeLayoutView, setActiveLayoutView] = useState<'side-by-side' | 'v1' | 'v2'>('side-by-side');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const scenario = SAMPLE_SCENARIOS.find(s => s.id === selectedScenarioId) || SAMPLE_SCENARIOS[0];

  const handleRunBenchmark = async () => {
    setIsRunningComparison(true);
    // Simulate real diagnostic processing
    await new Promise(r => setTimeout(r, 750));
    setIsRunningComparison(false);
    setHasRunTest(true);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner / Problem Statement */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>The Self-Healing Engine (Self-Repairing Scraper)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Websites change layouts constantly. Traditional scrapers crash. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              AutonomaScrape AI self-heals in real-time.
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Whenever a website undergoes a frontend overhaul, CSS refactoring, or class obfuscation,
            our autonomous engine detects the structural drift, recognizes semantic anchors, and synthesizes
            healed selectors without crashing or dropping a single record.
          </p>
        </div>

        {/* Scenario Selector & Action Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
              Select Test Target:
            </span>
            {SAMPLE_SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenarioId(s.id);
                  setHasRunTest(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedScenarioId === s.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {s.title.split('-')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={handleRunBenchmark}
            disabled={isRunningComparison}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
          >
            {isRunningComparison ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Simulating Website Redesign & Healing...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 text-slate-950" />
                <span>Trigger Redesign & Run Diagnostic Benchmark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Engine Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traditional Scraper Box (The Failure Mode) */}
        <div className="rounded-2xl border border-rose-900/50 bg-slate-900/70 p-5 shadow-lg relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Traditional Scraper</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-rose-950 text-rose-400 font-mono border border-rose-800">
                      Puppeteer / BeautifulSoup
                    </span>
                  </h3>
                  <p className="text-xs text-rose-300/80">Relying on hardcoded static CSS selectors</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>FAILED ON REDESIGN</span>
              </span>
            </div>

            {/* Test Results on V1 vs V2 */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 mb-1">Layout V1 (Original)</div>
                <div className="text-lg font-bold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>5 / 5 Extracted</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">Status: OK</div>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/50">
                <div className="text-rose-300 mb-1">Layout V2 (Post-Redesign)</div>
                <div className="text-lg font-bold text-rose-400 flex items-center space-x-1">
                  <AlertOctagon className="w-4 h-4" />
                  <span>0 Extracted (CRASH)</span>
                </div>
                <div className="text-[11px] text-rose-400 font-mono mt-1">CSS Selectors broken</div>
              </div>
            </div>

            {/* Simulated Error Message */}
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/60 font-mono text-xs text-rose-300 space-y-1.5">
              <div className="font-semibold text-rose-200 flex items-center space-x-1">
                <span>[ERROR] ElementNotFoundError:</span>
              </div>
              <p className="text-[11px] text-rose-300/90 leading-relaxed">
                Query selector <code className="bg-rose-900/50 px-1 py-0.5 rounded text-white">{scenario.traditionalSelectors.item}</code> yielded 0 results in DOM document. Target site updated its CSS classes to randomized identifiers. Execution halted.
              </p>
              <div className="pt-2 text-[10px] text-rose-400/80 flex items-center justify-between border-t border-rose-900/50">
                <span>Human developer required to rewrite script</span>
                <span className="font-bold text-rose-300">Avg downtime: 3.5 hrs</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Maintenance Overhead:</span>
            <span className="font-bold text-rose-400 uppercase tracking-wide">High / Brittle</span>
          </div>
        </div>

        {/* Autonomous AI Scraper Box (The Solution) */}
        <div className="rounded-2xl border border-emerald-500/50 bg-slate-900/70 p-5 shadow-lg relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Autonomous AI Engine</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-800">
                      Gemini 3.8 Flash Vision + DOM
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-300/80">Self-healing semantic layout adaptation</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SELF-HEALED (100% RECOVERED)</span>
              </span>
            </div>

            {/* Test Results on V1 vs V2 */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 mb-1">Layout V1 (Original)</div>
                <div className="text-lg font-bold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>5 / 5 Extracted</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Accuracy: 99.8%</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                <div className="text-emerald-300 mb-1">Layout V2 (Post-Redesign)</div>
                <div className="text-lg font-bold text-emerald-300 flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>5 / 5 Extracted (Healed)</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Self-repair time: 142ms</div>
              </div>
            </div>

            {/* Self-Healing Diagnosis Summary */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 font-mono text-xs text-emerald-300 space-y-1.5">
              <div className="font-semibold text-emerald-200 flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>AI Structural Synthesis:</span>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200">
                  Confidence: 99.4%
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/90 leading-relaxed font-sans">
                Engine detected 84.5% class refactoring. It automatically re-mapped the primary card entity from <code className="bg-emerald-900/60 px-1 py-0.5 rounded text-white">{scenario.traditionalSelectors.item}</code> to <code className="bg-emerald-900/60 px-1 py-0.5 rounded text-white">article.catalog-item_v2</code> and preserved all laptop specs, pricing, and ratings.
              </p>
              <div className="pt-2 text-[10px] text-emerald-400/90 flex items-center justify-between border-t border-emerald-900/50">
                <span>Autonomous Selector Adaptation</span>
                <span className="font-bold text-emerald-200">Downtime: 0 seconds</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Maintenance Overhead:</span>
            <span className="font-bold text-emerald-400 uppercase tracking-wide">Zero / Self-Managing</span>
          </div>
        </div>
      </div>

      {/* Detailed Self-Healing Selector Diff Mapping Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Self-Healing Selector Calibration Map</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live mapping showing how obsolete selectors were repaired into stable semantic paths.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono">
              Drift Score: 84.5%
            </span>
            <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
              Zero Human Fixes
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Field Entity</th>
                <th className="py-2.5 px-3">Old Selector (V1 - Broken)</th>
                <th className="py-2.5 px-3">AI Healed Selector (V2 - Active)</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Healing Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-semibold text-white">Item Container</td>
                <td className="py-3 px-3 text-rose-400 line-through">{scenario.traditionalSelectors.item}</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">article.catalog-item_v2</td>
                <td className="py-3 px-3 text-emerald-300">99.6%</td>
                <td className="py-3 px-3 text-slate-300 font-sans">
                  Repetitive DOM card cluster detection with microdata alignment
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-semibold text-white">Title / Name</td>
                <td className="py-3 px-3 text-rose-400 line-through">{scenario.traditionalSelectors.title}</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">h3.item-heading</td>
                <td className="py-3 px-3 text-emerald-300">99.8%</td>
                <td className="py-3 px-3 text-slate-300 font-sans">
                  Typographic dominance and heading hierarchy matching
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-semibold text-white">Price / Cost</td>
                <td className="py-3 px-3 text-rose-400 line-through">{scenario.traditionalSelectors.price}</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">div.cost-badge span.val</td>
                <td className="py-3 px-3 text-emerald-300">99.4%</td>
                <td className="py-3 px-3 text-slate-300 font-sans">
                  Currency symbol anchor ($) with numeric regex boundary
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-semibold text-white">Specifications</td>
                <td className="py-3 px-3 text-rose-400 line-through">{scenario.traditionalSelectors.specs}</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">dl.specs-grid dd.spec-pill</td>
                <td className="py-3 px-3 text-emerald-300">98.9%</td>
                <td className="py-3 px-3 text-slate-300 font-sans">
                  Description list (dl/dd) semantic parsing + CPU/GPU keyword recognition
                </td>
              </tr>

              {scenario.traditionalSelectors.rating && (
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">Rating / Review</td>
                  <td className="py-3 px-3 text-rose-400 line-through">{scenario.traditionalSelectors.rating}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">div.customer-sentiment</td>
                  <td className="py-3 px-3 text-emerald-300">99.2%</td>
                  <td className="py-3 px-3 text-slate-300 font-sans">
                    Star glyph (★) and review count anchor
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extracted Structured Records Preview (100% Recovery Verification) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Extracted Data Payload (Post-Healing Verification)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Clean structured JSON generated from the redesigned layout without any missing fields.
            </p>
          </div>
          <button
            onClick={() => handleCopy(JSON.stringify(scenario.sampleRecords, null, 2), 'healed-json')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-all"
          >
            {copiedCode === 'healed-json' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Copy Healed JSON</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {scenario.sampleRecords.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Item #{idx + 1} • Healed
                </span>
                {item.price_usd && (
                  <span className="text-xs font-bold text-white font-mono">
                    ${item.price_usd.toLocaleString()}
                  </span>
                )}
                {item.salary_range && (
                  <span className="text-xs font-bold text-white font-mono">
                    {item.salary_range}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white line-clamp-1">
                {item.laptop_name || item.job_title || item.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2">
                {item.specs || (item.tech_stack ? item.tech_stack.join(', ') : item.address)}
              </p>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Confidence: 99.4%</span>
                <span className="text-emerald-400 font-medium">Valid Schema</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
