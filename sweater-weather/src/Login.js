import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to "/" (home route)
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function Login({ loginUser }) {

    const INITIAL_STATE = { username: "testuser", password: "123456" };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to "/""
     */

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await loginUser(formData);
        if (res.success) {
            setFormData(INITIAL_STATE);
            console.log(`login successful`);
            navigate("/");
        } else {
            setFormErrors(res.errors);
        }
    };

    // Update form data field
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(l => ({ ...l, [name]: value }));
    };





    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3 mt-3">Please log in to check your weather!</h3>

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
                                    autoComplete="username"
                                    required
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
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {/* {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null} */}

                            <button
                                className="btn btn-primary float-right mt-3"
                                onSubmit={handleSubmit}
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

export default Login;