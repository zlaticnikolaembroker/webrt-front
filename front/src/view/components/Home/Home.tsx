import React, { useMemo } from "react";
import {
  LocalStorage,
  USERNAME_FIELD_NAME,
  USER_ID_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

const Home = () => {
  const userId = useMemo(() => {
    return LocalStorage.getFromLocalStorage(USER_ID_FIELD_NAME);
  }, []);
  const username = useMemo(() => {
    return LocalStorage.getFromLocalStorage(USERNAME_FIELD_NAME);
  }, []);

  return (
    <div
      style={{
        alignContent: "center",
        margin: "auto",
        marginTop: "50px",
        height: "50%",
        width: "40%",
        backgroundColor: "burlywood",
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "50px",
        paddingRight: "50px",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>WELCOME! {userId && username ? username : null}</h1>
      <h2>This is a free application for online meetings.</h2>
      <h3>
        You can <a href="/meeting">join a meeting</a>.
      </h3>
      {!userId ? (
        <h3>
          For easier application usage you can{" "}
          <a href="/register">register an account</a>, or if you already have an
          account you can <a href="/login">login</a>.
        </h3>
      ) : null}
    </div>
  );
};

export default Home;
