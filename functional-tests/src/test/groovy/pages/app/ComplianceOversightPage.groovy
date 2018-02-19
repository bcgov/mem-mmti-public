package pages.app

import geb.Page

class ComplianceOversightPage extends Page {
  static at = { pageTitle.equals("Compliance Oversight") }
  static url = "/compliance-oversight"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeLink { $("#header .brand").click() }
  }
}
