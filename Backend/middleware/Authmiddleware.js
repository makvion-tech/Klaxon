const { verifyToken } = require('../utils/jwt');
const prisma = require('../utils/prisma');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Token is no longer valid.' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        next(err);
    }
};

const requireSuperAdmin = (req, res, next) => {
    if (req.admin?.role !== 'SUPER_ADMIN') {
        return res.status(403).json({ success: false, message: 'Access denied. Super admin only.' });
    }
    next();
};

module.exports = { protect, requireSuperAdmin };