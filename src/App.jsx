import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './core/auth/AuthContext';
import { ThemeProvider } from './core/theme/ThemeContext';
import Layout from './shared/components/Layout';
import Home from './features/dashboard/Home';
import Notes from './features/notes/Notes';
import Settings from './features/settings/Settings';
import Login from './features/auth/Login';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;