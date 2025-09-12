import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Pages/Header';
// import 'sweetalert2/src/sweetalert2.scss'

const Forms = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3020/api/v1/users', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      
      Swal.fire({
        title: "Sucessful!",
        text: "You have succesfully registered",
        icon: "success"
      });
     
      console.log(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire({
        title: "Error!",
        text: "There has been an error in registering!",
        icon: "error"
      });
    }
  };

  return (
    <>
    <Header/>
    <section className='reg-sec'>
      <form className="forms" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input
              required
              name="firstName"
              type="text"
              className="inputs"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder=" "
            />
            <span>Firstname</span>
          </label>
          <label>
            <input
              required
              name="lastName"
              type="text"
              className="inputs"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder=" "
            />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input
            required
            name="email"
            type="email"
            className="inputs"
            value={formData.email}
            onChange={handleInputChange}
            placeholder=" "
          />
          <span>Email</span>
        </label>
        <label>
          <input
            required
            name="password"
            type="password"
            className="inputs"
            value={formData.password}
            onChange={handleInputChange}
            placeholder=" "
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required
            name="confirmPassword"
            type="password"
            className="inputs"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder=" "
          />
          <span>Confirm password</span>
        </label>
        <button className="submit" type="submit">Submit</button>
        <p className="signin">Already have an account? 
                <Link to="/login">Signin</Link>
            </p>
      </form>
    </section>
    </>
  );
};

export default Forms;
