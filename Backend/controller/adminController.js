const prisma = require('../utils/prisma');

const getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalProducts,
            availableProducts,
            featuredProducts,
            totalCategories,
            totalInquiries,
            pendingInquiries,
            totalFeedbacks,
            pendingFeedbacks,
            recentInquiries,
            recentFeedbacks,
            productsByCategory,
        ] = await Promise.all([
            prisma.product.count(),
            prisma.product.count({ where: { isAvailable: true } }),
            prisma.product.count({ where: { isFeatured: true } }),
            prisma.category.count(),
            prisma.inquiry.count(),
            prisma.inquiry.count({ where: { status: 'PENDING' } }),
            prisma.feedback.count(),
            prisma.feedback.count({ where: { isApproved: false } }),
            prisma.inquiry.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { product: { select: { name: true } } },
            }),
            prisma.feedback.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { product: { select: { name: true } } },
            }),
            prisma.category.findMany({
                include: { _count: { select: { products: true } } },
            }),
        ]);

        res.json({
            success: true,
            data: {
                stats: {
                    totalProducts,
                    availableProducts,
                    featuredProducts,
                    totalCategories,
                    totalInquiries,
                    pendingInquiries,
                    totalFeedbacks,
                    pendingFeedbacks,
                },
                recentInquiries,
                recentFeedbacks,
                productsByCategory,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getDashboardStats };