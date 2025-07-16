import { render, screen, fireEvent } from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import {RouteButton} from "./RouteButton.tsx";

describe("RouteButton", () => {
    it("does not render when the Routebuttons visibility is set to false", () => {
        const { container } = render(
            <RouteButton visible={false} onClick={() => {}} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("label will be shown as Directions to this point if label is null", () => {
        render(<RouteButton visible={true} onClick={() => {}} />);
        expect(screen.getByText("Directions to This Point")).toBeInTheDocument();
    });

    it("renders custom label for the route button", () => {
        render(<RouteButton visible={true} onClick={() => {}} label={"Cafe"} />);
        expect(screen.getByText("Directions to Cafe")).toBeInTheDocument();
    });

    it("calls the function onCLick when button is clicked", () => {
        const onClickMock = vi.fn();
        render(<RouteButton visible={true} onClick={onClickMock} label="Cafe" />);
        fireEvent.click(screen.getByRole("button"));
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});