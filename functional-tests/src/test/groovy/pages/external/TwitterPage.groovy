package pages.external

import geb.Page

class TwitterPage extends Page {
  static at = {
    browser.withWindow({title.contains("Share a link on Twitter")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
    }
  }
}
