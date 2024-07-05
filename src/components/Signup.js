import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    // State to hold form input values
    let navigate = useNavigate(); // useNavigate hook replaces useHistory

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Function to handle input changes
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate an API call
        const response = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        console.log(json);

        // Handle response here
        if (json.status === "success") {
            navigate("/login"); // Use navigate to redirect
            props.showAlert("singup success", "success")
            // Perform any further actions like redirecting to the login page
        } else {
            props.showAlert("invalid singup", "danger");
        }

    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
