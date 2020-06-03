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

if (!DEBUG_MODE)
  DEBUG_MODE=false

waiting {
  timeout = 40
  retryInterval = 2
}

atCheckWaiting = [40, 2]

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

  // run via “./gradlew firefoxTest”
  // See: https://github.com/SeleniumHQ/selenium/wiki/FirefoxDriver
  firefox {
    driver = {
      FirefoxOptions o = new FirefoxOptions()
      o.addArguments("window-size=1400,800")
      new FirefoxDriver(o)
    }
  }

  firefoxHeadless {
    driver = {
      FirefoxOptions o = new FirefoxOptions()
      o.addArguments("-headless")
      o.addArguments("window-size=1400,800")
      new FirefoxDriver(o)
    }
  }

  // run via “./gradlew ieTest”
  // See: https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
  ie {
    def d = new DesiredCapabilities();
    d.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS,true);
    d.setCapability(InternetExplorerDriver.IGNORE_ZOOM_SETTING,true);
    d.setCapability(InternetExplorerDriver.NATIVE_EVENTS,false);
    d.setCapability(InternetExplorerDriver.REQUIRE_WINDOW_FOCUS,true);

    driver = { new InternetExplorerDriver(d) }
  }

  // run via “./gradlew edgeTest”
  // See: https://github.com/SeleniumHQ/selenium/wiki
  edge {
    driver = { new EdgeDriver() }
  }

  // run via “./gradlew safariTest”
  // See: https://github.com/SeleniumHQ/selenium/wiki
  safari {
    driver = { new SafariDriver() }
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
      caps.setCapability("browserstack.maskCommands", "setValues, getValues, setCookies, getCookies");
      caps.setCapability("browserstack.debug", DEBUG_MODE);

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
      caps.setCapability("browserstack.maskCommands", "setValues, getValues, setCookies, getCookies");
      caps.setCapability("browserstack.debug", DEBUG_MODE);

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
      caps.setCapability("browserstack.maskCommands", "setValues, getValues, setCookies, getCookies");
      caps.setCapability("browserstack.debug", DEBUG_MODE);

      String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

      driver = new RemoteWebDriver(new URL(URL), caps)

      return driver
    }
  }
}

// To run the tests with all browsers just run “./gradlew test”

baseNavigatorWaiting = true
autoClearCookies = true
autoClearWebStorage = true
cacheDriverPerThread = true
quitCachedDriverOnShutdown = true
