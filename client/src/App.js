import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
