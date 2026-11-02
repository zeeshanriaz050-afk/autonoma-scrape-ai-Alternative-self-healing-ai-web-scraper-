export interface ScrapeRequest {
  url?: string;
  scenarioId?: string;
  html?: string;
  prompt: string;
  layoutVersion?: 'v1' | 'v2';
  targetSchema?: SchemaField[];
  autoSync?: {
    webhookUrl?: string;
    postgresTable?: string;
    format?: 'json' | 'csv' | 'sql' | 'sheets';
  };
}

export interface SchemaField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required?: boolean;
}

export interface HealedSelector {
  field: string;
  originalSelector: string;
  healedSelector: string;
  confidence: number;
  reason: string;
  status: 'healed' | 'stable' | 'fallback_semantic';
}

export interface SelfHealingDiagnosis {
  triggered: boolean;
  layoutDriftScore: number; // 0 - 100%
  breakageReason: string;
  selectorMappings: HealedSelector[];
  traditionalScraperMatches: number;
  autonomousScraperMatches: number;
  repairTimeMs: number;
  aiExplanation: string;
}

export interface ScrapeResult {
  id: string;
  timestamp: string;
  sourceUrl: string;
  scenarioTitle: string;
  prompt: string;
  status: 'success' | 'healed' | 'error';
  executionTimeMs: number;
  tokensUsed?: number;
  recordCount: number;
  confidenceScore: number;
  records: Record<string, any>[];
  detectedSchema: SchemaField[];
  selfHealing?: SelfHealingDiagnosis;
  domStats: {
    totalElements: number;
    prunedNodes: number;
    textLength: number;
    layoutType: string;
  };
  exportArtifacts?: {
    jsonString: string;
    csvString: string;
    sqlScript: string;
    sheetsTsv: string;
  };
}

export interface SampleScenario {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  defaultPrompt: string;
  sourceUrl: string;
  v1Html: string;
  v2Html: string;
  traditionalSelectors: {
    item: string;
    [field: string]: string;
  };
  sampleRecords: Record<string, any>[];
}
