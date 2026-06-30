const rateLimit = require("express-rate-limit");

const getClientIp = (req) => {
    const forwarded = req.headers["x-forwarded-for"];

    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    return req.ip;
};

const LoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,

    keyGenerator: (req) => getClientIp(req),

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many login attempts. Try again after 15 minutes.",
        });
    },
});

const RegisterLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,

    keyGenerator: (req) => getClientIp(req),

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many registrations. Try again later.",
        });
    },
});

module.exports = {
    LoginLimiter,
    RegisterLimiter,
};