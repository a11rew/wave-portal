import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders wave", () => {
  render(<App />);
  const waveButton = screen.getByText(/Wave at me/i);
  expect(waveButton).toBeInTheDocument();
});
