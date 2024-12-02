import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3030/users/login",
                {
                    email,
                    password,
                }
            );

            const user = response.data;

            // Armazena o usuário no sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));

            navigate("/chat");
        } catch (error) {
            setMessage(`Erro ao logar: ${error.response.data.error}`);
        }
    };

    return (
        <>
            <button className="button" onClick={handleBack}>
                Voltar
            </button>

            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">
                        Entrar
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}

export default LoginPage;
