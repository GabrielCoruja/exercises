import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>),
  };
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('routes', () => {
  afterEach(cleanup);

  test('navigating from home to projects', () => {
    const { getByText } = renderWithRouter(<App />);

    const personalInfo = getByText(/Nome Completo/i);
    expect(personalInfo).toBeInTheDocument();

    fireEvent.click(getByText(/Projetos/i));

    const project = getByText(/Projeto 1/i);
    expect(project).toBeInTheDocument();
  });

  test('navigating from home to getInTouch', () => {
    const { getByText } = renderWithRouter(<App />);

    const personalInfo = getByText(/Nome Completo/i);
    expect(personalInfo).toBeInTheDocument();

    fireEvent.click(getByText(/Entre em contato/i));

    const getInTouch = getByText(/Mensagem de contato/i);
    expect(getInTouch).toBeInTheDocument();
  });

  test('landing on a bad page shows error 404', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/some/bad/route' });

    const pageNotFound = getByText(/Página não encontrada/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
