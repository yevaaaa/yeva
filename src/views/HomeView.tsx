import React, { useState } from 'react';
import { PageView, Product } from '../types';
import { 
  CATEGORIES, 
  TRENDING_PRODUCTS, 
  FACTORY_DIRECT_ITEMS, 
  EXCHANGE_RATE 
} from '../data/mockData';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onAddToCart: (product: Product, qty?: number) => void;
  onOpenPhotoSearch: () => void;
  onOpenCurrencyCalc: () => void;
  onOpenSupportChat: () => void;
  onViewProduct: (productId: string) => void;
  onJoinPool: (poolId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onAddToCart,
  onOpenPhotoSearch,
  onOpenCurrencyCalc,
  onOpenSupportChat,
  onViewProduct,
  onJoinPool,
}) => {
  const [trendingTab, setTrendingTab] = useState<'all' | 'tiktok' | '1688'>('all');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const [sourcingSent, setSourcingSent] = useState(false);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full pb-12">
      {/* SECTION 1: HERO VIEWPORT */}
      <section className="relative w-full overflow-hidden bg-[#f0f3ff] pb-10">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#bd001a]/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#d9dff5] blur-2xl"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left Column: Narrative & Action */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-[#e2e8f8]">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#bd001a] animate-pulse"></span>
                <span className="font-label-sm text-[11px] text-[#bd001a] uppercase tracking-wider font-bold">
                  Прямой доступ к оптовым базам 1688 &amp; Taobao
                </span>
              </div>

              <h1 className="font-headline-lg text-[32px] sm:text-[40px] md:text-[46px] text-[#151c27] tracking-tight max-w-2xl font-extrabold leading-tight">
                Китайский рынок — теперь в одном приложении
              </h1>

              <p className="font-body-lg text-[15px] sm:text-[16px] text-[#575e70] max-w-xl leading-relaxed">
                Миллионы товаров напрямую из Китая без посредников. Покупайте для себя в розницу по фабричной себестоимости или находите проверенных производителей для масштабирования бизнеса.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('katalog')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-xl font-label-md text-[14px] font-bold transition-all shadow-md shadow-[#bd001a]/20 cursor-pointer active:scale-95"
                >
                  <span>Начать покупки</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenPhotoSearch}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#e7eefe] text-[#151c27] border border-[#e2e8f8] rounded-xl font-label-md text-[14px] font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px]">photo_camera</span>
                  <span>Найти товар по фото / ссылке 1688</span>
                </button>
              </div>

              {/* Trust Badges Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2e8f8] flex flex-col">
                  <span className="font-headline-sm text-[20px] text-[#bd001a] font-bold">35 000+</span>
                  <span className="font-label-sm text-[11px] text-[#575e70]">Фабрик &amp; производств</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2e8f8] flex flex-col">
                  <span className="font-headline-sm text-[20px] text-[#151c27] font-bold">Иу &amp; ГЗ</span>
                  <span className="font-label-sm text-[11px] text-[#575e70]">Инспекция качества QC</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2e8f8] flex flex-col">
                  <span className="font-headline-sm text-[20px] text-[#8e4b00] font-bold">от 5 дней</span>
                  <span className="font-label-sm text-[11px] text-[#575e70]">Авиа &amp; Быстрое карго</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2e8f8] flex flex-col">
                  <span className="font-headline-sm text-[20px] text-[#151c27] font-bold">РФ &amp; USDT</span>
                  <span className="font-label-sm text-[11px] text-[#575e70]">СБП, безнал, счета</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Dynamic Asymmetric Factory Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-[#e2e8f8]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAczXJuDD60LT3ZB3kPzp5FrUiNm-1uolGYbta0fM4aO-wxZn5exrp-EhrOSRRlTEZfqA5r0w4zSKWq7fKpiED32jeCKPg7NajQSKf42u-lzQsTgv5ubEhmQ_yfgMTnE8kQnR500kTk7IGIQ0g787BfiY0s7vY6hlQWSFzUFWjgUKVXrgn1YJPLJ8RhfBkTdb1RZ5QSLYTY4jiihNmafCXCk0uWGYuNh3jWz9G_IrlTQ_iQG1Zitz_xOA" 
                  alt="Склад Иу консолидация" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151c27]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full w-max mb-2 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#bd001a]"></span>
                    <span className="font-label-sm text-[11px] text-white">Консолидация партий в реальном времени</span>
                  </div>
                  <span className="font-headline-sm text-[17px] font-bold leading-snug">
                    Склад Иу: отправка контейнера № CN-704
                  </span>
                  <span className="font-body-sm text-[12px] text-[#dce2f3]">
                    42 паллета прошли фотофиксацию и готовы к таможенному оформлению
                  </span>
                </div>
              </div>

              {/* Floating Overlap Metric Pill */}
              <button 
                onClick={onOpenCurrencyCalc}
                className="-mt-6 ml-6 relative z-10 bg-white p-3.5 rounded-xl shadow-lg border border-[#e2e8f8] flex items-center gap-3.5 max-w-xs cursor-pointer hover:border-[#bd001a] transition-all text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ffdcc3] flex items-center justify-center text-[#8e4b00] shrink-0">
                  <span className="material-symbols-outlined text-[24px]">price_change</span>
                </div>
                <div>
                  <div className="font-label-sm text-[11px] text-[#575e70]">Текущий курс конвертации</div>
                  <div className="font-headline-sm text-[17px] text-[#151c27] font-bold">1 ¥ = {EXCHANGE_RATE.toFixed(2)} ₽</div>
                </div>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY MATRIX */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="font-label-sm text-[11px] text-[#bd001a] uppercase tracking-widest font-bold">
              Ассортимент фабрик
            </span>
            <h2 className="font-headline-lg text-[26px] md:text-[30px] text-[#151c27] font-bold">
              Популярные направления поставок
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('katalog')}
            className="flex items-center gap-1 text-[#bd001a] font-label-md text-[13px] font-bold hover:underline cursor-pointer"
          >
            <span>Все 48 категорий</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {CATEGORIES.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('katalog')}
              className={`flex flex-col items-center text-center p-4 rounded-xl shadow-sm transition-all group cursor-pointer ${
                cat.id === 'b2b'
                  ? 'bg-[#d9dff5] hover:bg-[#c0c6db] border border-[#c0c6db]'
                  : 'bg-white hover:bg-[#e7eefe] border border-[#e2e8f8]'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                cat.id === 'b2b' 
                  ? 'bg-white text-[#bd001a] shadow-sm'
                  : 'bg-[#e7eefe] group-hover:bg-[#bd001a] group-hover:text-white text-[#bd001a]'
              }`}>
                <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              </div>
              <span className={`font-label-md text-[12px] leading-tight line-clamp-2 ${
                cat.id === 'b2b' ? 'font-bold text-[#151c27]' : 'text-[#151c27] group-hover:text-[#bd001a]'
              }`}>
                {cat.name}
              </span>
              <span className={`font-label-sm text-[10px] mt-1 ${cat.id === 'b2b' ? 'text-[#bd001a] font-bold' : 'text-[#575e70]'}`}>
                {cat.sku}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 3: POPULAR NOW (TRENDING PRODUCT GRID) */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
          <div>
            <span className="font-label-sm text-[11px] text-[#bd001a] uppercase tracking-widest font-bold">
              Розничный &amp; мелкооптовый поток
            </span>
            <h2 className="font-headline-lg text-[26px] md:text-[30px] text-[#151c27] font-bold">
              Популярное сейчас
            </h2>
          </div>
          
          <div className="flex items-center gap-1 bg-[#e7eefe] p-1 rounded-lg">
            <button 
              type="button"
              onClick={() => setTrendingTab('all')}
              className={`px-3 py-1.5 rounded-md font-label-sm text-[12px] transition-all cursor-pointer ${
                trendingTab === 'all' ? 'bg-white text-[#151c27] font-bold shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
              }`}
            >
              Все товары
            </button>
            <button 
              type="button"
              onClick={() => setTrendingTab('tiktok')}
              className={`px-3 py-1.5 rounded-md font-label-sm text-[12px] transition-all cursor-pointer ${
                trendingTab === 'tiktok' ? 'bg-white text-[#151c27] font-bold shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
              }`}
            >
              Тренды TikTok
            </button>
            <button 
              type="button"
              onClick={() => setTrendingTab('1688')}
              className={`px-3 py-1.5 rounded-md font-label-sm text-[12px] transition-all cursor-pointer ${
                trendingTab === '1688' ? 'bg-white text-[#151c27] font-bold shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
              }`}
            >
              Топ выкупа 1688
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_PRODUCTS.map((prod) => (
            <div 
              key={prod.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e2e8f8] group"
            >
              <div className="relative aspect-square w-full bg-[#f0f3ff] overflow-hidden">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" 
                  onClick={() => onViewProduct(prod.id)}
                />
                <span className="absolute top-3 left-3 bg-[#bd001a] text-white font-label-sm text-[11px] px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                  {prod.badge}
                </span>
                <button 
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur text-[#575e70] hover:text-[#bd001a] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-[#575e70] font-label-sm text-[11px]">
                  {prod.hub}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <span className="material-symbols-outlined text-[#8e4b00] text-[16px]">star</span>
                    <span className="font-bold text-[#151c27]">{prod.rating}</span>
                    <span className="text-[#575e70]">({prod.ordersCount} продано)</span>
                  </div>
                  <h3 
                    onClick={() => onViewProduct(prod.id)}
                    className="font-headline-sm text-[16px] text-[#151c27] font-bold line-clamp-2 cursor-pointer hover:text-[#bd001a] transition-colors leading-snug"
                  >
                    {prod.name}
                  </h3>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-headline-sm text-[22px] text-[#bd001a] font-extrabold">
                      ¥{prod.cnyPrice}
                    </span>
                    <span className="font-price-sub text-[13px] text-[#575e70]">
                      ≈ {prod.rubPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    {prod.oldCnyPrice && (
                      <span className="text-[12px] text-[#575e70] line-through ml-auto">
                        ¥{prod.oldCnyPrice} ({prod.oldRubPrice?.toLocaleString('ru-RU')} ₽)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleAddToCart(prod)}
                      className={`flex-1 py-2.5 rounded-xl font-label-md text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                        addedIds[prod.id]
                          ? 'bg-[#8e4b00] text-white'
                          : 'bg-[#bd001a] hover:bg-[#e61e2a] text-white'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {addedIds[prod.id] ? 'done' : 'shopping_bag'}
                      </span>
                      <span>{addedIds[prod.id] ? 'Добавлено!' : 'В корзину'}</span>
                    </button>

                    <button 
                      onClick={() => onViewProduct(prod.id)}
                      className="p-2.5 bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] rounded-xl transition-colors cursor-pointer"
                      title="Подробнее о фабрике"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: DIRECT FACTORY GOODS WITH MOQ */}
      <section className="w-full bg-[#f0f3ff] py-10 my-6">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#bd001a] mb-1">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="font-label-sm text-[11px] uppercase tracking-widest font-bold">Проверенные производители</span>
              </div>
              <h2 className="font-headline-lg text-[26px] md:text-[30px] text-[#151c27] font-bold">
                Товары напрямую с фабрик
              </h2>
              <p className="font-body-md text-[14px] text-[#575e70]">
                Оптовые партии с гибким минимальным заказом (MOQ) и инспекцией до отправки
              </p>
            </div>
            <button 
              onClick={() => onNavigate('tovary-s-fabrik')}
              className="px-4 py-2 bg-white hover:bg-[#e7eefe] text-[#151c27] rounded-lg font-label-md text-[13px] font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Смотреть каталог фабрик →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FACTORY_DIRECT_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#e2e8f8] mb-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-[#ffdcc3] text-[#2f1500] font-label-sm text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">verified</span> {item.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[#575e70] font-label-sm text-[11px] mb-1">
                    <span className="bg-[#f0f3ff] px-1.5 py-0.5 rounded text-[#151c27] font-semibold">{item.moq}</span>
                    <span>{item.delivery}</span>
                  </div>
                  <h4 className="font-headline-sm text-[15px] text-[#151c27] font-bold line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="mt-1 font-label-sm text-[11px] text-[#575e70]">
                    {item.factory}
                  </div>
                </div>

                <div className="pt-1">
                  <div className="font-headline-sm text-[17px] text-[#bd001a] font-bold">
                    от ¥{item.cny} <span className="font-body-sm text-[12px] text-[#575e70] font-normal">({item.rub} ₽ / шт)</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('tovary-s-fabrik')}
                    className="w-full mt-3 py-2 bg-[#e7eefe] hover:bg-[#bd001a] hover:text-white text-[#151c27] rounded-lg font-label-md text-[12px] font-semibold transition-colors cursor-pointer"
                    type="button"
                  >
                    Запросить спецификацию
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOT GROUP BUY POOL PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 w-full">
        <div className="bg-gradient-to-br from-[#e2e8f8] via-white to-[#f0f3ff] p-6 lg:p-8 rounded-3xl shadow-sm border border-[#e2e8f8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Pool Information */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#bd001a] text-white rounded-full font-label-sm text-[11px] w-max font-bold">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>Горящие коллективные закупки (Pool Buy)</span>
              </div>

              <h2 className="font-headline-lg text-[24px] md:text-[30px] text-[#151c27] font-bold leading-tight">
                Объединяйтесь с другими байерами и получайте контейнерную цену
              </h2>

              <p className="font-body-md text-[14px] text-[#575e70] max-w-xl">
                Выкупаем товар напрямую по максимальной скидке фабрики (Tier-3). Мы консолидируем партии на складе в Иу и доставляем каждому заказчику персонально.
              </p>

              {/* Hot Card Widget */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e2e8f8] mt-2 max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#e2e8f8] shrink-0">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHAs0egphQhOd129GoK7ZBEuPBjpuHb6eK3JRfslLkEY14QEH-aSbTCvISSnNdRvogaU1QHVRon5iFUd5qHgKKewLFzwTzpCwG-Vx4bLMngyVE_zFQruTiZvGRFcllY9ganq0wKhgWUQpdxHkqSLaMZk730kGKkWXLCW0qdKiyawk0XbaQKW0-QdgJjg4r0j3_EPPXiuZ3emccPLAGOJO7MKXBuTKawJ1141zhKcpT4Mo6oTw6J7ovAA" 
                      alt="Чехлы MagSafe" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-[16px] text-[#151c27] font-bold truncate">
                        Чехлы MagSafe Liquid Silicone
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[#bd001a] font-label-sm text-[10px] font-bold bg-[#ffdad6] px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[13px]">timer</span> Осталось 18 ч.
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-price-headline text-[22px] text-[#bd001a] font-extrabold">¥7.5</span>
                      <span className="font-price-sub text-[13px] text-[#575e70]">≈ 96 ₽ / шт</span>
                      <span className="text-[12px] text-[#575e70] line-through ml-2">¥18.0 (230 ₽)</span>
                    </div>
                  </div>
                </div>

                {/* Progress Meter */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between font-label-sm text-[12px] text-[#575e70]">
                    <span>Собрано: <strong className="text-[#151c27]">742 из 1 000 шт.</strong></span>
                    <span className="text-[#bd001a] font-bold">74% заполнено</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#e7eefe] rounded-full overflow-hidden">
                    <div className="h-full bg-[#bd001a] rounded-full transition-all duration-500" style={{ width: '74%' }}></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 pt-1">
                  <span className="font-label-sm text-[11px] text-[#575e70]">Минимальное участие: от 20 шт.</span>
                  <button 
                    onClick={() => onJoinPool('pool-iphone-cases')}
                    className="px-5 py-2 bg-[#bd001a] hover:bg-[#e61e2a] text-white font-label-md text-[13px] font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                    type="button"
                  >
                    Присоединиться к пулу
                  </button>
                </div>
              </div>
            </div>

            {/* Pool Visual Live Ticker */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col gap-2.5">
                <span className="font-label-md text-[12px] text-[#151c27] uppercase tracking-wider font-bold">
                  Активность пула за последний час
                </span>
                <div className="flex items-center gap-2 text-[13px] text-[#575e70]">
                  <span className="w-2 h-2 rounded-full bg-[#bd001a]"></span>
                  <span className="text-[#151c27] font-semibold">ИП Воронин (Москва)</span> добавил 150 шт.
                  <span className="ml-auto text-[11px] text-[#575e70]">4 мин назад</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#575e70]">
                  <span className="w-2 h-2 rounded-full bg-[#bd001a]"></span>
                  <span className="text-[#151c27] font-semibold">ООО «Ритейл-Про»</span> добавило 300 шт.
                  <span className="ml-auto text-[11px] text-[#575e70]">19 мин назад</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#575e70]">
                  <span className="w-2 h-2 rounded-full bg-[#bd001a]"></span>
                  <span className="text-[#151c27] font-semibold">Дмитрий С. (Казань)</span> добавил 50 шт.
                  <span className="ml-auto text-[11px] text-[#575e70]">32 мин назад</span>
                </div>
              </div>

              <div className="p-4 bg-[#e7eefe] rounded-2xl flex items-center justify-between border border-[#c0c6db]">
                <div className="flex flex-col">
                  <span className="font-label-md text-[13px] text-[#151c27] font-bold">Хотите открыть свой пул?</span>
                  <span className="font-body-sm text-[12px] text-[#575e70]">Предложите товар с 1688 и соберите группу</span>
                </div>
                <button 
                  onClick={() => onNavigate('kollektivnye-zakupki')}
                  className="px-4 py-2 bg-white text-[#bd001a] hover:bg-[#bd001a] hover:text-white font-label-md text-[12px] font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Создать
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: B2B & MARKETPLACE SELLERS BLOCK */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center gap-2">
          <span className="font-label-sm text-[11px] text-[#bd001a] uppercase tracking-widest font-bold">
            B2B Инфраструктура
          </span>
          <h2 className="font-headline-lg text-[26px] md:text-[32px] text-[#151c27] font-bold leading-tight">
            Найдите товар, создайте собственный бренд или закупите партию напрямую у производителя
          </h2>
          <p className="font-body-lg text-[15px] text-[#575e70]">
            Комплексное сопровождение поставок для селлеров Wildberries, Ozon, Яндекс Маркет и сетевой розницы.
          </p>
        </div>

        {/* 4 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col gap-3 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[28px]">search_insights</span>
            </div>
            <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Поиск фабрик по фото и 1688/Taobao</h3>
            <p className="font-body-md text-[13px] text-[#575e70] leading-relaxed">
              Мгновенный подбор первоисточника товара по фото или ссылке с расчетом себестоимости под ключ с доставкой до вашего склада.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col gap-3 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[28px]">inventory</span>
            </div>
            <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Образцы за 7 дней</h3>
            <p className="font-body-md text-[13px] text-[#575e70] leading-relaxed">
              Экспресс-доставка сэмплов самолетом для оценки материалов, посадки, упаковки и функционала перед крупным промышленным заказом.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col gap-3 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[28px]">branding_watermark</span>
            </div>
            <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Собственный логотип &amp; OEM/ODM</h3>
            <p className="font-body-md text-[13px] text-[#575e70] leading-relaxed">
              Брендирование продукции на производственной линии: нанесение логотипов, разработка кастомной упаковки, русификация инструкций.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col gap-3 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[28px]">gavel</span>
            </div>
            <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Белая таможня под ключ</h3>
            <p className="font-body-md text-[13px] text-[#575e70] leading-relaxed">
              Полная документальная чистота: ГТД, сертификаты соответствия, маркировка Честный Знак и безналичная оплата юрлицам с НДС.
            </p>
          </div>
        </div>

        {/* Sourcing Action CTA Strip */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#bd001a] shrink-0">
              <span className="material-symbols-outlined text-[28px]">handshake</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-[18px] text-[#151c27] font-bold">Готовы масштабировать товарный бизнес?</h4>
              <p className="font-body-sm text-[13px] text-[#575e70]">Персональный ВЭД-менеджер свяжется с вами и рассчитает экономику за 2 часа</p>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('dlya-biznesa-b2b')}
            className="px-6 py-3.5 bg-[#bd001a] hover:bg-[#e61e2a] text-white font-label-md text-[14px] font-bold rounded-xl transition-colors shadow-md whitespace-nowrap cursor-pointer active:scale-95"
          >
            Оставить заявку на поиск поставщика
          </button>
        </div>
      </section>
    </div>
  );
};
