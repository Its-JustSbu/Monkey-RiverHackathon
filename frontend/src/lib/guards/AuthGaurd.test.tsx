import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import AuthGuard from "./AuthGuard";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("AuthGuard", () => {
  const DummyComponent = () => <div>Protected Content</div>;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the protected component when user is authenticated", async () => {
    render(
      <MemoryRouter>
        <AuthGuard component={<DummyComponent />} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeTruthy();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("navigates to /auth when user is not authenticated", async () => {
    // Override checkToken logic to simulate unauthenticated user
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => {
      f();
      return () => {};
    });
    const originalUseState = React.useState;
    jest.spyOn(React, "useState").mockImplementationOnce(() => [false, jest.fn()]);

    render(
      <MemoryRouter>
        <AuthGuard component={<DummyComponent />} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/auth");
    });

    // Restore mocks
    (React.useState as any).mockRestore?.();
    (React.useEffect as any).mockRestore?.();
  });
});