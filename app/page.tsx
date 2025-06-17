"use client";

import { useState } from "react";
import {useRouter} from "next/navigation"

export default function Home() {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const route = useRouter();

    const applyChange = () => {
        localStorage.setItem("name", name);
        route.push("/room/" + room);
    }

    return (
        <div className="flex flex-col items-center justify-center  h-screen">
            <div className="p-5 flex flex-col gap-3">
                <div>
                    <input value={name} onChange={event => { setName(event.target.value)}} className="input-ui" placeholder="What's your name?"/>
                </div>
                <div>
                    <input value={room} onChange={event => { setRoom(event.target.value)}} className="input-ui" placeholder="Which room you want to access?"/>
                </div>
                <div className="flex justify-end">
                    <button onClick={applyChange} className="px-3 py-1 rounded-lg border-2 border-white">Join</button>
                </div>
            </div>
        </div>
    );
}
