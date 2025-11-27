import React, { useEffect, useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Login from './components/Login';
import Join from './components/Join'; // Join으로 변경
import Feed from './components/Feed';
import FeedView from './components/FeedView';
// import Register from './components/Register';
import MyPage from './components/MyPage';
// import Menu from './components/Menu'; // Menu로 변경

import LeftBar from './components/LeftSidebar';
import RightBar from "./components/RightSidebar";
import Main from './components/MainPage';
import Setting from './components/Setting';
import Notice from './components/Notice';

import { getTheme } from './theme';
import { ThemeModeProvider, ThemeModeContext } from './components/context/ThemeContext';


function AppContent() {
  const location = useLocation();
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const { mode } = useContext(ThemeModeContext);
  const theme = getTheme(mode);

  const isAuthPage = location.pathname === '/' || location.pathname === '/join';
  const withoutSet = location.pathname === '/set';
  const withoutSearch = location.pathname === '/search';

  useEffect(() => {
    if (!isAuthPage && !token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [isAuthPage, token, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* {!isAuthPage && <Menu />}  */}
          {/* 로그인과 회원가입 페이지가 아닐 때만 Menu 렌더링 */}
        {!isAuthPage && <LeftBar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:userId/:feedId" element={<FeedView />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/profile" element={<MyPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/notice" element={<Notice />} />
          </Routes>
        </Box>
        {(!isAuthPage && !withoutSet && !withoutSearch) && <RightBar />}
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}
