package pages.app

import geb.Page

class LegislationPage extends Page {
  static at = { pageTitle.equals("Legislation") }
  static url = "/legislation"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }
  }
}
