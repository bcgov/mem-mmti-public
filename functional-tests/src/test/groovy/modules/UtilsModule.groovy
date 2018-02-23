package modules

import geb.Module

import java.util.Date

class UtilsModule extends Module {
  /**
   * Waits for a selector to be visible to the user.
   * @param selector a geb selector.
   * @return selector the original selector paramter.
   */
  def waitForDisplayed(selector) {
    waitFor { selector.displayed }
    return selector
  }

  /**
   * Prints the selector and the selector.text().
   * @param selector a geb selector.
   * @return selector the original selector paramter.
   */
  def printSelector(selector) {
    println("== printSelector() =================")
    println("selector: " + selector)
    println("------------------------------------")
    println("selector.text(): " + selector.text())
    println("====================================")
    return selector
  }

  def timeSelector(selector) {
    Long millisecondsStart = new Date().getTime()
    println("== printSelector() =================")
    println("selector: " + selector)
    println("------------------------------------")
    Long millisecondsFinal = new Date().getTime()
    println("execution time: " + (millisecondsFinal - millisecondsStart))
    println("====================================")
    return selector
  }
}
