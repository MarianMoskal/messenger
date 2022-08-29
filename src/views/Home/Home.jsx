import "./Home.css";
import History from "../../components/History/History";
import { useEffect, useState } from "react";

export default function Home({ users }) {
  const [filteredUsers, setFileterdUsers] = useState(users);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserAvatar, setSelectedUserAvatar] = useState("");

  useEffect(() => {
    if (users.length) {
      setFileterdUsers(users);
    }
  }, [users]);

  useEffect(() => {
    if (users && selectedUserId) {
      const user = users.find((u) => u.id === selectedUserId);
      setSelectedUserName(user.name);
    }
  }, [selectedUserId, users]);

  useEffect(() => {
    if (filteredUsers.length && selectedUserId) {
      const user = filteredUsers.find((u) => u.id === selectedUserId);
      setSelectedUserAvatar(user.avatar);
    }
  }, [filteredUsers, selectedUserId]);

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

  const moveUserToTop = (arr, fromIdx, toIdx) => {
    const newArr = JSON.parse(JSON.stringify(arr));
    const el = newArr[fromIdx];
    newArr.splice(fromIdx, 1);
    newArr.splice(toIdx, 0, el);
    window.localStorage.setItem("users", JSON.stringify(newArr));
    setFileterdUsers(newArr);
  };

  return (
    <div className="container">
      <div className="aside">
        <div>
          <img src="/user.svg" alt="" width="30" height="30" />
          <input
            type="text"
            onInput={handleFilterInput}
            placeholder="Search or start new chat"
          />
        </div>
        <hr />
        <div>
          <p>Chats</p>
          <ul>
            {filteredUsers.length ? (
              filteredUsers.map(({ name, id, online, avatar }) => (
                <li key={id}>
                  <a href="/" id={id} onClick={handleClick}>
                    <img src={avatar} alt="" width="40" height="40" />
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
        {selectedUserId ? (
          <>
            <img src={selectedUserAvatar} alt="" width="40" height="40" />
            <p>{selectedUserName}</p>
            <History
              users={users}
              id={selectedUserId}
              moveUserToTop={moveUserToTop}
            />
          </>
        ) : (
          <h2>Select a user to view chat history</h2>
        )}
      </div>
    </div>
  );
}
