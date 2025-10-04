import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EmployeeForm from '../components/EmployeeForm'; // Adjust path as needed

function EditCreateEmployee() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    department: ''
  });
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      axios.get(`http://localhost:3000/api/employees/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id, isEditing]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/employees/${id}`, form);
      } else {
        await axios.post('http://localhost:3000/api/employees/addemployee', form);
      }
      navigate('/');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      {/* <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit' : 'Add'} Employee</h2> */}
      <EmployeeForm
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
}

export default EditCreateEmployee;
