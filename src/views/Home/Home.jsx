import s from "./Home.module.css";
import Aside from "../../components/Aside/Aside";
import History from "../../components/History/History";
import { useEffect, useState } from "react";
import { db } from "../../db/db";

export default function Home() {
  const [users, setUsers] = useState(
    localStorage.getItem("users")
      ? JSON.parse(window.localStorage.getItem("users"))
      : localStorage.setItem("users", JSON.stringify([...db])) || []
  );
  const [index, setIndex] = useState(-1);
  const [selectedUserId, setSelectedUserId] = useState("");

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

  const moveUserToTop = (arr, fromIdx) => {
    const newArr = JSON.parse(JSON.stringify(arr));
    const el = newArr[fromIdx];

    newArr.splice(fromIdx, 1);
    newArr.unshift(el);

    localStorage.setItem("users", JSON.stringify(newArr));

    setUsers(newArr);
  };

  const updateUsers = (arr) => {
    setUsers(arr);
  };

  return (
    <div className={s.container}>
      <Aside users={users} handleClick={handleClick} />

      <div className={s.chat}>
        {selectedUserId ? (
          <History
            index={index}
            users={users}
            moveUserToTop={moveUserToTop}
            updateParentsComponent={updateUsers}
          />
        ) : (
          <div>Select a user to view chat history</div>
        )}
      </div>
    </div>
  );
}
