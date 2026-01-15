import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/auth', '/contact', '/profile', '/user-orders', '/reset-password', '/'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <ToastContainer />
      {showNavbar && <Navigation />}
      <main className={showNavbar ? (isHomePage ? "pt-20" : "py-3 pt-20") : (isHomePage ? "" : "py-3")} style={isHomePage ? { height: 'auto', minHeight: 'auto' } : {}}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;