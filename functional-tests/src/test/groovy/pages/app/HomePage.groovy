package pages.app

import geb.Page

class HomePage extends Page {
  static at = { pageTitle.startsWith("British Columbia Mine Information") && pageTitle.endsWith("BETA") }
  static url = ""
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeLink { $("#header .brand").click() }
    ViewListLink { $("app-root app-home .btn", 0).click() }
    ViewMapLink { $("app-root app-home .btn", 1).click() }

    LifecycleLearnMoreLink { $(".feature-block").has("h3", text:"The Mining Lifecycle").$("a").click() }
    TopicsOfInterestLearnMoreLink { $(".feature-block").has("h3", text:"Topics of Interest").$("a").click() }
    FindMinsInBCViewListLink { $(".feature-block").has("h3", text:"Find Mines in B.C.").$("a", 0).click() }
    FindMinsInBCViewMapLink { $(".feature-block").has("h3", text:"Find Mines in B.C.").$("a", 1).click() }

    LegislationLearnMoreLink { $(".feature-block").has("h3", text:"Legislation").$("a").click() }
    AuthorizationsLearnMoreLink { $(".feature-block").has("h3", text:"Authorizations").$("a").click() }
    ComplianceOversightLearnMoreLink { $(".feature-block").has("h3", text:"Compliance Oversight").$("a").click() }
  }
}
