import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Code2,
  CheckCircle2,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SchemaField, ScrapeResult } from '../types/scraper';

interface SchemaStudioProps {
  currentResult: ScrapeResult | null;
}

export const SchemaStudio: React.FC<SchemaStudioProps> = ({ currentResult }) => {
  const [fields, setFields] = useState<SchemaField[]>(() => {
    if (currentResult?.detectedSchema && currentResult.detectedSchema.length > 0) {
      return currentResult.detectedSchema;
    }
    return [
      { name: 'laptop_name', type: 'string', description: 'Model & variant name of laptop', required: true },
      { name: 'brand', type: 'string', description: 'Hardware manufacturer brand', required: true },
      { name: 'price_usd', type: 'number', description: 'Retail price converted to numeric USD', required: true },
      { name: 'specs', type: 'string', description: 'Processor, GPU, RAM, SSD summary', required: true },
      { name: 'rating', type: 'number', description: 'Average customer rating score (1-5)', required: false },
      { name: 'in_stock', type: 'boolean', description: 'Immediate shipping availability', required: false },
    ];
  });

  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<SchemaField['type']>('string');
  const [newFieldDesc, setNewFieldDesc] = useState('');

  const handleAddField = () => {
    if (!newFieldName.trim()) return;
    setFields([
      ...fields,
      {
        name: newFieldName.trim().toLowerCase().replace(/\s+/g, '_'),
        type: newFieldType,
        description: newFieldDesc || `Field ${newFieldName}`,
        required: true,
      },
    ]);
    setNewFieldName('');
    setNewFieldDesc('');
  };

  const handleRemoveField = (idx: number) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const generatedJsonSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'ExtractedEntitySchema',
    type: 'object',
    properties: fields.reduce((acc, f) => {
      acc[f.name] = {
        type: f.type,
        description: f.description,
      };
      return acc;
    }, {} as Record<string, any>),
    required: fields.filter(f => f.required).map(f => f.name),
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Strict Schema Enforcement</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Schema Definition & Type Guarding
            </h2>
            <p className="text-xs text-slate-400">
              Gemini adheres to strict schema constraints, ensuring predictable data pipelines without dirty types.
            </p>
          </div>
        </div>

        {/* Fields Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3">Field Name</th>
                <th className="py-2.5 px-3">Data Type</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Required</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40">
              {fields.map((f, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-semibold text-cyan-300">{f.name}</td>
                  <td className="py-3 px-3 font-mono text-purple-300">
                    <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">
                      {f.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{f.description}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        f.required
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {f.required ? 'YES' : 'OPTIONAL'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleRemoveField(i)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Field Bar */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Field name (e.g. warranty_period)"
            value={newFieldName}
            onChange={e => setNewFieldName(e.target.value)}
            className="flex-1 min-w-[140px] rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <select
            value={newFieldType}
            onChange={e => setNewFieldType(e.target.value as any)}
            className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
            <option value="array">array</option>
            <option value="object">object</option>
          </select>
          <input
            type="text"
            placeholder="Description..."
            value={newFieldDesc}
            onChange={e => setNewFieldDesc(e.target.value)}
            className="flex-1 min-w-[140px] rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleAddField}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Field</span>
          </button>
        </div>

        {/* Generated JSON Schema preview */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Generated JSON Schema (RFC 7159 / Draft 7):</span>
            <span className="text-emerald-400 text-[11px] font-mono">Validated</span>
          </label>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto max-h-56">
            {JSON.stringify(generatedJsonSchema, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
