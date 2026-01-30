import React, { useState } from "react";

const MyBook = (props) => {
  const {name,date,time,num}=props.book;
  alert(name);
  return (
    <>
      <h4 className="fw-bold">My Booking</h4>

      <h5>Hello, {name}. You Booking Details is</h5>

      <h6 className="mt-3">Date- {date}</h6>
      <h6 className="">Time- {time}</h6>
      <h6 className="">People- {num}</h6>
    </>
  );
};

export default MyBook;
