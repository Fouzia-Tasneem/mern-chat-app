function Sidebar({ users, selectUser }) {
  return (
    <div className="sidebar">
      <h3>Users</h3>
      {users.map((u) => (
        <div key={u._id} className="user-item" onClick={() => selectUser(u)}>
          {u.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
