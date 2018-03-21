import geb.spock.GebReportingSpec

import geb.Page
import pages.app.ContactPage
import pages.external.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Contact page")
class ContactSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: ContactPage, click sidebar Link: #SectionSelector -> #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the ContactPage"
      to ContactPage
    when: "I click on the link #SectionSelector -> #ItemSelector"
      commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                   | ItemSelector                                                   || AssertPage
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Ministry of Energy, Mines and Petroleum Resources"]   || new ExternalLinkPage("Ministry of Energy, Mines & Petroleum Resources - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Ministry of Environment and Climate Change Strategy"] || new ExternalLinkPage("Ministry of Environment & Climate Change Strategy - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Environmental Assessment Office"]                     || new ExternalLinkPage("Environmental Assessment Office", "gov.bc.ca")
  }
}
