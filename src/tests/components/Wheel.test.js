import React from "react";
import { render, cleanup } from "react-testing-library";
import Wheel from "components/Wheel";

describe("Slot machine wheel", () => {
  afterEach(cleanup);

  it("renders strawberry when current is 0 or greather than 3", () => {
    const { getByTestId, rerender } = render(<Wheel current={0} />);

    const strawberry = getByTestId("strawberry");

    expect(strawberry).toBeDefined();

    rerender(<Wheel current={4} />);

    expect(strawberry).toBeDefined();
  });

  it("renders banana when current is 1", () => {
    const { getByTestId } = render(<Wheel current={1} />);

    const banana = getByTestId("banana");

    expect(banana).toBeDefined();
  });

  it("renders orange when current is 2", () => {
    const { getByTestId } = render(<Wheel current={2} />);

    const orange = getByTestId("orange");

    expect(orange).toBeDefined();
  });

  it("renders monkey when current is 3", () => {
    const { getByTestId } = render(<Wheel current={3} />);

    const monkey = getByTestId("monkey");

    expect(monkey).toBeDefined();
  });
});
