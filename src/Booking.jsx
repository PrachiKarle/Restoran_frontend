import React from "react";
import Heading from "./Heading";
import Book from "./Book";

const Booking = () => {
  return (
    <>
      <Heading val="Book" />
      <div className="m-4">
        <Book />
      </div>
    </>
  );
};

export default Booking;
