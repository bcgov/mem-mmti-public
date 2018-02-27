import geb.spock.GebReportingSpec

import geb.Page
import pages.app.LegislationPage
import pages.app.AuthorizationsPage
import pages.app.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Legislation page")
class LegislationSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: LegislationPage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the LegislationPage"
      to LegislationPage
    when: "I click on the link #ItemSelector"
      commonLink.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                                                                                                                                     | ItemSelector                                                                 || AssertPage
      [tag : "h4", text : "Environmental Assessment Act (Environmental Assessment Office)"]                                                                               | [text : "Environmental Assessment Act"]                                      || new ExternalLinkPage("Environmental Assessment Act", "www.bclaws.ca")
      [tag : "h4", text : "Environmental Assessment Act (Environmental Assessment Office)"]                                                                               | [text : "Reviewable Projects Regulation"]                                    || new ExternalLinkPage("Reviewable Projects Regulation", "www.bclaws.ca")

      [tag : "h4", text : "Mines Act (Ministry of Energy, Mines and Petroleum Resources)"]                                                                                | [text : "Mines Act"]                                                         || new ExternalLinkPage("Mines Act", "www.bclaws.ca")
      [tag : "h4", text : "Mines Act (Ministry of Energy, Mines and Petroleum Resources)"]                                                                                | [text : "Health, Safety and Reclamation Code for Mines in British Columbia"] || new ExternalLinkPage("Health, Safety and Reclamation Code for Mines in British Columbia - Province of British Columbia", "gov.bc.ca")

      [tag : "h4", text : "Environmental Management Act (Ministry of Environment and Climate Change Strategy)"]                                                           | [text : "Environmental Management Act"]                                      || new ExternalLinkPage("Table of Contents - Environmental Management Act", "www.bclaws.ca")
      [tag : "h4", text : "Environmental Management Act (Ministry of Environment and Climate Change Strategy)"]                                                           | [text : "EMA’s Waste Discharge Regulation"]                                  || new ExternalLinkPage("Waste Discharge Regulation", "www.bclaws.ca")
      [tag : "h4", text : "Environmental Management Act (Ministry of Environment and Climate Change Strategy)"]                                                           | [text : "Contaminated Sites Regulation"]                                     || new ExternalLinkPage("Table of Contents - Contaminated Sites Regulation", "www.bclaws.ca")
      [tag : "h4", text : "Environmental Management Act (Ministry of Environment and Climate Change Strategy)"]                                                           | [text : "Hazardous Waste Regulation"]                                        || new ExternalLinkPage("Table of Contents - Hazardous Waste Regulation", "www.bclaws.ca")
      [tag : "h4", text : "Environmental Management Act (Ministry of Environment and Climate Change Strategy)"]                                                           | [text : "Municipal Wastewater Regulation"]                                   || new ExternalLinkPage("Municipal Wastewater Regulation", "www.bclaws.ca")
      [tag : "h4", text : "Environmental Management Act (Ministry of Environment and Climate Change Strategy)"]                                                           | [text : "Placer Mining Waste Control Regulation"]                            || new ExternalLinkPage("Placer Mining Waste Control Regulation", "www.bclaws.ca")

      [tag : "h4", text : "Tenure"]                                                                                                                                       | [text : "Mineral Tenure Act"]                                                || new ExternalLinkPage("Mineral Tenure Act", "www.bclaws.ca")
      [tag : "h4", text : "Tenure"]                                                                                                                                       | [text : "Coal Act"]                                                          || new ExternalLinkPage("Coal Act", "www.bclaws.ca")
      [tag : "h4", text : "Tenure"]                                                                                                                                       | [text : "Land Act"]                                                          || new ExternalLinkPage("Land Act", "www.bclaws.ca")
      [tag : "h4", text : "Tenure"]                                                                                                                                       | [text : "Mining Right of Way Act"]                                           || new ExternalLinkPage("Mining Right of Way Act", "www.bclaws.ca")

      [tag : "h4", text : "Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC"] | [text : "Heritage Conservation Act"]                                         || new ExternalLinkPage("Heritage Conservation Act", "www.bclaws.ca")
      [tag : "h4", text : "Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC"] | [text : "Water Sustainability Act"]                                          || new ExternalLinkPage("Water Sustainability Act", "www.bclaws.ca")
      [tag : "h4", text : "Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC"] | [text : "Forest Act"]                                                        || new ExternalLinkPage("Table of Contents - Forest Act", "www.bclaws.ca")
      [tag : "h4", text : "Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC"] | [text : "Forest and Range Practices Act"]                                    || new ExternalLinkPage("Forest and Range Practices Act", "www.bclaws.ca")
      [tag : "h4", text : "Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC"] | [text : "Land Act"]                                                          || new ExternalLinkPage("Land Act", "www.bclaws.ca")
      [tag : "h4", text : "Legislation Administered by the Ministry of Forests, Lands and Natural Resource Operations (FLNRO) that May Apply to Mining Operations in BC"] | [text : "Widlife Act"]                                                       || new ExternalLinkPage("Wildlife Act", "www.bclaws.ca")

      [tag : "h4", text : "Other Provincial Statutes that May Apply to Mining Operations in BC"]                                                                          | [text : "Drinking Water Protection Act"]                                     || new ExternalLinkPage("Drinking Water Protection Act", "www.bclaws.ca")
      [tag : "h4", text : "Other Provincial Statutes that May Apply to Mining Operations in BC"]                                                                          | [text : "Environment and Land Use Act"]                                      || new ExternalLinkPage("Environment and Land Use Act", "www.bclaws.ca")
      [tag : "h4", text : "Other Provincial Statutes that May Apply to Mining Operations in BC"]                                                                          | [text : "Public Health Act"]                                                 || new ExternalLinkPage("Public Health Act", "www.bclaws.ca")

      [tag : "h4", text : "Fisheries Act"]                                                                                                                                | [text : "Fisheries Act"]                                                     || new ExternalLinkPage("Fisheries Act", "justice.gc.ca")
      [tag : "h4", text : "Fisheries Act"]                                                                                                                                | [text : "Metal Mining Effluent Regulations"]                                 || new ExternalLinkPage("Metal Mining Effluent Regulations", "justice.gc.ca")

      [tag : "h4", text : "Canadian Environmental Act"]                                                                                                                   | [text : "Canadian Environmental Assessment Act, 2012"]                       || new ExternalLinkPage("Canadian Environmental Assessment Act, 2012", "justice.gc.ca")

      [tag : "h4", text : "Other Federal Statutes"]                                                                                                                       | [text : "Canadian Environmental Protection Act"]                             || new ExternalLinkPage("Canadian Environmental Protection Act, 1999", "justice.gc.ca")
      [tag : "h4", text : "Other Federal Statutes"]                                                                                                                       | [text : "Migratory Birds Convention Act"]                                    || new ExternalLinkPage("Migratory Birds Convention Act, 1994", "justice.gc.ca")
      [tag : "h4", text : "Other Federal Statutes"]                                                                                                                       | [text : "Navigation Protection Act"]                                         || new ExternalLinkPage("Navigation Protection Act", "justice.gc.ca")
      [tag : "h4", text : "Other Federal Statutes"]                                                                                                                       | [text : "Species at Risk Act"]                                               || new ExternalLinkPage("Species at Risk Act", "justice.gc.ca")
  }

  @Unroll
  def "Navigate Page from: LegislationPage, click learn more Button: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the LegislationPage"
      to LegislationPage
    when: "I click on the #ClickLink"
      page."$ClickLink"
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ClickLink                                || AssertPage
      "EnvironmentalAssessmentActLearnMoreBtn" || AuthorizationsPage
      "MinesActLearnMoreBtn"                   || AuthorizationsPage
      "EnvironmentalManagementActLearnMoreBtn" || AuthorizationsPage
      "TenureLearnMoreBtn"                     || AuthorizationsPage
      "LegislationAdministeredLearnMoreBtn"    || AuthorizationsPage
  }
}
