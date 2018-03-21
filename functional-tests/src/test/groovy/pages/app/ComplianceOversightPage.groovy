package pages.app

import pages.base.BaseAppPage

class ComplianceOversightPage extends BaseAppPage {
  static at = { pageTitle.equals("Compliance Oversight") }
  static url = "/compliance-oversight"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
  }
}
