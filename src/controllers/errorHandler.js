const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.stack || 500).json({ 
        message: 'Server Error' ,
        error: err.message,
        stack: err.stack,
        success: false
    });
};

module.exports = errorHandler;