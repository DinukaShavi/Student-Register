import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/students/${id}`)
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <table className="table-auto w-3/5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Guardian</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.address}</td>
            <td>{student.contact}</td>
            <td>{student.guardian}</td>
            <td>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
