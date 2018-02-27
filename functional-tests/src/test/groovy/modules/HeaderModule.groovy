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
        println("1: " + navBarItem.text())
        interact {
          moveToElement(navBarItem)
        }

        def subNavBarItem = navBarItem.$("div").$("a").has(subItemSelector, "strong")
        println("2: " + subNavBarItem.text())
        if ( subNavBarItem != null ) {
          interact {
            moveToElement(subNavBarItem)
          }
          subNavBarItem.click()
        } else {
          navBarItem.click()
        }
    }
}
