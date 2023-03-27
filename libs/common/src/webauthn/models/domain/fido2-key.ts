import { Jsonify } from "type-fest";

import Domain from "../../../models/domain/domain-base";
import { EncString } from "../../../models/domain/enc-string";
import { SymmetricCryptoKey } from "../../../models/domain/symmetric-crypto-key";
import { Fido2KeyData } from "../data/fido2-key.data";
import { Fido2KeyView } from "../view/fido2-key.view";

export class Fido2Key extends Domain {
  keyType: EncString;
  keyAlgorithm: EncString;
  keyCurve: EncString;
  keyValue: EncString;
  rpId: EncString;
  userHandle: EncString;

  // Extras
  rpName: EncString;
  userName: EncString;
  origin: EncString;

  constructor(obj?: Fido2KeyData) {
    super();
    if (obj == null) {
      return;
    }

    this.buildDomainModel(
      this,
      obj,
      {
        keyType: null,
        keyAlgorithm: null,
        keyCurve: null,
        keyValue: null,
        rpId: null,
        userHandle: null,
        rpName: null,
        userName: null,
        origin: null,
      },
      []
    );
  }

  decrypt(orgId: string, encKey?: SymmetricCryptoKey): Promise<Fido2KeyView> {
    return this.decryptObj(
      new Fido2KeyView(),
      {
        keyType: null,
        keyAlgorithm: null,
        keyCurve: null,
        keyValue: null,
        rpId: null,
        userHandle: null,
        rpName: null,
        userName: null,
        origin: null,
      },
      orgId,
      encKey
    );
  }

  toFido2KeyData(): Fido2KeyData {
    const i = new Fido2KeyData();
    this.buildDataModel(this, i, {
      keyType: null,
      keyAlgorithm: null,
      keyCurve: null,
      keyValue: null,
      rpId: null,
      userHandle: null,
      rpName: null,
      userName: null,
      origin: null,
    });
    return i;
  }

  static fromJSON(obj: Jsonify<Fido2Key>): Fido2Key {
    if (obj == null) {
      return null;
    }

    const keyType = EncString.fromJSON(obj.keyType);
    const keyAlgorithm = EncString.fromJSON(obj.keyAlgorithm);
    const keyCurve = EncString.fromJSON(obj.keyCurve);
    const keyValue = EncString.fromJSON(obj.keyValue);
    const rpId = EncString.fromJSON(obj.rpId);
    const userHandle = EncString.fromJSON(obj.userHandle);
    const rpName = EncString.fromJSON(obj.rpName);
    const userName = EncString.fromJSON(obj.userName);
    const origin = EncString.fromJSON(obj.origin);

    return Object.assign(new Fido2Key(), obj, {
      keyType,
      keyAlgorithm,
      keyCurve,
      keyValue,
      rpId,
      userHandle,
      rpName,
      userName,
      origin,
    });
  }
}
