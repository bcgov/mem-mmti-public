package pages.app

import geb.Page
import modules.CommonLinkModule

class ContactPage extends Page {
  static at = { pageTitle.equals("Connect With Us") }
  static url = "/contact"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }
  }
}
