import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/contacts",
        { withCredentials: true }
      );
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    const token=localStorage.getItem("userToken");
    const res = await axios.delete(
      `http://localhost:5000/user/contacts/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
    alert(res.data.message);
    fetchContacts();
  };

  return (
    <div className="row m-0 p-5">
      <div className="col-lg-10 offset-lg-2">
        <h4 className="text-warning mb-3">Contacts</h4>

        <table className="table table-bordered table-striped bg-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No Records
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.user_id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.subject}</td>
                  <td>{c.message}</td>
                  <td>{c.created_at}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => deleteContact(c.id)}
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

export default AdminContacts;
