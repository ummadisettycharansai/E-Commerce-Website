import { PrismaClient, Role, Size, Color, OrderStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 't-shirts' }, update: {}, create: { name: 'T-Shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' } }),
    prisma.category.upsert({ where: { slug: 'shirts' }, update: {}, create: { name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' } }),
    prisma.category.upsert({ where: { slug: 'jeans' }, update: {}, create: { name: 'Jeans', slug: 'jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' } }),
    prisma.category.upsert({ where: { slug: 'shoes' }, update: {}, create: { name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' } }),
    prisma.category.upsert({ where: { slug: 'accessories' }, update: {}, create: { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' } }),
  ]);

  const [tshirts, shirts, jeans, shoes, accessories] = categories;

  // Admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mensshop.com' },
    update: {},
    create: { email: 'admin@mensshop.com', password: adminPassword, name: 'Admin User', role: Role.ADMIN },
  });

  // Regular users
  const userPassword = await bcrypt.hash('User@123', 10);
  const users = await Promise.all([
    prisma.user.upsert({ where: { email: 'john@example.com' }, update: {}, create: { email: 'john@example.com', password: userPassword, name: 'John Smith', phone: '+1234567890' } }),
    prisma.user.upsert({ where: { email: 'mike@example.com' }, update: {}, create: { email: 'mike@example.com', password: userPassword, name: 'Mike Johnson', phone: '+1234567891' } }),
    prisma.user.upsert({ where: { email: 'david@example.com' }, update: {}, create: { email: 'david@example.com', password: userPassword, name: 'David Brown', phone: '+1234567892' } }),
    prisma.user.upsert({ where: { email: 'chris@example.com' }, update: {}, create: { email: 'chris@example.com', password: userPassword, name: 'Chris Wilson', phone: '+1234567893' } }),
    prisma.user.upsert({ where: { email: 'alex@example.com' }, update: {}, create: { email: 'alex@example.com', password: userPassword, name: 'Alex Davis', phone: '+1234567894' } }),
  ]);

  // Products
  const productData = [
    // T-Shirts (6)
    { name: 'Classic White Crew Neck Tee', slug: 'classic-white-crew-neck-tee', description: 'Premium cotton crew neck t-shirt, perfect for everyday wear.', price: 29.99, salePrice: null, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'], categoryId: tshirts.id, brand: 'BasicWear', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.WHITE, Color.BLACK, Color.GREY], stock: 150, rating: 4.5, reviewCount: 89, isFeatured: true, tags: ['basic', 'casual', 'cotton'] },
    { name: 'Graphic Print Street Tee', slug: 'graphic-print-street-tee', description: 'Bold graphic print t-shirt for the urban streetwear look.', price: 39.99, salePrice: 29.99, images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600'], categoryId: tshirts.id, brand: 'StreetStyle', sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLACK, Color.WHITE, Color.NAVY], stock: 80, rating: 4.2, reviewCount: 45, isFeatured: false, tags: ['graphic', 'streetwear'] },
    { name: 'V-Neck Slim Fit Tee', slug: 'v-neck-slim-fit-tee', description: 'Slim fit v-neck t-shirt in soft jersey fabric.', price: 34.99, salePrice: null, images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600'], categoryId: tshirts.id, brand: 'FitForm', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.WHITE, Color.NAVY, Color.GREY, Color.BLACK], stock: 120, rating: 4.3, reviewCount: 67, isFeatured: true, tags: ['slim', 'vneck'] },
    { name: 'Polo Collar Tee', slug: 'polo-collar-tee', description: 'Classic polo collar t-shirt with button placket.', price: 44.99, salePrice: 34.99, images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600'], categoryId: tshirts.id, brand: 'ClassicPolo', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.WHITE, Color.NAVY, Color.RED, Color.GREEN], stock: 95, rating: 4.6, reviewCount: 112, isFeatured: true, tags: ['polo', 'classic'] },
    { name: 'Oversized Drop Shoulder Tee', slug: 'oversized-drop-shoulder-tee', description: 'Trendy oversized drop shoulder t-shirt for a relaxed fit.', price: 49.99, salePrice: null, images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600'], categoryId: tshirts.id, brand: 'UrbanFit', sizes: [Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLACK, Color.BEIGE, Color.OLIVE], stock: 60, rating: 4.4, reviewCount: 38, isFeatured: false, tags: ['oversized', 'trendy'] },
    { name: 'Striped Nautical Tee', slug: 'striped-nautical-tee', description: 'Classic nautical stripe pattern t-shirt in breathable cotton.', price: 32.99, salePrice: null, images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600'], categoryId: tshirts.id, brand: 'MarineStyle', sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL], colors: [Color.NAVY, Color.WHITE], stock: 75, rating: 4.1, reviewCount: 29, isFeatured: false, tags: ['striped', 'nautical'] },
    // Shirts (6)
    { name: 'Oxford Button-Down Shirt', slug: 'oxford-button-down-shirt', description: 'Classic Oxford weave button-down shirt, versatile for work or weekend.', price: 69.99, salePrice: null, images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600'], categoryId: shirts.id, brand: 'OxfordCo', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.WHITE, Color.BLUE, Color.NAVY], stock: 100, rating: 4.7, reviewCount: 156, isFeatured: true, tags: ['oxford', 'formal', 'classic'] },
    { name: 'Linen Summer Shirt', slug: 'linen-summer-shirt', description: 'Lightweight linen shirt perfect for warm weather.', price: 79.99, salePrice: 59.99, images: ['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600'], categoryId: shirts.id, brand: 'LinenLife', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.WHITE, Color.BEIGE, Color.OLIVE], stock: 85, rating: 4.5, reviewCount: 78, isFeatured: true, tags: ['linen', 'summer', 'casual'] },
    { name: 'Flannel Check Shirt', slug: 'flannel-check-shirt', description: 'Warm flannel check shirt for casual autumn looks.', price: 64.99, salePrice: null, images: ['https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600'], categoryId: shirts.id, brand: 'WoodlandWear', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.RED, Color.NAVY, Color.GREEN], stock: 70, rating: 4.3, reviewCount: 54, isFeatured: false, tags: ['flannel', 'check', 'casual'] },
    { name: 'Slim Fit Dress Shirt', slug: 'slim-fit-dress-shirt', description: 'Tailored slim fit dress shirt for formal occasions.', price: 89.99, salePrice: 69.99, images: ['https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600'], categoryId: shirts.id, brand: 'TailorMade', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.WHITE, Color.BLUE, Color.BLACK], stock: 90, rating: 4.8, reviewCount: 203, isFeatured: true, tags: ['formal', 'slim', 'dress'] },
    { name: 'Denim Shirt', slug: 'denim-shirt', description: 'Classic denim shirt that pairs well with chinos or jeans.', price: 74.99, salePrice: null, images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600'], categoryId: shirts.id, brand: 'DenimCo', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLUE, Color.BLACK], stock: 65, rating: 4.4, reviewCount: 91, isFeatured: false, tags: ['denim', 'casual'] },
    { name: 'Hawaiian Print Shirt', slug: 'hawaiian-print-shirt', description: 'Vibrant Hawaiian print shirt for vacation vibes.', price: 54.99, salePrice: 44.99, images: ['https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600'], categoryId: shirts.id, brand: 'IslandStyle', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLUE, Color.GREEN, Color.RED], stock: 55, rating: 4.0, reviewCount: 33, isFeatured: false, tags: ['hawaiian', 'vacation', 'print'] },
    // Jeans (6)
    { name: 'Slim Fit Dark Wash Jeans', slug: 'slim-fit-dark-wash-jeans', description: 'Classic slim fit jeans in dark wash denim, versatile for any occasion.', price: 89.99, salePrice: null, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'], categoryId: jeans.id, brand: 'DenimKing', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BLUE, Color.BLACK], stock: 110, rating: 4.6, reviewCount: 178, isFeatured: true, tags: ['slim', 'dark wash', 'denim'] },
    { name: 'Relaxed Fit Straight Jeans', slug: 'relaxed-fit-straight-jeans', description: 'Comfortable relaxed fit straight leg jeans for everyday wear.', price: 79.99, salePrice: 64.99, images: ['https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600'], categoryId: jeans.id, brand: 'ComfortDenim', sizes: [Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLUE, Color.GREY], stock: 95, rating: 4.4, reviewCount: 122, isFeatured: false, tags: ['relaxed', 'straight', 'comfortable'] },
    { name: 'Skinny Ripped Jeans', slug: 'skinny-ripped-jeans', description: 'Trendy skinny jeans with distressed ripped details.', price: 94.99, salePrice: 74.99, images: ['https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600'], categoryId: jeans.id, brand: 'StreetDenim', sizes: [Size.XS, Size.S, Size.M, Size.L], colors: [Color.BLUE, Color.BLACK], stock: 70, rating: 4.2, reviewCount: 87, isFeatured: true, tags: ['skinny', 'ripped', 'trendy'] },
    { name: 'Cargo Denim Jeans', slug: 'cargo-denim-jeans', description: 'Utility-inspired cargo jeans with multiple pockets.', price: 99.99, salePrice: null, images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600'], categoryId: jeans.id, brand: 'UtilityWear', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLACK, Color.OLIVE], stock: 60, rating: 4.3, reviewCount: 56, isFeatured: false, tags: ['cargo', 'utility', 'pockets'] },
    { name: 'Light Wash Bootcut Jeans', slug: 'light-wash-bootcut-jeans', description: 'Classic bootcut jeans in light wash for a retro look.', price: 84.99, salePrice: null, images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'], categoryId: jeans.id, brand: 'RetroFit', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BLUE], stock: 50, rating: 4.1, reviewCount: 41, isFeatured: false, tags: ['bootcut', 'light wash', 'retro'] },
    { name: 'Black Tapered Jeans', slug: 'black-tapered-jeans', description: 'Modern tapered fit black jeans for a sleek silhouette.', price: 94.99, salePrice: 79.99, images: ['https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600'], categoryId: jeans.id, brand: 'ModernFit', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BLACK], stock: 80, rating: 4.5, reviewCount: 99, isFeatured: true, tags: ['tapered', 'black', 'modern'] },
    // Shoes (6)
    { name: 'White Leather Sneakers', slug: 'white-leather-sneakers', description: 'Clean white leather sneakers, a timeless wardrobe staple.', price: 129.99, salePrice: null, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'], categoryId: shoes.id, brand: 'SneakerLab', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.WHITE], stock: 90, rating: 4.7, reviewCount: 234, isFeatured: true, tags: ['sneakers', 'white', 'leather'] },
    { name: 'Chelsea Boots', slug: 'chelsea-boots', description: 'Sleek Chelsea boots in genuine leather with elastic side panels.', price: 189.99, salePrice: 149.99, images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600'], categoryId: shoes.id, brand: 'BootMaster', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BLACK, Color.BROWN], stock: 65, rating: 4.8, reviewCount: 167, isFeatured: true, tags: ['boots', 'chelsea', 'leather'] },
    { name: 'Running Athletic Shoes', slug: 'running-athletic-shoes', description: 'High-performance running shoes with cushioned sole.', price: 149.99, salePrice: 119.99, images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600'], categoryId: shoes.id, brand: 'SpeedRun', sizes: [Size.S, Size.M, Size.L, Size.XL, Size.XXL], colors: [Color.BLACK, Color.WHITE, Color.BLUE], stock: 120, rating: 4.6, reviewCount: 312, isFeatured: true, tags: ['running', 'athletic', 'sport'] },
    { name: 'Loafers Slip-On', slug: 'loafers-slip-on', description: 'Comfortable slip-on loafers in suede for smart casual looks.', price: 119.99, salePrice: null, images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600'], categoryId: shoes.id, brand: 'ComfortStep', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BROWN, Color.BLACK, Color.NAVY], stock: 75, rating: 4.4, reviewCount: 89, isFeatured: false, tags: ['loafers', 'slip-on', 'suede'] },
    { name: 'Desert Chukka Boots', slug: 'desert-chukka-boots', description: 'Casual chukka boots in suede, perfect for weekend outings.', price: 159.99, salePrice: 129.99, images: ['https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600'], categoryId: shoes.id, brand: 'DesertWalk', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BEIGE, Color.BROWN], stock: 55, rating: 4.5, reviewCount: 73, isFeatured: false, tags: ['chukka', 'desert', 'suede'] },
    { name: 'Canvas Espadrilles', slug: 'canvas-espadrilles', description: 'Lightweight canvas espadrilles for summer casual wear.', price: 69.99, salePrice: null, images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600'], categoryId: shoes.id, brand: 'SummerStep', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.NAVY, Color.WHITE, Color.BEIGE], stock: 85, rating: 4.2, reviewCount: 48, isFeatured: false, tags: ['espadrilles', 'canvas', 'summer'] },
    // Accessories (6)
    { name: 'Leather Bifold Wallet', slug: 'leather-bifold-wallet', description: 'Slim genuine leather bifold wallet with multiple card slots.', price: 49.99, salePrice: null, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'], categoryId: accessories.id, brand: 'LeatherCraft', sizes: [Size.M], colors: [Color.BLACK, Color.BROWN], stock: 200, rating: 4.6, reviewCount: 145, isFeatured: true, tags: ['wallet', 'leather', 'slim'] },
    { name: 'Aviator Sunglasses', slug: 'aviator-sunglasses', description: 'Classic aviator sunglasses with UV400 protection.', price: 89.99, salePrice: 69.99, images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'], categoryId: accessories.id, brand: 'SunShield', sizes: [Size.M], colors: [Color.BLACK, Color.BROWN], stock: 150, rating: 4.5, reviewCount: 98, isFeatured: true, tags: ['sunglasses', 'aviator', 'uv'] },
    { name: 'Canvas Backpack', slug: 'canvas-backpack', description: 'Durable canvas backpack with laptop compartment.', price: 79.99, salePrice: null, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'], categoryId: accessories.id, brand: 'PackMaster', sizes: [Size.L], colors: [Color.BLACK, Color.NAVY, Color.OLIVE], stock: 80, rating: 4.4, reviewCount: 67, isFeatured: false, tags: ['backpack', 'canvas', 'laptop'] },
    { name: 'Leather Belt', slug: 'leather-belt', description: 'Classic genuine leather belt with silver buckle.', price: 39.99, salePrice: null, images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600'], categoryId: accessories.id, brand: 'BeltCo', sizes: [Size.S, Size.M, Size.L, Size.XL], colors: [Color.BLACK, Color.BROWN], stock: 180, rating: 4.7, reviewCount: 189, isFeatured: false, tags: ['belt', 'leather', 'classic'] },
    { name: 'Wool Beanie Hat', slug: 'wool-beanie-hat', description: 'Warm wool blend beanie hat for cold weather.', price: 29.99, salePrice: 24.99, images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600'], categoryId: accessories.id, brand: 'WarmHead', sizes: [Size.M], colors: [Color.BLACK, Color.GREY, Color.NAVY, Color.RED], stock: 120, rating: 4.3, reviewCount: 56, isFeatured: false, tags: ['beanie', 'wool', 'winter'] },
    { name: 'Stainless Steel Watch', slug: 'stainless-steel-watch', description: 'Minimalist stainless steel watch with leather strap.', price: 199.99, salePrice: 159.99, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'], categoryId: accessories.id, brand: 'TimeCraft', sizes: [Size.M], colors: [Color.BLACK, Color.BROWN], stock: 60, rating: 4.8, reviewCount: 223, isFeatured: true, tags: ['watch', 'steel', 'minimalist'] },
  ];

  const products = [];
  for (const p of productData) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
    products.push(product);
  }

  // Addresses for users
  const addresses = await Promise.all(
    users.map((user, i) =>
      prisma.address.create({
        data: {
          userId: user.id,
          line1: `${100 + i} Main Street`,
          city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i],
          state: ['NY', 'CA', 'IL', 'TX', 'AZ'][i],
          zip: ['10001', '90001', '60601', '77001', '85001'][i],
          country: 'US',
          isDefault: true,
        },
      })
    )
  );

  // Orders with items
  for (let i = 0; i < users.length; i++) {
    const order = await prisma.order.create({
      data: {
        userId: users[i].id,
        addressId: addresses[i].id,
        status: [OrderStatus.DELIVERED, OrderStatus.SHIPPED, OrderStatus.CONFIRMED, OrderStatus.PENDING, OrderStatus.DELIVERED][i],
        total: products[i].price + products[i + 5].price,
        stripePayId: `pi_test_${Math.random().toString(36).substr(2, 9)}`,
        items: {
          create: [
            { productId: products[i].id, quantity: 1, size: 'M', color: 'BLACK', price: products[i].price },
            { productId: products[i + 5].id, quantity: 2, size: 'L', color: 'NAVY', price: products[i + 5].price },
          ],
        },
      },
    });
  }

  // Reviews
  for (let i = 0; i < users.length; i++) {
    await prisma.review.create({
      data: {
        userId: users[i].id,
        productId: products[i].id,
        rating: [5, 4, 5, 3, 4][i],
        comment: [
          'Excellent quality! Fits perfectly and the material is very comfortable.',
          'Great product, fast shipping. Would definitely buy again.',
          'Love the design and the fit. Highly recommend!',
          'Good quality but runs a bit small. Order a size up.',
          'Perfect for everyday wear. Very happy with this purchase.',
        ][i],
      },
    });
  }

  console.log('Seeding complete!');
  console.log('Admin: admin@mensshop.com / Admin@123');
  console.log('Users: john@example.com / User@123 (and others)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
