import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import Model from './Model';

function Employeetable() {
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch unique positions for the dropdown on mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/employees/positions')
      .then(response => setPositions(response.data))
      .catch(error => console.error('Error fetching positions:', error));
  }, []);

  // Debounced fetch function for filtering
  const fetchFilteredEmployees = useCallback(
    debounce((search, position) => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (position) params.append('position', position);

      axios.get('http://localhost:3000/api/employees', { params })
        .then(response => setDisplayedEmployees(response.data))
        .catch(error => console.error('Error fetching filtered employees:', error));
    }, 300), []
  );

  // Update employees when search or position changes (debounced)
  useEffect(() => {
    fetchFilteredEmployees(searchTerm, selectedPosition);
    // Cancel debounce on unmount/change to avoid stale calls
    return fetchFilteredEmployees.cancel;
  }, [searchTerm, selectedPosition, fetchFilteredEmployees]);

  // Handlers
  const onAddClick = () => navigate('/add-employee');
  const onEditClick = (id) => navigate(`/edit-employee/${id}`);

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:3000/api/employees/${id}`)
        .then(() => setDisplayedEmployees(prev => prev.filter(emp => emp._id !== id)))
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

  const onClearFilter = () => {
    setSearchTerm('');
    setSelectedPosition('');
  };

  // UI
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
      
      {/* Search bar and position dropdown filter (left-aligned, below heading) */}
      <div className="mb-4">
        <div className="flex gap-4 flex-row  max-[400px]:flex-col left">
          <input
            type="text"
            placeholder="Search by name, email..."
            className="p-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-48 max-[400px]:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-56 p-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 max-[400px]:w-1/2"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="">All Positions</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          {(searchTerm || selectedPosition) && (
            <button
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              onClick={onClearFilter}
            >
              Clear
            </button>
          )}
        </div>
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
                  {searchTerm || selectedPosition
                    ? 'No employees found matching your filter.'
                    : 'No employees found.'}
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
