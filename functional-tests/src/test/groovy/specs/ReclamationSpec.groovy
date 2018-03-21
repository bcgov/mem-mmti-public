import geb.spock.GebReportingSpec

import geb.Page
import pages.app.ReclamationPage
import pages.app.TopicsOfInterestPage
import pages.external.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Reclamation page")
class ReclamationSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: ReclamationPage, click sidebar Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the ReclamationPage"
      to ReclamationPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                   | ItemSelector                                                                                                       || AssertPage
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Ministry of Energy, Mines and Petroleum Resources Annual Reclamation Report Requirements (January 2017)"] || new ExternalLinkPage("2017_01_23_annual_Reclamation_report_requirements.pdf", "gov.bc.ca")
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Mine Reclamation Security in British Columbia Fact Sheet (November 2016)"]                                || new ExternalLinkPage("DRAFT", "gov.bc.ca")

      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Reclamation & Closure (Ministry of Energy, Mines and Petroleum Resources)"]                               || new ExternalLinkPage("Reclamation & Closure - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Securities (Ministry of Energy, Mines and Petroleum Resources)"]                                          || new ExternalLinkPage("Securities - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "British Columbia Technical and Research Committee on Reclamation"]                                        || new ExternalLinkPage("February 26, 2018 TRCR | BC Technical and Research Committee on Reclamation", "trcr.bc.ca")
  }
  @Unroll
  def "Navigate Page from: ReclamationPage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the ReclamationPage"
      to ReclamationPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                                                                            | ItemSelector                                                                            || AssertPage
      [tag : "h2", text : "Committed to ensuring BC's resources are returned to an environmentally sound state"] | [text : "Health, Safety and Reclamation Code for Mines in British Columbia (the Code)"] || new ExternalLinkPage("Health, Safety and Reclamation Code for Mines in British Columbia - Province of British Columbia", "gov.bc.ca")
      [tag : "h2", text : "Committed to ensuring BC's resources are returned to an environmentally sound state"] | [text : "reclamation security"]                                                         || new ExternalLinkPage("Securities - Province of British Columbia", "gov.bc.ca")

      //TODO PDF [tag : "h2", text : "Annual Reclamation Reports (ARRs)"]                                                   | [text : "Annual Reclamation Report Requirements"]                                       || new ExternalLinkPage("formatrequirements2016.pdf", "gov.bc.ca")
  }

  @Unroll
  def "Navigate Page from: ReclamationPage, click Button: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the ReclamationPage"
      to ReclamationPage
    when: "I click on the #ClickLink"
      page."$ClickLink".click()
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ClickLink         || AssertPage
      "BackToTopicsBtn" || TopicsOfInterestPage
  }
}
