module.exports = () => ({
    'strapi-plugin-sso': {
    enabled: true,
    config: {
        // OpenID Connect
      OIDC_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso/oidc/callback', // URI after successful login
      OIDC_CLIENT_ID: 'nrpti-4869',     
      OIDC_CLIENT_SECRET: '[Client Secret from OpenID Provider]',
      
      OIDC_SCOPES: 'openid profile email', // https://oauth.net/2/scope/
      // API Endpoints required for OIDC
      OIDC_AUTHORIZATION_ENDPOINT: 'https://dev.loginproxy.gov.bc.ca/auth', 
      OIDC_TOKEN_ENDPOINT: '[API Endpoint]',
      OIDC_USER_INFO_ENDPOINT: '[API Endpoint]',
      OIDC_USER_INFO_ENDPOINT_WITH_AUTH_HEADER: false,
      OIDC_GRANT_TYPE: 'authorization_code', // https://oauth.net/2/grant-types/
      // customizable username arguments
      OIDC_FAMILY_NAME_FIELD: 'family_name',
      OIDC_GIVEN_NAME_FIELD: 'given_name'
    }}
});
