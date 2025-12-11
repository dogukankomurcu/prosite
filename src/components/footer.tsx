export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="mx-auto max-w-full px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tight mb-4">ARTSYWALL</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Modern duvar kaplama çözümleri ile iç mekan tasarımınızı dönüştürün.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Ürünler
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  WPC Wall Panel
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Fluted Wall Panel
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Custom Painting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Door Systems
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Kategoriler
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Wood Grain
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Metal Series
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Solid Color
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Stone Grain
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              İletişim
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Sorularınız için bizimle iletişime geçin.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 bg-gray-900 text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-gray-500 focus:outline-none transition-colors"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 hover:bg-gray-800 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} ARTSYWALL. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
