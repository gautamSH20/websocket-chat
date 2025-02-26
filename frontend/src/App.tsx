import "./App.css";
import { NavBar } from "./pages/NavBar";
import { Room } from "./pages/room";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Room />
      </div>
    </div>
  );
}

export default App;
