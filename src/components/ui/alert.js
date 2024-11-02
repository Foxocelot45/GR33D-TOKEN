// src/components/ui/alert.js
import React from 'react';
import './alert.css';

export function Alert({ variant = 'info', children }) {
  return <div className={`alert ${variant}`}>{children}</div>;
}

export function AlertTitle({ children }) {
  return <h4 className="alert-title">{children}</h4>;
}

export function AlertDescription({ children }) {
  return <p className="alert-description">{children}</p>;
}

export default Alert;
