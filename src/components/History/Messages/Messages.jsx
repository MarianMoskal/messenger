import s from "./Messages.module.css";
import React from "react";
import { format } from "date-fns";

export default function Messages({ userMessages }) {
  return (
    <div>
      {userMessages.length ? (
        <ul>
          {userMessages.map(({ text, date, owner, avatar }) => (
            <li key={text + date}>
              {owner === "User" ? (
                <div>
                  <p>{text}</p>
                  <p>{format(new Date(date), "Pp")}</p>
                </div>
              ) : (
                <div>
                  <img src={avatar} alt="" width="40" height="40" />
                  <p>{text}</p>
                  <p>{format(new Date(date), "Pp")}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h2>You have no chat history yet</h2>
      )}
    </div>
  );
}
