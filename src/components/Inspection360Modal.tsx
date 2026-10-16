import React, { useState } from 'react';
import { PDP_IMAGES } from '../data/mockData';

interface Inspection360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

export const Inspection360Modal: React.FC<Inspection360ModalProps> = ({
  isOpen,
  onClose,
  productTitle,
}) => {
  const [activeFrame, setActiveFrame] = useState(0);

  if (!isOpen) return null;

  const frames = PDP_IMAGES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e2e8f8] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e2e8f8] bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[20px]">360</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[16px] text-[#151c27] font-bold">
                360° Цифровой осмотр образца
              </h3>
              <p className="font-body-sm text-[12px] text-[#575e70]">
                {productTitle}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#e2e8f8] text-[#575e70]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 360 Viewer Canvas */}
        <div className="p-6 flex flex-col items-center justify-center bg-radial from-white to-[#f0f3ff]">
          <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden shadow-lg border border-[#e2e8f8] group bg-white">
            <img 
              src={frames[activeFrame].url} 
              alt={frames[activeFrame].label}
              className="w-full h-full object-cover transition-all duration-300" 
            />
            
            <div className="absolute top-3 left-3 bg-[#151c27]/80 backdrop-blur text-white px-2.5 py-1 rounded-md text-[11px] font-mono">
              Ракурс {activeFrame + 1} / {frames.length}: {frames[activeFrame].label}
            </div>

            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-[#151c27] px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
              QC Одобрен инспектором
            </div>
          </div>

          {/* Rotation Stepper Controls */}
          <div className="w-full max-w-md mt-5 space-y-3">
            <div className="flex items-center justify-between text-[12px] text-[#575e70]">
              <span>Крутите слайдер для поворота:</span>
              <span className="font-bold text-[#bd001a] font-mono">{(activeFrame * (360 / frames.length)).toFixed(0)}°</span>
            </div>

            <input 
              type="range"
              min="0"
              max={frames.length - 1}
              value={activeFrame}
              onChange={(e) => setActiveFrame(Number(e.target.value))}
              className="w-full accent-[#bd001a] cursor-pointer"
            />

            <div className="grid grid-cols-5 gap-2 pt-2">
              {frames.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFrame(idx)}
                  className={`p-1 rounded-lg border text-center transition-all ${
                    activeFrame === idx 
                      ? 'border-[#bd001a] bg-[#ffdad6]/40 text-[#bd001a] font-bold' 
                      : 'border-[#e2e8f8] hover:bg-[#f0f3ff] text-[#575e70]'
                  }`}
                >
                  <img src={f.url} alt={f.label} className="w-full aspect-square object-cover rounded mb-1" />
                  <span className="text-[10px] block truncate">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f9f9ff] border-t border-[#e2e8f8] flex items-center justify-between">
          <span className="text-[12px] text-[#575e70]">
            Акустический тест драйверов и тест зазоров пройдены
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-lg font-label-md text-[13px] font-bold transition-colors"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
