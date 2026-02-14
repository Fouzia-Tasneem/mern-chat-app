function MessageBubble({ msg, currentUser }) {
  const isMe = msg.senderId === currentUser;

  return (
    <div className={isMe ? "msg right" : "msg left"}>
      <p>{msg.message}</p>
      <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
    </div>
  );
}

export default MessageBubble;
