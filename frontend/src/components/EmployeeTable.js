import React from 'react';
import { Link } from 'react-router-dom';
import { notify } from '../utils';

const EmployeeTable = ({
    employees,
    pagination,
    fetchEmployees,
    handleUpdateEmployee,
    handleDeleteEmployee, // Receiving the delete handler from props
}) => {
    const headers = ['Name', 'Email', 'Mobile', 'Designation', 'Gender', 'Course', 'Action'];
    const { currentPage, totalPages } = pagination; 
    const TableRow = ({ employee }) => {
        return (
            <tr>
                <td>
                    <Link to={`/employee/${employee._id}`} className='text-decoration-none'>{employee.name}</Link>
                </td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>
                    <i
                        className='bi bi-pencil-fill text-warning md-4'
                        role='button'
                        data-bs-toggle='tooltip'
                        data-bs-placements="top"
                        onClick={() => handleUpdateEmployee(employee)}
                    ></i>

                    <i
                        className='bi bi-trash-fill text-danger md-4'
                        role='button'
                        data-bs-toggle='tooltip'
                        data-bs-placements="top"
                        onClick={() => handleDeleteEmployee(employee)} // Using the delete handler
                    ></i>
                </td>
            </tr>
        );
    };

    const pageNumber = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };

    const handlePagination = (currPage) => {
        fetchEmployees('', currPage, 5);
    };

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <TableRow key={emp._id} employee={emp} />
                    ))}
                </tbody>
            </table>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <span className='badge bg-primary'>Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className='btn btn-outline-primary me-2'
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumber.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePagination(page)}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className='btn btn-outline-primary ms-2'
                        onClick={handleNextPage}
                        disabled={totalPages === currentPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default EmployeeTable;
