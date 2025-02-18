import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [guardian, setGuardian] = useState('');
  const [image, setImage] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const handleRegister = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('address', address);
    formData.append('contact', contact);
    formData.append('guardian', guardian);
    formData.append('image', image); 

    if (editingStudentId !== null) {
      axios.put(`http://localhost:8080/students/${editingStudentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(response => {
          setStudents(students.map(s => (s.id === editingStudentId ? response.data : s)));
          setEditingStudentId(null);
          resetForm();
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:8080/students', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(response => {
          setStudents([...students, response.data]);
          resetForm();
        })
        .catch(error => console.error(error));
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setAddress('');
    setContact('');
    setGuardian('');
    setImage(null);
  };

  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setAddress(student.address);
    setContact(student.contact);
    setGuardian(student.guardian);
    setImage(student.image);
    setEditingStudentId(student.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/students/${id}`)
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="flex justify-between">
      <form className="flex flex-col w-1/3 p-4 border border-gray-300 rounded-lg">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 mb-4 border border-gray-400 rounded"
        />
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="p-2 mb-4 border border-gray-400 rounded"
        />
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="p-2 mb-4 border border-gray-400 rounded"
        />
        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={e => setContact(e.target.value)}
          className="p-2 mb-4 border border-gray-400 rounded"
        />
        <label>Guardian:</label>
        <input
          type="text"
          value={guardian}
          onChange={e => setGuardian(e.target.value)}
          className="p-2 mb-4 border border-gray-400 rounded"
        />
        <label>Image:</label>
        <input
          type="file"
          onChange={handleFileChange} 
          className="p-2 mb-4 border border-gray-400 rounded"
        />
        <button
          type="button"
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingStudentId ? 'Update' : 'Register'}
        </button>
      </form>

      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">Student List</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Guardian</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.age}</td>
                <td className="border p-2">{student.address}</td>
                <td className="border p-2">{student.contact}</td>
                <td className="border p-2">{student.guardian}</td>
                <td className="border p-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
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
};

export default StudentForm;
