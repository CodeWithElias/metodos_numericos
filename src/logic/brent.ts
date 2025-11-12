// src/logic/brent.ts

import type { BrentResult, BrentIteration, CompiledFunction, IterationDetails } from '../types';

// Epsilon de la máquina: el número más pequeño que la máquina puede diferenciar de 1.
const MAQUINA_EPSILON = 2.220446049250313e-16;

/**
 * Función de ayuda simple para formatear números
 */
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
  let d = b - a; // 'd' es el paso de la iteración anterior
  let e = d; // 'e' es el paso de la iterTación anterior a 'd'
  
  let mflag = true;
  let iterCount = 0;
  const iterations: BrentIteration[] = [];

  iterations.push({ 
    i: 0, a, b, fa, fb, 
    error: Math.abs(b - a), 
    method: "Inicial",
    details: null
  });

  // --- BUCLE CORREGIDO ---
  // El bucle principal comprueba el valor de Y (fb) y las iteraciones.
  // La tolerancia de X (tolX) se comprueba DENTRO del bucle
  // usando 'tol_actual' en las condiciones 4 y 5.
  while (iterCount < maxIter && Math.abs(fb) > tolY) {
    
    // Guardamos un "snapshot" del estado inicial de la iteración
    const iter_a = a, iter_b = b, iter_c = c;
    const iter_fa = fa, iter_fb = fb, iter_fc = fc;
    const iter_d = d, iter_e = e; // Graba 'd' y 'e' ANTES de que cambien
    const m_biseccion = (a + b) / 2; // Punto medio del actual (para el modal)
    const details: Partial<IterationDetails> = {
      a: iter_a, b: iter_b, c: iter_c,
      fa: iter_fa, fb: iter_fb, fc: iter_fc,
      m: m_biseccion,
      d: iter_d, e: iter_e,
    };

    let s: number;
    let s_attempted: number | null = null;
    let methodAttempted: 'IQI' | 'Secante';

    // --- Intento de Interpolación (Plan A) ---
    if (fa !== fc && fb !== fc) {
      // Interpolación Cuadrática Inversa (IQI)
      s = (a * fb * fc) / ((fa - fb) * (fa - fc)) +
          (b * fa * fc) / ((fb - fa) * (fb - fc)) +
          (c * fa * fb) / ((fc - fa) * (fc - fb));
      methodAttempted = 'IQI';
    } else {
      // Método de la Secante
      s = b - fb * (b - a) / (fb - fa);
      methodAttempted = 'Secante';
    }
    s_attempted = s;
    details.attemptedMethod = methodAttempted;
    details.s_attempted = s_attempted;

    // --- Comprobaciones de Seguridad ---
    // Esta es la tolerancia de X real, que incluye la precisión de la máquina.
    const tol_actual = 2 * MAQUINA_EPSILON * Math.abs(b) + tolX / 2;
    const m_seguridad = (c - b) / 2; // Punto medio del *último* paso
    const p = (3 * a + b) / 4; // Punto 3/4 del intervalo actual
    
    details.tol_actual = tol_actual;
    details.m_seguridad = m_seguridad;
    details.p = p;
    
    let cond1: boolean; // ¿Fuera de rango?
    if (p < b) { cond1 = (s <= p || s >= b); } 
    else { cond1 = (s >= p || s <= b); }
    
    const cond2 = mflag && (Math.abs(s - b) >= Math.abs(m_seguridad)); // ¿Paso muy grande (vs Bisección)?
    const cond3 = !mflag && (Math.abs(s - b) >= Math.abs(iter_e / 2)); // ¿Paso muy grande (vs Secante)?
    
    // --- CORRECCIÓN CRÍTICA ---
    // ¿El paso anterior ya es MÁS PEQUEÑO o IGUAL que la tolerancia de X?
    const cond4 = mflag && (Math.abs(m_seguridad) <= tol_actual);
    const cond5 = !mflag && (Math.abs(iter_e) <= tol_actual);
    // --- FIN DE LA CORRECCIÓN ---

    details.checks = { cond1, cond2, cond3, cond4, cond5 };
    let finalMethod: 'IQI' | 'Secante' | 'Bisection';
    let reason = "";

    if (cond1 || cond2 || cond3 || cond4 || cond5) {
      // Fallback: Forzamos Bisección
      s = m_biseccion;
      mflag = true;
      finalMethod = 'Bisection';
      
      // Encontramos la razón
      if (cond1) reason = `El paso de interpolación (${fNum(s_attempted, 4)}) se salió del intervalo seguro [${fNum(p < b ? p : b, 4)}, ${fNum(p < b ? b : p, 4)}].`;
      else if (cond2) reason = `La interpolación fue muy grande |s-b| >= |m_seguridad| (${fNum(Math.abs(s - b), 4)} >= ${fNum(Math.abs(m_seguridad), 4)}).`;
      else if (cond3) reason = `La interpolación fue muy grande |s-b| >= |e/2| (${fNum(Math.abs(s - b), 4)} >= ${fNum(Math.abs(iter_e / 2), 4)}).`;
      else if (cond4 || cond5) reason = `El intervalo colapsó (convergencia lenta), forzando Bisección para alcanzar la tolerancia X.`;
      
    } else {
      // Éxito: Aceptamos la Interpolación
      mflag = false;
      finalMethod = methodAttempted;
      reason = "La interpolación fue aceptada (paso rápido y seguro).";
    }

    details.finalMethod = finalMethod;
    details.s_final = s;
    details.reason = reason;

    // --- Actualización de variables ---
    let fs = f(s);
    e = d; // 'e' se convierte en 'd' (paso k-2)
    d = b - a; // 'd' se convierte en el paso (k-1)

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
      details: details as IterationDetails
    });
  }

  return { root: b, iterations };
}