package pages.external

import geb.Page

class GooglePlusPage extends Page {
  static at = {
    browser.withWindow({title.startsWith("Google+")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
    }
  }
}
