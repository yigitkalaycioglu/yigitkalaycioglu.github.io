(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* gizli sekme vb. */ } },
  };

  // ------------------------------------------------------------ çeviriler (HTML'deki metin İngilizce)
  const TR = {
    'skip': 'Projelere geç',
    'nav.projects': 'Projeler', 'nav.experience': 'Deneyim', 'nav.skills': 'Yetenekler', 'nav.contact': 'İletişim',
    'theme': 'Temayı değiştir',
    'hero.role': 'Bilişim Sistemleri Mühendisi · Full-Stack Geliştirici',
    'hero.lead': 'React, Node.js ve ASP.NET Core ile uçtan uca web uygulamaları geliştiriyorum; karmaşık sistemlerde hata ayıklamayı ve problem çözmeyi seviyorum. İki kurumsal stajda Clean Architecture ve SOLID ilkelerini uygulamada öğrendim; son dönemde web\'i 3D ve yapay zekâyla buluşturan projeler geliştiriyorum.',
    'hero.cta': 'Projelerime göz at',
    'hero.f1': 'canlı demo', 'hero.f2': 'proje', 'hero.f3': 'staj', 'hero.f4': 'Türkiye',
    'proj.title': 'Projeler',
    'proj.sub': 'Canlı demolar doğrudan tarayıcıda çalışır; tüm projelerin kaynak kodu GitHub\'da.',
    'live': 'Canlı demo', 'code': 'Kaynak kod', 'report': 'Canlı rapor', 'dl': 'İndir', 'apk': 'APK indir', 'apppage': 'Uygulama sayfası',
    'p1.alt': '3D bilgisayar toplama sitesinden ekran görüntüsü', 'p1.k': 'Web · 3D · Veri', 'p1.t': '3D Önizlemeli Bilgisayar Toplama',
    'p1.d': 'Yalnızca birbiriyle uyumlu parçaları sunan bilgisayar toplama sitesi: soket, bellek türü, form faktörü, GPU uzunluğu, soğutucu yüksekliği ve PSU gücü iki yönlü kontrol edilir; seçilen sistem etkileşimli bir 3D sahnede birleştirilir. epey.com\'dan her gün güncellenen fiyatlarla yaklaşık 6.700 ürün.',
    'p2.alt': '3B depo görünümü', 'p2.k': 'Karar destek · Optimizasyon', 'p2.t': 'Sipariş Yerleştirme Optimizasyonu',
    'p2.d': 'Oluklu mukavva deposunda gelen siparişler için en uygun rafı önerir. Raflar adet yerine santimetre bazlı boş alan matrisiyle yönetilir; manuel müdahale ve 3B depo görünümü vardır. Streamlit uygulaması Pyodide sayesinde tamamen tarayıcıda çalışır; kurulum ya da sunucu gerekmez.',
    'p3.alt': 'AlPaSa ana sayfası', 'p3.k': 'Web uygulaması · Pazar yeri',
    'p3.d': 'İkinci el pazar yeri: arama ve filtreli ilanlar, favoriler, takip ve satıcıyla mesajlaşma; kategori, kullanıcı ve işlem günlüğü için rol tabanlı yönetim paneli. Tüm verileri tarayıcıda tutan tek sayfa uygulama; giriş ekranında demo hesapları var.',
    'p4.alt': 'Kalp hastalığı çalışmasının rapor sayfası', 'ml': 'Makine öğrenmesi', 'p4.t': 'Özgün ML Modelleriyle Kalp Hastalığı Teşhisi',
    'p4.d': 'Cleveland veri setinde beş standart sınıflandırıcı, tıbbi veriye uyarlanmış özgün versiyonlarıyla karşılaştırıldı. En iyisi log-karesel mesafeli KNN: %93,4 doğruluk, %96,4 duyarlılık.',
    'p5.alt': 'Pekiştirmeli öğrenme çalışmasının rapor sayfası', 'rl': 'Pekiştirmeli öğrenme', 'p5.t': 'Pekiştirmeli Öğrenmeyle İnsülin Dozu Ayarı',
    'p5.d': 'Veriden kurulan bir simülasyonda dozu azaltma, koruma ya da artırma kararı veren REINFORCE ajanı. 10.000 epizot eğitildi; test hastasını 105–114 mg/dL aralığında tutuyor.',
    'p6.k': 'Staj projesi · ESBİ', 'p6.t': 'Mini Ön Muhasebe',
    'p6.d': 'Cari, stok, fatura, tahsilat/ödeme ve raporlama; 4 haftada uçtan uca geliştirildi. Fatura satırları, stok hareketleri ve cari kayıtları tek bir veritabanı işleminde yazılır; bakiyeler hareket kayıtlarından türetilir, iptaller ters kayıtla yapılır. Repository ve Unit of Work, Identity ile rol tabanlı yetkilendirme.',
    'fs': 'Full-stack', 'p7.t': 'Çok Kiracılı SLA Platformu',
    'p7.d': 'Her şirketin kendi kullanıcıları, ekipleri ve SLA kurallarıyla çalıştığı ama diğer şirketlerin verisini göremediği (PostgreSQL satır düzeyi güvenlik) bir talep takip sistemi. İlk yanıt ve çözüm süreleri, e-posta uyarıları ve anlık güncellemeler; hepsi tek bir Docker Compose komutuyla ayağa kalkar.',
    'tool': 'Araç',
    'p8.d': 'Bilgisayar açıkken gelen Wake-on-LAN paketini yakalayıp bilgisayarı kapatan Windows servisi; böylece telefondaki aynı WoL butonu hem açıp hem kapatabiliyor. Kendini servis olarak kurup yönetebiliyor.',
    'mobile': 'Mobil',
    'p9.d': 'Instagram Reels\'te sponsorlu videoları erişilebilirlik servisiyle otomatik geçen Android uygulaması. Root gerektirmez, internet izni yoktur, veri toplamaz.',
    'p10.d': 'Barkodla raf raf stok sayımı: ürünü okut, rafı söyle, listeyi Excel olarak paylaş. Sayım telefonda yapılır, veriler telefonda kalır.',
    'barcode': 'Barkod',
    'sys': 'Sistem', 'p11.t': 'Linux Dosya Sistemi İzleme Servisi',
    'p11.d': 'Bir klasörü alt klasörleriyle izleyip her oluşturma, değiştirme, silme ve taşıma olayını tek satırlık JSON olarak kaydeden arka plan servisi; systemd ile kurulur.',
    'exp.title': 'Deneyim', 'intern': 'Yazılım Stajyeri',
    'e1.when': 'Eyl 2026 – Eki 2026',
    'e1.a': 'Bir gereksinim dokümanından yola çıkarak cari hesaplar, stok, faturalama, ödemeler ve raporlamayı kapsayan web tabanlı bir ön muhasebe uygulamasını 4 haftada uçtan uca geliştirdim.',
    'e1.b': '11 tablolu ilişkisel veritabanı şemasını tasarlayıp EF Core Code First migration\'larıyla yönettim.',
    'e2.when': 'Haz 2025 – Ağu 2025', 'e2.pos': 'Yazılım Stajyeri — .NET Ekibi',
    'e2.a': 'Kurum içi uygulamaların Clean Architecture ilkelerine göre modül bazlı yeniden yapılandırılmasına katkı verdim.',
    'e2.b': 'Entity Framework Core üzerine kurulu veritabanı sorgularının optimizasyonunda yer aldım.',
    'sk.title': 'Yetenekler', 'sk.web': 'Diller ve Web', 'sk.db': 'Veritabanları ve Araçlar', 'sk.ds': 'Veri Bilimi', 'sk.other': 'Projelerimde ayrıca',
    'ed.title': 'Eğitim', 'ed.school': 'Sakarya Üniversitesi', 'ed.dept': 'Bilişim Sistemleri Mühendisliği', 'ed.grad': 'Mezuniyet: Haziran 2026',
    'ce.title': 'Sertifikalar',
    'c1': 'Full-Stack Web Geliştirme (HTML, CSS, JS, Node, React, PostgreSQL)', 'c2': 'Odoo Öğrenci Diploması',
    'c3': 'C# ve .NET Programlama', 'c4': 'Yapay Zekâ Profesyonel Gelişim Programı (40 saat)', 'cview': 'Sertifikayı gör',
    'ct.title': 'İletişim', 'ct.sub': 'İş fırsatları, projeler ya da sadece merhaba demek için en hızlı yol e-posta.', 'ct.copy': 'Adresi kopyala',
    'foot': 'Elle tasarlandı, GitHub Pages\'te yayınlanıyor.',
    '_copied': 'E-posta adresi kopyalandı', '_title': 'Yiğit Kalaycıoğlu · Full-Stack Geliştirici',
  };
  const EN_EXTRA = { '_copied': 'Email address copied', '_title': document.title };

  // İngilizce asıllarını sakla ki dil geri değiştirilebilsin
  const textEls = $$('[data-i18n]');
  textEls.forEach((el) => { el.dataset.en = el.textContent; });
  const attrEls = $$('[data-i18n-attr]');
  attrEls.forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr] = pair.split(':');
      el.dataset['en_' + attr.replace(/-/g, '_')] = el.getAttribute(attr) || '';
    });
  });

  const t = (key) => (root.lang === 'tr' ? TR[key] : EN_EXTRA[key]);
  function applyLang(lang) {
    root.lang = lang;
    textEls.forEach((el) => {
      const v = lang === 'tr' ? TR[el.dataset.i18n] : el.dataset.en;
      if (v != null) el.textContent = v;
    });
    attrEls.forEach((el) => {
      el.dataset.i18nAttr.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':');
        const v = lang === 'tr' ? TR[key] : el.dataset['en_' + attr.replace(/-/g, '_')];
        if (v != null) el.setAttribute(attr, v);
      });
    });
    document.title = t('_title');
  }
  applyLang(root.lang === 'tr' ? 'tr' : 'en');
  $('#lang').addEventListener('click', () => {
    const next = root.lang === 'tr' ? 'en' : 'tr';
    applyLang(next);
    store.set('yk-lang', next);
  });

  // ------------------------------------------------------------ tema
  const effectiveDark = () => root.dataset.theme === 'dark' || (root.dataset.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const syncThemeColor = () => { const m = $('meta[name="theme-color"]'); if (m) m.content = effectiveDark() ? '#0a0b0f' : '#f6f6f3'; };
  syncThemeColor();
  $('#theme').addEventListener('click', () => {
    const next = effectiveDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('yk-theme', next);
    syncThemeColor();
  });

  // ------------------------------------------------------------ e-posta (spam botlarına karşı çalışma anında birleştirilir)
  const mail = $('#mail');
  const address = `${mail.dataset.u}@${mail.dataset.d}`;
  mail.href = `mailto:${address}`;
  $('#mail-text').textContent = address;
  const toast = $('#toast');
  let toastTimer;
  $('#copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(address); } catch { /* yok say */ }
    toast.textContent = t('_copied');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });

  // ------------------------------------------------------------ menü gölgesi ve etkin bağlantı
  const nav = $('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const links = $$('.links a');
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  // ------------------------------------------------------------ kaydırınca belirme
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  $$('.reveal').forEach((el) => reveal.observe(el));
})();
