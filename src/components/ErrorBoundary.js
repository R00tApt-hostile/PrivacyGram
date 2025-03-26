import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In production, log to error tracking service
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback theme={this.props.theme} />;
    }
    return this.props.children;
  }
}

const ErrorFallback = ({ theme }) => (
  <div style={{
    padding: '2rem',
    backgroundColor: theme['background-primary'],
    color: theme['text-primary'],
    textAlign: 'center'
  }}>
    <h2>Something went wrong</h2>
    <p>Please refresh the page or try again later</p>
    <button 
      onClick={() => window.location.reload()}
      style={{
        padding: '0.5rem 1rem',
        background: theme['accent-color'],
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Reload App
    </button>
  </div>
);

export default function ThemedErrorBoundary(props) {
  const { themeConfig } = useTheme();
  return <ErrorBoundary theme={themeConfig} {...props} />;
}
