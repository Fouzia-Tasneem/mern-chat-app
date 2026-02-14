import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../utils/socket";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";

function ChatPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    socket.emit("user-join", user._id);

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  const loadMessages = async (u) => {
    setSelectedUser(u);

    const res = await axios.get(`http://localhost:5000/api/messages/${u._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMessages(res.data);
  };

  const sendMessage = () => {
    if (!text.trim() || !selectedUser) return;

    socket.emit("chat-message", {
      senderId: user._id,
      receiverId: selectedUser._id,
      message: text,
    });

    setText("");
  };

  return (
    <div className="chat-container">
      <Sidebar users={users} selectUser={loadMessages} />

      <div className="chat-area">
        {selectedUser && (
          <>
            <div className="messages">
              {messages.map((m) => (
                <MessageBubble key={m._id} msg={m} currentUser={user._id} />
              ))}
            </div>

            <div className="input-area">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
