package pages.app

import pages.base.BaseAppPage

class ProjectsPage extends BaseAppPage {
  static at = { pageTitle.equals("Find Mines in British Columbia") }
  static url = "/mines"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
  }
}
