import {SocketMessage} from "@/lib/type/socket-types";

function ChatRoomMessages({name, messages}: { name: string, messages: SocketMessage[] }) {
    return (<div className="h-96 overflow-y-scroll">
        {messages.map((msg, i) => {
            if (msg.type == "MSG_MESSAGE") {
                if (name != msg.userId) return (<div key={i} className="pl-2 m-2">
                    <div>
                        <div className="font-extralight text-xs text-white pl-1">{msg.userId}</div>
                        <div className="bg-blue-500 px-3 py-1 rounded-lg text-white max-w-60">{msg.message}</div>
                    </div>
                </div>)
                else return (<div key={i} className=" flex justify-end">
                    <div className="pr-4">
                        <div className="font-extralight text-xs text-white pl-1">{msg.userId}</div>
                        <div className="bg-gray-500 px-3 py-1 rounded-lg text-white max-w-60">{msg.message}</div>
                    </div>
                </div>);
            } else if (msg.type == "SERVER_INFO") {
                return (<div key={i} className=" flex justify-center">
                    <div className="text-white font-extralight">{msg.message}</div>
                </div>)
            }
        })}
    </div>)
}

export default ChatRoomMessages;