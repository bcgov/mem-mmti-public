export default ({ env }) => ({
    graphql: {
        enabled: true,
        config: {
            defaultLimit: 50,
            maxLimit: 100
        }
    },
    'strapi-plugin-sso': {
        enabled: true,
        config: {
            // Keycloak
            KEYCLOAK_DOMAIN: env('KEYCLOAK_URL'),
            KEYCLOAK_REALM:  env('KEYCLOAK_REALM'),
            KEYCLOAK_CLIENT_ID: env('KEYCLOAK_CLIENT_ID'),
            KEYCLOAK_CLIENT_SECRET: env('KEYCLOAK_CLIENT_SECRET'),
            KEYCLOAK_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso/keycloak/callback',
            KEYCLOAK_STRAPI_SUPER_ADMIN_ROLE: 'strapi.super_admin',
            KEYCLOAK_STRAPI_EDITOR_ROLE: 'strapi.editor',
            KEYCLOAK_STRAPI_AUTHOR_ROLE: 'strapi.author',
            KEYCLOAK_REQUIRE_EMAIL_VERIFICATION: false,
        },
    },
});
