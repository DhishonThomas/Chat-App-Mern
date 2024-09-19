import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ChatContextType {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  notification: any[];
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  chats: any;
  setChats: React.Dispatch<React.SetStateAction<any>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider = ({ children }: ChatProviderProps) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [notification, setNotification] = useState<any[]>([]);
  const [chats, setChats] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;