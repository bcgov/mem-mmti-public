package modules

import geb.Module

/**
 * Module that facilitates clicking a common link.
 * This includes links that are part of the main content body, or the side bar, which have consistent css selectors across pages.
 */
class CommonLinkModule extends Module {
  def clickSideBarLink(Map<String, Object> sectionSelector, Map<String, Object> itemSelector) {
    $("aside").$("section").children(sectionSelector.tag, text:sectionSelector.text).parent().$(itemSelector, "a").click()
  }

  def clickMainContentLink(Map<String, Object> sectionSelector, Map<String, Object> itemSelector) {
    $("main").$("section").children(sectionSelector.tag, text:sectionSelector.text).parent().$(itemSelector, "a").click()
  }
}
