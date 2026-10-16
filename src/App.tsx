/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, Product, CartItem } from './types';
import { INITIAL_CART_ITEMS, RECOMMENDED_ADDONS, CATALOG_PRODUCTS } from './data/mockData';

// Shared Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PhotoSearchModal } from './components/PhotoSearchModal';
import { CurrencyCalculatorModal } from './components/CurrencyCalculatorModal';
import { SupportChatDrawer } from './components/SupportChatDrawer';
import { Inspection360Modal } from './components/Inspection360Modal';
import { OrderSuccessModal } from './components/OrderSuccessModal';

// Screens / Views
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { GroupPoolsView } from './views/GroupPoolsView';
import { LogisticsTrackingView } from './views/LogisticsTrackingView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('glavnaya');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [favorites, setFavorites] = useState<string[]>(['prod-anc-pro2', 'prod-magsafe']);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isPhotoSearchOpen, setIsPhotoSearchOpen] = useState(false);
  const [isCurrencyCalcOpen, setIsCurrencyCalcOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  const [is360InspectionOpen, setIs360InspectionOpen] = useState(false);
  const [orderSuccessModal, setOrderSuccessModal] = useState<{
    isOpen: boolean;
    orderNumber: string;
    totalRub: number;
  }>({
    isOpen: false,
    orderNumber: 'CN-89410',
    totalRub: 29840,
  });

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Navigation handler
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
  };

  // Search handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('katalog');
    }
  };

  // Add Product to Cart from Catalog or Home
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + (qty || 1) }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          factoryName: product.factoryName,
          hub: product.hub || 'Иу (Чжэцзян)',
          image: product.image,
          quantity: qty || product.moq || 1,
          unitCny: product.cnyPrice,
          unitRub: product.rubPrice,
          weightKg: 0.25,
          specs: [product.moqLabel, product.hub],
          options: { photoInspection: true, laserLogo: false },
        };
        return [newItem, ...prev];
      }
    });
  };

  // Add item from PDP (with detailed specs & options)
  const handleAddToCartItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return updated;
      }
      return [item, ...prev];
    });
  };

  // Update item quantity in cart
  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add recommended addon into cart
  const handleAddAddon = (addon: typeof RECOMMENDED_ADDONS[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === addon.id);
      if (existing) {
        return prev.map((item) =>
          item.id === addon.id ? { ...item, quantity: item.quantity + 10 } : item
        );
      }
      const newItem: CartItem = {
        id: addon.id,
        productId: addon.id,
        name: addon.title,
        factoryName: 'Guangzhou Accessories Hub',
        hub: 'Иу (Чжэцзян)',
        image: addon.image,
        quantity: 10,
        unitCny: addon.cny,
        unitRub: addon.rub,
        weightKg: addon.weightKg || 0.05,
        specs: ['Партия: 10 шт.', 'Опт'],
        options: { photoInspection: true, laserLogo: false },
      };
      return [...prev, newItem];
    });
  };

  // Order Placement Success Handler
  const handleOrderSuccess = (orderNumber: string, totalRub: number) => {
    setOrderSuccessModal({
      isOpen: true,
      orderNumber,
      totalRub,
    });
  };

  // View specific product in PDP
  const handleViewProduct = (_productId: string) => {
    setCurrentPage('tovary-s-fabrik');
  };

  // Join pool from Home / Pools
  const handleJoinPool = (_poolId: string) => {
    setCurrentPage('kollektivnye-zakupki');
  };

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#151c27] flex flex-col font-body selection:bg-[#ffdad6] selection:text-[#410004]">
      {/* Universal Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        favoritesCount={favorites.length}
        onOpenPhotoSearch={() => setIsPhotoSearchOpen(true)}
        onOpenCurrencyCalc={() => setIsCurrencyCalcOpen(true)}
        onOpenSupportChat={() => setIsSupportChatOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content Area (padding top for header) */}
      <main className="flex-1 pt-[104px]">
        {currentPage === 'glavnaya' && (
          <HomeView
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onOpenPhotoSearch={() => setIsPhotoSearchOpen(true)}
            onOpenCurrencyCalc={() => setIsCurrencyCalcOpen(true)}
            onOpenSupportChat={() => setIsSupportChatOpen(true)}
            onViewProduct={handleViewProduct}
            onJoinPool={handleJoinPool}
          />
        )}

        {currentPage === 'katalog' && (
          <CatalogView
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onOpenPhotoSearch={() => setIsPhotoSearchOpen(true)}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === 'tovary-s-fabrik' && (
          <ProductDetailView
            onNavigate={handleNavigate}
            onAddToCartItem={handleAddToCartItem}
            onOpen360Modal={() => setIs360InspectionOpen(true)}
            onOpenSupportChat={() => setIsSupportChatOpen(true)}
          />
        )}

        {(currentPage === 'kollektivnye-zakupki' || currentPage === 'dlya-biznesa-b2b') && (
          <GroupPoolsView
            onNavigate={handleNavigate}
            onOpenPhotoSearch={() => setIsPhotoSearchOpen(true)}
            onOpenSupportChat={() => setIsSupportChatOpen(true)}
          />
        )}

        {currentPage === 'korzina' && (
          <CartView
            items={cartItems}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            onAddAddon={handleAddAddon}
            onOpenSupportChat={() => setIsSupportChatOpen(true)}
          />
        )}

        {currentPage === 'oformlenie-zakaza' && (
          <CheckoutView
            onNavigate={handleNavigate}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentPage === 'logistika-i-treking' && (
          <LogisticsTrackingView
            onNavigate={handleNavigate}
            onOpenSupportChat={() => setIsSupportChatOpen(true)}
          />
        )}

        {(currentPage === 'izbrannoe' || currentPage === 'zakazy') && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
            <div className="bg-white rounded-2xl p-8 border border-[#e2e8f8] shadow-sm text-center max-w-2xl mx-auto">
              <span className="material-symbols-outlined text-[48px] text-[#bd001a] mb-2">
                {currentPage === 'izbrannoe' ? 'favorite' : 'local_shipping'}
              </span>
              <h2 className="text-2xl font-bold mb-2">
                {currentPage === 'izbrannoe' ? 'Избранные фабрики и лоты' : 'История заказов и поставок'}
              </h2>
              <p className="text-sm text-[#575e70] mb-6">
                {currentPage === 'izbrannoe'
                  ? `В вашем избранном сохранено ${favorites.length} товаров. Вы можете быстро перейти к оформлению или запросить образец.`
                  : 'Активные партии находятся на этапе транзита в Москву. Проверьте актуальный статус по номеру партии.'}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleNavigate('katalog')}
                  className="px-6 py-2.5 bg-[#bd001a] text-white rounded-xl text-sm font-semibold hover:bg-[#e61e2a] transition-colors cursor-pointer"
                >
                  Перейти в каталог
                </button>
                <button
                  onClick={() => handleNavigate('logistika-i-treking')}
                  className="px-6 py-2.5 bg-[#f0f3ff] text-[#151c27] rounded-xl text-sm font-semibold hover:bg-[#e2e8f8] transition-colors cursor-pointer"
                >
                  Трекинг CN-89410
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSupportChat={() => setIsSupportChatOpen(true)}
        onOpenPhotoSearch={() => setIsPhotoSearchOpen(true)}
        onOpenCurrencyCalc={() => setIsCurrencyCalcOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <PhotoSearchModal
        isOpen={isPhotoSearchOpen}
        onClose={() => setIsPhotoSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <CurrencyCalculatorModal
        isOpen={isCurrencyCalcOpen}
        onClose={() => setIsCurrencyCalcOpen(false)}
      />

      <SupportChatDrawer
        isOpen={isSupportChatOpen}
        onClose={() => setIsSupportChatOpen(false)}
      />

      <Inspection360Modal
        isOpen={is360InspectionOpen}
        onClose={() => setIs360InspectionOpen(false)}
        productTitle="Беспроводные наушники ANC Pro 2 Factory Edition"
      />

      <OrderSuccessModal
        isOpen={orderSuccessModal.isOpen}
        onClose={() => setOrderSuccessModal((prev) => ({ ...prev, isOpen: false }))}
        orderNumber={orderSuccessModal.orderNumber}
        totalRub={orderSuccessModal.totalRub}
        onNavigate={handleNavigate}
      />

      {/* Floating Action Buttons (Quick Chat & Photo Search) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setIsPhotoSearchOpen(true)}
          className="w-12 h-12 bg-white text-[#bd001a] border border-[#ffdad6] shadow-xl hover:shadow-2xl rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer group"
          title="Поиск по фото на 1688"
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            photo_camera
          </span>
        </button>

        <button
          onClick={() => setIsSupportChatOpen(true)}
          className="relative w-14 h-14 bg-gradient-to-r from-[#bd001a] to-[#e61e2a] text-white shadow-xl hover:shadow-2xl rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer group"
          title="Чат с менеджером в Китае (Иу / Гуанчжоу)"
        >
          <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">
            chat
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
        </button>
      </div>
    </div>
  );
}
