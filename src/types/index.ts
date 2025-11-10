// src/types/index.ts

import type { ChartData } from 'chart.js';

export type CompiledFunction = (x: number) => number;

export interface FormInputs {
  func: string;
  a: number;
  b: number;
  tolX: number;
  tolY: number;
  // --- CAMBIO AQUÍ ---
  sigFigs: number; // Renombrado de 'precision'
  // --- FIN DEL CAMBIO ---
}

export interface BrentIteration {
  i: number;
  a: number;
  b: number;
  fa: number;
  fb: number;
  error: number;
}

export interface BrentResult {
  root: number | null;
  iterations: BrentIteration[];
}

export type LineChartData = ChartData<'line'>;