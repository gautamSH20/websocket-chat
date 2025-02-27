import { useEffect, useRef, useState } from "react";

function MsgBox() {
  const [message, setMessage] = useState([""]);
  const wsRef: any = useRef();
  const inputRef: any = useRef();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    wsRef.current = ws;
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-slate-700 h-2/3 w-2/3 rounded-lg p-2">
        <div className="mt-5 h-3/4 overflow w-full">
          {message.map((itemes) => (
            <>
              {itemes != "" ? (
                <div className=" p-3 mt-2">
                  <span className="bg-slate-500 p-3 rounded-full">
                    {itemes}
                  </span>
                </div>
              ) : null}
            </>
          ))}
        </div>
        <div className="bg-blue-300 w-full flex justify-between p-2 ">
          <input
            ref={inputRef}
            placeholder="Enter the chat"
            className="flex-1 input"
          ></input>
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
            className="btn p-2"
          >
            send Msg
          </button>
        </div>
      </div>
    </div>
  );
}

export default MsgBox;
