import { ipcRenderer } from "electron";

import { DeviceType } from "@bitwarden/common/enums/device-type.enum";

import { BiometricMessage } from "../types/biometric-message";
import { isDev, isWindowsStore } from "../utils";

export default {
  versions: {
    app: (): Promise<string> => ipcRenderer.invoke("appVersion"),
  },
  deviceType: deviceType(),
  isDev: isDev(),
  isWindowsStore: isWindowsStore(),
  reloadProcess: () => ipcRenderer.send("reload-process"),

  biometric: (message: BiometricMessage): Promise<boolean | null> =>
    ipcRenderer.invoke("biometric", message),

  clipboardRead: (type?: "selection" | "clipboard"): Promise<string> =>
    ipcRenderer.invoke("clipboardRead", type),
  clipboardWrite: (text: string, type?: "selection" | "clipboard") =>
    ipcRenderer.invoke("clipboardWrite", { text, type }),
  launchUri: (uri: string) => ipcRenderer.invoke("launchUri", uri),
};

function deviceType(): DeviceType {
  switch (process.platform) {
    case "win32":
      return DeviceType.WindowsDesktop;
    case "darwin":
      return DeviceType.MacOsDesktop;
    default:
      return DeviceType.LinuxDesktop;
  }
}
