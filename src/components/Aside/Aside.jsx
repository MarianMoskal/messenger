import s from "./Aside.module.css";
import Contacts from "./Contacts/Contacts";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";

export default function Aside({ users, handleClick }) {
  const [filteredUsers, setFileterdUsers] = useState([]);

  useEffect(() => {
    if (users.length) {
      setFileterdUsers(users);
    }
  }, [users]);

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
    <div className={s.aside}>
      <div className={s.header}>
        <div className={s.user}>
          <img src="/user.png" alt="" width="45" height="45" />
          <img
            className={s.online}
            src="/ok.svg"
            alt=""
            width="15"
            height="15"
          />
        </div>
        <Filter handleFilterInput={handleFilterInput} />
      </div>

      <Contacts filteredUsers={filteredUsers} handleClick={handleClick} />
    </div>
  );
}
