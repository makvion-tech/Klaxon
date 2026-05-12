const prisma = require('../utils/prisma');
const { generateUniqueSlug } = require('../utils/slug');

const getAllProducts = async (req, res, next) => {
    try {
        const { category, featured, available, search, page = 1, limit = 12 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = {};
        if (category) where.category = { slug: category };
        if (featured === 'true') where.isFeatured = true;
        if (available !== undefined) where.isAvailable = available === 'true';
        if (search) where.name = { contains: search, mode: 'insensitive' };

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    feedbacks: {
                        where: { isApproved: true },
                        select: { rating: true },
                    },
                    _count: { select: { feedbacks: true, inquiries: true } },
                },
                orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
                skip,
                take: Number(limit),
            }),
            prisma.product.count({ where }),
        ]);

        const productsWithRating = products.map((p) => {
            const avgRating =
                p.feedbacks.length > 0
                    ? p.feedbacks.reduce((sum, f) => sum + f.rating, 0) / p.feedbacks.length
                    : 0;
            return { ...p, avgRating: Math.round(avgRating * 10) / 10 };
        });

        res.json({
            success: true,
            data: productsWithRating,
            pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
        });
    } catch (err) {
        next(err);
    }
};

const getProductBySlug = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { slug: req.params.slug },
            include: {
                category: true,
                feedbacks: { where: { isApproved: true }, orderBy: { createdAt: 'desc' } },
                _count: { select: { feedbacks: true, inquiries: true } },
            },
        });

        if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

        const avgRating =
            product.feedbacks.length > 0
                ? product.feedbacks.reduce((sum, f) => sum + f.rating, 0) / product.feedbacks.length
                : 0;

        res.json({ success: true, data: { ...product, avgRating: Math.round(avgRating * 10) / 10 } });
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { categoryId, ...data } = req.body;
        const slug = await generateUniqueSlug(prisma, 'product', data.name);

        const product = await prisma.product.create({
            data: { ...data, slug, categoryId },
            include: { category: true },
        });

        res.status(201).json({ success: true, message: 'Product created successfully.', data: product });
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data.name) {
            data.slug = await generateUniqueSlug(prisma, 'product', data.name, id);
        }

        const product = await prisma.product.update({
            where: { id },
            data,
            include: { category: true },
        });

        res.json({ success: true, message: 'Product updated.', data: product });
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: 'Product deleted.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct };