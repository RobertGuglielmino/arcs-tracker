import { useState } from "react";
import type { Card } from "./Card";
import event from "./assets/event_1.webp";

interface PlayerProps {
    index: number;
    hand: Card[];
}

function Player({ index, hand }: PlayerProps) {
    const [color, setColor] = useState("white");

    function getHeader(color: string) {
        switch (color) {
            case "white":
                return <div className="font-header w-full text-center text-2xl bg-white m-2 rounded p-1">{index}</div>
            case "red":
                return <div className="font-header w-full text-center text-2xl bg-red-500 m-2 rounded p-1">{index}</div>
            case "yellow":
                return <div className="font-header w-full text-center text-2xl bg-yellow-500 m-2 rounded p-1">{index}</div>
            case "blue":
                return <div className="font-header w-full text-center text-2xl bg-blue-500 m-2 rounded p-1">{index}</div>
        }
    }

    return (<div className="flex flex-col items-center gap-2">
        <div className="flex flex-row text-black w-full justify-center gap-2">
            {getHeader(color)}
            <select
                id="players"
                value={color}
                onChange={(e) => setColor(String(e.target.value))}
                className="border border-gray-300 bg-white rounded text-black text-sm font-body">
                <option value="white">white</option>
                <option value="blue">blue</option>
                <option value="yellow">yellow</option>
                <option value="red">red</option>
            </select>
        </div>
        <div key={index} className="flex flex-row">
            {hand.length > 0 ? hand.map((card, cardIndex) => (
                <div
                    key={card.id}
                    className="h-15 overflow-hidden -ml-8 first:ml-0"
                    style={{ zIndex: cardIndex }}
                >
                    <img
                        src={card.imageSrc}
                        alt={card.id}
                        className="w-16 object-contain"
                    />
                </div>
            )) :
                <div
                    className="h-15 overflow-hidden -ml-8 first:ml-0"
                >
                    <img
                        src={event}
                        className="w-16 object-contain opacity-0"
                    />
                </div>}
        </div>

    </div>)
}

export default Player;
