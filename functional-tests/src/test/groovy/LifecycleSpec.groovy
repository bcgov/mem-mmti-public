import geb.spock.GebReportingSpec

import geb.Page
import pages.app.LifecyclePage
import pages.app.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Lifecycle page")
class ContactSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: #StartPage, click Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the #StartPage"
      to LifecyclePage
    when: "I click on the link #ItemSelector"
      externalLinks.clickSidebarLink(ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ItemSelector                                                   || AssertPage
  }

  @Unroll
  def "Navigate Page from: #StartPage, click Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the #StartPage"
      to LifecyclePage
    when: "I click on the link #ItemSelector"
      externalLinks.clickMainContentLink(ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ItemSelector                                                   || AssertPage
  }
}
