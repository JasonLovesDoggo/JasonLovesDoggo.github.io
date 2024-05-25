import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Developer",
          "Open Source Contributor",
          "Amateur Photographer",
          "Human",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 45,
      }}
    />
  );
}

export default Type;
