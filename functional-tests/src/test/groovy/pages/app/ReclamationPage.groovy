package pages.app

import pages.base.BaseAppPage

class ReclamationPage extends BaseAppPage {
  static at = { pageTitle.equals("Reclamation") }
  static url = "/reclamation"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }

    BackToTopicsBtn { $("main").$(".content-links").$("a").has("span", text:"Back to Topics") }
  }
}
