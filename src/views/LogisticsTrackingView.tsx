import React, { useState } from 'react';
import { PageView } from '../types';
import { SHIPPING_ROUTES, EXCHANGE_RATE } from '../data/mockData';

interface LogisticsTrackingViewProps {
  onNavigate: (page: PageView) => void;
  initialTrackingCode?: string;
  onOpenSupportChat: () => void;
}

export const LogisticsTrackingView: React.FC<LogisticsTrackingViewProps> = ({
  onNavigate,
  initialTrackingCode = 'CN-89410',
  onOpenSupportChat,
}) => {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingCode);
  const [searchedOrder, setSearchedOrder] = useState<string>(initialTrackingCode);
  const [calcWeight, setCalcWeight] = useState(48.5);
  const [calcVolume, setCalcVolume] = useState(0.24);
  const [calcCategory, setCalcCategory] = useState<'electronics' | 'apparel' | 'home' | 'industrial'>('electronics');
  const [selectedRoute, setSelectedRoute] = useState('auto_fast');

  // Interactive mock orders
  const mockShipments: Record<string, {
    status: string;
    badgeColor: string;
    route: string;
    departure: string;
    eta: string;
    originHub: string;
    destinationCity: string;
    weightKg: number;
    volumeM3: number;
    boxes: number;
    category: string;
    inspectionReport: {
      passed: boolean;
      photosCount: number;
      defectsFound: number;
      inspector: string;
      sealNumber: string;
    };
    timeline: {
      title: string;
      location: string;
      date: string;
      done: boolean;
      current?: boolean;
      detail: string;
    }[];
  }> = {
    'CN-89410': {
      status: 'В пути: авто-экспресс на границе',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      route: 'Авто-Экспресс (Иу — Маньчжурия — Москва Южные Ворота)',
      departure: '10 октября 2026',
      eta: '22 октября 2026',
      originHub: 'Консолидационный хаб Иу (Yiwu Logistic Park, Gate 4)',
      destinationCity: 'Москва, Южные ворота (терминал А2)',
      weightKg: 48.5,
      volumeM3: 0.28,
      boxes: 3,
      category: 'Акустика и аксессуары (ANC Pro 2)',
      inspectionReport: {
        passed: true,
        photosCount: 16,
        defectsFound: 0,
        inspector: 'Мастер Ван (Отдел контроля качества Иу)',
        sealNumber: 'SEAL-CN-884192',
      },
      timeline: [
        {
          title: 'Заказ принят у фабрики в Шэньчжэне',
          location: 'Shenzhen Foxconn Tech Park',
          date: '06.10 14:20',
          done: true,
          detail: 'Партия 100 шт принята курьером SF Express для отправки в хаб Иу.',
        },
        {
          title: 'Прибытие на склад консолидации Иу',
          location: 'Yiwu Logistics Hub, Склад #4',
          date: '08.10 09:15',
          done: true,
          detail: 'Взвешивание партии: 48.5 кг, объем 0.28 м³. Проверка штрихкодов.',
        },
        {
          title: 'Инспекция качества и обрешетка',
          location: 'Участок контроля качества Иу',
          date: '08.10 16:40',
          done: true,
          detail: 'Проверено 10% выборки: брак 0%. Упаковано в деревянную евро-обрешетку с влагозащитой.',
        },
        {
          title: 'Погрузка в консолидированную фуру',
          location: 'Транзитный терминал Иу — Север',
          date: '10.10 22:00',
          done: true,
          detail: 'Формирование сборного груза. Пломба № SEAL-CN-884192.',
        },
        {
          title: 'Таможенное оформление на границе',
          location: 'МАПП Маньчжурия — Забайкальск',
          date: '13.10 08:30',
          done: true,
          current: true,
          detail: 'Груз находится в зеленом коридоре таможенного досмотра. Ожидаемое время выпуска: 14.10.',
        },
        {
          title: 'Линейная доставка до терминала Москва',
          location: 'Трасса М-12 Восток',
          date: 'План: 20.10',
          done: false,
          detail: 'Движение в составе магистрального автопоезда до ТК Южные Ворота.',
        },
        {
          title: 'Готовность к выдаче / Передача в СДЭК',
          location: 'Москва, ТК Южные Ворота',
          date: 'План: 22.10',
          done: false,
          detail: 'Смс-оповещение клиенту о прибытии и передача в курьерскую доставку.',
        },
      ],
    },
    'YIWU-RU-99214': {
      status: 'Готов к выдаче в Москве',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      route: 'Авиа Карго Экспресс',
      departure: '04 октября 2026',
      eta: '11 октября 2026',
      originHub: 'Гуанчжоу Байюнь Хаб',
      destinationCity: 'Москва, Склад Люблино',
      weightKg: 12.3,
      volumeM3: 0.08,
      boxes: 1,
      category: 'Электроника & Гаджеты',
      inspectionReport: {
        passed: true,
        photosCount: 8,
        defectsFound: 0,
        inspector: 'Ли Цян',
        sealNumber: 'SEAL-GZ-33910',
      },
      timeline: [
        {
          title: 'Погрузка на рейс Гуанчжоу — Шереметьево',
          location: 'Гуанчжоу Байюнь',
          date: '05.10 23:00',
          done: true,
          detail: 'Вылет грузового борта CA-981.',
        },
        {
          title: 'Таможенная очистка Шереметьево-Карго',
          location: 'Москва SVO',
          date: '08.10 11:30',
          done: true,
          detail: 'Белая очистка завершена. Декларация выпущена.',
        },
        {
          title: 'Готов к выдаче на складе Люблино',
          location: 'Москва, Люблино',
          date: '11.10 10:00',
          done: true,
          current: true,
          detail: 'Груз ожидает получения клиентом или передачи курьеру.',
        },
      ],
    },
    'GZ-MOW-38102': {
      status: 'Инспекция качества на хабе в Гуанчжоу',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      route: 'Ж/Д Контейнер',
      departure: 'Ожидается 15 октября 2026',
      eta: '02 ноября 2026',
      originHub: 'Гуанчжоу Фошань',
      destinationCity: 'Екатеринбург',
      weightKg: 210.0,
      volumeM3: 1.45,
      boxes: 14,
      category: 'Оборудование & Станки',
      inspectionReport: {
        passed: true,
        photosCount: 28,
        defectsFound: 0,
        inspector: 'Сунь Вэй',
        sealNumber: 'PENDING',
      },
      timeline: [
        {
          title: 'Груз поступил от фабрики Фошань',
          location: 'Гуанчжоу Hub',
          date: '12.10 17:00',
          done: true,
          detail: 'Принято 14 паллет. Идет сверка номеров моделей и серийных номеров.',
        },
        {
          title: 'Детальная фото-инспекция и видеофиксация',
          location: 'Гуанчжоу Hub',
          date: '13.10 10:00',
          done: true,
          current: true,
          detail: 'Снято 28 фото и видео работы оборудования. Отчет выгружен в личный кабинет.',
        },
        {
          title: 'Усиленная морская/жд обрешетка',
          location: 'Гуанчжоу Hub',
          date: 'Ожидает',
          done: false,
          detail: 'Упаковка в фанерные ящики.',
        },
      ],
    },
  };

  const currentShipment = mockShipments[searchedOrder] || mockShipments['CN-89410'];

  // Cost calculator
  const routeRateMap: Record<string, { rateUsd: number; days: string; name: string }> = {
    'auto_fast': { rateUsd: 3.20, days: '12–15 дней', name: 'Быстрое авто (Карго)' },
    'auto_slow': { rateUsd: 2.10, days: '18–24 дня', name: 'Медленное авто (Эконом)' },
    'air_express': { rateUsd: 7.50, days: '3–6 дней', name: 'Авиа Экспресс' },
    'rail_white': { rateUsd: 1.80, days: '25–30 дней', name: 'Ж/Д Белая таможня с НДС' },
  };

  const currentRouteData = routeRateMap[selectedRoute] || routeRateMap['auto_fast'];
  const calculatedUsd = calcWeight * currentRouteData.rateUsd + (calcWeight > 30 ? 25 : 15); // insurance & handling
  const calculatedRub = Math.round(calculatedUsd * 92.4);

  return (
    <div className="w-full bg-[#f9f9ff] text-[#151c27] min-h-screen">
      {/* Sub-Header Navigation Strip */}
      <div className="bg-[#f0f3ff] border-b border-[#e2e8f8]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2 text-[#575e70]">
            <button onClick={() => onNavigate('glavnaya')} className="hover:text-[#bd001a] transition-colors">
              Главная
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#151c27] font-semibold">Логистика, склады и онлайн-трекинг грузов</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#575e70]">
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[12px] font-medium border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Хаб Иу: Работает 24/7 (Приемка 1688 без задержек)
            </span>
            <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full text-[12px] font-medium border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Хаб Гуанчжоу: Отправка авто сегодня в 21:00
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        
        {/* Hero Section with Live Tracking Input */}
        <div className="bg-gradient-to-r from-[#151c27] via-[#1e293b] to-[#2a1215] text-white rounded-2xl p-6 md:p-10 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#bd001a]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[12px] text-white/90 mb-4 border border-white/15">
              <span className="material-symbols-outlined text-[16px] text-[#ffb3ad]">satellite_alt</span>
              Спутниковый и терминальный мониторинг сборных грузов
            </div>

            <h1 className="font-headline-lg text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
              Отслеживание партий и логистический хаб Клуб Китай
            </h1>
            <p className="font-body-md text-white/80 text-[15px] mb-8 leading-relaxed">
              Контролируйте каждый этап перемещения вашего товара от ворот китайской фабрики до склада в РФ. Проверяйте статус инспекции в Иу, фотоотчеты и ориентировочные даты прибытия.
            </p>

            {/* Tracking Search Input Form */}
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                  search
                </span>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Введите трек-номер партии (напр. CN-89410, YIWU-RU-99214)"
                  className="w-full pl-10 pr-4 py-3 bg-white/15 text-white placeholder-white/60 rounded-lg text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#bd001a]"
                />
              </div>
              <button
                onClick={() => {
                  if (trackingNumber.trim()) {
                    setSearchedOrder(trackingNumber.trim().toUpperCase());
                  }
                }}
                className="px-6 py-3 bg-[#bd001a] hover:bg-[#e61e2a] text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <span>Найти груз</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Quick Demo Buttons */}
            <div className="flex items-center gap-2 mt-4 text-[12px] text-white/70 flex-wrap">
              <span>Примеры активных поставок:</span>
              {['CN-89410', 'YIWU-RU-99214', 'GZ-MOW-38102'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setTrackingNumber(code);
                    setSearchedOrder(code);
                  }}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-all cursor-pointer ${
                    searchedOrder === code
                      ? 'bg-white text-[#151c27] font-bold border-white'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Shipment Detail Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Shipment Card & Timeline (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#e2e8f8] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f8]">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold font-mono tracking-tight text-[#151c27]">
                      Партия #{searchedOrder}
                    </h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentShipment.badgeColor}`}>
                      {currentShipment.status}
                    </span>
                  </div>
                  <div className="text-sm text-[#575e70] mt-1">
                    {currentShipment.category} • Маршрут: {currentShipment.route}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#575e70]">Ожидаемое прибытие в Москву</div>
                  <div className="text-lg font-bold text-[#bd001a]">{currentShipment.eta}</div>
                </div>
              </div>

              {/* Cargo Specs Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-[#e2e8f8] text-xs">
                <div className="bg-[#f0f3ff] p-3 rounded-xl">
                  <div className="text-[#575e70]">Фактический вес</div>
                  <div className="font-bold text-[#151c27] text-sm mt-0.5">{currentShipment.weightKg} кг</div>
                </div>
                <div className="bg-[#f0f3ff] p-3 rounded-xl">
                  <div className="text-[#575e70]">Объем партии</div>
                  <div className="font-bold text-[#151c27] text-sm mt-0.5">{currentShipment.volumeM3} м³</div>
                </div>
                <div className="bg-[#f0f3ff] p-3 rounded-xl">
                  <div className="text-[#575e70]">Кол-во мест</div>
                  <div className="font-bold text-[#151c27] text-sm mt-0.5">{currentShipment.boxes} короба</div>
                </div>
                <div className="bg-[#f0f3ff] p-3 rounded-xl">
                  <div className="text-[#575e70]">Номер пломбы</div>
                  <div className="font-bold font-mono text-[#151c27] text-xs mt-0.5">{currentShipment.inspectionReport.sealNumber}</div>
                </div>
              </div>

              {/* Step-by-Step Logistics Timeline */}
              <div className="pt-6">
                <h3 className="font-bold text-sm text-[#151c27] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#bd001a]">route</span>
                  Контрольные точки маршрута (GPS &amp; Статусы складов)
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f8]">
                  {currentShipment.timeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          item.current
                            ? 'bg-[#bd001a] text-white ring-4 ring-[#bd001a]/20 animate-pulse'
                            : item.done
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#e2e8f8] text-[#575e70]'
                        }`}
                      >
                        {item.done ? (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="bg-[#f9f9ff] group-hover:bg-[#f0f3ff] transition-colors p-3.5 rounded-xl border border-[#e2e8f8]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className={`font-semibold text-sm ${item.current ? 'text-[#bd001a]' : 'text-[#151c27]'}`}>
                            {item.title}
                          </span>
                          <span className="text-xs text-[#575e70] font-mono">
                            {item.date} • {item.location}
                          </span>
                        </div>
                        <p className="text-xs text-[#575e70] leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Warehouse Inspection & Media Report Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f8] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified_user</span>
                  <div>
                    <h3 className="font-bold text-base text-[#151c27]">
                      Отчет контроля качества на складе в Иу
                    </h3>
                    <p className="text-xs text-[#575e70]">
                      Инспектор: {currentShipment.inspectionReport.inspector}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Брак 0% • Допущено к погрузке
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80"
                    alt="Склад Иу"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Приемка #1
                  </span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
                    alt="Проверка товара"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Выборка 10%
                  </span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80"
                    alt="Обрешетка"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Евро-обрешетка
                  </span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80"
                    alt="Пломбировка"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Пломбировка
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#575e70] bg-[#f9f9ff] p-3 rounded-xl border border-[#e2e8f8]">
                <span>Всего медиафайлов по данной партии: <strong>16 фото + 1 видеоотчет</strong></span>
                <button
                  onClick={onOpenSupportChat}
                  className="text-[#bd001a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  Запросить полный архив инспекции
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Logistics Calculator & Hub Infrastructure */}
          <div className="space-y-6">
            
            {/* Live Calculator Widget */}
            <div className="bg-white rounded-2xl border border-[#e2e8f8] p-6 shadow-sm">
              <h3 className="font-bold text-base text-[#151c27] mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#bd001a]">calculate</span>
                Калькулятор стоимости доставки
              </h3>
              <p className="text-xs text-[#575e70] mb-4">
                Рассчитайте тариф Карго или Белой таможни для вашей партии
              </p>

              <div className="space-y-4">
                {/* Weight Input */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium text-[#151c27]">
                    <span>Вес груза (брутто):</span>
                    <span className="text-[#bd001a] font-bold">{calcWeight} кг</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full accent-[#bd001a]"
                  />
                </div>

                {/* Volume Input */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium text-[#151c27]">
                    <span>Объем (CBM, м³):</span>
                    <span className="text-[#bd001a] font-bold">{calcVolume} м³</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="5.0"
                    step="0.05"
                    value={calcVolume}
                    onChange={(e) => setCalcVolume(Number(e.target.value))}
                    className="w-full accent-[#bd001a]"
                  />
                </div>

                {/* Category Selector */}
                <div>
                  <label className="text-xs font-medium text-[#151c27] block mb-1">
                    Категория товаров:
                  </label>
                  <select
                    value={calcCategory}
                    onChange={(e) => setCalcCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#e2e8f8] bg-[#f9f9ff] text-[#151c27] focus:outline-none focus:ring-1 focus:ring-[#bd001a]"
                  >
                    <option value="electronics">Электроника, Bluetooth, гаджеты</option>
                    <option value="apparel">Одежда, текстиль, обувь</option>
                    <option value="home">Товары для дома, кухни, пластик</option>
                    <option value="industrial">Оборудование, запчасти, станки</option>
                  </select>
                </div>

                {/* Route Radio options */}
                <div>
                  <label className="text-xs font-medium text-[#151c27] block mb-1.5">
                    Способ транспортировки:
                  </label>
                  <div className="space-y-2">
                    {Object.entries(routeRateMap).map(([routeKey, rData]) => (
                      <label
                        key={routeKey}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                          selectedRoute === routeKey
                            ? 'bg-[#fff5f5] border-[#bd001a] text-[#bd001a] font-semibold'
                            : 'border-[#e2e8f8] hover:bg-[#f9f9ff] text-[#575e70]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="routeOption"
                            value={routeKey}
                            checked={selectedRoute === routeKey}
                            onChange={() => setSelectedRoute(routeKey)}
                            className="accent-[#bd001a]"
                          />
                          <span>{rData.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">${rData.rateUsd}/кг</span>
                          <span className="text-[10px] block opacity-75">{rData.days}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Box */}
                <div className="bg-[#151c27] text-white p-4 rounded-xl mt-4">
                  <div className="flex justify-between items-center text-xs text-white/70 mb-1">
                    <span>Расчетная стоимость доставки:</span>
                    <span className="font-mono text-emerald-400">${calculatedUsd.toFixed(1)}</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#ffb3ad]">
                    ≈ {calculatedRub.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="text-[11px] text-white/60 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">info</span>
                    Включает страховку груза 100% и погрузку в Иу
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('korzina')}
                  className="w-full py-3 bg-[#bd001a] hover:bg-[#e61e2a] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Оформить отправку с этим тарифом
                </button>
              </div>
            </div>

            {/* Warehouse Hubs Information Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8f8] p-6 shadow-sm">
              <h3 className="font-bold text-base text-[#151c27] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#bd001a]">hub</span>
                Наши склады консолидации в Китае
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e2e8f8]">
                  <div className="flex items-center justify-between font-bold text-[#151c27] mb-1">
                    <span>Хаб Иу (Yiwu Logistic Park)</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      3,800 м²
                    </span>
                  </div>
                  <p className="text-[#575e70] leading-relaxed">
                    Главный консолидационный узел для мелкого и среднего опта с 1688. Ежедневный прием посылок от сотен фабрик провинции Чжэцзян.
                  </p>
                </div>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e2e8f8]">
                  <div className="flex items-center justify-between font-bold text-[#151c27] mb-1">
                    <span>Хаб Гуанчжоу (Baiyun Logistics)</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      2,400 м²
                    </span>
                  </div>
                  <p className="text-[#575e70] leading-relaxed">
                    Специализированный склад для фабричной электроники, умных часов, аудио и одежды из провинции Гуандун.
                  </p>
                </div>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e2e8f8]">
                  <div className="flex items-center justify-between font-bold text-[#151c27] mb-1">
                    <span>Хаб Шэньчжэнь (Bao'an Tech Center)</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      1,500 м²
                    </span>
                  </div>
                  <p className="text-[#575e70] leading-relaxed">
                    Лаборатория компонентной проверки OEM/ODM партий и лазерного брендирования перед отправкой.
                  </p>
                </div>
              </div>
            </div>

            {/* Need Help Banner */}
            <div className="p-5 bg-gradient-to-br from-[#fff5f5] to-[#ffebeb] rounded-2xl border border-[#ffdad6] text-center">
              <span className="material-symbols-outlined text-[#bd001a] text-[32px] mb-2">
                support_agent
              </span>
              <h4 className="font-bold text-sm text-[#151c27] mb-1">
                Нужен индивидуальный расчет контейнера?
              </h4>
              <p className="text-xs text-[#575e70] mb-3">
                Наш логист рассчитает таможенные пошлины по кодам ТН ВЭД и составит официальный контракт.
              </p>
              <button
                onClick={onOpenSupportChat}
                className="px-4 py-2 bg-white text-[#bd001a] border border-[#bd001a] hover:bg-[#bd001a] hover:text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Написать логисту в чат
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
