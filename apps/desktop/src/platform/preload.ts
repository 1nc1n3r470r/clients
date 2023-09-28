import { ipcRenderer } from "electron";

import { DeviceType } from "@bitwarden/common/enums/device-type.enum";
import { EncString } from "@bitwarden/common/platform/models/domain/enc-string";

import {
  EncryptedMessageResponse,
  LegacyMessageWrapper,
  Message,
  UnencryptedMessageResponse,
} from "../models/native-messaging";
import { isDev, isWindowsStore } from "../utils";

export default {
  versions: {
    app: (): Promise<string> => ipcRenderer.invoke("appVersion"),
  },
  deviceType: deviceType(),
  isDev: isDev(),
  isWindowsStore: isWindowsStore(),
  reloadProcess: () => ipcRenderer.send("reload-process"),

  sendNativeMessagingReply: (
    message:
      | EncryptedMessageResponse
      | UnencryptedMessageResponse
      | { appId: string; command?: string; sharedSecret?: string; message?: EncString }
  ) => {
    ipcRenderer.send("nativeMessagingReply", message);
  },
  onNativeMessaging: (callback: (message: LegacyMessageWrapper | Message) => void) => {
    ipcRenderer.on("nativeMessaging", (_event, message: any) => callback(message));
  },
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
