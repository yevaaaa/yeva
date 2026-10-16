import React, { useState } from 'react';

interface SupportChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'support' | 'user';
  name: string;
  time: string;
  text: string;
}

export const SupportChatDrawer: React.FC<SupportChatDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'support',
      name: 'Чжан Вэй (Инспектор хаба в Иу)',
      time: '12:40',
      text: 'Здравствуйте! Я нахожусь на складе консолидации в Иу. Если у вас есть вопросы по выкупу лота с 1688, проверке брака или калькуляции логистики — напишите ссылку на товар или вопрос.'
    },
    {
      id: 'm2',
      sender: 'support',
      name: 'Алексей (ВЭД-брокер Москва)',
      time: '12:41',
      text: 'Также мы оформляем белые закрывающие документы с НДС 20% и маркировку Честный Знак прямо на фабрике в Китае.'
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: Message = {
      id: 'u-' + Date.now(),
      sender: 'user',
      name: 'Вы (Алексей, Pro Buyer)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputVal.trim()
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      const replyMsg: Message = {
        id: 's-' + Date.now(),
        sender: 'support',
        name: 'Чжан Вэй (Иу)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Принял ваш запрос! Связываюсь с фабричным технологом для уточнения точного остатка на конвейере и оптовой скидки от объема.'
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#151c27]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#e2e8f8]">
        {/* Header */}
        <div className="p-4 bg-[#bd001a] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://lh3.googleusercontent.com/aida/AEtjO1W1sMpEAWno21sHj92cMhceGryrtfAoWnBo9fHPQ7V0PbN2zPFBKwWIn8j902i0H_eGil7bn58vGnzUwuQwFxcogWHfgtZ9canLDb0gs0BAG-CbpxS_Lax9qpKJH_NZ0JezF95_W8fhAf905Cm-QIERrHLg1BiUAc99CPti2csQ9FUeOEJaTD_8gXnSzRXp7Q5n5nLaSlZ1Rl8ns96ID4JoABSM2795KNIpy4v8VVsGhKGuRpeUP6o--4sA" 
                alt="Support Agent" 
                className="w-10 h-10 rounded-full border-2 border-white/40 object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
            </div>
            <div>
              <div className="font-bold text-[15px]">Поддержка и Байеры Клуба</div>
              <div className="text-[11px] text-white/80 flex items-center gap-1">
                <span>Иу • Шэньчжэнь • Москва 24/7</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f9f9ff]">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <span className="text-[11px] text-[#575e70] mb-1 px-1">
                  {m.name} • {m.time}
                </span>
                <div className={`p-3 rounded-2xl max-w-[85%] text-[13px] leading-relaxed shadow-sm ${
                  isUser 
                    ? 'bg-[#bd001a] text-white rounded-br-none' 
                    : 'bg-white text-[#151c27] border border-[#e2e8f8] rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 bg-[#f0f3ff] border-t border-[#e2e8f8] flex gap-2 overflow-x-auto text-[11px] scrollbar-none">
          <button 
            onClick={() => setInputVal('Сколько дней идет экспресс-авиа до Москвы?')}
            className="px-2.5 py-1 bg-white hover:bg-[#e7eefe] rounded-full border border-[#c0c6db] whitespace-nowrap text-[#575e70] cursor-pointer"
          >
            Сроки авиадоставки?
          </button>
          <button 
            onClick={() => setInputVal('Как заказать образец со своим логотипом?')}
            className="px-2.5 py-1 bg-white hover:bg-[#e7eefe] rounded-full border border-[#c0c6db] whitespace-nowrap text-[#575e70] cursor-pointer"
          >
            Образец с лого?
          </button>
          <button 
            onClick={() => setInputVal('Нужен расчет партии 500 шт. с НДС')}
            className="px-2.5 py-1 bg-white hover:bg-[#e7eefe] rounded-full border border-[#c0c6db] whitespace-nowrap text-[#575e70] cursor-pointer"
          >
            Расчет с НДС
          </button>
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e2e8f8] flex items-center gap-2">
          <input 
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Напишите сообщение или ссылку на 1688..."
            className="flex-1 bg-[#f0f3ff] px-3.5 py-2.5 rounded-xl text-[13px] text-[#151c27] placeholder:text-[#575e70] focus:outline-none focus:bg-[#e7eefe]/50"
          />
          <button 
            type="submit"
            className="w-10 h-10 rounded-xl bg-[#bd001a] hover:bg-[#e61e2a] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
