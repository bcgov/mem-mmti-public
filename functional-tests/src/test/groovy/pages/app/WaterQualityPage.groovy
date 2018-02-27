package pages.app

import geb.Page
import modules.CommonLinkModule

class WaterQualityPage extends Page {
  static at = { pageTitle.equals("Water Quality") }
  static url = "/water-quality"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }

    BackToTopicsBtn { $("main").$(".content-links").$("a").has("span", text:"Back to Topics").click() }
  }
}
