// Car rental data with bilingual support
const carsData = [
    {
        id: 1,
        category: 'economy',
        name: {
            ar: 'نيسان صني',
            en: 'Nissan Sunny'
        },
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: {
            ar: '200 جنيه/يوم',
            en: '$15/day'
        },
        features: {
            ar: ['تكييف', 'راديو', '4 مقاعد', 'توفير في الوقود'],
            en: ['A/C', 'Radio', '4 Seats', 'Fuel Efficient']
        },
        specs: {
            transmission: {
                ar: 'أوتوماتيك',
                en: 'Automatic'
            },
            fuel: {
                ar: 'بنزين',
                en: 'Petrol'
            },
            doors: 4
        }
    },
    {
        id: 2,
        category: 'luxury',
        name: {
            ar: 'بي إم دبليو X5',
            en: 'BMW X5'
        },
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: {
            ar: '800 جنيه/يوم',
            en: '$60/day'
        },
        features: {
            ar: ['جلد طبيعي', 'نظام ملاحة', '7 مقاعد', 'دفع رباعي'],
            en: ['Leather Seats', 'GPS Navigation', '7 Seats', '4WD']
        },
        specs: {
            transmission: {
                ar: 'أوتوماتيك',
                en: 'Automatic'
            },
            fuel: {
                ar: 'بنزين',
                en: 'Petrol'
            },
            doors: 5
        }
    },
    {
        id: 3,
        category: 'suv',
        name: {
            ar: 'تويوتا راف 4',
            en: 'Toyota RAV4'
        },
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: {
            ar: '500 جنيه/يوم',
            en: '$40/day'
        },
        features: {
            ar: ['دفع رباعي', 'كاميرا خلفية', '5 مقاعد', 'بلوتوث'],
            en: ['4WD', 'Backup Camera', '5 Seats', 'Bluetooth']
        },
        specs: {
            transmission: {
                ar: 'أوتوماتيك',
                en: 'Automatic'
            },
            fuel: {
                ar: 'هجين',
                en: 'Hybrid'
            },
            doors: 5
        }
    },
    {
        id: 4,
        category: 'economy',
        name: {
            ar: 'هيونداي إلانترا',
            en: 'Hyundai Elantra'
        },
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: {
            ar: '250 جنيه/يوم',
            en: '$20/day'
        },
        features: {
            ar: ['تكييف', 'شاشة لمس', '5 مقاعد', 'كاميرا خلفية'],
            en: ['A/C', 'Touchscreen', '5 Seats', 'Backup Camera']
        },
        specs: {
            transmission: {
                ar: 'أوتوماتيك',
                en: 'Automatic'
            },
            fuel: {
                ar: 'بنزين',
                en: 'Petrol'
            },
            doors: 4
        }
    },
    {
        id: 5,
        category: 'luxury',
        name: {
            ar: 'مرسيدس بنز E-Class',
            en: 'Mercedes-Benz E-Class'
        },
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: {
            ar: '1000 جنيه/يوم',
            en: '$80/day'
        },
        features: {
            ar: ['جلد فاخر', 'نظام صوتي متطور', 'مقاعد مدفأة', 'فتحة سقف'],
            en: ['Premium Leather', 'Premium Audio', 'Heated Seats', 'Sunroof']
        },
        specs: {
            transmission: {
                ar: 'أوتوماتيك',
                en: 'Automatic'
            },
            fuel: {
                ar: 'بنزين',
                en: 'Petrol'
            },
            doors: 4
        }
    },
    {
        id: 6,
        category: 'suv',
        name: {
            ar: 'فورد إكسبلورر',
            en: 'Ford Explorer'
        },
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        price: {
            ar: '600 جنيه/يوم',
            en: '$50/day'
        },
        features: {
            ar: ['7 مقاعد', 'دفع رباعي', 'شاشة كبيرة', 'مساحة تخزين واسعة'],
            en: ['7 Seats', '4WD', 'Large Display', 'Spacious Storage']
        },
        specs: {
            transmission: {
                ar: 'أوتوماتيك',
                en: 'Automatic'
            },
            fuel: {
                ar: 'بنزين',
                en: 'Petrol'
            },
            doors: 5
        }
    }
];