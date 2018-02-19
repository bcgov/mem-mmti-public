import geb.spock.GebReportingSpec

import pages.app.HomePage
import pages.app.ProjectsPage
import pages.app.MapPage
import pages.app.LifecyclePage
import pages.app.TopicsOfInterestPage
import pages.app.LegislationPage
import pages.app.AuthorizationsPage
import pages.app.ComplianceOversightPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Basic Link Checker to verify that the application is up and running.")
class FlowSpecs extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: #StartPage, click Link: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the #StartPage"
      to StartPage
    when: "I click on the #ClickLink"
      page."$ClickLink"
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      StartPage    | ClickLink                          || AssertPage
      HomePage     | "HomeLink"                         || HomePage

      HomePage     | "ViewListLink"                     || ProjectsPage
      HomePage     | "ViewMapLink"                      || MapPage

      HomePage     | "LifecycleLearnMoreLink"           || LifecyclePage
      HomePage     | "TopicsOfInterestLearnMoreLink"    || TopicsOfInterestPage
      HomePage     | "FindMinsInBCViewListLink"         || ProjectsPage
      HomePage     | "FindMinsInBCViewMapLink"          || MapPage

      HomePage     | "LegislationLearnMoreLink"         || LegislationPage
      HomePage     | "AuthorizationsLearnMoreLink"      || AuthorizationsPage
      HomePage     | "ComplianceOversightLearnMoreLink" || ComplianceOversightPage

      // ProjectsPage | "HomeLink"                         || HomePage
      // MapPage      | "HomeLink"                         || HomePage
  }
}
