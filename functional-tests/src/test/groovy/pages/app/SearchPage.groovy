package pages.app

import geb.Page

class SearchPage extends Page {
  static at = { pageTitle.equals("Find Documents...") }
  static url = "/search"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }
  }
}
