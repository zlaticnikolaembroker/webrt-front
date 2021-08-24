import React, { useMemo } from "react";
import {
  LocalStorage,
  USERNAME_FIELD_NAME,
} from "../../../localstorage/LocalStorage";
import getConnectedDevices from "../../../webrtc/WebRTC";

export interface MeetingProps {
  meetingId?: string;
}

const Meeting = ({ meetingId }: MeetingProps) => {
  getConnectedDevices("videoinput", (result: MediaDeviceInfo[]) => {
    console.log("videoinput");
    console.log(result);
  });

  getConnectedDevices("audioinput", (result: MediaDeviceInfo[]) => {
    console.log("audioinput");
    console.log(result);
  });

  getConnectedDevices("audiooutput", (result: MediaDeviceInfo[]) => {
    console.log("audiooutput");
    console.log(result);
  });

  const userName = useMemo(() => {
    return LocalStorage.getFromLocalStorage(USERNAME_FIELD_NAME);
  }, []);

  if (!meetingId || !meetingId.replaceAll(" ", "").match(/^[0-9]+$/)) {
    return <div>Invalid meeting id value.</div>;
  }

  return (
    <div>
      Welcome {userName}. Meeting with id {meetingId}
    </div>
  );
};

export default Meeting;
