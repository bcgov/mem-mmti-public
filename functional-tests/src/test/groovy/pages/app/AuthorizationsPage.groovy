package pages.app

import geb.Page
import modules.CommonLinkModule

class AuthorizationsPage extends Page {
  static at = { pageTitle.equals("Authorizations") }
  static url = "/authorizations"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }
  }
}
