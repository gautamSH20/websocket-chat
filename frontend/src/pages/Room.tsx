import { useRef, useState } from "react";

export const Room = () => {
  const [creatBox, setCreateBox] = useState(false);
  const roomId: any = useRef();
  function onCreate() {
    roomId.current = Math.floor(Math.random() * 100000000);

    setCreateBox((e) => !e);
    console.log(roomId.current);
  }

  return (
    <div className="bg-black flex   justify-center h-[100vh] items-center">
      {/* create box to get the roomID */}
      {creatBox && (
        <div className="bg-slate-500 p-4 fixed rounded-md">
          <div className="m-2">
            {" "}
            The created roomId :{" "}
            <span className="bg-black p-1 rounded-md">{roomId.current}</span>
          </div>
          <a
            className="hover:text-blue-400 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(roomId.current);
              alert("The code has been copide");
            }}
          >
            copy
          </a>
          <button className="btn m-2" onClick={() => setCreateBox((e) => !e)}>
            X
          </button>
        </div>
      )}
      <div className="bg-slate-700 h-2/3 lg:w-1/3 w-1/2 rounded-md p-3 flex flex-col flex-wrap items-center text-lg ">
        <div className="m-2">Welcom to the IN-CHAT-ROOM </div>
        <div className="mt-8">
          Want to create a new room{" "}
          <button className="btn" onClick={onCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
