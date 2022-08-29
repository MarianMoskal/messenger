
export const db =
  [
    {
      name: "Alice",
      id: "a",
      avatar: '/Alice.jpg',
      online: true,
      messages: [
        {
          text: "What is love?",
          time: `${new Date(2014, 1, 11, 15, 30)}`,
          owner: "Alice"
        },
        {
          text: "I wish I know!",
          time: `${new Date(2014, 1, 11, 15, 45)}`,
          owner: "User"
        }
      ]
    },
    {
      name: "John",
      id: "b",
      avatar: '/John.jpg',
      online: true,
      messages: [
        {
          text: "Hello. How are you?",
          time: `${new Date(2017, 5, 6, 11, 15)}`,
          owner: "John"
        },
        {
          text: "Hi. I'm okay. What about you?",
          time: `${new Date(2017, 5, 6, 16, 7)}`,
          owner: "User"
        },
        {
          text: "I'm okay too. Have a nice day!",
          time: `${new Date(2017, 5, 6, 19, 5)}`,
          owner: "John"
        }
      ]
    },
    {
      name: "Peter",
      id: "c",
      avatar: '/Peter.jpg',
      online: true,
      messages: []
    },
    {
      name: "Luis",
      id: "d",
      avatar: '/Luis.jpg',
      online: true,
      messages: [
        {
          text: "Let's go for a beer!",
          time: `${new Date(2014, 1, 11, 15, 30)}`,
          owner: "Luis"
        },
        {
          text: "With a pleasure",
          time: `${new Date(2014, 1, 11, 15, 30)}`,
          owner: "User"
        }
      ]
    }
  ];
