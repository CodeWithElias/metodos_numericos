import type { BrentIteration, BrentResult, CompiledFunction } from "../types";


export function solveBrent(
  f: CompiledFunction,
  a: number,
  b: number,
  tolerance: number = 1e-6,
  maxIter: number = 100
): BrentResult {
  
  let fa = f(a);
  let fb = f(b);

  if (fa * fb >= 0) {
    console.error("La función debe tener signos opuestos en a y b.");
    return { root: null, iterations: [] };
  }

  // Asegurar que 'b' sea la mejor estimación (menor f(x))
  if (Math.abs(fa) < Math.abs(fb)) {
    [a, b] = [b, a];
    [fa, fb] = [fb, fa];
  }

  let c = a; // c es el contrapunto
  let fc = fa;
  let d = b - a; // d se usa para la bisección
  let e = d;
  let mflag = true; // Flag para usar bisección o interpolación
  
  const iterations: BrentIteration[] = [];
  let iterCount = 0;

  while (iterCount < maxIter && Math.abs(fb) > tolerance && Math.abs(b - a) > tolerance) {
    let s: number;

    // --- Lógica de Interpolación ---
    if (fa !== fc && fb !== fc) {
      // Interpolación Cuadrática Inversa (IQI)
      s = (a * fb * fc) / ((fa - fb) * (fa - fc)) +
          (b * fa * fc) / ((fb - fa) * (fb - fc)) +
          (c * fa * fb) / ((fc - fa) * (fc - fb));
    } else {
      // Interpolación Secante
      s = b - fb * (b - a) / (fb - fa);
    }

    // --- Comprobaciones de Seguridad (El corazón de Brent) ---
    const cond1 = (s < (3 * a + b) / 4 || s > b);
    const cond2 = mflag && (Math.abs(s - b) >= Math.abs(b - c) / 2);
    const cond3 = !mflag && (Math.abs(s - b) >= Math.abs(c - d) / 2);
    const cond4 = mflag && (Math.abs(b - c) < tolerance);
    const cond5 = !mflag && (Math.abs(c - d) < tolerance);

    if (cond1 || cond2 || cond3 || cond4 || cond5) {
      // Fallback a Bisección
      s = (a + b) / 2;
      mflag = true;
    } else {
      mflag = false;
    }

    let fs = f(s);
    d = c;       // Guardar valores anteriores
    e = d;
    c = b;
    fc = fb;

    if (fa * fs < 0) {
      b = s;
      fb = fs;
    } else {
      a = s;
      fa = fs;
    }

    // Asegurar que 'b' sigue siendo la mejor estimación
    if (Math.abs(fa) < Math.abs(fb)) {
      [a, b] = [b, a];
      [fa, fb] = [fb, fa];
    }
    
    iterCount++;
    iterations.push({ i: iterCount, a, b, fa, fb, error: Math.abs(b - a) });
  }

  return { root: b, iterations };
}