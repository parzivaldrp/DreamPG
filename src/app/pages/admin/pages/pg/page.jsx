'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function fetchPGs() {
  const response = await fetch('/api/auth/allpg', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  const data = await response.json();
  return data.pgs;
}

function PGManagement() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const pgsData = await fetchPGs();
        setPgs(pgsData);
      } catch (error) {
        toast.error('Failed to fetch PGs: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/auth/dpg/${id}`, { method: 'DELETE' });
      setPgs(pgs.filter(pg => pg._id !== id));
      toast.success('PG deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete PG: ' + error.message);
    }
  };

  const handleEdit = (id) => {
    router.push(`/pages/admin/pages/editpg/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">PG Management</h1>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Location</th>
            <th>Total Rooms</th>
            <th>Vacant Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pgs.map((pg) => (
            <tr key={pg._id}>
              <td>{pg.ownerName || 'N/A'}</td>
              <td>{pg.ownerEmail || 'N/A'}</td>
              <td>{pg.address || 'N/A'}</td>
              <td>{pg.roomOptions?.totalRooms || 'N/A'}</td>
              <td>{pg.roomOptions?.vacantRooms || 'N/A'}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(pg._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(pg._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PGManagement;
