import { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../views/Home/Home";
import { db } from "../../db";

const centered = { textAlign: "center" };

function App() {
  const [data, setData] = useState(
    JSON.parse(window.localStorage.getItem("users")) || []
  );

  useEffect(() => {
    if (!window.localStorage.getItem("users")) {
      window.localStorage.setItem("users", JSON.stringify([...db]));
      setData(JSON.parse(window.localStorage.getItem("users")));
    } else {
      setData(JSON.parse(window.localStorage.getItem("users")));
    }
  }, []);

  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<Home users={data} />} />
        <Route path="*" element={<h1 style={centered}>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}
export default App;
