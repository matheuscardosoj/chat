import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3030/users", {
                name,
                email,
                password,
            });
            setMessage(`Usuário ${response.data.email} criado com sucesso!`);
        } catch (error) {
            setMessage(`Erro ao criar usuário: ${error.response.data.error}`);
        }
    };

    return (
        <>
            <button className="button" onClick={handleBack}>
                Voltar
            </button>

            <div className="register-container">
                <h2>Cadastro</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        Cadastrar
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}

export default Register;
