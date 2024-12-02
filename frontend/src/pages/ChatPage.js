import React, { useState, useEffect } from "react";
import api from "../services/api";
import Message from "../components/Message";
import socket from "../services/websocket";
import "./ChatPage.css";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(() => {
        // Inicializa o estado do usuário com o valor do sessionStorage
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            api.get("/messages/").then((response) => {
                const messages = response.data;
                setMessages(messages);
            });

            socket.on("updatedMessages", (updatedMessages) => {
                console.log(updatedMessages);
                setMessages(updatedMessages);
            });

            return () => {
                socket.off("updatedMessages");
            };
        }
    }, [user]);

    useEffect(() => {
        // Atualiza o sessionStorage sempre que o estado do usuário mudar
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    const sendMessage = () => {
        setLoading(true);
        const message = {
            user: user.id,
            text: newMessage,
        };

        // Emit message to the server
        socket.emit("sendMessage", message);
        setNewMessage("");
        setLoading(false);
    };

    return (
        <div className="chat-container">
            <h1>Chat</h1>

            <div className="message-list">
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        content={msg.text}
                        isUser={msg.user === user.id}
                    />
                ))}
            </div>
            <div className="message-input-container">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !newMessage.trim()}
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>
            </div>
        </div>
    );
}

export default ChatPage;
