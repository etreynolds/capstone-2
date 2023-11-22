import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import WeatherApi from "./api";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to "/"" route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function Signup({ signupUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "Signup",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to "/"
     */

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await signupUser(formData);
        if (res.success) {
            console.log("user signup successful")
            navigate("/");
        } else {
            setFormErrors(res.errors);
        }
    }

    // Update form data field
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3 mt-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            } */}

                            <button
                                type="submit"
                                className="btn btn-primary float-right mt-3"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;