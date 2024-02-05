"use client";

import React, { useState } from 'react';
import './navbar.scss';

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <a href="/">Taskvix</a>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!" onClick={toggleNav}>
              <span></span>
            </a>
          </div>
          <ul className={`nav-list ${isNavOpen ? 'open' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/tasks">Tasks</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
