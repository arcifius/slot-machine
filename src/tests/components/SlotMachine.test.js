import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act
} from "react-testing-library";
import SlotMachine from "components/SlotMachine";

describe("Slot machine", () => {
  afterEach(cleanup);

  it("renders 3 Wheels", () => {
    const { getByTestId } = render(<SlotMachine />);
    const wheels = getByTestId("smBody").children;
    expect(wheels).toHaveLength(3);
  });

  it("spin wheels when START button is clicked", async () => {
    const { container } = render(<SlotMachine />);

    const startButton = container.querySelector("button");
    const initialWheelsDisplay = [...container.querySelectorAll("img")].map(
      wheel => wheel.alt
    );

    act(() => {
      // Start spinning wheels
      fireEvent.click(startButton);
    });

    // Wait for some spins
    await new Promise(resolve => setTimeout(resolve, 100));

    const currentWheelsDisplay = [...container.querySelectorAll("img")].map(
      wheel => wheel.alt
    );

    // Checking if spin is working
    initialWheelsDisplay.forEach((iw, index) => {
      expect(iw !== currentWheelsDisplay[index]).toBeTruthy();
    });
  });

  it("stop spinning wheels when STOP button is clicked", async () => {
    const { container, getByText } = render(<SlotMachine />);

    // Start spinning wheels
    act(() => fireEvent.click(getByText("START")));

    // Wait for some spins
    await new Promise(resolve => setTimeout(resolve, 100));

    // Start button will toggle spinning status, in this case it should stop wheels
    act(() => fireEvent.click(getByText("STOP")));

    const initialWheelsDisplay = [...container.querySelectorAll("img")].map(
      wheel => wheel.alt
    );

    // Wait 100ms
    await new Promise(resolve => setTimeout(resolve, 100));

    const latestWheelsDisplay = [...container.querySelectorAll("img")].map(
      wheel => wheel.alt
    );

    // initial should be the equal latest
    initialWheelsDisplay.forEach((iw, index) => {
      expect(iw === latestWheelsDisplay[index]).toBeTruthy();
    });
  });
});
