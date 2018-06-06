#Snapcall IOS framework#

## Getting Started ##

    Add it with Cocoapod :
        pod 'snapcall_framework', :git => 'https://snapcall@bitbucket.org/seampl/framework_snapcall_ios.git'
    When asked write the password
    Cocoapod will properly add the framework with all the link. In some case you need to link the snapcall_framework.framework
    Set the use of bitcode to no (webrtc do not allow bitcode at this moment)
    Add capabilities for backgroud and voip
    Add plist security option for microphone use and camera use (Even if you don't use camera).
    Or Download the framework and add it as a framework to your IOS project, don't forget to set all the attribute and link in your target setting.

## OS/Hardware requirements ##
    Work on IOS 10 system (iphone >= 5 and tablet), but can target ios >= 8
    Created with Xcode 8.
    no bitcode.

## External Library ##
    -The WebRTC library
    -Starscream: Library for  Websocket connection

##Import##
    import Snapcall_Framework

##Public Class##
    Snapcall : class to manage the framework, launch and receive snapcall
    Snapcall_External_Parameter : class for custom attribute for snapcall
    Snapcall_Listerner : Protocol to get Information for the current call
##Use##
    Snapcall :
        public static func  getSnapcall()-> Snapcall
            Instantiate, if necessary and return a Snapcall instance
                Snapcall.getSnapcall()

        public static func  releaseSnapcall()
            Release the Static reference to snapcall
                Snapcall.releaseSnapcall()

        Static Configuration of snapcall - you should set it in your app delegate

          public static var AppName : String! = nil                           -> Title in the native call UI
          public static var preferredStatusBarStyle: UIStatusBarStyle! = nil  -> Status Bar style if configured View by view
          public static var ringtoneSound : String! = nil                     ->ringtone Sound for app to app call
          public static var callIconTemplate : Data! = nil                    ->Icon template for the native call UI


        final public func registerUser(token : String, identifier: String!,  customClientIdentifier : String!, applicationName :String,snapcallIdentifierCallBack : ((_ : String?)->Void)!) ->Bool
            Register or update an user for voip call application to application with the ios ios voip token.
            Before you should send to snapcall your voip certificat to allow us to wake up your application.
            If you use this fonctionality you should call this function at every launch of your application.
                Snapcall.getSnapcall().registerUser(
                    token :                     -> a IOs VOIP token to send a voip push token
                    identifier:                 -> the snapcall identifier for your user which can be used instead of a custom identifer
                    customClientIdentifier :    -> String to link your user with snapcall with a custom String identifier
                    applicationName             -> the name you register in snapcall back office linked with your certificat
                    snapcallIdentifierCallBack  -> reference to a function to had a callback on the succes of the function with the identifier as parameter
                )   ->Bool                      -> return true if succes before the async request

        final public func setUserActive(active : Bool , credential : PKPushCredentials, identifier: String!,  customClientIdentifier : String!, applicationName :String, snapcallCallBack : ((_ : Bool?)->Void)!) ->Bool

        Snapcall.getInstance().setUserActive(
          active                  -> boolean state of your user
          credential              -> credential of voip ios push
          identifier              -> the snapcall identifier
          customClientIdentifier  -> your custom client identifier
          applicationName         -> your app name with snapcall
          snapcallCallBack        -> calback for the succes of the request

          ) ->Bool                -> succes before the async request

        final public func launchCall(pushKitPayload : PKPushPayload! ,  parameter : Snapcall_External_Parameter!)
            Launch the call with a push payload after the application receive a voip push notification.
            Should be call in the application delegate function inherite from PushKit didReceiveIncomingPushWith
                Snapcall.getSnapcall().launchCall(
                    pushKitPayload :    -> push payload you receive
                    parameter :         -> the Snapcall_external_Parameter you want to use for the call
                )

        final public launchCall(bidId : String, snapcallIdentifier : String, parameter : Snapcall_External_Parameter!)
            Launch a Application to Application call with the snapcall identifier
                Snapcall.getSnapcall().launchCall(
                    bidId :                 -> your identifier for the call in the snapcall Back Office
                    snapcallIdentifier :    -> the snapcall identifier you get when you register an user
                    parameter :             -> the Snapcall_external_Parameter you want to use for the call
                )

        final public func launchCall(bidId : String,applicationName : String, customClientIdentifier : String, parameter : Snapcall_External_Parameter!)
            Lanch an Application to application call with your custom identifier
                Snapcall.getSnapcall().launchCall(
                    bidId :                     -> your identifier for the call in the snapcall Back Office
                    applicationName :           -> the name you register for your application
                    customClientIdentifier :    -> your custom identifier you register for an user
                    parameter :                 -> the Snapcall_external_Parameter you want to use for the call
                )

        final public func launchCall(bidId : String, sendClientMessage : ((_ : String)->Void)!, parameter : Snapcall_External_Parameter!)
            Launch an Application to Application call with a private push routing
                Snapcall.getSnapcall().launchCall(
                    bidId :             -> your identifier for the call in the snapcall Back Office
                    sendClientMessage : -> the function called when call is ready to proceed, the parameter is a json formated string in which there are the different parameter to pass in the payload to receive the call
                    parameter :         -> the Snapcall_external_Parameter you want to use for the call
                )

        final public func launchCall(bidId : String, parameter : Snapcall_External_Parameter!)
            Launch a classic snapcall
                Snapcall.getSnapcall().launchCall(
                    bidId :     -> your identifier for the call in the snapcall Back Office
                    parameter : -> the Snapcall_external_Parameter you want to use for the call
                )

        final public func restorCallUI()
            Function to retreive the user interface during a call
                Snapcall.getSnapcall().restorCallUI(
                )

        final public func requestPermission()
            Function to ask for the microphone permission
                Snapcall.getSnapcall().requestPermission(
                )


    Snapcall_External_Parameter
        Instantiate
            let parameter = Snapcall_External_Parameter()
        Members
          public var urlImage : String! = nil                     -> url of an image to use as background during the call
          public var nameImage : String! = nil                    -> Bundle name of an image to use as background during the call
          public var shouldReturn : Bool = false                  -> True if your user can come back in your app during the call (you must have implemented the listener to allow to return in call ui)
          public var callTitle :String! = nil                     -> Title to display in the call UI
          public var displayName : String! = nil                  -> Name to display in the call
          public var displayBrand : String! = nil                 -> Brand to display in the call
          public var senderName : String! = nil                   -> Name to display in the remote app for App to App call
          public var senderBrand : String! = nil                  -> Brand to display in the remote app for App to App call
          public var hideCart = false                             -> hide the cart logo
          public var textColor : UIColor! = nil                   -> color for the text in call ui
          public var fontDescriptor : UIFontDescriptor! = nil     -> font of the text in call ui
          public var SnapcallListener : Snapcall_Listener! = nil  -> Listener to have the call progress
          public var externalContext :  String! = nil             -> Context to push in Database during the call
          public var pushTransfertData : String! = nil            -> Context to transfert data during app to app call
          public var androidNotificationTitle : String! = nil     -> notification title when remote is an android device
          public var androidNotificatiobBody : String! = nil      -> notification body when remote is an android device

        Protocol Listener for the snapcall event

        method
            func onTimeUpdate(time : Int)   -> to get the current call time
            func onLeaveCallUI()            -> Event when user leave the call UI, you should implement a button to retrieve the call user interface
            func onCallEnd()                -> Event when the call End

##Other Information##

    Pushkit
        To receive call in app you should implement Voip Push. You need to register on apple website and request for a voip certificat and send us the .pem file you get from.
        in Your app delegate you should implement function to receive Push event and you should inherit from PKPushRegistryDelegate
            func voipRegistration() {
                let mainQueue = DispatchQueue.main
                    //Create a push registry object
                let voipRegistry: PKPushRegistry = PKPushRegistry(queue: mainQueue)
                    // Set the registry's delegate to self
                voipRegistry.delegate = self
                    // Set the push type to VoIP
                voipRegistry.desiredPushTypes = [PKPushType.voIP]
            }
        func pushRegistry(_ registry: PKPushRegistry, didInvalidatePushTokenFor type: PKPushType){}
        func pushRegistry(_ registry: PKPushRegistry, didUpdate credentials: PKPushCredentials, for type: PKPushType){}
        func pushRegistry(_ registry: PKPushRegistry, didReceiveIncomingPushWith payload: PKPushPayload, for type: PKPushType){}

    Callkit and Snapcall
        Snapcall work with the Callkit module to handle call.
        For that you should register capabilities for notification, and background audio.
        The snapcall will be handled by the IOs system in certain part like a classic gsm call
