import geb.spock.GebReportingSpec

import geb.Page
import pages.app.TailingsManagementPage
import pages.app.TopicsOfInterestPage
import pages.external.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the TailingsManagement page")
class TailingsManagementSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: TailingsManagementPage, click sidebar Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the TailingsManagementPage"
      to TailingsManagementPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                   | ItemSelector                                                                                                      || AssertPage
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Memorandum of Understanding Regulation of Impoundments and Diversions on a Mine Site (MEM, MOE, FLNRO)"] || new ExternalLinkPage("mou_impoundments_diversions.pdf", "gov.bc.ca")

      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Health, Safety and Reclamation Code for Mines in British Columbia"]                                      || new ExternalLinkPage("Health, Safety and Reclamation Code for Mines in British Columbia - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Towards Sustainable Mining: Tailings Management (Mining Association of Canada)"]                         || new ExternalLinkPage("Tailings Management Protocol | The Mining Association of Canada", "mining.ca")
  }
  @Unroll
  def "Navigate Page from: TailingsManagementPage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the TailingsManagementPage"
      to TailingsManagementPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                                                                     | ItemSelector                                                                                   || AssertPage
      [tag : "h2", text : "Ensuring effective tailings management at all mine sites in British Columbia"] | [text : "metal leaching and acid rock drainage (ML/ARD)"]                                      || new ExternalLinkPage("Metal Leaching & Acid Rock Drainage - Province of British Columbia", "gov.bc.ca")
      [tag : "h2", text : "Ensuring effective tailings management at all mine sites in British Columbia"] | [text : "Health, Safety and Reclamation Code for Mines in British Columbia (the Code)"]        || new ExternalLinkPage("Health, Safety and TailingsManagement Code for Mines in British Columbia - Province of British Columbia", "gov.bc.ca")
      [tag : "h2", text : "Ensuring effective tailings management at all mine sites in British Columbia"] | [text : "Mines Act"]                                                                           || new ExternalLinkPage("Mines Act", "bclaws.ca")
  }

  @Unroll
  def "Navigate Page from: TailingsManagementPage, click Button: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the TailingsManagementPage"
      to TailingsManagementPage
    when: "I click on the #ClickLink"
      page."$ClickLink".click()
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ClickLink         || AssertPage
      "BackToTopicsBtn" || TopicsOfInterestPage
  }
}
