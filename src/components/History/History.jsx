import { format } from "date-fns";
import { fetchAnswer } from "../../API/fetchAnswer";
import React, { useCallback, useEffect, useState } from "react";

export default function History({ index, users }) {
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

    setMessages(message);
    prepareAnswer(users[index].name);
    e.target.reset();
  };

  const setMessages = useCallback(
    (message) => {
      if (users[index]) {
        const newMessages = [...users[index].messages, message];
        users[index].messages = newMessages;
        window.localStorage.setItem("users", JSON.stringify(users));
        setUserMessages(newMessages);
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
  }, [answer, setMessages]);

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
