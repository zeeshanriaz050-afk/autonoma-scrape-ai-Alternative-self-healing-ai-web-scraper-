import React, { useState } from 'react';
import {
  Database,
  FileSpreadsheet,
  Send,
  Download,
  Copy,
  Check,
  Code2,
  CheckCircle2,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
} from 'lucide-react';
import { ScrapeResult } from '../types/scraper';

interface ExportSyncCenterProps {
  currentResult: ScrapeResult | null;
}

export const ExportSyncCenter: React.FC<ExportSyncCenterProps> = ({ currentResult }) => {
  const [activeFormat, setActiveFormat] = useState<'sheets' | 'postgres' | 'webhook' | 'json' | 'csv'>('sheets');
  const [webhookUrl, setWebhookUrl] = useState<string>('https://webhook.site/demo-autonoma-pipeline');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const records = currentResult?.records || [];
  const artifacts = currentResult?.exportArtifacts;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTestWebhook = async () => {
    setIsDispatching(true);
    setDispatchResult(null);
    try {
      const res = await fetch('/api/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl,
          samplePayload: {
            pipeline: 'AutonomaScrape AI',
            timestamp: new Date().toISOString(),
            recordCount: records.length,
            records,
          },
        }),
      });
      const data = await res.json();
      setDispatchResult(data);
    } catch (e: any) {
      setDispatchResult({ status: 0, statusText: e.message });
    } finally {
      setIsDispatching(false);
    }
  };

  if (!currentResult || records.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">No Extraction Pipeline Output Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Execute an extraction in the Extraction Studio or Self-Healing Sandbox first. Your clean data will appear here ready for instant sync.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Data Pipeline & Integrations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Auto-Sync Extracted Data to Google Sheets, PostgreSQL & Webhooks
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Eliminate manual data cleaning. Export structured tables directly to downstream databases, spreadsheets, or automated webhook endpoints.
          </p>
        </div>

        {/* Format Selector */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setActiveFormat('sheets')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              activeFormat === 'sheets'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Google Sheets Format</span>
          </button>

          <button
            onClick={() => setActiveFormat('postgres')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              activeFormat === 'postgres'
                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>PostgreSQL Schema & SQL</span>
          </button>

          <button
            onClick={() => setActiveFormat('webhook')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              activeFormat === 'webhook'
                ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Webhook Auto-Push</span>
          </button>

          <button
            onClick={() => setActiveFormat('json')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              activeFormat === 'json'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Structured JSON</span>
          </button>

          <button
            onClick={() => setActiveFormat('csv')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              activeFormat === 'csv'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>CSV Export</span>
          </button>
        </div>
      </div>

      {/* Format-Specific Detail Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
        {/* Tab 1: Google Sheets */}
        {activeFormat === 'sheets' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Google Sheets Instant Clipboard Sync</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Tab-separated values (TSV) formatted precisely so you can press Copy, open any Google Sheet, and press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">Cmd+V</kbd> or <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">Ctrl+V</kbd>.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(artifacts?.sheetsTsv || '', 'sheets-tsv')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20"
                >
                  {copiedId === 'sheets-tsv' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied for Google Sheets!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy for Google Sheets</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-emerald-400">
                TSV Preview (Columns & Rows):
              </div>
              <pre className="text-xs text-slate-300 font-mono overflow-x-auto max-h-60 p-2 bg-slate-900/60 rounded-lg">
                {artifacts?.sheetsTsv}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: PostgreSQL */}
        {activeFormat === 'postgres' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span>PostgreSQL DDL & Batch INSERT SQL Script</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Auto-generates strict PostgreSQL table schemas matching extracted data types and multi-row INSERT queries.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(artifacts?.sqlScript || '', 'postgres-sql')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-all"
                >
                  {copiedId === 'postgres-sql' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied SQL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    handleDownload(
                      artifacts?.sqlScript || '',
                      `autonoma_scrape_${Date.now()}.sql`,
                      'text/sql'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-blue-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .SQL</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-blue-300 font-mono overflow-x-auto max-h-72">
              {artifacts?.sqlScript}
            </pre>
          </div>
        )}

        {/* Tab 3: Webhook Auto-Push */}
        {activeFormat === 'webhook' && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Send className="w-4 h-4 text-purple-400" />
                <span>Real-Time Webhook Pipeline Dispatcher</span>
              </h3>
              <p className="text-xs text-slate-400">
                Push extracted structured records directly to Zapier, Make, n8n, Slack, or any custom API microservice.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Destination Webhook URL:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  placeholder="https://your-api.com/webhooks/scraper-sink"
                  className="flex-1 rounded-xl bg-slate-950 border border-slate-700/80 px-4 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleTestWebhook}
                  disabled={isDispatching}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 disabled:opacity-50 transition-all flex items-center space-x-1.5"
                >
                  {isDispatching ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Trigger Webhook Test</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Dispatch Result Card */}
            {dispatchResult && (
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Webhook Test Delivery Completed</span>
                  </span>
                  <span className="font-mono text-purple-300">
                    Status: {dispatchResult.status} ({dispatchResult.statusText})
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Latency: {dispatchResult.latencyMs}ms • Payload: {records.length} records ({dispatchResult.payloadSize} bytes)
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: JSON */}
        {activeFormat === 'json' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>Formatted JSON</span>
                </h3>
                <p className="text-xs text-slate-400">Strictly validated JSON object array.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(artifacts?.jsonString || '', 'json-dl')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-all"
                >
                  {copiedId === 'json-dl' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    handleDownload(
                      artifacts?.jsonString || '',
                      `scraped_data_${Date.now()}.json`,
                      'application/json'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .JSON</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono overflow-x-auto max-h-72">
              {artifacts?.jsonString}
            </pre>
          </div>
        )}

        {/* Tab 5: CSV */}
        {activeFormat === 'csv' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Comma-Separated Values (CSV)</span>
                </h3>
                <p className="text-xs text-slate-400">Standard RFC 4180 CSV compatible with Excel, Numbers, and Pandas.</p>
              </div>

              <button
                onClick={() =>
                  handleDownload(
                    artifacts?.csvString || '',
                    `scraped_data_${Date.now()}.csv`,
                    'text/csv'
                  )
                }
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .CSV</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto max-h-72">
              {artifacts?.csvString}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
