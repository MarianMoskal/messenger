import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export default function History({ index, users }) {
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    if (users.length && index !== -1) {
      setUserMessages(users[index].messages);
    }
  }, [index, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      text: e.target.input.value,
      time: new Date(Date.now()),
      owner: "User",
    };

    const newMessages = [...users[index].messages, message];
    users[index].messages = newMessages;
    window.localStorage.setItem("users", JSON.stringify(users));
    setUserMessages(newMessages);

    e.target.reset();
  };

  return (
    <div>
      {userMessages.length ? (
        <ul>
          {userMessages.map(({ text, time, owner }) => (
            <li key={text + time}>
              <p>{text}</p>
              <p>{format(new Date(time), "Pp")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>You have no chat history yet</h2>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" id="input" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
