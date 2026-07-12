import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Redux/index';
import App from './App';

const createTestStore = () => createStore(rootReducer, applyMiddleware(thunk));

describe('Frontend App Rendering Tests', () => {
  test('1. App renders without crashing', () => {
    const store = createTestStore();
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });

  test('2. App renders the main portal title', () => {
    const store = createTestStore();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    
    // The main portal / landing page has a portal title or login link.
    // Let's verify that the welcome portal is visible.
    const loginLink = screen.getByRole('button', { name: /login now/i });
    expect(loginLink).toBeInTheDocument();
  });
});
