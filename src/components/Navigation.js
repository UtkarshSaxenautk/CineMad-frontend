// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable react/jsx-no-duplicate-props */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
// import './Navigation.css'
// import { useState } from 'react';
// import Logo from '../images/LOGO.png'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

//   // Function to handle mobile menu toggle
//   const toggleMobileMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Implement logout logic here
//     setIsLoggedIn(false);
//   };

//   return (
//      <nav className="navbar container">
//       <a href="./index.html" className="brand">Brand</a>
//       <div className="burger" id="burger">
//          <span className="burger-line"></span>
//          <span className="burger-line"></span>
//          <span className="burger-line"></span>
//       </div>
//       <span className="overlay"></span>
//       <div className="menu" id="menu">
//          <ul className="menu-inner">
//             <li className="menu-item"><a className="menu-link" href="#">Home</a></li>
//             <li className="menu-item"><a className="menu-link" href="#">About</a></li>
//             <li className="menu-item"><a className="menu-link" href="#">Service</a></li>
//             <li className="menu-item"><a className="menu-link" href="#">Project</a></li>
//             <li className="menu-item"><a className="menu-link" href="#">Support</a></li>
//          </ul>
//       </div>
//       <span><i className="bx bx-search search-toggle"></i></span>
//       <div className="search-block">
//          <form className="search-form">
//             <span><i className="bx bx-arrow-back search-cancel"></i></span>
//             <input type="search" name="search" className="search-input" placeholder="Search here..."/>
//          </form>
//       </div>
//    </nav>
//   );
// };

// export default Navbar;