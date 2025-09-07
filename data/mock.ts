import { UserProfile, Listing, Category, State, LGA } from '@/types';

export const mockUser: any = {
  $id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

export const mockProfile: UserProfile = {
  name: 'John Doe',
  deploymentStateId: '2',
  deploymentLgaId: '2',
};

export const mockStates: (any & State)[] = [
    { $id: '1', name: 'Abia' },
    { $id: '2', name: 'Lagos' },
    { $id: '3', name: 'Kano' },
    { $id: '4', name: 'Rivers' },
    { $id: '5', name: 'FCT' },
    { $id: '6', name: 'Ogun' },
];

export const mockLgas: (any & LGA)[] = [
    { $id: '1', name: 'Aba North', stateId: '1' },
    { $id: '2', name: 'Ikeja', stateId: '2' },
    { $id: '3', name: 'Aba South', stateId: '1' },
    { $id: '4', name: 'Lagos Island', stateId: '2' },
    { $id: '5', name: 'Kano Municipal', stateId: '3' },
    { $id: '6', name: 'Port Harcourt', stateId: '4' },
    { $id: '7', name: 'Abuja Municipal', stateId: '5' },
    { $id: '8', name: 'Abeokuta South', stateId: '6' },
];

export const mockCategories = [
  {
    $id: 'cat1',
    name: 'Accommodation',
    icon: 'FaHome',
    color: 'bg-blue-500'
  },
  {
    $id: 'cat2',
    name: 'Food & Restaurants',
    icon: 'FaUtensils',
    color: 'bg-red-500'
  },
  {
    $id: 'cat3',
    name: 'Transportation',
    icon: 'FaBus',
    color: 'bg-yellow-500'
  },
  {
    $id: 'cat4',
    name: 'Healthcare',
    icon: 'FaMedkit',
    color: 'bg-green-500'
  },
  {
    $id: 'cat5',
    name: 'Shopping',
    icon: 'FaShoppingBag',
    color: 'bg-purple-500'
  },
  {
    $id: 'cat6',
    name: 'Entertainment',
    icon: 'FaFilm',
    color: 'bg-pink-500'
  },
];

export const mockListings: (any & Listing)[] = [
  {
    $id: 'list1',
    name: 'Green Valley Lodge',
    categoryId: 'cat1',
    lgaId: '2', // Ikeja
    address: '15 Stadium Road, Ilorin',
    contactInfo: '+234 803 456 7890',
    website: 'https://greenvalleylodge.com',
    description: 'Affordable accommodation for corps members with 24/7 electricity, clean water supply, and secure parking. Located close to state secretariat and other major offices. Furnished rooms with shared facilities and free Wi-Fi. Monthly and weekly rates available.',
    rating: 4.5,
    status: 'approved',
    views: 156,
    submittedBy: 'John Doe',
    submittedDate: '2024-09-01'
  },
  {
    $id: 'list2',
    name: 'Corpers Corner Restaurant',
    categoryId: 'cat2',
    lgaId: '2', // Ikeja
    address: '7 Ibrahim Taiwo Road, Ilorin',
    contactInfo: '+234 905 678 1234',
    description: 'Budget-friendly restaurant catering specifically to corps members. Wide variety of local and intercontinental dishes at affordable prices. Healthy meal options with proper portion sizes. Clean environment with comfortable seating. NYSC ID holders get 10% discount.',
    rating: 4.2,
    status: 'pending',
    views: 89,
    submittedBy: 'Jane Smith',
    submittedDate: '2024-09-03'
  },
  {
    $id: 'list3',
    name: 'City Shuttle Service',
    categoryId: 'cat3',
    lgaId: '4', // Lagos Island
    address: 'Central Bus Park, Ilorin',
    contactInfo: '+234 812 345 6789',
    website: 'https://cityshuttle.ng',
    description: 'Reliable transportation service with special rates for NYSC members. Operates daily routes to major landmarks including secretariat, popular accommodations, and city center. Monthly passes available at discounted rates. Online booking available through website or WhatsApp.',
    rating: 3.8,
    status: 'flagged',
    views: 234,
    submittedBy: 'Peter Jones',
    submittedDate: '2024-08-28'
  },
  {
    $id: 'list4',
    name: 'Community Health Center',
    categoryId: 'cat4',
    lgaId: '6', // Port Harcourt
    address: '23 University Road, Ilorin',
    contactInfo: '+234 705 432 1098',
    description: 'Healthcare facility providing primary care services with NYSC ID discount. Services include general consultation, minor treatments, and preventive care. Has partnerships with major hospitals for referrals. Opens 7 days a week with 24-hour emergency line.',
    rating: 4.7,
    status: 'approved',
    views: 312,
    submittedBy: 'Mary Johnson',
    submittedDate: '2024-08-25'
  },
  {
    $id: 'list5',
    name: 'Metro Supermarket',
    categoryId: 'cat5',
    lgaId: '5', // Kano Municipal
    address: '45 GRA Road, Ilorin',
    contactInfo: '+234 809 876 5432',
    website: 'https://metrosupermarket.com',
    description: 'One-stop shop for all your needs from groceries to household items. Offers special discount for NYSC members on Wednesdays. Monthly bulk purchase program available for corps lodges and shared accommodations. Home delivery available within city limits.',
    rating: 4.0,
    status: 'pending',
    views: 67,
    submittedBy: 'David Wilson',
    submittedDate: '2024-09-02'
  },
  {
    $id: 'list6',
    name: 'Citizen Recreation Center',
    categoryId: 'cat6',
    lgaId: '8', // Abeokuta South
    address: '12 Cinema Road, Ilorin',
    contactInfo: '+234 701 234 5678',
    description: 'Entertainment venue with various recreational facilities including movie screenings, game rooms, and sports courts. Regular events for young professionals and corps members. NYSC night every Thursday with special rates and activities. Membership plans available with significant discounts.',
    rating: 4.3,
    status: 'approved',
    views: 190,
    submittedBy: 'Sarah Johnson',
    submittedDate: '2024-08-20'
  },
  {
    $id: 'list7',
    name: 'Corpers Haven',
    categoryId: 'cat1',
    lgaId: '1', // Aba North
    address: '78 College Road, Ilorin',
    contactInfo: '+234 808 765 4321',
    description: 'Purpose-built accommodation complex for corps members featuring shared apartments and single rooms. All utilities included with standby generator. Dedicated study areas, communal kitchen, and recreation space. Security personnel and CCTV surveillance. Monthly cleaning service included.',
    rating: 4.4,
    status: 'approved',
    views: 278,
    submittedBy: 'Michael Brown',
    submittedDate: '2024-08-15'
  },
  {
    $id: 'list8',
    name: 'Mama\'s Kitchen',
    categoryId: 'cat2',
    lgaId: '3', // Aba South
    address: '56 Market Street, Ilorin',
    contactInfo: '+234 903 210 9876',
    description: 'Home-style cooking with affordable daily meal plans. Famous for local dishes at budget-friendly prices. Clean environment with outdoor seating area. Monthly subscription available with free delivery to nearby corps lodges and apartments. Special weekend menu with regional specialties.',
    rating: 4.6,
    status: 'pending',
    views: 145,
    submittedBy: 'Grace Adebayo',
    submittedDate: '2024-09-05'
  },
  {
    $id: 'list9',
    name: 'EasyRide Taxi Service',
    categoryId: 'cat3',
    lgaId: '7', // Abuja Municipal
    address: '34 Airport Road, Ilorin',
    contactInfo: '+234 807 654 3210',
    website: 'https://easyride.com.ng',
    description: 'Dedicated taxi service with verified drivers and set prices. Mobile app for easy booking and tracking. Corps member discount program with flat rates to common destinations. Group booking option for shared rides to secretariat and events. 24/7 availability with night safety features.',
    rating: 3.9,
    status: 'approved',
    views: 203,
    submittedBy: 'Ahmed Hassan',
    submittedDate: '2024-08-30'
  },
  {
    $id: 'list10',
    name: 'Unity Medical Clinic',
    categoryId: 'cat4',
    lgaId: '2', // Ikeja
    address: '67 Hospital Road, Ilorin',
    contactInfo: '+234 902 123 4567',
    website: 'https://unityclinic.com',
    description: 'Private clinic offering comprehensive healthcare services at reduced rates for corps members. Services include consultation, laboratory tests, pharmacy, and minor procedures. Health education programs and preventive care packages. Online appointment booking and telemedicine options available.',
    rating: 4.8,
    status: 'approved',
    views: 410,
    submittedBy: 'Dr. Emmanuel Okafor',
    submittedDate: '2024-08-18'
  },
  {
    $id: 'list11',
    name: 'Budget Bookstore & Supplies',
    categoryId: 'cat5',
    lgaId: '6', // Port Harcourt
    address: '23 School Road, Ilorin',
    contactInfo: '+234 805 432 1098',
    description: 'Affordable bookstore specializing in educational materials and office supplies. Special section for NYSC-related resources and community development materials. Photocopying, printing, and binding services available. Regular educational workshops and book club for knowledge sharing.',
    rating: 4.1,
    status: 'rejected',
    views: 78,
    submittedBy: 'Fatima Usman',
    submittedDate: '2024-09-04'
  },
  {
    $id: 'list12',
    name: 'Youth Social Club',
    categoryId: 'cat6',
    lgaId: '5', // Kano Municipal
    address: '90 Park Avenue, Ilorin',
    contactInfo: '+234 709 876 5432',
    website: 'https://youthsocialclub.ng',
    description: 'Social and networking hub for young professionals and corps members. Regular events including game nights, movie screenings, skill-building workshops, and cultural activities. Membership benefits include coworking space access, networking events, and discounts at partner businesses. Weekly community service opportunities available.',
    rating: 4.5,
    status: 'approved',
    views: 326,
    submittedBy: 'Blessing Okoro',
    submittedDate: '2024-08-22'
  }
];
