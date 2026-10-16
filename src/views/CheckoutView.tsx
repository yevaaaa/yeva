import React, { useState, useEffect } from 'react';
import { PageView, ShippingRoute } from '../types';
import { SHIPPING_ROUTES, EXCHANGE_RATE } from '../data/mockData';

interface CheckoutViewProps {
  onNavigate: (page: PageView) => void;
  onOrderSuccess: (orderNumber: string, total: number) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  onNavigate,
  onOrderSuccess,
}) => {
  // Timer state (23:45)
  const [secondsLeft, setSecondsLeft] = useState(1425);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Checkout form options
  const [buyerType, setBuyerType] = useState<'individual' | 'legal'>('individual');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('auto-cargo');
  const [woodenCrate, setWoodenCrate] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'usdt' | 'balance'>('card');

  // Customer credentials
  const [city, setCity] = useState('Москва (Хаб Южные Ворота / Северянин)');
  const [terminal, setTerminal] = useState('г. Москва, ул. Рябиновая, 45, склад 12 (или СДЭК)');
  const [fullName, setFullName] = useState('Смирнов Алексей Викторович');
  const [phone, setPhone] = useState('+7 (999) 450-88-21');
  const [email, setEmail] = useState('alex.smirnov.buyer@gmail.com');
  const [passportInn, setPassportInn] = useState('4518 892304 / ИНН 772391024501');

  // Financial calculations
  const itemsTotalRub = 47610;
  const poolDiscountRub = 2688;
  const selectedRoute = SHIPPING_ROUTES.find((r) => r.id === selectedRouteId) || SHIPPING_ROUTES[0];
  const shippingCostRub = selectedRoute.calculatedPriceRub;
  const crateCostRub = woodenCrate ? 650 : 0;
  const insuranceRub = 952;

  const totalToPayRub = itemsTotalRub - poolDiscountRub + shippingCostRub + crateCostRub + insuranceRub;
  const totalToPayCny = (totalToPayRub / EXCHANGE_RATE).toFixed(2);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderSuccess('CN-89410', totalToPayRub);
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-5">
        
        {/* Breadcrumb & Order Status Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-[#575e70] font-label-md text-[13px]">
            <button onClick={() => onNavigate('korzina')} className="hover:text-[#bd001a] transition-colors cursor-pointer">
              Корзина партий
            </button>
            <span className="material-symbols-outlined text-[16px] text-[#c0c6db]">chevron_right</span>
            <span className="text-[#151c27] font-bold">Оформление международной поставки</span>
          </div>

          <div className="flex items-center gap-2 bg-[#e2e8f8] px-3.5 py-1.5 rounded-full border border-[#c0c6db]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-label-sm text-[11px] text-[#575e70] font-bold uppercase tracking-wider">
              Сессия бронирования цен: {formatTimer(secondsLeft)} мин
            </span>
          </div>
        </div>

        {/* Stepper & Main Title Header */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#e2e8f8] mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#bd001a]/10 text-[#bd001a] font-label-sm text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  B2B &amp; Retail Direct
                </span>
                <span className="font-body-sm text-[12px] text-[#575e70] font-mono">ID сессии: 1688-ORD-2024-9410</span>
              </div>
              <h1 className="font-headline-lg text-[24px] sm:text-[30px] text-[#151c27] font-extrabold mt-1 tracking-tight">
                Оформление заказа <span className="text-[#bd001a]">№ CN-89410</span>
              </h1>
            </div>

            {/* Stepper Progress Bar */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-label-sm text-[10px] uppercase text-[#575e70]">Шаг 1</span>
                  <span className="font-label-md text-[13px] font-bold text-[#151c27]">Получатель</span>
                </div>
              </div>
              
              <div className="w-8 sm:w-12 h-0.5 bg-emerald-500"></div>

              {/* Step 2 (Active) */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#bd001a] text-white flex items-center justify-center font-bold text-[13px] shadow-md shadow-[#bd001a]/30">
                  2
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-label-sm text-[10px] uppercase text-[#bd001a] font-bold">Шаг 2</span>
                  <span className="font-label-md text-[13px] font-bold text-[#151c27]">Логистика &amp; Таможня</span>
                </div>
              </div>

              <div className="w-8 sm:w-12 h-0.5 bg-[#e2e8f8]"></div>

              {/* Step 3 */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e2e8f8] text-[#575e70] flex items-center justify-center font-bold text-[13px]">
                  3
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-label-sm text-[10px] uppercase text-[#575e70]">Шаг 3</span>
                  <span className="font-label-md text-[13px] text-[#575e70]">Оплата &amp; Закрытие</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master 2-Column Grid */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Forms, Logistics, Options, Payment (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
            
            {/* SECTION 1: Destination & Receiver Credentials */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#e2e8f8]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e2e8f8]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
                    <span className="material-symbols-outlined text-[20px]">person_pin_circle</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                      1. Контактные данные и адрес доставки в РФ
                    </h2>
                    <p className="font-body-sm text-[12px] text-[#575e70]">
                      Укажите официального грузополучателя для таможенного реестра и экспедирования
                    </p>
                  </div>
                </div>
                <span className="font-label-sm text-[10px] bg-[#e7eefe] text-[#151c27] font-bold px-2.5 py-1 rounded-md uppercase">
                  Склад Иу ➔ Москва
                </span>
              </div>

              {/* Buyer Type Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-[#f0f3ff] rounded-xl mb-5 border border-[#c0c6db]">
                <button
                  type="button"
                  onClick={() => setBuyerType('individual')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                    buyerType === 'individual'
                      ? 'bg-white text-[#151c27] shadow-sm border border-[#e2e8f8]'
                      : 'text-[#575e70] hover:text-[#151c27]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#bd001a]">badge</span>
                  <span>Физ. лицо / Селлер (Самозанятый, Карго)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBuyerType('legal')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                    buyerType === 'legal'
                      ? 'bg-white text-[#151c27] shadow-sm border border-[#e2e8f8]'
                      : 'text-[#575e70] hover:text-[#151c27]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#8e4b00]">corporate_fare</span>
                  <span>Юр. лицо / ИП (с НДС, Честный Знак, ГТД)</span>
                </button>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#151c27]">Город назначения в России</label>
                  <div className="relative flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                    <span className="material-symbols-outlined text-[#575e70] text-[20px]">location_city</span>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-transparent py-2.5 px-2 text-[13px] text-[#151c27] focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-[#575e70]">Автоматический расчет магистрали из Иу</span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#151c27]">Локальный терминал / Склад выдачи</label>
                  <div className="relative flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                    <span className="material-symbols-outlined text-[#575e70] text-[20px]">warehouse</span>
                    <input 
                      type="text" 
                      value={terminal}
                      onChange={(e) => setTerminal(e.target.value)}
                      className="w-full bg-transparent py-2.5 px-2 text-[13px] text-[#151c27] focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-[#575e70]">Возможна прямая сдача на склад WB / Ozon / СДЭК</span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#151c27]">ФИО Грузополучателя (полностью)</label>
                  <div className="flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                    <span className="material-symbols-outlined text-[#575e70] text-[20px]">person</span>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-transparent py-2.5 px-2 text-[13px] text-[#151c27] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#151c27]">Телефон для СМС-кода и инспекции</label>
                  <div className="flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                    <span className="material-symbols-outlined text-[#575e70] text-[20px]">call</span>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent py-2.5 px-2 text-[13px] text-[#151c27] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#151c27]">Электронная почта (для ГТД, чеков и фотоотчетов)</label>
                  <div className="flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                    <span className="material-symbols-outlined text-[#575e70] text-[20px]">mail</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent py-2.5 px-2 text-[13px] text-[#151c27] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#151c27]">Паспортные данные / ИНН получателя</label>
                  <div className="flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                    <span className="material-symbols-outlined text-[#575e70] text-[20px]">shield</span>
                    <input 
                      type="text" 
                      value={passportInn}
                      onChange={(e) => setPassportInn(e.target.value)}
                      className="w-full bg-transparent py-2.5 px-2 text-[13px] text-[#151c27] focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-[#575e70]">Требование таможенных органов ЕАЭС для белой очистки</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: International Logistics Routes */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#e2e8f8]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#e2e8f8]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                      2. Выбор способа международной доставки из Китая
                    </h2>
                    <p className="font-body-sm text-[12px] text-[#575e70]">
                      Все маршруты включают обработку на хабе «КЛУБ КИТАЙ» в Иу
                    </p>
                  </div>
                </div>
                <span className="font-label-sm text-[11px] bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Расчетный вес партии: 17.8 кг
                </span>
              </div>

              {/* Logistics Route Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHIPPING_ROUTES.map((route) => {
                  const isSelected = selectedRouteId === route.id;
                  return (
                    <div
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`relative rounded-xl p-4 transition-all flex flex-col justify-between cursor-pointer border ${
                        isSelected 
                          ? 'border-[#bd001a] bg-[#ffdad6]/20 ring-2 ring-[#bd001a]/30 shadow-sm' 
                          : 'border-[#e2e8f8] bg-[#f0f3ff] hover:bg-[#e7eefe]'
                      }`}
                    >
                      {route.badge && (
                        <div className="absolute -top-3 right-4 bg-[#bd001a] text-white font-label-sm text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <span className="material-symbols-outlined text-[13px]">verified</span> {route.badge}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-2 font-headline-sm text-[15px] font-bold ${isSelected ? 'text-[#bd001a]' : 'text-[#151c27]'}`}>
                            <span className="material-symbols-outlined text-[22px]">{route.icon}</span>
                            {route.title}
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#bd001a] text-white' : 'border border-[#c0c6db] bg-white'
                          }`}>
                            {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                          </div>
                        </div>

                        <div className="font-body-sm text-[11px] text-[#575e70] mt-1">
                          Маршрут: {route.route}
                        </div>

                        <div className="flex items-center gap-3 my-3">
                          <div className="bg-white px-2.5 py-1 rounded-lg border border-[#e2e8f8]">
                            <span className="font-label-sm text-[10px] text-[#575e70] uppercase block">Срок в пути</span>
                            <span className="font-label-md text-[12px] text-[#151c27] font-bold">{route.duration}</span>
                          </div>
                          <div className="bg-white px-2.5 py-1 rounded-lg border border-[#e2e8f8]">
                            <span className="font-label-sm text-[10px] text-[#575e70] uppercase block">Тариф за кг</span>
                            <span className={`font-label-md text-[12px] font-bold ${isSelected ? 'text-[#bd001a]' : 'text-[#151c27]'}`}>
                              {route.ratePerKg}
                            </span>
                          </div>
                        </div>

                        <p className="font-body-sm text-[12px] text-[#575e70] mb-3 leading-relaxed">
                          {route.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#e2e8f8] flex items-center justify-between">
                        <span className="font-label-sm text-[11px] text-[#575e70] uppercase">Итого логистика:</span>
                        <span className="font-price-headline text-[18px] text-[#151c27] font-extrabold">
                          {route.calculatedPriceRub.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: Quality Control & Warehouse Options in Yiwu */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#e2e8f8]">
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#e2e8f8]">
                <div className="w-8 h-8 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
                  <span className="material-symbols-outlined text-[20px]">fact_check</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                    3. Дополнительные опции контроля в Китае
                  </h2>
                  <p className="font-body-sm text-[12px] text-[#575e70]">
                    Управление рисками на складе консолидации до пересечения границы
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f3ff] cursor-pointer hover:bg-[#e7eefe] transition-colors border border-[#e2e8f8]">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded text-[#bd001a] accent-[#bd001a]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[13px] text-[#151c27] font-bold">
                        Полная фото- и видеопроверка партии в Иу перед погрузкой
                      </span>
                      <span className="font-label-sm text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold uppercase">
                        Включено
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mt-0.5">
                      Инспектор вскрывает коробки, проверяет комплектность, соответствие цвета, швы и тестирует включение электроники.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f3ff] cursor-pointer hover:bg-[#e7eefe] transition-colors border border-[#e2e8f8]">
                  <input 
                    type="checkbox" 
                    checked={woodenCrate} 
                    onChange={(e) => setWoodenCrate(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#bd001a] accent-[#bd001a]" 
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[13px] text-[#151c27] font-bold">
                        Деревянная обрешетка и влагозащита скотчем с уголками
                      </span>
                      <span className="font-label-md text-[12px] text-[#bd001a] font-bold">
                        +650 ₽
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mt-0.5">
                      Жесткий каркас по периметру коробки защищает товарный вид фабричной упаковки для маркетплейсов FBO.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f3ff] cursor-pointer hover:bg-[#e7eefe] transition-colors border border-[#e2e8f8]">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded text-[#bd001a] accent-[#bd001a]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[13px] text-[#151c27] font-bold">
                        Экспедиторский забор партий прямо от фабрик (Гуанчжоу/Шэньчжэнь)
                      </span>
                      <span className="font-label-sm text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold uppercase">
                        Включено
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mt-0.5">
                      Внутренний трафик по Китаю до нашего консолидационного хаба без задержек.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f3ff] cursor-pointer hover:bg-[#e7eefe] transition-colors border border-[#e2e8f8]">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded text-[#bd001a] accent-[#bd001a]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[13px] text-[#151c27] font-bold">
                        Страхование груза от утери, конфискации и повреждений (100% стоимости)
                      </span>
                      <span className="font-label-md text-[12px] text-[#151c27] font-semibold">
                        Включено (2% тарифа)
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mt-0.5">
                      Выплата компенсации в рублях по биржевому курсу в течение 5 рабочих дней при наступлении страхового случая.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* SECTION 4: Payment Instruments */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#e2e8f8]">
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#e2e8f8]">
                <div className="w-8 h-8 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                    4. Способы оплаты заказа
                  </h2>
                  <p className="font-body-sm text-[12px] text-[#575e70]">
                    Оплата холдируется на счете платформы до видеоприемки товара на складе в Иу
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pay 1 */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl shadow-xs transition-all flex flex-col justify-between cursor-pointer border ${
                    paymentMethod === 'card' 
                      ? 'border-[#bd001a] bg-[#ffdad6]/25 ring-2 ring-[#bd001a]/30' 
                      : 'border-[#e2e8f8] bg-[#f0f3ff] hover:bg-[#e7eefe]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-label-md text-[13px] font-bold text-[#151c27]">
                        <span className="material-symbols-outlined text-[#bd001a] text-[20px]">credit_card</span>
                        Банковская карта РФ / СБП
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'bg-[#bd001a] text-white' : 'border border-[#c0c6db]'}`}>
                        {paymentMethod === 'card' && <span className="material-symbols-outlined text-[12px]">check</span>}
                      </div>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mb-3">
                      МИР, СберПэй, Т-Банк, СБП без комиссии эквайринга
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-white rounded text-[10px] font-bold text-[#575e70] border border-[#e2e8f8]">МИР</span>
                      <span className="px-2 py-0.5 bg-white rounded text-[10px] font-bold text-[#575e70] border border-[#e2e8f8]">СБП 0%</span>
                      <span className="px-2 py-0.5 bg-white rounded text-[10px] font-bold text-[#575e70] border border-[#e2e8f8]">QR-код</span>
                    </div>
                  </div>
                </div>

                {/* Pay 2 */}
                <div 
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-4 rounded-xl shadow-xs transition-all flex flex-col justify-between cursor-pointer border ${
                    paymentMethod === 'wire' 
                      ? 'border-[#bd001a] bg-[#ffdad6]/25 ring-2 ring-[#bd001a]/30' 
                      : 'border-[#e2e8f8] bg-[#f0f3ff] hover:bg-[#e7eefe]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-label-md text-[13px] font-bold text-[#151c27]">
                        <span className="material-symbols-outlined text-[#575e70] text-[20px]">receipt_long</span>
                        Безналичный расчет (Юр. лица / ИП)
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${paymentMethod === 'wire' ? 'bg-[#bd001a] text-white' : 'border border-[#c0c6db]'}`}>
                        {paymentMethod === 'wire' && <span className="material-symbols-outlined text-[12px]">check</span>}
                      </div>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mb-3">
                      Счет на оплату в рублях с НДС 20% или без НДС. Договор поставки, УПД через Диадок.
                    </p>
                    <span className="font-label-sm text-[10px] text-[#8e4b00] bg-[#ffdcc3] px-2 py-0.5 rounded font-bold">
                      Закрывающие документы ВЭД
                    </span>
                  </div>
                </div>

                {/* Pay 3 */}
                <div 
                  onClick={() => setPaymentMethod('usdt')}
                  className={`p-4 rounded-xl shadow-xs transition-all flex flex-col justify-between cursor-pointer border ${
                    paymentMethod === 'usdt' 
                      ? 'border-[#bd001a] bg-[#ffdad6]/25 ring-2 ring-[#bd001a]/30' 
                      : 'border-[#e2e8f8] bg-[#f0f3ff] hover:bg-[#e7eefe]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-label-md text-[13px] font-bold text-[#151c27]">
                        <span className="material-symbols-outlined text-[#575e70] text-[20px]">currency_exchange</span>
                        Криптовалюта USDT (TRC-20)
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${paymentMethod === 'usdt' ? 'bg-[#bd001a] text-white' : 'border border-[#c0c6db]'}`}>
                        {paymentMethod === 'usdt' && <span className="material-symbols-outlined text-[12px]">check</span>}
                      </div>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mb-3">
                      Моментальный выкуп партии на 1688 по прямому спотовому курсу без наценки банков.
                    </p>
                    <span className="font-label-sm text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                      1 USDT ≈ 7.23 ¥
                    </span>
                  </div>
                </div>

                {/* Pay 4 */}
                <div 
                  onClick={() => setPaymentMethod('balance')}
                  className={`p-4 rounded-xl shadow-xs transition-all flex flex-col justify-between cursor-pointer border ${
                    paymentMethod === 'balance' 
                      ? 'border-[#bd001a] bg-[#ffdad6]/25 ring-2 ring-[#bd001a]/30' 
                      : 'border-[#e2e8f8] bg-[#f0f3ff] hover:bg-[#e7eefe]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-label-md text-[13px] font-bold text-[#151c27]">
                        <span className="material-symbols-outlined text-[#575e70] text-[20px]">account_balance</span>
                        Баланс Личного кабинета
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${paymentMethod === 'balance' ? 'bg-[#bd001a] text-white' : 'border border-[#c0c6db]'}`}>
                        {paymentMethod === 'balance' && <span className="material-symbols-outlined text-[12px]">check</span>}
                      </div>
                    </div>
                    <p className="font-body-sm text-[12px] text-[#575e70] mb-3">
                      Списание с депозита байера без повторного прохождения эквайринга.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-[11px] text-[#575e70]">Доступно:</span>
                      <span className="font-label-md text-[12px] text-[#151c27] font-bold">12 400 ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Direct Factory Line Items (4 Columns) */}
          <div className="lg:col-span-4 sticky top-36 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#e2e8f8]">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f8] mb-4">
                <div>
                  <h3 className="font-headline-sm text-[17px] font-bold text-[#151c27]">Сводка партии</h3>
                  <span className="font-body-sm text-[12px] text-[#575e70]">Фабричный опт • 4 наименования</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#e7eefe] text-[#bd001a] font-label-sm text-[11px] font-bold">
                  46 единиц
                </span>
              </div>

              {/* Product Line Items List */}
              <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                {/* Item 1 */}
                <div className="flex items-center gap-3">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2k5fQCIccmjNtWGiNCiuqbXoY_c_9u05oLunTYwcM0j8uzm89k2Agsy4Ooat-uvY8uBIXzlDWBgAlQIGFl6ESqxkHMfGAaJzbcR1xw_9Powc9lze7EkcbLOBCRUmxuS4e72L6HZkR3Nf6QSxFnTLANXRIuYroNfOoX6ZI2NRMYPzkmH4T0auDSeRhgdQsxU_fuK0rslqf4Jtu1QkvjzDs0G25D--csNutuZcvA90fr9TyUqwWHs4lYw" 
                    alt="Наушники ANC Pro 2"
                    className="w-13 h-13 rounded-lg object-cover bg-[#f0f3ff] shrink-0 border border-[#e2e8f8]" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold truncate">Наушники ANC Pro 2 (Фабрика Шэньчжэнь)</div>
                    <div className="flex items-center gap-1.5 text-[#575e70] font-body-sm text-[11px]">
                      <span>20 шт.</span>
                      <span>•</span>
                      <span>1 267.20 ₽/шт</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold">25 344 ₽</div>
                    <div className="font-price-sub text-[11px] text-[#575e70]">¥1 980</div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-3">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOeaD2k5SZRRr-C-WWKgC7Rp-M9vJ3kt47MDnbmM6wCZaPfgWK2go-UMIpsfpGaSBfdopIjo0QUIYPHp85ExnzA4rTYDEFp5p5unFRPKzVu9uhjph4V7vgXr3OZordoCJEsJfYo0NT1zWhn5zXWlqFYS5iUInfAas8k2w8SpOuPo783bCPmIUbtXSM5i_bebLJu1_RH6--JmdPJneqhfZsO_cRDVsAxVLF9qWh0xavKv6WVIPlOuqJAg" 
                    alt="Образец предсерийный"
                    className="w-13 h-13 rounded-lg object-cover bg-[#f0f3ff] shrink-0 border border-[#e2e8f8]" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold truncate">Образец предсерийный ANC Pro 2</div>
                    <div className="flex items-center gap-1.5 text-[#575e70] font-body-sm text-[11px]">
                      <span>1 шт.</span>
                      <span>•</span>
                      <span>Инспекция</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold">1 650 ₽</div>
                    <div className="font-price-sub text-[11px] text-[#575e70]">¥128</div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-3">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOyh8N5PQtlNrwGmWJdH-TCoE2FMxL-Vd3OszM8Zoeiz5XimYzgJ8eIGv9Ue_7Lx7JPSmtCUGSRg4vBTDpGT9i7CZpBLlElyKKEK0jNvbQF3FkxMJTSDEcbIxscLbmeCxSPONezA9l8P0_DZj-Jx7OEscidhttb7LJnZOjouQrSEOU2kwp-9mZma1le7oJQxMyZvy4zZ5l3xVlHanFrTz_IpS0Iy7mHx1ujB-cT-c49r7YrJQdVz5DtQ" 
                    alt="Power Bank"
                    className="w-13 h-13 rounded-lg object-cover bg-[#f0f3ff] shrink-0 border border-[#e2e8f8]" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold truncate">MagSafe Power Bank 5000mAh Slim</div>
                    <div className="flex items-center gap-1.5 text-[#575e70] font-body-sm text-[11px]">
                      <span>10 шт.</span>
                      <span>•</span>
                      <span>1 140 ₽/шт</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold">11 400 ₽</div>
                    <div className="font-price-sub text-[11px] text-[#575e70]">¥890</div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-center gap-3">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKnMhBrNz67T6VTTYJ_eHrsHUY3mXRAdLBT5ME03FondCkeyvQkMW5dpciA2d3gmRSa7Pp9scnRJwq8nos3EovIsS1TQ36O7k_xk2OpGyNRvfejLdcOUubLcp6fFngy63F4CVzxHPK9HcPBdus8GS3luhhXTx1Aa6QDGVgM9YI4OqSRL_KCuYnpoLKXdmLwks1-dRgISC-netfmN0hL17Hi9Dv2-WPhBPVdlEMQu_iRT5wQlcyzv0Y0Q" 
                    alt="Худи оверсайз"
                    className="w-13 h-13 rounded-lg object-cover bg-[#f0f3ff] shrink-0 border border-[#e2e8f8]" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold truncate">Худи оверсайз 450gsm Premium Cotton</div>
                    <div className="flex items-center gap-1.5 text-[#575e70] font-body-sm text-[11px]">
                      <span>15 шт.</span>
                      <span>•</span>
                      <span>614.40 ₽/шт</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold">9 216 ₽</div>
                    <div className="font-price-sub text-[11px] text-[#575e70]">¥720</div>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown Details */}
              <div className="mt-4 pt-4 border-t border-[#e2e8f8] space-y-2 text-[12px]">
                <div className="flex items-center justify-between text-[#575e70]">
                  <span>Товары с фабрик (46 шт.):</span>
                  <span className="text-[#151c27] font-medium">47 610 ₽ <span className="text-[#575e70]">(¥3 719)</span></span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Скидка оптового пула КЛУБ КИТАЙ:</span>
                  <span>−2 688 ₽</span>
                </div>
                <div className="flex items-center justify-between text-[#575e70]">
                  <span>Доставка {selectedRoute.title} (17.8 кг):</span>
                  <span className="text-[#151c27] font-bold">{shippingCostRub.toLocaleString('ru-RU')} ₽</span>
                </div>
                {woodenCrate && (
                  <div className="flex items-center justify-between text-[#575e70]">
                    <span>Усиленная обрешетка и влагозащита:</span>
                    <span className="text-[#151c27] font-medium">650 ₽</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#575e70]">
                  <span>Страховка 100% груза (2%):</span>
                  <span className="text-[#151c27] font-medium">{insuranceRub} ₽</span>
                </div>
                <div className="flex items-center justify-between text-[#575e70]">
                  <span>Складская консолидация в Иу:</span>
                  <span className="text-emerald-700 font-bold uppercase text-[10px]">Бесплатно</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="mt-4 pt-4 border-t border-[#e2e8f8] flex items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="font-label-md text-[11px] uppercase tracking-wider text-[#575e70] font-bold">
                    Итого к оплате:
                  </span>
                  <span className="font-body-sm text-[11px] text-[#575e70]">
                    Курс пересчета: 1 ¥ ≈ {EXCHANGE_RATE.toFixed(2)} ₽
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-headline-lg text-[26px] font-extrabold text-[#bd001a] tracking-tight">
                    {totalToPayRub.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="font-price-sub text-[12px] text-[#575e70] font-bold font-mono">
                    ≈ ¥{totalToPayCny}
                  </div>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button 
                type="submit"
                className="w-full mt-4 bg-[#bd001a] hover:bg-[#e61e2a] text-white py-3.5 px-4 rounded-xl font-headline-sm text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#bd001a]/25 transition-all active:scale-[0.99] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">lock</span>
                <span>Подтвердить и оплатить заказ • {totalToPayRub.toLocaleString('ru-RU')} ₽</span>
              </button>

              <p className="font-body-sm text-[11px] text-[#575e70] text-center mt-3 leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с условиями публичной оферты ВЭД и правилами страхования грузов. Средства холдируются до прохождения инспекции на складе в Иу.
              </p>

              {/* Trust Badges Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#e2e8f8] text-center">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px]">verified_user</span>
                  <span className="font-label-sm text-[10px] text-[#151c27] font-bold mt-1">Гарантия возврата</span>
                  <span className="text-[10px] text-[#575e70]">100% средств</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px]">assignment_turned_in</span>
                  <span className="font-label-sm text-[10px] text-[#151c27] font-bold mt-1">Контракт ВЭД</span>
                  <span className="text-[10px] text-[#575e70]">№ CN-882193</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[#bd001a] text-[20px]">headset_mic</span>
                  <span className="font-label-sm text-[10px] text-[#151c27] font-bold mt-1">Поддержка</span>
                  <span className="text-[10px] text-[#575e70]">24/7 Рус/Китай</span>
                </div>
              </div>

            </div>

            {/* Live Exchange & China Warehouse Live Status */}
            <div className="bg-[#f0f3ff] rounded-2xl p-4 shadow-sm border border-[#e2e8f8]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8e4b00] text-[24px]">warehouse</span>
                <div className="flex-1">
                  <div className="font-label-md text-[13px] text-[#151c27] font-bold">Хаб Иу (Yiwu Logistic Center)</div>
                  <div className="font-body-sm text-[11px] text-[#575e70]">Приемка открыта • Погрузка партии в рейс: Сегодня в 22:00</div>
                </div>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
