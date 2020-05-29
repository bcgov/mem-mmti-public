import geb.spock.GebReportingSpec

import geb.Page
import pages.app.WaterQualityPage
import pages.app.TopicsOfInterestPage
import pages.external.ExternalLinkPage

import spock.lang.Unroll
import spock.lang.Title

@Title("Functional tests for the WaterQuality page")
class WaterQualitySpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: WaterQualityPage, click sidebar Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the WaterQualityPage"
      to WaterQualityPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                   | ItemSelector                                                                                                                                                      || AssertPage
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "Water and Air Baseline Monitoring Guidance Document for Mine Proponents and Operators (Ministry of Environment and Climate Change Strategy, June 2016)"] || new ExternalLinkPage("2017_01_23_annual_WaterQuality_report_requirements.pdf", "gov.bc.ca")
      //TODO PDF [tag : "h4", text : "RELATED DOCUMENTS"]          | [text : "A User Guide for the Water and Air Baseline Monitoring Guidance Document for Mine Proponents and Operators"]                                             || new ExternalLinkPage("ug_water_and_ait_baseline.pdf", "gov.bc.ca")

      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Water Quality (Province of BC)"]                                                                                                                         || new ExternalLinkPage("Water Quality - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Elk Valley Area Based Management Plan"]                                                                                                                  || new ExternalLinkPage("Area Based Management Plan - Province of British Columbia", "gov.bc.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Government of Canada: Environmental Effects Monitoring"]                                                                                                 || new ExternalLinkPage("Environment and Climate Change Canada - Pollution and Waste - Environmental Effects Monitoring - Home Page", "ec.gc.ca")
      // ? Link no longer functions. Replace? [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Government of Canada: Biological Monitoring"]                                                                                                            || new ExternalLinkPage("", "www.ec.gc.ca/esee-eem/")
      // ? Link no longer functions. Replace? [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Government of Canada: Water Quality"]                                                                                                                    || new ExternalLinkPage("Water and the environment - Canada.ca", "canada.ca")
      [tag : "h4", text : "EXTERNAL LINKS & RESOURCES"] | [text : "Mine Environmental Neutral Drainage"]                                                                                                                    || new ExternalLinkPage("Mend |   Default", "mend-nedem.org")
  }
  @Unroll
  def "Navigate Page from: WaterQualityPage, click main content Link: #ItemSelector, Assert Page: #AssertPage"() {
    given: "I start on the WaterQualityPage"
      to WaterQualityPage
    when: "I click on the link #ItemSelector"
      commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector)
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      SectionSelector                                                                              | ItemSelector                            || AssertPage
      [tag : "h2", text : "Committed to protecting water quality throughout the mining lifecycle"] | [text : "Environmental Management Act"] || new ExternalLinkPage("Table of Contents - Environmental Management Act", "bclaws.ca")
  }

  @Unroll
  def "Navigate Page from: WaterQualityPage, click Button: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the WaterQualityPage"
      to WaterQualityPage
    when: "I click on the #ClickLink"
      page."$ClickLink".click()
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ClickLink         || AssertPage
      "BackToTopicsBtn" || TopicsOfInterestPage
  }
}
