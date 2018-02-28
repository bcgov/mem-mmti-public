package modules

import geb.Module

class HeaderModule extends Module {
    static content = {
        logo { $("header div.brand-container") }
        navBar { $("#mainNav") }
    }

    /**
     * Moves to and clicks header menu buttons.
     * @param itemSelector the dispalyed text of the header menu item
     * @param subItemSelector the displayed text of the header menu sub item (optional).
     *
     * If the itemSelector and subItemSelector are populated, and both exist, the subItemSelector will be clicked.
     * If the itemSelector is populated and exists, but the subItemSelector is null or does not exist, then the itemSelector will be clicked.
     */
    void clickMenuItem(Map<String, Object> itemSelector, Map<String, Object> subItemSelector) {
        def navBarItem = navBar.$(".nav-item").has(itemSelector ,"span")
        interact {
          moveToElement(navBarItem)
        }

        def subNavBarItem = null
        if (subItemSelector) {
          subNavBarItem = navBarItem.$("div").$("a").has(subItemSelector, "strong")
        }

        if (subNavBarItem != null) {
          interact {
            moveToElement(subNavBarItem)
          }
          subNavBarItem.click()
        } else {
          //header element does not have a drop down menu, so click the header element itself
          navBarItem.click()
        }
    }
}
