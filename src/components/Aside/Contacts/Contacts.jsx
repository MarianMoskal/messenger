import s from "./Contacts.module.css";
import React from "react";
import { format, getTime } from "date-fns";

export default function Contacts({ filteredUsers, handleClick }) {
  const lastMessage = (arr) => {
    if (arr.length) {
      const { text, date } = arr.reduce((prev, current) => {
        return getTime(new Date(prev.date)) > getTime(new Date(current.date))
          ? prev
          : current;
      });
      return {
        text: text.length < 25 ? text : `${text.substring(0, 25)}...`,
        date,
      };
    }
  };

  return (
    <div>
      <p>Chats</p>
      {filteredUsers && filteredUsers.length ? (
        <ul>
          {filteredUsers.map(({ name, id, online, avatar, messages }) => (
            <li key={id}>
              <a href="/" id={id} onClick={handleClick}>
                <div>
                  <img src={avatar} alt="" width="40" height="40" />
                  {online && (
                    <img src="/ok.svg" alt="" width="15" height="15" />
                  )}
                  <p>{name}</p>
                  {messages.length ? <p>{lastMessage(messages).text}</p> : null}
                  {messages.length ? (
                    <p>{format(new Date(lastMessage(messages).date), "PP")}</p>
                  ) : null}
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div>Matches not found</div>
      )}
    </div>
  );
}
