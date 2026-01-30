import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Book = () => {
  const nav = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [persons, setPersons] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const saveBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      name: customerName,
      email: email,
      phone: phone,
      date: bookingDate,
      time: bookingTime,
      people: persons,
      special_request: specialRequest,
    };

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        alert("Login first");
        nav("/sign");
        return;
      }
      alert();
      const res = await axios.post(
        "http://localhost:5000/admin/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      setCustomerName("");
      setEmail("");
      setPhone("");
      setBookingDate("");
      setBookingTime("");
      setPersons("");
      setSpecialRequest("");

      nav("/");
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };
  return (
    <div className="row m-0 p-0">
      <div className="col-md-6 col-12 m-0 p-0 img1">
        <img
          src="images/book.jpg"
          className="img-fluid w-100 h-100"
          alt="book"
        />
      </div>

      <div
        className="col-md-6 col-12 m-0 p-5"
        style={{ backgroundColor: "#0F172B" }}
      >
        <b className="fw-bold cur_text">Reservation</b>
        <h1 className="text-light fw-bold">Book A Table Online</h1>

        <form className="my-4" onSubmit={saveBooking}>
          <div className="form-row d-flex">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="col">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row d-flex">
            <div className="col">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="col">
              <select
                className="form-control"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
                required
              >
                <option value="">No of People</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <div className="form-row d-flex">
            <div className="col">
              <input
                type="date"
                className="form-control"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>

            <div className="col">
              <input
                type="time"
                className="form-control"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <textarea
                className="form-control"
                placeholder="Special Request"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-row text-center">
            <div className="col">
              <button
                type="submit"
                className="btn btn_1 w-100 text-light fw-bold"
              >
                Book Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
