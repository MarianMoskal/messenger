import { format } from "date-fns";
import { fetchAnswer } from "../../API/fetchAnswer";
import React, { useCallback, useEffect, useState } from "react";

export default function History({ index, users, moveUserToTop }) {
  const [userMessages, setUserMessages] = useState([]);
  const [answer, setAnswer] = useState({ text: "", time: "", owner: "" });

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
        localStorage.setItem("users", JSON.stringify(users));

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
          // const idx = users.findIndex((u) => u.name === answer.owner);
          moveUserToTop(users, index, 0);
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
      {users[index] && (
        <img src={users[index].avatar} alt="" width="40" height="40" />
      )}
      {users[index] && users[index].online && (
        <img src="/ok.svg" alt="" width="15" height="15" />
      )}
      {users[index] && <p>{users[index].name}</p>}
      {userMessages.length ? (
        <ul>
          {userMessages.map(({ text, time, owner, avatar }) => (
            <li key={text + time}>
              {/* <img src={avatar} alt="" width="40" height="40" /> */}
              <p>{text}</p>
              <p>{format(new Date(time), "Pp")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>You have no chat history yet</h2>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="input"
          placeholder="Type your message"
          autoComplete="off"
          required
        />
        <button type="submit">
          <img src="/send.svg" alt="" width="20" height="20" />
        </button>
      </form>
    </div>
  );
}
