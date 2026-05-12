require('dotenv').config({ path: '../.env' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const categories = [
    { name: 'Oilseeds', slug: 'oilseeds', description: 'Premium quality oilseeds for global markets', icon: '🌱' },
    { name: 'Nuts & Kernels', slug: 'nuts-kernels', description: 'Export-grade nuts and kernels', icon: '🥜' },
    { name: 'Spices & Herbs', slug: 'spices-herbs', description: 'Aromatic spices and medicinal herbs', icon: '🌿' },
    { name: 'Cocoa & Beverages', slug: 'cocoa-beverages', description: 'Fine cocoa and beverage crops', icon: '🍫' },
    { name: 'Roots & Tubers', slug: 'roots-tubers', description: 'Starchy staples and derivatives', icon: '🌾' },
    { name: 'Botanicals', slug: 'botanicals', description: 'Natural botanical extracts and flowers', icon: '🌺' },
];

const products = [
    {
        name: 'Sesame Seed (Natural)',
        slug: 'sesame-seed-natural',
        description: 'Premium Nigerian Sesame Seeds sourced from the best farmlands in Benue, Nasarawa, and Kogi States. Our sesame seeds are sun-dried, machine-cleaned, and triple-sorted to achieve superior purity standards demanded by international buyers. Rich in oil content and ideal for oil extraction, food processing, and pharmaceutical applications.',
        origin: 'Nigeria (Benue, Nasarawa, Kogi)',
        unit: 'MT',
        minOrder: '25 MT',
        moisture: 'Max 6%',
        purity: '99.5% min',
        grade: 'Export Grade A',
        packaging: '25kg or 50kg PP bags / Bulk',
        isAvailable: true,
        isFeatured: true,
        categorySlug: 'oilseeds',
        imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800',
    },
    {
        name: 'Shea Butter (Grade A)',
        slug: 'shea-butter-grade-a',
        description: 'Unrefined, raw Shea Butter sourced from the Savannah belt of West Africa. Cold-pressed and minimally processed to retain maximum nutritional and cosmetic properties. Our Shea Butter meets international cosmetic and food industry standards, with consistent quality backed by laboratory testing and third-party certification.',
        origin: 'Nigeria (Northern Region)',
        unit: 'MT',
        minOrder: '5 MT',
        moisture: 'Max 0.2%',
        purity: '98% min',
        grade: 'Grade A Unrefined',
        packaging: '25kg cartons / Drums / IBC Tanks',
        isAvailable: true,
        isFeatured: true,
        categorySlug: 'oilseeds',
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800',
    },
    {
        name: 'Cashew Nuts (W320)',
        slug: 'cashew-nuts-w320',
        description: 'Premium W320 grade cashew kernels processed in our state-of-the-art facility. Sourced from certified farms in Oyo and Kwara States. Our cashews undergo rigorous grading, roasting, and quality inspection processes. W320 grade means 320 kernels per pound — perfect for international confectionery and snack markets.',
        origin: 'Nigeria (Oyo, Kwara, Kogi)',
        unit: 'MT',
        minOrder: '5 MT',
        moisture: 'Max 5%',
        purity: 'W320 Standard',
        grade: 'W320 Export Grade',
        packaging: '10kg vacuum tins / 50lb bags',
        isAvailable: true,
        isFeatured: true,
        categorySlug: 'nuts-kernels',
        imageUrl: 'https://images.unsplash.com/photo-1563208723-30d978f53f04?w=800',
    },
    {
        name: 'Hibiscus Flower (Roselle)',
        slug: 'hibiscus-flower-roselle',
        description: 'Premium dried Hibiscus Sabdariffa (Zobo) flowers hand-harvested from certified organic farms in Kano and Kaduna States. Known globally as Roselle, our hibiscus flowers have deep crimson colour, high anthocyanin content, and natural tartness prized by food and beverage manufacturers worldwide. Used in herbal teas, natural colorants, pharmaceuticals, and cosmetics.',
        origin: 'Nigeria (Kano, Kaduna, Jigawa)',
        unit: 'MT',
        minOrder: '1 MT',
        moisture: 'Max 12%',
        purity: '98% min',
        grade: 'Export Grade A',
        packaging: '25kg bales / 50kg jute bags',
        isAvailable: true,
        isFeatured: false,
        categorySlug: 'botanicals',
        imageUrl: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800',
    },
    {
        name: 'Cocoa Beans (Grade 1)',
        slug: 'cocoa-beans-grade-1',
        description: 'Fine-flavor Grade 1 fermented and sun-dried cocoa beans from the premium cocoa belt of Southwest Nigeria. Our cocoa is sourced from cooperatives in Ondo, Osun, and Cross River States. Full fermentation (6-7 days), proper drying, and rigorous grading ensure beans with exceptional chocolate flavor profiles beloved by artisan chocolatiers and industrial processors alike.',
        origin: 'Nigeria (Ondo, Osun, Cross River)',
        unit: 'MT',
        minOrder: '20 MT',
        moisture: 'Max 7.5%',
        purity: 'Grade 1 NCMB',
        grade: 'Grade 1 (CODEX)',
        packaging: '60kg sisal/jute bags / Bulk Containers',
        isAvailable: true,
        isFeatured: true,
        categorySlug: 'cocoa-beverages',
        imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b9dc7b2cb?w=800',
    },
    {
        name: 'Cassava Flour (HQCF)',
        slug: 'cassava-flour-hqcf',
        description: 'High Quality Cassava Flour (HQCF) milled from premium sweet cassava varieties. Our processing facility produces flour that meets CODEX STAN 176 international standards. Suitable for partial or complete wheat flour substitution in bread, biscuits, noodles, and industrial starch applications. Available in food-grade and industrial grades.',
        origin: 'Nigeria (Ogun, Oyo, Benue)',
        unit: 'MT',
        minOrder: '10 MT',
        moisture: 'Max 13%',
        purity: 'CODEX STAN 176',
        grade: 'Food Grade / Industrial',
        packaging: '25kg or 50kg kraft bags / Bulk',
        isAvailable: true,
        isFeatured: false,
        categorySlug: 'roots-tubers',
        imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800',
    },
    {
        name: 'Turmeric Root (Dried)',
        slug: 'turmeric-root-dried',
        description: 'Premium dried and polished Turmeric (Curcuma longa) from certified farms in Kaduna and Kano. Our turmeric has exceptionally high curcumin content (5-6%), making it one of the most potent varieties available on the international market. Processed using modern GMP-compliant methods and tested for heavy metals, pesticides, and microbial contamination.',
        origin: 'Nigeria (Kaduna, Kano)',
        unit: 'MT',
        minOrder: '1 MT',
        moisture: 'Max 10%',
        purity: 'Curcumin 5-6%',
        grade: 'Export Grade Polished',
        packaging: '25kg PP woven bags / 50kg jute bags',
        isAvailable: true,
        isFeatured: false,
        categorySlug: 'spices-herbs',
        imageUrl: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800',
    },
];

async function seed() {
    console.log('🌱 Starting database seed...');

    // Create admin
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 12);
    const admin = await prisma.admin.upsert({
        where: { email: process.env.ADMIN_EMAIL || 'admin@klaxonfordagric.com' },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL || 'admin@klaxonfordagric.com',
            password: hashedPassword,
            name: process.env.ADMIN_NAME || 'Klaxon Ford Admin',
            role: 'SUPER_ADMIN',
        },
    });
    console.log('✅ Admin created:', admin.email);

    // Create categories
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    console.log('✅ Categories seeded');

    // Create products
    for (const product of products) {
        const { categorySlug, ...productData } = product;
        const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
        if (category) {
            await prisma.product.upsert({
                where: { slug: productData.slug },
                update: {},
                create: { ...productData, categoryId: category.id },
            });
        }
    }
    console.log('✅ Products seeded');

    // Create sample feedbacks
    const allProducts = await prisma.product.findMany({ take: 3 });
    const feedbacks = [
        { name: 'Chen Wei', email: 'chen@example.com', rating: 5, comment: 'Exceptional quality sesame seeds. Purity far exceeded our expectations. Will order again.', isApproved: true },
        { name: 'Marco Rossi', email: 'marco@example.com', rating: 5, comment: 'Premium shea butter. Our cosmetics line has seen incredible results. Highly recommended supplier.', isApproved: true },
        { name: 'Amara Diallo', email: 'amara@example.com', rating: 4, comment: 'Good quality cocoa beans with excellent fermentation. Consistent supply chain and professional team.', isApproved: true },
    ];

    for (let i = 0; i < feedbacks.length && i < allProducts.length; i++) {
        await prisma.feedback.create({
            data: { ...feedbacks[i], productId: allProducts[i].id },
        });
    }
    console.log('✅ Feedbacks seeded');

    console.log('\n🎉 Database seed completed successfully!');
    console.log('📧 Admin Email:', process.env.ADMIN_EMAIL || 'admin@klaxonfordagric.com');
    console.log('🔑 Admin Password:', process.env.ADMIN_PASSWORD || 'Admin@123456');
}

seed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());