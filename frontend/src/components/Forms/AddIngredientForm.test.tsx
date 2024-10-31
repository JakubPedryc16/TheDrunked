import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { AddIngredientForm } from "./AddIngredientForm";
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

const mockUploadResponse = { data: "uploaded-image-url" };
const mockAddIngredientResponse = { data: "Ingredient added successfully" };

( api.post as MockedFunction<typeof api.post>).mockImplementation((url) => {
  if (url === "user/upload") return Promise.resolve(mockUploadResponse);
  if (url === "user/ingredient/add") return Promise.resolve(mockAddIngredientResponse);
  return Promise.reject(new Error("not found"));
});

beforeAll(() => {
  window.alert = vi.fn();
  window.URL.createObjectURL = vi.fn(() => "mocked-url");
});

describe("AddIngredientForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form elements correctly", async () => {
    await act(async () => {
      render(<AddIngredientForm />);
    });
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    expect(screen.getByLabelText(/upload/i)).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("shows an error if required fields are missing", async () => {
    await act(async () => {
      render(<AddIngredientForm />);
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Please add image file to the cocktail")).toBeInTheDocument());
  });

  it("shows an error if file size exceeds limit", async () => {
    await act(async () => {
      render(<AddIngredientForm />);
    });

    const file = new File(["a".repeat(6 * 1024 * 1024)], "large-file.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/upload/i);

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "New Ingredient" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("File size exceeded, maximum size is 5MB")).toBeInTheDocument());
  });

  it("shows an error for unsupported image file type", async () => {
    await act(async () => {
      render(<AddIngredientForm />);
    });

    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "New Ingredient" } });

    const file = new File(["sample"], "sample.gif", { type: "image/gif" });
    const fileInput = screen.getByLabelText(/upload/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("File must be of type .jpg, .jpeg or .png")).toBeInTheDocument());
  });

  it("uploads the image and submits form successfully", async () => {
    await act(async () => {
      render(<AddIngredientForm />);
    });

    const file = new File(["sample"], "sample.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/upload/i);
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "New Ingredient" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(api.post).toHaveBeenCalledTimes(2));

    expect(api.post).toHaveBeenCalledWith("user/upload", expect.any(FormData), expect.any(Object));
    expect(api.post).toHaveBeenCalledWith("user/ingredient/add", expect.objectContaining({
      name: "New Ingredient",
      image: mockUploadResponse.data,
    }));
  });
});
