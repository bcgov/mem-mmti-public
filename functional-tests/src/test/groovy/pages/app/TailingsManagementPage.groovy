package pages.app

import pages.base.BaseAppPage

class TailingsManagementPage extends BaseAppPage {
  static at = { pageTitle.equals("Tailings management") }
  static url = "/tailings-management"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }

    BackToTopicsBtn { $("main").$(".content-links").$("a").has("span", text:"Back to Topics") }
  }
}
