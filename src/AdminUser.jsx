import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/users",
        { withCredentials: true }
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    const token=localStorage.getItem("userToken");
    const res = await axios.delete(
      `http://localhost:5000/admin/delete-user/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
    alert(res.data.message);
    fetchUsers();
  };

  return (
    <div className="row m-0 p-5">
      <div className="col-lg-10 offset-lg-2">
        <h4 className="text-warning mb-3">Users</h4>

        <table className="table table-bordered table-striped bg-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Users
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.created_at}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => deleteUser(user.id)}
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

export default AdminUsers;
