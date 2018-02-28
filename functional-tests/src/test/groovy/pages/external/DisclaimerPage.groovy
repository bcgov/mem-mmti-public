package pages.external

import geb.Page

class DisclaimerPage extends Page {
  static at = {
    browser.withWindow({title.equals("Disclaimer - Province of British Columbia")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
      assert pageTitle.equals("Disclaimer")
    }
  }
  static url = "https://www2.gov.bc.ca/gov/content/home/disclaimer"
  static content = {
    pageTitle { $("h1").text() }
  }
}
