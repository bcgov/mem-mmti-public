package pages.app

import pages.base.BaseAppPage

class AuthorizationsPage extends BaseAppPage {
  static at = { pageTitle.equals("Authorizations") }
  static url = "/authorizations"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
  }
}
