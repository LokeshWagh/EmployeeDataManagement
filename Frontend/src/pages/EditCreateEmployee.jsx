import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EmployeeForm from '../components/EmployeeForm'; // Adjust path as necessary

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
        .then(res => {
          const data = res.data;
          // Defensive defaults to avoid undefined fields
          setForm({
            name: data.name || '',
            email: data.email || '',
            position: data.position || '',
            salary: data.salary || '',
            department: data.department || '',
          });
        })
        .catch(err => console.error(err));
    }
  }, [id, isEditing]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/employees/${id}`, values);
      } else {
        await axios.post('http://localhost:3000/api/employees/addemployee', values);
      }
      setSubmitting(false);
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <EmployeeForm
        initialValues={form}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
}

export default EditCreateEmployee;
