import geb.spock.GebReportingSpec

import geb.Page
import pages.app.ComplianceOversightPage
import pages.app.AuthorizationsPage
import pages.external.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Compliance Oversight page")
class ComplianceOversightSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: ComplianceOversightPage, click sidebar Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the ComplianceOversightPage"
      to ComplianceOversightPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                   | ItemSelector                                                                                                   || AssertPage
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Mining Compliance & Enforcement Board Terms of Reference"]                                            || new ExternalLinkPage("board_tor.pdf", "gov.bc.ca")
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Ministry of Environment and Climate Change Strategy Compliance Management Framework"]                 || new ExternalLinkPage("Compliance Mgmt Oct21 prt.indd", "gov.bc.ca")
      //TODO [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Ministry of Environment and Climate Change Strategy Compliance and Enforcement Policy and Procedure"] || new ExternalLinkPage("", "env.gov.bc.ca")
      [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Ministry of Environment and Climate Change Strategy Environmental Compliance Inspections Reporting"]  || new ExternalLinkPage("Environmental Compliance Inspections Reporting - Province of British Columbia", "gov.bc.ca")

      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Mining Compliance & Enforcement (Ministry of Energy, Mines and Petroleum Resources)"]                 || new ExternalLinkPage("Mining Compliance & Enforcement - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Environmental Assessment Office Compliance & Enforcement"]                                            || new ExternalLinkPage("Environmental Assessments - Province of British Columbia", "www2.gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Environmental Enforcement Reporting (Ministry of Environment and Climate Change Strategy)"]           || new ExternalLinkPage("Environmental Enforcement Reporting - Province of British Columbia", "gov.bc.ca")
  }
  @Unroll
  def "Navigate Page from: ComplianceOversightPage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the ComplianceOversightPage"
      to ComplianceOversightPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                                                 | ItemSelector                                                                 || AssertPage
      [tag : "h2", text : "Integrated Oversight of British Columbia's Mining Sector"] | [text : "Mines Act"]                                                         || new ExternalLinkPage("Mines Act", "bclaws.ca")
      [tag : "h2", text : "Integrated Oversight of British Columbia's Mining Sector"] | [text : "Mines Act permit"]                                                  || AuthorizationsPage
      [tag : "h2", text : "Integrated Oversight of British Columbia's Mining Sector"] | [text : "Health, Safety and Reclamation Code for Mines in British Columbia"] || new ExternalLinkPage("Health, Safety and Reclamation Code for Mines in British Columbia - Province of British Columbia", "gov.bc.ca")
      [tag : "h2", text : "Integrated Oversight of British Columbia's Mining Sector"] | [text : "Environmental Management Act (EMA)"]                                || new ExternalLinkPage("Table of Contents - Environmental Management Act", "bclaws.ca")
      [tag : "h2", text : "Integrated Oversight of British Columbia's Mining Sector"] | [text : "Environmental Assessment Act"]                                      || AuthorizationsPage
  }
}
