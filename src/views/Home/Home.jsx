import "./Home.css";
import History from "../../components/History/History";
import { useEffect, useState } from "react";
import { users } from "../../db";

export default function Home() {
  const [filteredUsers, setFileterdUsers] = useState(users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState(
    "Select a user to view chat history"
  );

  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u.id === selectedUserId);
      setSelectedUserName(user.name);
    }
  }, [selectedUserId]);

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedUserId(e.currentTarget.id);
  };

  const handleFilterInput = (e) => {
    if (e.target.value) {
      const usersFilteredByInputValue = users.filter((u) =>
        u.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFileterdUsers(usersFilteredByInputValue);
    } else {
      setFileterdUsers(users);
    }
  };

  return (
    <div className="container">
      <div className="aside">
        <div>
          <p>User</p>
          <input type="text" onInput={handleFilterInput} />
        </div>
        <div>
          <p>Chats</p>
          <ul>
            {filteredUsers.length ? (
              filteredUsers.map(({ name, id, online }) => (
                <li key={id}>
                  <a href="/" id={id} onClick={handleClick}>
                    <img src="" alt="" />
                    <p>{name}</p>
                  </a>
                </li>
              ))
            ) : (
              <li>Matches not found</li>
            )}
          </ul>
        </div>
      </div>
      <div className="chat">
        <img src="#" alt="" />
        <p>{selectedUserName}</p>
        <History id={selectedUserId} />
        <input type="text" />
      </div>
    </div>
  );
}
