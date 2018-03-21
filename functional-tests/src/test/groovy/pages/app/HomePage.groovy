package pages.app

import pages.base.BaseAppPage

class HomePage extends BaseAppPage {
  static at = { pageTitle.startsWith("British Columbia Mine Information") && pageTitle.endsWith("BETA") }
  static url = ""
  static content = {
    header { module(HeaderModule) }

    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
    ViewListBtn { $("app-root app-home .btn", 0) }
    ViewMapBtn { $("app-root app-home .btn", 1) }

    LifecycleLearnMoreBtn { $(".feature-block").has("h3", text:"The Mining Lifecycle").$("a") }
    TopicsOfInterestLearnMoreBtn { $(".feature-block").has("h3", text:"Topics of Interest").$("a") }
    FindMinsInBCViewListBtn { $(".feature-block").has("h3", text:"Find Mines in B.C.").$("a", 0) }
    FindMinsInBCViewMapBtn { $(".feature-block").has("h3", text:"Find Mines in B.C.").$("a", 1) }

    LegislationLearnMoreBtn { $(".feature-block").has("h3", text:"Legislation").$("a") }
    AuthorizationsLearnMoreBtn { $(".feature-block").has("h3", text:"Authorizations").$("a") }
    ComplianceOversightLearnMoreBtn { $(".feature-block").has("h3", text:"Compliance Oversight").$("a") }
  }
}
