const {UnauthorizedError} = require('../exceptions/api-error');
const tokenService = require('../users/services/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(UnauthorizedError());
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(UnauthorizedError());
    }
};