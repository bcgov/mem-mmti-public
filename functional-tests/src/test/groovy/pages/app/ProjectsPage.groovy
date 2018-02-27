package pages.app

import geb.Page

class ProjectsPage extends Page {
  static at = { pageTitle.equals("Find Mines in British Columbia") }
  static url = "/projects"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }
  }
}
