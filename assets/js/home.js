(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* gizli sekme vb. */ } },
  };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  root.classList.add('ready');

  // ------------------------------------------------------------ çeviriler (HTML'deki metin İngilizce)
  const TR = {
    'skip': 'Projelere geç', 'nav.label': 'Bölümler',
    'nav.work': 'Projeler', 'nav.process': 'Süreç', 'nav.experience': 'Deneyim', 'nav.contact': 'İletişim',
    'lang.label': 'Switch to English', 'theme': 'Temayı değiştir', 'menu': 'Menü', 'close': 'Kapat',
    'hero.alt': 'Bilgisayar toplama projesinden ayrık 3D render: kasa, anakart, sıvı soğutucu, ekran kartı ve güç kaynağı',
    'lens.label': 'Render\'ın arkasındaki uyumluluk kodunu gösteren cam mercek. İmleçle, parmakla ya da ok tuşlarıyla gezdirin.',
    'hero.cap': '3D bilgisayar toplama, ayrık görünüm. Camın altında: her parçanın uyduğunu denetleyen kod.',
    'hero.lead': 'Sakarya\'da full-stack geliştiriciyim. Web uygulamaları, 3D araçlar, makine öğrenmesi çalışmaları ve Android uygulamaları geliştiriyorum; gereksinimden yayına kadar.',
    'hero.cta': 'E-posta gönder',
    'work.title': 'Seçili işler',
    'live': 'Canlı demo', 'code': 'Kaynak kod', 'apppage': 'Uygulama sayfası', 'page': 'Proje sayfası', 'dl': 'İndir',
    'p1.alt': 'Bilgisayar toplama sitesinde tamamlanmış bir sistemin 3D render\'ı', 'p1.t': '3D Bilgisayar Toplama',
    'p1.k': 'Web · three.js · yaklaşık 6.700 ürün',
    'p1.d': 'Yalnızca birbirine uyan parçaları iki yönlü kontrol ederek sunar ve sistemi 3D sahnede birleştirir; fiyatlar her gün güncellenir.',
    'p2.alt': 'Sipariş yerleştirme optimizasyonunun 3B depo görünümü', 'p2.t': 'Sipariş Yerleştirme',
    'p2.k': 'Karar destek · Python · tarayıcıda çalışır',
    'p2.d': 'Oluklu mukavva deposunda gelen her sipariş için en uygun rafı önerir; boş alan santimetre bazında izlenir.',
    'p3.alt': 'StandBy+ saat sayfası: akan duvar kâğıdı üzerinde cam rakamlar', 'p3.k': 'Android · Kotlin · Jetpack Compose',
    'p3.d': 'Telefon şarja konunca açılan başucu saati ve paneli; AGSL ile yazılmış Liquid Glass temasıyla.',
    'p4.alt': 'Ön muhasebe uygulamasının hızlı işlemler ve stok uyarıları olan ana ekranı', 'p4.t': 'Mini Ön Muhasebe',
    'p4.k': 'Staj · ASP.NET Core MVC · dört hafta',
    'p4.d': 'Cari, stok, fatura ve ödemeler bir gereksinim dokümanından uçtan uca geliştirildi; bakiyeler SQL\'de hareketlerden toplanır.',
    'p5.alt': 'AlPaSa pazar yeri ana sayfası ve ilanlar', 'p5.k': 'Web uygulaması · React 19 · TypeScript',
    'p5.d': 'Arama, favoriler, satıcıyla mesajlaşma ve rol tabanlı yönetim paneli olan ikinci el pazar yeri.',
    'p6.alt': 'Clean Architecture Oluşturucu penceresi: çözüm seçenekleri ve dosya önizlemesi', 'p6.t': 'CLEAN ARCHITECTURE OLUŞTURUCU',
    'p6.k': 'Windows aracı · C# · .NET 10',
    'p6.d': 'Güvenlik öncelikli bir ASP.NET Core çözümünü tek tıkla oluşturur; çıktı uyarısız derlenir ve kendi testlerini geçer.',
    'more.title': 'Diğer projeler',
    'm1.t': 'Kalp hastalığı ML', 'm1.f': '%93,4 doğruluk, canlı rapor',
    'm2.t': 'İnsülin dozu RL', 'm2.f': '10.000 eğitim epizodu',
    'm3.t': 'SLA platformu', 'm3.f': 'PostgreSQL satır düzeyi güvenlik',
    'm4.f': 'Windows servisi, C#', 'm5.f': 'Android, root yok, internet izni yok', 'm6.f': 'Barkodla stok sayımı, Android',
    'm7.t': 'LINUX DOSYA İZLEME', 'm7.f': 'systemd üzerinde Python servisi',
    'about.title': 'Hakkımda',
    'about.text': '<b>Ben Yiğit Kalaycıoğlu.</b> <mark>Sakarya Üniversitesi Bilişim Sistemleri Mühendisliği</mark> öğrencisiyim ve <mark>Haziran 2026</mark>\'da mezun oluyorum. İki yazılım stajı yaptım: 2025 yazında <mark>Tırsan Treyler\'in .NET ekibinde</mark> kurum içi uygulamaların Clean Architecture\'a göre modül modül yeniden yapılandırılmasına katkı verdim; 2026 sonbaharında <mark>ESBİ</mark>\'de bir gereksinim dokümanından <mark>dört haftada</mark> ön muhasebe uygulaması geliştirdim. İş dışında kullanmak istediğim şeyleri yapıyorum: yalnızca birbirine uyan parçaları sunan bir <mark>3D bilgisayar toplama</mark> sitesi, AGSL ile yazılmış cam temalı bir Android başucu saati, bilgisayarı uyandıran tuşla kapatan bir Windows servisi. Ekranlardan önce veri modelini yazar, her kuralı tek bir yerde tutar ve tarayıcıda açılabilen işler yayınlarım. <a class="about-cta" href="#contact">Aklınızda bir pozisyon ya da proje varsa bana yazın.</a>',
    'pr.title': 'Nasıl geliştiriyorum',
    'pr.1': '<b>Önce bir gereksinim dokümanı.</b> İlk satır koddan önce kimin kullanacağını, neye ihtiyacı olduğunu ve hangi kuralların asla bozulmaması gerektiğini yazarım. Ön muhasebe uygulamasının dokümanı neyin kapsam dışı olduğunu da söyler.',
    'pr.1c': 'Ön muhasebe uygulamasının proje dokümanından (docs/PROJE_DOKUMANI.md).',
    'pr.2': '<b>Sonra veri.</b> Ekranlar modelden sonra gelir. İlişkisel şemayı tasarlar, migration\'larla sürümler ve rakamları saklamak yerine kayıtlardan hesaplarım: bakiye hiçbir yerde tutulmaz, cari hareketlerinden toplanır.',
    'pr.3': '<b>Ardından sınırlar.</b> Domain, Application, Infrastructure ve API ayrı durur; her kural yalnızca bir yerde yaşar. Clean Architecture Oluşturucu bu yapıyı yeni bir ASP.NET Core çözümü için tek tıkla yazar.',
    'pr.3a': 'Clean Architecture Oluşturucu: katmanlar, giriş seçenekleri ve oluşturulan bir dosyanın önizlemesi',
    'pr.4': '<b>Ancak sonra arayüz.</b> React ya da ASP.NET MVC ile hızlı, sade ekranlar; three.js ile 3D ise yalnızca birinin anlamasına ya da karar vermesine gerçekten yardım ettiği yerde.',
    'pr.4a': 'Ön muhasebe uygulamasının satış faturası ekranı: kalemler ve KDV toplamları',
    'pr.5': '<b>Son olarak, çalıştığının kanıtı.</b> Her push\'ta biçim denetimi, birim testleri ve gerçek bir SQL Server\'a karşı entegrasyon testleri çalışır. Projelerin çoğu tarayıcıda açabileceğiniz bir canlı demoyla biter; diğerleri sürüm olarak yayınlanır.',
    'band.title': 'Okuduğum ve çalıştığım yerler', 'band.su': 'Sakarya Üniversitesi',
    'band.note': 'Staj yaptığım, okuduğum ve sertifika aldığım yerler.',
    'exp.title': 'Deneyim', 'intern': 'Yazılım Stajyeri',
    'e1.when': 'Eyl 2026 – Eki 2026',
    'e1.a': 'Bir gereksinim dokümanından yola çıkarak cari hesaplar, stok, faturalama, ödemeler ve raporlamayı kapsayan web tabanlı bir ön muhasebe uygulamasını dört haftada uçtan uca geliştirdim.',
    'e1.b': '11 tablolu ilişkisel veritabanı şemasını tasarlayıp EF Core Code First migration\'larıyla yönettim.',
    'e2.when': 'Haz 2025 – Ağu 2025', 'e2.pos': 'Yazılım Stajyeri, .NET ekibi',
    'e2.a': 'Kurum içi uygulamaların Clean Architecture ilkelerine göre modül bazlı yeniden yapılandırılmasına katkı verdim.',
    'e2.b': 'Entity Framework Core üzerine kurulu veritabanı sorgularının optimizasyonunda yer aldım.',
    'ed.grad': 'Mezuniyet: Haziran 2026', 'ed.school': 'Sakarya Üniversitesi', 'ed.dept': 'Bilişim Sistemleri Mühendisliği',
    'sk.title': 'Yetenekler', 'sk.web': 'Diller ve web', 'sk.db': 'Veritabanları ve araçlar', 'sk.ds': 'Veri bilimi', 'sk.other': 'Projelerimde ayrıca',
    'ce.title': 'Sertifikalar',
    'c1': 'Full-Stack Web Geliştirme (HTML, CSS, JS, Node, React, PostgreSQL)', 'c2': 'Odoo Öğrenci Diploması',
    'c3': 'C# ve .NET Programlama', 'c4': 'Yapay Zekâ Profesyonel Gelişim Programı (40 saat)', 'cview': 'Sertifikayı gör',
    'ct.title': 'Konuşalım', 'ct.copy': 'Adresi kopyala', 'ct.place': 'Sakarya, Türkiye', 'ct.hello': 'Merhaba de',
    'ct.sub': 'Pozisyonlar, projeler ya da sadece merhaba demek için en hızlı yol e-posta.',
    'foot.nav': 'Gezinti', 'foot.work': 'Canlı demolar', 'foot.find': 'Bağlantılar', 'foot.mail': 'E-posta', 'foot.apps': 'Uygulamalar',
    'foot': 'Elle yapıldı, GitHub Pages\'te yayınlanıyor.', 'top': 'Başa dön',
    '_copied': 'E-posta adresi kopyalandı', '_title': 'Yiğit Kalaycıoğlu · Full-Stack Geliştirici',
  };
  const EN_EXTRA = { '_copied': 'Email address copied', '_title': document.title };
  const t = (key) => (root.lang === 'tr' ? TR[key] : EN_EXTRA[key]);

  // ------------------------------------------------------------ çalışmalar: iki sütunlu sahne, dikiş yerinde yırtılan başlık
  // Çeviriler toplanmadan önce kurulur ki sütunlardaki başlık kopyaları da dil değiştirsin.
  const seam = $('.seam');
  const projs = $$('.proj', seam);
  const live = !!seam && !reduce && projs.length > 1;
  const reels = [];
  if (live) {
    const stage = $('.seam-stage', seam);
    for (const side of ['l', 'r']) {
      const col = document.createElement('div');
      col.className = `seam-col ${side}`;
      col.setAttribute('aria-hidden', 'true');
      const reel = document.createElement('div');
      reel.className = 'seam-reel';
      const order = side === 'l' ? projs : [...projs].reverse();
      order.forEach((p, k) => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.style.setProperty('--k', k);
        const src = $('img', p);
        const img = document.createElement('img');
        img.src = src.getAttribute('src'); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
        slot.append(img);
        reel.append(slot);
      });
      col.append(reel);
      stage.prepend(col);
      reels.push(reel);
    }
    seam.style.setProperty('--n', projs.length);
    seam.classList.add('live', 'scene', 'is-live');
  }

  // İngilizce asılları sakla ki dil geri değiştirilebilsin
  const textEls = $$('[data-i18n]');
  textEls.forEach((el) => { el.dataset.en = el.textContent; });
  const htmlEls = $$('[data-i18n-html]');
  htmlEls.forEach((el) => { el.dataset.en = el.innerHTML; });
  const attrEls = $$('[data-i18n-attr]');
  attrEls.forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr] = pair.split(':');
      el.dataset['en_' + attr.replace(/-/g, '_')] = el.getAttribute(attr) || '';
    });
  });

  const langHooks = [];
  function applyLang(lang) {
    root.lang = lang;
    textEls.forEach((el) => {
      const v = lang === 'tr' ? TR[el.dataset.i18n] : el.dataset.en;
      if (v != null) el.textContent = v;
    });
    htmlEls.forEach((el) => {
      const v = lang === 'tr' ? TR[el.dataset.i18nHtml] : el.dataset.en;
      if (v != null) el.innerHTML = v;
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

  let langBusy = false;
  $('#lang').addEventListener('click', () => {
    if (langBusy) return;
    const next = root.lang === 'tr' ? 'en' : 'tr';
    store.set('yk-lang', next);
    if (reduce) { applyLang(next); return; }
    langBusy = true;
    root.classList.add('swap');
    setTimeout(() => {
      applyLang(next);
      requestAnimationFrame(() => { root.classList.remove('swap'); langBusy = false; });
    }, 190);
  });

  // ------------------------------------------------------------ tema
  const dark = () => root.dataset.theme === 'dark' || (root.dataset.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const syncThemeColor = () => { const m = $('meta[name="theme-color"]'); if (m) m.content = dark() ? '#0c0c0e' : '#eeede8'; };
  syncThemeColor();
  $('#theme').addEventListener('click', () => {
    root.dataset.theme = dark() ? 'light' : 'dark';
    store.set('yk-theme', root.dataset.theme);
    syncThemeColor();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncThemeColor);

  // ------------------------------------------------------------ e-posta (spam botlarına karşı çalışma anında birleştirilir)
  const mail = $('#mail');
  const address = `${mail.dataset.u}@${mail.dataset.d}`;
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

  // ------------------------------------------------------------ menü (telefon)
  const menu = $('#menu');
  $('#menu-btn').addEventListener('click', () => menu.showModal());
  $('.menu-close', menu).addEventListener('click', () => menu.close());
  $$('a', menu).forEach((a) => a.addEventListener('click', () => menu.close()));

  // ------------------------------------------------------------ isim: satır genişliğine oturtulur, asla kırılmaz
  const heroName = $('#hero-name');
  const footMark = $('#foot-mark');
  function fitName() {
    const lines = $$('.hn-in', heroName);
    const avail = heroName.parentElement.clientWidth - parseFloat(getComputedStyle(heroName.parentElement).paddingLeft) * 2;
    heroName.style.setProperty('--name-size', '100px');
    const widths = lines.map((l) => l.offsetWidth);
    const stacked = getComputedStyle(heroName).flexDirection === 'column';
    const gap = stacked ? 0 : parseFloat(getComputedStyle(heroName).columnGap) || 20;
    const need = stacked ? Math.max(...widths) : widths.reduce((a, b) => a + b, 0) + gap;
    heroName.style.setProperty('--name-size', `${Math.floor(100 * avail / need * 0.995)}px`);
    if (footMark) {
      const s = $('span', footMark);
      footMark.style.setProperty('--mark-size', '100px');
      const w = s.offsetWidth;
      footMark.style.setProperty('--mark-size', `${Math.floor(100 * footMark.clientWidth / w * 0.995)}px`);
    }
  }
  fitName();
  if (document.fonts) document.fonts.ready.then(fitName);
  addEventListener('resize', fitName);

  // ------------------------------------------------------------ cam mercek: render'ın altındaki kodu gösterir, kenarında ışığı kırar
  const pic = $('#hero-pic');
  const lens = $('#lens');
  const ua = navigator.userAgent;
  const refracts = !/Safari/.test(ua) || /Chrome|Chromium|Edg|Firefox/.test(ua);
  let lensSize = 0, pw = 0, ph = 0;
  const lp = { x: 0, y: 0, tx: 0, ty: 0, mode: 'drift', until: 0 };

  function lensMap(S) {
    // kenardaki şeritte içeri doğru çeken bir yer değiştirme haritası (R: x, G: y)
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(S, S);
    const R = S / 2, band = R * 0.3;
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const dx = x + 0.5 - R, dy = y + 0.5 - R, d = Math.hypot(dx, dy);
        let vx = 0, vy = 0;
        if (d < R && d > R - band) {
          const k = (d - (R - band)) / band;
          const f = k * k;
          vx = -(dx / d) * f; vy = -(dy / d) * f;
        }
        const i = (y * S + x) * 4;
        img.data[i] = 128 + vx * 127; img.data[i + 1] = 128 + vy * 127; img.data[i + 2] = 128; img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
  }
  function buildFilter(S) {
    const NS = 'http://www.w3.org/2000/svg';
    let host = $('#lens-defs');
    if (!host) {
      host = document.createElementNS(NS, 'svg');
      host.id = 'lens-defs';
      host.setAttribute('width', '0'); host.setAttribute('height', '0'); host.setAttribute('aria-hidden', 'true');
      host.style.cssText = 'position:absolute;pointer-events:none';
      document.body.append(host);
    }
    // renk dağılımı: kırmızı biraz daha çok, mavi biraz daha az bükülür
    const sc = (k) => (S * k).toFixed(1);
    host.innerHTML = `<filter id="lens-f" x="0" y="0" width="${S}" height="${S}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feImage href="${lensMap(S)}" x="0" y="0" width="${S}" height="${S}" preserveAspectRatio="none" result="map"/>
      <feDisplacementMap in="SourceGraphic" in2="map" scale="${sc(0.2)}" xChannelSelector="R" yChannelSelector="G" result="dr"/>
      <feDisplacementMap in="SourceGraphic" in2="map" scale="${sc(0.188)}" xChannelSelector="R" yChannelSelector="G" result="dg"/>
      <feDisplacementMap in="SourceGraphic" in2="map" scale="${sc(0.176)}" xChannelSelector="R" yChannelSelector="G" result="db"/>
      <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
      <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
      <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
      <feComposite in="r" in2="g" operator="arithmetic" k2="1" k3="1" result="rg"/>
      <feComposite in="rg" in2="b" operator="arithmetic" k2="1" k3="1"/>
    </filter>`;
    $('.lens-glass', lens).style.setProperty('--lens-f', 'url(#lens-f)');
  }
  function measureLens() {
    pw = pic.clientWidth; ph = pic.clientHeight;
    pic.style.setProperty('--pw', `${pw}px`);
    pic.style.setProperty('--ph', `${ph}px`);
    const S = lens.offsetWidth;
    if (S && S !== lensSize) { lensSize = S; if (refracts) buildFilter(S); }
  }
  const home = () => ({ x: pw * (pw > 760 ? 0.6 : 0.52) - lensSize / 2, y: ph * 0.42 - lensSize / 2 });
  if (pic && lens) {
    lens.hidden = false;
    measureLens();
    new ResizeObserver(measureLens).observe(pic);
    const h = home(); lp.x = lp.tx = h.x; lp.y = lp.ty = h.y;
    const local = (e) => { const r = pic.getBoundingClientRect(); return { x: e.clientX - r.left - lensSize / 2, y: e.clientY - r.top - lensSize / 2 }; };
    pic.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' && lp.mode !== 'drag') return;
      const p = local(e); lp.tx = p.x; lp.ty = p.y;
      if (lp.mode !== 'drag') lp.mode = 'follow';
      lp.until = performance.now() + 2500;
    });
    pic.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch' && lp.mode === 'follow') lp.until = performance.now() + 900; });
    lens.addEventListener('pointerdown', (e) => {
      lens.setPointerCapture(e.pointerId);
      lp.mode = 'drag';
      const p = local(e); lp.tx = p.x; lp.ty = p.y;
    });
    const release = () => { if (lp.mode === 'drag') { lp.mode = 'follow'; lp.until = performance.now() + 2500; } };
    lens.addEventListener('pointerup', release);
    lens.addEventListener('pointercancel', release);
    lens.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 60 : 24;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!d) return;
      e.preventDefault();
      if (lp.mode === 'drift') { lp.tx = lp.x; lp.ty = lp.y; }
      lp.tx += d[0]; lp.ty += d[1];
      lp.mode = 'follow'; lp.until = performance.now() + 4000;
    });
  }
  function lensTick(now) {
    if (!lens || lens.hidden) return;
    if (lp.mode === 'follow' && now > lp.until) lp.mode = 'drift';
    if (lp.mode === 'drift') {
      const h = home();
      const s = now / 1000;
      lp.tx = h.x + (reduce ? 0 : Math.sin(s * 0.33) * pw * 0.14);
      lp.ty = h.y + (reduce ? 0 : Math.sin(s * 0.51 + 1) * ph * 0.16);
    }
    lp.tx = clamp(lp.tx, -lensSize * 0.25, pw - lensSize * 0.75);
    lp.ty = clamp(lp.ty, -lensSize * 0.25, ph - lensSize * 0.75);
    const k = reduce || lp.mode === 'drag' ? 1 : lp.mode === 'drift' ? 0.05 : 0.16;
    lp.x += (lp.tx - lp.x) * k; lp.y += (lp.ty - lp.y) * k;
    pic.style.setProperty('--lx', `${lp.x.toFixed(1)}px`);
    pic.style.setProperty('--ly', `${lp.y.toFixed(1)}px`);
  }

  // ------------------------------------------------------------ hakkımda: kelimeler okundukça mürekkeple dolar
  const about = $('#about-text');
  let words = [];
  function wrapWords() {
    if (!about) return;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) frag.append(p);
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(about);
    words = $$('.w', about);
    lit = -1;
  }
  let lit = -1;
  wrapWords();
  langHooks.push(() => { wrapWords(); dirty = true; });

  // ------------------------------------------------------------ belirme: her bölümün parçaları sırayla gelir
  const groups = [
    ['.posters', '.h2, .poster'], ['.about', '.h2'], ['.process', '.h2, .stage-step > p, .ev'],
    ['.exp', '.h2, .exp-lead, .job, .side-h, .skills, .certs'], ['.contact', '.row, .contact-note'], ['.foot', '.foot-cols > div'],
  ];
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    groups.forEach(([sec, sel]) => {
      const host = $(sec);
      if (!host) return;
      let i = 0, lastTop = -1;
      $$(sel, host).forEach((el) => {
        const top = Math.round(el.getBoundingClientRect().top);
        i = top === lastTop ? i + 1 : 0;
        lastTop = top;
        el.dataset.r = '';
        el.style.setProperty('--i', i);
        io.observe(el);
      });
    });
  }

  // ------------------------------------------------------------ menü rengi: altındaki bölümün tonuna göre
  const nav = $('#nav');
  const toned = $$('[data-tone]');
  const links = $$('.nav-links a');
  const sections = links.map((a) => $(a.getAttribute('href')));

  // ------------------------------------------------------------ yumuşak kaydırma
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    // kaydırma çubuğu ya da başka bir yoldan gelen sıçrama: Lenis eski hedefine geri çekmesin, yeni yere eşitlensin
    addEventListener('scroll', () => {
      if (Math.abs(scrollY - lenis.animatedScroll) > 40) lenis.scrollTo(scrollY, { immediate: true, force: true });
    }, { passive: true });
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0 });
      if (id !== '#top' && target.focus) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }));
  }

  // ------------------------------------------------------------ kaydırmaya bağlı her şey tek döngüde
  const hero = $('.hero');
  const foot = $('.foot');
  const heroImg = $('img', pic);
  let dirty = true, lastY = -1;
  addEventListener('resize', () => { dirty = true; });
  const step = (x) => {
    // projeler arasında kısa bir bekleme: her proje ortalanınca bir an durur
    const i = Math.floor(x), f = x - i;
    const s = clamp((f - 0.22) / 0.56);
    return i + s * s * (3 - 2 * s);
  };

  function frame(now) {
    if (lenis) lenis.raf(now);
    lensTick(now);
    const y = scrollY, vh = innerHeight;
    if (y !== lastY || dirty) {
      lastY = y; dirty = false;

      // imza hareketi: ilk ekran çıkarken isim hafifçe küçülür, render yavaşça kayar
      const hh = hero.offsetHeight;
      const hp = clamp(y / hh);
      if (!reduce) {
        heroName.style.setProperty('--ns', (1 - 0.07 * hp).toFixed(4));
        if (heroImg) { pic.style.setProperty('--hy', `${(hp * hh * 0.18).toFixed(1)}px`); }
      }
      nav.classList.toggle('named', y > hh - 80);

      // çalışmalar sahnesi
      if (live) {
        const top = seam.offsetTop, span = seam.offsetHeight - vh;
        const raw = clamp((y - top) / span) * (projs.length - 1);
        const p = step(raw);
        const n = projs.length;
        reels[0].style.transform = `translate3d(0, ${(-p * vh).toFixed(1)}px, 0)`;
        reels[1].style.transform = `translate3d(0, ${((p - (n - 1)) * vh).toFixed(1)}px, 0)`;
        // yalnızca sahnede görünebilecek kareler çizilir
        reels.forEach((reel, side) => [...reel.children].forEach((slot, k) => {
          const idx = side === 0 ? k : n - 1 - k;
          slot.style.visibility = Math.abs(p - idx) < 1 ? 'visible' : 'hidden';
        }));
        projs.forEach((el, k) => {
          const o = clamp(1 - Math.abs(p - k) * 2.6);
          el.style.setProperty('--o', o.toFixed(3));
          el.classList.toggle('on', o > 0.05);
        });
      }

      // hakkımda: okunan kısım koyulaşır
      if (about && words.length) {
        const r = about.getBoundingClientRect();
        const ap = reduce ? 1 : clamp((vh * 0.82 - r.top) / (r.height * 0.9 + vh * 0.12));
        const n = Math.round(ap * words.length);
        if (n !== lit) {
          words.forEach((w, i) => w.classList.toggle('lit', i < n));
          lit = n;
        }
      }

      // altbilgi: kelime yerine otururken büyür
      if (foot && !reduce) {
        const fr = foot.getBoundingClientRect();
        const fp = clamp((vh - fr.top) / fr.height);
        footMark.style.setProperty('--fs', (0.92 + 0.08 * fp).toFixed(4));
      }

      // menünün rengi ve etkin bölüm
      const probe = 32;
      let tone = 'light';
      for (const el of toned) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          tone = el.dataset.tone;
          if (el.classList.contains('hero') && r.top + $('#hero-pic').offsetHeight < probe) tone = 'light';
        }
      }
      nav.dataset.on = tone;
      let cur = -1;
      sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * 0.4) cur = i; });
      links.forEach((a, i) => a.setAttribute('aria-current', i === cur ? 'true' : 'false'));
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
