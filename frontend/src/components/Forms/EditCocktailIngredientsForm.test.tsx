import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { EditCocktailIngredientsForm } from "./EditCocktailIngredientsForm";
import { vi, MockedFunction } from "vitest";
import api from "../../utils/api";
import { IIngredient } from "../Interfaces/IIngredients";
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

const initialIngredients: IIngredient[] = [
  { id: 1, name: "Vodka", amount: "50 ml", image: "example" },
  { id: 2, name: "Tequila", amount: "30 ml", image: "example" },
];
const allIngredients: IIngredient[] = [
    { id: 1, name: "Vodka", amount: "", image: "example" },
    { id: 2, name: "Tequila", amount: "", image: "example" },
  { id: 3, name: "Gin", amount: "", image: "example"},
];

const mockPutResponse = { data: "Cocktail ingredients updated successfully" };
(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({ data: allIngredients });
(axios.put as MockedFunction<typeof axios.put>).mockResolvedValue(mockPutResponse);


vi.mock('../Other/UseFirstViewportEntry', () => ({
    UseFirstViewportEntry: () => true, 
  }));
  
beforeAll(() => {
    window.alert = vi.fn();
    window.URL.createObjectURL = vi.fn(() => "mocked-url");
});

describe("EditCocktailIngredientsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with pre-selected ingredients", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    initialIngredients.forEach((ingredient) => {
      expect(screen.getByText(new RegExp(ingredient.amount, "i"))).toBeInTheDocument();
    });
  });

  it("fetches all ingredients on mount", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });
    await waitFor(() => expect(api.get).toHaveBeenCalledWith("user/ingredients"));
  });

  it("filters ingredients based on search input", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "vodka" } });

    await waitFor(() => {
        const ingredients = screen.getAllByText(/vodka/i);
        expect(ingredients.length).toBeGreaterThan(1);
        const ginElements = screen.queryAllByText(/gin/i);
        expect(ginElements.length).toBe(0); 
    });
  });

  it("adds an ingredient with an amount to the selected list", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Enter ingredient amount"), { target: { value: "20 ml" } });
    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "Gin" } });
    fireEvent.click(screen.getByText(/gin/i));

    await waitFor(() => {
      expect(screen.getAllByText(/gin/i).length).toBe(2);
    });
  });

  it("displays an error if an ingredient is added without an amount", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "Gin" } });
    fireEvent.click(screen.getByText(/gin/i));

    await waitFor(() =>
      expect(screen.getByText("Please add ingredient amount")).toBeInTheDocument()
    );
  });

  it("prevents adding duplicate ingredients and shows an error", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Enter ingredient amount"), { target: { value: "20 ml" } });
    fireEvent.change(screen.getByPlaceholderText("Search Ingredients"), { target: { value: "Gin" } });
    const button = screen.getByText(/gin/i);
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText("Ingredient selected already")).toBeInTheDocument()
    );
  });

  it("deletes an ingredient from the selected list", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    const vodkaIngredient = screen.getByText(/50 ml/i);
    fireEvent.click(vodkaIngredient);

    await waitFor(() =>
      expect(screen.queryByText(/50 ml/i)).not.toBeInTheDocument()
    );
  });

  it("submits updated ingredients and closes the form on success", async () => {
    await act(async () => {
      render(
        <EditCocktailIngredientsForm
          id={1}
          ingredients={initialIngredients}
          setEditMode={mockSetEditMode}
          handleCocktailEdit={mockHandleCocktailEdit}
        />
      );
    });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => expect(api.put).toHaveBeenCalledWith("user/cocktail/ingredients/edit", {
      id: 1,
      ingredients: initialIngredients,
    }));

    expect(mockHandleCocktailEdit).toHaveBeenCalledWith({
      id: 1,
      ingredients: initialIngredients,
    });
    expect(mockSetEditMode).toHaveBeenCalled();
  });
});
