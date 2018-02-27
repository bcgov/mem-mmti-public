package pages.app

import geb.Page
import modules.CommonLinkModule

class LifecyclePage extends Page {
  static at = { pageTitle.equals("The Mining Lifecycle") }
  static url = "/lifecycle"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeBtn { $("#header .brand").click() }

    commonLink { module(CommonLinkModule) }
  }
}
