const prisma = require('../utils/prisma');
const { generateUniqueSlug } = require('../utils/slug');

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: categories });
    } catch (err) {
        next(err);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name, description, icon } = req.body;
        const slug = await generateUniqueSlug(prisma, 'category', name);
        const category = await prisma.category.create({ data: { name, slug, description, icon } });
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.name) data.slug = await generateUniqueSlug(prisma, 'category', data.name, id);
        const category = await prisma.category.update({ where: { id }, data });
        res.json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        await prisma.category.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: 'Category deleted.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };