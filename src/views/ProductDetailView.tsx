import React, { useState } from 'react';
import { PageView, CartItem } from '../types';
import { PDP_IMAGES, EXCHANGE_RATE } from '../data/mockData';

interface ProductDetailViewProps {
  onNavigate: (page: PageView) => void;
  onAddToCartItem: (item: CartItem) => void;
  onOpen360Modal: () => void;
  onOpenSupportChat: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  onNavigate,
  onAddToCartItem,
  onOpen360Modal,
  onOpenSupportChat,
}) => {
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Космический серый (Space Gray)');
  const [selectedBundle, setSelectedBundle] = useState('Стандартная');
  const [bundleExtraCny, setBundleExtraCny] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'wholesale' | 'reviews' | 'video'>('specs');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [brandFormSuccess, setBrandFormSuccess] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Price tier evaluation based on quantity
  let baseUnitCny = 129;
  let activeTier = 1;

  if (quantity >= 100) {
    baseUnitCny = 79;
    activeTier = 3;
  } else if (quantity >= 10) {
    baseUnitCny = 99;
    activeTier = 2;
  } else {
    baseUnitCny = 129;
    activeTier = 1;
  }

  const finalUnitCny = baseUnitCny + bundleExtraCny;
  const finalUnitRub = Math.round(finalUnitCny * EXCHANGE_RATE);
  const totalCny = finalUnitCny * quantity;
  const totalRub = Math.round(totalCny * EXCHANGE_RATE);

  const handleAdjustQty = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleSelectTier = (tierQty: number) => {
    setQuantity(tierQty);
  };

  const handleSetBundle = (name: string, extraCny: number) => {
    setSelectedBundle(name);
    setBundleExtraCny(extraCny);
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      id: 'cart-pdp-' + Date.now(),
      productId: 'anc-pro2-factory',
      name: `ANC Pro 2 (${selectedColor})`,
      factoryName: 'Shenzhen Acoustics Technology Co., Ltd.',
      hub: 'Шэньчжэнь',
      image: PDP_IMAGES[activeMediaIdx].url,
      quantity: quantity,
      unitCny: finalUnitCny,
      unitRub: finalUnitRub,
      weightKg: Math.max(0.2, Math.round(quantity * 0.16 * 10) / 10),
      specs: [
        `Цвет: ${selectedColor}`,
        `Комплектация: ${selectedBundle}`,
        'Airoha 1562AE • BT 5.4'
      ]
    };
    onAddToCartItem(item);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onNavigate('oformlenie-zakaza');
  };

  const handleDownloadPdf = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3000);
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen pb-16">
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 py-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[#575e70] font-label-md text-[13px] mb-4 overflow-x-auto whitespace-nowrap py-1">
          <button onClick={() => onNavigate('glavnaya')} className="hover:text-[#bd001a] transition-colors flex items-center gap-1 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">home</span>Главная
          </button>
          <span className="material-symbols-outlined text-[14px] text-[#c0c6db]">chevron_right</span>
          <button onClick={() => onNavigate('katalog')} className="hover:text-[#bd001a] transition-colors cursor-pointer">Электроника</button>
          <span className="material-symbols-outlined text-[14px] text-[#c0c6db]">chevron_right</span>
          <button onClick={() => onNavigate('katalog')} className="hover:text-[#bd001a] transition-colors cursor-pointer">Аудио</button>
          <span className="material-symbols-outlined text-[14px] text-[#c0c6db]">chevron_right</span>
          <span className="hover:text-[#bd001a] transition-colors">TWS Наушники</span>
          <span className="material-symbols-outlined text-[14px] text-[#c0c6db]">chevron_right</span>
          <span className="text-[#151c27] font-bold">ANC Pro 2 Factory Edition</span>
        </nav>

        {/* Main Two-Column Product Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* Left Column: Gallery & Media Stage */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Media Showcase Frame */}
            <div className="relative w-full aspect-square bg-white rounded-2xl shadow-md border border-[#e2e8f8] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e7eefe]/60 via-transparent to-[#bd001a]/5 pointer-events-none"></div>
              
              <img 
                src={PDP_IMAGES[activeMediaIdx].url}
                alt={PDP_IMAGES[activeMediaIdx].label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlaid Trust Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#bd001a] text-white font-label-sm text-[11px] uppercase rounded-md shadow-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Хит продаж фабрики
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md text-[#151c27] font-label-sm text-[11px] uppercase rounded-md shadow-sm font-bold border border-[#e2e8f8]">
                  <span className="material-symbols-outlined text-[14px] text-[#8e4b00]">verified_user</span> CE / RoHS Сертификация
                </span>
              </div>

              {/* 360 Inspection Badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <button 
                  type="button"
                  onClick={onOpen360Modal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md hover:bg-white text-[#151c27] font-label-md text-[13px] font-bold rounded-lg shadow-md transition-all cursor-pointer border border-[#e2e8f8] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#bd001a]">360</span> 
                  360° Осмотр
                </button>
              </div>
            </div>

            {/* Thumbnails Reel */}
            <div className="grid grid-cols-4 gap-3">
              {PDP_IMAGES.slice(1).map((thumb, idx) => {
                const actualIdx = idx + 1;
                const isSelected = activeMediaIdx === actualIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMediaIdx(actualIdx)}
                    className={`aspect-square bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all p-1 border cursor-pointer ${
                      isSelected 
                        ? 'border-[#bd001a] ring-2 ring-[#bd001a]/20 bg-[#e7eefe]' 
                        : 'border-[#e2e8f8]'
                    }`}
                  >
                    <img 
                      src={thumb.url} 
                      alt={thumb.label} 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  </button>
                );
              })}
            </div>

            {/* Sourcing Assurance Mini-Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-[#f0f3ff] rounded-xl text-center border border-[#e2e8f8]">
              <div className="p-2 flex flex-col items-center">
                <span className="material-symbols-outlined text-[#bd001a] text-[22px] mb-1">security_update_good</span>
                <span className="font-label-sm text-[12px] font-bold text-[#151c27]">QC Проверка</span>
                <span className="font-body-sm text-[11px] text-[#575e70]">0.02% уровень брака</span>
              </div>
              <div className="p-2 flex flex-col items-center bg-white rounded-lg shadow-xs border border-[#e2e8f8]">
                <span className="material-symbols-outlined text-[#8e4b00] text-[22px] mb-1">factory</span>
                <span className="font-label-sm text-[12px] font-bold text-[#151c27]">Шэньчжэнь</span>
                <span className="font-body-sm text-[11px] text-[#575e70]">Прямой конвейер</span>
              </div>
              <div className="p-2 flex flex-col items-center">
                <span className="material-symbols-outlined text-[#bd001a] text-[22px] mb-1">speed</span>
                <span className="font-label-sm text-[12px] font-bold text-[#151c27]">Отгрузка</span>
                <span className="font-body-sm text-[11px] text-[#575e70]">24-48 ч со склада</span>
              </div>
            </div>

          </div>

          {/* Right Column: Purchasing Intelligence & Tier Matrix */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Header & Metas */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center text-[#8e4b00] font-label-md text-[13px] font-bold">
                    <span className="material-symbols-outlined text-[18px] mr-1 text-[#8e4b00]">star</span> 4.85
                  </span>
                  <span className="text-[#575e70] font-body-sm text-[12px]">(432 отзыва)</span>
                  <span className="text-[#c0c6db]">•</span>
                  <span className="text-[#575e70] font-body-sm text-[12px] font-medium">2 438 продано</span>
                </div>
                <span className="text-[#575e70] font-label-sm text-[11px] bg-[#e7eefe] px-2 py-0.5 rounded font-mono">
                  АРТ: CN-SZ-8841
                </span>
              </div>

              <h1 className="font-headline-md text-[22px] sm:text-[25px] text-[#151c27] leading-snug font-extrabold">
                Беспроводные TWS наушники с активным шумоподавлением ANC Pro 2 (Чипсет Airoha, Bluetooth 5.4, Spatial Audio)
              </h1>
              
              <p className="font-body-sm text-[13px] text-[#575e70]">
                Оригинальная фабричная ревизия OEM. Аппаратный гибридный ANC до -45dB, кодеки AAC/LDAC, 38 часов автономии.
              </p>
            </div>

            {/* Dynamic Wholesale Tier Matrix */}
            <div className="flex flex-col gap-2 bg-[#f0f3ff] p-4 rounded-2xl border border-[#e2e8f8]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-md text-[11px] uppercase tracking-wider text-[#575e70] font-bold">
                  Оптовая сетка цен (Прямой 1688 курс)
                </span>
                <span className="font-label-sm text-[12px] text-[#bd001a] font-bold">
                  1 ¥ ≈ {EXCHANGE_RATE.toFixed(1)} ₽
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* Tier 1 */}
                <div 
                  onClick={() => handleSelectTier(1)}
                  className={`cursor-pointer p-3.5 rounded-xl bg-white shadow-xs flex flex-col justify-between transition-all border ${
                    activeTier === 1 
                      ? 'border-[#bd001a] bg-[#ffdad6]/25 ring-2 ring-[#bd001a]/20' 
                      : 'border-[#e2e8f8] hover:border-[#bd001a]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-sm text-[10px] text-[#575e70] uppercase">Розница</span>
                    <span className="font-label-sm text-[11px] font-bold text-[#151c27]">1–9 шт.</span>
                  </div>
                  <div>
                    <div className="font-price-headline text-[24px] text-[#151c27] leading-none font-extrabold">¥129</div>
                    <div className="font-price-sub text-[12px] text-[#575e70] mt-1">1 650 ₽ / шт</div>
                  </div>
                </div>

                {/* Tier 2 */}
                <div 
                  onClick={() => handleSelectTier(10)}
                  className={`cursor-pointer p-3.5 rounded-xl bg-white shadow-xs flex flex-col justify-between transition-all border ${
                    activeTier === 2 
                      ? 'border-[#bd001a] bg-[#ffdad6]/25 ring-2 ring-[#bd001a]/20' 
                      : 'border-[#e2e8f8] hover:border-[#bd001a]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-sm text-[10px] text-[#575e70] uppercase">Мелкий опт</span>
                    <span className="font-label-sm text-[11px] font-bold text-[#151c27]">10–99 шт.</span>
                  </div>
                  <div>
                    <div className="font-price-headline text-[24px] text-[#151c27] leading-none font-extrabold">¥99</div>
                    <div className="font-price-sub text-[12px] text-[#575e70] mt-1">1 267 ₽ / шт</div>
                  </div>
                </div>

                {/* Tier 3: Highlighted */}
                <div 
                  onClick={() => handleSelectTier(100)}
                  className={`cursor-pointer p-3.5 rounded-xl bg-white shadow-xs flex flex-col justify-between relative overflow-hidden transition-all border ${
                    activeTier === 3 
                      ? 'border-[#bd001a] bg-[#ffdad6]/40 ring-2 ring-[#bd001a]/30' 
                      : 'border-[#e2e8f8] hover:border-[#bd001a]'
                  }`}
                >
                  <span className="absolute top-0 right-0 bg-[#bd001a] text-white font-label-sm text-[9px] px-2 py-0.5 rounded-bl font-bold">
                    -38%
                  </span>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-sm text-[10px] text-[#bd001a] font-bold uppercase">Крупный опт</span>
                    <span className="font-label-sm text-[11px] font-bold text-[#bd001a]">100+ шт.</span>
                  </div>
                  <div>
                    <div className="font-price-headline text-[24px] text-[#bd001a] leading-none font-extrabold">¥79</div>
                    <div className="font-price-sub text-[12px] text-[#151c27] font-bold mt-1">1 011 ₽ / шт</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurations Matrix */}
            <div className="flex flex-col gap-4">
              
              {/* Color Picker */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-[13px] text-[#151c27] font-semibold">
                    Цвет корпуса: <span className="text-[#575e70] font-normal">{selectedColor}</span>
                  </label>
                  <span className="font-label-sm text-[11px] text-[#575e70]">На складе: 18 420 шт.</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setSelectedColor('Космический серый (Space Gray)')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-xs transition-all text-[#151c27] cursor-pointer border ${
                      selectedColor.includes('Space Gray') 
                        ? 'border-[#bd001a] bg-[#e7eefe] font-bold' 
                        : 'border-[#e2e8f8] bg-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#575e70] shadow-inner"></span>
                    <span className="text-[12px]">Space Gray</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setSelectedColor('Белый (Pure White)')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-xs transition-all text-[#151c27] cursor-pointer border ${
                      selectedColor.includes('Pure White') 
                        ? 'border-[#bd001a] bg-[#e7eefe] font-bold' 
                        : 'border-[#e2e8f8] bg-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-[#c0c6db] shadow-inner"></span>
                    <span className="text-[12px]">Pure White</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setSelectedColor('Темно-зеленый (Midnight Green)')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-xs transition-all text-[#151c27] cursor-pointer border ${
                      selectedColor.includes('Midnight Green') 
                        ? 'border-[#bd001a] bg-[#e7eefe] font-bold' 
                        : 'border-[#e2e8f8] bg-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1b4332] shadow-inner"></span>
                    <span className="text-[12px]">Midnight Green</span>
                  </button>
                </div>
              </div>

              {/* Packaging Spec */}
              <div className="space-y-1.5">
                <label className="font-label-md text-[13px] text-[#151c27] font-semibold">Фабричная комплектация</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button 
                    type="button"
                    onClick={() => handleSetBundle('Стандартная', 0)}
                    className={`text-left p-3 rounded-xl shadow-xs transition-all cursor-pointer border ${
                      selectedBundle === 'Стандартная' 
                        ? 'border-[#bd001a] bg-[#e7eefe] ring-2 ring-[#bd001a]/20' 
                        : 'border-[#e2e8f8] bg-white'
                    }`}
                  >
                    <div className="font-label-md text-[13px] font-bold text-[#151c27]">Стандартная</div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">Наушники + кабель Type-C</div>
                  </button>

                  <button 
                    type="button"
                    onClick={() => handleSetBundle('+ Чехол и шнурок', 3)}
                    className={`text-left p-3 rounded-xl shadow-xs transition-all cursor-pointer border ${
                      selectedBundle === '+ Чехол и шнурок' 
                        ? 'border-[#bd001a] bg-[#e7eefe] ring-2 ring-[#bd001a]/20' 
                        : 'border-[#e2e8f8] bg-white'
                    }`}
                  >
                    <div className="font-label-md text-[13px] font-bold text-[#151c27]">+ Чехол и шнурок</div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">Силиконовый кейс (+¥3)</div>
                  </button>

                  <button 
                    type="button"
                    onClick={() => handleSetBundle('Premium Gift Box', 8)}
                    className={`text-left p-3 rounded-xl shadow-xs transition-all cursor-pointer border ${
                      selectedBundle === 'Premium Gift Box' 
                        ? 'border-[#bd001a] bg-[#e7eefe] ring-2 ring-[#bd001a]/20' 
                        : 'border-[#e2e8f8] bg-white'
                    }`}
                  >
                    <div className="font-label-md text-[13px] font-bold text-[#151c27]">Premium Gift Box</div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">Твердый бокс (+¥8)</div>
                  </button>
                </div>
              </div>

              {/* Quantity Stepper & Subtotal Live Bar */}
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="font-label-md text-[13px] text-[#575e70] font-medium">Количество:</span>
                  <div className="flex items-center bg-[#f0f3ff] rounded-xl p-1 border border-[#c0c6db]">
                    <button 
                      type="button"
                      onClick={() => handleAdjustQty(-1)}
                      className="w-8 h-8 flex items-center justify-center text-[#151c27] hover:bg-[#e7eefe] rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      min="1"
                      max="10000"
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-14 text-center bg-transparent font-headline-sm text-[17px] text-[#151c27] font-bold focus:outline-none"
                    />
                    <button 
                      type="button"
                      onClick={() => handleAdjustQty(1)}
                      className="w-8 h-8 flex items-center justify-center text-[#151c27] hover:bg-[#e7eefe] rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Subtotal Block */}
                <div className="text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                  <span className="font-label-sm text-[11px] text-[#575e70]">Итого партии:</span>
                  <div>
                    <span className="font-price-headline text-[26px] text-[#bd001a] font-extrabold">
                      {totalRub.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="font-label-md text-[13px] text-[#575e70] ml-2 font-mono">
                      (¥{totalCny.toLocaleString('ru-RU')})
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Value Proposition Strip */}
            <div className="space-y-1.5 p-3.5 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8]">
              <div className="flex items-center gap-2 text-[#151c27] font-body-sm text-[12px]">
                <span className="material-symbols-outlined text-[18px] text-[#8e4b00]">inventory_2</span>
                <span>Прямая отправка с завода в Шэньчжэне без наценки торговых компаний</span>
              </div>
              <div className="flex items-center gap-2 text-[#151c27] font-body-sm text-[12px]">
                <span className="material-symbols-outlined text-[18px] text-[#8e4b00]">flaky</span>
                <span>Проверка каждой единицы на брак и акустический тест на складе в Иу</span>
              </div>
              <div className="flex items-center gap-2 text-[#151c27] font-body-sm text-[12px]">
                <span className="material-symbols-outlined text-[18px] text-[#8e4b00]">biotech</span>
                <span>Доступен заказ единичного образца для лабораторного тестирования</span>
              </div>
            </div>

            {/* High-Conversion CTAs */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <button 
                  type="button"
                  onClick={handleBuyNow}
                  className="sm:col-span-8 bg-[#bd001a] hover:bg-[#e61e2a] text-white py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span className="font-headline-sm text-[17px] font-bold">
                    Купить сейчас • {totalRub.toLocaleString('ru-RU')} ₽
                  </span>
                </button>

                <button 
                  type="button"
                  onClick={handleAddToCart}
                  className="sm:col-span-4 bg-white hover:bg-[#f0f3ff] text-[#151c27] py-3 px-4 rounded-xl shadow-sm border border-[#e2e8f8] flex items-center justify-center gap-2 transition-all cursor-pointer font-bold text-[13px]"
                >
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  <span>В корзину</span>
                </button>
              </div>

              <button 
                type="button"
                onClick={() => {
                  handleSelectTier(1);
                  handleAddToCart();
                }}
                className="w-full bg-[#d9dff5] hover:bg-[#c0c6db] text-[#141b2b] py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">science</span>
                <span className="font-label-md text-[13px] font-semibold">
                  Заказать тестовый фабричный образец (¥129 / 1 650 ₽)
                </span>
              </button>

              {addedToast && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-center text-[12px] font-bold animate-fadeIn">
                  ✓ Товар успешно добавлен в корзину партий!
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Factory Verification & Verified Supplier Card (B2B Depth) */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e2e8f8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Supplier Identity */}
            <div className="lg:col-span-4 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#e7eefe] flex items-center justify-center shrink-0 text-[#bd001a]">
                <span className="material-symbols-outlined text-[36px]">precision_manufacturing</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-[17px] text-[#151c27] font-bold leading-tight">
                  Shenzhen Acoustics Technology Co., Ltd.
                </h2>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ffdcc3] text-[#2f1500] font-label-sm text-[10px] font-bold rounded">
                    <span className="material-symbols-outlined text-[13px]">verified</span> Gold Supplier
                  </span>
                  <span className="font-label-sm text-[11px] text-[#575e70]">6 лет на 1688</span>
                  <span className="text-[#c0c6db]">•</span>
                  <span className="font-label-sm text-[11px] text-[#bd001a] font-bold">Проверена инспектором Клуба</span>
                </div>
              </div>
            </div>

            {/* Supplier KPI Metrics */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-2 text-center py-2 px-3 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8]">
              <div className="p-1">
                <div className="font-headline-sm text-[18px] text-[#151c27] font-bold">99.4%</div>
                <div className="font-body-sm text-[11px] text-[#575e70]">Отгрузка в срок</div>
              </div>
              <div className="p-1">
                <div className="font-headline-sm text-[18px] text-[#151c27] font-bold">45 000+</div>
                <div className="font-body-sm text-[11px] text-[#575e70]">Заказов выполнено</div>
              </div>
              <div className="p-1">
                <div className="font-headline-sm text-[18px] text-[#151c27] font-bold">1 200 м²</div>
                <div className="font-body-sm text-[11px] text-[#575e70]">Цех &amp; ISO9001</div>
              </div>
            </div>

            {/* Supplier Direct Actions */}
            <div className="lg:col-span-3 flex flex-col gap-2">
              <button 
                type="button"
                onClick={onOpenSupportChat}
                className="w-full bg-[#151c27] hover:bg-[#2a313d] text-white py-2.5 px-4 rounded-xl font-label-md text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Связаться с менеджером фабрики
              </button>

              <button 
                type="button"
                onClick={handleDownloadPdf}
                className="w-full bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] py-2 px-4 rounded-xl font-label-md text-[12px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                {pdfDownloaded ? 'Прайс-лист скачан!' : 'Скачать оптовый прайс-лист (PDF)'}
              </button>
            </div>

          </div>
        </div>

        {/* Private Label & OEM/ODM Customization Block */}
        <div className="mt-6 p-6 bg-gradient-to-r from-[#e2e8f8] via-[#e7eefe] to-[#f0f3ff] rounded-2xl shadow-sm border border-[#e2e8f8] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-[#151c27]">
            <span className="material-symbols-outlined text-[240px]">design_services</span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1 font-label-sm text-[11px] uppercase tracking-wider text-[#bd001a] font-bold bg-white px-2.5 py-1 rounded-md shadow-xs">
                OEM / ODM White Label Service
              </span>
              <h2 className="font-headline-md text-[20px] md:text-[24px] text-[#151c27] font-bold">
                Брендирование и Private Label: запустите свою марку
              </h2>
              <p className="font-body-md text-[13px] text-[#575e70]">
                Произведите эту модель под собственным брендом для Wildberries, Ozon или ритейл-сетей с официальным оформлением и нотификацией ФСБ.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px] mt-0.5">draw</span>
                  <div>
                    <div className="font-label-md text-[12px] font-bold text-[#151c27]">Лазерное нанесение</div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">Логотип на кейсе от 100 шт.</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px] mt-0.5">inventory</span>
                  <div>
                    <div className="font-label-md text-[12px] font-bold text-[#151c27]">Своя упаковка</div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">Русский язык от 500 шт.</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px] mt-0.5">memory</span>
                  <div>
                    <div className="font-label-md text-[12px] font-bold text-[#151c27]">Кастомная прошивка</div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">Имя Bluetooth и анимация</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <button 
                type="button"
                onClick={() => setBrandModalOpen(true)}
                className="bg-[#bd001a] hover:bg-[#e61e2a] text-white py-3 px-6 rounded-xl font-label-md text-[13px] font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">calculate</span>
                Рассчитать партию под свой бренд
              </button>
            </div>
          </div>
        </div>

        {/* Logistics & Turnkey Customs Breakdown Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#e2e8f8] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center shrink-0 text-[#bd001a]">
              <span className="material-symbols-outlined text-[28px]">flight_takeoff</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-[16px] font-bold text-[#151c27]">Авиа Карго Экспресс</span>
                <span className="font-label-md text-[13px] font-bold text-[#bd001a]">~380 ₽ / кг</span>
              </div>
              <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                Срок доставки в Москву (Южные Ворота / ТЯК): <strong>6–8 рабочих дней</strong>. Оптимально для срочных тестов и высокомаржинального спроса.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#e2e8f8] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center shrink-0 text-[#8e4b00]">
              <span className="material-symbols-outlined text-[28px]">local_shipping</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-[16px] font-bold text-[#151c27]">Быстрое Авто Карго</span>
                <span className="font-label-md text-[13px] font-bold text-[#8e4b00]">~190 ₽ / кг</span>
              </div>
              <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                Срок доставки: <strong>14–16 дней</strong> через Казахстан с полной консолидацией на складе в Иу. Страховка 2% от фактуры включена.
              </p>
            </div>
          </div>
        </div>

        {/* Deep Specifications & Reviews Tabs Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#e2e8f8] p-5 md:p-6">
          
          {/* Tabs Navigation Header */}
          <div className="flex items-center gap-4 border-b border-[#e2e8f8] pb-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button 
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`font-headline-sm text-[16px] font-bold pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'specs' 
                  ? 'text-[#bd001a] border-[#bd001a]' 
                  : 'text-[#575e70] border-transparent hover:text-[#151c27]'
              }`}
            >
              Характеристики
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab('wholesale')}
              className={`font-headline-sm text-[16px] font-bold pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'wholesale' 
                  ? 'text-[#bd001a] border-[#bd001a]' 
                  : 'text-[#575e70] border-transparent hover:text-[#151c27]'
              }`}
            >
              Условия опта и доставки
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`font-headline-sm text-[16px] font-bold pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'reviews' 
                  ? 'text-[#bd001a] border-[#bd001a]' 
                  : 'text-[#575e70] border-transparent hover:text-[#151c27]'
              }`}
            >
              Отзывы покупателей (432)
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab('video')}
              className={`font-headline-sm text-[16px] font-bold pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'video' 
                  ? 'text-[#bd001a] border-[#bd001a]' 
                  : 'text-[#575e70] border-transparent hover:text-[#151c27]'
              }`}
            >
              Видеообзор с фабрики
            </button>
          </div>

          {/* Tab 1: Detailed Specifications */}
          {activeTab === 'specs' && (
            <div className="mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                <div className="flex justify-between py-2 bg-[#f0f3ff]/60 px-3 rounded-lg">
                  <span className="text-[#575e70]">Чипсет аудиопроцессора</span>
                  <span className="font-semibold text-[#151c27]">Airoha AB1562AE Quad-Core</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-lg">
                  <span className="text-[#575e70]">Версия Bluetooth</span>
                  <span className="font-semibold text-[#151c27]">5.4 + EDR Dual Mode</span>
                </div>
                <div className="flex justify-between py-2 bg-[#f0f3ff]/60 px-3 rounded-lg">
                  <span className="text-[#575e70]">Глубина шумоподавления (ANC)</span>
                  <span className="font-semibold text-[#151c27]">До -45 дБ (гибридный)</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-lg">
                  <span className="text-[#575e70]">Режим прозрачности (ENC)</span>
                  <span className="font-semibold text-[#151c27]">6 микрофонов с фильтрацией ветра</span>
                </div>
                <div className="flex justify-between py-2 bg-[#f0f3ff]/60 px-3 rounded-lg">
                  <span className="text-[#575e70]">Диафрагма динамика</span>
                  <span className="font-semibold text-[#151c27]">13 мм титановый композит</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-lg">
                  <span className="text-[#575e70]">Автономность одного заряда</span>
                  <span className="font-semibold text-[#151c27]">до 7.5 часов (с кейсом до 38 ч)</span>
                </div>
                <div className="flex justify-between py-2 bg-[#f0f3ff]/60 px-3 rounded-lg">
                  <span className="text-[#575e70]">Беспроводная зарядка</span>
                  <span className="font-semibold text-[#151c27]">Qi Standard + MagSafe Support</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-lg">
                  <span className="text-[#575e70]">Влагозащита</span>
                  <span className="font-semibold text-[#151c27]">IPX5 (пот и брызги)</span>
                </div>
                <div className="flex justify-between py-2 bg-[#f0f3ff]/60 px-3 rounded-lg">
                  <span className="text-[#575e70]">Вес наушника / кейса</span>
                  <span className="font-semibold text-[#151c27]">4.2 г / 45.8 г</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-lg">
                  <span className="text-[#575e70]">Заводской артикул на 1688</span>
                  <span className="font-semibold text-[#151c27] font-mono">SZ-TWS-PRO2-AIR</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Wholesale & Delivery Terms */}
          {activeTab === 'wholesale' && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#f0f3ff] rounded-xl space-y-2 border border-[#e2e8f8]">
                <div className="flex items-center gap-2 text-[#bd001a] font-bold text-[13px] uppercase">
                  <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span> Минимальный заказ
                </div>
                <p className="text-[13px] text-[#575e70] leading-relaxed">
                  Тестовый образец доступен от 1 шт. Оптовые цены калькулируются автоматически при заказе от 10 и 100 единиц товара.
                </p>
              </div>

              <div className="p-4 bg-[#f0f3ff] rounded-xl space-y-2 border border-[#e2e8f8]">
                <div className="flex items-center gap-2 text-[#bd001a] font-bold text-[13px] uppercase">
                  <span className="material-symbols-outlined text-[20px]">fact_check</span> Складская инспекция
                </div>
                <p className="text-[13px] text-[#575e70] leading-relaxed">
                  Перед упаковкой в карго партия поступает на наш хаб в Иу. Фотоотчет внешнего вида, включение и выборочный аудиоконтроль.
                </p>
              </div>

              <div className="p-4 bg-[#f0f3ff] rounded-xl space-y-2 border border-[#e2e8f8]">
                <div className="flex items-center gap-2 text-[#bd001a] font-bold text-[13px] uppercase">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span> Оплата и документы
                </div>
                <p className="text-[13px] text-[#575e70] leading-relaxed">
                  Работаем с юрлицами РФ по безналичному расчету с НДС или через USDT/карты физлиц. Предоставляем ГТД при белой доставке.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Verified Client Reviews */}
          {activeTab === 'reviews' && (
            <div className="mt-5 space-y-4">
              <div className="p-4 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-headline-sm text-[15px] font-bold text-[#151c27]">
                      Максим В. (Селлер WB / Электроника)
                    </span>
                    <div className="flex items-center gap-1 text-[#8e4b00] mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="text-[#575e70] text-[11px] ml-2 font-mono">Партия: 500 шт. • Апрель 2024</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white text-[#575e70] font-medium border border-[#e2e8f8]">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span> Проверенный покупатель
                  </span>
                </div>
                <p className="text-[13px] text-[#575e70] leading-relaxed">
                  Заказывали партию 500 штук с лазерной гравировкой нашего бренда. Звук отличный, шумодав глушит гул в метро реально на уровне оригинала. Брак в партии составил 1 пару из 500 — Клуб Китай оперативно заменил за свой счет.
                </p>
              </div>

              <div className="p-4 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-headline-sm text-[15px] font-bold text-[#151c27]">
                      Денис К. (Региональный опт, Екатеринбург)
                    </span>
                    <div className="flex items-center gap-1 text-[#8e4b00] mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="text-[#575e70] text-[11px] ml-2 font-mono">Партия: 120 шт. • Май 2024</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white text-[#575e70] font-medium border border-[#e2e8f8]">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span> Проверенный покупатель
                  </span>
                </div>
                <p className="text-[13px] text-[#575e70] leading-relaxed">
                  Брали по тиру крупного опта по ¥79. Доставили авто карго за 15 дней прямо в Екб. Упаковка премиальная, маржинальность при продаже в розницу в магазинах превышает 220%.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Factory Line Video */}
          {activeTab === 'video' && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div 
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="relative aspect-video rounded-2xl bg-[#151c27] overflow-hidden shadow-md flex items-center justify-center group cursor-pointer"
              >
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFE5VVKBHNVe4MsZVIq28GhRYy9xBnb4zaczyHdMYrft6ZcRXH4YdFNlu4JX0-asPai3uccpElEqAClV7p3ltWKvGhUwaqrY_gdCuCKgfStGtIng-SoKbuLxrktR09f4jkGESo2q7ru5-xKNvNJjCs_9z7e5HUExsj8Zx3C2QHGx6Gwx4uFlR1padufN00ltyHSGaAcF-UOnkCCQvGjdDwMNj0YRyiDiDnV8twAmSxXzyinXLRlGvnFQ"
                  alt="Фабричная линия Шэньчжэнь"
                  className={`w-full h-full object-cover transition-transform duration-500 ${isVideoPlaying ? 'opacity-80' : 'group-hover:scale-105'}`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-[#bd001a] text-white flex items-center justify-center shadow-lg transition-transform ${isVideoPlaying ? 'scale-90 bg-emerald-600' : 'group-hover:scale-110'}`}>
                    <span className="material-symbols-outlined text-[36px] ml-1">
                      {isVideoPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-[#151c27]/80 backdrop-blur text-white px-2.5 py-1 rounded text-[11px] font-mono">
                  {isVideoPlaying ? 'Воспроизведение инспекции...' : 'Видеоотчет инспекции: 03:45 мин'}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-headline-sm text-[18px] text-[#151c27] font-bold">
                  Репортаж с производственной линии в Шэньчжэне
                </h3>
                <p className="text-[13px] text-[#575e70] leading-relaxed">
                  Посмотрите, как инспекторы «Клуб Китай» проверяют калибровку активного шумоподавления, спайку шлейфов и тест герметичности корпуса перед формированием экспортного паллета.
                </p>
                <ul className="space-y-1.5 text-[12px] text-[#151c27]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4b00]">check</span>
                    Безэховая аудиокамера для замера АЧХ
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4b00]">check</span>
                    Лазерный контроль зазоров зарядного кейса
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4b00]">check</span>
                    Тест циклов аккумулятора 500+ зарядок
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* OEM Calculation Modal */}
      {brandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#e2e8f8] overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e8f8] pb-3">
              <h3 className="font-headline-sm text-[17px] text-[#151c27] font-bold">
                Калькулятор брендирования ANC Pro 2
              </h3>
              <button onClick={() => setBrandModalOpen(false)} className="text-[#575e70] hover:text-[#151c27]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setBrandFormSuccess(true);
              setTimeout(() => {
                setBrandFormSuccess(false);
                setBrandModalOpen(false);
              }, 2500);
            }} className="space-y-3 text-[13px]">
              <div>
                <label className="block font-bold text-[#151c27] mb-1">Название вашей торговой марки</label>
                <input type="text" placeholder="например: SOUNDBEAT или VORTEX" required className="w-full bg-[#f0f3ff] p-2.5 rounded-xl border border-[#c0c6db] focus:outline-none" />
              </div>
              <div>
                <label className="block font-bold text-[#151c27] mb-1">Планируемый тираж (шт.)</label>
                <input type="number" min="100" defaultValue="500" required className="w-full bg-[#f0f3ff] p-2.5 rounded-xl border border-[#c0c6db] focus:outline-none" />
              </div>
              <div className="space-y-1.5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#bd001a]" />
                  <span>Лазерная гравировка на кейсе (+¥2 / шт)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#bd001a]" />
                  <span>Кастомная полиграфия коробки на русском (+¥5 / шт)</span>
                </label>
              </div>
              <button type="submit" className="w-full py-3 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-xl font-bold mt-2 shadow-md cursor-pointer">
                Получить коммерческое предложение
              </button>
              {brandFormSuccess && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 text-[12px] font-bold rounded-xl text-center">
                  ✓ Заявка отправлена технологу фабрики в Шэньчжэне!
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
