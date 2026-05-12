const prisma = require('../utils/prisma');

const createFeedback = async (req, res, next) => {
    try {
        const { productId, name, email, rating, comment } = req.body;

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

        const feedback = await prisma.feedback.create({
            data: { productId, name, email, rating: Number(rating), comment },
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for your feedback! It will be reviewed shortly.',
            data: feedback,
        });
    } catch (err) {
        next(err);
    }
};

const getAllFeedback = async (req, res, next) => {
    try {
        const { approved, page = 1, limit = 20 } = req.query;
        const where = {};
        if (approved !== undefined) where.isApproved = approved === 'true';

        const [feedbacks, total] = await Promise.all([
            prisma.feedback.findMany({
                where,
                include: { product: { select: { id: true, name: true, slug: true } } },
                orderBy: { createdAt: 'desc' },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            }),
            prisma.feedback.count({ where }),
        ]);

        res.json({ success: true, data: feedbacks, pagination: { page: Number(page), total } });
    } catch (err) {
        next(err);
    }
};

const approveFeedback = async (req, res, next) => {
    try {
        const feedback = await prisma.feedback.update({
            where: { id: req.params.id },
            data: { isApproved: true },
        });
        res.json({ success: true, message: 'Feedback approved.', data: feedback });
    } catch (err) {
        next(err);
    }
};

const deleteFeedback = async (req, res, next) => {
    try {
        await prisma.feedback.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: 'Feedback deleted.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createFeedback, getAllFeedback, approveFeedback, deleteFeedback };