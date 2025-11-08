import { useState } from 'react';
import type { FormInputs } from '../types';


interface InputFormProps {
  onSubmit: (inputs: FormInputs) => void;
}

function InputForm({ onSubmit }: InputFormProps) {
  const [func, setFunc] = useState('x^3 - x - 2');
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [tol, setTol] = useState('0.0001');
  const [precision, setPrecision] = useState('8');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      func,
      a: parseFloat(a),
      b: parseFloat(b),
      tol: parseFloat(tol),
      precision: parseInt(precision, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      {/* Campo de Función (ocupa 2 columnas) */}
      <div className="form-group span-2">
        <label>Función f(x):</label>
        <input
          type="text"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          placeholder="Ej: x^3 - x - 2"
        />
      </div>

      <div className="form-group">
        <label>Límite inferior (a):</label>
        <input
          type="number"
          step="any"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Límite superior (b):</label>
        <input
          type="number"
          step="any"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Tolerancia:</label>
        <input
          type="number"
          step="any"
          value={tol}
          onChange={(e) => setTol(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Cifras Decimales:</label>
        <input
          type="number"
          step="1"
          min="1"
          max="15"
          value={precision}
          onChange={(e) => setPrecision(e.target.value)}
        />
      </div>

      <button type="submit" className="span-2">Calcular Raíz</button>
    </form>
  );
}

export default InputForm;