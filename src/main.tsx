import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    __COUPLE_HUB_MOUNTED__?: boolean;
  }
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected rendering error',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08050B] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-white/15 bg-[#120A1D] p-6 text-center space-y-4">
            <h1 className="text-xl font-bold text-[#FFD166]">
              Couple Hub — Reload Required
            </h1>
            <p className="text-xs text-[#C9B8D9]">{this.state.errorMessage}</p>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="rounded-xl bg-[#FF2A6D] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Reset Cache &amp; Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement && !window.__COUPLE_HUB_MOUNTED__) {
  window.__COUPLE_HUB_MOUNTED__ = true;
  createRoot(rootElement).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}
