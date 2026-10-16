import React from 'react';
import { PageView } from '../types';
import { BRAND_LOGO_URL, EXCHANGE_RATE } from '../data/mockData';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenPhotoSearch: () => void;
  onOpenCurrencyCalc: () => void;
  onOpenSupportChat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  favoritesCount,
  onOpenPhotoSearch,
  onOpenCurrencyCalc,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  const navItems: { id: PageView; label: string }[] = [
    { id: 'glavnaya', label: 'Главная' },
    { id: 'katalog', label: 'Каталог' },
    { id: 'tovary-s-fabrik', label: 'Товары с фабрик' },
    { id: 'kollektivnye-zakupki', label: 'Коллективные закупки' },
    { id: 'korzina', label: 'Корзина партий' },
    { id: 'oformlenie-zakaza', label: 'Оформление заказа' },
    { id: 'dlya-biznesa-b2b', label: 'Для бизнеса (B2B)' },
    { id: 'logistika-i-treking', label: 'Логистика & Трекинг' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e2e8f8]/80 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-2 flex flex-col justify-between">
        
        {/* Top Micro-Bar for B2B status & live hub rates */}
        <div className="hidden sm:flex items-center justify-between text-[#575e70] font-body-sm text-[12px] pb-1.5 border-b border-[#e2e8f8]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-label-sm uppercase tracking-wider text-[#575e70]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Склады: Иу • Гуанчжоу • Шэньчжэнь
            </span>
            <span className="text-[#c0c6db]">|</span>
            <button 
              onClick={onOpenCurrencyCalc} 
              className="flex items-center gap-1 text-[#151c27] hover:text-[#bd001a] transition-colors cursor-pointer"
              title="Открыть калькулятор валют"
            >
              <span className="font-bold text-[#bd001a]">1 ¥ ≈ {EXCHANGE_RATE.toFixed(2)} ₽</span>
              <span className="text-[#575e70] font-label-sm">(Биржевой фабричный курс)</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-1 text-[#575e70] font-label-sm">
              <span className="material-symbols-outlined text-[16px] text-[#8e4b00]">shield</span>
              Белая таможня • Договор РФ с НДС
            </span>
            <button
              onClick={() => onNavigate('logistika-i-treking')}
              className="font-label-sm text-[#575e70] hover:text-[#bd001a] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">local_shipping</span>
              Трекинг контейнеров
            </button>
          </div>
        </div>

        {/* Main Brand & Action Header */}
        <div className="flex items-center justify-between gap-3 md:gap-4 pt-2 pb-1.5">
          {/* Logo & Catalog trigger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => onNavigate('glavnaya')} 
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              <img 
                src={BRAND_LOGO_URL} 
                alt="Клуб Китай" 
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" 
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[17px] md:text-[18px] text-[#bd001a] font-bold uppercase tracking-tight">
                  Клуб Китай
                </span>
                <span className="font-label-sm text-[9px] md:text-[10px] text-[#575e70] uppercase tracking-widest -mt-0.5">
                  Прямой опт 1688
                </span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('katalog')}
              className="flex items-center gap-1.5 bg-[#bd001a] hover:bg-[#e61e2a] text-white px-3 md:px-4 py-2 rounded-lg font-label-md transition-all shadow-sm active:scale-95 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span className="hidden sm:inline font-bold">Каталог</span>
            </button>
          </div>

          {/* Search Bar with Photo Search button */}
          <div className="flex-1 max-w-2xl px-1">
            <form onSubmit={onSearchSubmit} className="relative flex items-center w-full bg-white rounded-lg shadow-[0_1px_8px_rgba(0,0,0,0.06)] border border-[#e2e8f8] focus-within:border-[#bd001a] transition-all">
              <span className="material-symbols-outlined text-[#575e70] ml-3 text-[20px]">search</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Что хотите найти в Китае? Например: наушники, станки, худи..."
                className="w-full bg-transparent py-2 px-2.5 text-[#151c27] placeholder:text-[#575e70] font-body-sm text-[13px] focus:outline-none"
              />
              <button 
                type="button"
                onClick={onOpenPhotoSearch}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[#575e70] hover:text-[#bd001a] hover:bg-[#f0f3ff] rounded-md mx-1 transition-colors"
                title="Поиск фабрики по фото"
              >
                <span className="material-symbols-outlined text-[19px] text-[#bd001a]">photo_camera</span>
                <span className="hidden xl:inline font-label-sm whitespace-nowrap text-[#575e70] font-medium">Поиск по фото</span>
              </button>
              <button 
                type="submit"
                className="bg-[#bd001a] hover:bg-[#e61e2a] text-white px-4 py-2 rounded-r-lg font-label-md text-[13px] font-semibold transition-colors shrink-0"
              >
                Найти
              </button>
            </form>
          </div>

          {/* Right Action Icons & User profile */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Quick Currency Chip on Tablet/Desktop */}
            <button 
              onClick={onOpenCurrencyCalc}
              className="hidden xl:flex items-center gap-1.5 bg-[#e7eefe] hover:bg-[#dce2f3] px-3 py-1.5 rounded-full text-[#151c27] transition-all"
            >
              <span className="font-bold text-[#bd001a] text-[13px]">1 ¥ ≈ {EXCHANGE_RATE.toFixed(1)} ₽</span>
              <span className="text-[#575e70] text-[11px]">• Фабричный курс</span>
            </button>

            {/* Favorite, Orders, Cart Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => onNavigate('katalog')}
                className="flex flex-col items-center text-[#575e70] hover:text-[#bd001a] transition-colors p-1"
                title="Избранные фабрики и лоты"
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-[22px]">favorite</span>
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-[#8e4b00] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-label-sm text-[10px]">Избранное</span>
              </button>

              <button 
                onClick={() => onNavigate('zakazy')}
                className="flex flex-col items-center text-[#575e70] hover:text-[#bd001a] transition-colors p-1"
                title="Мои партии и декларации"
              >
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                <span className="hidden sm:inline font-label-sm text-[10px]">Заказы</span>
              </button>

              <button 
                onClick={() => onNavigate('korzina')}
                className="relative flex flex-col items-center text-[#575e70] hover:text-[#bd001a] transition-colors p-1"
                title="Корзина партий"
              >
                <div className="relative">
                  <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                  <span className="absolute -top-1 -right-2 bg-[#bd001a] text-white font-label-sm font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                </div>
                <span className="hidden sm:inline font-label-sm text-[10px]">Корзина</span>
              </button>
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#e2e8f8]">
              <img 
                src="https://lh3.googleusercontent.com/aida/AEtjO1W1sMpEAWno21sHj92cMhceGryrtfAoWnBo9fHPQ7V0PbN2zPFBKwWIn8j902i0H_eGil7bn58vGnzUwuQwFxcogWHfgtZ9canLDb0gs0BAG-CbpxS_Lax9qpKJH_NZ0JezF95_W8fhAf905Cm-QIERrHLg1BiUAc99CPti2csQ9FUeOEJaTD_8gXnSzRXp7Q5n5nLaSlZ1Rl8ns96ID4JoABSM2795KNIpy4v8VVsGhKGuRpeUP6o--4sA" 
                alt="Алексей" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30" 
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-[13px] text-[#151c27] leading-tight font-semibold">Алексей</span>
                <span className="font-label-sm text-[10px] text-[#8e4b00] font-bold">Pro Buyer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Horizontal Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto py-1.5 text-[#575e70] scrollbar-none border-t border-[#e2e8f8]/50">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-all whitespace-nowrap py-1.5 px-3 rounded-lg text-[13px] font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-[#e61e2a] text-white shadow-sm font-bold'
                    : 'text-[#5d3f3c] hover:text-[#151c27] hover:bg-[#e7eefe]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
