import { render, screen } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import LoadingScreen from "./LoadingScreen";

describe('LoadingScreen', () => {
    it('renders the loading screen elements correctly', () => {
        render(<LoadingScreen />);

        expect(screen.getByRole('heading', { name: /Mittweida Timetravel/i })).toBeInTheDocument();
        expect(screen.getByAltText(/Timetravel Logo/i)).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', expect.stringContaining('timetravel-logo-invert.svg'));
    });
});