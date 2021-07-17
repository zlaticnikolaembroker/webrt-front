import React from "react";
import { mount, redirect, route } from "navi";
import JoinMeeting from "../components/JoinMeeting/JoinMeeting";
import CreateMeeting from "../components/CreateMeeting/CreateMeeting";
import Meeting from "../components/Meeting/Meeting";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";

const routes = mount({
  "/": redirect("/home"),
  "/home": route({ view: <h1>Home</h1> }),
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
});

export default routes;
