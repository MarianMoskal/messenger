import Home from "../../views/Home/Home";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const centered = { textAlign: "center" };

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1 style={centered}>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}
export default App;
