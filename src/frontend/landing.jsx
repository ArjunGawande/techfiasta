import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup'); // Redirect to Sign Up page
    };

    const handleLogin = () => {
        navigate('/login'); // Redirect to Login page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
            <div className="text-center p-10 bg-white rounded-lg shadow-xl">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to Our Platform</h1>
                <p className="text-lg text-gray-600 mb-10">Join us to experience amazing features and benefits.</p>
                <div className="flex justify-center space-x-6">
                    <button 
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transform transition duration-200"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                    <button 
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-600 hover:scale-105 transform transition duration-200"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
