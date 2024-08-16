"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/auth/getusers');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      toast.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (id) => {
    router.push(`/pages/admin/pages/edituser?id=${id}`);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/api/auth/duser/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      } 
      if (response.ok) {
        toast.success("User deleted successfully");
      }

      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.');
    }
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <ToastContainer />
      <h1 className="mb-4 text-center animate__animated animate__fadeInDown">User Management</h1>
      <table className="table table-hover animate__animated animate__fadeInUp">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="animate__animated animate__fadeIn">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.gender}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEditUser(user._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
