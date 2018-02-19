package modules

import geb.Module

class UtilsModule extends Module {
  /**
   * Waits for a selector to be visible to the user.
   * @param selector a geb selector.
   * @return selector the original selector paramter.
   */
  def waitForDisplayed(selector) {
    waitFor { selector.displayed }
    return selector;
  }
}
