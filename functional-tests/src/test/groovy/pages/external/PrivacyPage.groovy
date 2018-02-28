package pages.external

import geb.Page

class PrivacyPage extends Page {
  static at = {
    browser.withWindow({title.equals("B.C. Government Website Privacy Statement - Province of British Columbia")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
      assert pageTitle.equals("B.C. Government Website Privacy Statement")
    }
  }
  static url = "https://www2.gov.bc.ca/gov/content/home/privacy"
  static content = {
    pageTitle { $("h1").text() }
  }
}
