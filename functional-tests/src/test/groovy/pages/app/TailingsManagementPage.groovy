package pages.app

import geb.Page
import modules.CommonLinkModule

class TailingsManagementPage extends Page {
  static at = { pageTitle.equals("Tailings management") }
  static url = "/tailings-management"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }

    BackToTopicsBtn { $("main").$(".content-links").$("a").has("span", text:"Back to Topics").click() }
  }
}
