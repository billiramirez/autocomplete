import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import AutoComplete from "./library/AutoComplete";

test("render App", () => {
  render(<App />);
  const homeMessage = screen.getByText(/AutoComplete Component/i);
  expect(homeMessage).toBeInTheDocument();
});
