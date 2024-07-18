/**
 * auth router for login and create accounts
 * @type {string[]}   
 */

export const AuthRouter = [
    "/en/login",
    "/kiny/login",
    "/en/register",
    "/kiny/register",
    "/en/forgetPassword",
    "/kiny/forgetPassword",
];

/**
 * public router for public pages
 * @type {string[]}
 */

export const PublicRouter = [
    "/en",
    "/kiny",
]

/**
 * the default auth router
 * @type {string}
 */

export const AuthDefault = "/api";

export const DefaultRoute = "/en"