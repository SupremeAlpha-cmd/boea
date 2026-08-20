import React from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BOEA Application Error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrap">
          <div className="error-boundary-card">
            <div className="error-boundary-icon-box">
              <ShieldAlert size={36} className="gold-text" />
            </div>
            <span className="label-caps gold-text">Best of Edo Award System</span>
            <h1 className="headline-lg" style={{ color: 'var(--primary)', margin: '0.5rem 0' }}>
              Unexpected Application Error
            </h1>
            <p className="body-md text-muted" style={{ maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              We encountered an issue rendering this section. Please return to the homepage or try reloading the page.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" onClick={this.handleReload} className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <RotateCcw size={16} /> Return to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
