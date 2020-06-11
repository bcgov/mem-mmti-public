package pages.external

import geb.Page

class DisclaimerPage extends Page {
  static at = {
    browser.withWindow({title.equals("Disclaimer - Province of British Columbia")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
      assert disclaimerPageTitle.equals("Disclaimer")
    }
  }
  static url = "https://www2.gov.bc.ca/gov/content/home/disclaimer"
  static content = {
    disclaimerPageTitle { $("h1").text() }
  }
}
