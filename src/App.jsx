import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Registration</h1>
      <StudentForm />
      <h1 className="text-3xl font-bold mb-4">Student List</h1>
      <StudentList />
    </div>
  );
};

export default App;
