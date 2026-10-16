import { Product, CartItem, GroupPool, ShippingRoute } from '../types';

export const EXCHANGE_RATE = 12.80; // 1 ¥ = 12.80 ₽
export const USDT_RATE = 92.40;

export const CATEGORIES = [
  { id: 'all', name: 'Все категории', count: 14820, icon: 'grid_view' },
  { id: 'electronics', name: 'Электроника & Гаджеты', count: 5420, icon: 'devices', sku: '12.4k SKU' },
  { id: 'clothing', name: 'Текстиль & Одежда (OEM)', count: 3110, icon: 'apparel', sku: '28.1k SKU' },
  { id: 'home', name: 'Товары для дома & Интерьера', count: 2890, icon: 'chair', sku: '19.5k SKU' },
  { id: 'beauty', name: 'Красота & Уход', count: 1940, icon: 'spa', sku: '8.2k SKU' },
  { id: 'auto', name: 'Автотовары', count: 1650, icon: 'directions_car', sku: '6.7k SKU' },
  { id: 'kids', name: 'Детские товары', count: 1420, icon: 'toys', sku: '11.3k SKU' },
  { id: 'sport', name: 'Спорт & Туризм', count: 1250, icon: 'fitness_center', sku: '9.4k SKU' },
  { id: 'tools', name: 'Инструменты & Станки ЧПУ', count: 1460, icon: 'home_repair_service', sku: '5.1k SKU' },
  { id: 'b2b', name: 'Опт & Бизнес (Контракты OEM)', count: 850, icon: 'factory', sku: 'Контракты OEM' },
];

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'prod-powerbank',
    name: 'Магнитный Power Bank 10000mAh 15W Qi2 Aluminum MagSafe',
    category: 'electronics',
    cnyPrice: 89,
    rubPrice: 1140,
    wholesaleCny: 58,
    wholesaleRub: 742,
    wholesaleMinQty: 50,
    moq: 5,
    moqLabel: 'MOQ: 5 шт.',
    hub: 'Шэньчжэнь',
    rating: 4.9,
    ordersCount: 3120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfUOF0kQe3hLTLYpMNx2KwDxwcyK_PoolegpzLABqxAnw_x7MABDO-VMQZXoW4C4euLohnAWh5cINCYDK7FQw2xqczgYbUF_WyOntFRYNehbt-rq5MHAVbPUUFDRoZlAjHWVmisPW8exguBCjiIAQTsGGRTp1SqM_VyhzaUSXyI_GDmXwtYdh5cCbLJajZ2uvN2CRv4u_XTqpQPsaHZLWfFs3GKpGWVjsonPSZVgNiRe7HpO9u2WWWKg',
    badge: '-25% Опт',
    secondaryBadge: 'Образец ¥99',
    factoryName: 'Shenzhen MagSafe Tech',
    isVerified: true,
    samplePriceCny: 99
  },
  {
    id: 'prod-tumbler',
    name: 'Термокружка с вакуумной изоляцией 500ml Smart LED дисплей',
    category: 'home',
    cnyPrice: 28,
    rubPrice: 358,
    wholesaleCny: 16.5,
    wholesaleRub: 211,
    wholesaleMinQty: 200,
    moq: 20,
    moqLabel: 'MOQ: 20 шт.',
    hub: 'Иу (Чжэцзян)',
    rating: 4.95,
    ordersCount: 8940,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXfRsklpXL67qgM2GiL8ZZ80FxwvOm9PQDUtzBuJDa3nI0BataYqC7TmCIZQwZ_mKm0xnYjKVLYdgXTYrgSr21kNX1XsoRtr4JSjJgu-4sZKb-vxj-qtFJbyzxSN5Zc4EcY_Bm9oDw2MM1kIXrkanBo_Fy3eHbD0nmX00I1Gp986Xm2BoH0Fuyppi3PQ2iKl30FRm5bnG-n-ROl5fj0Gr8eUcsf7GJdZj5QsLuP2X4VqaailOEO5fpNg',
    badge: 'Хит 1688',
    secondaryBadge: 'OEM Логотип',
    factoryName: 'Yiwu Vacuum Flasks Industry',
    isVerified: true,
    samplePriceCny: 35
  },
  {
    id: 'prod-mouse',
    name: 'Беспроводная мышь Ergonomic Silent Click 2.4G + Bluetooth 5.2',
    category: 'electronics',
    cnyPrice: 42,
    rubPrice: 538,
    wholesaleCny: 27,
    wholesaleRub: 345,
    wholesaleMinQty: 100,
    moq: 10,
    moqLabel: 'MOQ: 10 шт.',
    hub: 'Дунгуань',
    rating: 4.88,
    ordersCount: 4210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq3w402fSD2TQ7wncv8VquMvfmh9UUi7dgJCgfHkP-MkF13Ul8dGeZbWP2WXUBr1gbJsnLnKQUMph86uaxz-lPfsB4Le_MNmBCvDBbRjP9z6T-uwSJG8O7lTGyoWSa2RzxF1dmL127fMhR9UV0A7bplasDhaelJV5NSbrultpxVFARzyK2uGUj_376VLvvhrardmfL6hE4zxz12dKaqsUm0nt8p2TvTToF-1Hno5EuXW7-cSTUTmBNwg',
    badge: 'Tri-Mode BT',
    secondaryBadge: 'Бесшумная',
    factoryName: 'Dongguan Peripherals OEM',
    isVerified: true,
    samplePriceCny: 50
  },
  {
    id: 'prod-keyboard',
    name: 'RGB Механическая клавиатура 75% Hot-Swap Gasket Mount',
    category: 'electronics',
    cnyPrice: 168,
    rubPrice: 2150,
    wholesaleCny: 115,
    wholesaleRub: 1472,
    wholesaleMinQty: 30,
    moq: 2,
    moqLabel: 'MOQ: 2 шт.',
    hub: 'Хуэйчжоу',
    rating: 4.98,
    ordersCount: 1670,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1ybxgPS8RhIk1m2z_GeAF3Yv9vmN_2TIoxCKMTtGdE8q6efK46kHZYMh-mRjOalQtRgrCwg2D31qv5Za4AtqQEldwwd2xMbPICC6hSVAeg-2nLm0pRII0n7cKitsKaMJqV2lzP6fPPWSGdyr5FbSx4-Y8iPnVebI_ecVrghgZlpB6Gl3XW_VCUbrlLckPQpJ5RlynlMPce91RGsRw218DzVTlu0cU9Iix7FdMt-BsNYPXnVZ57ekzVA',
    badge: 'Hot-Swap Gasket',
    secondaryBadge: 'RU Раскладка OEM',
    factoryName: 'Huizhou Mechanical Lab',
    isVerified: true,
    samplePriceCny: 180
  },
  {
    id: 'prod-hoodie-blank',
    name: 'Худи Оверсайз Heavyweight 450г/м² Blank под брендинг',
    category: 'clothing',
    cnyPrice: 54,
    rubPrice: 691,
    wholesaleCny: 38,
    wholesaleRub: 486,
    wholesaleMinQty: 100,
    moq: 10,
    moqLabel: 'MOQ: 10 шт.',
    hub: 'Гуанчжоу',
    rating: 4.91,
    ordersCount: 11200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKErC-dSjPMxRxlKwnfVbUQXh444SjVlNqVu86_ucXvXx5K16ZILrVqNqDRlaF-CEu-7vyQSEppz2-NyKkTpp655gkLFxHJhHP9u6DQida6rAXP6942EatIuOWqyQj_SDJvGxauaEX-qlHXHIm_iPWMrGgaZR_bPNDsTsIUNLf_YUDWmz7-mS1r1mDDyWz1qyDeRh3tHRVt5OFqq8fKyi_8PVDBZo-8JWNSxI_d1UuIVSLHRyDiLfIA',
    badge: '450 GSM Франц. махр',
    secondaryBadge: 'Бирки под ключ',
    factoryName: 'Guangzhou Knitwear Co.',
    isVerified: true,
    samplePriceCny: 65
  },
  {
    id: 'prod-steamer',
    name: 'Отпариватель ручной 1600W складной с керамическим соплом',
    category: 'home',
    cnyPrice: 62,
    rubPrice: 794,
    wholesaleCny: 43,
    wholesaleRub: 550,
    wholesaleMinQty: 60,
    moq: 12,
    moqLabel: 'MOQ: 12 шт.',
    hub: 'Нинбо (Чжэцзян)',
    rating: 4.87,
    ordersCount: 5890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA3XQd1vhC4MqJKbayaA4u65dbTWVLQNZjhH_d5UqEBkqX6Rs5jKCeI9M55YOa7CMYggZd613yY-CRL6x8Ok3h3hdubMspUJpAyaJ4Yio7RgzEjbS2cu5i1wfobAymqfGLirBwCQ8Wy56Bdz85JJC3ckOi2zRfjY7e0-eTbeDYF6FoG890nuNt0PsVc8OuNbMnjuHBsSpECato9Yz_NhYg_HsRFo61bT3CPLyfp0SWB-oCCDbyAcrZSQ',
    badge: 'Евровилка (EU)',
    secondaryBadge: 'EAC Сертификат',
    factoryName: 'Ningbo Home Appliances Tech',
    isVerified: true,
    samplePriceCny: 75
  }
];

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: 'prod-anc-pro2',
    name: 'Беспроводные наушники с ANC Pro 2 Factory Direct',
    category: 'electronics',
    cnyPrice: 129,
    rubPrice: 1650,
    oldCnyPrice: 199,
    oldRubPrice: 2547,
    moq: 1,
    moqLabel: 'от 1 шт.',
    hub: 'Шэньчжэнь • 4 года на платформе',
    rating: 4.9,
    ordersCount: 2840,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAti8iS4zjfqr798PxbkEy2cBMDg5Y7ftOaxV-9aQ1JSZJNYJoNLu3ZoPMpDIfx9CIJbALscXl3r1vRMfD3IH6ML3GY9J7dEARgFc0Py6LDgkNLdwyfw_krd-qHBqlRorXiYfpJyGmGzBDB4K-TtMfcYVNFfGTXhe41lJphpU0U8v_14p6eB5F2OXeECava13lRbvn4q07GA0OYPEAFpInUKvJC9M_Gxnq_QNrhSbro3gb9E92L-7B-jA',
    badge: '-35%',
    factoryName: 'Shenzhen Acoustics Technology Co., Ltd.',
    isVerified: true
  },
  {
    id: 'prod-vacuum-robot',
    name: 'Умный робот-пылесос с лазерной навигацией LiDAR',
    category: 'home',
    cnyPrice: 580,
    rubPrice: 7424,
    oldCnyPrice: 805,
    oldRubPrice: 10304,
    moq: 1,
    moqLabel: 'от 1 шт.',
    hub: 'Сучжоу • 7 лет на платформе',
    rating: 4.8,
    ordersCount: 1420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA9Hxh7FlH5C5pfDol5XRLGfI5OnAiCKM_xEs5WAlaz61H3pHbRWoLUuhZ-x59E3fHobvFt2f5H0sqy3ZyxCe1MLmkIDTRRLyKcvd0Z_pdBjym45HHCdrNvOXNbgoNbz6sMBQqD7B38P14A4NF1RXl-fFskpFyHChcbhmcZmFxiXCO_I0h0CsoUpA4PIViOP6Dsjr1KZbxlVnxSlKmwZuHCY718zkHnTvEwtN3zE6aqc1luQHJYhrynQ',
    badge: '-28%',
    factoryName: 'Suzhou Robotics Industry',
    isVerified: true
  },
  {
    id: 'prod-oversize-hoodie',
    name: 'Оверсайз худи 450gsm Premium French Terry Cotton',
    category: 'clothing',
    cnyPrice: 65,
    rubPrice: 832,
    oldCnyPrice: 108,
    oldRubPrice: 1382,
    moq: 1,
    moqLabel: 'от 1 шт.',
    hub: 'Гуанчжоу • 5 лет на платформе',
    rating: 5.0,
    ordersCount: 3910,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATFHV0arUB-nd-5nrP1g0K_GpXXVuYZFCTdEFKrPR1ixZApasgBlv6JwtQezQiklbh9PPXo6HxSdr1a3LuIfWzmzWXf_MzSTf06L-GSN1cGOM8M4eBXtymZu8NzLUFCOULCB4wHHpTHv6WXM9U3G9u0UfcRuQCkuviagcT_zFD1C4hITSgPxgHZBMwHsewGYHACnS-kG1Hb6GENuCBgLIQuRhbxjIQI_lM6zvENhCL0dLtyRFtwWjNDQ',
    badge: '-40%',
    factoryName: 'Guangzhou Textile Export',
    isVerified: true
  }
];

export const FACTORY_DIRECT_ITEMS = [
  {
    id: 'fd-smartwatch',
    title: 'Умные часы с датчиком ЭКГ Pro',
    factory: 'Shenzhen Precision Tech OEM',
    rating: 'Фабрика 5.0',
    moq: 'MOQ: от 10 шт.',
    delivery: 'Авиа / Авто доставка',
    cny: 45,
    rub: 576,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo-JyPybjXBos7Y6WVi2mT1Bj4VldRuzWx6yiGsNYJTjl2KGKyIDnZgDxN-1yxo1d5tAWANt4rU3R3VOlAT3QrRZHYI9jcdsmLALI2Ex9ggoq5_9MjJIVoy3MqPy4I9fBcneH5iHcaQw7VsA6MbvrJOjaqfZW_gEUXLdJVOl5UV_Lu4h24ZZchI-rYsuYb1kXVgt_TN6Rfv0LkVxJgtR6_7P4ews7Wo7PRv3syPiQJxHjFj4Gtl1ruCQ'
  },
  {
    id: 'fd-coffee',
    title: 'Портативная аккумуляторная кофемашина',
    factory: 'Ningbo Small Appliances Co.',
    rating: 'Фабрика 4.9',
    moq: 'MOQ: от 20 шт.',
    delivery: 'Быстрое карго 12 дней',
    cny: 89,
    rub: 1139,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3BBulQ12I_wFrSq1urnNSi6VRUa3mW_joaTd9rHeFEMC3xnZAD3BLnmwM0tnYP_RKkYUyV2-nwnjFqMgvpvkKEJa2Ztd6zAvXVFaXq9Ajx0g9_J8aTtemyeZWMS6MCQSAvj2YR5nhp9-Igu5I0pyvCinYbnUW7PEWx0nxrtUSBp_3flG-8Zjywh90xb4xqHVtCyTUFbs4lwHt8Sv66I41t0UzrGN4TKd-zrkTb_dNYVcJv35czPBuQg'
  },
  {
    id: 'fd-ringlight',
    title: 'LED кольцевая лампа 18" со штативом',
    factory: 'Dongguan Optical Lighting Lab',
    rating: 'Фабрика 5.0',
    moq: 'MOQ: от 50 шт.',
    delivery: 'Ж/Д Контейнер / Авто',
    cny: 28,
    rub: 358,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7V0LSwMKYsmPmvHF84pNtV-Hl-bcLtovIczuoDNhUByLkcK3lEI0b614_RKh-GkXMNzUfrMJty-uk6OLxdADBldFKx0zW5q1XHR7HQnJGOjFa_gYyovnlX9QhYznPAZV1uVfoJmSdn3J02cb29ZUbigNYI7sLEV5AguW48l_Hc5xR_JwmuEg_D-tCCVHRbUCnw_RSaVcCFJJBoTUU6jJf7f53gNy0Q5TFbVJju0PS5QuzgZOoa6CTTw'
  },
  {
    id: 'fd-steamer',
    title: 'Профессиональный ручной отпариватель',
    factory: 'Yiwu Home Tech Hardware',
    rating: 'Фабрика 4.9',
    moq: 'MOQ: от 15 шт.',
    delivery: 'Авиа экспресс 7 дней',
    cny: 39,
    rub: 499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo2jP7_HpTZzMVajuJNVFtg_Jkd67GJnpIH5xFZM5NsU3xRfEp7SXyERuWdbQs85ugmHBWaNH38EiPyEi4xv3m4o6DfDPCeXQTdDyaPIGulWM1QK3NJEzzvSdi5PkkI67nGRYLBUDa5Ta0X1hDiMXOaUZfzsOR1QxSnPL9HpNeGidkV43FsMO8kVqe1huX3VT_-1F6cafE1pgZvfuFq_vKUh47lBg726wFG_BN2RXwKOxeinf9VyzqBw'
  }
];

export const HOT_GROUP_POOLS: GroupPool[] = [
  {
    id: 'pool-iphone-cases',
    poolNumber: '4928',
    category: 'Электроника и аксессуары',
    title: 'Ударопрочные чехлы Liquid Silicone для iPhone 15/16',
    subtitle: 'Оригинальный жидкий soft-touch силикон с бархатной подкладкой и металлическими кнопками.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLa-G-LAXQA7zKX5BQpHuWrymBVkuS_NL1CdIOmOfNGHJOTbJ4jn_MewE53TzvjeYQdDzAYycY4sMzp6D_rRU6XKdhKr-dw30qHdUg5F665j6Z-dyCzov3NTUqkGG_NdHvq4QpgHyZ6x9KtAGYHmYz47EXE3AOorwHWQ8ce7wdkYJU6qQAQ0JgqtFq8RscVL0qUaYpZaE8f6QQ2x4D4sZ7crXot8nBvZNRRF9UJMsdgM3gdOJmoyC4wQ',
    factoryName: 'Dongguan Precision',
    factoryYears: 9,
    discountBadge: '-58% от розницы',
    timeLeft: '14ч 22м осталось',
    minParticipation: 20,
    targetQty: 1000,
    currentQty: 743,
    participantsCount: 42,
    retailPriceCny: 15,
    retailPriceRub: 192,
    currentPriceCny: 6.2,
    currentPriceRub: 79,
    tiers: [
      { minQty: 100, cny: 12, rub: 154 },
      { minQty: 500, cny: 9, rub: 115 },
      { minQty: 1000, cny: 6.2, rub: 79, active: true },
    ]
  },
  {
    id: 'pool-car-mount',
    poolNumber: '4912',
    category: 'Автотовары',
    title: 'Автомобильные магнитные держатели с беспроводной зарядкой 15W',
    subtitle: 'Усиленный неодимовый N52 магнит, активное охлаждение, сертификация Qi и CE для маркетплейсов.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvzB2ylNAnTDF6xKVxBDzvtWH6vjvbsEZyzq0gdXJ2Z379sgEmlYLEuZiDMrH4KmtiU_mktYNQH62hHknBeMRtErBTc2wOwyWcrdIgGzJ_AviiYs_of0Vli4REMa6gtIHwp_7a9K9zT4IHSRtfsG0yt7epaRNeplIPOGWiEcbD8LBTiU_tKZfUtfAhAw_g4oqGP7HHdIHXl1_EdjDFYVqd2cqOjLf82UFPgsY9PWiuXTU20dJO-nG6MQ',
    factoryName: 'Shenzhen MagSafe Tech',
    factoryYears: 6,
    discountBadge: '-54% выгода',
    timeLeft: '1 день 08ч',
    minParticipation: 10,
    targetQty: 500,
    currentQty: 380,
    participantsCount: 28,
    retailPriceCny: 75,
    retailPriceRub: 960,
    currentPriceCny: 34,
    currentPriceRub: 435,
    tiers: [
      { minQty: 50, cny: 52, rub: 665 },
      { minQty: 200, cny: 42, rub: 538 },
      { minQty: 500, cny: 34, rub: 435, active: true },
    ]
  },
  {
    id: 'pool-hoodie',
    poolNumber: '4890',
    category: 'Одежда и текстиль',
    title: 'Худи оверсайз 420gsm из премиального чесаного хлопка под брендинг',
    subtitle: 'Без бирки, подготовлены под шелкографию или вышивку. Плотный трехниточный футер пенье с начесом.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlseBJbuhfkRraeSV_adN1lyzsleRn_yaJQ_eu2qVnOtSTuMNU1Zmc7Iuk9jgNNNCkdr1NPN_IdS25eRi6eyb1FhEMrs9E_YNjEDmu_ooilrrZlPhh7wYLsu_iZdAsyx5oGgAo7Lv1niqMAdE959rD3HYX3QhoA9rNjc0MrN-JgXadEHoovxYV7hPy3f9TOC7luZtV7b6DGhYxqasIreHhVBWMl-QrtNYPOdcXmFOCbBqJF6MMPDEUkQ',
    factoryName: 'Ningbo Apparel',
    factoryYears: 8,
    discountBadge: '-49% выгода',
    timeLeft: '2 дня 04ч',
    minParticipation: 15,
    targetQty: 300,
    currentQty: 215,
    participantsCount: 19,
    retailPriceCny: 95,
    retailPriceRub: 1216,
    currentPriceCny: 48,
    currentPriceRub: 614,
    tiers: [
      { minQty: 50, cny: 68, rub: 870 },
      { minQty: 150, cny: 56, rub: 717 },
      { minQty: 300, cny: 48, rub: 614, active: true },
    ]
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-anc-batch',
    productId: 'anc-pro2-factory',
    name: 'Наушники ANC Pro 2 (Фабрика Шэньчжэнь)',
    factoryName: 'Shenzhen Acoustics Technology Co., Ltd.',
    hub: 'Шэньчжэнь',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2k5fQCIccmjNtWGiNCiuqbXoY_c_9u05oLunTYwcM0j8uzm89k2Agsy4Ooat-uvY8uBIXzlDWBgAlQIGFl6ESqxkHMfGAaJzbcR1xw_9Powc9lze7EkcbLOBCRUmxuS4e72L6HZkR3Nf6QSxFnTLANXRIuYroNfOoX6ZI2NRMYPzkmH4T0auDSeRhgdQsxU_fuK0rslqf4Jtu1QkvjzDs0G25D--csNutuZcvA90fr9TyUqwWHs4lYw',
    quantity: 20,
    unitCny: 99,
    unitRub: 1267.20,
    weightKg: 3.2,
    specs: ['Чипсет: Airoha 1562AE', 'Bluetooth 5.4', 'Цвет: Space Gray'],
    options: { photoInspection: true, laserLogo: false }
  },
  {
    id: 'cart-anc-sample',
    productId: 'anc-pro2-sample',
    name: 'Образец предсерийный ANC Pro 2',
    factoryName: 'Shenzhen Acoustics Technology Co., Ltd.',
    hub: 'Шэньчжэнь',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOeaD2k5SZRRr-C-WWKgC7Rp-M9vJ3kt47MDnbmM6wCZaPfgWK2go-UMIpsfpGaSBfdopIjo0QUIYPHp85ExnzA4rTYDEFp5p5unFRPKzVu9uhjph4V7vgXr3OZordoCJEsJfYo0NT1zWhn5zXWlqFYS5iUInfAas8k2w8SpOuPo783bCPmIUbtXSM5i_bebLJu1_RH6--JmdPJneqhfZsO_cRDVsAxVLF9qWh0xavKv6WVIPlOuqJAg',
    quantity: 1,
    unitCny: 129,
    unitRub: 1650,
    weightKg: 0.3,
    specs: ['1 шт. • Инспекция пластика и акустики'],
    isSample: true
  },
  {
    id: 'cart-powerbank',
    productId: 'prod-powerbank',
    name: 'MagSafe Power Bank 5000mAh Slim',
    factoryName: 'Shenzhen MagSafe Tech',
    hub: 'Шэньчжэнь',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOyh8N5PQtlNrwGmWJdH-TCoE2FMxL-Vd3OszM8Zoeiz5XimYzgJ8eIGv9Ue_7Lx7JPSmtCUGSRg4vBTDpGT9i7CZpBLlElyKKEK0jNvbQF3FkxMJTSDEcbIxscLbmeCxSPONezA9l8P0_DZj-Jx7OEscidhttb7LJnZOjouQrSEOU2kwp-9mZma1le7oJQxMyZvy4zZ5l3xVlHanFrTz_IpS0Iy7mHx1ujB-cT-c49r7YrJQdVz5DtQ',
    quantity: 10,
    unitCny: 89,
    unitRub: 1140,
    weightKg: 2.8,
    specs: ['Модель: Qi2-10K', 'Цвет: Titanium Gray', 'EU Сертификация']
  },
  {
    id: 'cart-hoodie',
    productId: 'prod-hoodie-blank',
    name: 'Худи оверсайз 450gsm Premium Cotton',
    factoryName: 'Текстильная мануфактура Ningbo Apparel',
    hub: 'Нинбо',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKnMhBrNz67T6VTTYJ_eHrsHUY3mXRAdLBT5ME03FondCkeyvQkMW5dpciA2d3gmRSa7Pp9scnRJwq8nos3EovIsS1TQ36O7k_xk2OpGyNRvfejLdcOUubLcp6fFngy63F4CVzxHPK9HcPBdus8GS3luhhXTx1Aa6QDGVgM9YI4OqSRL_KCuYnpoLKXdmLwks1-dRgISC-netfmN0hL17Hi9Dv2-WPhBPVdlEMQu_iRT5wQlcyzv0Y0Q',
    quantity: 15,
    unitCny: 48,
    unitRub: 614.40,
    weightKg: 11.5,
    specs: ['Цвет: Washed Grey', 'Размеры: L (8 шт.), XL (7 шт.)', 'Плотность: 450 gsm']
  }
];

export const RECOMMENDED_ADDONS = [
  {
    id: 'addon-case',
    title: 'Силиконовые чехлы для кейса TWS (комплект 10 шт.)',
    cny: 22,
    rub: 281,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB501-zlMXbbYmC5VeoZ8SUnm9n6zoeYxqGxcJkuSYby-DWEdaOA6Le0IFnRLs5EbboCdeULslNUiFm7AOkE4WXrhIsIJS9RTB9jV5b3iZOo6PJJWiL52jbqwXX7qOtsnSefCc9SNGiI63ttbHU_ol4G6zYF8WSCkThw_Q87b7rA2WOPhVme8R0fka2YoIpRgbAioqZq73quP3MrQ4TBhO0DldqimLlMIUdm5z11QCthk-5SA0D70GTXw',
    weightKg: 0.2
  },
  {
    id: 'addon-cable',
    title: 'Кабель Type-C 100W оплетка (10 шт. упаковка)',
    cny: 45,
    rub: 576,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiFsBeUC9GdXTZo4S07nrIFCDT5Ie6c0shPgoSl3gHRvUuph6WjlZk9c3NPcIkGNctYxgMTlCxMknJ3oxI6iKAIKFJT91-ynH_mGSjhF8LQdLUks3igBs3gx79cb4T2qoMW4duE9fcvu6mn3tr7hjRsKYV_LXZ8TuO2IK957G85qNG44tTR9LLRPICrfJhVnnPgoudE2YM2Ph3UilQJEL_mt59JvxCzm01v_BhHgs90ZeL-ybdc_sLQQ',
    weightKg: 0.3
  },
  {
    id: 'addon-bags',
    title: 'Брендированные крафтовые пакеты 50 шт.',
    cny: 38,
    rub: 486,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrqmSdP7yR4OrBGIvbV9KUD3JQlitdGPB1W6Gd7WbNlABZ6COVThEWdqv98G8HiGZ6uX6fIp9jc9J10Wh3OXRY5lQ9WGD0G1WZmfNLlDXxePpn94KMzn1V5u6FHZYfvaAVLB1Vu3j3fjOyTo5NzAgVJJrW-AHYQc1KQUto8DOOgnbzbHQSbD-Dba_a5pYBYFyvg2ag4fzfchNfMEyDIMqd-Be65EghvUA45jTedoDlbH9-Q7aDAvbBRg',
    weightKg: 0.8
  }
];

export const SHIPPING_ROUTES: ShippingRoute[] = [
  {
    id: 'auto-cargo',
    title: 'Быстрое Авто Карго',
    route: 'Иу (Консолидация) ➔ Хоргос ➔ Москва',
    duration: '13–16 дней',
    ratePerKg: '~190 ₽/кг ($2.4)',
    description: 'Оптимальный баланс для товарных остатков маркетплейсов. Включено взвешивание, маркировка и переупаковка.',
    calculatedPriceRub: 3382,
    icon: 'local_shipping',
    badge: 'Хит импортеров',
    accentColor: '#e61e2a'
  },
  {
    id: 'air-express',
    title: 'Авиа Экспресс',
    route: 'Шэньчжэнь ➔ Москва Шереметьево Карго',
    duration: '5–8 дней',
    ratePerKg: '~380 ₽/кг ($4.8)',
    description: 'Для срочных предсерийных образцов, электроники и срочной ликвидации out-of-stock на складах WB/Ozon.',
    calculatedPriceRub: 6764,
    icon: 'flight_takeoff'
  },
  {
    id: 'white-rail',
    title: 'Белая Ж/Д + ГТД Таможня',
    route: 'Иу ➔ Достык ➔ Ворсино (Москва)',
    duration: '24–30 дней',
    ratePerKg: 'от $1.2/кг',
    description: '100% официальный импорт, номерная декларация ГТД, НДС 20%, Честный Знак. Оплата строго по безналичному расчету РФ.',
    calculatedPriceRub: 4200,
    icon: 'train'
  },
  {
    id: 'sea-container',
    title: 'Морской Контейнер (FCL/LCL)',
    route: 'Порт Нинбо ➔ Владивосток ➔ Ж/Д РФ',
    duration: '35–45 дней',
    ratePerKg: 'Минимальный',
    description: 'Самая низкая себестоимость доставки для крупногабаритных грузов, тяжелого оборудования и сборных паллет.',
    calculatedPriceRub: 2450,
    icon: 'directions_boat'
  }
];

export const PDP_IMAGES = [
  {
    label: 'Главная',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCagARCeEs081MxHXzVGm4glzgXLYWHtzxpWzjT89__uYBUHbFSGk1R4EXr0L8LiDaDtAmxApzrocQCXb5w94qUfWxdYtQIWqoFm0IIZi1LXnCs0isfbizUjtYKHFSClccgZZG4Wz3Lx_vCWS5aoZ0R9W_baeATZWmkzLzEnm2eqlr-e3aVfPB4fuyhT0zpsBb15pBi9JCsP0d0WfAMUnD5vERQ4pOptSjxn23oBInp7llkS2X2ucNPrQ'
  },
  {
    label: 'Кейс открыт',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEPEJvRFoTBZ834-_Z5r3WmyYB_uysK_iTPdERJ-9wj4wuicYROfhuhozuoxuPRCPPzDiAHz2ZpxC7fyI65Exo2rNUCmYYOtjs8s3vRxK5tusVsI3tQGsVjPqOihsIcvIfP4bDsuKkNSvzYu9spzWJYU8wjlv04v76BAUhflzTuhucbP7LDRCZwvigZ4ukfCMcuVVh2U5GwyvUgZoO_ioHAe3faQVT3fQan0eXMrRCd8EJ3kSjz0Y_cg'
  },
  {
    label: 'Драйвер и чип',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp4sO4mTgFQofZ9AwfnAJ0GYicUUQdZ0hw5zsdLLEtegk8vvjRTBv6DsGhHhomd2TOJnOCnwB1MGa12F71wkb6KBRtFgugy7lF29RZSNIqDBNVdvgI1NHuKfE_V7ID4on7XbbNjQtFoIIuY7W7Q9ii1scNruE3xzP2Ic-jN04dB1TYVAC76ULT3_YciGk5WJReQ89FSLWppxISbHaGW8ioMMV9cplpmGZh_0HqissbNQFvPtc3cpNqfw'
  },
  {
    label: 'Амбушюры',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF5UORiutbl43lXTrS9OV9p60xTxVu3HBmtxJof0lcG_yyXHqPIe21_pOD2Kkudr0sJkoWZFk5Ps5rTBYgn7Ug9M8oyuokFxYu8swK1iRy0naUNTcXfFn3tlqoGelJeAI8k_w4dSgs2N-Nk5aGNvu2ovA17ixXr8a_f4mt4vsbHH5UCW1lxdr75nJfScHn6U-hhB8x_8L9Yh5_B6tb7B2OLN2lJbL9ei3W9t9oE9T9vTfvoU1zC71LNQ'
  },
  {
    label: 'Упаковка',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgGNMzxSJqgbAHi_E35StH-Gvyw-r-yeomP1DiNN6xrafb4sbQX-qDlrhKJHCjMBw_v6kKQo-TbOvwpsVMVNqcI05OxbCAKz6ki48xJtaaFizliR6elaJ3-O6YCkmEJ3HumQaQsbGzO81SXaTIDDYK1ptJg03_qI2Qz05sdkigZOsd50ldW1E0KUdHo4jd9y7UAX_XZHy5SoWDN-ZNQo165VK4RQFOo31QIv1gWk3Qv1f1IfOzH1fqGg'
  }
];

export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1W1sMpEAWno21sHj92cMhceGryrtfAoWnBo9fHPQ7V0PbN2zPFBKwWIn8j902i0H_eGil7bn58vGnzUwuQwFxcogWHfgtZ9canLDb0gs0BAG-CbpxS_Lax9qpKJH_NZ0JezF95_W8fhAf905Cm-QIERrHLg1BiUAc99CPti2csQ9FUeOEJaTD_8gXnSzRXp7Q5n5nLaSlZ1Rl8ns96ID4JoABSM2795KNIpy4v8VVsGhKGuRpeUP6o--4sA';
