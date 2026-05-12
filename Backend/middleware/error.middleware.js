const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Prisma errors
    if (err.code === 'P2002') {
        statusCode = 409;
        message = `A record with this ${err.meta?.target?.join(', ')} already exists.`;
    }
    if (err.code === 'P2025') {
        statusCode = 404;
        message = 'Record not found.';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid authentication token.';
    }
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Authentication token has expired.';
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
    }

    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = { notFound, errorHandler };