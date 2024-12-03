/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Message from "../components/Message";
import socket from "../services/websocket";
import "./ChatPage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [mood, setMood] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const navigate = useNavigate();
    const refMessageList = useRef(null);

    useEffect(() => {
        api.get("/messages").then((response) => {
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        if (refMessageList.current) {
            refMessageList.current.scrollTop =
                refMessageList.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (user) {
            socket.on("updatedMessages", (updatedMessages) => {
                setMessages(updatedMessages);
            });

            return () => {
                socket.off("updatedMessages");
            };
        }
    }, [user]);

    const sendMessage = () => {
        console.log(mood);

        setLoading(true);
        let message = null;

        if (mood) {
            message = {
                userId: user.id,
                userName: user.name,
                text: newMessage,
                mood: mood,
            };
        } else {
            message = {
                userId: user.id,
                userName: user.name,
                text: newMessage,
            };
        }

        socket.emit("sendMessage", message);
        setNewMessage("");
        setMood("");
        setLoading(false);

        refMessageList.current.scrollTop = refMessageList.current.scrollHeight;
    };

    const handleBack = async () => {
        navigate("/");
    };

    return (
        <>
            <button className="button buttonVoltar" onClick={handleBack}>
                Sair
            </button>

            <div className="chat-container">
                <h1>Chat</h1>

                <div className="container-message-list" ref={refMessageList}>
                    <div className="message-list">
                        {messages.map((msg, index) => (
                            <Message
                                key={index}
                                content={msg.text}
                                mood={msg.mood}
                                isUser={msg.userId === user.id}
                                userName={msg.userName}
                            />
                        ))}
                    </div>
                </div>

                <div className="message-input-container">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Digite sua mensagem..."
                    />
                    <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="mood-selector"
                    >
                        <option value="">Emoji</option>
                        <option value="happy">😁</option>
                        <option value="neutral">🙂</option>
                        <option value="sad">😔</option>
                    </select>
                    <button
                        className="button"
                        onClick={sendMessage}
                        disabled={loading || !newMessage.trim()}
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatPage;
