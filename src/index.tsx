import ReactDOM from 'react-dom/client';

import { store } from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom/dist';
import { Provider } from 'react-redux/es';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
}
