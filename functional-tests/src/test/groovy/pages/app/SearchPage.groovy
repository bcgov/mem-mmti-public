package pages.app

import pages.base.BaseAppPage

class SearchPage extends BaseAppPage {
  static at = { pageTitle.equals("Find Documents...") }
  static url = "/search"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
  }
}
