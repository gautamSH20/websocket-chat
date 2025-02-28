import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function MsgBox() {
  const [message, setMessage] = useState<string[]>([]);

  const inputRef: any = useRef();
  const { ws } = useAuthStore();

  ws.onmessage = (evet) => {
    setMessage((m) => [...m, evet.data]);
  };

  function sendMsg() {
    const message = inputRef.current?.value;

    if (message && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );
    }
  }
  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-slate-700 h-2/3 w-2/3 rounded-lg p-2">
        <div className="mt-5 h-3/4 overflow-auto w-full">
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
          <button onClick={sendMsg} className="btn p-2">
            send Msg
          </button>
        </div>
      </div>
    </div>
  );
}

export default MsgBox;
