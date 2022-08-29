import { format } from "date-fns";
import { fetchAnswer } from "../../API/fetchAnswer";
import React, { useCallback, useEffect, useState } from "react";

export default function History({ id, users, moveUserToTop }) {
  const [index, setIndex] = useState(0);
  const [userMessages, setUserMessages] = useState([]);
  const [answer, setAnswer] = useState({ text: "", time: "", owner: "" });

  useEffect(() => {
    if (users.length) {
      const user = users.findIndex((u) => u.id === id);
      setIndex(user);
    }
  }, [id, users]);

  useEffect(() => {
    if (users[index]) {
      setUserMessages(users[index].messages);
    }
  }, [index, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.input.value) {
      return;
    }

    const message = {
      text: e.target.input.value,
      time: new Date(Date.now()),
      owner: "User",
    };

    setMessages(message, index);
    prepareAnswer(users[index].name);
    e.target.reset();
  };

  const setMessages = useCallback(
    (message, localIndex) => {
      if (localIndex === -1 || localIndex === undefined) {
        localIndex = users.findIndex((u) => u.name === message.owner);
      }

      if (users[localIndex]) {
        const newMessages = [...users[localIndex].messages, message];
        users[localIndex].messages = newMessages;
        window.localStorage.setItem("users", JSON.stringify(users));
        if (localIndex === index) {
          setUserMessages(newMessages);
        }
      }
    },
    [index, users]
  );

  useEffect(() => {
    if (answer.text && answer.time && answer.owner) {
      alert(`You have recieved a new message from ${answer.owner}`);
      setMessages(answer);
      setAnswer({ text: "", time: "", owner: "" });
    }
  }, [answer, index, setMessages]);

  const prepareAnswer = async (name) => {
    try {
      const result = await fetchAnswer();

      if (result.status === 200) {
        const { value } = await result.json();

        setTimeout(() => {
          const answer = {
            text: value,
            time: new Date(Date.now()),
            owner: name,
          };
          setAnswer(answer);
          const idx = users.findIndex((u) => u.name === answer.owner);
          moveUserToTop(users, idx, 0);
        }, 10000);
      }
    } catch (error) {
      alert(
        `There is some problem with fetching your answer. ${error.message}`
      );
    }
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
