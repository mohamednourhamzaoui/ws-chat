import ChatRoomMessages from "@/components/chat-room-messages";
import {useEffect, useRef, useState} from "react";
import {SocketMessage} from "@/lib/type/socket-types";
import io from "socket.io-client";

const socket = io("http://localhost:4000");


function ChatRoom({roomId, name}: {roomId: string, name: string}) {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<SocketMessage[]>([]);

    useEffect(() => {
        socket.on("message", (msg: SocketMessage) => {
            setMessages((prev) => [...prev, msg]);
        });
        socket.on("join", (msg: SocketMessage) => {
            console.log("join: ", msg);
        });
        socket.emit("join", {
            type: "JOIN_ROOM",
            message: "",
            userId: name,
        });

    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit("message", {
                type: "MSG_MESSAGE",
                message: input,
                userId: name,
            });
            setInput("");
        }
    };

    return (<div className="h-screen pt-1">
        <div>
            <div className="flex justify-center p-4 m-2 border-2 border-white">
                <h1>Room: {roomId}</h1>
            </div>
            <div className=" overflow-hidden border-white border-2 mx-2 p-2">
                <ChatRoomMessages messages={messages} name={name}/>
            </div>
        </div>
        <div className="w-full flex">
            <input
                className="border-2 border-white w-full p-3 m-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Enter message"
            />
            <button className="w-32 border-white border-2 m-2" onClick={sendMessage}>Send</button>
        </div>
    </div>)
}

export default ChatRoom;