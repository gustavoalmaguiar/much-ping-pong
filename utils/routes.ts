/**
 * The default sign-in URL.
 * @type {string}
 */
export const DEFAULT_SIGNIN_URL = "/signin";

/**
 * An array of routes that are used for authentication.
 * @type {string[]}
 */
export const authRoutes = [DEFAULT_SIGNIN_URL];

/**
 * The prefix for the API authentication routes.
 * Routes that are prefixed with this are used for authentication
 * purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect URL for authenticated users.
 * @type {string}
 */
export const DEFAULT_REDIRECT_URL = "/";
