import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Roll from "@/views/roll/Roll";

// Mock the stores
jest.mock("@/store/configurationStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ingredients: [
      { id: 1, name: "Vodka", type: "spirit" },
      { id: 2, name: "Whiskey", type: "spirit" },
      { id: 3, name: "Rum", type: "spirit" },
      { id: 4, name: "Tonic Water", type: "mixer" },
      { id: 5, name: "Soda Water", type: "mixer" },
    ],
    setIngredients: jest.fn(),
  })),
}));

jest.mock("@/store/drinkStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    drink: {
      drinkType: "",
      spiritCount: 0,
      mixerCount: 0,
      flairCount: 0,
      ingredients: {
        spirits: [],
        mixers: [],
      },
    },
    drinkRollStep: 1,
    setDrinkRollStep: jest.fn(),
    setDrinkType: jest.fn(),
    setSpiritCount: jest.fn(),
    setMixerCount: jest.fn(),
    setFlairCount: jest.fn(),
    resetDrink: jest.fn(),
    addIngredient: jest.fn(),
  })),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Roll Component", () => {
  it("renders the initial step correctly", () => {
    renderWithRouter(<Roll />);

    expect(
      screen.getByText("Step 1: Roll a D4 for drink type!")
    ).toBeInTheDocument();
  });

  it("displays reset button", () => {
    renderWithRouter(<Roll />);

    expect(screen.getByText("Reset Roll")).toBeInTheDocument();
  });

  it("has the correct initial class", () => {
    renderWithRouter(<Roll />);

    const rollContainer = screen
      .getByText("Step 1: Roll a D4 for drink type!")
      .closest(".roll-a-drink");
    expect(rollContainer).toBeInTheDocument();
  });
});
