import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code2,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../data/sampleWebsites';
import { ScrapeResult } from '../types/scraper';

interface ExtractionStudioProps {
  onRunScrape: (params: {
    scenarioId: string;
    prompt: string;
    layoutVersion: 'v1' | 'v2';
  }) => Promise<ScrapeResult | null>;
  currentResult: ScrapeResult | null;
  isLoading: boolean;
  onNavigateToSync: () => void;
}

export const ExtractionStudio: React.FC<ExtractionStudioProps> = ({
  onRunScrape,
  currentResult,
  isLoading,
  onNavigateToSync,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('laptops-ecommerce');
  const [prompt, setPrompt] = useState<string>(
    'Mujhe is e-commerce site se saare laptops ke naam, price, specs, rating aur in-stock status extract kar ke clean JSON mein do.'
  );
  const [layoutVersion, setLayoutVersion] = useState<'v1' | 'v2'>('v1');
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'json'>('cards');
  const [copied, setCopied] = useState<boolean>(false);
  const [showWebpagePreview, setShowWebpagePreview] = useState<boolean>(false);

  const scenario = SAMPLE_SCENARIOS.find(s => s.id === selectedScenarioId) || SAMPLE_SCENARIOS[0];

  const handleSelectScenario = (scenId: string) => {
    setSelectedScenarioId(scenId);
    const scen = SAMPLE_SCENARIOS.find(s => s.id === scenId);
    if (scen) {
      setPrompt(scen.defaultPrompt);
    }
  };

  const handleExecute = () => {
    onRunScrape({
      scenarioId: selectedScenarioId,
      prompt,
      layoutVersion,
    });
  };

  const handleCopyJson = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(JSON.stringify(currentResult.records, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Preset prompts for quick testing
  const presetPrompts = [
    {
      label: 'Urdu / Roman Urdu (from prompt)',
      text: 'Mujhe is e-commerce site se saare laptops ke naam, price, specs, rating aur in-stock status extract kar ke clean JSON mein do.',
    },
    {
      label: 'English Tech Specs',
      text: 'Extract all laptop names, brand, price in USD, full hardware specifications, star rating, and stock status into clean structured JSON.',
    },
    {
      label: 'Minimal Pricing & Availability',
      text: 'Extract only laptop name, current price, and whether it is in stock or backordered.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Configuration & Prompt Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Extraction Pipeline</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Natural Language Web Scraping Studio
            </h2>
            <p className="text-xs text-slate-400">
              Instruct in plain English, Urdu, or any language. Gemini 3.8 Flash parses DOM semantic layouts directly.
            </p>
          </div>

          {/* Target Scenario Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Catalog Target:
            </span>
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              {SAMPLE_SCENARIOS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSelectScenario(s.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    selectedScenarioId === s.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s.title.split('-')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Layout Version Switcher & Self-Healing Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Layout Version:</span>
            <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
              <button
                onClick={() => setLayoutVersion('v1')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  layoutVersion === 'v1'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                V1 (Original Layout)
              </button>
              <button
                onClick={() => setLayoutVersion('v2')}
                className={`px-3 py-1 rounded-md font-medium transition-all flex items-center space-x-1 ${
                  layoutVersion === 'v2'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>V2 (Revamped Redesign - Self-Heals)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-400">
            <button
              onClick={() => setShowWebpagePreview(!showWebpagePreview)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showWebpagePreview ? 'Hide Target DOM Preview' : 'Preview Target Webpage HTML'}</span>
            </button>
          </div>
        </div>

        {/* Webpage HTML Live Frame Preview (if toggled) */}
        {showWebpagePreview && (
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-mono text-cyan-300">Target URL: {scenario.sourceUrl}</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                Active Layout: {layoutVersion.toUpperCase()}
              </span>
            </div>
            <div
              className="p-4 rounded-lg bg-white text-slate-900 max-h-64 overflow-y-auto font-sans text-xs border border-slate-700"
              dangerouslySetInnerHTML={{
                __html: layoutVersion === 'v2' ? scenario.v2Html : scenario.v1Html,
              }}
            />
          </div>
        )}

        {/* Natural Language Prompt Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Natural Language Extraction Command:</span>
            <span className="text-[11px] text-cyan-400 font-normal lowercase">
              No CSS selectors or Python scraping scripts required
            </span>
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={3}
              placeholder="E.g. Mujhe is e-commerce site se saare laptops ke naam, price, aur specs extract kar ke JSON mein do..."
              className="w-full rounded-xl bg-slate-950 border border-slate-700/80 p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
            />
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500">Quick presets:</span>
            {presetPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setPrompt(p.text)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Execution Button & Pipeline Metrics Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Model: <strong className="text-white">Gemini 3.8 Flash</strong></span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Self-Healing: <strong className="text-emerald-400">Active</strong></span>
            </span>
          </div>

          <button
            onClick={handleExecute}
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Running Autonomous Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Execute Autonomous Scraper</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results & Pipeline Output Section */}
      {currentResult && (
        <div className="space-y-6">
          {/* Health & Diagnostic Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Status</div>
              <div className="text-base font-bold text-white flex items-center space-x-1.5">
                {currentResult.status === 'healed' ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Self-Healed (V2)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400">Success</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Records Extracted</div>
              <div className="text-base font-bold text-white font-mono">
                {currentResult.recordCount} Items
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">AI Confidence</div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {currentResult.confidenceScore}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Pipeline Latency</div>
              <div className="text-base font-bold text-white font-mono flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentResult.executionTimeMs} ms</span>
              </div>
            </div>
          </div>

          {/* Self-Healing Alert Badge (if layout was V2) */}
          {currentResult.selfHealing && currentResult.selfHealing.triggered && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-900/80 text-emerald-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-200">
                    Self-Healing Engine Engaged & Calibrated
                  </h4>
                  <p className="text-xs text-slate-300">
                    {currentResult.selfHealing.aiExplanation}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 font-mono shadow-sm">
                0 Crashes • 100% Data Fidelity
              </span>
            </div>
          )}

          {/* Data Explorer Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">Extracted Structured Catalog</h3>
                <span className="text-xs text-slate-400 font-mono">
                  ({currentResult.records.length} records)
                </span>
              </div>

              {/* View Switchers & Copy Action */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-2.5 py-1 rounded-md flex items-center space-x-1 transition-all ${
                      viewMode === 'cards'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>

                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-2.5 py-1 rounded-md flex items-center space-x-1 transition-all ${
                      viewMode === 'table'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>

                  <button
                    onClick={() => setViewMode('json')}
                    className={`px-2.5 py-1 rounded-md flex items-center space-x-1 transition-all ${
                      viewMode === 'json'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Raw JSON</span>
                  </button>
                </div>

                <button
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onNavigateToSync}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Sync / Export</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* View: Cards */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentResult.records.map((rec, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 hover:border-cyan-500/40 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/50">
                          #{i + 1}
                        </span>
                        {rec.price_usd && (
                          <span className="text-sm font-bold text-white font-mono">
                            ${rec.price_usd.toLocaleString()}
                          </span>
                        )}
                        {rec.salary_range && (
                          <span className="text-xs font-bold text-white font-mono">
                            {rec.salary_range}
                          </span>
                        )}
                        {rec.monthly_rent && (
                          <span className="text-xs font-bold text-white font-mono">
                            {rec.monthly_rent}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white line-clamp-2">
                        {rec.laptop_name || rec.job_title || rec.title || `Entity ${i + 1}`}
                      </h4>

                      {rec.brand && (
                        <div className="text-xs text-slate-400">
                          Brand: <span className="text-slate-200 font-medium">{rec.brand}</span>
                        </div>
                      )}

                      {rec.specs && (
                        <p className="text-xs text-slate-300/90 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 font-sans leading-relaxed">
                          {rec.specs}
                        </p>
                      )}

                      {rec.tech_stack && Array.isArray(rec.tech_stack) && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rec.tech_stack.map((t: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/40"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      {rec.rating !== undefined && (
                        <span className="text-amber-400 font-medium">★ {rec.rating}</span>
                      )}
                      {rec.in_stock !== undefined && (
                        <span
                          className={`font-semibold ${
                            rec.in_stock ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {rec.in_stock ? 'In Stock' : 'Backordered'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View: Table */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      {Object.keys(currentResult.records[0] || {}).map(k => (
                        <th key={k} className="py-2.5 px-3">{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                    {currentResult.records.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-slate-500">{i + 1}</td>
                        {Object.keys(r).map(k => (
                          <td key={k} className="py-2.5 px-3 text-slate-200">
                            {typeof r[k] === 'object' ? JSON.stringify(r[k]) : String(r[k])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View: JSON */}
            {viewMode === 'json' && (
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto max-h-96">
                {JSON.stringify(currentResult.records, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
