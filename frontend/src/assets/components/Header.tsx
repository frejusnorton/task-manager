import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiUserPlus,FiLogOut  } from "react-icons/fi";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);
 console.log(isAuthenticated);
 
    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        setIsAuthenticated(false);
    };


    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <Link to="/">
                        <img
                            src="/images/icons/icons.jpg"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                    <span className="text-2xl font-bold text-blue-600">TaskManager</span>
                </div>

                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 text-3xl">
                        <FaUserCircle />
                    </button>

                
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        to="/connexion"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FiLogIn className="mr-2" /> Connexion
                                    </Link>
                                    <Link
                                        to="/inscription"
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FiUserPlus className="mr-2" /> Inscription
                                    </Link>
                                </>
                            ) : (
                                
                                <Link
                                    to="/connexion"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                >
                                    <FiLogOut className="mr-2" /> Déconnexion
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
