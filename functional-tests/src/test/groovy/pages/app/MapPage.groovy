package pages.app

import geb.Page

class MapPage extends Page {
  static at = { searchBarText.equals("Mine name or location") }
  static url = "/map"
  static content = {
    searchBarText { $("esri-map .esri-ui-top-left.esri-ui-corner form input").attr("placeholder") }
    HomeLink { $("#header .brand").click() }
    SearchOptionsBtn { $(".esri-search__sources-button.esri-widget-button") }
  }
}
