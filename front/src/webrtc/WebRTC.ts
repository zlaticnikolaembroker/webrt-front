const getConnectedDevices = (type: MediaDeviceKind, callback: (input: MediaDeviceInfo[]) => void) => {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
        });
}

export default getConnectedDevices;