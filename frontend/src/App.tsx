import "./App.css";

function App() {
  const connect = () => {
    const socket = new WebSocket("ws://localhost:3000");
  };

  return (
    <div>
      <button onClick={connect}>click me</button>
    </div>
  );
}

export default App;
