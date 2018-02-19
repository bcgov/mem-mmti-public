package pages.app

import geb.Page

class TopicsOfInterestPage extends Page {
  static at = { pageTitle.equals("Topics of Interest") }
  static url = "/topics-of-interest"
  static content = {
    pageTitle { $("#pgTitle").text() }
    HomeLink { $("#header .brand").click() }
  }
}
