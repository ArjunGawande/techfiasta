import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around list-none">
        <li>
          <Link className="text-white hover:text-blue-400 transition-colors duration-300" to="/">Home</Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-400 transition-colors duration-300" to="/login">Login</Link>
        </li>
        <li>
          <Link className="text-white hover:text-blue-400 transition-colors duration-300" to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
