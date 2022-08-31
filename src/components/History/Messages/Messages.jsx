import s from "./Messages.module.css";
import React from "react";
import { format } from "date-fns";

export default function Messages({ userMessages }) {
  return (
    <div className={s.container}>
      {userMessages.length ? (
        <ul>
          {userMessages.map(({ text, date, owner, avatar }) => (
            <li className={s.item} key={text + date}>
              {owner === "User" ? (
                <>
                  <div className={s.wrapper}>
                    <p className={s.userMessage}>{text}</p>
                  </div>
                  <p className={s.userDate}>{format(new Date(date), "Pp")}</p>
                </>
              ) : (
                <>
                  <div className={s.wrapper}>
                    <img
                      className={s.image}
                      src={avatar}
                      alt=""
                      width="45"
                      height="45"
                    />
                    <p className={s.message}>{text}</p>
                  </div>
                  <p className={s.date}>{format(new Date(date), "Pp")}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h1 className={s.heading}>You have no chat history yet</h1>
      )}
    </div>
  );
}
