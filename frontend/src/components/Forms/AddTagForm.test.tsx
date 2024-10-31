import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { AddTagForm } from "./AddTagForm";
import { vi, MockedFunction } from "vitest";
import api from "../../utils/api";

vi.mock("../../utils/api", () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

const mockAddTagResponse = { data: "Tag added successfully" };

( api.post as MockedFunction<typeof api.post>).mockImplementation((url) => {
  if (url === "user/tag/add") return Promise.resolve(mockAddTagResponse);
  return Promise.reject(new Error("not found"));
});

beforeAll(() => {
  window.alert = vi.fn();
});

describe("AddTagForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form elements correctly", async () => {
    await act(async () => {
      render(<AddTagForm />);
    });
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("shows an error if required fields are missing", async () => {
    await act(async () => {
      render(<AddTagForm />);
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Please fill all input fields")).toBeInTheDocument());
  });

  it("submits the form successfully", async () => {
    await act(async () => {
      render(<AddTagForm />);
    });

    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "New Tag" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(api.post).toHaveBeenCalledTimes(1));
    
    expect(api.post).toHaveBeenCalledWith("user/tag/add", expect.objectContaining({
      id: 0,
      name: "New Tag",
    }));
  });

  it("shows an error message on API failure", async () => {
    (api.post as MockedFunction<typeof api.post>).mockImplementationOnce(() => {
      return Promise.reject(new Error("Network error"));
    });

    await act(async () => {
      render(<AddTagForm />);
    });

    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "New Tag" } });
    
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Unable to add tag: Error: Network error")).toBeInTheDocument());
  });
});
