package pages.app

import geb.Page

class AuthorizationsPage extends Page {
  static at = { pageTitle.equals("Authorizations") }
  static url = "/authorizations"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeLink { $("#header .brand").click() }
  }
}
