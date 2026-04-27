import { useAuth } from '../../core/auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../core/firebase/firebaseConfig';
import { useTheme } from '../../core/theme/ThemeContext';

function Layout({ children }) {
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapılamadı:', error);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">sk-not-book-pre</Link>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/notes" className="hover:underline">Notlar</Link>
                <Link to="/settings" className="hover:underline">Ayarlar</Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}"
                >
                  Çıkış
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}">
                Giriş
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;