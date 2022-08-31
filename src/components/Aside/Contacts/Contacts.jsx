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
        text: text.length < 50 ? text : `${text.substring(0, 50)}...`,
        date,
      };
    }
  };

  return (
    <div className={s.container}>
      {filteredUsers && filteredUsers.length ? (
        <>
          <p className={s.heading}>Chats</p>
          <ul>
            {filteredUsers.map(({ name, id, online, avatar, messages }) => (
              <li key={id} className={s.item}>
                <a href="/" id={id} onClick={handleClick} className={s.link}>
                  <div className={s.contact}>
                    <div className={s.avatar}>
                      <img
                        className={s.image}
                        src={avatar}
                        alt=""
                        width="45"
                        height="45"
                      />
                      {online && (
                        <img
                          className={s.online}
                          src="/ok.svg"
                          alt=""
                          width="15"
                          height="15"
                        />
                      )}
                    </div>
                    <div className={s.nameWrapper}>
                      <p className={s.name}>{name}</p>
                      {messages.length ? (
                        <p className={s.message}>
                          {lastMessage(messages).text}
                        </p>
                      ) : null}
                    </div>
                    {messages.length ? (
                      <p className={s.date}>
                        {format(new Date(lastMessage(messages).date), "PP")}
                      </p>
                    ) : null}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={s.empty}>Matches not found</div>
      )}
    </div>
  );
}
