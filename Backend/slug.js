const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

const generateUniqueSlug = async (prisma, model, text, excludeId = null) => {
    let slug = generateSlug(text);
    let counter = 0;
    let unique = false;

    while (!unique) {
        const testSlug = counter === 0 ? slug : `${slug}-${counter}`;
        const existing = await prisma[model].findUnique({ where: { slug: testSlug } });
        if (!existing || (excludeId && existing.id === excludeId)) {
            slug = testSlug;
            unique = true;
        } else {
            counter++;
        }
    }
    return slug;
};

module.exports = { generateSlug, generateUniqueSlug };