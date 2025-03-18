import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Galleries from "./pages/Galleries";
import GalleryDetail from "./pages/GalleryDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import UserProfile from './components/UserProfile';
import { AuthProvider } from './context/AuthContext.jsx';

function AppContent() {
  const location = useLocation();

  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <AuthProvider>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/galleries/:id" element={<GalleryDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
      <AppContent />
  );
}

export default App;