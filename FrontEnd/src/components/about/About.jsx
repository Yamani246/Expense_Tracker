// About.js

import React from 'react';
import './about.css';

function About() {
  return (
    <div className="container-about">
      <div className="heading">About Expense Tracker</div>
      <div className="text">
        <p>Welcome to Expense Tracker, your go-to tool for managing your finances and tracking your expenses effortlessly. Our platform is designed to help individuals take control of their spending and make informed financial decisions.</p>
      </div>

      <div className="heading">Our Mission</div>
      <div className="text">
        <p>At Expense Tracker, our mission is to empower users to achieve financial wellness by providing them with a simple and intuitive tool to track their expenses. We believe that understanding where your money goes is the first step towards financial freedom, and our platform is here to help you every step of the way.</p>
        <p>Easily log your expenses in just a few clicks. Our user-friendly interface makes it simple to add, edit, and delete expenses anytime, anywhere.</p>
      </div>
    </div>
  );
}

export default About;
