module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors);
    }
}