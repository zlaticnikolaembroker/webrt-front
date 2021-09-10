import React, {LegacyRef, useEffect, useMemo, useRef, useState} from "react";
import {
    LocalStorage,
    USERNAME_FIELD_NAME,
} from "../../../localstorage/LocalStorage";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import {CopyToClipboard} from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./Meeting.css"
import {useNavigation} from "react-navi";

const socket = io.io('http://localhost:5000')

const Meeting = () => {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState<MediaStream>()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    const navigation = useNavigation();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
            setStream(stream)
            // @ts-ignore
            myVideo.current.srcObject = stream
        })

        socket.on("me", (id: string) => {
            setMe(id)
        })

        socket.on("callUser", (data: any) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id: string) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        // @ts-ignore
        connectionRef.current = peer

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {
            // @ts-ignore
            userVideo.current.srcObject = stream
        })

        peer.on("end", () => {
            setCallEnded(true);
        })

        socket.on("callAccepted", (data: any) => {
            setCallAccepted(true)
            setCaller(data.answeredName);
            peer.signal(data.signal)
        })

        socket.on("callEnded", () => {
            setCallEnded(true)
            // @ts-ignore
            connectionRef.current.destroy()
            navigation.navigate(`/call-ended`);
        })
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        // @ts-ignore
        connectionRef.current = peer

        peer.on("signal", (data) => {
            socket.emit("answerCall", {signal: data, to: caller, answeredName: name})
        })
        peer.on("stream", (stream) => {
            // @ts-ignore
            userVideo.current.srcObject = stream
        })
        socket.on("callEnded", () => {
            setCallEnded(true)
            // @ts-ignore
            connectionRef.current.destroy()
            navigation.navigate(`/call-ended`);
        })

        // @ts-ignore
        peer.signal(callerSignal)
    }

    const leaveCall = () => {
        setCallEnded(true)
        // @ts-ignore
        connectionRef.current.destroy()
        socket.emit("callEnded", {
            userToNotify: idToCall,
        })
        navigation.navigate(`/call-ended`);
    }

    const userName = useMemo(() => {
        return LocalStorage.getFromLocalStorage(USERNAME_FIELD_NAME);
    }, []);

    useEffect(() => {
        if (userName) {
            setName(userName);
        }
    }, [userName])

    return (
        <div>
            <div className="container">
                <div className="video-container">
                    <div className="video">
                        {stream &&
                        <React.Fragment>
                            <video playsInline muted ref={myVideo as unknown as LegacyRef<HTMLVideoElement>} autoPlay
                                   style={{width: "300px"}}/>
                            <h3>{name}</h3>
                        </React.Fragment>}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ? <>
                                <video playsInline ref={userVideo as unknown as LegacyRef<HTMLVideoElement>} autoPlay
                                       style={{width: "300px"}}/>
                                <h3>{name}</h3>
                            </> :
                            null}
                    </div>

                </div>
                <div className="myId">
                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{marginBottom: "20px"}}
                    />
                    <CopyToClipboard text={me}>
                        <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large"/>}>
                            Copy ID
                        </Button>
                    </CopyToClipboard>

                    <TextField
                        id="filled-basic"
                        label="ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </Button>
                        ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                <PhoneIcon fontSize="large"/>
                            </IconButton>
                        )}
                        {idToCall}
                    </div>
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1>{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Meeting;
