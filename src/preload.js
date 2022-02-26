import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    ipcApi: {
        askForFileToBeServed(desiredPath) {
            const theId = ipcRenderer.invoke("serveFile", desiredPath);
            return theId;
        },
    },
    batteryApi: {},
    fileApi: {},
});
