// src/types/index.ts

import type { ChartData } from 'chart.js';

export type CompiledFunction = (x: number) => number;
export interface FormInputs { /* ... (sin cambios) ... */ }

// --- INTERFAZ DE DETALLES MEJORADA ---
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
  methodAttempted: 'IQI' | 'Secante';
  
  // ----- NUEVAS VARIABLES DE DECISIÓN -----
  d: number; // Paso de la iteración k-1
  e: number; // Paso de la iteración k-2
  p: number; // Punto 3/4 del intervalo (para cond1)
  m_seguridad: number; // Punto medio del paso anterior (para cond2)
  tol_actual: number; // Tolerancia dinámica (para cond4, cond5)
  // ----- FIN DE NUEVAS VARIABLES -----

  // Chequeos de seguridad (los booleanos)
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
// --- FIN DE LA MEJORA ---

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

export interface BrentResult { /* ... (sin cambios) ... */ }
export type LineChartData = ChartData<'line'>;