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
    'nav.projects': 'Projeler', 'nav.experience': 'Deneyim', 'nav.contact': 'İletişim',
    'theme': 'Temayı değiştir',
    'hero.role': 'Bilişim Sistemleri Mühendisi · Full-Stack Geliştirici',
    'hero.lead': 'React, Node.js ve ASP.NET Core ile uçtan uca web uygulamaları geliştiriyorum; karmaşık sistemlerde hata ayıklamayı ve problem çözmeyi seviyorum. İki kurumsal stajda Clean Architecture ve SOLID ilkelerini uygulamada öğrendim; son dönemde web\'i 3D ve yapay zekâyla buluşturan projeler geliştiriyorum.',
    'hero.cta': 'Projelerime göz at',
    'hero.f2': 'proje', 
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
    'p13.d': 'Telefon şarja konunca açılan başucu saati ve paneli: saat, widget\'lar, müzik, bildirimler ve navigasyon haritası, istenen yere yerleştirilebilir; AMOLED için tasarlandı.',
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
    'ct.title': 'İletişim', 'ct.copy': 'Adresi kopyala',
    'foot': 'Elle tasarlandı, GitHub Pages\'te yayınlanıyor.',
    'mani.tag': 'Hakkımda', 'top': 'Başa dön',
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
    
    
    
    
    'proj.more': 'Diğer projeler', 'hero.range': 'Web · 3D · ML · Android · sistem servisleri',
    'p7.alt': 'Çok Kiracılı SLA Platformu mimari şeması', 'p8.alt': 'Wake-on-LAN sihirli paket şeması', 'p9.alt': 'Sponsorlu bir reel\'in geçildiğini gösteren çizim', 'p11.alt': 'JSON olay kaydını gösteren terminal', 'st.sp': 'Google Play için hazırlanıyor', 'st.sb': 'Google Play\'de iç test aşamasında',
    'p6.alt': 'Mini Ön Muhasebe panel ekranı', 'p12.alt': 'Clean Architecture Oluşturucu penceresi', 'p13.alt': 'StandBy+ saat ekranı',
    '_copied': 'E-posta adresi kopyalandı', '_title': 'Yiğit Kalaycıoğlu · Full-Stack Geliştirici',
  };
  const EN_EXTRA = { '_copied': 'Email address copied', '_title': document.title };
  const MANI = {
    en: 'From database schemas to *3D scenes* and *AI models* — I build software end to end, with clean architecture and an eye for detail.',
    tr: 'Veritabanı şemalarından *3D sahnelere* ve *yapay zekâ modellerine* — yazılımı uçtan uca, temiz mimariyle ve detaylara özen göstererek geliştiriyorum.',
  };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  let sy = scrollY, dirty = true, revealDirty = true;
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

  // ------------------------------------------------------------ dil geçişi
  // Görünen yazılar hafifçe solup yükselerek çekilir, yeni dil aşağıdan yerine oturur;
  // dalga ekranın üstünden altına ilerler. Ekran dışındakiler anında değişir.
  let langBusy = false;
  function switchLang(next, els) {
    if (reduce || !Element.prototype.animate) { applyLang(next); return; }
    langBusy = true;
    const vh = innerHeight;
    const seen = els.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < vh;
    }).map((el) => ({ el, d: clamp(el.getBoundingClientRect().top / vh) * 160 }));
    const outs = seen.map(({ el, d }) => el.animate(
      [{ opacity: 0, translate: '0 -0.25em' }],
      { duration: 240, delay: d, easing: 'cubic-bezier(.55, 0, .75, .2)', fill: 'forwards' }));
    Promise.all(outs.map((a) => a.finished.catch(() => {}))).then(() => {
      applyLang(next);
      seen.forEach(({ el, d }, i) => {
        outs[i].cancel();
        const parts = el.matches('[data-split]') ? $$('.sw', el) : el.id === 'mani' ? $$('.mw', el) : [el];
        parts.forEach((part, j) => part.animate(
          [{ opacity: 0, translate: '0 0.35em', offset: 0 }],
          { duration: 700, delay: d * 0.6 + Math.min(j, 14) * 34, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' }));
      });
      setTimeout(() => { langBusy = false; }, 420);
    });
  }
  $('#lang').addEventListener('click', () => {
    if (langBusy) return;   // geçiş bitmeden gelen tıklamalar yok sayılır
    const next = root.lang === 'tr' ? 'en' : 'tr';
    switchLang(next, [...textEls, $('#mani')].filter(Boolean));
    store.set('yk-lang', next);
  });

  // ------------------------------------------------------------ tema: yalnızca odaların rengi değişir
  const effectiveDark = () => root.dataset.theme === 'dark' || (root.dataset.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('#theme').addEventListener('click', () => {
    const next = effectiveDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('yk-theme', next);
  });

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

  // ------------------------------------------------------------ hero: her satır bir kelime, harfler sırayla yükselir
  const h1 = $('.hero h1');
  if (h1) {
    const name = h1.textContent.trim();
    let i = 0;
    h1.setAttribute('aria-label', name);
    h1.innerHTML = name.split(' ')
      .map((w) => `<span class="ln" aria-hidden="true">${[...w].map((c) => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`)
      .join('');
    h1.classList.add('split');
  }

  // ------------------------------------------------------------ başlıklar: kelime kelime yerine oturur
  onLang(() => {
    $$('[data-split]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, k) => `<span class="sw" style="--wi:${k}">${esc(w)}</span>`).join(' ');
    });
  });

  // ------------------------------------------------------------ küratör metni: kaydırdıkça kelime kelime aydınlanır
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

  // ------------------------------------------------------------ kobalt duvar: imlecin altında pigment hafifçe derinleşir
  if (fine && !reduce) {
    let napEl = null;
    addEventListener('pointermove', (e) => {
      const w = e.target.closest && e.target.closest('.wall');
      if (napEl && napEl !== w) napEl.classList.remove('nap');
      napEl = w;
      if (!w) return;
      const r = w.getBoundingClientRect();
      w.style.setProperty('--nx', (e.clientX - r.left).toFixed(0) + 'px');
      w.style.setProperty('--ny', (e.clientY - r.top).toFixed(0) + 'px');
      w.classList.add('nap');
    }, { passive: true });
    document.addEventListener('pointerleave', () => { if (napEl) napEl.classList.remove('nap'); napEl = null; });
  }

  // ------------------------------------------------------------ menü: altındaki zeminin rengi, etkin bağlantı
  const nav = $('.nav');
  const links = $$('.links a');
  const ind = $('.links .ind');
  const tones = $$('main > section, .foot');
  const moveInd = () => {
    if (!ind) return;
    const a = $('.links a.active');
    if (!a) { ind.classList.remove('on'); return; }
    ind.style.width = (a.offsetWidth - 26) + 'px';
    ind.style.transform = `translateX(${a.offsetLeft + 13}px)`;
    ind.classList.add('on');
    // mobilde bağlantılar yana kayar: etkin olanı görünür tut
    const box = ind.parentElement;
    if (box.scrollWidth > box.clientWidth) box.scrollTo({ left: a.offsetLeft - (box.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
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
  function navTone() {
    const y = nav.offsetHeight - 1;   // menünün hemen altındaki zemin
    const under = tones.find((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    nav.dataset.tone = under && under.classList.contains('room') ? 'room' : 'wall';
    nav.classList.toggle('scrolled', sy > 8);
    nav.toggleAttribute('data-top', sy < innerHeight * 0.6);
  }

  // ------------------------------------------------------------ süreç: masaüstünde yatay koridor
  // Bölüm sabitlenir, beş oda kaydırdıkça yana akar; dar ekranda ve hareket azaltmada alt alta.
  const corridor = $('.corridor');
  const track = $('.track');
  const pinMq = matchMedia('(min-width: 961px)');
  let pinLen = 0;
  function measureCorridor() {
    if (!corridor) return;
    const on = pinMq.matches && !reduce;
    corridor.classList.toggle('pin', on);
    if (!on) { corridor.style.removeProperty('--ch'); track.style.transform = ''; pinLen = 0; return; }
    pinLen = Math.max(0, track.scrollWidth - innerWidth);
    corridor.style.setProperty('--ch', (innerHeight + pinLen) + 'px');
  }
  function corridorFx() {
    if (!pinLen) return;
    const top = corridor.getBoundingClientRect().top;
    track.style.transform = `translate3d(${(-clamp(-top / pinLen) * pinLen).toFixed(1)}px, 0, 0)`;
  }

  function scrollFx() {
    const vh = innerHeight;
    navTone();
    corridorFx();
    if (mani && maniWords.length) {
      const r = mani.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh * 0.82 - r.top) / (r.height + vh * 0.25));
      const n = Math.round(p * maniWords.length);
      maniWords.forEach((w, k) => w.classList.toggle('on', k < n));
    }
  }

  // ------------------------------------------------------------ kaydırınca belirme (geri sarar)
  $$('.reveal').forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    if (sib.length > 1 && !el.closest('.hang')) el.style.setProperty('--d', (sib.indexOf(el) % 3) * 100 + 'ms');
  });
  // salon diziminde aynı sıradaki eserler biraz aralıkla gelir
  $$('.hang > .work').forEach((el, k) => el.style.setProperty('--d', (k % 3) * 90 + 'ms'));
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const revs = $$('.reveal').map((el) => ({
    el, top: 0, h: 0, cur: 0, set: -1,
    lag: (parseFloat(el.style.getPropertyValue('--d')) || 0) / 1000,
  }));
  const absTop = (el) => { let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };
  function measureReveals() {
    revs.forEach((r) => { r.top = absTop(r.el); r.h = r.el.offsetHeight; });
    revealDirty = true;
  }
  revealTick = () => {
    if (!revealDirty) return;
    const vh = innerHeight;
    const atEnd = sy >= root.scrollHeight - vh - 2;
    let moving = false;
    for (const r of revs) {
      const top = r.top - sy;
      // üst kenarı ekranın %94'üne girince başlar, %50'sine gelince tamamlanır
      let target = clamp((vh * 0.94 - top) / (vh * 0.44) - r.lag);
      if (atEnd && top < vh) target = 1;
      const far = top > vh * 1.6 || top + r.h < -vh * 0.6;
      r.cur = far ? target : r.cur + (target - r.cur) * 0.1;
      if (Math.abs(target - r.cur) < 0.002) r.cur = target; else moving = true;
      const p = r.cur >= 1 ? 1 : r.cur <= 0 ? 0 : easeOut(r.cur);
      if (Math.abs(p - r.set) > 0.0008) {
        r.set = p;
        r.el.style.setProperty('--p', p.toFixed(4));
        r.el.classList.toggle('done', p >= 1);
      }
    }
    revealDirty = moving;
  };

  // ------------------------------------------------------------ ana döngü
  let lenis = null;
  if (!reduce && window.Lenis) lenis = new window.Lenis({ lerp: 0.1, anchors: { offset: -80 }, autoRaf: false });
  let running = true;
  function frame(time) {
    if (lenis) lenis.raf(time);
    sy = scrollY;
    if (dirty) { scrollFx(); dirty = false; }
    revealTick();
    if (running) requestAnimationFrame(frame);
  }
  addEventListener('scroll', () => { dirty = true; revealDirty = true; }, { passive: true });
  const relayout = () => { measureCorridor(); measureReveals(); moveInd(); dirty = true; };
  addEventListener('resize', relayout);
  new ResizeObserver(relayout).observe(document.body);
  document.addEventListener('visibilitychange', () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) requestAnimationFrame(frame);
  });
  if (document.fonts) document.fonts.ready.then(relayout);
  if (reduce) {
    revs.forEach((r) => { r.el.style.setProperty('--p', '1'); r.el.classList.add('done'); });
    revealTick = () => {};
  }
  onLang(() => { revs.forEach((r) => { r.set = -1; }); revealDirty = true; });
  relayout();
  requestAnimationFrame(frame);
})();
