import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./assets/scss/main.scss";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./components/anonymous/Home";
import AnonymousRouting from "./routes/anonymous";
import NotFound from "./components/common/NotFound";
import AuthenticatedRouting from "./routes/authenticated";
import Login from "./components/anonymous/Login";
import Dashboard from "./components/authenticated/Dashboard";
import Logout from "./components/authenticated/Logout";
import LayoutAdmin from "./components/LayoutAdmin";

if (typeof window !== "undefined") {
  import("animate.css");
}

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        {/* <Route element={<AnonymousRouting />}>
          <Route path="login" element={<Login />}></Route>
        </Route> */}
        {/* <Route element={<AuthenticatedRouting />}>
          <Route path="/rezervari" element={<Rezervari />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AnonymousRouting />}>
        <Route path="auth" element={<Login />}></Route>
      </Route>
      <Route element={<AuthenticatedRouting />}>
        <Route element={<LayoutAdmin />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
