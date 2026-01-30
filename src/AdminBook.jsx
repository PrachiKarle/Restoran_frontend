import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBook = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/bookings",
        { withCredentials: true }
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    const token=localStorage.getItem("userToken");
    const res = await axios.delete(
      `http://localhost:5000/user/bookings/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    alert(res.data.message);
    fetchBookings();
  };

  return (
    <div className="row m-0 p-5">
      <div className="col-lg-10 offset-lg-2">
        <h4 className="text-warning mb-3">Bookings</h4>

        <table className="table table-bordered table-striped bg-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Persons</th>
              <th>Special Request</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No Records
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.user_id}</td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.persons}</td>
                  <td>{b.special_request}</td>
                  <td>{b.created_at}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => deleteBooking(b.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBook;
