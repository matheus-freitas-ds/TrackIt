
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import Context from './contexts/Context';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import HistoricPage from './pages/HistoricPage/HistoricPage';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import TodayPage from './pages/TodayPage/TodayPage';

function App() {

  const [userInfo, setUserInfo] = useState({});
  const [config, setConfig] = useState({});
  const [habits, setHabits] = useState([]);
  const [addHabit, setAddHabit] = useState(false);
  const [todayHabits, setTodayHabits] = useState([]);
  const [progress, setProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);

  return (
    <Context.Provider value={{ userInfo , setUserInfo, config, setConfig, habits, setHabits, addHabit, setAddHabit, progress, setProgress, todayHabits, setTodayHabits }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
          <Route path="/habitos" element={<HabitsPage />} />
          <Route path="/hoje" element={<TodayPage />} />
          <Route path="/historico" element={<HistoricPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App