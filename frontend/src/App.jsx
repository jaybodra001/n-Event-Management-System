import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/" element={user ? <Home /> : <Navigate to ={"/login"} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to ={"/"} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to ={"/"} />} />
        <Route path="/view" element={user ? <EventView /> : <Navigate to ={"/login"} />} />
        <Route path="/form"element={user ? <EventForm /> : <Navigate to ={"/login"} />} />
      </Routes>
      <Toaster />
    </Router>
    
  );
}

export default App;
