import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventView from "./pages/EventView";
import EventForm from "./pages/EventForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthStore } from './store/authUser';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log('user is here',user)

  useEffect(() => {
		authCheck();
	}, [authCheck]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view" element={<EventView />} />
        <Route path="/form" element={<EventForm />} />
      </Routes>
      <Toaster />
    </Router>
    
  );
}

export default App;
