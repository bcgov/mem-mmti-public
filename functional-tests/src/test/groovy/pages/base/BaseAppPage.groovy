package pages.base

import modules.HeaderModule
import modules.CommonLinkModule
import modules.FooterModule

import geb.Page

/**
 * Base app page where global selectors and modules used by all pages can be added.
 * All pages should extend this page.
 */
class BaseAppPage extends Page {
  static content = {
    headerModule { module(HeaderModule) }
    commonLinkModule { module(CommonLinkModule) }
    footerModule { module(FooterModule) }
  }
}
