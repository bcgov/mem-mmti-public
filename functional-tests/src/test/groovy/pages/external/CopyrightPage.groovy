package pages.external

import geb.Page

class CopyrightPage extends Page {
  static at = {
    browser.withWindow({title.equals("Copyright - Province of British Columbia")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
      assert copyPageTitle.equals("Copyright")
    }
  }
  static url = "https://www2.gov.bc.ca/gov/content/home/copyright"
  static content = {
    copyPageTitle { $("h1").text() }
  }
}
