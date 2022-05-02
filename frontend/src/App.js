import './App.css';
import Home from './components/pages/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import NewAccount from './components/pages/Account/NewAccounts/NewAccount';
import Login from './components/pages/Account/Logins/Login';
import { selectLogin } from './Redux/Slices/userSlice';
import { useSelector } from 'react-redux';
import Profile from './components/Main/Profile/Profile';
import Friends from './components/Friends/Friends';
import Header from './components/Headers/Header';
import Watch from './components/Watchs/Watch';

function App() {
  const userselect = useSelector(selectLogin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userselect ? <Home /> : <Login />} />
        <Route path="/newacount" element={<NewAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/friends" element={<><Header /> <Friends /> </>} />
        <Route path="/watchs/*" element={<><Header /> < Watch /> </>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
