export const CAMPUS_LOCATIONS = [
  { id: 'all', name: 'All Campus Locations' },
  { id: 'library', name: 'Main Central Library', zone: 'North Campus' },
  { id: 'student_center', name: 'Student Union & Cafeteria', zone: 'Central Quad' },
  { id: 'science_hall', name: 'Science & Engineering Complex', zone: 'West Campus' },
  { id: 'tech_tower', name: 'Computer Science / Tech Tower', zone: 'West Campus' },
  { id: 'business_building', name: 'Business & Management School', zone: 'South Campus' },
  { id: 'sports_arena', name: 'Athletics & Recreation Center', zone: 'East Campus' },
  { id: 'humanities_hall', name: 'Humanities & Arts Auditorium', zone: 'North Campus' },
  { id: 'dorms_quad', name: 'North & South Residence Halls (Dorms)', zone: 'Housing Quad' },
  { id: 'transit_hub', name: 'Campus Bus & Shuttle Hub', zone: 'South Gate' },
  { id: 'medical_center', name: 'Campus Health & Medical Center', zone: 'East Campus' },
  { id: 'other', name: 'Other / Unknown Location', zone: 'General' }
];

export const DROP_OFF_DESKS = [
  {
    id: 'desk-1',
    name: 'Central Library Circulation Desk',
    building: 'Main Central Library, Floor 1 (Lobby)',
    hours: 'Mon - Sun: 7:30 AM - 11:00 PM',
    phone: '(555) 019-2834',
    email: 'library-lostfound@campus.edu',
    badge: 'High Security Storage',
    accepts: ['Electronics', 'IDs & Cards', 'Wallets', 'Keys', 'Books']
  },
  {
    id: 'desk-2',
    name: 'Campus Public Safety & Police HQ',
    building: 'Security Annex Building, Room 104',
    hours: '24/7 Dispatch Available',
    phone: '(555) 019-9110',
    email: 'campus-security@campus.edu',
    badge: 'Valuables & High-Value Items',
    accepts: ['Laptops/Phones', 'Passports/IDs', 'Jewelry', 'Bicycles', 'Cash']
  },
  {
    id: 'desk-3',
    name: 'Student Union Information Desk',
    building: 'Student Union Center, Main Atrium',
    hours: 'Mon - Fri: 8:00 AM - 9:00 PM | Sat: 10:00 AM - 6:00 PM',
    phone: '(555) 019-4421',
    email: 'studentunion-desk@campus.edu',
    badge: 'Fast Pickup',
    accepts: ['Water Bottles', 'Jackets/Apparel', 'Umbrellas', 'Stationery', 'Backpacks']
  },
  {
    id: 'desk-4',
    name: 'Recreation & Athletic Center Desk',
    building: 'Sports Complex, Front Turnstiles',
    hours: 'Mon - Sun: 6:00 AM - 10:00 PM',
    phone: '(555) 019-7750',
    email: 'rec-lostfound@campus.edu',
    badge: 'Gym & Sports Gear',
    accepts: ['Gym Bags', 'Water Bottles', 'Earbuds', 'Sporting Equipment', 'Watches']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Grid' },
  { id: 'electronics', name: 'Electronics & Gadgets', icon: 'Laptop' },
  { id: 'cards_ids', name: 'IDs, Badges & Cards', icon: 'CreditCard' },
  { id: 'keys', name: 'Keys & Keychains', icon: 'Key' },
  { id: 'wallets_bags', name: 'Wallets, Purses & Bags', icon: 'Briefcase' },
  { id: 'books_study', name: 'Books, Notes & Stationery', icon: 'BookOpen' },
  { id: 'clothing', name: 'Clothing & Apparel', icon: 'Shirt' },
  { id: 'accessories', name: 'Accessories & Jewelry', icon: 'Watch' },
  { id: 'water_bottles', name: 'Bottles, Mugs & Containers', icon: 'Coffee' },
  { id: 'others', name: 'Other Items', icon: 'Package' }
];

export const SAMPLE_PRESET_IMAGES = [
  {
    name: 'AirPods Pro Case',
    category: 'electronics',
    url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Hydro Flask Bottle',
    category: 'water_bottles',
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'MacBook Air Space Gray',
    category: 'electronics',
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Keys with Blue Lanyard',
    category: 'keys',
    url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Black Leather Wallet',
    category: 'wallets_bags',
    url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Classic Campus Backpack',
    category: 'wallets_bags',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'TI-84 Graphing Calculator',
    category: 'electronics',
    url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Denim Jacket / Hoodie',
    category: 'clothing',
    url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ray-Ban Sunglasses',
    category: 'accessories',
    url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Spiral College Notebook',
    category: 'books_study',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  }
];
