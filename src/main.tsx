import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LanguageDetector } from './global/interceptors';
import App from './App.tsx';

import './assets/i18n';
import './index.scss';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const queryClient = new QueryClient();

  root.render(
    <QueryClientProvider client={queryClient}>
      <LanguageDetector />
      <App />
    </QueryClientProvider>,
  );
}
