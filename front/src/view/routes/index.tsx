import React from "react";
import { mount, redirect, route } from "navi";
import JoinMeeting from "../components/JoinMeeting/JoinMeeting";
import CreateMeeting from "../components/CreateMeeting/CreateMeeting";
import Meeting from "../components/Meeting/Meeting";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";

const routes = mount({
  "/": redirect("/home"),
  "/home": route({ view: <Home /> }),
  "/join-meeting": route({ view: <JoinMeeting /> }),
  "/create-meeting": route({ view: <CreateMeeting /> }),
  "/meeting/:id": route((request) => {
    const id = request.params.id;
    return {
      view: <Meeting meetingId={id} />,
    };
  }),
  "/register": route({ view: <Register /> }),
  "/login": route({ view: <Login /> }),
  "/update-profile": route({ view: <UpdateProfile /> }),
});

export default routes;
