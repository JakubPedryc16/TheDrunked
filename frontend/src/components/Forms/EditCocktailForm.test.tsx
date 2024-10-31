import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { EditCocktailForm, SimpleCocktail } from "./EditCocktailForm";
import { vi, MockedFunction } from "vitest";
import axios from "axios";

vi.mock("axios", () => {
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

vi.mock("../../utils/fileUtils", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation((image, type, setImageBlob) => {
    setImageBlob("mocked-image-url");
  }),
}));

beforeAll(() => {
    window.alert = vi.fn();
    window.URL.createObjectURL = vi.fn(() => "mocked-url");
});

const mockUploadResponse = { data: "uploaded-image-url" };
const mockEditCocktailResponse = { data: "Cocktail updated successfully" };

const mockSetEditMode = vi.fn();
const mockHandleCocktailEdit = vi.fn();

const cocktailData: SimpleCocktail = {
  id: 1,
  name: "Margarita",
  image: "image-url.jpg",
  description: "A refreshing cocktail",
};

(axios.post as MockedFunction<typeof axios.post>).mockImplementation((url) => {
  if (url === "user/upload") return Promise.resolve(mockUploadResponse);
  return Promise.reject(new Error("not found"));
});

(axios.put as MockedFunction<typeof axios.put>).mockImplementation((url) => {
  if (url === "user/cocktail/edit") return Promise.resolve(mockEditCocktailResponse);
  return Promise.reject(new Error("not found"));
});

describe("EditCocktailForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form elements with pre-filled values", async () => {
    await act(async () => {
      render(
        <EditCocktailForm
          {...cocktailData}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    expect(screen.getByDisplayValue("Margarita")).toBeInTheDocument();
    expect(screen.getByAltText("Cocktail Image")).toHaveAttribute("src", "mocked-image-url");
    expect(screen.getByDisplayValue("A refreshing cocktail")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("shows an error if unsupported image file type is uploaded", async () => {
    await act(async () => {
      render(
        <EditCocktailForm
          {...cocktailData}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    const file = new File(["sample"], "sample.gif", { type: "image/gif" });
    const fileInput = screen.getByLabelText(/upload/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() =>
      expect(screen.getByText("File must be of type .jpg, .jpeg or .png")).toBeInTheDocument()
    );
  });

  it("shows an error if the file size exceeds 5MB", async () => {
    await act(async () => {
      render(
        <EditCocktailForm
          {...cocktailData}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], "large-file.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/upload/i);
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() =>
      expect(screen.getByText("File size exceeded, maximum size is 5MB")).toBeInTheDocument()
    );
  });

  it("uploads the image and submits form with edited cocktail data", async () => {
    await act(async () => {
      render(
        <EditCocktailForm
          {...cocktailData}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByDisplayValue("Margarita"), { target: { value: "Updated Margarita" } });
    fireEvent.change(screen.getByDisplayValue("A refreshing cocktail"), { target: { value: "An updated description" } });

    const file = new File(["sample"], "sample.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/upload/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("user/upload", expect.any(FormData), expect.any(Object));
      expect(axios.put).toHaveBeenCalledWith("user/cocktail/edit", expect.objectContaining({
        id: cocktailData.id,
        name: "Updated Margarita",
        image: mockUploadResponse.data,
        description: "An updated description",
      }));
    });

    expect(mockHandleCocktailEdit).toHaveBeenCalledWith({
      id: cocktailData.id,
      name: "Updated Margarita",
      image: mockUploadResponse.data,
      description: "An updated description",
    });

    expect(mockSetEditMode).toHaveBeenCalled();
  });
});
