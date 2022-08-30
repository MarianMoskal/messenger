import s from "./Form.module.css";
import React from "react";

export default function Form({ users, index, prepareAnswer, setMessages }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.input.value) {
      return;
    }

    const message = {
      text: e.target.input.value,
      date: new Date(Date.now()),
      owner: "User",
      avatar: "",
    };

    setMessages(message, index);
    prepareAnswer(users[index].name);
    e.target.reset();
  };

  return (
    <div>
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
