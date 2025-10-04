import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Employeetable() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  };

  const onAddClick = () => {
    navigate('/add-employee');
  };

  const onEditClick = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:3000/api/employees/${id}`)
        .then(() => {
          // Remove the deleted employee from state
          setEmployees(prev => prev.filter(emp => emp._id !== id));
        })
        .catch(error => {
          alert('Error deleting employee: ' + (error.response?.data?.error || error.message));
        });
    }
  };

  return (
    <div className='mx-5 my-10'>
      <div className="heading-container flex justify-between items-center mb-6 ">
        <h2 className="heading text-3xl font-bold">Employee List</h2>
        <div className="selector-div flex items-center">
          <button
            className="add-service-btn bg-[#62e06e] text-white px-4 py-2 rounded-xl hover:bg-green-700"
            onClick={onAddClick}
          >
            + Add Employee
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border rounded-xl">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {/* <th className="px-4 py-3">Employee_ID</th> */}
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id} className="border-t">
                {/* <td className="px-4 py-3">{emp.employeeId || emp._id}</td> */}
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.position}</td>
                <td className="px-4 py-3">{emp.salary}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3 text-center">
                  
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => onEditClick(emp._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDeleteClick(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employeetable;
