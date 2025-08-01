import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./signup";
import { MemoryRouter } from "react-router-dom";

// Pseudocode plan:
// 1. Mock dependencies: useNavigate, BACKEND_URL, toast, localStorage.
// 2. Render the SignUp component inside a MemoryRouter.
// 3. Test rendering: check for form fields and button.
// 4. Test successful signup: fill form, submit, mock fetch success, expect navigation.
// 5. Test failed signup: fill form, submit, mock fetch failure, expect no navigation.


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../assets/globalVariables", () => ({
  BACKEND_URL: "http://mock-backend",
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("SignUp component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders signup form fields and button", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("submits form and navigates on successful signup", async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ user: { id: 1 } }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://mock-backend/auth/sign-up",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: {
              name: "Test User",
              email: "test@example.com",
              password: "password123",
            },
          }),
        })
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("does not navigate on failed signup", async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Signup failed" }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});