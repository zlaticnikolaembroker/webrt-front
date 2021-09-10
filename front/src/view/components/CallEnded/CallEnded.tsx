import React from "react";

const CallEnded = () => {
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
            <h1>
                Call ended
            </h1>
            <h3>Thank you for using our application!</h3>
            <h3>
                You can <a href="/meeting">join another meeting</a> or{" "}
                <a href="/home">go to home page.</a>.
            </h3>
        </div>
    );
};

export default CallEnded;
