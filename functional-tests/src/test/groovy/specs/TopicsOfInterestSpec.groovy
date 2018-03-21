import geb.spock.GebReportingSpec

import geb.Page
import pages.app.TopicsOfInterestPage
import pages.app.WaterQualityPage
import pages.app.TailingsManagementPage
import pages.app.ReclamationPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the Topics of Interest page")
class TopicsOfInterestSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: TopicsOfInterestPage, click read more Button: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the TopicsOfInterestPage"
      to TopicsOfInterestPage
    when: "I click on the #ClickLink"
      page."$ClickLink".click()
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ClickLink                       || AssertPage
      "WaterQualityReadMoreBtn"       || WaterQualityPage
      "TailingsManagementReadMoreBtn" || TailingsManagementPage
      "ReclamationReadMoreBtn"        || ReclamationPage
  }
}
