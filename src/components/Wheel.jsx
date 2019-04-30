import React from "react";
import PropTypes from "prop-types";

import "styles/components/Wheel.scss";

function Wheel(props) {
  function getCurrent() {
    switch (props.current) {
      case 1:
        return "banana";

      case 2:
        return "orange";

      case 3:
        return "monkey";

      default:
        return "strawberry";
    }
  }

  const current = getCurrent();

  return <div className={`Wheel ${current}`} data-testid={current} />;
}

Wheel.propTypes = {
  current: PropTypes.number.isRequired
};

export default Wheel;
