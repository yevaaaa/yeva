import React, { useState } from 'react';
import { PageView, Product } from '../types';
import { CATALOG_PRODUCTS, CATEGORIES, EXCHANGE_RATE } from '../data/mockData';

interface CatalogViewProps {
  onNavigate: (page: PageView) => void;
  onAddToCart: (product: Product, qty?: number) => void;
  onViewProduct: (productId: string) => void;
  onOpenPhotoSearch: () => void;
  searchQuery?: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onNavigate,
  onAddToCart,
  onViewProduct,
  onOpenPhotoSearch,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(3200);
  const [moqFilter, setMoqFilter] = useState<string>('all');
  const [activeTags, setActiveTags] = useState<{ [key: string]: boolean }>({
    verified: true,
    fastDelivery: false,
    moq1: false,
    sampleAvailable: false,
    oem: false,
    hits: false,
  });
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const [conciergeUrl, setConciergeUrl] = useState('');
  const [conciergeSuccess, setConciergeSuccess] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<string>('4.8');
  const [supplierType, setSupplierType] = useState<{ [key: string]: boolean }>({
    manufacturer: true,
    distributor: true,
    iso: false,
  });
  const [sortOption, setSortOption] = useState<string>('popular');

  const toggleTag = (key: string) => {
    setActiveTags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = (p: Product) => {
    onAddToCart(p, p.moq || 1);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1800);
  };

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeUrl.trim()) return;
    setConciergeSuccess(true);
    setTimeout(() => {
      setConciergeSuccess(false);
      setConciergeUrl('');
    }, 3500);
  };

  // Filter products based on selected criteria
  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    if (prod.cnyPrice > priceMax) {
      return false;
    }
    if (moqFilter === '1' && prod.moq > 1) return false;
    if (moqFilter === '10' && prod.moq > 10) return false;
    if (moqFilter === '50' && prod.moq > 50) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return prod.name.toLowerCase().includes(q) || prod.factoryName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Sub-Header Meta Strip */}
      <section className="w-full bg-[#f0f3ff] py-2.5 border-b border-[#e2e8f8]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-2 text-[12px]">
          <div className="flex items-center gap-1.5 text-[#575e70]">
            <button onClick={() => onNavigate('glavnaya')} className="hover:text-[#bd001a] transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              Главная
            </button>
            <span className="text-[#c0c6db]">/</span>
            <span className="text-[#151c27] font-semibold">Каталог фабрик</span>
            <span className="text-[#c0c6db]">/</span>
            <span className="text-[#bd001a] font-bold">Все категории (Прямой опт 1688)</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#575e70]">
              <span className="w-2 h-2 rounded-full bg-[#8e4b00]"></span>
              <span>Прямой коннектор к API 1688 · Обновление остатков: 4 мин. назад</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-xs text-[#151c27] border border-[#e2e8f8]">
              <span className="text-[#575e70]">Таможенная ставка:</span>
              <span className="font-bold text-[#bd001a]">Карго $2.4/кг · Белая от 6%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Page Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-6">
        
        {/* Top Command Center */}
        <div className="w-full mb-6 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] font-label-sm text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Оптовая биржа
                </span>
                <span className="text-[#575e70] font-mono text-[12px]">ID Хаба: CN-SZ-89</span>
              </div>
              <h1 className="font-headline-lg text-[28px] md:text-[34px] text-[#151c27] tracking-tight font-extrabold flex items-baseline gap-2">
                Каталог товаров с фабрик
                <span className="font-body-md text-[14px] text-[#575e70] font-normal">
                  (найдено <strong className="text-[#bd001a] font-bold">{filteredProducts.length > 0 ? '14 820' : '0'}</strong> проверенных лотов)
                </span>
              </h1>
            </div>

            {/* Sorting & Display Controls */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <label className="text-[13px] text-[#575e70] whitespace-nowrap font-medium" htmlFor="sort-select">
                Сортировка:
              </label>
              <div className="relative min-w-[200px]">
                <select 
                  id="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full appearance-none bg-white text-[#151c27] font-semibold text-[13px] py-2.5 pl-3 pr-8 rounded-lg shadow-sm border border-[#e2e8f8] focus:outline-none focus:border-[#bd001a] cursor-pointer"
                >
                  <option value="popular">Популярные лоты</option>
                  <option value="factory-rating">Рейтинг фабрики (Top OEM)</option>
                  <option value="sales-vol">По объёму продаж (1688)</option>
                  <option value="newest">Новинки с выставок</option>
                  <option value="price-asc">Цена: по возрастанию (¥)</option>
                  <option value="price-desc">Цена: по убыванию (¥)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#575e70] text-[20px]">
                  expand_more
                </span>
              </div>

              <div className="hidden sm:flex items-center bg-[#e7eefe] rounded-lg p-0.5 shadow-xs border border-[#c0c6db]">
                <button className="p-1.5 rounded-md bg-white text-[#151c27] shadow-xs cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button className="p-1.5 rounded-md text-[#575e70] hover:text-[#151c27] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Tag Pills Filter Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button 
              onClick={() => toggleTag('verified')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                activeTags.verified ? 'bg-[#e61e2a] text-white shadow-sm' : 'bg-[#f0f3ff] text-[#575e70] hover:bg-[#e7eefe]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Только проверенные фабрики
            </button>

            <button 
              onClick={() => toggleTag('fastDelivery')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                activeTags.fastDelivery ? 'bg-[#e61e2a] text-white shadow-sm' : 'bg-[#f0f3ff] text-[#575e70] hover:bg-[#e7eefe]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">flight_takeoff</span>
              С быстрой доставкой (Авиа 5-9 дней)
            </button>

            <button 
              onClick={() => toggleTag('moq1')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                activeTags.moq1 ? 'bg-[#e61e2a] text-white shadow-sm' : 'bg-[#f0f3ff] text-[#575e70] hover:bg-[#e7eefe]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">inventory_2</span>
              MOQ от 1 шт.
            </button>

            <button 
              onClick={() => toggleTag('sampleAvailable')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                activeTags.sampleAvailable ? 'bg-[#e61e2a] text-white shadow-sm' : 'bg-[#f0f3ff] text-[#575e70] hover:bg-[#e7eefe]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">science</span>
              Образцы доступны
            </button>

            <button 
              onClick={() => toggleTag('oem')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                activeTags.oem ? 'bg-[#e61e2a] text-white shadow-sm' : 'bg-[#f0f3ff] text-[#575e70] hover:bg-[#e7eefe]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">branding_watermark</span>
              OEM / Private Label
            </button>

            <button 
              onClick={() => toggleTag('hits')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                activeTags.hits ? 'bg-[#e61e2a] text-white shadow-sm' : 'bg-[#f0f3ff] text-[#575e70] hover:bg-[#e7eefe]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
              Хиты продаж СНГ
            </button>
          </div>
        </div>

        {/* Main Dynamic Layout (Sidebar Filter + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. LEFT FILTER SIDEBAR */}
          <aside className="w-full lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-[#e2e8f8] space-y-5">
              
              {/* Reset Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f8]">
                <div className="flex items-center gap-1.5 font-headline-sm text-[16px] text-[#151c27] font-bold">
                  <span className="material-symbols-outlined text-[#bd001a] text-[22px]">tune</span>
                  Фильтры
                </div>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceMax(3200);
                    setMoqFilter('all');
                  }}
                  className="font-label-sm text-[11px] text-[#bd001a] hover:text-[#e61e2a] font-bold cursor-pointer"
                >
                  Сбросить все
                </button>
              </div>

              {/* Category Tree */}
              <div className="space-y-1.5">
                <button 
                  type="button"
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                  className="w-full flex items-center justify-between py-1 text-left font-label-md text-[13px] text-[#151c27] font-bold cursor-pointer"
                >
                  <span>Категории производства</span>
                  <span className={`material-symbols-outlined text-[#575e70] text-[18px] transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {isAccordionOpen && (
                  <div className="space-y-1 pt-1">
                    {CATEGORIES.slice(0, 6).map((c) => (
                      <label 
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors ${
                          selectedCategory === c.id 
                            ? 'bg-[#f0f3ff] text-[#bd001a] font-bold' 
                            : 'hover:bg-[#f0f3ff] text-[#151c27]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === c.id ? 'bg-[#bd001a]' : 'bg-[#c0c6db]'}`}></span>
                          {c.name}
                        </span>
                        <span className="text-[11px] text-[#575e70]">{c.count}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Slider (CNY & RUB) */}
              <div className="pt-2 border-t border-[#e2e8f8] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-[13px] text-[#151c27] font-bold">Ценовой диапазон лота</span>
                  <span className="font-label-sm text-[11px] text-[#8e4b00] font-bold">1 ¥ = {EXCHANGE_RATE.toFixed(1)} ₽</span>
                </div>
                <div className="p-3 bg-[#f0f3ff] rounded-xl space-y-2">
                  <div className="flex items-center justify-between font-label-md text-[12px]">
                    <span className="text-[#575e70]">от <strong className="text-[#151c27]">10 ¥</strong></span>
                    <span className="text-[#575e70]">до <strong className="text-[#bd001a] font-bold">{priceMax} ¥</strong></span>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="5000"
                    step="50"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#bd001a] cursor-pointer bg-[#e2e8f8] rounded-lg h-2"
                  />
                  <div className="flex justify-between items-center text-[#575e70] font-body-sm text-[11px]">
                    <span>≈ 128 ₽</span>
                    <span className="text-[#151c27] font-semibold">≈ {Math.round(priceMax * EXCHANGE_RATE).toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>

              {/* MOQ Filter */}
              <div className="pt-2 border-t border-[#e2e8f8] space-y-2">
                <span className="font-label-md text-[13px] text-[#151c27] font-bold block">
                  Минимальная партия (MOQ)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#e7eefe] cursor-pointer transition-colors text-[12px]">
                    <input 
                      type="radio" 
                      name="moq" 
                      checked={moqFilter === 'all'} 
                      onChange={() => setMoqFilter('all')}
                      className="accent-[#bd001a]"
                    />
                    <span className="font-medium text-[#151c27]">Любая</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#e7eefe] cursor-pointer transition-colors text-[12px]">
                    <input 
                      type="radio" 
                      name="moq" 
                      checked={moqFilter === '1'} 
                      onChange={() => setMoqFilter('1')}
                      className="accent-[#bd001a]"
                    />
                    <span className="font-medium text-[#151c27]">от 1 шт.</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#e7eefe] cursor-pointer transition-colors text-[12px]">
                    <input 
                      type="radio" 
                      name="moq" 
                      checked={moqFilter === '10'} 
                      onChange={() => setMoqFilter('10')}
                      className="accent-[#bd001a]"
                    />
                    <span className="font-medium text-[#151c27]">от 10 шт.</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#e7eefe] cursor-pointer transition-colors text-[12px]">
                    <input 
                      type="radio" 
                      name="moq" 
                      checked={moqFilter === '50'} 
                      onChange={() => setMoqFilter('50')}
                      className="accent-[#bd001a]"
                    />
                    <span className="font-medium text-[#151c27]">от 50 шт.</span>
                  </label>
                </div>
              </div>

              {/* Supplier Verification Type */}
              <div className="pt-2 border-t border-[#e2e8f8] space-y-2">
                <span className="font-label-md text-[13px] text-[#151c27] font-bold block">
                  Тип поставщика в Китае
                </span>
                <div className="space-y-1.5 text-[12px]">
                  <label className="flex items-center gap-2 text-[#151c27] cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={supplierType.manufacturer}
                      onChange={(e) => setSupplierType({ ...supplierType, manufacturer: e.target.checked })}
                      className="rounded accent-[#bd001a] w-4 h-4"
                    />
                    <span className="flex-1">Фабрика-производитель (Manufacturer)</span>
                    <span className="text-[10px] text-[#575e70] bg-[#e7eefe] px-1.5 py-0.5 rounded font-mono">9.2k</span>
                  </label>
                  <label className="flex items-center gap-2 text-[#151c27] cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={supplierType.distributor}
                      onChange={(e) => setSupplierType({ ...supplierType, distributor: e.target.checked })}
                      className="rounded accent-[#bd001a] w-4 h-4"
                    />
                    <span className="flex-1">Официальный дистрибьютор бренда</span>
                    <span className="text-[10px] text-[#575e70] bg-[#e7eefe] px-1.5 py-0.5 rounded font-mono">3.4k</span>
                  </label>
                  <label className="flex items-center gap-2 text-[#151c27] cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={supplierType.iso}
                      onChange={(e) => setSupplierType({ ...supplierType, iso: e.target.checked })}
                      className="rounded accent-[#bd001a] w-4 h-4"
                    />
                    <span className="flex-1">Верифицирован TUV / SGS / ISO9001</span>
                    <span className="text-[10px] text-[#575e70] bg-[#e7eefe] px-1.5 py-0.5 rounded font-mono">2.1k</span>
                  </label>
                </div>
              </div>

              {/* Reliability Rating */}
              <div className="pt-2 border-t border-[#e2e8f8] space-y-2">
                <span className="font-label-md text-[13px] text-[#151c27] font-bold block">
                  Рейтинг надёжности фабрики
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setRatingFilter('4.0')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      ratingFilter === '4.0' ? 'bg-[#bd001a] text-white shadow-xs' : 'bg-[#e7eefe] text-[#151c27] hover:bg-[#dce2f3]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">star</span> 4.0+
                  </button>
                  <button 
                    onClick={() => setRatingFilter('4.8')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      ratingFilter === '4.8' ? 'bg-[#bd001a] text-white shadow-xs' : 'bg-[#e7eefe] text-[#151c27] hover:bg-[#dce2f3]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">star</span> 4.8+ Top
                  </button>
                  <button 
                    onClick={() => setRatingFilter('5.0')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      ratingFilter === '5.0' ? 'bg-[#bd001a] text-white shadow-xs' : 'bg-[#e7eefe] text-[#151c27] hover:bg-[#dce2f3]'
                    }`}
                  >
                    5.0 Gold
                  </button>
                </div>
              </div>

            </div>

            {/* Live Audit Promo Widget */}
            <div className="bg-[#f0f3ff] rounded-xl p-4 shadow-sm border border-[#e2e8f8] relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#bd001a] font-label-md text-[12px] font-bold mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#bd001a] animate-ping"></span>
                Аудит цехов в Иу и Шэньчжэне
              </div>
              <p className="font-body-sm text-[12px] text-[#575e70] mb-3">
                Наши русскоязычные инспекторы ежедневно выезжают на линии для видео-приемки партий.
              </p>
              <div className="flex items-center justify-between text-[#151c27] font-label-sm text-[12px] bg-white p-2.5 rounded-lg border border-[#e2e8f8]">
                <span>Сегодня инспекций:</span>
                <strong className="text-[#bd001a] font-headline-sm text-[16px]">28 фабрик</strong>
              </div>
            </div>
          </aside>

          {/* 2. PRODUCT CARDS GRID & RESULTS */}
          <main className="w-full lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((prod) => (
                <article 
                  key={prod.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden border border-[#e2e8f8] group"
                >
                  {/* Visual Media Container */}
                  <div className="relative w-full aspect-square bg-[#f0f3ff] overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" 
                      onClick={() => onViewProduct(prod.id)}
                    />
                    
                    {/* Floating Badges Top */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      {prod.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#bd001a] text-white font-label-sm text-[10px] uppercase font-bold shadow-xs">
                          {prod.badge}
                        </span>
                      )}
                      {prod.secondaryBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur text-[#8e4b00] font-label-sm text-[10px] font-bold shadow-xs border border-[#e2e8f8]">
                          {prod.secondaryBadge}
                        </span>
                      )}
                    </div>

                    <button 
                      type="button"
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-[#575e70] hover:text-[#bd001a] flex items-center justify-center transition-colors shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur text-[#151c27] font-label-sm text-[10px] font-bold shadow-xs border border-[#e2e8f8]">
                      {prod.moqLabel}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#2a313d]/85 backdrop-blur text-white font-label-sm text-[10px]">
                      {prod.hub}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[#575e70] font-label-sm text-[11px] mb-1">
                        <div className="flex items-center gap-1 text-[#8e4b00] font-bold">
                          <span className="material-symbols-outlined text-[15px]">verified</span>
                          Verified OEM ⭐ {prod.rating}
                        </div>
                        <span className="text-[#575e70]">{prod.ordersCount} заказов</span>
                      </div>

                      <h3 
                        onClick={() => onViewProduct(prod.id)}
                        className="font-headline-sm text-[15px] text-[#151c27] font-bold line-clamp-2 leading-snug group-hover:text-[#bd001a] transition-colors cursor-pointer"
                      >
                        {prod.name}
                      </h3>
                    </div>

                    {/* Dual-Currency Price & Matrix Breaks */}
                    <div className="bg-[#f0f3ff] rounded-lg p-2.5 space-y-1">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-price-headline text-[22px] text-[#bd001a] font-extrabold">
                            ¥{prod.cnyPrice}
                          </span>
                          <span className="font-price-sub text-[13px] text-[#575e70]">
                            ≈ {prod.rubPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <span className="font-label-sm text-[11px] text-[#575e70]">за 1 шт.</span>
                      </div>

                      {prod.wholesaleCny && (
                        <div className="text-[#8e4b00] font-label-sm text-[11px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">local_offer</span>
                          Оптом от ¥{prod.wholesaleCny} ({prod.wholesaleRub} ₽) при партии от {prod.wholesaleMinQty} шт.
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button 
                        onClick={() => onViewProduct(prod.id)}
                        className="w-full py-2 bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] rounded-lg font-label-md text-[12px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">science</span>
                        Образец
                      </button>

                      <button 
                        onClick={() => handleAddToCart(prod)}
                        className={`w-full py-2 rounded-lg font-label-md text-[12px] font-bold transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer ${
                          addedIds[prod.id] 
                            ? 'bg-[#8e4b00] text-white' 
                            : 'bg-[#bd001a] hover:bg-[#e61e2a] text-white'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {addedIds[prod.id] ? 'done' : 'shopping_cart'}
                        </span>
                        <span>{addedIds[prod.id] ? 'В корзине!' : 'В корзину'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            <nav className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e2e8f8]">
              <div className="text-[#575e70] font-body-sm text-[13px]">
                Показано <strong className="text-[#151c27] font-semibold">1 – {filteredProducts.length}</strong> из <strong className="text-[#151c27] font-semibold">14 820</strong> позиций
              </div>
              
              <div className="flex items-center gap-1.5">
                <button className="w-9 h-9 rounded-lg bg-[#e7eefe] text-[#575e70] hover:text-[#151c27] flex items-center justify-center transition-colors disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 rounded-lg bg-[#bd001a] text-white font-bold text-[13px] shadow-sm">
                  1
                </button>
                <button className="w-9 h-9 rounded-lg bg-white border border-[#e2e8f8] text-[#151c27] hover:bg-[#f0f3ff] text-[13px] font-semibold transition-colors">
                  2
                </button>
                <button className="w-9 h-9 rounded-lg bg-white border border-[#e2e8f8] text-[#151c27] hover:bg-[#f0f3ff] text-[13px] font-semibold transition-colors">
                  3
                </button>
                <span className="w-6 text-center text-[#575e70] font-bold">...</span>
                <button className="w-9 h-9 rounded-lg bg-white border border-[#e2e8f8] text-[#151c27] hover:bg-[#f0f3ff] text-[13px] font-semibold transition-colors">
                  618
                </button>
                <button className="w-9 h-9 rounded-lg bg-[#e7eefe] text-[#575e70] hover:text-[#151c27] flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </nav>
          </main>
        </div>

        {/* BOTTOM QUICK ASSISTANCE CONCIERGE BANNER */}
        <section className="w-full mt-12 bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-md border border-[#e2e8f8] relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#bd001a]/5 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#bd001a] font-label-sm text-[11px] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[15px]">flash_on</span>
                Экспресс-байер сервис
              </div>

              <h2 className="font-headline-lg text-[24px] md:text-[30px] text-[#151c27] font-bold">
                Не нашли нужный товар в каталоге?
              </h2>

              <p className="font-body-lg text-[14px] md:text-[15px] text-[#575e70] max-w-2xl leading-relaxed">
                Отправьте прямую ссылку на <strong>1688, Taobao, Poizon</strong> или загрузите фотографию образца. Наши байеры в Иу и Гуанчжоу найдут первоисточник фабрики, согласуют оптовую цену и пришлют расчёт «под ключ» за <strong>2 часа</strong>.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-[#575e70] text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#bd001a] text-[18px]">gavel</span>
                  Контракт ВЭД без рисков
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#bd001a] text-[18px]">verified_user</span>
                  Бесплатная проверка фабрики в реестре КНР
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#bd001a] text-[18px]">support_agent</span>
                  Русскоязычные байеры на складе
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <form onSubmit={handleConciergeSubmit} className="p-4 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8] space-y-3">
                <label className="text-[13px] font-bold text-[#151c27] block">
                  Вставьте ссылку на 1688 или опишите товар:
                </label>
                
                <div className="flex items-center bg-white rounded-lg p-1 shadow-xs border border-[#c0c6db] focus-within:border-[#bd001a]">
                  <input 
                    type="text"
                    value={conciergeUrl}
                    onChange={(e) => setConciergeUrl(e.target.value)}
                    placeholder="https://detail.1688.com/offer/..."
                    className="w-full bg-transparent px-2.5 py-1.5 text-[13px] text-[#151c27] focus:outline-none"
                    required
                  />
                  <button 
                    type="button"
                    onClick={onOpenPhotoSearch}
                    className="p-1.5 text-[#575e70] hover:text-[#bd001a] transition-colors"
                    title="Прикрепить фото образца"
                  >
                    <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                  </button>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-lg font-label-md text-[13px] font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Заказать поиск на фабриках (Бесплатно)</span>
                </button>

                {conciergeSuccess && (
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 text-[12px] font-bold rounded-lg text-center animate-fadeIn">
                    ✓ Запрос отправлен! Расчет поступит байеру в течение 2 часов.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
