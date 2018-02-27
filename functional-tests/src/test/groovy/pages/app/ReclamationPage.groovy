package pages.app

import geb.Page
import modules.CommonLinkModule

class ReclamationPage extends Page {
  static at = { pageTitle.equals("Reclamation") }
  static url = "/reclamation"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }

    BackToTopicsBtn { $("main").$(".content-links").$("a").has("span", text:"Back to Topics").click() }
  }
}
