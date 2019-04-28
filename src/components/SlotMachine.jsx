import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Wheel from "components/Wheel";

import "styles/components/SlotMachine.scss";

function SlotMachine(props) {
  const useInitialFaces = props.initialFaces.length === 3;

  const [wheels, setWheels] = useState([
    {
      key: 0,
      face: useInitialFaces
        ? props.initialFaces[0]
        : Math.floor(Math.random() * 4)
    },
    {
      key: 1,
      face: useInitialFaces
        ? props.initialFaces[1]
        : Math.floor(Math.random() * 4)
    },
    {
      key: 2,
      face: useInitialFaces
        ? props.initialFaces[2]
        : Math.floor(Math.random() * 4)
    }
  ]);
  const [isSpinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState(null);

  const delay = 50;
  const autoStopIn = 10000;
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
      setPrize(null);
      machineInterval.current = setInterval(onSpin, delay);
    } else if (!isSpinning) {
      stopSpinning();

      if (
        wheels[0].face === wheels[1].face &&
        wheels[0].face === wheels[2].face
      ) {
        setPrize({ message: `The same symbol in all the wheels!`, value: 100 });
      } else if (wheels[0].face === wheels[2].face) {
        setPrize({
          message: `Two identical non-consecutive symbols!`,
          value: 10
        });
      } else if (
        wheels[0].face === wheels[1].face ||
        wheels[1].face === wheels[2].face
      ) {
        setPrize({ message: `Two consecutive symbols!`, value: 20 });
      }
    }
  }, [isSpinning, props, wheels]);

  useEffect(() => {
    if (isSpinning) {
      clearTimeout(stopTimeout.current);
      stopTimeout.current = setTimeout(() => setSpinning(false), autoStopIn);
    } else {
      clearTimeout(startTimeout.current);
      startTimeout.current = setTimeout(() => {
        shuffle();
        setSpinning(true);
      }, autoStartIn);
    }
  }, [isSpinning]);

  function handleButtonPress() {
    if (!isSpinning) {
      shuffle();
    }
    setSpinning(!isSpinning);
  }

  function shuffle() {
    setWheels([
      {
        key: 0,
        face: Math.floor(Math.random() * 4)
      },
      {
        key: 1,
        face: Math.floor(Math.random() * 4)
      },
      {
        key: 2,
        face: Math.floor(Math.random() * 4)
      }
    ]);
  }

  function renderWheels() {
    return wheels.map(wheel => <Wheel key={wheel.key} current={wheel.face} />);
  }

  return (
    <div className="SlotMachine">
      <div className="SlotMachine-head">
        {prize !== null && (
          <div>
            <p>{prize.message}</p>
            <p data-testid="prize">You earned ${prize.value},00</p>
          </div>
        )}
      </div>
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

SlotMachine.propTypes = {
  initialFaces: PropTypes.array
};

SlotMachine.defaultProps = {
  initialFaces: []
};

export default SlotMachine;
