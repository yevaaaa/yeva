import React from 'react';
import { PageView } from '../types';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  totalRub: number;
  onNavigate: (page: PageView) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  totalRub,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e2e8f8] overflow-hidden flex flex-col text-center p-6 md:p-8">
        
        {/* Animated Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-[36px]">verified</span>
        </div>

        <h3 className="font-headline-lg text-[22px] md:text-[24px] text-[#151c27] font-bold">
          Заказ <span className="text-[#bd001a]">{orderNumber}</span> успешно оформлен!
        </h3>

        <p className="font-body-md text-[14px] text-[#575e70] mt-2">
          Средства захолдированы на эскроу-счете. Наш склад в Иу получил уведомление и начинает сборку и фото-инспекцию вашей партии.
        </p>

        {/* Order Details Pill */}
        <div className="my-5 p-4 bg-[#f0f3ff] rounded-xl text-left border border-[#e2e8f8] space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#575e70]">Сумма к списанию:</span>
            <span className="font-bold text-[#151c27]">{totalRub.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#575e70]">Маршрут доставки:</span>
            <span className="font-semibold text-[#151c27]">Иу (Хаб) ➔ Хоргос ➔ Москва</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#575e70]">Ориентировочный срок:</span>
            <span className="font-semibold text-emerald-700">13–16 дней</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#575e70]">Контракт ВЭД:</span>
            <span className="font-mono text-[#575e70]">№ CN-882193 (Лицензия)</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onNavigate('logistika-i-treking');
            }}
            className="flex-1 py-3 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-xl font-label-md text-[14px] font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            <span>Отслеживать партию</span>
          </button>
          
          <button
            onClick={() => {
              onClose();
              onNavigate('glavnaya');
            }}
            className="flex-1 py-3 bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] rounded-xl font-label-md text-[14px] font-semibold transition-colors"
          >
            На главную
          </button>
        </div>

      </div>
    </div>
  );
};
