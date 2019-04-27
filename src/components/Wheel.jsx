import React from "react";
import PropTypes from "prop-types";

// Assets
import strawberry from "assets/strawberry.svg";
import banana from "assets/banana.svg";
import orange from "assets/orange.svg";
import monkey from "assets/monkey.svg";

import "styles/components/Wheel.scss";

function Wheel(props) {
  function getCurrent() {
    switch (props.current) {
      case 1:
        return { alt: "banana", src: banana };

      case 2:
        return { alt: "orange", src: orange };

      case 3:
        return { alt: "monkey", src: monkey };

      default:
        return { alt: "strawberry", src: strawberry };
    }
  }

  const current = getCurrent();

  return (
    <div className="Wheel">
      <img src={current.src} className="Wheel-slot-icon" alt={current.alt} />
    </div>
  );
}

Wheel.propTypes = {
  current: PropTypes.number.isRequired
};

export default Wheel;
