/*
  This is the Geb configuration file.

  See: http://www.gebish.org/manual/current/#configuration
*/

import org.openqa.selenium.Dimension
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions
import org.openqa.selenium.ie.InternetExplorerDriver
import org.openqa.selenium.edge.EdgeDriver
import org.openqa.selenium.safari.SafariDriver
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.remote.RemoteWebDriver
import listeners.SessionIdHolder


// Allows for setting you baseurl in an environment variable.
// This is particularly handy for development and the pipeline
def env = System.getenv()
baseUrl = env['BASEURL']
if (!baseUrl) {
  baseUrl = "https://www-mem-mmt-dev.pathfinder.gov.bc.ca/"
}

println "BaseURL: ${baseUrl}"
println "--------------------------"

USERNAME = env['BROWSERSTACK_USERNAME']
AUTOMATE_KEY = env['BROWSERSTACK_TOKEN']
DEBUG_MODE = env['DEBUG_MODE']

if (!USERNAME || !AUTOMATE_KEY)
    throw RuntimeError('BROWSERSTACK_USERNAME and BROWSERSTACK_TOKEN are required');

waiting {
  timeout = 40
  retryInterval = 1
}

atCheckWaiting = [40, 4]

String buildId = SessionIdHolder.instance.buildId

environments {

  // run via “./gradlew chromeTest”
  // See: https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver
  chrome {
    driver = {
      ChromeOptions o = new ChromeOptions()
      o.addArguments("window-size=1400,800")
      new ChromeDriver(o)
    }
  }

  // run via “./gradlew chromeHeadlessTest”
  // See: https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver
  chromeHeadless {
    driver = {
      ChromeOptions o = new ChromeOptions()
      o.addArguments("window-size=1400,800")
      o.addArguments('headless')
      o.addArguments('disable-gpu')
      o.addArguments('no-sandbox')
      new ChromeDriver(o)
    }
  }

  remoteFirefox {
    driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("browser", "Firefox")
      caps.setCapability("os", "Windows")
      caps.setCapability("os_version", "10")
      caps.setCapability("resolution", "1920x1200")
      caps.setCapability("name", "Automated Test")
      caps.setCapability("project", "BCMI")
      caps.setCapability("build", "${buildId}:Firefox")
      caps.setCapability("browserstack.use_w3c", true)
      caps.setCapability("browserstack.maskCommands", "setValues, setCookies, getCookies")
      caps.setCapability("browserstack.debug", DEBUG_MODE)
      caps.setCapability("browserstack.appiumLogs", false)
      caps.setCapability("browserstack.seleniumLogs", false)

      String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

      driver = new RemoteWebDriver(new URL(URL), caps)

      return driver
    }
  }

  remoteEdge {
    driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("browser", "Edge")
      caps.setCapability("os", "Windows")
      caps.setCapability("os_version", "10")
      caps.setCapability("resolution", "1920x1200")
      caps.setCapability("name", "Automated Test")
      caps.setCapability("project", "BCMI")
      caps.setCapability("build", "${buildId}:Edge")
      caps.setCapability("browserstack.use_w3c", true)
      caps.setCapability("browserstack.maskCommands", "setValues, setCookies, getCookies")
      caps.setCapability("browserstack.debug", DEBUG_MODE)
      caps.setCapability("browserstack.appiumLogs", false)
      caps.setCapability("browserstack.seleniumLogs", false)

      String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

      driver = new RemoteWebDriver(new URL(URL), caps)

      return driver
    }
  }

  remoteIE {
    driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("browser", "IE")
      caps.setCapability("os", "Windows")
      caps.setCapability("os_version", "10")
      caps.setCapability("resolution", "1920x1200")
      caps.setCapability("name", "Automated Test")
      caps.setCapability("project", "BCMI")
      caps.setCapability("build", "${buildId}:Chrome")
      caps.setCapability("browserstack.use_w3c", true)
      caps.setCapability("browserstack.maskCommands", "setValues, setCookies, getCookies")
      caps.setCapability("browserstack.debug", DEBUG_MODE)
      caps.setCapability("browserstack.appiumLogs", false)
      caps.setCapability("browserstack.seleniumLogs", false)

      String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

      driver = new RemoteWebDriver(new URL(URL), caps)

      return driver
    }
  }

  remoteChrome {
    driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("browser", "Chrome")
      caps.setCapability("os", "Windows")
      caps.setCapability("os_version", "10")
      caps.setCapability("resolution", "1920x1200")
      caps.setCapability("name", "Automated Test")
      caps.setCapability("project", "BCMI")
      caps.setCapability("build", "${buildId}:Chrome")
      caps.setCapability("browserstack.use_w3c", true)
      caps.setCapability("browserstack.maskCommands", "setValues, setCookies, getCookies")
      caps.setCapability("browserstack.debug", DEBUG_MODE)
      caps.setCapability("browserstack.appiumLogs", false)
      caps.setCapability("browserstack.seleniumLogs", false)

      String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

      driver = new RemoteWebDriver(new URL(URL), caps)

      return driver
    }
  }

  // safari fails to find many elements (ie. sidebar), v13 driver has bug with clicks
  remoteSafari {
    driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("browser", "Safari")
      caps.setCapability("os", "OS X")
      caps.setCapability("os_version", "Catalina")
      caps.setCapability("resolution", "1600x1200")
      caps.setCapability("name", "Automated Test")
      caps.setCapability("project", "BCMI")
      caps.setCapability("build", "${buildId}:Safari")
      caps.setCapability("browserstack.use_w3c", true)
      caps.setCapability("browserstack.maskCommands", "setValues, setCookies, getCookies")
      caps.setCapability("browserstack.debug", DEBUG_MODE)
      caps.setCapability("browserstack.enablePopups", true)
      caps.setCapability("browserstack.appiumLogs", false)
      caps.setCapability("browserstack.seleniumLogs", true)

      String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

      driver = new RemoteWebDriver(new URL(URL), caps)
      driver.manage().window().maximize();
      return driver
    }
  }
}

// To run the tests with all browsers just run “./gradlew test”
baseNavigatorWaiting = true
autoClearCookies = true
autoClearWebStorage = false  // firefox doesn't allow access to web storage, must be false
cacheDriverPerThread = true
quitCachedDriverOnShutdown = true
