import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

const AppLayout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="relative h-screen flex flex-col">
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
                Logout
            </button>

            <main className="flex-grow flex items-center justify-center bg-gray-100">
                {children}
            </main>
            <ToastContainer />
        </div>
    );
};

export default AppLayout;
