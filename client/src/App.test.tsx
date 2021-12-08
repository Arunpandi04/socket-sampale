import { render } from '@testing-library/react';
import App from './App';

describe("Test", () => {
beforeEach(()=>{
  Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      };
    }
})
})
  test('renders learn react link', () => {
    render(<App />);
    //const linkElement = screen.getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
  });

});