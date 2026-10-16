import React, { useState } from 'react';
import { EXCHANGE_RATE, USDT_RATE } from '../data/mockData';

interface CurrencyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyCalculatorModal: React.FC<CurrencyCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [cnyAmount, setCnyAmount] = useState<number>(1000);

  if (!isOpen) return null;

  const rubAmount = Math.round(cnyAmount * EXCHANGE_RATE);
  const usdAmount = (cnyAmount / 7.23).toFixed(2);
  const usdtAmount = (cnyAmount / 7.23).toFixed(2);
  const bankCardMargin = Math.round(rubAmount * 1.085); // typical 8.5% bank spread vs direct factory pool

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e2e8f8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e2e8f8] bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[22px]">price_change</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[18px] text-[#151c27] font-bold">
                Фабричный валютный калькулятор 1688
              </h3>
              <p className="font-body-sm text-[12px] text-[#575e70]">
                Прямой спотовый курс Шэньчжэнь / Москва
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#e2e8f8] text-[#575e70] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-3 bg-[#f0f3ff] rounded-xl flex items-center justify-between">
            <span className="text-[13px] text-[#575e70] font-medium">Текущий биржевой курс платформы:</span>
            <span className="font-bold text-[#bd001a] text-[15px]">1 ¥ ≈ {EXCHANGE_RATE.toFixed(2)} ₽</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-[#151c27] mb-1.5">
                Сумма партии в юанях (CNY ¥)
              </label>
              <div className="relative flex items-center bg-[#f0f3ff] rounded-xl px-3 border border-[#c0c6db] focus-within:border-[#bd001a]">
                <span className="text-[#8e4b00] font-bold text-[18px]">¥</span>
                <input 
                  type="number"
                  value={cnyAmount}
                  onChange={(e) => setCnyAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-transparent py-2.5 px-2 text-[18px] font-bold text-[#151c27] focus:outline-none"
                  min="0"
                  step="100"
                />
              </div>
            </div>

            {/* Converted values grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white border border-[#e2e8f8] rounded-xl shadow-sm">
                <span className="text-[11px] uppercase font-bold text-[#575e70] block">В рублях (Прямой курс Клуба)</span>
                <span className="text-[20px] font-extrabold text-[#bd001a] leading-tight block mt-1">
                  {rubAmount.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">Без скрытых банковских комиссий</span>
              </div>

              <div className="p-3.5 bg-white border border-[#e2e8f8] rounded-xl shadow-sm">
                <span className="text-[11px] uppercase font-bold text-[#575e70] block">В USDT (TRC-20)</span>
                <span className="text-[20px] font-extrabold text-[#151c27] leading-tight block mt-1">
                  ~ {usdtAmount} $
                </span>
                <span className="text-[11px] text-[#575e70]">1 USDT ≈ 7.23 ¥</span>
              </div>
            </div>

            {/* Savings Comparison Block */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#575e70]">Через российские банки/посредники:</span>
                <span className="line-through text-[#575e70] font-mono">{bankCardMargin.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex items-center justify-between text-[14px] font-bold text-emerald-800">
                <span>Ваша чистая экономия в Клубе Китай:</span>
                <span>+ {(bankCardMargin - rubAmount).toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-xl font-label-md text-[14px] font-bold transition-all shadow-md"
            >
              Закрыть калькулятор
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
