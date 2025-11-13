// src/types/index.ts

import type { ChartData } from 'chart.js';

export type CompiledFunction = (x: number) => number;

export interface FormInputs {
  func: string;
  a: number;
  b: number;
  tolX: number;
  tolY: number;
  sigFigs: number;
}

export interface IterationDetails {
  // Estado inicial
  a: number;
  b: number;
  c: number;
  fa: number;
  fb: number;
  fc: number;

  // Plan B (Bisección)
  m: number; 

  // Plan A (Interpolación)
  s_attempted: number | null;
  methodAttempted: 'IQI' | 'Secante'; // <-- La propiedad SÍ existe aquí
  
  // Variables de Decisión
  d: number;
  e: number;
  p: number;
  m_seguridad: number;
  tol_actual: number;

  // Chequeos de seguridad
  checks: {
    cond1: boolean;
    cond2: boolean;
    cond3: boolean;
    cond4: boolean;
    cond5: boolean;
  };
  
  // Decisión final
  finalMethod: 'IQI' | 'Secante' | 'Bisection';
  s_final: number;
  reason: string;
}

export interface BrentIteration {
  i: number;
  a: number;
  b: number;
  fa: number;
  fb: number;
  error: number;
  method: string;
  details: IterationDetails | null; 
}

export interface BrentResult {
  root: number | null;
  iterations: BrentIteration[];
}

export type LineChartData = ChartData<'line'>;