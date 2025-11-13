// src/components/IterationModal.tsx

import React from 'react';
import type { BrentIteration, IterationDetails } from '../types';
import './IterationModal.css';
import { InlineMath, BlockMath } from 'react-katex';

interface ModalProps {
  iteration: BrentIteration | null;
  onClose: () => void;
  sigFigs: number;
}

const fNum = (num: number, figs: number) => num.toPrecision(figs);

// --- COMPONENTES DE AYUDA (SIN CAMBIOS) ---
const FormulaAttempt: React.FC<{ d: IterationDetails, s: number }> = ({ d, s }) => {
  const canUseIQI = (d.fa !== d.fc && d.fb !== d.fc);
  if (canUseIQI) {
    const iqiFormula = `s = \\frac{a f(b) f(c)}{(f(a)-f(b))(f(a)-f(c))} + \\dots`;
    return (
      <div className="formula-box">
        <h4>Fórmula (Interpolación Cuadrática Inversa):</h4>
        <BlockMath math={iqiFormula} />
        <p>(Se aplica la fórmula completa de Lagrange para 3 puntos)</p>
        <div className="formula-result">
          <strong><InlineMath math="s_{\text{intento}}"/> = {fNum(d.s_attempted ?? 0, s)}</strong>
        </div>
      </div>
    );
  }
  const secantFormula = `s = b - \\frac{f(b) \\cdot (b - a)}{f(b) - f(a)}`;
  const secantCalc = `s = ${fNum(d.b,s)} - \\frac{${fNum(d.fb,s)} \\cdot (${fNum(d.b,s)} - ${fNum(d.a,s)})}{${fNum(d.fb,s)} - ${fNum(d.fa,s)}}`;
  return (
    <div className="formula-box">
      <h4>Fórmula (Secante):</h4>
      <BlockMath math={secantFormula} />
      <BlockMath math={secantCalc} />
      <div className="formula-result">
        <strong><InlineMath math="s_{\text{intento}}"/> = {fNum(d.s_attempted ?? 0, s)}</strong>
      </div>
    </div>
  );
};

const FormulaBisection: React.FC<{ d: IterationDetails, s: number }> = ({ d, s }) => {
  const bisectionFormula = `m = \\frac{a + b}{2}`;
  const bisectionCalc = `m = \\frac{${fNum(d.a,s)} + ${fNum(d.b,s)}}{2} = ${fNum(d.m,s)}`;
  return (
    <div className="formula-box">
      <h4>Fórmula (Bisección):</h4>
      <BlockMath math={bisectionFormula} />
      <BlockMath math={bisectionCalc} />
    </div>
  );
};
// --- FIN COMPONENTES DE AYUDA ---


// --- NUEVO COMPONENTE: PANEL DE DECISIÓN ---
const DecisionPanel: React.FC<{ d: IterationDetails, s: number }> = ({ d, s }) => {
  const { checks: c, s_attempted, b, m_seguridad, p, tol_actual } = d;
  const s_val = s_attempted ?? 0;

  return (
    <ul className="decision-panel">
      {/* Condición 1 */}
      <li className={c.cond1 ? 'fail' : 'pass'}>
        <div className="check-header">
          <span className="check-icon">{c.cond1 ? '✗' : '✓'}</span>
          <span className="check-name">Condición 1: Límite de Intervalo</span>
        </div>
        <div className="check-details">
          <InlineMath math={`s = ${fNum(s_val, s)}`} />
          <InlineMath math={`p = \\frac{3a+b}{4} = ${fNum(p, s)}`} />
          <InlineMath math={`b = ${fNum(b, s)}`} />
          <span>(Resultado: {c.cond1.toString()})</span>
        </div>
        <p className="check-reason">El intento <b>s</b> debe estar dentro del intervalo de seguridad <InlineMath math="[p, b]"/> (o <InlineMath math="[b, p]"/>).</p>
      </li>

      {/* Condición 2 */}
      <li className={c.cond2 ? 'fail' : 'pass'}>
        <div className="check-header">
          <span className="check-icon">{c.cond2 ? '✗' : '✓'}</span>
          <span className="check-name">Condición 2: Flag Bisección</span>
        </div>
        <div className="check-details">
          <InlineMath math={`|s - b| = ${fNum(Math.abs(s_val - b), s)}`} />
          <InlineMath math={`|m_{\\text{seg}}| = \\frac{|c-b|}{2} = ${fNum(Math.abs(m_seguridad), s)}`} />
        </div>
        <p className="check-reason">Si el último paso fue Bisección, el nuevo paso <InlineMath math="|s-b|"/> debe ser <b>menor que</b> el paso anterior <InlineMath math="|m_{\\text{seg}}|"/>.</p>
      </li>
      
      {/* Condición 3 */}
      <li className={c.cond3 ? 'fail' : 'pass'}>
        <div className="check-header">
          <span className="check-icon">{c.cond3 ? '✗' : '✓'}</span>
          <span className="check-name">Condición 3: Flag Interpolación</span>
        </div>
        <div className="check-details">
          <InlineMath math={`|s - b| = ${fNum(Math.abs(s_val - b), s)}`} />
          <InlineMath math={`|e/2| = ${fNum(Math.abs(d.e / 2), s)}`} />
        </div>
        <p className="check-reason">Si el último paso fue Interpolación, el nuevo paso <InlineMath math="|s-b|"/> debe ser <b>menor que</b> el paso k-2 <InlineMath math="|e/2|"/>.</p>
      </li>
      
      {/* Condición 4 */}
      <li className={c.cond4 ? 'fail' : 'pass'}>
        <div className="check-header">
          <span className="check-icon">{c.cond4 ? '✗' : '✓'}</span>
          <span className="check-name">Condición 4: Colapso Bisección</span>
        </div>
        <div className="check-details">
          <InlineMath math={`|m_{\\text{seg}}| = ${fNum(Math.abs(m_seguridad), s)}`} />
          <InlineMath math={`tol_{\\text{actual}} = ${fNum(tol_actual, s)}`} />
        </div>
        <p className="check-reason">¿Es el paso anterior <InlineMath math="|m_{\\text{seg}}|"/> <b>menor que</b> la tolerancia?</p>
      </li>

      {/* Condición 5 */}
      <li className={c.cond5 ? 'fail' : 'pass'}>
        <div className="check-header">
          <span className="check-icon">{c.cond5 ? '✗' : '✓'}</span>
          <span className="check-name">Condición 5: Colapso Interpolación</span>
        </div>
        <div className="check-details">
          <InlineMath math={`|e| = ${fNum(Math.abs(d.e), s)}`} />
          <InlineMath math={`tol_{\\text{actual}} = ${fNum(tol_actual, s)}`} />
        </div>
        <p className="check-reason">¿Es el paso k-2 <InlineMath math="|e|"/> <b>menor que</b> la tolerancia?</p>
      </li>
    </ul>
  );
};
// --- FIN DEL NUEVO COMPONENTE ---


// --- COMPONENTE PRINCIPAL DEL MODAL (ACTUALIZADO) ---
const IterationModal: React.FC<ModalProps> = ({ iteration, onClose, sigFigs }) => {
  if (!iteration || !iteration.details) {
    return null;
  }

  const { details } = iteration;
  const useBisection = details.finalMethod === "Bisection";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Paso a Paso: Iteración {iteration.i}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>1. Estado Inicial de la Iteración</h3>
            <ul className="state-list">
              <li><InlineMath math="a ="/> <span>{fNum(details.a, sigFigs)}</span></li>
              <li><InlineMath math="f(a) ="/> <span>{fNum(details.fa, sigFigs)}</span></li>
              <li><InlineMath math="b ="/> <span>{fNum(details.b, sigFigs)}</span></li>
              <li><InlineMath math="f(b) ="/> <span>{fNum(details.fb, sigFigs)}</span></li>
              <li><InlineMath math="c ="/> <span>{fNum(details.c, sigFigs)}</span></li>
              <li><InlineMath math="f(c) ="/> <span>{fNum(details.fc, sigFigs)}</span></li>
            </ul>
          </div>

          <div className="modal-section">
            <h3>2. Intento de Cálculo (Plan A)</h3>
            <p>El algoritmo intenta usar el método: <strong>{details.methodAttempted}</strong>.</p>
            <FormulaAttempt d={details} s={sigFigs} />
          </div>

          <div className="modal-section">
            <h3>3. Comprobación de Seguridad</h3>
            <p>Se calcula el Plan B (Bisección) y se comparan los planes.</p>
            <FormulaBisection d={details} s={sigFigs} />
            <p style={{marginTop: '1rem'}}>Se ejecutan las 5 comprobaciones de seguridad:</p>
            {/* --- REEMPLAZAMOS LA LISTA SIMPLE POR EL PANEL DETALLADO --- */}
            <DecisionPanel d={details} s={sigFigs} />
          </div>

          <div className="modal-section">
            <h3>4. Decisión Final</h3>
            <p className="reason-text">
              <span className={useBisection ? 'fail' : 'pass'}>
                <strong>{useBisection ? 'FALLO DE SEGURIDAD' : 'ÉXITO'}</strong>
              </span>
              {details.reason}
            </p>
            <div className="formula-result final">
              <strong><InlineMath math="s_{\text{final}}"/> = {fNum(details.s_final, sigFigs)}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IterationModal;