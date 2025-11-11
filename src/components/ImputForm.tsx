import { useState, useEffect } from 'react';
import * as math from 'mathjs';
import type { FormInputs } from '../types';

interface InputFormProps {
  onSubmit: (inputs: FormInputs) => void;
  isLoading: boolean;
}

function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [func, setFunc] = useState('x^3 - x - 3');
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [tolX, setTolX] = useState('0.00001');
  const [tolY, setTolY] = useState('0.00001');
  const [sigFigs, setSigFigs] = useState('8');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(true);

  // Validar entradas en tiempo real
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};

    // Validar función
    try {
      math.compile(func);
    } catch {
      newErrors.func = 'Función inválida. Use sintaxis matemática válida (ej: x^2 + 2*x - 1)';
    }

    // Validar límites
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA)) {
      newErrors.a = 'Límite inferior debe ser un número válido';
    }
    if (isNaN(numB)) {
      newErrors.b = 'Límite superior debe ser un número válido';
    }
    if (!isNaN(numA) && !isNaN(numB) && numA >= numB) {
      newErrors.a = 'Límite inferior debe ser menor que el límite superior';
      newErrors.b = 'Límite superior debe ser mayor que el límite inferior';
    }

    // Validar tolerancias
    const numTolX = parseFloat(tolX);
    const numTolY = parseFloat(tolY);
    if (isNaN(numTolX) || numTolX <= 0) {
      newErrors.tolX = 'Tolerancia en x debe ser un número positivo';
    }
    if (isNaN(numTolY) || numTolY <= 0) {
      newErrors.tolY = 'Tolerancia en y debe ser un número positivo';
    }

    // Validar precisión
    const numPrecision = parseInt(sigFigs, 10);
    if (isNaN(numPrecision) || numPrecision < 1 || numPrecision > 15) {
      newErrors.sigFigs = 'Cifras significativas deben estar entre 1 y 15';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [func, a, b, tolX, tolY, sigFigs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({
        func,
        a: parseFloat(a),
        b: parseFloat(b),
        tolX: parseFloat(tolX),
        tolY: parseFloat(tolY),
        sigFigs: parseInt(sigFigs, 10),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="form-group span-2">
        <label>Función f(x):</label>
        <input
          type="text"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          className={errors.func ? 'error' : ''}
        />
        {errors.func && <span className="error-message">{errors.func}</span>}
      </div>

      <div className="form-group">
        <label>Límite inferior (a):</label>
        <input
          type="number"
          step="any"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className={errors.a ? 'error' : ''}
        />
        {errors.a && <span className="error-message">{errors.a}</span>}
      </div>
      <div className="form-group">
        <label>Límite superior (b):</label>
        <input
          type="number"
          step="any"
          value={b}
          onChange={(e) => setB(e.target.value)}
          className={errors.b ? 'error' : ''}
        />
        {errors.b && <span className="error-message">{errors.b}</span>}
      </div>
      <div className="form-group">
        <label>Tolerancia en x:</label>
        <input
          type="number"
          step="any"
          value={tolX}
          onChange={(e) => setTolX(e.target.value)}
          className={errors.tolX ? 'error' : ''}
        />
        {errors.tolX && <span className="error-message">{errors.tolX}</span>}
      </div>

      <div className="form-group">
        <label>Tolerancia en y:</label>
        <input
          type="number"
          step="any"
          value={tolY}
          onChange={(e) => setTolY(e.target.value)}
          className={errors.tolY ? 'error' : ''}
        />
        {errors.tolY && <span className="error-message">{errors.tolY}</span>}
      </div>

      <div className="form-group">
        <label>Cifras Significativas:</label>
        <input
          type="number"
          step="1"
          min="1"
          max="15"
          value={sigFigs}
          onChange={(e) => setSigFigs(e.target.value)}
          className={errors.sigFigs ? 'error' : ''}
        />
        {errors.sigFigs && <span className="error-message">{errors.sigFigs}</span>}
      </div>

      <button type="submit" className="span-2" disabled={!isValid || isLoading}>
        {isLoading ? "Calculando..." : "Calcular Raíz"}
      </button>
    </form>
  );
}

export default InputForm;
