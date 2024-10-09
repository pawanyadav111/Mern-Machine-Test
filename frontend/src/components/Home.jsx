import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { DeleteEmployeeById, GetAllEmployee } from "./api";
import AddEmployee from "./AddEmployee";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateEmpObj, setUpdateEmpObj] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        employees: [],
        pagination: {
            totalEmployees: 0,
            currentPage: 1,
            totalPages: 1,
            pageSize: 5,
        },
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try {
            const { data } = await GetAllEmployee(search, page, limit);
            setEmployeeData({
                employees: data.employees,
                pagination: data.pagination,
            });
        } catch (err) {
            console.log('Error', err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddEmployee = () => {
        setShowModal(true);
    };

    const handleUpdateEmployee = (empObj) => {
        setUpdateEmpObj(empObj);
        setShowModal(true);
    };

    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    }

    const handleDeleteEmployee = async (employee) => {
        try {
            const { success, message } = await DeleteEmployeeById(employee._id);
            if (success) {
                alert(message);
                fetchEmployees();
            } else {
                alert(message);
            }
        } catch (err) {
            console.log('Error', err);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
            <h1>Employee Management App</h1>
            <div className="w-100 d-flex justify-content-center">
                <div className="w-80 border bg-light p-3" style={{ width: '80%' }}>
                    <div className="d-flex justify-content-between mb-3">
                        <button className="btn btn-primary" onClick={handleAddEmployee}>
                            Add
                        </button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employee..."
                            className="form-control w-50"
                        />
                    </div>
                    <EmployeeTable
                        handleUpdateEmployee={handleUpdateEmployee}
                        handleDeleteEmployee={handleDeleteEmployee}
                        fetchEmployees={fetchEmployees}
                        employees={employeeData.employees}
                        pagination={employeeData.pagination}
                    />
                    <AddEmployee
                        updateEmpObj={updateEmpObj}
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
