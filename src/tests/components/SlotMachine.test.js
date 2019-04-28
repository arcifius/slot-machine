import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act
} from "react-testing-library";
import "jest-dom/extend-expect";
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

  it("gives a prize of 10 dollars when the result is two identical non-consecutive symbols", async () => {
    const { getByText, getByTestId } = render(
      <SlotMachine initialFaces={[1, 2, 1]} />
    );

    const rewardText = await waitForElement(() =>
      getByText(/Two identical non-consecutive symbols!/i)
    );

    expect(getByTestId("prize")).toHaveTextContent("You earned $10,00");
    expect(rewardText).toBeDefined();
  });

  it("gives a prize of 20 dollars when the result is two consecutive symbols", async () => {
    const { getByText, getByTestId } = render(
      <SlotMachine initialFaces={[1, 1, 2]} />
    );

    const rewardText = await waitForElement(() =>
      getByText(/Two consecutive symbols!/i)
    );

    expect(getByTestId("prize")).toHaveTextContent("You earned $20,00");
    expect(rewardText).toBeDefined();
  });

  it("gives a prize of 100 dollars when the result is same symbol in all the wheels", async () => {
    const { getByText, getByTestId } = render(
      <SlotMachine initialFaces={[1, 1, 1]} />
    );

    const rewardText = await waitForElement(() =>
      getByText(/The same symbol in all the wheels!/i)
    );

    expect(getByTestId("prize")).toHaveTextContent("You earned $100,00");
    expect(rewardText).toBeDefined();
  });
});
