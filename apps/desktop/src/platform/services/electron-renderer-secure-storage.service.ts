import { AbstractStorageService } from "@bitwarden/common/platform/abstractions/storage.service";
import { StorageOptions } from "@bitwarden/common/platform/models/domain/storage-options";

export class ElectronRendererSecureStorageService implements AbstractStorageService {
  async get<T>(key: string, options?: StorageOptions): Promise<T> {
    const val = await ipc.platform.keytar("getPassword", key, options?.keySuffix ?? "");
    return val != null ? (JSON.parse(val) as T) : null;
  }

  async has(key: string, options?: StorageOptions): Promise<boolean> {
    const val = await ipc.platform.keytar("hasPassword", key, options?.keySuffix ?? "");
    return !!val;
  }

  async save(key: string, obj: any, options?: StorageOptions): Promise<any> {
    await ipc.platform.keytar("setPassword", key, options?.keySuffix ?? "", JSON.stringify(obj));
  }

  async remove(key: string, options?: StorageOptions): Promise<any> {
    await ipc.platform.keytar("deletePassword", key, options?.keySuffix ?? "");
  }
}
