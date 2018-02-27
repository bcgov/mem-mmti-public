import geb.spock.GebReportingSpec

import geb.Page
import pages.app.AuthorizationsPage
import pages.app.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Authorizations page")
class AuthorizationsSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: AuthorizationsPage, click sidebar Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the AuthorizationsPage"
      to AuthorizationsPage
    when: "I click on the link #ItemSelector"
      commonLink.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                   | ItemSelector                                                                                                                 || AssertPage
      //TODO [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Environmental Assessment Office User Guide (June 2015)"]                                                            || new ExternalLinkPage("", "eao.gov.bc.ca")
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Joint Application Information Requirements for Mines Act and Environmental Management Act Permits (February 2016)"] || new ExternalLinkPage("Joint Application Information Requirements for Mines Act and Environmental Management Act Permits", "gov.bc.ca")

      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Major Mine Permitting Office (Ministry of Energy, Mines and Petroleum Resources)"]                                  || new ExternalLinkPage("Major Mine Permitting Office (MMPO) - Province of British Columbia", "gov.bc.ca")
      //TODO [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "BC Environmental Assessment Process"]                                                                               || new ExternalLinkPage("", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Waste Discharge Authorizations (Ministry of Environment and Climate Change Strategy)"]                              || new ExternalLinkPage("Waste Discharge Authorizations - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Mining & Smelting (Ministry of Environment and Climate Change Strategy)"]                                           || new ExternalLinkPage("Mining & Smelting - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Natural Resource Sector Online Services Portal"]                                                                    || new ExternalLinkPage("Home - Natural Resource Sector Online Services", "nrs.gov.bc.ca")
  }

  @Unroll
  def "Navigate Page from: AuthorizationsPage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the AuthorizationsPage"
      to AuthorizationsPage
    when: "I click on the link #ItemSelector"
      commonLink.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                                           | ItemSelector                                                                            || AssertPage
      [tag : "h2", text : "Authorizations for Major Mines in British Columbia"] | [text : "Major Mine Permitting Office (MMPO)"]                                          || new ExternalLinkPage("Major Mine Permitting Office (MMPO) - Province of British Columbia", "gov.bc.ca")

      [tag : "h3", text : "Environmental Assessment (EA) Process"]              | [text : "Environmental Assessment Office (EAO)"]                                        || new ExternalLinkPage("Environmental Assessment Office", "eao.gov.bc.ca")
      [tag : "h3", text : "Environmental Assessment (EA) Process"]              | [text : "Environmental Assessment Act"]                                                 || new ExternalLinkPage("Environmental Assessment Act", "bclaws.ca")
      [tag : "h3", text : "Environmental Assessment (EA) Process"]              | [text : "Reviewable Projects Regulation"]                                               || new ExternalLinkPage("Reviewable Projects Regulation", "bclaws.ca")
      //TODO [tag : "h3", text : "Environmental Assessment (EA) Process"]              | [text : "http://www.eao.gov.bc.ca/ea_process.html"]                                     || new ExternalLinkPage("", "eao.gov.bc.ca")
      //TODO PDF [tag : "h3", text : "Environmental Assessment (EA) Process"]              | [text : "EAO User Guide."]                                                              || new ExternalLinkPage("", "eao.gov.bc.ca")

      //TODO PDF [tag : "h3", text : "Major Permits"]                                      | [text : "Joint Application Information Requirements for Mines Act and EMA Permits"]     || new ExternalLinkPage("Joint Application Information Requirements for Mines Act and Environmental Management Act Permits", "gov.bc.ca")

      [tag : "h3", text : "Major Permits"]                                      | [text : "Mines Act"]                                                                    || new ExternalLinkPage("Mines Act", "bclaws.ca")
      [tag : "h3", text : "Major Permits"]                                      | [text : "Health, Safety and Reclamation Code for Mines in British Columbia (the Code)"] || new ExternalLinkPage("Health, Safety and Reclamation Code for Mines in British Columbia - Province of British Columbia", "gov.bc.ca")

      [tag : "h3", text : "Major Permits"]                                      | [text : "Environmental Management Act (EMA)"]                                           || new ExternalLinkPage("Table of Contents - Environmental Management Act", "bclaws.ca")
      [tag : "h3", text : "Major Permits"]                                      | [text : "More on EMA permits and approval processes"]                                   || new ExternalLinkPage("Waste Discharge Authorizations - Province of British Columbia", "gov.bc.ca")

      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Mineral Tenure Act"]                                                           || new ExternalLinkPage("Mineral Tenure Act", "bclaws.ca")
      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Coal Act"]                                                                     || new ExternalLinkPage("Coal Act", "bclaws.ca")
      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Learn more about claims, licences and leases"]                                 || new ExternalLinkPage("Mineral Titles - Province of British Columbia", "gov.bc.ca")
      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Crown land tenure"]                                                            || new ExternalLinkPage("Acts & Regulations - Province of British Columbia", "gov.bc.ca")

      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Natural Resource Sector Online Services portal."]                              || new ExternalLinkPage("Home - Natural Resource Sector Online Services", "nrs.gov.bc.ca")

      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Fisheries Act"]                                                                || new ExternalLinkPage("Fisheries Act", "justice.gc.ca")
      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Canadian Environmental Assessment Act, 2012"]                                  || new ExternalLinkPage("Canadian Environmental Assessment Act, 2012", "justice.gc.ca")
      //TODO [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Learn about federal-provincial EA relations"]                                  || new ExternalLinkPage("", "eao.gov.bc.ca")
      [tag : "h3", text : "Other Authorizations for Mining Projects in BC"]     | [text : "Learn more about the federal MPMO"]                                            || new ExternalLinkPage("Home | Major Projects Management Office", "mpmo.gc.ca")
  }
}
