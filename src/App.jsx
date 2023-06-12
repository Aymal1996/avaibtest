import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Radio, RadioGroup, FormControlLabel, Button, Checkbox } from '@material-ui/core';
import './App.css'; // Import the custom CSS file for styling

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [feePaid, setFeePaid] = useState('Yes');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = { name, marks, feePaid };
      setStudents(updatedStudents);
      setEditMode(false);
      setEditIndex(null);
    } else {
      const newStudent = { name, marks, feePaid };
      setStudents([...students, newStudent]);
    }

    setName('');
    setMarks('');
    setFeePaid('Yes');
  };

  const handleEdit = (index) => {
    const studentToEdit = students[index];
    setName(studentToEdit.name);
    setMarks(studentToEdit.marks);
    setFeePaid(studentToEdit.feePaid);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = () => {
    const updatedStudents = students.filter((student, index) => !selectedStudents.includes(index));
    setStudents(updatedStudents);
    setSelectedStudents([]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMarksChange = (e) => {
    setMarks(e.target.value);
  };

  const handleFeePaidChange = (e) => {
    setFeePaid(e.target.value);
  };

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedStudents.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedStudents, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedStudents.slice(1));
    } else if (selectedIndex === selectedStudents.length - 1) {
      newSelected = newSelected.concat(selectedStudents.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1)
      );
    }

    setSelectedStudents(newSelected);
  };

  const isSelected = (index) => selectedStudents.includes(index);

  const calculateStatus = (marks, feePaid) => {
    let status = '';
    let statusColor = '';

    if (marks > 60) {
      status = feePaid === 'Yes' ? 'Pass' : 'Fail (Fee Not Paid)';
      statusColor = feePaid === 'Yes' ? '#062E03' : '#840000';
    } else {
      status = 'Fail';
      statusColor = 'red';
    }

    return <span style={{ color: statusColor }}>{status}</span>;
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <h3>Passing Marks: 60/100</h3>
          <div style={{display:'flex'}}>
            <h3 style={{ margin: '0 20px 0 0', paddingTop: '0px' }}>*Full Name</h3>
            <input
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
              />
          </div>
          <div style={{ display: 'flex',justifyContent: 'flex-start' }}>
            <h3 style={{ margin: '0 47px 0 0',paddingTop:'0px'}}>*Marks:</h3>
            <input
              label="Marks"
              type="number"
              value={marks}
              onChange={handleMarksChange}
              required
            />
          </div>
        </div>
        <RadioGroup
          value={feePaid}
          onChange={handleFeePaidChange}
        >
          <h3 style={{paddingRight:'30px'}}>Fee Paid: </h3>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <Button variant="contained" color="primary" type="submit">
          {editMode ? 'Update' : 'Submit'}
        </Button>
      </form>
      <div className="flex-2">
      <Button style={{marginTop: '20px'}} variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Fee Paid</TableCell>
              <TableCell>Pass/Fail</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => {
              const isItemSelected = isSelected(index);

              return (
                <TableRow
                  key={index}
                  className={index % 3 === 1 ? 'odd-row' : 'even-row'}
                  hover
                  onClick={() => handleCheckboxChange(index)}
                >
                  <TableCell>
                    <Checkbox checked={isItemSelected} color="primary" />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.marks}</TableCell>
                  <TableCell>{student.feePaid}</TableCell>
                  <TableCell>{calculateStatus(student.marks, student.feePaid)}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                  </TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default App;
