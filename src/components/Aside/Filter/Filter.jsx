import s from "./Filter.module.css";
import React from "react";

export default function Filter({ handleFilterInput }) {
  return (
    <div className={s.container}>
      <input
        className={s.input}
        type="text"
        onInput={handleFilterInput}
        placeholder="Search or start new chat"
      />
      <img
        className={s.image}
        src="/search.svg"
        alt=""
        width="15"
        height="15"
      />
    </div>
  );
}
