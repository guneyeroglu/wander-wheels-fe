import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { LanguageDetector, TokenDetector } from './components/Detectors';
import Snackbar from './components/Snackbar/Snackbar';
import Loading from './components/Loading/Loading';
import App from './App';

import './assets/i18n';
import './index.scss';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const queryClient = new QueryClient();

  root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageDetector />
        <TokenDetector />
        <Loading>
          <App />
        </Loading>
        <Snackbar />
      </BrowserRouter>
    </QueryClientProvider>,
  );
}
