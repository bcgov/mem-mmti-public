package pages.app

import geb.Page

import modules.CommonLinkModule

class LegislationPage extends Page {
  static at = { pageTitle.equals("Legislation") }
  static url = "/legislation"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }

    EnvironmentalAssessmentActLearnMoreBtn { $("main").$("section").children("h4", text:"Environmental Assessment Act (Environmental Assessment Office)").parent().$("a").has("span", text:"Learn More").click() }
    MinesActLearnMoreBtn { $("main").$("section").children("h4", text:"Mines Act (Ministry of Energy, Mines and Petroleum Resources)").parent().$("a").has("span", text:"Learn More").click() }
    EnvironmentalManagementActLearnMoreBtn { $("main").$("section").children("h4", text:"Environmental Management Act (Ministry of Environment and Climate Change Strategy)").parent().$("a").has("span", text:"Learn More").click() }
    TenureLearnMoreBtn { $("main").$("section").children("h4", text:"Tenure").parent().$("a").has("span", text:"Learn More").click() }
    LegislationAdministeredLearnMoreBtn { $("main").$("section").children("h4", text:"Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC").parent().$("a").has("span", text:"Learn More").click() }
  }
}
