/**
 * Browser-safe usage of process
 */
var defaultEnvironment = "production";
var env = typeof process === "undefined" || process.env === undefined
    ? defaultEnvironment
    : process.env.NODE_ENV || defaultEnvironment;

export { env };
