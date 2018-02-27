package pages.app

import modules.HeaderModule

import geb.Page

class HomePage extends Page {
  static at = { pageTitle.startsWith("British Columbia Mine Information") && pageTitle.endsWith("BETA") }
  static url = ""
  static content = {
    header { module(HeaderModule) }

    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }
    ViewListBtn { $("app-root app-home .btn", 0).click() }
    ViewMapBtn { $("app-root app-home .btn", 1).click() }

    LifecycleLearnMoreBtn { $(".feature-block").has("h3", text:"The Mining Lifecycle").$("a").click() }
    TopicsOfInterestLearnMoreBtn { $(".feature-block").has("h3", text:"Topics of Interest").$("a").click() }
    FindMinsInBCViewListBtn { $(".feature-block").has("h3", text:"Find Mines in B.C.").$("a", 0).click() }
    FindMinsInBCViewMapBtn { $(".feature-block").has("h3", text:"Find Mines in B.C.").$("a", 1).click() }

    LegislationLearnMoreBtn { $(".feature-block").has("h3", text:"Legislation").$("a").click() }
    AuthorizationsLearnMoreBtn { $(".feature-block").has("h3", text:"Authorizations").$("a").click() }
    ComplianceOversightLearnMoreBtn { $(".feature-block").has("h3", text:"Compliance Oversight").$("a").click() }

    FindProjectsByListLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"FIND MINES IN BRITISH COLUMBIA").$("a", text:"Find Projects by List").click() }
    FindProjectsByMapLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"FIND MINES IN BRITISH COLUMBIA").$("a", text:"Find Projects by Map").click() }

    TheMiningLifecycleLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"MINING IN BRITISH COLUMBIA").$("a", text:"The Mining Lifecycle").click() }
    TopicsOfInterstLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"MINING IN BRITISH COLUMBIA").$("a", text:"Topics of Interest").click() }
    FindMinesInBCLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"MINING IN BRITISH COLUMBIA").$("a", text:"Find Mines in BC").click() }

    LegislationLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"OUR PROCESSES & PROCEDURES").$("a", text:"Legislation").click() }
    AuthorizationsLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"OUR PROCESSES & PROCEDURES").$("a", text:"Authorizations").click() }
    ComplianceOversightLink { $(".app-footer").$("section").has("h4", text:"Navigate").has("h5", text:"OUR PROCESSES & PROCEDURES").$("a", text:"Compliance Oversight").click() }

    SubmitFeedbackBtn { $(".app-footer").$("section").has("h4", text:"Connect With Us").$("a").has("span", text:"SUBMIT FEEDBACK").click() }

    HomeLink { $(".footer-admin .gov-links").$("a", text:"Home").click() }
    CopyrightLink { $(".footer-admin .gov-links").$("a", text:"Copyright").click() }
    DisclaimerLink { $(".footer-admin .gov-links").$("a", text:"Disclaimer").click() }
    PrivacyLink { $(".footer-admin .gov-links").$("a", text:"Privacy").click() }
    AccessibilityLink{ $(".footer-admin .gov-links").$("a", text:"Accessibility").click() }

    FacebookBtn { $(".footer-admin .connect-links .fb-share-button").click() }
    TwitterBtn { $(".footer-admin .connect-links .twitter-share-button").click() }
    GooglePlusBtn { $(".footer-admin .connect-links").$("img", alt:"Share on Google+").click() }
  }
}
