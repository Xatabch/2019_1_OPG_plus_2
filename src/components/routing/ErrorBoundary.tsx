import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>Что-то пошло не так</h1>
          <p className={styles.message}>
            Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.
          </p>
          <Link to="/" className={styles.link} onClick={() => this.setState({ hasError: false })}>
            На главную
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
