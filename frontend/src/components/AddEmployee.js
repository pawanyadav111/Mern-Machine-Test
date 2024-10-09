import React, { useEffect, useState } from 'react';
import { CreateEmployee, updateEmployeeById } from './api';

const AddEmployee = ({ showModal, setShowModal, fetchEmployees, updateEmpObj }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    profileImage: null,
    createDate: new Date().toISOString()
  });

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    console.log("Update object:", updateEmpObj);
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployee(updateEmpObj);
    }
  }, [updateEmpObj]);

  const resetEmployeeStates = () => {
    setEmployee({
      name: '',
      email: '',
      mobile: '',
      designation: '',
      gender: '',
      course: '',
      profileImage: null,
    });
  };

  const handleClose = () => {
    console.log("Closing modal");
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    try {
      const { success, message } =
        updateMode
          ? await updateEmployeeById(employee, employee._id)
          : await CreateEmployee(employee);
      console.log(success, message);

      if (success) {
        alert(message); 
      } else {
        alert(message); 
      }

      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
    } catch (err) {
      console.error('Failed to add employee:', err.message);
      alert('Failed to add employee: ' + err.message); 
    }
  };

  return (
    <div className={`modal ${showModal ? 'd-block' : ''}`}
      tabIndex={-1} role='dialog' style={{
        display: showModal ? 'block' : 'none'
      }}
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5>
              {updateMode ? 'Update Employee' : 'Add Employee'}
            </h5>
            <button type='button' className='btn-close'
              onClick={() => handleClose()}
            >
            </button>
          </div>

          <div className='modal-body'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Mobile</label>
                <input
                  type='text'
                  className='form-control'
                  name='mobile'
                  value={employee.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Designation</label>
                <input
                  type='text'
                  className='form-control'
                  name='designation'
                  value={employee.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Gender</label>
                <input
                  type='text'
                  className='form-control'
                  name='gender'
                  value={employee.gender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Course</label>
                <input
                  type='text'
                  className='form-control'
                  name='course'
                  value={employee.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Profile Image</label>
                <input
                  type='file'
                  className='form-control'
                  name='profileImage'
                  onChange={handleFileChange}
                />
              </div>

              <button className='btn btn-primary'>
                {updateMode ? 'Update' : 'Save'}
              </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AddEmployee;
