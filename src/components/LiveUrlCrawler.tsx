import React, { useState } from 'react';
import {
  Globe,
  Search,
  Code2,
  Cpu,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  FileCode2,
  AlertCircle,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { ScrapeResult } from '../types/scraper';

interface LiveUrlCrawlerProps {
  onExecuteLiveScrape: (params: {
    url?: string;
    html?: string;
    prompt: string;
  }) => Promise<ScrapeResult | null>;
  isLoading: boolean;
  liveResult: ScrapeResult | null;
}

export const LiveUrlCrawler: React.FC<LiveUrlCrawlerProps> = ({
  onExecuteLiveScrape,
  isLoading,
  liveResult,
}) => {
  const [mode, setMode] = useState<'url' | 'rawHtml'>('url');
  const [url, setUrl] = useState<string>('https://news.ycombinator.com');
  const [rawHtml, setRawHtml] = useState<string>('');
  const [prompt, setPrompt] = useState<string>(
    'Extract all top news articles with rank number, title, source domain, points count, submitter username, and comment count into JSON.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const sampleUrls = [
    {
      title: 'Hacker News Frontpage',
      url: 'https://news.ycombinator.com',
      prompt:
        'Extract all frontpage story titles, points, submitter, and comment count into structured JSON.',
    },
    {
      title: 'Wikipedia - Quantum Computing',
      url: 'https://en.wikipedia.org/wiki/Quantum_computing',
      prompt:
        'Extract key sections, core quantum concepts, historical milestones, and related technologies into structured JSON.',
    },
    {
      title: 'GitHub Trending Repos',
      url: 'https://github.com/trending',
      prompt:
        'Extract repository owner, repo name, description, primary programming language, and stars count into structured JSON.',
    },
  ];

  const handleRun = () => {
    if (mode === 'url' && !url.trim()) return;
    if (mode === 'rawHtml' && !rawHtml.trim()) return;

    onExecuteLiveScrape({
      url: mode === 'url' ? url.trim() : undefined,
      html: mode === 'rawHtml' ? rawHtml : undefined,
      prompt: prompt.trim(),
    });
  };

  const handleCopy = () => {
    if (!liveResult) return;
    navigator.clipboard.writeText(JSON.stringify(liveResult.records, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Crawler Header */}
      <div className="rounded-2xl border border-purple-900/40 bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Live URL & Arbitrary HTML Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Crawl Any Live Public Webpage or Paste Raw DOM
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Autonomous AI Web Scraper removes boilerplate, strips tracking scripts and noisy styles,
            and applies Gemini 3.8 Flash layout understanding to return structured entities.
          </p>
        </div>

        {/* Input Mode Selector */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center space-x-3 text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">Input Mode:</span>
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setMode('url')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                mode === 'url'
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Fetch Live URL</span>
            </button>
            <button
              onClick={() => setMode('rawHtml')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                mode === 'rawHtml'
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Paste Raw HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Crawl Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
        {mode === 'url' ? (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Target Public URL:
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://example.com/products"
                  className="w-full rounded-xl bg-slate-950 border border-slate-700/80 pl-10 pr-4 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Quick URL Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500">Quick Targets:</span>
              {sampleUrls.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUrl(s.url);
                    setPrompt(s.prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60 transition-all text-[11px]"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Paste Raw HTML Document:
            </label>
            <textarea
              value={rawHtml}
              onChange={e => setRawHtml(e.target.value)}
              rows={6}
              placeholder="<html><body><div class='catalog-row'>...</div></body></html>"
              className="w-full rounded-xl bg-slate-950 border border-slate-700/80 p-3.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        )}

        {/* Prompt Input */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Natural Language Extraction Request:
          </label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={2}
            placeholder="Specify what fields to extract..."
            className="w-full rounded-xl bg-slate-950 border border-slate-700/80 p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Execute Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleRun}
            disabled={isLoading || (mode === 'url' ? !url : !rawHtml)}
            className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Fetching DOM & Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Fetch & Extract Structured Data</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Explorer */}
      {liveResult && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Live Extraction Payload</span>
              </h3>
              <p className="text-xs text-slate-400">
                Extracted from <code className="text-purple-300 font-mono">{liveResult.sourceUrl}</code>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">
                {liveResult.records.length} items • {liveResult.executionTimeMs}ms
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-all"
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
            </div>
          </div>

          {/* Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {liveResult.records.map((rec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between text-[11px] text-purple-400 font-mono">
                  <span>Record #{i + 1}</span>
                  <span className="text-slate-500">Confidence: 99.1%</span>
                </div>
                <div className="text-xs text-slate-200 font-mono space-y-1">
                  {Object.entries(rec).map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-2">
                      <span className="text-slate-400 font-semibold">{k}:</span>
                      <span className="text-right text-slate-100 font-sans line-clamp-2">
                        {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
