import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Styling/RegisterStyling.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: email, Password: password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Error during login");
            } else {
                navigate("/visualizaties");
            }
        } catch (error) {
            setError("Error during login: " + error.message);
        }
    };

    return (
        <div className="login-container">
            <h1 className={"login-titel"}>Manuscripten opslaan?</h1>
            <h2>Log hiervoor in op uw account.</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin} className="input-group">
                <label htmlFor="Email">Email</label>
                <input
                    type="email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="Password">Wachtwoord</label>
                <input
                    type="password"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
