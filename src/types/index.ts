import { ChartData } from 'chart.js';

// Tipo para la función que el usuario ingresa (compilada)
export type CompiledFunction = (x: number) => number;

// Interfaz para los datos del formulario
export interface FormInputs {
  func: string;
  a: number;
  b: number;
  tol: number;
  precision: number;
}

// Interfaz para una fila de la tabla de iteraciones
export interface BrentIteration {
  i: number;
  a: number;
  b: number;
  fa: number;
  fb: number;
  error: number;
}

// Interfaz para el objeto de resultados
export interface BrentResult {
  root: number | null;
  iterations: BrentIteration[];
}

// Tipo para los datos de la gráfica de Chart.js
export type LineChartData = ChartData<'line'>;