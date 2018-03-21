package modules

import geb.Module

/**
 * Contains objects and methods for interacting with the global footer bar.
 */
class FooterModule extends Module {
  static content = {
    FindProjectsByListLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"FIND MINES IN BRITISH COLUMBIA").$("a", text:"Find Projects by List") }
    FindProjectsByMapLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"FIND MINES IN BRITISH COLUMBIA").$("a", text:"Find Projects by Map") }

    TheMiningLifecycleLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"MINING IN BRITISH COLUMBIA").$("a", text:"The Mining Lifecycle") }
    TopicsOfInterstLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"MINING IN BRITISH COLUMBIA").$("a", text:"Topics of Interest") }
    FindMinesInBCLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"MINING IN BRITISH COLUMBIA").$("a", text:"Find Mines in BC") }

    LegislationLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"OUR PROCESSES & PROCEDURES").$("a", text:"Legislation") }
    AuthorizationsLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"OUR PROCESSES & PROCEDURES").$("a", text:"Authorizations") }
    ComplianceOversightLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"OUR PROCESSES & PROCEDURES").$("a", text:"Compliance Oversight") }

    SubmitFeedbackBtn { $(".app-footer").$("section").has("h4", text:"Connect With Us").$("a").has("span", text:"SUBMIT FEEDBACK") }

    HomeLink { $(".footer-admin .gov-links").$("a", text:"Home") }
    CopyrightLink { $(".footer-admin .gov-links").$("a", text:"Copyright") }
    DisclaimerLink { $(".footer-admin .gov-links").$("a", text:"Disclaimer") }
    PrivacyLink { $(".footer-admin .gov-links").$("a", text:"Privacy") }
    AccessibilityLink{ $(".footer-admin .gov-links").$("a", text:"Accessibility") }

    FacebookBtn { $(".footer-admin .connect-links .fb-share-button") }
    TwitterBtn { $(".footer-admin .connect-links .twitter-share-button") }
    GooglePlusBtn { $(".footer-admin .connect-links").$("img", alt:"Share on Google+") }
  }
}
