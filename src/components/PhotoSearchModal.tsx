import React, { useState } from 'react';
import { PageView } from '../types';

interface PhotoSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView) => void;
}

export const PhotoSearchModal: React.FC<PhotoSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);

  if (!isOpen) return null;

  const sampleImages = [
    {
      id: 's1',
      title: 'TWS Наушники ANC Pro 2',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCagARCeEs081MxHXzVGm4glzgXLYWHtzxpWzjT89__uYBUHbFSGk1R4EXr0L8LiDaDtAmxApzrocQCXb5w94qUfWxdYtQIWqoFm0IIZi1LXnCs0isfbizUjtYKHFSClccgZZG4Wz3Lx_vCWS5aoZ0R9W_baeATZWmkzLzEnm2eqlr-e3aVfPB4fuyhT0zpsBb15pBi9JCsP0d0WfAMUnD5vERQ4pOptSjxn23oBInp7llkS2X2ucNPrQ',
      factory: 'Shenzhen Acoustics Tech'
    },
    {
      id: 's2',
      title: 'Магнитный Power Bank 15W',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfUOF0kQe3hLTLYpMNx2KwDxwcyK_PoolegpzLABqxAnw_x7MABDO-VMQZXoW4C4euLohnAWh5cINCYDK7FQw2xqczgYbUF_WyOntFRYNehbt-rq5MHAVbPUUFDRoZlAjHWVmisPW8exguBCjiIAQTsGGRTp1SqM_VyhzaUSXyI_GDmXwtYdh5cCbLJajZ2uvN2CRv4u_XTqpQPsaHZLWfFs3GKpGWVjsonPSZVgNiRe7HpO9u2WWWKg',
      factory: 'Shenzhen MagSafe Tech'
    },
    {
      id: 's3',
      title: 'Худи Оверсайз 450г/м²',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKErC-dSjPMxRxlKwnfVbUQXh444SjVlNqVu86_ucXvXx5K16ZILrVqNqDRlaF-CEu-7vyQSEppz2-NyKkTpp655gkLFxHJhHP9u6DQida6rAXP6942EatIuOWqyQj_SDJvGxauaEX-qlHXHIm_iPWMrGgaZR_bPNDsTsIUNLf_YUDWmz7-mS1r1mDDyWz1qyDeRh3tHRVt5OFqq8fKyi_8PVDBZo-8JWNSxI_d1UuIVSLHRyDiLfIA',
      factory: 'Guangzhou Knitwear Co.'
    }
  ];

  const handleStartSearch = (imgUrl: string) => {
    setSelectedSample(imgUrl);
    setIsSearching(true);
    setSearchComplete(false);
    setTimeout(() => {
      setIsSearching(false);
      setSearchComplete(true);
    }, 1200);
  };

  const handleApplyResult = () => {
    onClose();
    onNavigate('tovary-s-fabrik');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151c27]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#e2e8f8] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e2e8f8] bg-[#f9f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#bd001a]">
              <span className="material-symbols-outlined text-[22px]">photo_camera</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[18px] text-[#151c27] font-bold">
                Поиск товара на фабриках 1688 по фото
              </h3>
              <p className="font-body-sm text-[12px] text-[#575e70]">
                Нейросетевой поиск первоисточников без посредников
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!searchComplete ? (
            <>
              {/* Dropzone */}
              <div 
                onClick={() => handleStartSearch(sampleImages[0].url)}
                className="border-2 border-dashed border-[#c0c6db] hover:border-[#bd001a] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#f0f3ff]/60 hover:bg-[#e7eefe]/40 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#bd001a] mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">upload_file</span>
                </div>
                <div className="font-label-md text-[15px] text-[#151c27] font-bold">
                  Перетащите изображение сюда или кликните для загрузки
                </div>
                <p className="font-body-sm text-[12px] text-[#575e70] mt-1 max-w-sm">
                  Поддерживаются форматы JPG, PNG, WEBP. Можно загрузить скриншот с Wildberries, Ozon, Taobao или Poizon.
                </p>
                <span className="mt-3 px-3 py-1 bg-white border border-[#e2e8f8] rounded-full text-[11px] font-semibold text-[#bd001a]">
                  Или выберите пример из каталога ниже ↓
                </span>
              </div>

              {/* Sample Images to Try */}
              <div>
                <div className="font-label-sm text-[12px] text-[#575e70] uppercase tracking-wider mb-2 font-bold">
                  Быстрый тест на образцах с фабрик:
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {sampleImages.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStartSearch(s.url)}
                      className="group flex flex-col p-2 bg-[#f0f3ff] hover:bg-[#e7eefe] rounded-xl border border-transparent hover:border-[#bd001a] transition-all text-left cursor-pointer"
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-white mb-2">
                        <img src={s.url} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <span className="font-label-sm text-[11px] text-[#151c27] font-bold line-clamp-1">
                        {s.title}
                      </span>
                      <span className="font-body-sm text-[10px] text-[#575e70] line-clamp-1">
                        {s.factory}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {isSearching && (
                <div className="p-4 bg-[#e7eefe] rounded-xl flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-[#bd001a] border-t-transparent rounded-full animate-spin"></div>
                  <div className="flex-1">
                    <div className="font-label-md text-[13px] text-[#151c27] font-bold">
                      Сканирование базы фабрик 1688 и Шэньчжэня...
                    </div>
                    <div className="font-body-sm text-[11px] text-[#575e70]">
                      Сравнение 32 400 артикулов, поиск первоисточника без наценок
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Search Results Found */
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-[13px] font-semibold">
                <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
                Найдено прямое совпадение фабрики 1-го уровня в Шэньчжэне!
              </div>

              <div className="flex gap-4 p-4 bg-[#f0f3ff] rounded-xl border border-[#e2e8f8]">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-white shrink-0 shadow-sm">
                  <img src={selectedSample || sampleImages[0].url} alt="Найдено" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-[#8e4b00]/10 text-[#8e4b00] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      Gold Supplier 1688
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">Совпадение 98.4%</span>
                  </div>
                  <h4 className="font-headline-sm text-[15px] text-[#151c27] font-bold leading-tight">
                    Беспроводные TWS наушники с ANC Pro 2 (Чипсет Airoha 1562AE)
                  </h4>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-[18px] font-bold text-[#bd001a]">¥79 – ¥129</span>
                    <span className="text-[13px] text-[#575e70]">≈ 1 011 – 1 650 ₽ / шт</span>
                  </div>
                  <div className="text-[11px] text-[#575e70] mt-1">
                    Фабрика: Shenzhen Acoustics Technology Co., Ltd. • 6 лет на 1688
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSearchComplete(false)}
                  className="px-4 py-2 border border-[#c0c6db] hover:bg-[#e2e8f8] text-[#151c27] rounded-lg font-label-md text-[13px] transition-colors"
                >
                  Другое фото
                </button>
                <button
                  type="button"
                  onClick={handleApplyResult}
                  className="px-5 py-2.5 bg-[#bd001a] hover:bg-[#e61e2a] text-white rounded-lg font-label-md text-[13px] font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Перейти к лоту фабрики</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
