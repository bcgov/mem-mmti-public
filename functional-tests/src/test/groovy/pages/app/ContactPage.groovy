package pages.app

import pages.base.BaseAppPage

class ContactPage extends BaseAppPage {
  static at = { pageTitle.equals("Connect With Us") }
  static url = "/contact"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
  }
}
