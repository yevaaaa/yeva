import React, { useState } from 'react';
import { PageView, CartItem } from '../types';
import { RECOMMENDED_ADDONS, EXCHANGE_RATE } from '../data/mockData';

interface CartViewProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (page: PageView) => void;
  onAddAddon: (addon: typeof RECOMMENDED_ADDONS[0]) => void;
  onOpenSupportChat: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  onUpdateQty,
  onRemoveItem,
  onNavigate,
  onAddAddon,
  onOpenSupportChat,
}) => {
  const [filterSegment, setFilterSegment] = useState<'all' | 'ready' | 'moq'>('all');
  const [consolidate, setConsolidate] = useState(true);
  const [promoCode, setPromoCode] = useState('WELCOME-CHINA');
  const [couponApplied, setCouponApplied] = useState(true);
  const [customOptions, setCustomOptions] = useState<{ [key: string]: { qc: boolean; logo: boolean } }>({
    'cart-anc-batch': { qc: true, logo: false },
  });

  // Calculate totals
  const totalCny = items.reduce((sum, item) => sum + item.unitCny * item.quantity, 0);
  const totalRubRaw = Math.round(totalCny * EXCHANGE_RATE);
  const totalWeightKg = items.reduce((sum, item) => sum + (item.weightKg || 0.5) * (item.isSample ? 1 : item.quantity / 10), 0);
  const calculatedWeight = Math.max(5, Math.round(totalWeightKg * 10) / 10);
  const estimatedVolume = (calculatedWeight * 0.0045).toFixed(2);

  const discountRub = couponApplied ? 2688 : 0;
  const shippingRub = 3382;
  const finalTotalRub = Math.max(0, totalRubRaw - discountRub + shippingRub);
  const finalTotalCny = Math.round(finalTotalRub / EXCHANGE_RATE);

  const handleToggleOption = (itemId: string, type: 'qc' | 'logo') => {
    setCustomOptions((prev) => {
      const curr = prev[itemId] || { qc: true, logo: false };
      return {
        ...prev,
        [itemId]: { ...curr, [type]: !curr[type] }
      };
    });
  };

  // Group items by factory
  const factories = Array.from(new Set(items.map((i) => i.factoryName)));

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 w-full">
        
        {/* Breadcrumb & Header Meta */}
        <div className="flex flex-col gap-1 mb-5">
          <nav className="flex items-center gap-1.5 text-[#575e70] font-body-sm text-[12px]">
            <button onClick={() => onNavigate('glavnaya')} className="hover:text-[#bd001a] transition-colors cursor-pointer">
              Главная
            </button>
            <span>/</span>
            <span className="text-[#151c27] font-semibold">Корзина партий</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-headline-lg text-[26px] md:text-[32px] text-[#151c27] font-extrabold tracking-tight">
                  Корзина закупок
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e7eefe] font-label-md text-[12px] text-[#575e70] font-bold">
                  {factories.length} поставщика • {items.length} позиции • {calculatedWeight} кг
                </span>
              </div>
              <p className="font-body-md text-[13px] text-[#575e70] mt-1">
                Прямой выкуп с фабричных линий 1688 без торговой наценки брокеров
              </p>
            </div>

            {/* Filter Segment */}
            <div className="inline-flex p-1 bg-[#e2e8f8] rounded-xl self-start md:self-auto shadow-xs border border-[#c0c6db]">
              <button 
                type="button"
                onClick={() => setFilterSegment('all')}
                className={`px-3.5 py-1.5 rounded-lg font-label-md text-[12px] transition-all cursor-pointer ${
                  filterSegment === 'all' ? 'bg-white text-[#151c27] font-bold shadow-xs' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                Все товары ({items.length})
              </button>
              <button 
                type="button"
                onClick={() => setFilterSegment('ready')}
                className={`px-3.5 py-1.5 rounded-lg font-label-md text-[12px] transition-all cursor-pointer ${
                  filterSegment === 'ready' ? 'bg-white text-[#151c27] font-bold shadow-xs' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                Готовы к выкупу ({Math.max(1, items.length - 1)})
              </button>
              <button 
                type="button"
                onClick={() => setFilterSegment('moq')}
                className={`px-3.5 py-1.5 rounded-lg font-label-md text-[12px] transition-all cursor-pointer ${
                  filterSegment === 'moq' ? 'bg-white text-[#151c27] font-bold shadow-xs' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                Ожидают подтверждения MOQ (1)
              </button>
            </div>
          </div>
        </div>

        {/* Smart Warehouse Consolidation Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#f0f3ff] via-[#e7eefe] to-[#e2e8f8] rounded-2xl p-4 md:p-5 mb-6 shadow-sm border border-[#e2e8f8]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#bd001a] text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[28px]">hub</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                    Умная консолидация на хабах в Иу и Гуанчжоу
                  </span>
                  <span className="bg-[#bd001a]/10 text-[#bd001a] px-2 py-0.5 rounded font-label-sm text-[10px] uppercase font-bold">
                    Экономия до 42%
                  </span>
                </div>
                <p className="font-body-md text-[13px] text-[#575e70] max-w-3xl leading-relaxed">
                  Все {factories.length} фабрики отгружают заказ на наш центральный логистический склад в Иу (Yiwu Hub). Мы сортируем, инспектируем и объединяем продукцию в монолитную паллету, оптимизируя плотность и снижая тариф магистрали в РФ.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl shadow-xs cursor-pointer select-none shrink-0 border border-[#e2e8f8] hover:border-[#bd001a] transition-all">
              <input 
                type="checkbox"
                checked={consolidate}
                onChange={(e) => setConsolidate(e.target.checked)}
                className="w-4 h-4 rounded text-[#bd001a] focus:ring-[#bd001a] accent-[#bd001a] cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-[12px] text-[#151c27] font-bold">Объединить в одну посылку</span>
                <span className="font-label-sm text-[10px] text-[#8e4b00] font-semibold">Рекомендуется для опта</span>
              </div>
            </label>
          </div>
        </div>

        {/* Main Grid: Left Items + Right Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Factory Groups (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#e2e8f8]">
                <span className="material-symbols-outlined text-[48px] text-[#c0c6db] mb-2">shopping_bag</span>
                <h3 className="font-headline-sm text-[18px] text-[#151c27] font-bold">Ваша корзина партий пуста</h3>
                <p className="text-[13px] text-[#575e70] mt-1 mb-4">Выберите проверенные товары в каталоге 1688</p>
                <button 
                  onClick={() => onNavigate('katalog')} 
                  className="px-6 py-2.5 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-xl font-bold text-[13px]"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              factories.map((factory) => {
                const factoryItems = items.filter((i) => i.factoryName === factory);
                return (
                  <div key={factory} className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f8] space-y-4">
                    {/* Supplier Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#e2e8f8] gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="material-symbols-outlined text-[#bd001a] text-[20px]">precision_manufacturing</span>
                        <span className="font-headline-sm text-[15px] font-bold text-[#151c27]">Фабрика: {factory}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-label-sm text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          Verified Factory Gold
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-label-sm text-[10px] font-bold">
                          MOQ выполнен
                        </span>
                      </div>
                    </div>

                    {/* Products in this factory group */}
                    <div className="space-y-3">
                      {factoryItems.map((item) => {
                        const itemSubtotalCny = item.unitCny * item.quantity;
                        const itemSubtotalRub = Math.round(itemSubtotalCny * EXCHANGE_RATE);
                        const isAncBatch = item.id === 'cart-anc-batch';

                        return (
                          <div key={item.id} className="bg-[#f0f3ff]/70 rounded-xl p-4 flex flex-col sm:flex-row gap-4 border border-[#e2e8f8]">
                            <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-white relative shadow-xs border border-[#e2e8f8]">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              <span className="absolute top-1 left-1 bg-white/95 px-1 py-0.5 rounded text-[9px] font-bold text-[#151c27]">
                                {item.isSample ? 'Образец' : '1688 OEM'}
                              </span>
                            </div>

                            <div className="flex-1 flex flex-col justify-between gap-2">
                              <div>
                                <div className="flex items-start justify-between gap-3">
                                  <h3 className="font-headline-sm text-[15px] font-bold text-[#151c27] leading-snug">
                                    {item.name}
                                  </h3>
                                  <div className="text-right shrink-0">
                                    <div className="font-price-headline text-[20px] text-[#bd001a] font-extrabold">
                                      ¥{itemSubtotalCny.toLocaleString('ru-RU')}
                                    </div>
                                    <span className="font-price-sub text-[12px] text-[#575e70]">
                                      ≈ {itemSubtotalRub.toLocaleString('ru-RU')} ₽
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mt-1 text-[#575e70] font-body-sm text-[11px]">
                                  {item.specs.map((sp, idx) => (
                                    <span key={idx} className="bg-white/80 px-2 py-0.5 rounded border border-[#e2e8f8]">
                                      {sp}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Special options checkboxes for batches */}
                              {isAncBatch && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-1 bg-white/60 p-2 rounded-lg border border-[#e2e8f8]">
                                  <label className="flex items-center gap-2 text-[#151c27] text-[11px] cursor-pointer select-none">
                                    <input 
                                      type="checkbox"
                                      checked={customOptions[item.id]?.qc ?? true}
                                      onChange={() => handleToggleOption(item.id, 'qc')}
                                      className="rounded text-[#bd001a] accent-[#bd001a]"
                                    />
                                    <span>Фотоотчет и тест брака в Иу <strong className="text-emerald-700">(0 ₽)</strong></span>
                                  </label>

                                  <label className="flex items-center gap-2 text-[#575e70] text-[11px] cursor-pointer select-none hover:text-[#151c27]">
                                    <input 
                                      type="checkbox"
                                      checked={customOptions[item.id]?.logo ?? false}
                                      onChange={() => handleToggleOption(item.id, 'logo')}
                                      className="rounded text-[#bd001a] accent-[#bd001a]"
                                    />
                                    <span>Лазерная гравировка лого (+¥2/шт)</span>
                                  </label>
                                </div>
                              )}

                              {/* Quantity counter & delete */}
                              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#e2e8f8]/60">
                                <div className="flex items-center gap-3">
                                  {item.isSample ? (
                                    <span className="px-2.5 py-1 bg-white rounded-lg font-label-md text-[11px] text-[#151c27] font-bold border border-[#e2e8f8]">
                                      1 шт. (Тест) • Фиксированная цена
                                    </span>
                                  ) : (
                                    <div className="flex items-center bg-white rounded-lg p-0.5 shadow-xs border border-[#c0c6db]">
                                      <button 
                                        type="button"
                                        onClick={() => onUpdateQty(item.id, -1)}
                                        className="w-7 h-7 flex items-center justify-center text-[#151c27] hover:bg-[#e7eefe] rounded cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <span className="w-10 text-center font-bold text-[13px] text-[#151c27]">
                                        {item.quantity}
                                      </span>
                                      <button 
                                        type="button"
                                        onClick={() => onUpdateQty(item.id, 1)}
                                        className="w-7 h-7 flex items-center justify-center text-[#151c27] hover:bg-[#e7eefe] rounded cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                  )}
                                  
                                  <span className="text-[12px] text-[#575e70]">
                                    ¥{item.unitCny} ({item.unitRub.toLocaleString('ru-RU')} ₽ / шт.)
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 text-[#575e70] font-label-md text-[12px]">
                                  <button className="flex items-center gap-1 hover:text-[#bd001a] transition-colors cursor-pointer" type="button">
                                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                                    <span>В избранное</span>
                                  </button>
                                  <button 
                                    onClick={() => onRemoveItem(item.id)}
                                    className="flex items-center gap-1 hover:text-[#bd001a] transition-colors cursor-pointer"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                    <span>Удалить</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}

            {/* RECOMMENDED ADD-ONS (Carousel Block) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f8] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px]">add_box</span>
                  <span className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                    Рекомендуем добавить в эту посылку
                  </span>
                </div>
                <span className="font-label-sm text-[10px] text-[#575e70] bg-[#f0f3ff] px-2 py-0.5 rounded font-medium">
                  Без доплаты за базовую тару коробки
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOMMENDED_ADDONS.map((addon) => (
                  <div key={addon.id} className="bg-[#f0f3ff] p-3 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow border border-[#e2e8f8]">
                    <div className="space-y-2">
                      <div className="h-28 rounded-lg overflow-hidden bg-white mb-2 shadow-xs">
                        <img src={addon.image} alt={addon.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-label-md text-[12px] text-[#151c27] font-semibold line-clamp-1">
                        {addon.title}
                      </div>
                      <div className="font-price-sub text-[13px] text-[#bd001a] font-bold">
                        ¥{addon.cny} <span className="text-[#575e70] font-normal">({addon.rub} ₽)</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => onAddAddon(addon)}
                      className="mt-3 w-full py-1.5 rounded-lg bg-white hover:bg-[#bd001a] hover:text-white font-label-sm text-[11px] font-bold text-[#151c27] transition-colors border border-[#e2e8f8] cursor-pointer"
                    >
                      + Добавить к заказу
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Sticky Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sticky top-36">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-[#e2e8f8] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f8]">
                <h2 className="font-headline-md text-[18px] text-[#151c27] font-bold">Детали партии</h2>
                <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Готово к расчету
                </span>
              </div>

              {/* Weight & Volume Micro-metrics */}
              <div className="grid grid-cols-2 gap-2 bg-[#f0f3ff] p-2.5 rounded-xl border border-[#e2e8f8]">
                <div className="p-1">
                  <div className="font-label-sm text-[10px] text-[#575e70] uppercase tracking-wider">Вес партии брутто</div>
                  <div className="font-headline-sm text-[18px] text-[#151c27] font-extrabold mt-0.5">{calculatedWeight} кг</div>
                </div>
                <div className="p-1">
                  <div className="font-label-sm text-[10px] text-[#575e70] uppercase tracking-wider">Расчетный объем</div>
                  <div className="font-headline-sm text-[18px] text-[#151c27] font-extrabold mt-0.5">~{estimatedVolume} м³</div>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#575e70]">Товары с фабрик ({items.length} поз.):</span>
                  <span className="font-semibold text-[#151c27]">¥{totalCny.toLocaleString('ru-RU')} ≈ {totalRubRaw.toLocaleString('ru-RU')} ₽</span>
                </div>
                {couponApplied && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Скидка оптового пула:</span>
                    <span>−{discountRub.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[#575e70]">Консолидация на хабе Иу:</span>
                  <span className="font-bold text-emerald-700 uppercase text-[11px]">Бесплатно</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#575e70]">Фото/видео инспекция (100%):</span>
                  <span className="font-bold text-emerald-700 uppercase text-[11px]">Бесплатно</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f8]">
                  <div className="flex items-center gap-1">
                    <span className="text-[#575e70]">Логистика Быстрое Авто:</span>
                  </div>
                  <span className="font-bold text-[#151c27]">{shippingRub.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {/* Total Calculation Banner */}
              <div className="bg-[#e7eefe]/70 p-4 rounded-xl space-y-2 border border-[#c0c6db]">
                <div className="flex items-baseline justify-between">
                  <span className="font-label-md text-[11px] text-[#575e70] uppercase tracking-wider font-bold">
                    Итого к оплате:
                  </span>
                  <div className="text-right">
                    <div className="font-price-headline text-[26px] text-[#bd001a] font-extrabold">
                      {finalTotalRub.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="font-price-sub text-[12px] text-[#575e70] font-medium font-mono">
                      ≈ ¥{finalTotalCny.toLocaleString('ru-RU')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-[#575e70] border-t border-[#c0c6db]/60">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#8e4b00]">currency_exchange</span>
                    Курс: 1 ¥ = {EXCHANGE_RATE.toFixed(2)} ₽
                  </span>
                  <span className="text-emerald-700 font-bold">Без скрытых комиссий</span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button 
                type="button"
                onClick={() => onNavigate('oformlenie-zakaza')}
                className="w-full flex items-center justify-center gap-2 bg-[#bd001a] hover:bg-[#e61e2a] text-white py-3.5 px-4 rounded-xl font-headline-sm text-[16px] font-bold text-center shadow-lg shadow-[#bd001a]/20 transition-all cursor-pointer active:scale-95"
              >
                <span>Перейти к оформлению заказа</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              {/* Promo Input Field */}
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Промокод или купон"
                    className="flex-1 bg-[#f0f3ff] px-3 py-2 rounded-lg text-[12px] text-[#151c27] placeholder:text-[#575e70] focus:outline-none border border-[#c0c6db]"
                  />
                  <button 
                    type="button"
                    onClick={() => setCouponApplied(true)}
                    className="px-4 py-2 rounded-lg bg-[#e7eefe] hover:bg-[#dce2f3] text-[12px] font-bold text-[#151c27] transition-colors cursor-pointer"
                  >
                    Применить
                  </button>
                </div>
                {couponApplied && (
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Купон применен: -1 500 ₽ на первую партию
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="pt-2 space-y-2 text-[12px] text-[#575e70]">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#bd001a] text-[18px] shrink-0 mt-0.5">verified_user</span>
                  <span><strong>Безопасная сделка:</strong> средства замораживаются и переводятся фабрике только после детального фотоотчета в Иу.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#bd001a] text-[18px] shrink-0 mt-0.5">contract</span>
                  <span><strong>Официальный договор РФ:</strong> закрывающие документы, спецификации партий, работаем с НДС.</span>
                </div>
              </div>

            </div>

            {/* B2B Support Fast Contact */}
            <div className="bg-[#f0f3ff] p-3.5 rounded-2xl flex items-center justify-between text-[#575e70] text-[13px] border border-[#e2e8f8]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8e4b00] text-[20px]">support_agent</span>
                <span>Нужна помощь с фабрикой?</span>
              </div>
              <button 
                type="button"
                onClick={onOpenSupportChat}
                className="text-[#bd001a] font-bold hover:underline cursor-pointer"
              >
                Написать байеру
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
