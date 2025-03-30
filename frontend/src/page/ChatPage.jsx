import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3001/api/chat");
    setChats(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>
    {
      chats.map((item)=>(
        <div key={item._id}>{item.chatName}</div>
      ))
    }
  </div>;
};

export default ChatPage;
