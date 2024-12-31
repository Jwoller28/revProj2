import React from 'react';
import './App.css';
import UserManagement from './Components/UserLogin/UserManagement';
import { AuthProvider } from './Components/UserContext/UserContext';
import { EventsProvider } from './Components/EventsContext/EventsContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration/UserRegistration';

import ProgressPage from './ProgressPage';
import InputPage from './InputPage';
import CalendarPage from './CalendarPage';
import DayView from './DayView';
import WeekView from './WeekView';
import SetUserGoals from './Components/SetUserGoals/SetUserGoals';
import PostFeedSmart from './Components/PostFeed/PostFeedSmart';
import Inbox from './Components/Inbox/Inbox';
import LoginLandingPage from './Components/UserLogin/LoginLandingPage';
import NutritionApi from './Components/NutritionApi/NutritionApi';
import RouteGuard from './Components/RouteGuard/RouteGuard';

function App() {
  return (
    <div className="App">
      <AuthProvider>

        <EventsProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<UserManagement />}></Route>
            <Route path="/register" element={<UserRegistration />}></Route>
            
            <Route path="/goals" element={
                <SetUserGoals />
              }></Route>
            <Route path="/login/page" element={
              <RouteGuard>
                <LoginLandingPage />
              </RouteGuard>
              }></Route>

            <Route path="/calendar" element={
              <RouteGuard>
                <CalendarPage />
              </RouteGuard>} />

            <Route path="/week" element={
              <RouteGuard>
                <WeekView />
              </RouteGuard>} />

            <Route path="/day/:dayId" element={
              <RouteGuard>
                <DayView />
              </RouteGuard>} />

            <Route path="/input/:dayId" element={
              <RouteGuard>
                <InputPage />
              </RouteGuard>} />

            <Route path="/progress/:dayId" element={
              <RouteGuard>
                <ProgressPage />
              </RouteGuard>} />

            <Route path="/nutriapi" element={
              <RouteGuard>
                <NutritionApi />
              </RouteGuard>
              }></Route>

	      <Route path="/feed" element={<PostFeedSmart />} />
	      <Route path="/inbox" element={<Inbox />}/>

          </Routes>
        </EventsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;