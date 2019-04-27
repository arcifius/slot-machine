import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Wheel from "components/Wheel";

import "styles/components/SlotMachine.scss";

function SlotMachine(props) {
  const [wheels, setWheels] = useState([
    { key: 0, face: Math.floor(Math.random() * 4) },
    { key: 1, face: Math.floor(Math.random() * 4) },
    { key: 2, face: Math.floor(Math.random() * 4) }
  ]);
  const [isSpinning, setSpinning] = useState(false);

  const delay = 50;
  let machineInterval = useRef();

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
    }

    return () => {
      stopSpinning();
    };
  }, [isSpinning, wheels]);

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
        <button onClick={() => setSpinning(!isSpinning)}>
          {isSpinning ? `STOP` : `START`}
        </button>
      </div>
      <div className="SlotMachine-feet" />
    </div>
  );
}

SlotMachine.propTypes = {
  wheels: PropTypes.number
};

SlotMachine.defaultProps = {
  wheels: 3
};

export default SlotMachine;
