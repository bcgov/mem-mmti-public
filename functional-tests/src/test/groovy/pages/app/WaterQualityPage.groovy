package pages.app

import pages.base.BaseAppPage

class WaterQualityPage extends BaseAppPage {
  static at = { pageTitle.equals("Water Quality") }
  static url = "/water-quality"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }

    BackToTopicsBtn { $("main").$(".content-links").$("a").has("span", text:"Back to Topics") }
  }
}
