package pages.app

import pages.base.BaseAppPage

class LifecyclePage extends BaseAppPage {
  static at = { pageTitle.equals("The Mining Lifecycle") }
  static url = "/lifecycle"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand") }
  }
}
