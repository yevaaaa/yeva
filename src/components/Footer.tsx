import React from 'react';
import { PageView } from '../types';
import { BRAND_LOGO_URL, EXCHANGE_RATE } from '../data/mockData';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenSupportChat: () => void;
  onOpenPhotoSearch: () => void;
  onOpenCurrencyCalc: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSupportChat,
  onOpenPhotoSearch,
  onOpenCurrencyCalc,
}) => {
  return (
    <footer className="w-full bg-[#f0f3ff] mt-10 border-t border-[#e2e8f8]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-white p-6 rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#e2e8f8]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] shrink-0">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <div>
              <div className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                Проверка качества на складе в Иу
              </div>
              <div className="font-body-sm text-[13px] text-[#575e70] mt-0.5">
                Фото- и видеоотчет каждого артикула перед отправкой в РФ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] shrink-0">
              <span className="material-symbols-outlined text-[32px]">local_shipping</span>
            </div>
            <div>
              <div className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                Белая таможня &amp; КАРГО
              </div>
              <div className="font-body-sm text-[13px] text-[#575e70] mt-0.5">
                Полный пакет документов, ГТД, Честный Знак и страхование груза
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] shrink-0">
              <span className="material-symbols-outlined text-[32px]">payments</span>
            </div>
            <div>
              <div className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                Оплата картами РФ и USDT
              </div>
              <div className="font-body-sm text-[13px] text-[#575e70] mt-0.5">
                Официальный договор, безналичный расчет для юрлиц с НДС
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column Sitemap */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src={BRAND_LOGO_URL} 
                alt="Клуб Китай" 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <span className="font-headline-sm text-[20px] text-[#bd001a] font-bold uppercase tracking-tight">
                Клуб Китай
              </span>
            </div>
            <p className="font-body-md text-[#575e70] text-[14px] max-w-sm leading-relaxed">
              КЛУБ КИТАЙ — прямые поставки с фабрик Гуанчжоу, Шэньчжэня, Иу и Нинбо без торговых посредников и скрытых комиссий.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button 
                onClick={onOpenCurrencyCalc}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e2e8f8] rounded-full font-label-sm text-[#151c27] shadow-sm hover:border-[#bd001a] transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#bd001a] animate-pulse"></span>
                Онлайн курс: 1 ¥ ≈ {EXCHANGE_RATE.toFixed(2)} ₽
              </button>
              <button 
                onClick={onOpenSupportChat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d9dff5] hover:bg-[#c0c6db] text-[#151c27] rounded-lg font-label-md text-[12px] font-semibold transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-[#bd001a]">support_agent</span>
                Чат с поддержкой
              </button>
            </div>
          </div>

          {/* Buyers */}
          <div>
            <div className="font-label-md text-[13px] text-[#151c27] mb-3 uppercase tracking-wider font-bold">
              Покупателям
            </div>
            <ul className="space-y-2 font-body-md text-[13px] text-[#575e70]">
              <li>
                <button onClick={() => onNavigate('katalog')} className="hover:text-[#bd001a] transition-colors text-left">
                  Каталог товаров
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kollektivnye-zakupki')} className="hover:text-[#bd001a] transition-colors text-left">
                  Совместные пулы
                </button>
              </li>
              <li>
                <button onClick={onOpenPhotoSearch} className="hover:text-[#bd001a] transition-colors text-left">
                  Поиск фабрик по фото
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('oformlenie-zakaza')} className="hover:text-[#bd001a] transition-colors text-left">
                  Калькулятор доставки
                </button>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <div className="font-label-md text-[13px] text-[#151c27] mb-3 uppercase tracking-wider font-bold">
              Для Бизнеса
            </div>
            <ul className="space-y-2 font-body-md text-[13px] text-[#575e70]">
              <li>
                <button onClick={() => onNavigate('dlya-biznesa-b2b')} className="hover:text-[#bd001a] transition-colors text-left">
                  Оптовые контракты
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dlya-biznesa-b2b')} className="hover:text-[#bd001a] transition-colors text-left">
                  OEM/ODM производство
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dlya-biznesa-b2b')} className="hover:text-[#bd001a] transition-colors text-left">
                  Оплата по безналу (НДС)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dlya-biznesa-b2b')} className="hover:text-[#bd001a] transition-colors text-left">
                  Честный Знак &amp; Сертификаты
                </button>
              </li>
            </ul>
          </div>

          {/* Logistics */}
          <div>
            <div className="font-label-md text-[13px] text-[#151c27] mb-3 uppercase tracking-wider font-bold">
              Логистика &amp; Клуб
            </div>
            <ul className="space-y-2 font-body-md text-[13px] text-[#575e70]">
              <li>
                <button onClick={() => onNavigate('logistika-i-treking')} className="hover:text-[#bd001a] transition-colors text-left">
                  Отслеживание контейнеров
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('logistika-i-treking')} className="hover:text-[#bd001a] transition-colors text-left">
                  Склады в Иу и Гуанчжоу
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('glavnaya')} className="hover:text-[#bd001a] transition-colors text-left">
                  О Клубе Китай
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('oformlenie-zakaza')} className="hover:text-[#bd001a] transition-colors text-left">
                  Правила страхования
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Licensing footer line */}
        <div className="pt-6 border-t border-[#e2e8f8] flex flex-col md:flex-row items-center justify-between gap-3 text-[#575e70] font-body-sm text-[12px]">
          <p>© 2024–2026 КЛУБ КИТАЙ. Международная фабричная платформа 1688. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono">Лицензия ВЭД № CN-882193</span>
            <span>Шэньчжэнь • Москва • Иу • Гуанчжоу</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
