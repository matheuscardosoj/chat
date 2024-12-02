import React from "react";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Chat</h1>

            <div className="forms-container">
                <div className="card">
                    <h2>Entrar ou Registrar</h2>
                    <p>
                        Para acessar o chat, por favor faça login ou
                        registre-se.
                    </p>
                    <div className="buttons">
                        <button
                            onClick={() => (window.location.href = "/login")}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => (window.location.href = "/register")}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
