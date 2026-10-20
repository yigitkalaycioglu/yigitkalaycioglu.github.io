(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* gizli sekme vb. */ } },
    ss: (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* yok say */ } },
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
    'live': 'Canlı demo', 'code': 'Kaynak kod', 'report': 'Canlı rapor', 'dl': 'İndir', 'apk': 'APK indir', 'apppage': 'Uygulama sayfası', 'page': 'Proje sayfası',
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
    'p6.d': 'Cari, stok, fatura, tahsilat/ödeme, sayım fişleri ve raporlar; bir gereksinim dokümanından uçtan uca geliştirildi. Fatura, stok hareketleri ve cari kaydı tek bir transaction\'da yazılır; bakiyeler hareket kayıtlarından SQL\'de hesaplanır. PBKDF2\'li cookie kimlik doğrulaması ve iki rol.',
    'fs': 'Full-stack', 'p7.t': 'Çok Kiracılı SLA Platformu',
    'p7.d': 'Her şirketin kendi kullanıcıları, ekipleri ve SLA kurallarıyla çalıştığı ama diğer şirketlerin verisini göremediği (PostgreSQL satır düzeyi güvenlik) bir talep takip sistemi. İlk yanıt ve çözüm süreleri, e-posta uyarıları ve anlık güncellemeler; hepsi tek bir Docker Compose komutuyla ayağa kalkar.',
    'tool': 'Araç',
    'p8.d': 'Bilgisayar açıkken gelen Wake-on-LAN paketini yakalayıp bilgisayarı kapatan Windows servisi; böylece telefondaki aynı WoL butonu hem açıp hem kapatabiliyor. Kendini servis olarak kurup yönetebiliyor.',
    'mobile': 'Mobil',
    'p9.d': 'Instagram Reels\'te sponsorlu videoları erişilebilirlik servisiyle otomatik geçen Android uygulaması. Root gerektirmez, internet izni yoktur, veri toplamaz.',
    'p10.d': 'Barkodla raf raf stok sayımı: ürünü okut, rafı söyle, listeyi Excel olarak paylaş. Sayım telefonda yapılır, veriler telefonda kalır.',
    'barcode': 'Barkod',
    'sys': 'Sistem', 'p11.t': 'Linux Dosya Sistemi İzleme Servisi',
    'p12.d': 'Telefon şarja konunca açılan başucu saati ve paneli: saat, widget\'lar, müzik, bildirimler ve navigasyon haritası, istenen yere yerleştirilebilir; AMOLED için tasarlandı.',
    'p11.d': 'Bir klasörü alt klasörleriyle izleyip her oluşturma, değiştirme, silme ve taşıma olayını tek satırlık JSON olarak kaydeden arka plan servisi; systemd ile kurulur.',
    'p12.t': 'Clean Architecture Oluşturucu',
    'p12.d': 'Güvenlik öncelikli bir ASP.NET Core Clean Architecture çözümünü tek tıkla oluşturan Windows uygulaması: Domain, Application, Infrastructure ve Api katmanları, yerleşik Identity + JWT ya da harici OpenID Connect ile giriş, örnek bir özellik ve birim, mimari ve entegrasyon testleri. Her dosya önce önizlenebiliyor; çıktı uyarısız derleniyor ve kendi testlerini geçiyor.',
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
    'hero.now': 'geliştiriyorum', 'scroll': 'Kaydır', 'mani.tag': 'Hakkımda', 'top': 'Başa dön',
    'nav.process': 'Süreç', 'nav.cta': 'İletişime geç',
    'pr.title': 'Nasıl geliştiriyorum', 'pr.sub': 'Gereksinim dokümanından canlı demoya: izlediğim beş adım.',
    'pr.s1.t': 'Gereksinimler', 'pr.s1.k': 'Gereksinim dokümanı', 'pr.s1.k2': 'Kullanım senaryoları',
    'pr.s1.d': 'Her proje net bir gereksinim dokümanıyla başlar: kim kullanacak, neye ihtiyacı var ve hangi kurallar asla bozulmamalı. İster web uygulaması, ister araç, ister model olsun, ilk satır koddan önce kapsamı yazıya dökerim.',
    'pr.s2.t': 'Veri modeli',
    'pr.s2.d': 'Ekranlardan önce veri gelir. Önce ilişkisel modeli tasarlar, migration\'larla (EF Core Code First, SQL betikleri) sürümlerim; böylece uygulamadaki her rakamın hangi kayda dayandığı izlenebilir.',
    'pr.s3.t': 'Mimari ve API',
    'pr.s3.d': 'Clean Architecture ve SOLID ilkelerine göre Domain, Application, Infrastructure ve API katmanları arasında net sınırlar. İlgili değişiklikler tek bir transaction\'da kaydedilir ve her kural tek bir yerde yaşar.',
    'pr.s4.t': 'Arayüz',
    'pr.s4.d': 'React ya da ASP.NET MVC ile hızlı, duyarlı arayüzler; anlamaya ya da karar vermeye gerçekten yardımcı olduğu yerde three.js ile 3D sahneler.',
    'pr.s5.t': 'Yayına alma', 'pr.s5.k': 'Testler',
    'pr.s5.d': 'Testler, temiz bir derleme ve açıp deneyebileceğiniz bir sonuç. Projelerimin çoğu GitHub Pages\'te doğrudan tarayıcıda çalışan canlı demolar; diğerleri indirilebilir sürümler olarak yayınlanıyor.',
    'pr.m1.a': 'Kullanıcılar ve roller', 'pr.m1.b': 'Temel özellikler', 'pr.m1.c': 'İş kuralları', 'pr.m1.d': 'Veri ve raporlar', 'pr.m1.e': 'Test ve teslim',
    'pr.m4.save': 'Kaydet', 'pr.m4.saved': 'Kaydedildi', 'pr.m5.live': 'Yayında',
    'nu.title': 'Rakamlarla', 'nu.sub': 'Yukarıdaki projelerden birkaç rakam.',
    'nu.a': 'günlük güncellenen fiyatlı ürün', 'nu.a2': 'Bilgisayar Toplama',
    'nu.b': 'kalp hastalığı teşhisinde doğruluk', 'nu.c': 'doz ajanı için eğitim epizodu',
    'nu.d': 'tablolu ilişkisel şema', 'nu.d2': 'Mini Ön Muhasebe',
    'nu.e': 'haftada gereksinimden çalışan uygulamaya', 'nu.f': 'uyarıyla derlenen oluşturulmuş çözüm',
    'foot.blurb': 'Web uygulamaları, araçlar ve makine öğrenmesi çalışmaları geliştiren full-stack geliştirici. Sakarya, Türkiye.',
    'foot.nav': 'Gezinti', 'foot.work': 'Öne çıkanlar', 'foot.find': 'Bağlantılar', 'foot.mail': 'E-posta',
    '_copied': 'E-posta adresi kopyalandı', '_title': 'Yiğit Kalaycıoğlu · Full-Stack Geliştirici',
  };
  const EN_EXTRA = { '_copied': 'Email address copied', '_title': document.title };
  const MANI = {
    en: 'From database schemas to *3D scenes* and *AI models* — I build software end to end, with clean architecture and an eye for detail.',
    tr: 'Veritabanı şemalarından *3D sahnelere* ve *yapay zekâ modellerine* — yazılımı uçtan uca, temiz mimariyle ve detaylara özen göstererek geliştiriyorum.',
  };
  const TYPE = {
    en: ['full-stack web apps', '3D experiences', 'ML models', 'Windows tools', 'Android apps'],
    tr: ['full-stack web uygulamaları', '3D deneyimler', 'ML modelleri', 'Windows araçları', 'Android uygulamaları'],
  };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  let sy = scrollY, lastSy = sy, vel = 0, dirty = true, revealDirty = true;
  let revealTick = () => {};
  const langHooks = [];
  const onLang = (fn) => { langHooks.push(fn); fn(root.lang); };
  const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
    langHooks.forEach((fn) => fn(lang));
  }
  applyLang(root.lang === 'tr' ? 'tr' : 'en');
  $('#lang').addEventListener('click', () => {
    const next = root.lang === 'tr' ? 'en' : 'tr';
    applyLang(next);
    store.set('yk-lang', next);
  });

  // ------------------------------------------------------------ tema
  const effectiveDark = () => root.dataset.theme === 'dark' || (root.dataset.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const syncThemeColor = () => { const m = $('meta[name="theme-color"]'); if (m) m.content = effectiveDark() ? '#000000' : '#fbfbfd'; };
  syncThemeColor();
  $('#theme').addEventListener('click', () => {
    const next = effectiveDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('yk-theme', next);
    syncThemeColor();
    readFx();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { syncThemeColor(); readFx(); });

  // ------------------------------------------------------------ e-posta (spam botlarına karşı çalışma anında birleştirilir)
  const mail = $('#mail');
  const address = `${mail.dataset.u}@${mail.dataset.d}`;
  mail.href = `mailto:${address}`;
  $('#mail-text').textContent = address;
  $$('.mail-link').forEach((a) => { a.href = `mailto:${address}`; });
  const toast = $('#toast');
  let toastTimer;
  $('#copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(address); } catch { /* yok say */ }
    toast.textContent = t('_copied');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });

  // ------------------------------------------------------------ hero: harf harf giren isim
  const h1 = $('.hero h1');
  if (h1 && !reduce) {
    const name = h1.textContent.trim();
    let i = 0;
    h1.setAttribute('aria-label', name);
    h1.innerHTML = name.split(' ')
      .map((w) => `<span class="w" aria-hidden="true">${[...w].map((c) => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`)
      .join(' ');
    h1.classList.add('split');
  }

  // ------------------------------------------------------------ açılış ekranı (oturumda bir kez)
  const introCbs = [];
  const whenIntro = (fn) => { if (root.classList.contains('loading')) introCbs.push(fn); else fn(); };
  const loader = $('#loader');
  if (loader && root.classList.contains('loading')) {
    const num = $('#ld-num');
    const t0 = performance.now(), DUR = 1300;
    const tick = (now) => {
      const p = clamp((now - t0) / DUR);
      const e = 1 - Math.pow(1 - p, 3);
      loader.style.setProperty('--lp', e.toFixed(3));
      num.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (p < 1) { requestAnimationFrame(tick); return; }
      setTimeout(() => {
        loader.classList.add('out');
        root.classList.remove('loading');
        store.ss('yk-intro', '1');
        introCbs.splice(0).forEach((fn) => fn());
        setTimeout(() => loader.remove(), 1200);
      }, 180);
    };
    requestAnimationFrame(tick);
  } else if (loader) loader.remove();

  // ------------------------------------------------------------ başlıklar: kelime kelime bulanıklıktan netleşir
  onLang(() => {
    $$('[data-split]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.style.setProperty('--wn', words.length);
      el.innerHTML = words.map((w, i) => `<span class="sw" style="--wi:${i}">${esc(w)}</span>`).join(' ');
    });
  });

  // ------------------------------------------------------------ hero: projeleri sırayla gösteren tarayıcı penceresi
  const shots = $$('.b-screens img');
  const bars = $$('.b-prog i');
  const urlEl = $('#b-url');
  let shot = 0, shotTimer;
  const SHOT_MS = 4500;
  const showShot = (i) => {
    shot = i;
    shots.forEach((im, k) => im.classList.toggle('on', k === i));
    bars.forEach((b, k) => {
      b.classList.toggle('done', k < i);
      b.classList.remove('run');
    });
    if (bars[i]) { void bars[i].offsetWidth; bars[i].style.setProperty('--dur', SHOT_MS + 'ms'); bars[i].classList.add('run'); }
    if (urlEl) {
      urlEl.classList.add('swap');
      setTimeout(() => { urlEl.textContent = shots[i].dataset.url; urlEl.classList.remove('swap'); }, 300);
    }
    clearTimeout(shotTimer);
    shotTimer = setTimeout(() => showShot((shot + 1) % shots.length), SHOT_MS);
  };
  if (shots.length > 1 && !reduce) whenIntro(() => showShot(0));

  // ------------------------------------------------------------ manifesto: kaydırdıkça yanan kelimeler
  const mani = $('#mani');
  let maniWords = [];
  onLang((lang) => {
    if (!mani) return;
    const html = [];
    (MANI[lang] || MANI.en).split(/(\*[^*]+\*)/).forEach((seg) => {
      const acc = seg.startsWith('*');
      seg.replace(/\*/g, '').split(/\s+/).filter(Boolean)
        .forEach((w) => html.push(`<span class="mw${acc ? ' acc' : ''}">${esc(w)}</span>`));
    });
    mani.innerHTML = html.join(' ');
    maniWords = $$('.mw', mani);
    dirty = true;
  });

  // ------------------------------------------------------------ sayaçlar ve karışık harf efekti
  const scramble = (el, final, dur = 900, set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&') => {
    if (reduce) { el.textContent = final; return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = clamp((now - t0) / dur);
      const keep = Math.floor(p * final.length);
      el.textContent = final.slice(0, keep) + [...final.slice(keep)].map((c) => (c === ' ' ? ' ' : set[(Math.random() * set.length) | 0])).join('');
      if (p < 1) requestAnimationFrame(tick); else el.textContent = final;
    };
    requestAnimationFrame(tick);
  };
  const countUp = (el, to, dur = 1700) => {
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = clamp((now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(2, -10 * p)));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = to;
    };
    requestAnimationFrame(tick);
  };
  const facts = $('.facts');
  if (facts) {
    const fo = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      fo.disconnect();
      whenIntro(() => setTimeout(() => {
        $$('b', facts).forEach((b) => {
          if (b.dataset.count) countUp(b, +b.dataset.count);
          else if (b.hasAttribute('data-scramble')) scramble(b, b.textContent, 1400);
        });
      }, 500));
    });
    fo.observe(facts);
  }

  // ------------------------------------------------------------ kayan şerit
  const marquee = $('.marquee');
  const rows = $$('.mq-track').map((tr, i) => {
    tr.innerHTML += tr.innerHTML + tr.innerHTML;
    return { tr, x: 0, dir: i % 2 ? 1 : -1, w: 1 };
  });
  const measureRows = () => rows.forEach((r) => { r.w = r.tr.scrollWidth / 3 || 1; });
  let mqVisible = false;
  if (marquee) new IntersectionObserver(([e]) => { mqVisible = e.isIntersecting; }).observe(marquee);

  // ------------------------------------------------------------ parçacık ağı (arka plan)
  const fx = $('#fx');
  const ctx = fx && fx.getContext('2d');
  let W = 0, H = 0, pts = [], cA = '154,140,255', cB = '58,214,238';
  function readFx() {
    const cs = getComputedStyle(root);
    cA = cs.getPropertyValue('--fx-a').trim() || cA;
    cB = cs.getPropertyValue('--fx-b').trim() || cB;
  }
  function resizeFx() {
    if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nw = innerWidth, nh = innerHeight;
    fx.width = nw * dpr; fx.height = nh * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (nw !== W || !pts.length) {
      const n = Math.round(clamp((nw * nh) / 19000, 22, 80));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * nw, y: Math.random() * nh, z: 0.35 + Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, b: Math.random() < 0.4,
      }));
    }
    W = nw; H = nh;
  }
  const P = new Float32Array(4 * 120);
  function drawFx(move) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const off = sy * 0.18, span = H + 40, n = pts.length;
    for (let i = 0; i < n; i++) {
      const p = pts[i];
      if (move) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      }
      let x = p.x;
      let y = ((((p.y - off * p.z) % span) + span) % span) - 20;
      const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
      if (d2 < 28000) {
        const d = Math.sqrt(d2) || 1, f = (1 - d / 167) * 22 * p.z;
        x += (dx / d) * f; y += (dy / d) * f;
      }
      P[i * 4] = x; P[i * 4 + 1] = y; P[i * 4 + 2] = p.z; P[i * 4 + 3] = p.b ? 1 : 0;
    }
    const MAX = 135, MAX2 = MAX * MAX;
    ctx.lineWidth = 1;
    for (let i = 0; i < n; i++) {
      const xi = P[i * 4], yi = P[i * 4 + 1], zi = P[i * 4 + 2];
      for (let j = i + 1; j < n; j++) {
        const dx = xi - P[j * 4], dy = yi - P[j * 4 + 1], d2 = dx * dx + dy * dy;
        if (d2 > MAX2) continue;
        const a = (1 - Math.sqrt(d2) / MAX) * 0.32 * Math.min(zi, P[j * 4 + 2]);
        ctx.strokeStyle = `rgba(${cA},${a.toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(xi, yi); ctx.lineTo(P[j * 4], P[j * 4 + 1]); ctx.stroke();
      }
      const ddx = xi - mx, ddy = yi - my, md = ddx * ddx + ddy * ddy;
      if (md < 48400) {
        ctx.strokeStyle = `rgba(${cB},${((1 - Math.sqrt(md) / 220) * 0.55).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(xi, yi); ctx.lineTo(mx, my); ctx.stroke();
      }
    }
    for (let i = 0; i < n; i++) {
      const z = P[i * 4 + 2];
      ctx.fillStyle = `rgba(${P[i * 4 + 3] ? cB : cA},${(0.35 + z * 0.55).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(P[i * 4], P[i * 4 + 1], 0.6 + z * 1.4, 0, 6.2832); ctx.fill();
    }
  }

  // ------------------------------------------------------------ fare: ışık, kart eğimi, kenar parlaması, mıknatıs
  let mx = -9999, my = -9999;
  const glow = $('.glow-cursor');
  const GLOW = '.card, .feat, .what, .skill, .edu, .certs li';
  let lastEl = null;
  const untilt = (el) => { el.style.setProperty('--tx', '0deg'); el.style.setProperty('--ty', '0deg'); el.classList.remove('tilting'); };
  if (fine && !reduce) {
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (glow) glow.classList.add('on');
      const el = e.target.closest && e.target.closest(GLOW);
      if (lastEl && lastEl !== el && lastEl.matches('.grid .card')) untilt(lastEl);
      lastEl = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      el.style.setProperty('--mx', px + 'px');
      el.style.setProperty('--my', py + 'px');
      if (el.matches('.grid .card')) {
        el.classList.add('tilting');
        el.style.setProperty('--tx', ((py / r.height - 0.5) * -7).toFixed(2) + 'deg');
        el.style.setProperty('--ty', ((px / r.width - 0.5) * 9).toFixed(2) + 'deg');
      }
    }, { passive: true });
    document.addEventListener('pointerleave', () => {
      mx = my = -9999;
      if (glow) glow.classList.remove('on');
      if (lastEl && lastEl.matches('.grid .card')) untilt(lastEl);
      lastEl = null;
    });
    $$('.hero .cta .btn, .contact .cta .btn, .nav-cta').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  // ------------------------------------------------------------ menü: etkin bağlantı göstergesi
  const nav = $('.nav');
  const links = $$('.links a');
  const ind = $('.links .ind');
  const moveInd = () => {
    if (!ind) return;
    const a = $('.links a.active');
    if (!a) { ind.classList.remove('on'); return; }
    ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = `translateX(${a.offsetLeft}px)`;
    ind.classList.add('on');
  };
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      moveInd();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
  onLang(() => requestAnimationFrame(moveInd));

  // ------------------------------------------------------------ kaydırmaya bağlı efektler
  const bar = $('.progress');
  const hero = $('.hero');
  const heroArt = $('.hero-art');
  const tl = $('.timeline');
  const tlItems = $$('.timeline > li');
  const feats = $$('.feat');
  const stackMq = matchMedia('(min-width: 961px) and (min-height: 720px)');

  // süreç: hangi adım okunuyorsa sağdaki sekme o; öncekiler üstte kapanıp sıralanır
  const steps = $$('.step');
  const panels = $$('.panel');
  const stage = $('.stage');
  const narrowMq = matchMedia('(max-width: 960px)');
  let activeStep = -2;
  function processFx(vh) {
    if (!steps.length || !stage) return;
    const narrow = narrowMq.matches;
    let a = -1;
    steps.forEach((st, i) => {
      const r = st.getBoundingClientRect();
      if ((narrow ? r.top : r.top + r.height / 2) < vh * (narrow ? 0.72 : 0.66)) a = i;
    });
    if (a === activeStep) return;
    const back = a < activeStep && activeStep > -2;
    activeStep = a;
    const cur = Math.max(a, 0);
    stage.classList.toggle('play', a >= 0);
    steps.forEach((st, i) => st.classList.toggle('on', i === cur));
    panels.forEach((pn, i) => {
      pn.classList.toggle('done', i < cur);
      pn.classList.toggle('active', i === cur);
      pn.style.setProperty('--k', cur - i);
      // geri dönülen panel tamamlanmış hâliyle açılır; sahnesi baştan ileri oynamaz
      pn.classList.toggle('settled', back && i === cur);
    });
  }

  function scrollFx() {
    const vh = innerHeight;
    processFx(vh);
    const max = root.scrollHeight - vh;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? (sy / max).toFixed(4) : 0})`;
    nav.classList.toggle('scrolled', sy > 8);
    if (hero && !reduce) hero.style.setProperty('--hp', clamp(sy / (hero.offsetHeight * 0.9)).toFixed(3));

    if (tl) {
      const r = tl.getBoundingClientRect();
      tl.style.setProperty('--tl', clamp((vh * 0.6 - r.top) / r.height).toFixed(3));
      tlItems.forEach((li) => li.classList.toggle('lit', li.getBoundingClientRect().top < vh * 0.6));
    }

    if (mani && maniWords.length) {
      const r = mani.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3));
      const n = Math.round(p * maniWords.length);
      maniWords.forEach((w, i) => w.classList.toggle('on', i < n));
    }

    // öne çıkan kartlar: üstüne binen kart kadar küçülüp kararır
    const stackOn = stackMq.matches && !reduce;
    const tops = feats.map((f) => f.getBoundingClientRect().top);
    feats.forEach((f, i) => {
      let s = 0;
      if (stackOn) {
        for (let j = i + 1; j < feats.length; j++) {
          const stick = 92 + j * 20;
          s += clamp((vh - tops[j]) / (vh - stick));
        }
      }
      f.style.setProperty('--stack', s.toFixed(3));
    });
  }

  let rx = 0, ry = 0, gx = innerWidth / 2, gy = innerHeight / 3, running = true;
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, anchors: { offset: -72 }, autoRaf: false });
    if (root.classList.contains('loading')) { lenis.stop(); whenIntro(() => lenis.start()); }
  }
  function frame(t) {
    if (lenis) lenis.raf(t);
    sy = scrollY;
    vel += (sy - lastSy - vel) * 0.18;
    lastSy = sy;
    if (dirty) { scrollFx(); dirty = false; }
    revealTick();

    if (!reduce) {
      drawFx(true);
      if (glow && mx > -999) {
        gx += (mx - gx) * 0.1; gy += (my - gy) * 0.1;
        glow.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
      }
      if (heroArt && sy < innerHeight * 1.2) {
        const tx = mx > -999 ? (my / innerHeight - 0.5) * -10 : 0;
        const ty = mx > -999 ? (mx / innerWidth - 0.5) * 14 : 0;
        rx += (tx - rx) * 0.06; ry += (ty - ry) * 0.06;
        heroArt.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        heroArt.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      }
      if (mqVisible) {
        const speed = 0.7 + clamp(vel, -60, 60) * 0.35;
        rows.forEach((r) => {
          r.x = (((r.x + r.dir * speed) % r.w) - r.w) % r.w;
          r.tr.style.transform = `translate3d(${r.x.toFixed(1)}px, 0, 0)`;
        });
        marquee.style.setProperty('--skew', clamp(vel * -0.08, -4, 4).toFixed(2) + 'deg');
      }
    }
    if (running) requestAnimationFrame(frame);
  }

  addEventListener('scroll', () => { dirty = true; revealDirty = true; }, { passive: true });
  addEventListener('resize', () => { resizeFx(); measureRows(); moveInd(); dirty = true; if (reduce) drawFx(false); });
  document.addEventListener('visibilitychange', () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) requestAnimationFrame(frame);
  });
  readFx();
  resizeFx();
  measureRows();
  if (document.fonts) document.fonts.ready.then(() => { measureRows(); moveInd(); });
  if (reduce) drawFx(false);
  requestAnimationFrame(frame);

  // ------------------------------------------------------------ kaydırınca belirme
  $$('.reveal').forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    if (sib.length > 1) el.style.setProperty('--d', (sib.indexOf(el) % 3) * 110 + 'ms');
  });

  // her öğe farklı bir yerden gelir: soldan/sağdan dönerek, yukarıdan düşerek, derinden, iris açılarak...
  if (!reduce) {
    const rnd = (a, b) => a + Math.random() * (b - a);
    const fx = (els, list) => els.forEach((el, i) => { el.dataset.fx = list[i % list.length]; });
    fx(feats, ['left', 'right']);
    const grid = $('.grid');
    const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 1;
    fx($$('.grid > .card'), cols >= 3
      ? ['left', 'iris', 'right', 'flip', 'zoom', 'flip', 'scatter', 'drop', 'scatter']
      : cols === 2 ? ['left', 'right', 'iris', 'flip', 'zoom', 'drop', 'scatter', 'scatter', 'iris']
        : ['left', 'right', 'iris', 'flip', 'zoom', 'scatter']);
    $$('.grid > .card[data-fx="iris"]').forEach((el, i) => {
      el.style.setProperty('--ox', i % 2 ? '100%' : '0%');
      el.style.setProperty('--oy', i % 2 ? '100%' : '0%');
    });
    fx(tlItems, ['right']);
    fx($$('.skills > .skill'), ['scatter']);
    fx($$('.two > .reveal'), ['left', 'fade']);
    $$('.certs > li').forEach((li, i) => {
      li.classList.add('reveal');
      li.dataset.fx = 'right';
      li.style.setProperty('--d', 200 + i * 120 + 'ms');
    });
    fx($$('.contact-card'), ['rise']);
    // dağınık gelen kartlar: her biri rastgele açı ve konumdan yerine oturur
    $$('[data-fx="scatter"]').forEach((el, i) => {
      const side = i % 2 ? 1 : -1;
      el.style.setProperty('--sx', (side * rnd(60, 180)).toFixed(0) + 'px');
      el.style.setProperty('--sy', rnd(80, 200).toFixed(0) + 'px');
      el.style.setProperty('--r', (side * rnd(8, 18)).toFixed(1) + 'deg');
    });
    $$('.skills > .skill').forEach((el, i) => el.style.setProperty('--d', i * 90 + 'ms'));
  }

  // ilerleme (--p) kaydırma konumundan hesaplanır: aşağı inerken oynar, yukarı çıkarken geri sarar.
  // Konumlar dönüşümsüz yerleşimden (offsetTop) ölçülür, yoksa kendi hareketi ölçümü bozardı.
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const backOut = (x) => 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2);
  const revs = $$('.reveal').map((el) => ({
    el, top: 0, h: 0, cur: 0, set: -1, shown: false,
    lag: (parseFloat(el.style.getPropertyValue('--d')) || 0) / 1000,
    ease: /drop|scatter/.test(el.dataset.fx || '') ? backOut : easeOut,
    nums: $$('.sec-num', el),
    cnt: $$('[data-num]', el),
  }));
  const fmtNum = (b, k) => {
    const dec = +(b.dataset.dec || 0);
    let out = (+b.dataset.num * k).toLocaleString(root.lang === 'tr' ? 'tr-TR' : 'en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (b.hasAttribute('data-plus')) out += '+';
    if (b.hasAttribute('data-pct')) out = root.lang === 'tr' ? '%' + out : out + '%';
    return out;
  };
  const featured = $('.featured');
  const absTop = (el) => { let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };
  function measureReveals() {
    // yapışkan kartların offsetTop'u yapıştığı yeri verir; akıştaki yerlerini sırayla topla
    const gap = featured ? parseFloat(getComputedStyle(featured).rowGap) || 0 : 0;
    let ft = featured ? absTop(featured) : 0;
    revs.forEach((r) => {
      if (r.el.classList.contains('feat')) { r.top = ft; ft += r.el.offsetHeight + gap; }
      else r.top = absTop(r.el);
      r.h = r.el.offsetHeight;
    });
    revealDirty = true;
  }
  revealTick = () => {
    // açılış ekranı kalkana kadar bekle (hero onunla birlikte gelsin)
    if (!revealDirty || root.classList.contains('loading')) return;
    const vh = innerHeight;
    const atEnd = sy >= root.scrollHeight - vh - 2;
    let moving = false;
    for (const r of revs) {
      const top = r.top - sy;
      // üst kenarı ekranın %96'sına girince başlar, %54'üne gelince tamamlanır
      let target = clamp((vh * 0.96 - top) / (vh * 0.42) - r.lag);
      if (atEnd && top < vh) target = 1;
      const far = top > vh * 1.6 || top + r.h < -vh * 0.6;
      r.cur = far ? target : r.cur + (target - r.cur) * 0.12;
      if (Math.abs(target - r.cur) < 0.002) r.cur = target; else moving = true;
      const p = r.cur >= 1 ? 1 : r.cur <= 0 ? 0 : r.ease(r.cur);
      if (Math.abs(p - r.set) > 0.0008) {
        r.set = p;
        r.el.style.setProperty('--p', p.toFixed(4));
        r.el.classList.toggle('in', p >= 1);
        r.cnt.forEach((b) => { b.textContent = fmtNum(b, easeOut(clamp(p / 0.7))); });
      }
      if (p > 0.15 && !r.shown) {
        r.shown = true;
        r.nums.forEach((n) => scramble(n, n.dataset.n || (n.dataset.n = n.textContent), 700, '0123456789'));
      } else if (p < 0.02) r.shown = false;
    }
    revealDirty = moving;
  };
  if (reduce) {
    revs.forEach((r) => { r.el.style.setProperty('--p', '1'); r.el.classList.add('in'); });
    onLang(() => revs.forEach((r) => r.cnt.forEach((b) => { b.textContent = fmtNum(b, 1); })));
    revealTick = () => {};
  } else {
    measureReveals();
    onLang(() => { revs.forEach((r) => { r.set = -1; }); revealDirty = true; });
    new ResizeObserver(measureReveals).observe(document.body);
    addEventListener('resize', measureReveals);
  }
})();
