package pages.app

import geb.Page
import modules.CommonLinkModule

class ComplianceOversightPage extends Page {
  static at = { pageTitle.equals("Compliance Oversight") }
  static url = "/compliance-oversight"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }
  }
}
