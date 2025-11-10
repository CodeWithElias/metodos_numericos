// src/logic/brent.ts

import type { BrentResult, BrentIteration, CompiledFunction } from '../types';

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
  let mflag = true;
  
  // --- CAMBIO AQUÍ (Iteración 0) ---
  let iterCount = 0;
  const iterations: BrentIteration[] = [];
  // Guardamos el estado inicial como Iteración 0
  iterations.push({ i: 0, a, b, fa, fb, error: Math.abs(b - a) });
  // --- FIN DEL CAMBIO ---

  while (iterCount < maxIter && Math.abs(fb) > tolY && Math.abs(b - a) > tolX) {
    
    let s: number;

    if (fa !== fc && fb !== fc) {
      // ... (IQI)
      s = (a * fb * fc) / ((fa - fb) * (fa - fc)) +
          (b * fa * fc) / ((fb - fa) * (fb - fc)) +
          (c * fa * fb) / ((fc - fa) * (fc - fb));
    } else {
      // ... (Secante)
      s = b - fb * (b - a) / (fb - fa);
    }

    const cond1 = (s < (3 * a + b) / 4 || s > b);
    const cond2 = mflag && (Math.abs(s - b) >= Math.abs(b - c) / 2);
    const cond3 = !mflag && (Math.abs(s - b) >= Math.abs(c - d) / 2);
    const cond4 = mflag && (Math.abs(b - c) < tolX);
    const cond5 = !mflag && (Math.abs(c - d) < tolX);

    if (cond1 || cond2 || cond3 || cond4 || cond5) {
      s = (a + b) / 2;
      mflag = true;
    } else {
      mflag = false;
    }

    const fs = f(s);
    d = c;
    c = b;
    fc = fb;

    if (fa * fs < 0) {
      b = s;
      fb = fs;
    } else {
      a = s;
      fa = fs;
    }

    if (Math.abs(fa) < Math.abs(fb)) {
      [a, b] = [b, a];
      [fa, fb] = [fb, fa];
    }
    
    // --- CAMBIO AQUÍ (Iteración 0) ---
    // Incrementamos el contador y lo usamos para la siguiente iteración
    iterCount++;
    iterations.push({ i: iterCount, a, b, fa, fb, error: Math.abs(b - a) });
    // --- FIN DEL CAMBIO ---
  }

  return { root: b, iterations };
}