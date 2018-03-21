package pages.app

import pages.base.BaseAppPage

class TopicsOfInterestPage extends BaseAppPage {
  static at = { pageTitle.equals("Topics of Interest") }
  static url = "/topics-of-interest"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }

    WaterQualityReadMoreBtn { $("main").$("section").has("h3", text:"Water Quality").$("a").has("span", text:"Read More") }
    TailingsManagementReadMoreBtn { $("main").$("section").has("h3", text:"Tailings Management").$("a").has("span", text:"Read More") }
    ReclamationReadMoreBtn { $("main").$("section").has("h3", text:"Reclamation").$("a").has("span", text:"Read More") }
  }
}
