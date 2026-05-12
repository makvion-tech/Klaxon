const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');
const { generateToken } = require('../utils/jwt');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase() } });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        const token = generateToken({ id: admin.id, email: admin.email, role: admin.role });

        res.json({
            success: true,
            message: 'Login successful.',
            data: {
                token,
                admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
            },
        });
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res, next) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id: req.admin.id },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });
        res.json({ success: true, data: admin });
    } catch (err) {
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        const hashed = await bcrypt.hash(newPassword, 12);
        await prisma.admin.update({ where: { id: admin.id }, data: { password: hashed } });

        res.json({ success: true, message: 'Password changed successfully.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { login, getMe, changePassword };