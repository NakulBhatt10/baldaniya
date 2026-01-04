export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  pieces: number;
  buildTime: string;
  dimensions: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  images: string[];
  description: string;
  inTheBox: string[];
  featured?: boolean;
  bestseller?: boolean;
}

export const products: Product[] = [
  // Wooden Puzzle (7)
  {
    id: 'wp-001',
    slug: 'Puzzle Education Toys',
    name: 'Puzzle Education Toys',
    price: 300,
    originalPrice: 1599,
    category: 'Wooden Puzzle',
    difficulty: 'Medium',
    pieces: 1,
    buildTime: '3-4 days',
    dimensions: '25 x 12 x 10 cm',
    stockStatus: 'In Stock',
    images: ['/kids.png','/kids2.png','/kids3.png'],
    description: 'kids play',
    inTheBox: ['.'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'wp-002',
    slug: 'Wooden Game',
    name: 'Wooden Game',
    price: 200,
    category: 'Wooden Puzzle',
    difficulty: 'Hard',
    pieces: 500,
    buildTime: '5-6 days',
    dimensions: '35 x 10 x 15 cm',
    stockStatus: 'In Stock',
    images: ['/game.png'],
    description: 'games!',
    inTheBox: ['234 MDF pieces', 'Detailed manual', 'Sandpaper', 'Wood glue sample'],
    bestseller: true,
  },
  {
    id: 'wp-003',
    slug: 'HandCart MDF 3D puzzle',
    name: 'HandCart MDF 3D puzzle',
    price: 150,
    category: 'Wooden Puzzle',
    difficulty: 'Expert',
    pieces: 100,
    buildTime: '2-3 days',
    dimensions: '40 x 35 x 12 cm',
    stockStatus: 'In Stock',
    images: ['/gadi1.png','/gadi2.png','/gadi3.png'],
    description: 'Set sail on a crafting adventure with this majestic sailing ship. Features working rigging and incredible attention to nautical detail.',
    inTheBox: [ 'Rigging thread', 'Assembly guide', 'Display base'],
    featured: true,
  },
  {
    id: 'wp-004',
    slug: 'MDF Fruit Puzzle',
    name: 'MDF Fruit Puzzle',
    price: 120,
    category: 'Wooden Puzzle',
    difficulty: 'Easy',
    pieces: 10,
    buildTime: '1-2 days',
    dimensions: '12 x 10 x 15 cm',
    stockStatus: 'In Stock',
    images: ['/food1.png','/food2.png'],
    description: 'A charming owl puzzle perfect for beginners. Makes a delightful desk ornament or bookshelf decoration.',
    inTheBox: ['68 MDF pieces', 'Quick start guide', 'Sandpaper'],
  },
  {
    id: 'wp-005',
    slug: 'Wooden Animal Puzzle Circle Cats',
    name: 'Wooden Animal Puzzle Circle Cats',
    price: 120,
    category: 'Wooden Puzzle',
    difficulty: 'Medium',
    pieces: 15,
    buildTime: '4-5 days',
    dimensions: '15 x 15 x 45 cm',
    stockStatus: 'Low Stock',
    images: ['/woodanimal1.png','/woodanimal2.png','/woodanimal3.png'],
    description: 'Recreate the iconic Paris landmark in stunning MDF detail. A must-have for architecture enthusiasts.',
    inTheBox: ['189 MDF pieces', 'Assembly manual', 'LED light kit', 'Base plate'],
    bestseller: true,
  },
  {
    id: 'wp-006',
    slug: 'Wooden Geometric Shape Sorter Puzzle',
    name: 'Wooden Geometric Shape Sorter Puzzle',
    price: 1000,
    category: 'Wooden Puzzle',
    difficulty: 'Hard',
    pieces: 1,
    buildTime: 'build according to the orders',
    dimensions: '30 x 12 x 18 cm',
    stockStatus: 'In Stock',
    images: ['/woodengeom1.png','/woodengeom2.png','/woodengeom3.png','/woodengeom4.png','/woodengeom5.png'],
    description: 'A stunning cruiser motorcycle with movable wheels and kickstand. Perfect for bike enthusiasts.',
    inTheBox: ['201 MDF pieces', 'Rubber bands', 'Assembly guide', 'Display stand'],
  },
  {
    id: 'wp-007',
    slug: 'MDF Animal Square Puzzle',
    name: 'MDF Animal Square Puzzle',
    price: 120,
    category: 'Wooden Puzzle',
    difficulty: 'Expert',
    pieces: 7,
    buildTime: '2-3 days',
    dimensions: '45 x 30 x 25 cm',
    stockStatus: 'In Stock',
    images: ['/animal1.png','animal2.png'],
    description: 'Bring fantasy to life with this incredible dragon puzzle. Features articulated wings and intricate scale details.',
    inTheBox: ['356 MDF pieces', 'Wing supports', 'Detailed manual', 'Display base'],
    featured: true,
  },



  {
    id: 'dsg-002',
    slug: 'MDF Laser Cutting Services',
    name: 'MDF Laser Cutting Services',
    price: 120,
    category: 'Designing Service',
    difficulty: 'Hard',
    pieces: 1,
    buildTime: '4-5 days',
    dimensions: 'Custom',
    stockStatus: 'In Stock',
    images: ['/laser1.png','/laser2.png','/laser3.png'],
    description: 'Baldaniya.com is a leading manufacturer and service provider of Promotional Stand, Promotional Mouse Pad, Printed Sipper Bottle, Promotional Gazebo Canopy, Hanging Roll Up Banner, Printing Service and Designing Service.',
    inTheBox: ['Custom MDF pieces', 'Assembly guide', 'Frame stand'],
  },

  {
    id: 'dsg-004',
    slug: 'Pooja Mandir Design',
    name: 'Pooja Mandir Design',
    price: 350,
    category: 'Designing Service',
    difficulty: 'Medium',
    pieces: 1,
    buildTime: '3-4 days',
    dimensions: 'Custom',
    stockStatus: 'In Stock',
    images: ['/mandir1.png','/mandir2.png','/mandir3.png'],
    description: 'Small Pooja Room is the design where minimalistic style is the focus, the design is planned with fewer materials. A simple temple made out of wood with multipurpose storage or wall shelves is used. This is done to have a compact pooja room design.',
    inTheBox: [ 'Branded packaging', 'Assembly guide'],
  },

  // Puzzle Game (4)
  {
    id: 'pg-001',
    slug: 'Animal Rectangle Puzzle 9pcs',
    name: 'Animal Rectangle Puzzle 9pcs',
    price: 120,
    category: 'Puzzle Game',
    difficulty: 'Medium',
    pieces: 100,
    buildTime: 'N/A',
    dimensions: 'custom',
    stockStatus: 'In Stock',
    images: ['/agame1.png','/agame2.png','/agame3.png'],
    description: 'Unlock your child’s imagination and learning potential with our MDF Wooden Puzzle Games—designed to combine fun, education, and safety in one delightful package. ',
    inTheBox: ['.'],
    bestseller: true,
  },
  {
    id: 'pg-002',
    slug: 'MDF Dinosaur Square Puzzle',
    name: 'MDF Dinosaur Square Puzzle',
    price: 100,
    category: 'Puzzle Game',
    difficulty: 'Easy',
    pieces: 100,
    buildTime: 'N/A',
    dimensions: '20 x 20 cm',
    stockStatus: 'In Stock',
    images: ['/dino1.png','/dino2.png','/dino3.png'],
    description: 'Unlock your child’s imagination and learning potential with our MDF Wooden Puzzle Games—designed to combine fun, education, and safety in one delightful package.',
    inTheBox: ['.'],
  },
  {
    id: 'pg-003',
    slug: 'MDF Puzzle Sea Plane',
    name: 'MDF Puzzle Sea Plane',
    price: 120,
    category: 'Puzzle Game',
    difficulty: 'Hard',
    pieces: 100,
    buildTime: 'N/A',
    dimensions: 'custom',
    stockStatus: 'In Stock',
    images: ['/plane1.png','/plane2.png'],
    description: 'Crafted from durable, eco-friendly MDF wood, these puzzles are perfect for toddlers and young children, helping them develop essential skills while enjoying hands-on play.',
    inTheBox: ['.'],
  },
  {
    id: 'pg-004',
    slug: 'MDF Fighter plane 3D Puzzle',
    name: 'MDF Fighter plane 3D Puzzle',
    price: 120,
    category: 'Puzzle Game',
    difficulty: 'Expert',
    pieces: 100,
    buildTime: '2 days',
    dimensions: 'custom',
    stockStatus: 'In Stock',
    images: ['/planee1.png','/planee2.png','/planee3.png','/planee4.png'],
    description: 'Unlock your child’s imagination and learning potential with our MDF Wooden Puzzle Games—designed to combine fun, education, and safety in one delightful package.',
    inTheBox: ['.'],
  },

  {
    id: 'wb-002',
    slug: 'Wooden Educational Toy',
    name: 'Wooden Educational Toy',
    price: 100,
    category: 'Wooden Bed',
    difficulty: 'Medium',
    pieces: 100,
    buildTime: '2 days',
    dimensions: 'custom',
    stockStatus: 'In Stock',
    images: ['/bt1.png','/bt2.png','/bt3.png','/bt4.png'],
    description: 'toy',
    inTheBox: ['.'],
    bestseller: true,
  },

];

export const categories = [
  'Wooden Puzzle',

  'Designing Service',
  'Puzzle Game',


] as const;

export type Category = typeof categories[number];

export const getCategoryCount = (category: string): number => {
  return products.filter(p => p.category === category).length;
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getBestsellers = (): Product[] => {
  return products.filter(p => p.bestseller);
};
