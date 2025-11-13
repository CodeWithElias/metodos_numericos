// src/logic/brent.ts

import type { BrentResult, BrentIteration, CompiledFunction, IterationDetails } from '../types';

const MAQUINA_EPSILON = 2.220446049250313e-16;

const fNum = (num: number, figs: number) => num.toPrecision(figs);

export function solveBrent(
  f: CompiledFunction,
  a: number,
  b: number,
  tolX: number = 1e-6,
  tolY: number = 1e-6,
  maxIter: number = 100
): BrentResult {

  let fa = f(a);
  let fb = f(b);

  if (fa * fb >= 0) {
    console.error("La función debe tener signos opuestos en a y b.");
    return { root: null, iterations: [] };
  }
  if (Math.abs(fa) < Math.abs(fb)) {
    [a, b] = [b, a];
    [fa, fb] = [fb, fa];
  }

  let c = a;
  let fc = fa;
  let d = b - a; 
  let e = d; 
  
  let mflag = true;
  let iterCount = 0;
  const iterations: BrentIteration[] = [];

  iterations.push({ 
    i: 0, a, b, fa, fb, 
    error: Math.abs(b - a), 
    method: "Inicial",
    details: null
  });

  while (iterCount < maxIter && Math.abs(fb) > tolY) {
    
    // --- 1. GRABAR EL ESTADO INICIAL DE LA ITERACIÓN ---
    const iter_a = a, iter_b = b, iter_c = c;
    const iter_fa = fa, iter_fb = fb, iter_fc = fc;
    const iter_d = d, iter_e = e;
    const m_biseccion = (a + b) / 2;

    let s: number;
    let s_attempted: number | null = null;
    let methodAttempted: 'IQI' | 'Secante';

    // --- Intento de Interpolación (Plan A) ---
    if (fa !== fc && fb !== fc) {
      s = (a * fb * fc) / ((fa - fb) * (fa - fc)) +
          (b * fa * fc) / ((fb - fa) * (fb - fc)) +
          (c * fa * fb) / ((fc - fa) * (fc - fb));
      methodAttempted = 'IQI';
    } else {
      s = b - fb * (b - a) / (fb - fa);
      methodAttempted = 'Secante';
    }
    s_attempted = s;

    // --- Comprobaciones de Seguridad ---
    const tol_actual = 2 * MAQUINA_EPSILON * Math.abs(b) + tolX / 2;
    const m_seguridad = (c - b) / 2;
    const p = (3 * a + b) / 4;
    
    let cond1: boolean;
    if (p < b) { cond1 = (s <= p || s >= b); } 
    else { cond1 = (s >= p || s <= b); }
    
    const cond2 = mflag && (Math.abs(s - b) >= Math.abs(m_seguridad)); 
    const cond3 = !mflag && (Math.abs(s - b) >= Math.abs(iter_e / 2));
    const cond4 = mflag && (Math.abs(m_seguridad) <= tol_actual);
    const cond5 = !mflag && (Math.abs(iter_e) <= tol_actual);

    const checks = { cond1, cond2, cond3, cond4, cond5 };
    let finalMethod: 'IQI' | 'Secante' | 'Bisection';
    let reason = "";

    if (cond1 || cond2 || cond3 || cond4 || cond5) {
      s = m_biseccion;
      mflag = true;
      finalMethod = 'Bisection';
      
      if (cond1) reason = `El paso de interpolación (${fNum(s_attempted, 4)}) se salió del intervalo seguro [${fNum(p < b ? p : b, 4)}, ${fNum(p < b ? b : p, 4)}].`;
      else if (cond2) reason = `La interpolación fue muy grande |s-b| >= |m_seguridad| (${fNum(Math.abs(s - b), 4)} >= ${fNum(Math.abs(m_seguridad), 4)}).`;
      else if (cond3) reason = `La interpolación fue muy grande |s-b| >= |e/2| (${fNum(Math.abs(s - b), 4)} >= ${fNum(Math.abs(iter_e / 2), 4)}).`;
      else if (cond4 || cond5) reason = `El intervalo colapsó (convergencia lenta), forzando Bisección para alcanzar la tolerancia X.`;
      
    } else {
      mflag = false;
      finalMethod = methodAttempted;
      reason = "La interpolación fue aceptada (paso rápido y seguro).";
    }

    // --- 2. CONSTRUIR EL OBJETO 'details' COMPLETO ---
    // En lugar de un objeto 'Partial', creamos el objeto final aquí.
    const iterationDetails: IterationDetails = {
      a: iter_a,
      b: iter_b,
      c: iter_c,
      fa: iter_fa,
      fb: iter_fb,
      fc: iter_fc,
      m: m_biseccion,
      d: iter_d,
      e: iter_e,
      p: p,
      m_seguridad: m_seguridad,
      tol_actual: tol_actual,
      s_attempted: s_attempted,
      methodAttempted: methodAttempted,
      checks: checks,
      finalMethod: finalMethod,
      s_final: s,
      reason: reason
    };
    // --- FIN DE LA CONSTRUCCIÓN ---

    // --- Actualización de variables ---
    let fs = f(s);
    e = d;
    d = b - a;
    c = b;
    fc = fb;

    if (fa * fs < 0) { b = s; fb = fs; } 
    else { a = s; fa = fs; }

    if (Math.abs(fa) < Math.abs(fb)) {
      [a, b] = [b, a];
      [fa, fb] = [fb, fa];
    }
    
    iterCount++;
    iterations.push({ 
      i: iterCount, a, b, fa, fb, 
      error: Math.abs(b - a), 
      method: finalMethod,
      details: iterationDetails // <-- Asignamos el objeto completo
    });
  }

  return { root: b, iterations };
}