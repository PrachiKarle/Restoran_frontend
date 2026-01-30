import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("userToken");

  const fetchData = async () => {
    try {
      const d1 = await axios.get("http://localhost:5000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const d2 = await axios.get("http://localhost:5000/user/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const d3 = await axios.get("http://localhost:5000/user/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(d1.data);
      setBookings(d2.data);
      setContacts(d3.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, []);

  const updateProfile = async () => {
    try {
      await axios.put(
        "http://localhost:5000/user/profile",
        { name: user.name, email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Profile updated");
    } catch {
      alert("Failed to update profile");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/user/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Booking detail deleted");
      setBookings(bookings.filter((b) => b.id !== id));
    } catch {
      alert("Failed to delete booking");
    }
  };

  const [contacts, setContacts] = useState([]);

  const handleContactChange = (id, field, value) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const updateContact = async (contact) => {
    try {
      await axios.put(
        `http://localhost:5000/user/contacts/${contact.id}`,
        {
          subject: contact.subject,
          message: contact.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Contact updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update contact");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/user/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch {
      alert("Failed to delete contact");
    }
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account.",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:5000/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("userToken");
      alert("Account deleted successfully");
      window.location.href = "/sign";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };



  const Logout=async()=>{
    localStorage.removeItem("userToken");
    alert("Logout Successfully!");
    window.location.href="/";
  }
  


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">My Profile</h2>

      {/* PROFILE */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between">
          <span>Personal Information</span>
        </div>
        <div className="card-body">
          <input
            className="form-control mb-3"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className="form-control mb-3"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <button className="btn btn-success" onClick={updateProfile}>
            Save Changes
          </button>

          <button
            className="btn btn-outline-danger mx-4"
            onClick={Logout}
          >
            Logout
          </button>

          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>

      {/*BOOKINGS*/}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-warning text-light">My Bookings</div>
        <div className="card-body">
          {bookings.length === 0 ? (
            <p className="text-muted">No bookings found</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="border rounded p-3 mb-3">
                <p>
                  <strong>Id:</strong> {b.id}
                </p>
                <p>
                  <strong>Date:</strong> {b.date}
                </p>
                <p>
                  <strong>Time:</strong> {b.time}
                </p>
                <p>
                  <strong>Persons:</strong> {b.persons}
                </p>
                <p>
                  <strong>Request:</strong> {b.special_request || "None"}
                </p>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => {
                    deleteBooking(b.id);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CONTACTS */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-warning text-light">
          My Contact Messages
        </div>
        <div className="card-body">
          {contacts.length === 0 ? (
            <p className="text-muted">No contact messages</p>
          ) : (
            contacts.map((c) => (
              <div key={c.id} className="border rounded p-3 mb-3">
                <input
                  className="form-control mb-2"
                  value={c.subject}
                  onChange={(e) =>
                    handleContactChange(c.id, "subject", e.target.value)
                  }
                />

                <textarea
                  className="form-control mb-2"
                  rows="3"
                  value={c.message}
                  onChange={(e) =>
                    handleContactChange(c.id, "message", e.target.value)
                  }
                />

                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => updateContact(c)}
                >
                  Save
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteContact(c.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
