const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    const message = error.message || "Something went wrong";

    // Provide additional details in development mode
    const response = {
        status: statusCode,
        message: message,
    };

    // Only include the error stack in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = error.stack;
    }

    res.status(statusCode).json(response);
};

export default errorHandler;
