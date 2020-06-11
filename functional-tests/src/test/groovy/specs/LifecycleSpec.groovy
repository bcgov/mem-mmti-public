import geb.spock.GebReportingSpec

import geb.Page
import pages.app.LifecyclePage
import pages.app.ReclamationPage
import pages.app.WaterQualityPage
import pages.app.TailingsManagementPage
import pages.app.AuthorizationsPage
import pages.external.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Lifecycle page")
class LifecycleSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: LifecyclePage, click sidebar Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the LifecyclePage"
      to LifecyclePage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                     | ItemSelector                                                                                                                   || AssertPage
      [tag : "h4", text : "ONGOING LIFECYCLE ACTIVITIES"] | [text : "Progressive reclamation"]                                                                                             || ReclamationPage
      [tag : "h4", text : "ONGOING LIFECYCLE ACTIVITIES"] | [text : "water quality"]                                                                                                       || WaterQualityPage
      [tag : "h4", text : "ONGOING LIFECYCLE ACTIVITIES"] | [text : "tailings management facilities"]                                                                                      || TailingsManagementPage
      //TODO [tag : "h4", text : "RELATED DOCUMENTS"]            | [text : "Life Cycle of a Mine (Association for Mineral Exploration BC and Mining Association of BC)"]                          || new ExternalLinkPage("", "amebc.ca")
      //The below link re-directs from "ec.gc.ca" to "canada.ca", which may cause this test to fail if the timing is just right and we assert against the redirect page.
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"]   | [text : "Environmental Code of Practice for Metal Mines – Mine Life Cycle Activities (Environment and Climate Change Canada)"] || new ExternalLinkPage("Environmental Code of Practice for metal mines: chapter 2 - Canada.ca", "www.canada.ca")
  }

  @Unroll
  def "Navigate Page from: LifecyclePage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the LifecyclePage"
      to LifecyclePage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                      | ItemSelector                            || AssertPage
      // [tag : "h3", text : "Exploration"]   | [text : "BC Geological Survey"]         || new ExternalLinkPage("Geoscience", "gov.bc.ca")    DEAD page
      [tag : "h3", text : "Exploration"]   | [text : "“Notice of Work” permit"]    || AuthorizationsPage

      //TODO [tag : "h4", text : "Design"]        | [text : "environmental assessment"]     ||
      [tag : "h3", text : "Development"]   | [text : "Mines Act"]                    || AuthorizationsPage
      [tag : "h3", text : "Development"]   | [text : "Environmental Management Act"] || AuthorizationsPage

      [tag : "h3", text : "Operation"]     | [text : "Progressive reclamation"]      || ReclamationPage

      [tag : "h3", text : "Closure"]       | [text : "Mines Act permits"]            || AuthorizationsPage
      [tag : "h3", text : "Closure"]       | [text : "authorizations"]               || AuthorizationsPage
  }
}
