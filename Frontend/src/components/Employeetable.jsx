import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Model from './Model';

function Employeetable() {
  const [employees, setEmployees] = useState([]);
  const [searchResults, setSearchResults] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchEmployees = () => {
      axios.get(`http://localhost:3000/api/employees?search=${searchTerm}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => console.error('Error searching employees:', error));
    };

    // Delay to avoid API calls on every keystroke
    const delayDebounceFn = setTimeout(() => {
      searchEmployees();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchEmployees = () => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  };

  const onAddClick = () => navigate('/add-employee');
  const onEditClick = (id) => navigate(`/edit-employee/${id}`);

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:3000/api/employees/${id}`)
        .then(() => {
          // Remove from both lists to keep UI consistent
          setEmployees(prev => prev.filter(emp => emp._id !== id));
          setSearchResults(prev => prev.filter(emp => emp._id !== id));
        })
        .catch(error => alert('Error deleting employee: ' + (error.response?.data?.error || error.message)));
    }
  };

  const onViewClick = (emp) => {
    setViewingEmployee(emp);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const handleModalEdit = (id) => {
    setModalOpen(false);
    navigate(`/edit-employee/${id}`);
  };

  // Show search results if searching, else show all employees
  const displayedEmployees = searchTerm ? searchResults : employees;

  return (
    <div className='mx-5 my-10'>
      <div className="heading-container flex justify-between items-center mb-6">
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

      {/* Search bar with live search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, position..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border rounded-xl">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map(emp => (
              <tr key={emp._id} className="border-t">
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.position}</td>
                <td className="px-4 py-3">{emp.salary}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="text-emerald-600 hover:underline mr-2"
                    onClick={() => onViewClick(emp)}
                  >
                    View
                  </button>
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
            {displayedEmployees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  {searchTerm ? 'No employees found matching your search.' : 'No employees found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && viewingEmployee && (
        <Model
          employee={viewingEmployee}
          open={modalOpen}
          onClose={closeModal}
          onEdit={handleModalEdit}
        />
      )}
    </div>
  );
}

export default Employeetable;
