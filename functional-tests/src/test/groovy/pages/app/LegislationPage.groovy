package pages.app

import pages.base.BaseAppPage

class LegislationPage extends BaseAppPage {
  static at = { pageTitle.equals("Legislation") }
  static url = "/legislation"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }

    EnvironmentalAssessmentActLearnMoreBtn { $("main").$("section").children("h4", text:"Environmental Assessment Act (Environmental Assessment Office)").parent().$("a").has("span", text:"Learn More") }
    MinesActLearnMoreBtn { $("main").$("section").children("h4", text:"Mines Act (Ministry of Energy, Mines, and Low Carbon Innovation)").parent().$("a").has("span", text:"Learn More") }
    EnvironmentalManagementActLearnMoreBtn { $("main").$("section").children("h4", text:"Environmental Management Act (Ministry of Environment and Climate Change Strategy)").parent().$("a").has("span", text:"Learn More") }
    TenureLearnMoreBtn { $("main").$("section").children("h4", text:"Tenure").parent().$("a").has("span", text:"Learn More") }
    LegislationAdministeredLearnMoreBtn { $("main").$("section").children("h4", text:"Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC").parent().$("a").has("span", text:"Learn More") }
  }
}
