import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { AddCocktailForm } from "./AddCocktailForm";
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
  default: vi.fn().mockImplementation((image, type, setImage) => {
    setImage("mocked-image-url");
  }),
}));

const mockUploadResponse = { data: "uploaded-image-url" };
const mockAddCocktailResponse = { data: "Cocktail added successfully" };
const mockIngredients = [{ id: 1, name: "Vodka", image: "example" }];
const mockTags = [{ id: 1, name: "Classic", image: "example" }];

(axios.get as MockedFunction<typeof axios.get>).mockImplementation((url) => {
  if (url === "user/ingredients") return Promise.resolve({ data: mockIngredients });
  if (url === "user/tags") return Promise.resolve({ data: mockTags });
  return Promise.reject(new Error("not found"));
});

(axios.post as MockedFunction<typeof axios.post>).mockImplementation((url) => {
  if (url === "user/upload") return Promise.resolve(mockUploadResponse);
  if (url === "user/cocktail/add") return Promise.resolve(mockAddCocktailResponse);
  return Promise.reject(new Error("not found"));
});

beforeAll(() => {
  window.alert = vi.fn();
  window.URL.createObjectURL = vi.fn(() => "mocked-url");
});

vi.mock('../Other/UseFirstViewportEntry', () => ({
  UseFirstViewportEntry: () => true, 
}));

describe("AddCocktailForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form elements correctly", async () => {
    await act(async () => {
      render(<AddCocktailForm />);
    });
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter ingredient amount")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("fetches ingredients and tags on mount", async () => {
    await act(async () => {
      render(<AddCocktailForm />);
    });
    await expectGetMethods();
  });

  it("shows an error if required fields are missing", async () => {
    await act(async () => {
      render(<AddCocktailForm />);
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Please add image file to the cocktail")).toBeInTheDocument());
  });

  it("allows selecting and displaying ingredients and tags", async () => {
    await act(async () => {
      render(<AddCocktailForm />);
    });

    await expectGetMethods();
    addIngredientsAndTags();

    const ingredients = screen.getAllByText(/vodka/i);
    expect(ingredients.length).toBe(2);

    const tags = screen.getAllByText(/classic/i);
    expect(tags.length).toBe(2);
  });

  it("shows an error for unsupported image file type", async () => {
    await act(async () => {
      render(<AddCocktailForm />);
    });

    await expectGetMethods();
    addIngredientsAndTags();

    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "Margarita" } });
    fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "A refreshing cocktail" } });

    const file = new File(["sample"], "sample.gif", { type: "image/gif" });
    const fileInput = screen.getByLabelText(/upload/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("File must be of type .jpg, .jpeg or .png")).toBeInTheDocument());
  });

  it("uploads the image and submits form successfully", async () => {
    await act(async () => {
      render(<AddCocktailForm />);
    });

    await expectGetMethods();
    await addBasicInformation();
    addIngredientsAndTags();

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));

    expect(axios.post).toHaveBeenCalledWith("user/upload", expect.any(FormData), expect.any(Object));
    expect(axios.post).toHaveBeenCalledWith("user/cocktail/add", expect.objectContaining({
      name: "Margarita",
      description: "A refreshing cocktail",
      image: mockUploadResponse.data,
    }));
  });
});

async function addBasicInformation() {
  await waitFor(() => {
    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "Margarita" } });
    fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "A refreshing cocktail" } });
    const file = new File(["sample"], "sample.jpg", { type: "image/jpeg" });
    fireEvent.change(screen.getByLabelText(/upload/i), { target: { files: [file] } });
  });
}

function addIngredientsAndTags() {
  fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "Vodka" } });
  fireEvent.change(screen.getByPlaceholderText("Enter ingredient amount"), { target: { value: "50 ml" } });
  fireEvent.click(screen.getByText(/vodka/i));

  fireEvent.change(screen.getByPlaceholderText("Search Tags"), { target: { value: "Classic" } });
  fireEvent.click(screen.getByText(/classic/i));
}

async function expectGetMethods() {
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
  expect(axios.get).toHaveBeenCalledWith("user/ingredients");
  expect(axios.get).toHaveBeenCalledWith("user/tags");
}
