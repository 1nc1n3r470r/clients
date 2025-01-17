import { DuoUi } from "./duo-ui";
import { OobResult } from "./oob-result";
import { OtpResult } from "./otp-result";

export abstract class Ui extends DuoUi {
  // To cancel return OtpResult.Cancel, otherwise only valid data is expected.
  provideGoogleAuthPasscode: () => OtpResult;
  provideMicrosoftAuthPasscode: () => OtpResult;
  provideYubikeyPasscode: () => OtpResult;

  /*
  The UI implementations should provide the following possibilities for the user:
  
  1. Cancel. Return OobResult.Cancel to cancel.
  
  2. Go through with the out-of-band authentication where a third party app is used to approve or decline
      the action. In this case return OobResult.waitForApproval(rememberMe). The UI should return as soon
      as possible to allow the library to continue polling the service. Even though it's possible to return
      control to the library only after the user performed the out-of-band action, it's not necessary. It
      could be also done sooner.
  
  3. Allow the user to provide the passcode manually. All supported OOB methods allow to enter the
      passcode instead of performing an action in the app. In this case the UI should return
      OobResult.continueWithPasscode(passcode, rememberMe).
  */
  approveLastPassAuth: () => OobResult;
  approveDuo: () => OobResult;
  approveSalesforceAuth: () => OobResult;
}
