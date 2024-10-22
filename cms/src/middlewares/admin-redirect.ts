 export default (_config, {strapi}) => {
    
    const redirects = ['/','/index.html','/admin/auth/login','/login'].map((path) => ({
        method: 'GET',
        path,
        handler: (ctx) => ctx.redirect('/strapi-plugin-sso/keycloak'),
        config: { auth: false},
    }));

    strapi.server.routes(redirects);
} 