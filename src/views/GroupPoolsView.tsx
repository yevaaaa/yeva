import React, { useState } from 'react';
import { PageView, GroupPool } from '../types';
import { HOT_GROUP_POOLS, EXCHANGE_RATE } from '../data/mockData';

interface GroupPoolsViewProps {
  onNavigate: (page: PageView) => void;
  onOpenPhotoSearch: () => void;
  onOpenSupportChat: () => void;
}

export const GroupPoolsView: React.FC<GroupPoolsViewProps> = ({
  onNavigate,
  onOpenPhotoSearch,
  onOpenSupportChat,
}) => {
  const [activeTab, setActiveTab] = useState<'pools' | 'sourcing' | 'oem' | 'customs'>('pools');
  const [pools, setPools] = useState<GroupPool[]>(HOT_GROUP_POOLS);
  const [selectedPoolForPledge, setSelectedPoolForPledge] = useState<GroupPool | null>(null);
  const [pledgeQty, setPledgeQty] = useState<number>(20);
  const [pledgeSuccess, setPledgeSuccess] = useState<string | null>(null);

  // Sourcing form state
  const [sourcingName, setSourcingName] = useState('');
  const [sourcingQty, setSourcingQty] = useState('');
  const [sourcingCost, setSourcingCost] = useState('');
  const [sourcingLink, setSourcingLink] = useState('');
  const [brandingOption, setBrandingOption] = useState<'yes' | 'no'>('yes');
  const [sourcingComments, setSourcingComments] = useState('');
  const [clientName, setClientName] = useState('Константин');
  const [clientContact, setClientContact] = useState('+7 (999) 000-00-00');
  const [sourcingSubmitted, setSourcingSubmitted] = useState(false);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoolForPledge) return;

    setPools((prev) =>
      prev.map((p) => {
        if (p.id === selectedPoolForPledge.id) {
          const newQty = Math.min(p.targetQty, p.currentQty + pledgeQty);
          return {
            ...p,
            currentQty: newQty,
            participantsCount: p.participantsCount + 1,
          };
        }
        return p;
      })
    );

    setPledgeSuccess(selectedPoolForPledge.title);
    setTimeout(() => {
      setPledgeSuccess(null);
      setSelectedPoolForPledge(null);
    }, 2200);
  };

  const handleSourcingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSourcingSubmitted(true);
    setTimeout(() => {
      setSourcingSubmitted(false);
      setSourcingName('');
      setSourcingQty('');
      setSourcingCost('');
      setSourcingLink('');
      setSourcingComments('');
    }, 3500);
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen pb-16">
      
      {/* Sub-bar: Live Rates & B2B Direct Terminal Status */}
      <section className="w-full bg-[#e2e8f8] py-2 px-4 md:px-8 border-b border-[#c0c6db]">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2 font-label-md text-[12px]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#bd001a] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#bd001a] animate-ping"></span>
              B2B Терминал прямого импорта
            </span>
            <span className="text-[#575e70]">|</span>
            <span className="text-[#151c27]">
              Курс фабричного перевода: <strong className="text-[#bd001a]">1 ¥ = {EXCHANGE_RATE.toFixed(2)} ₽</strong> (USDT TRC20: 92.40 ₽)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#575e70]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#8e4b00]">warehouse</span>
              Склады консолидации: Иу, Гуанчжоу, Шэньчжэнь
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#bd001a]">verified</span>
              Белый ВЭД с НДС 20%
            </span>
          </div>
        </div>
      </section>

      {/* Hero Header Section */}
      <section className="w-full bg-white py-10 px-4 md:px-8 border-b border-[#e2e8f8]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-1.5 bg-[#e7eefe] px-3.5 py-1.5 rounded-full text-[#bd001a] font-label-md text-[12px] font-bold">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              Совместные фабричные пулы &amp; Корпоративный ВЭД
            </div>

            <h1 className="font-headline-lg text-[28px] sm:text-[36px] text-[#151c27] font-extrabold tracking-tight leading-tight">
              Покупайте в Китае как крупная корпорация — <span className="text-[#bd001a]">даже небольшими партиями</span>
            </h1>

            <p className="font-body-lg text-[15px] text-[#575e70] max-w-2xl leading-relaxed">
              Объединяйтесь с другими селлерами в коллективные пулы для минимальной цены или заказывайте поиск фабрик и производство под своим брендом.
            </p>

            {/* Segmented Tab Navigation */}
            <div className="w-full flex flex-wrap gap-2 bg-[#f0f3ff] p-1.5 rounded-2xl mt-2 border border-[#c0c6db]">
              <button 
                type="button"
                onClick={() => setActiveTab('pools')}
                className={`px-4 py-2 rounded-xl font-label-md text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'pools' ? 'bg-[#bd001a] text-white shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">group_work</span>
                Коллективные закупки (Пулы)
              </button>

              <button 
                type="button"
                onClick={() => setActiveTab('sourcing')}
                className={`px-4 py-2 rounded-xl font-label-md text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'sourcing' ? 'bg-[#bd001a] text-white shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">factory</span>
                Поиск фабрики под ключ
              </button>

              <button 
                type="button"
                onClick={() => setActiveTab('oem')}
                className={`px-4 py-2 rounded-xl font-label-md text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'oem' ? 'bg-[#bd001a] text-white shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">branding_watermark</span>
                OEM / Private Label производство
              </button>

              <button 
                type="button"
                onClick={() => setActiveTab('customs')}
                className={`px-4 py-2 rounded-xl font-label-md text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'customs' ? 'bg-[#bd001a] text-white shadow-sm' : 'text-[#575e70] hover:text-[#151c27]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">calculate</span>
                Калькулятор белой таможни
              </button>
            </div>
          </div>

          {/* Quick Metrics Bento Widget */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 bg-[#f0f3ff] p-4 rounded-2xl border border-[#e2e8f8]">
            <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-[#e2e8f8]">
              <span className="text-[#575e70] font-label-sm text-[10px] uppercase tracking-wider font-bold">Экономия в пулах</span>
              <span className="font-headline-md text-[24px] text-[#bd001a] font-extrabold mt-1">до -68%</span>
              <span className="text-[#575e70] font-body-sm text-[11px] mt-1">за счет оптовой скидки фабрики</span>
            </div>

            <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-[#e2e8f8]">
              <span className="text-[#575e70] font-label-sm text-[10px] uppercase tracking-wider font-bold">Проверка брака</span>
              <span className="font-headline-md text-[24px] text-[#151c27] font-extrabold mt-1">100%</span>
              <span className="text-[#575e70] font-body-sm text-[11px] mt-1">фото/видео инспекция в Китае</span>
            </div>

            <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-[#e2e8f8]">
              <span className="text-[#575e70] font-label-sm text-[10px] uppercase tracking-wider font-bold">Срок подбора</span>
              <span className="font-headline-md text-[24px] text-[#151c27] font-extrabold mt-1">24 часа</span>
              <span className="text-[#575e70] font-body-sm text-[11px] mt-1">от прямого завода 1688</span>
            </div>

            <div className="bg-white p-4 rounded-xl flex flex-col justify-between border border-[#e2e8f8]">
              <span className="text-[#575e70] font-label-sm text-[10px] uppercase tracking-wider font-bold">Документы РФ</span>
              <span className="font-headline-md text-[24px] text-[#8e4b00] font-extrabold mt-1">ГТД + ЧЗ</span>
              <span className="text-[#575e70] font-body-sm text-[11px] mt-1">Честный Знак под ключ</span>
            </div>
          </div>

        </div>
      </section>

      {/* Section: Active Group Pools */}
      <section className="w-full py-10 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#bd001a] font-label-md text-[12px] uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                Открытые лоты
              </div>
              <h2 className="font-headline-lg text-[24px] md:text-[30px] text-[#151c27] font-bold mt-1">
                Активные коллективные закупки (Hot Group Pools)
              </h2>
              <p className="font-body-md text-[14px] text-[#575e70] mt-1">
                Заказывайте от минимальной партии по оптовой цене контейнерного масштаба. Чем больше объем пула, тем ниже цена для каждого селлера.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#575e70] font-label-md text-[12px]">Фильтр:</span>
              <button className="px-3 py-1.5 bg-white text-[#151c27] rounded-lg font-label-md text-[12px] font-bold shadow-xs border border-[#e2e8f8]">
                Все пулы ({pools.length})
              </button>
              <button className="px-3 py-1.5 bg-[#e7eefe] text-[#575e70] rounded-lg font-label-md text-[12px]">
                Электроника
              </button>
              <button className="px-3 py-1.5 bg-[#e7eefe] text-[#575e70] rounded-lg font-label-md text-[12px]">
                Текстиль
              </button>
            </div>
          </div>

          {/* Grid of Hot Pools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pools.map((pool) => {
              const progressPct = ((pool.currentQty / pool.targetQty) * 100).toFixed(1);
              return (
                <div 
                  key={pool.id}
                  className="bg-white rounded-2xl shadow-sm border border-[#e2e8f8] p-5 md:p-6 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1 z-10">
                    <span className="bg-[#bd001a] text-white px-3 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold tracking-wider shadow-sm">
                      {pool.discountBadge}
                    </span>
                    <span className="bg-white/90 backdrop-blur px-2.5 py-0.5 rounded font-label-sm text-[10px] text-[#575e70] flex items-center gap-1 border border-[#e2e8f8]">
                      <span className="material-symbols-outlined text-[13px] text-[#8e4b00]">schedule</span> {pool.timeLeft}
                    </span>
                  </div>

                  <div>
                    <div className="w-full h-52 rounded-xl overflow-hidden relative mb-4 bg-[#f0f3ff]">
                      <img 
                        src={pool.image} 
                        alt={pool.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-[#151c27] font-label-sm text-[10px] px-2 py-0.5 rounded font-semibold flex items-center gap-1 border border-[#e2e8f8]">
                        <span className="material-symbols-outlined text-[14px] text-[#bd001a]">verified</span>
                        Фабрика {pool.factoryName} ({pool.factoryYears} лет)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#575e70] font-label-sm text-[11px] mb-1">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                      Пул #{pool.poolNumber} • {pool.category}
                    </div>

                    <h3 className="font-headline-sm text-[17px] text-[#151c27] font-bold leading-snug">
                      {pool.title}
                    </h3>

                    <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                      {pool.subtitle}
                    </p>

                    {/* Tiers Matrix */}
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      {pool.tiers.map((t, idx) => (
                        <div 
                          key={idx}
                          className={`p-2 rounded-xl border ${
                            t.active 
                              ? 'bg-[#ffdad6]/40 border-[#bd001a] relative' 
                              : 'bg-[#f0f3ff] border-[#e2e8f8]'
                          }`}
                        >
                          {t.active && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#bd001a] text-white text-[8px] font-bold px-1.5 rounded">
                              АКТИВЕН
                            </span>
                          )}
                          <span className="block font-label-sm text-[10px] text-[#575e70]">от {t.minQty} шт</span>
                          <span className={`block font-label-md text-[13px] font-bold ${t.active ? 'text-[#bd001a]' : 'text-[#151c27]'}`}>
                            ¥{t.cny}
                          </span>
                          <span className={`block font-label-sm text-[10px] ${t.active ? 'text-[#bd001a] font-bold' : 'text-[#575e70]'}`}>
                            {t.rub} ₽
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between font-label-md text-[12px]">
                        <span className="text-[#151c27] font-semibold">
                          Собрано: {pool.currentQty} / {pool.targetQty} шт.
                        </span>
                        <span className="text-[#bd001a] font-bold">{progressPct}% цели</span>
                      </div>
                      
                      <div className="w-full h-3 bg-[#e7eefe] rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-[#bd001a] rounded-full transition-all duration-500" 
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-[#575e70] font-label-sm text-[11px] pt-0.5">
                        <span>Цель: {pool.targetQty} шт.</span>
                        <span>{pool.participantsCount} селлеров участвуют</span>
                      </div>
                    </div>
                  </div>

                  {/* Pledge CTA */}
                  <div className="mt-5 pt-4 border-t border-[#e2e8f8]">
                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedPoolForPledge(pool);
                        setPledgeQty(pool.minParticipation);
                      }}
                      className="w-full bg-[#bd001a] hover:bg-[#e61e2a] text-white py-3 px-4 rounded-xl font-label-md text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>Присоединиться к закупке (от {pool.minParticipation} шт.)</span>
                    </button>
                    
                    <div className="flex items-center justify-center gap-1 text-[#575e70] font-label-sm text-[11px] mt-2 text-center">
                      <span className="material-symbols-outlined text-[14px] text-emerald-600">shield</span>
                      Защита сделки: депозит резервируется до отгрузки
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section: B2B Services Grid (Bento Architecture) */}
      <section className="w-full py-12 px-4 md:px-8 bg-[#f0f3ff]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          <div className="max-w-3xl">
            <span className="text-[#bd001a] font-label-md text-[12px] uppercase tracking-wider font-bold">
              Инфраструктура Клуба
            </span>
            <h2 className="font-headline-lg text-[26px] md:text-[30px] text-[#151c27] font-bold mt-1">
              Комплексные B2B сервисы для импортеров
            </h2>
            <p className="font-body-lg text-[14px] md:text-[15px] text-[#575e70] mt-1 leading-relaxed">
              Полный цикл сопровождения: от первого запроса на фабрику 1688 до приемки на складах Коледино, Электросталь или вашего распределительного центра.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] mb-3">
                  <span className="material-symbols-outlined text-[28px]">handshake</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Прямой контракт с фабрикой</h3>
                <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                  Закупаем напрямую по лицензиям первого уровня без посредников на 1688 и Taobao. Оплата в юанях без конвертационных потерь.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-[#575e70] font-label-sm text-[11px] pt-3 border-t border-[#e2e8f8]">
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Защита от фальсификации цен</li>
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Закрепление спецификаций по ГОСТ</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] mb-3">
                  <span className="material-symbols-outlined text-[28px]">videocam</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Инспекция и видеоотчет</h3>
                <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                  Штатные инспекторы проверяют партию на складах в Иу и Гуанчжоу перед отгрузкой. Детальный чек-лист из 24 пунктов.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-[#575e70] font-label-sm text-[11px] pt-3 border-t border-[#e2e8f8]">
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> 4K видео распаковки образцов</li>
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Замер брака и калибровка размеров</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] mb-3">
                  <span className="material-symbols-outlined text-[28px]">fact_check</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Таможня &amp; Честный Знак</h3>
                <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                  Белое оформление, декларации соответствия, отказные письма, нанесение DataMatrix кодов в Китае до пересечения границы.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-[#575e70] font-label-sm text-[11px] pt-3 border-t border-[#e2e8f8]">
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Полный комплект ГТД под ключ</li>
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Маркировка DataMatrix на фабрике</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f8] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e7eefe] flex items-center justify-center text-[#bd001a] mb-3">
                  <span className="material-symbols-outlined text-[28px]">local_shipping</span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">Фулфилмент до WB / Ozon</h3>
                <p className="font-body-sm text-[12px] text-[#575e70] mt-1 leading-relaxed">
                  Прямая доставка до распределительных складов Wildberries, Ozon, Яндекс Маркет или кросс-докинг на терминалах Москвы.
                </p>
              </div>
              <ul className="mt-4 space-y-1 text-[#575e70] font-label-sm text-[11px] pt-3 border-t border-[#e2e8f8]">
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Упаковка по регламенту маркетплейсов</li>
                <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#bd001a]">done</span> Страхование 100% стоимости груза</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sourcing Form Section */}
      <section className="w-full py-12 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Trust, Proof & Process */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[#bd001a] font-label-md text-[12px] uppercase tracking-wider font-bold">
              Индивидуальный сорсинг
            </span>
            <h2 className="font-headline-lg text-[26px] md:text-[30px] text-[#151c27] font-bold tracking-tight">
              Оставьте заявку на поиск товара или фабрики
            </h2>
            <p className="font-body-md text-[14px] text-[#575e70] leading-relaxed">
              Наша команда байеров в Иу и Шэньчжэне свяжется напрямую с производителями, запросит образцы, проверит юридическую чистоту и предоставит расчет себестоимости с доставкой в РФ.
            </p>

            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e2e8f8] flex items-center gap-4 mt-2">
              <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#bd001a] shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div>
                <div className="font-headline-sm text-[18px] text-[#151c27] font-bold">1 420+ фабрик</div>
                <div className="font-body-sm text-[12px] text-[#575e70]">
                  проверено нашими байерами в Китае в этом месяце с выездом на производство
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#e7eefe] flex items-center justify-center text-[#bd001a] font-bold text-[12px] shrink-0">1</div>
                <div>
                  <div className="font-label-md text-[13px] text-[#151c27] font-bold">Поиск по закрытым базам 1688 и выставкам Кантона</div>
                  <div className="font-body-sm text-[12px] text-[#575e70]">Находим 3–5 альтернативных заводов без наценок торговых агентов.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#e7eefe] flex items-center justify-center text-[#bd001a] font-bold text-[12px] shrink-0">2</div>
                <div>
                  <div className="font-label-md text-[13px] text-[#151c27] font-bold">Экспресс-выкуп и аудит эталонных образцов</div>
                  <div className="font-body-sm text-[12px] text-[#575e70]">Доставка образца на наш склад за 48 часов с фотоотчетом.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#e7eefe] flex items-center justify-center text-[#bd001a] font-bold text-[12px] shrink-0">3</div>
                <div>
                  <div className="font-label-md text-[13px] text-[#151c27] font-bold">Итоговый расчет полной себестоимости в РФ</div>
                  <div className="font-body-sm text-[12px] text-[#575e70]">Включая логистику, таможенные пошлины, НДС и сертификацию.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Application Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#e2e8f8]">
            <form onSubmit={handleSourcingSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#151c27] mb-1">
                  Что ищете? (название, описание или артикул) <span className="text-[#bd001a]">*</span>
                </label>
                <input 
                  type="text"
                  value={sourcingName}
                  onChange={(e) => setSourcingName(e.target.value)}
                  placeholder="Например: Умные датчики температуры Tuya Zigbee или фены с диффузором..."
                  required
                  className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] placeholder:text-[#575e70] text-[13px] border border-[#c0c6db] focus:outline-none focus:border-[#bd001a]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#151c27] mb-1">
                    Количество партии (шт.) <span className="text-[#bd001a]">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={sourcingQty}
                      onChange={(e) => setSourcingQty(e.target.value)}
                      min="10"
                      placeholder="например: 500"
                      required
                      className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] placeholder:text-[#575e70] text-[13px] border border-[#c0c6db] focus:outline-none focus:border-[#bd001a]"
                    />
                    <span className="absolute right-3 top-2.5 text-[#575e70] text-[11px]">шт.</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#151c27] mb-1">
                    Целевая себестоимость <span className="text-[#bd001a]">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={sourcingCost}
                      onChange={(e) => setSourcingCost(e.target.value)}
                      placeholder="Например: 450 ₽ или ¥35"
                      required
                      className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] placeholder:text-[#575e70] text-[13px] border border-[#c0c6db] focus:outline-none focus:border-[#bd001a]"
                    />
                    <span className="absolute right-3 top-2.5 text-[#575e70] text-[11px]">за единицу</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#151c27] mb-1">
                  Ссылка на 1688 / Taobao / Wildberries или загрузка фото
                </label>
                <div className="space-y-2">
                  <input 
                    type="url"
                    value={sourcingLink}
                    onChange={(e) => setSourcingLink(e.target.value)}
                    placeholder="https://detail.1688.com/offer/... или ссылка на конкурента WB"
                    className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] placeholder:text-[#575e70] text-[13px] border border-[#c0c6db] focus:outline-none focus:border-[#bd001a]"
                  />
                  <div 
                    onClick={onOpenPhotoSearch}
                    className="w-full bg-[#f0f3ff] hover:bg-[#e7eefe] p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-[#575e70] hover:text-[#151c27] border border-dashed border-[#c0c6db]"
                  >
                    <span className="material-symbols-outlined text-[22px] text-[#bd001a]">add_a_photo</span>
                    <span className="font-label-md text-[12px]">Прикрепить фото товара для распознавания</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#151c27] mb-1">
                  Требуется ли брендирование (OEM / СТМ)?
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="brand_opt" 
                      checked={brandingOption === 'yes'} 
                      onChange={() => setBrandingOption('yes')}
                      className="accent-[#bd001a]"
                    />
                    <span className="text-[13px] text-[#151c27]">Да, нужен логотип / своя упаковка</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="brand_opt" 
                      checked={brandingOption === 'no'} 
                      onChange={() => setBrandingOption('no')}
                      className="accent-[#bd001a]"
                    />
                    <span className="text-[13px] text-[#151c27]">Нет, готовый no-name товар с фабрики</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#151c27] mb-1">
                  Комментарий и требования к качеству
                </label>
                <textarea 
                  rows={3}
                  value={sourcingComments}
                  onChange={(e) => setSourcingComments(e.target.value)}
                  placeholder="Укажите особые характеристики, цвет, комплектацию, тип вилки, плотность материала..."
                  className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] placeholder:text-[#575e70] text-[13px] border border-[#c0c6db] focus:outline-none focus:border-[#bd001a]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#151c27] mb-1">Ваше имя</label>
                  <input 
                    type="text" 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] text-[13px] border border-[#c0c6db] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#151c27] mb-1">Телефон или Telegram для сметы</label>
                  <input 
                    type="text" 
                    value={clientContact} 
                    onChange={(e) => setClientContact(e.target.value)}
                    required
                    className="w-full bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[#151c27] text-[13px] border border-[#c0c6db] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-[#bd001a] hover:bg-[#e61e2a] text-white py-3.5 px-6 rounded-xl font-headline-sm text-[16px] font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">search_insights</span>
                  <span>Найти надежного поставщика за 24 часа</span>
                </button>

                <p className="text-center text-[11px] text-[#575e70] mt-2">
                  Нажимая кнопку, вы соглашаетесь на обработку данных и расчет сметы по коммерческому тарифу ВЭД
                </p>

                {sourcingSubmitted && (
                  <div className="mt-3 p-3 bg-emerald-100 text-emerald-800 text-[13px] font-bold rounded-xl text-center animate-fadeIn">
                    ✓ Заявка успешно принята! Наш байер в Иу свяжется с вами в течение 24 часов.
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Group Buy Pledge Modal */}
      {selectedPoolForPledge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#e2e8f8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e8f8] pb-3">
              <h3 className="font-headline-sm text-[17px] text-[#151c27] font-bold">
                Участие в коллективном пуле
              </h3>
              <button 
                onClick={() => setSelectedPoolForPledge(null)}
                className="text-[#575e70] hover:text-[#151c27]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8]">
              <img src={selectedPoolForPledge.image} alt={selectedPoolForPledge.title} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <div className="font-bold text-[13px] text-[#151c27] line-clamp-1">{selectedPoolForPledge.title}</div>
                <div className="text-[12px] text-[#bd001a] font-bold">
                  ¥{selectedPoolForPledge.currentPriceCny} ({selectedPoolForPledge.currentPriceRub} ₽ / шт)
                </div>
              </div>
            </div>

            <form onSubmit={handlePledgeSubmit} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-bold text-[#151c27] mb-1">
                  Количество единиц (мин. {selectedPoolForPledge.minParticipation} шт.):
                </label>
                <div className="flex items-center bg-[#f0f3ff] rounded-xl p-1 border border-[#c0c6db]">
                  <button 
                    type="button" 
                    onClick={() => setPledgeQty((q) => Math.max(selectedPoolForPledge.minParticipation, q - 10))}
                    className="w-8 h-8 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <input 
                    type="number"
                    min={selectedPoolForPledge.minParticipation}
                    value={pledgeQty}
                    onChange={(e) => setPledgeQty(Math.max(selectedPoolForPledge.minParticipation, Number(e.target.value)))}
                    className="flex-1 text-center font-bold text-[16px] bg-transparent focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => setPledgeQty((q) => q + 10)}
                    className="w-8 h-8 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#e7eefe] rounded-xl flex items-center justify-between text-[13px] font-bold">
                <span>Итого депозит участия:</span>
                <span className="text-[#bd001a] text-[16px]">
                  {(pledgeQty * selectedPoolForPledge.currentPriceRub).toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-xl font-bold shadow-md cursor-pointer transition-all"
              >
                Подтвердить участие в пуле
              </button>

              {pledgeSuccess && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 text-[12px] font-bold rounded-xl text-center">
                  ✓ Вы добавлены в пул #{selectedPoolForPledge.poolNumber}! Статус обновлен.
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
