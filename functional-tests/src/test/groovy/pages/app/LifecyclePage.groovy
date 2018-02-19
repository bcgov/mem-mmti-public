package pages.app

import geb.Page

class LifecyclePage extends Page {
  static at = { pageTitle.equals("The Mining Lifecycle") }
  static url = "/lifecycle"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeLink { $("#header .brand").click() }
  }
}
