
export const db =
  [
    {
      name: "John",
      id: "a",
      avatar: '/John.jpg',
      online: false,
      messages: [
        {
          text: "Hello. How are you?",
          date: `${new Date(2017, 5, 6, 11, 15)}`,
          owner: "John",
          avatar: '/John.jpg'
        },
        {
          text: "Hi. I'm okay. What about you?",
          date: `${new Date(2017, 5, 6, 16, 7)}`,
          owner: "User",
          avatar: ''
        },
        {
          text: "I'm okay too. Have a nice day!",
          date: `${new Date(2017, 5, 6, 19, 5)}`,
          owner: "John",
          avatar: '/John.jpg'
        }
      ]
    },
    {
      name: "Luis",
      id: "b",
      avatar: '/Luis.jpg',
      online: false,
      messages: [
        {
          text: "Let's go for a beer!",
          date: `${new Date(2015, 1, 11, 15, 30)}`,
          owner: "Luis",
          avatar: '/Luis.jpg'
        },
        {
          text: "With a pleasure",
          date: `${new Date(2015, 1, 11, 15, 30)}`,
          owner: "User",
          avatar: ''
        }
      ]
    },
    {
      name: "Alice",
      id: "c",
      avatar: '/Alice.jpg',
      online: false,
      messages: [
        {
          text: "What is love?",
          date: `${new Date(2014, 1, 11, 15, 30)}`,
          owner: "Alice",
          avatar: '/Alice.jpg'
        },
        {
          text: "I wish I know!",
          date: `${new Date(2014, 1, 11, 15, 45)}`,
          owner: "User",
          avatar: '',
        }
      ]
    },
    {
      name: "Peter",
      id: "d",
      avatar: '/Peter.jpg',
      online: false,
      messages: []
    },
  ];
