import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { RoomPage } from "./pages/RoomPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="room/:id" element={<RoomPage />} />
      </Routes>
    </>
  );
};

export default App;
