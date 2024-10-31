import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { EditCocktailTagsForm } from "./EditCocktailTagsForm";
import { vi, MockedFunction } from "vitest";
import api from "../../utils/api";
import { ITag } from "../Interfaces/ITag";
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

const mockSetEditMode = vi.fn();
const mockHandleCocktailEdit = vi.fn();

const initialTags: ITag[] = [
  { id: 1, name: "Fruity" },
  { id: 2, name: "Strong" },
];

const allTags: ITag[] = [
  { id: 1, name: "Fruity" },
  { id: 2, name: "Strong" },
  { id: 3, name: "Bitter" },
];

const mockPutResponse = { data: "Cocktail tags updated successfully" };
(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: allTags });
(axios.put as MockedFunction<typeof axios.put>).mockResolvedValue(mockPutResponse);

vi.mock('../Other/UseFirstViewportEntry', () => ({
    UseFirstViewportEntry: () => true, 
  }));
  
beforeAll(() => {
    window.alert = vi.fn();
    window.URL.createObjectURL = vi.fn(() => "mocked-url");
});

describe("EditCocktailTagsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with pre-selected tags", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    initialTags.forEach((tag) => {
        const current = screen.getAllByText(tag.name) 
      expect(current.length).toBe(2);
    });
  });

  it("fetches all tags on mount", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("user/tags"));
  });

  it("filters tags based on search input", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "Fruity" } });

    await waitFor(() => {
      expect(screen.getAllByText(/fruity/i).length).toBe(2);
      expect(screen.queryByText(/bitter/i)).not.toBeInTheDocument();
    });
  });

  it("adds a tag to the selected list", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "Bitter" } });
    fireEvent.click(screen.getByText(/bitter/i));

    await waitFor(() => {
      expect(screen.getAllByText(/bitter/i).length).toBe(2);
    });
  });

  it("displays an error if a tag is added more than once", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    const tag = screen.getByText(/bitter/i)
    fireEvent.click(tag);
    fireEvent.click(tag);

    await waitFor(() => {
      expect(screen.getByText("Tag selected already")).toBeInTheDocument();
    });
  });

  it("deletes a tag from the selected list", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "none" } });
    const fruityTag = screen.getByText(/fruity/i);
    fireEvent.click(fruityTag);

    await waitFor(() => {
      expect(screen.queryByText(/fruity/i)).not.toBeInTheDocument();
    });
  });

  it("submits updated tags and closes the form on success", async () => {
    await act(async () => {
      render(
        <EditCocktailTagsForm
          id={1}
          tags={initialTags}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith("user/cocktail/tags/edit", {
        id: 1,
        tags: initialTags,
      });
    });

    expect(mockHandleCocktailEdit).toHaveBeenCalledWith({
      id: 1,
      tags: initialTags,
    });
    expect(mockSetEditMode).toHaveBeenCalled();
  });
});
