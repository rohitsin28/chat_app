import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //     setUser(userInfo);
    //     if (!userInfo) {
    //         navigate('/');
    //     }
    // }, []);

    return <chatContext.Provider value={{ user, setUser }}>{children}</chatContext.Provider>;
};

export const chatState = () => {
    return useContext(chatContext);
};
