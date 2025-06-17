"use client";

import {use, useEffect, useState} from "react";
import ChatRoom from "@/components/chat-room";


export default function ChatRoomPage({params}: {params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (typeof localStorage != "undefined") setLoading(false);
    }, [])

    if (!loading) return <ChatRoom roomId={id} name={localStorage.getItem("name") as string} />;

    return <></>;
}
