import React from "react";
import { mount, redirect, route } from "navi";
import Meeting from "../components/Meeting/Meeting";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import CallEnded from "../components/CallEnded/CallEnded";

const routes = mount({
  "/": redirect("/home"),
  "/home": route({ view: <Home /> }),
  "/meeting": route({ view: <Meeting /> }),
  "/register": route({ view: <Register /> }),
  "/login": route({ view: <Login /> }),
  "/update-profile": route({ view: <UpdateProfile /> }),
  "/call-ended": route({view: <CallEnded />})
});

export default routes;
