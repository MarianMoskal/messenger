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
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.wrapper}>
        <input
          className={s.input}
          type="text"
          id="input"
          placeholder="Type your message"
          autoComplete="off"
          required
        />
        <button type="submit" className={s.button}>
          <img
            className={s.icon}
            src="/send.svg"
            alt=""
            width="20"
            height="20"
          />
        </button>
      </div>
    </form>
  );
}
