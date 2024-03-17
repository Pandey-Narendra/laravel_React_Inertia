import React from 'react';
import { Link } from '@inertiajs/react';

const Navbar = ({ isLogin }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link className="text-white font-bold" href="/">Laravel React</Link>
                    <div className="flex space-x-4">
                        {isLogin.user ? (
                            <>
                                <Link className="text-white" href={route('dashboard')}>Dashboard</Link>
                            </>
                        ) : (
                            <>
                                <Link className="text-white" href={route('login')}>Login</Link>
                                <Link className="text-white" href={route('register')}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
