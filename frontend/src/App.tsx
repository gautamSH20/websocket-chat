import "./App.css";
import MsgBox from "./pages/MsgBox";
import { NavBar } from "./pages/NavBar";
import { Room } from "./pages/Room";
import { useAuthStore } from "./store/useAuthStore";
function App() {
  const { auth } = useAuthStore();
  return (
    <div>
      <NavBar />
      <div>{auth ? <MsgBox /> : <Room />}</div>
    </div>
  );
}

export default App;
