import geb.spock.GebReportingSpec

import geb.Page
import pages.app.AuthorizationsPage
import pages.app.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Authorizations page")
class AuthorizationsSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: #StartPage, click Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the #StartPage"
      to ContactPage
    when: "I click on the link #ItemSelector"
      clickExternalLink(ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ItemSelector                                                   || AssertPage
      [text : "Ministy of Energy, Mines and Petroleum Resources"]    || new ExternalLinkPage("Ministry of Energy, Mines & Petroleum Resources - Province of British Columbia")
      [text : "Ministry of Environment and Climate Change Strategy"] || new ExternalLinkPage("Ministry of Environment & Climate Change Strategy - Province of British Columbia")
      [text : "Environmental Assessment Office"]                     || new ExternalLinkPage("Environmental Assessment Office")
  }
}
