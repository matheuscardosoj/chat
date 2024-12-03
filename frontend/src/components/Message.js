import React from "react";
import "./Message.css";

function Message({ content, mood, isUser, userName }) {
    const getEmoji = (mood) => {
        switch (mood) {
            case "happy":
                return "😁";
            case "neutral":
                return "🙂";
            case "sad":
                return "😔";
            default:
                return "";
        }
    };

    return (
        <div className={`message ${isUser ? "user" : "other"}`}>
            {isUser ? null : <span className="username">{userName}</span>}
            <p className="text">{content}</p>
            {mood && <span className="emoji">{getEmoji(mood)}</span>}
        </div>
    );
}

export default Message;
