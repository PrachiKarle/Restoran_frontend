import React from "react";
import "./App.css";
import Abt from "./Abt";
import Team from "./Team";
import Heading from "./Heading";

const About = () => {
  return (
    <>
      <Heading val="About Us"/>

      <Abt/>

      <Team/>
    </>
  );
};

export default About;
