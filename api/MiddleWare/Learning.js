/**
 * Middleware in javascript are methods which are having access to req, res object and next method
 * Middleware are used for varios purposes
 * 1.Middleware are used for authorization 
 * 2.They can be used to change req, res method
 * 3.They can be used for error handling
 * 
 * 
 * We can use next method to invoke next middleware in call stack
 * if will use next(error) it will skip all the middleware and catch one with error handled
 * we can also use next method when we don't want to go in req, res cycle
 * 
 */