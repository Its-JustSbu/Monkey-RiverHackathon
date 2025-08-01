import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogIn from "./login";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock BACKEND_URL
jest.mock("../../assets/globalVariables", () => ({
  BACKEND_URL: "http://mock-backend",
}));

describe("LogIn component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Storage.prototype.setItem = jest.fn();
  });

  it("renders login form", () => {
    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("submits form and navigates on successful login", async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ token: "abc123" }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://mock-backend/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: {
              email: "test@example.com",
              password: "password123",
            },
          }),
        })
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "auth",
        expect.any(Object)
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("does not navigate on failed login", async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});