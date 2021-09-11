import "./messenger.css";
import Conversation from "../../components/MessangerComponents/conversations/Conversation";
import Message from "../../components/MessangerComponents/message/Message";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';


export default function Messenger(props) {

  const handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
    }
  };

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const userLogin = useSelector((state) => state.userLogin);
  const scrollRef = useRef();

  useEffect(() => {
    if (!userLogin.info) {
      props.history.push("/signin");
    }
  });

  useEffect(() => {
    socket.current = io("/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userLogin.info.userId);
  }, [userLogin.info.userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/${userLogin.info.userId}`);
        setConversations(res.data);
      }
      catch (err) { console.log(err) };
    };
    getConversations();
  }, [userLogin.info]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`api/messages/${currentChat?._id}`); //here ?
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessage = async () => {
    const message = {
      sender: userLogin.info.userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      member => member !== userLogin.info.userId
    );

    socket.current.emit("sendMessage", {
      senderId: userLogin.info.userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {userLogin.info ? (
        <div className="messenger">
          <div className="chatMenu">
          <Scrollbars>
            <div className="chatMenuWrapper">
              <div style={{ color: '#F9575C', fontSize: 'x-large', fontWeight: 'bold', borderBottom: '2px solid #F9BE4F', padding: '10px' }}>Chats</div>
              {conversations.map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversation
                    conversation={c}
                    currentUser={userLogin.info.userId}
                  />
                </div>
              ))}
            </div>
            </Scrollbars>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div key={m._id} ref={scrollRef}>
                        <Message
                          message={m}
                          own={m.sender === userLogin.info.userId}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyUp={handleEnter}
                      value={newMessage}
                    ></textarea>
                    <Button className="chatSubmitButton ml-4" onClick={handleSubmit}>
                      Send
                    </Button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
