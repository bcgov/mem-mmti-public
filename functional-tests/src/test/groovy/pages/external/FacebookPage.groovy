package pages.external

import geb.Page

class FacebookPage extends Page {
  static at = {
    browser.withWindow({title.equals("Facebook") || title.equals("Post to Facebook")}, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
    }
  }
}
