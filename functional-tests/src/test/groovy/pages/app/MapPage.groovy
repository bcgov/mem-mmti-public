package pages.app

import pages.base.BaseAppPage

class MapPage extends BaseAppPage {
  static at = { searchBarText.equals("Mine name or location") }
  static url = "/map"
  static content = {
    HomeBtn { $("#header .brand") }
  }
}
