/**
 * This file was automatically generated by Strapi.
 * Any modifications made will be discarded.
 */
import ckeditor5 from "@_sh/strapi-plugin-ckeditor/strapi-admin";
import strapiPluginSso from "@chordata-insight/strapi-plugin-sso/strapi-admin";
import strapiCloud from "@strapi/plugin-cloud/strapi-admin";
import graphql from "@strapi/plugin-graphql/strapi-admin";
import i18N from "@strapi/plugin-i18n/strapi-admin";
import usersPermissions from "@strapi/plugin-users-permissions/strapi-admin";
import { renderAdmin } from "@strapi/strapi/admin";

import customisations from "../../src/admin/app.tsx";

renderAdmin(document.getElementById("strapi"), {
  customisations,

  plugins: {
    ckeditor5: ckeditor5,
    "strapi-plugin-sso": strapiPluginSso,
    "strapi-cloud": strapiCloud,
    graphql: graphql,
    i18n: i18N,
    "users-permissions": usersPermissions,
  },
});
