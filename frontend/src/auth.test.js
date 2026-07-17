import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Redux/index';
import DLogin from './components_pages_services/Pages/Dashboard/Dashboard-Login/DLogin';
import DSignup from './components_pages_services/Pages/Dashboard/Dashboard-Login/Signup/DSignup';

const createTestStore = () => createStore(rootReducer, applyMiddleware(thunk));

describe('Frontend Auth Components Tests', () => {
  
  // ----------------------------------------------------
  // Test 3: Login page renders the ID input field
  // ----------------------------------------------------
  test('3. Login page renders the ID input field', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DLogin />
        </Provider>
      </MemoryRouter>
    );
    const idInput = screen.getByPlaceholderText('e.g., DOC-001');
    expect(idInput).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // Test 4: Login page renders the Password input field
  // ----------------------------------------------------
  test('4. Login page renders the Password input field', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DLogin />
        </Provider>
      </MemoryRouter>
    );
    const passwordLabels = screen.getAllByText(/password/i);
    expect(passwordLabels.length).toBeGreaterThan(0);
  });

  // ----------------------------------------------------
  // Test 5: Login page renders the Submit/Login button
  // ----------------------------------------------------
  test('5. Login page renders the submit button', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DLogin />
        </Provider>
      </MemoryRouter>
    );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // Test 6: Input field responds to user value change
  // ----------------------------------------------------
  test('6. Login inputs accept typing values', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DLogin />
        </Provider>
      </MemoryRouter>
    );
    const idInput = screen.getByPlaceholderText('e.g., DOC-001');
    fireEvent.change(idInput, { target: { value: 'DOC-123' } });
    expect(idInput.value).toBe('DOC-123');
  });

  // ----------------------------------------------------
  // Test 7: Login page renders the heading
  // ----------------------------------------------------
  test('7. Login page renders the header title', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DLogin />
        </Provider>
      </MemoryRouter>
    );
    const heading = screen.getByText('Staff Login');
    expect(heading).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // Test 8: Signup page renders without crashing
  // ----------------------------------------------------
  test('8. Signup page renders without crashing', () => {
    const store = createTestStore();
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <DSignup />
        </Provider>
      </MemoryRouter>
    );
    expect(container).toBeDefined();
  });

  // ----------------------------------------------------
  // Test 9: Signup page renders name input field
  // ----------------------------------------------------
  test('9. Signup page renders name input field', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DSignup />
        </Provider>
      </MemoryRouter>
    );
    // Find heading labeled Name
    const nameLabel = screen.getByText('Name');
    expect(nameLabel).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // Test 10: Signup page renders submit button
  // ----------------------------------------------------
  test('10. Signup page renders submit button', () => {
    const store = createTestStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DSignup />
        </Provider>
      </MemoryRouter>
    );
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeInTheDocument();
  });

});
