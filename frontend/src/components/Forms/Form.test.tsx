import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./Form"; 
import { vi, MockedFunction } from "vitest";
import api from "../../utils/api";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("../../utils/api", () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom"); 
  
    return {
      ...actual,
      useNavigate: vi.fn(),
    };
  });


const mockLoginResponse = { token: "mocked-token" };
const mockRegisterResponse = { token: "" }; 

describe("Form Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Form route="auth/login" method="login" />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getAllByText("Login").length).toBe(2);
  });

  it("renders register form correctly", () => {
    render(
      <MemoryRouter>
        <Form route="auth/register" method="register" />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getAllByText("Register").length).toBe(2);
  });

  it("shows an error message when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Form route="/login" method="login" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    
    await waitFor(() => expect(screen.queryByText("Wrong email or password")).not.toBeInTheDocument());
  });

  it("submits login form successfully", async () => {
    (api.post as MockedFunction<typeof api.post>).mockImplementationOnce(() => {
      return Promise.resolve({ data: mockLoginResponse });
    });

    const navigateMock = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    render(
      <MemoryRouter>
        <Form route="auth/login" method="login" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("auth/login", {
      username: "testuser",
      password: "password123",
    }));
    
    expect(localStorage.getItem("token")).toBe("mocked-token");
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("submits register form successfully", async () => {
    (api.post as MockedFunction<typeof api.post>).mockImplementationOnce(() => {
      return Promise.resolve({ data: mockRegisterResponse });
    });

    const navigateMock = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    
    render(
      <MemoryRouter>
        <Form route="auth/register" method="register" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "newuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password456" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("auth/register", {
      username: "newuser",
      password: "password456",
    }));

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("shows an error message on API failure", async () => {
    (api.post as MockedFunction<typeof api.post>).mockImplementationOnce(() => {
      return Promise.reject(new Error("Error"));
    });

    render(
      <MemoryRouter>
        <Form route="/login" method="login" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText("Network Error")).toBeInTheDocument());
  });
});
