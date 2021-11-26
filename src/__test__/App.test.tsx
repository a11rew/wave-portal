import { render, screen, fireEvent } from "@testing-library/react";
import { mock } from "depay-web3-mock";
import App from "../App";

describe("Metamask missing", () => {
  test("renders connect wallet", () => {
    render(<App />);

    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });
});

describe("Metamask present, not connected", () => {
  test("renders wave button", async () => {
    mock({
      blockchain: "ethereum",
      wallet: "metamask",
      accounts: {
        return: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
      },
    });
    render(<App />);

    expect(await screen.findByText("Wave at Me")).toBeInTheDocument();
  });
});

describe("User interactions after connect", () => {
  test("disables submit when character limit is exceeded", async () => {
    mock({
      blockchain: "ethereum",
      wallet: "metamask",
      accounts: {
        return: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
      },
    });
    render(<App />);
    const waveInput = await screen.findByLabelText(
      "Send me a message over the three webs"
    );
    /** Add more than 140 characters to textarea */
    fireEvent.change(waveInput, {
      target: { value: `${"test text".repeat(20)}` },
    });

    /** Test submit is disabled */
    const submitButton = screen.getByRole("button", { name: /Wave At Me/i });
    expect(submitButton).toBeDisabled();
  });
});
