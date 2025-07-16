import { render , screen, fireEvent } from "@testing-library/react";
import WelcomePage from "./WelcomePage.tsx";
import { vi, describe, it, expect } from "vitest";

const mockSetLocation = vi.fn()

vi.mock("wouter", () => ({
    useLocation: () => ["/welcome", mockSetLocation]
}));


describe("WelcomePage", () => {
    beforeEach(() => {
        mockSetLocation.mockClear();
    })


    it("renders the welcome page correctly", () => {
        render (<WelcomePage />);
        expect(screen.getByText("Start Exploring")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Start Exploring" })).toBeInTheDocument();
    });

    it("calls setLocation('/') when the button is clicked", () => {
        render(<WelcomePage />);
        const button = screen.getByRole("button", { name: "Start Exploring" });

        fireEvent.click(button);
        expect(mockSetLocation).toHaveBeenCalledWith("/");
    });
});