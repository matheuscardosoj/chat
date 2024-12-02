import React from "react";
import "./Message.css";

function Message({ content, isUser }) {
    return (
        <div className={`message ${isUser ? "user" : "other"}`}>
            <p>{content}</p>
        </div>
    );
}

export default Message;
