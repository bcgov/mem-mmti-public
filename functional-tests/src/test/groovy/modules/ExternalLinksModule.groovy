package modules

import geb.Module

/**
 * Module that facilitates clicking a generic external link.
 * Typically found under "Related Documents", "External Links & Resources", etc.
 */
class ExternalLinksModule extends Module {
  def clickSideBarLink(Map<String, Object> itemSelector) {
    $("aside").$("section").$(itemSelector, "a").click()
  }

  def clickMainContentLink(Map<String, Object> itemSelector) {
    $("main").$("section").$(itemSelector, "a").click()
  }
}
