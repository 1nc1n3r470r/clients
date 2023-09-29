import { ipcRenderer } from "electron";

import { DeviceType } from "@bitwarden/common/enums/device-type.enum";

import { isDev, isWindowsStore } from "../utils";

export default {
  versions: {
    app: (): Promise<string> => ipcRenderer.invoke("appVersion"),
  },
  deviceType: deviceType(),
  isDev: isDev(),
  isWindowsStore: isWindowsStore(),
  reloadProcess: () => ipcRenderer.send("reload-process"),

  storageService: <T>(
    action: "get" | "has" | "save" | "remove",
    key: string,
    obj?: any
  ): Promise<T> => ipcRenderer.invoke("storageService", { action, key, obj }),
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
