import { Route, Routes } from "react-router-dom";
import Join from "./components/Join";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Join />} />
      </Routes>
    </>
  );
}

export default App;
