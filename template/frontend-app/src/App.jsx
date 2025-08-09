import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* TODO: Add routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
