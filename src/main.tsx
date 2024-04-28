import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LanguageDetector, TokenDetector } from './components/Detectors';
import App from './App';
import Snackbar from './components/Snackbar/Snackbar';

import './assets/i18n';
import './index.scss';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const queryClient = new QueryClient();

  root.render(
    <QueryClientProvider client={queryClient}>
      <LanguageDetector />
      <TokenDetector />
      <App />
      <Snackbar />
    </QueryClientProvider>,
  );
}
