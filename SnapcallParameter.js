/**
    class with the differente parameter to configure the call UI and the data you send.
* */
export class SnapcallParameter {
  constructor() {
    this.showBackButton = false;
    this.displayBrand = null; // brand to display on the call UI
    this.displayName = null; // name to display on the call UI
    this.callTitle = null; // tittle on the call UI
    this.android_AssetPathImage = null;
    this.android_AssetPathFont = null;
    this.iOS_AssetPathImage = null;
    this.iOS_AssetPathFont = null;
    this.notificationTittle = null; // title of the notification when the push is used
    this.notificationBody = null; // body of the notification when the push is used
    // context to send in order to save information,
    // you can get it back via API and the call identifier or the number on your phone.
    this.externalContext = null;
    this.urlImage = null; // Url for an image under the call title;
    this.textColor = null; // color of the text in the call ui
    this.backgroundColor = null; // color of the background in the call ui
    // If app to app call the data to transfert directly to the other application
    this.pushTransfertData = null;
    this.senderBrand = null; // if app to app call the brand to send to the other application
    this.senderName = null; // if app to app call the name to send to the other application
    this.video = null; // activate video
    // boolean if false your user will not be able to navigate on your app during the call
    this.shouldReturn = false;
    this.androidResimage = null; // image name in your res folder without extension.
    this.userInterfaceProperty = new UserInterfaceProps();
  }
}

export class UserInterfaceProps {
  constructor() {
    this.backgroundColor = null; // #FFFFFFFF used by Color.parseColor
    this.actionBarColor = null;
    this.iconColor = { background: null, color: null };
    this.hangup = { background: null, color: null };
    this.back = { background: null, color: null };
    this.refuse = { background: null, color: null };
    this.answer = { background: null, color: null };
    this.boldTextColor = null;
    this.smallTextColor = null;
    this.appPortraitBackgroundColor = null;
    this.colorTextState = null;
    this.nameLabelText = null;
    this.appLabelText = null;
    this.appLogo = { url: null, path: null, package: null, filename: null };
    this.userPortrait = { url: null, path: null, package: null, filename: null };
    this.appLogoIOS = null;
    this.userPortraitIOS = null;
    this.shouldBackIOS = null;
    this.useBlurIOS = null;
  }
}