package pages.external

import geb.Page

class AccessibilityPage extends Page {
  static at = {
    browser.withWindow({title.equals("Accessible Government - Province of British Columbia")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
      assert accessibiltyPageTitle.equals("Accessible Government")
    }
  }
  static url = "https://www2.gov.bc.ca/gov/content/home/accessible-government"
  static content = {
    accessibiltyPageTitle { $("h1").text() }
  }
}
