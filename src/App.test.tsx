import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import App from '@/App';

// Mock RouterView component
jest.mock('@/RouterView', () => ({
  __esModule: true,
  default: () => <div data-testid="router-view">Router View</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('App Component', () => {
  it('renders the main heading', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText('Dicey Drinks')).toBeInTheDocument();
  });

  it('renders the heading as a link', () => {
    renderWithRouter(<App />);
    
    const link = screen.getByRole('link', { name: 'Dicey Drinks' });
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the router view', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByTestId('router-view')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    renderWithRouter(<App />);
    
    const appDiv = screen.getByText('Dicey Drinks').closest('.app');
    expect(appDiv).toBeInTheDocument();
    
    const appContent = screen.getByText('Router View').closest('.app-content');
    expect(appContent).toBeInTheDocument();
  });
});
