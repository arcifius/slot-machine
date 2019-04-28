import React, { useState, useEffect, useRef } from "react";
import Wheel from "components/Wheel";

import "styles/components/SlotMachine.scss";

function SlotMachine() {
  const [wheels, setWheels] = useState([
    { key: 0, face: Math.floor(Math.random() * 4) },
    { key: 1, face: Math.floor(Math.random() * 4) },
    { key: 2, face: Math.floor(Math.random() * 4) }
  ]);
  const [isSpinning, setSpinning] = useState(false);

  const delay = 50;
  const autoStopIn = 2000;
  const autoStartIn = 5000;

  const machineInterval = useRef();
  const startTimeout = useRef();
  const stopTimeout = useRef();

  useEffect(() => {
    function onSpin() {
      const currentWheels = wheels.slice(0);
      currentWheels.forEach(
        wheel => (wheel.face = wheel.face + 1 < 4 ? wheel.face + 1 : 0)
      );
      setWheels(currentWheels);
    }

    function stopSpinning() {
      clearInterval(machineInterval.current);
      machineInterval.current = null;
    }

    // Handle slot machine actions
    if (isSpinning && !machineInterval.current) {
      machineInterval.current = setInterval(onSpin, delay);
    } else if (!isSpinning) {
      stopSpinning();

      console.log(`Stopped, check for prizes`);
      // Two identical non-consecutive symbols, the prize is 10 dollars.
      // Two consecutive symbols, then the prize is 20 dollars.
      // The same symbol in all the wheels, the prize is 100 dollars.
    }
  }, [isSpinning, wheels]);

  useEffect(() => {
    if (isSpinning) {
      clearTimeout(stopTimeout.current);
      stopTimeout.current = setTimeout(() => setSpinning(false), autoStopIn);
    } else {
      clearTimeout(startTimeout.current);
      startTimeout.current = setTimeout(() => setSpinning(true), autoStartIn);
    }
  }, [isSpinning]);

  function handleButtonPress() {
    setSpinning(!isSpinning);
  }

  function renderWheels() {
    return wheels.map(wheel => <Wheel key={wheel.key} current={wheel.face} />);
  }

  return (
    <div className="SlotMachine">
      <div className="SlotMachine-head" />
      <div className="SlotMachine-body" data-testid="smBody">
        {renderWheels()}
      </div>
      <div className="SlotMachine-lever">
        <button onClick={handleButtonPress}>
          {isSpinning ? `STOP` : `START`}
        </button>
      </div>
      <div className="SlotMachine-feet" />
    </div>
  );
}

export default SlotMachine;
