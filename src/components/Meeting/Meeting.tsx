import React, { useMemo } from "react";
import {
  LocalStorage,
  USERNAME_FIELD_NAME,
} from "../../localstorage/LocalStorage";

export interface MeetingProps {
  meetingId?: string;
}

const Meeting = ({ meetingId }: MeetingProps) => {
  const userName = useMemo(() => {
    return LocalStorage.getFromLocalStorage(USERNAME_FIELD_NAME);
  }, []);

  if (!meetingId) {
    return <div>Invalid meeting id value.</div>;
  }

  return (
    <div>
      Welcome {userName}. Meeting with id {meetingId}
    </div>
  );
};

export default Meeting;
