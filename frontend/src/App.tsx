import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState(["hello", "what are you"]);
  const wsRef: any = useRef();
  const inputRef: any = useRef();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="bg-black h-[100vh] flex flex-col justify-between">
      <div className="mt-5">
        {message.map((itemes) => (
          <div className=" p-3 mt-2">
            <span className="bg-white p-3 rounded-full">{itemes}</span>
          </div>
        ))}
      </div>
      <div className="bg-white w-full ">
        <input ref={inputRef} placeholder="Enter the chat"></input>
        <button
          onClick={() => {
            const message = inputRef.current?.value;
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: message,
                },
              })
            );
            inputRef.current.value = "";
          }}
          className="bg-purple-300 p-2"
        >
          send Msg
        </button>
      </div>
    </div>
  );
}

export default App;
