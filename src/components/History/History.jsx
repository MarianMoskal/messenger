import React, { useEffect, useState } from "react";
import { users } from "../../db";

export default function History({ id }) {
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    if (id) {
      const user = users.find((u) => u.id === id);
      setUserMessages(user.messages);
    }
  }, [id]);

  return (
    <div>
      <ul>
        {userMessages.map(({ text, time, owner }) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
}
