package pages.app

import geb.Page
import geb.Browser

/**
 * Generic page that represents an external page.
 * Use a new instance of this class in situations where the 'at' checker will execute.
 * Example:
 *   at new ExternalLinkPage("window title", "gov.bc.ca")
 */
class ExternalLinkPage extends Page {
  private def windowTitle
  private def urlPart

  /**
   * @param windowTitle the browser window title
   * @param urlPart a string that will be asserted is contained in the url. Example: "gov.bc.ca"
   */
  ExternalLinkPage(windowTitle, urlPart) {
    this.windowTitle = windowTitle
    this.urlPart = urlPart
  }

  static at = {
    browser.withWindow({title.equals(windowTitle)}, close:true) {
      assert browser.getCurrentUrl().contains(urlPart)
      assert browser.getAvailableWindows().size().equals(2)
    }
  }
}
