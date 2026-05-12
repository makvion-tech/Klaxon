const prisma = require('../utils/prisma');

const createInquiry = async (req, res, next) => {
    try {
        const inquiry = await prisma.inquiry.create({ data: req.body });
        res.status(201).json({
            success: true,
            message: 'Your inquiry has been received. Our export team will contact you within 24 hours.',
            data: inquiry,
        });
    } catch (err) {
        next(err);
    }
};

const getAllInquiries = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const where = status ? { status } : {};

        const [inquiries, total] = await Promise.all([
            prisma.inquiry.findMany({
                where,
                include: { product: { select: { id: true, name: true } } },
                orderBy: { createdAt: 'desc' },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            }),
            prisma.inquiry.count({ where }),
        ]);

        res.json({ success: true, data: inquiries, pagination: { page: Number(page), total } });
    } catch (err) {
        next(err);
    }
};

const updateInquiryStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const inquiry = await prisma.inquiry.update({
            where: { id: req.params.id },
            data: { status },
        });
        res.json({ success: true, data: inquiry });
    } catch (err) {
        next(err);
    }
};

module.exports = { createInquiry, getAllInquiries, updateInquiryStatus };