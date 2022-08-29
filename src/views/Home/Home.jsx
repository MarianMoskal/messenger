import "./Home.css";
import History from "../../components/History/History";
import { useEffect, useState } from "react";
import { db } from "../../db";

export default function Home() {
  const [users, setUsers] = useState(
    localStorage.getItem("users")
      ? JSON.parse(window.localStorage.getItem("users"))
      : localStorage.setItem("users", JSON.stringify([...db])) || []
  );
  const [index, setIndex] = useState(-1);
  const [filteredUsers, setFileterdUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    if (users.length) {
      setFileterdUsers(users);
    }
  }, [users]);

  useEffect(() => {
    if (users.length) {
      const userIdx = users.findIndex((u) => u.id === selectedUserId);
      setIndex(userIdx);
    }
  }, [selectedUserId, users]);

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
    newArr.unshift(el);

    localStorage.setItem("users", JSON.stringify(newArr));

    setUsers(newArr);
  };

  return (
    <div className="container">
      <div className="aside">
        <div>
          <img src="/user.svg" alt="" width="30" height="30" />
          <img src="/ok.svg" alt="" width="15" height="15" />
          <div>
            <img src="/search.svg" alt="" width="15" height="15" />
            <input
              type="text"
              onInput={handleFilterInput}
              placeholder="Search or start new chat"
            />
          </div>
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
                    {online && (
                      <img src="/ok.svg" alt="" width="15" height="15" />
                    )}
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
          <History index={index} users={users} moveUserToTop={moveUserToTop} />
        ) : (
          <h2>Select a user to view chat history</h2>
        )}
      </div>
    </div>
  );
}
