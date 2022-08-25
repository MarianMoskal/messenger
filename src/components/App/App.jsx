import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../views/Home/Home";
// import History from "../History/History";

const centered = { textAlign: "center" };

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="history" element={<History />} /> */}
        </Route>
        <Route path="*" element={<h1 style={centered}>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}
export default App;
