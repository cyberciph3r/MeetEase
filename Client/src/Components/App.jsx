import React from "react";
import Home from "./Home/Home";
import Create from "./Create/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserCalender from "./User/UserCalender";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MeetingConfirmed from "./MeetingConfirmed/MeetingConfirmed";
import Dashboard from "./Dashboard/Dashboard";
import UpdateMeeting from "./UpdateMeeting/UpdateMeeting";
import NotFound404 from "./NotFound404/NotFound404";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/join/:id" element={<UserCalender />} />
          <Route path="/booked" element={<MeetingConfirmed />} />
          <Route path="/editMeeting/:id" element={<UpdateMeeting />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
