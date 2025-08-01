import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import AuthGuard from "./lib/guards/AuthGuard";
import SignUpPage from "./pages/auth/signup";
import LoginPage from "./pages/auth/login";

import "./App.css";
import Profile from "./pages/Profile/Profile";
import DiagnosticTestHome from "./pages/diagnostic-test/DiagnosticTestHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          key="dashboard"
          path="/dashboard"
          element={<AuthGuard component={<Dashboard />} />}
        >
          <Route path="profile/:id" element={<Profile />} />
          <Route path="diagnostics" element={<DiagnosticTestHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
