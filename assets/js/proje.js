(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* gizli sekme vb. */ } },
  };

  // ------------------------------------------------------------ çeviriler
  // Sayfadaki metin İngilizce; bütün proje sayfalarında ortak olan Türkçeler burada,
  // sayfaya özel olanlar sayfanın sonundaki <script type="application/json" id="tr"> içinde.
  const ORTAK = {
    'skip': 'İçeriğe geç', 'theme': 'Temayı değiştir', 'home': 'Ana sayfa', 'back': 'Tüm projeler',
    'nav.features': 'Özellikler', 'nav.screens': 'Ekranlar', 'nav.how': 'Nasıl çalışıyor', 'nav.tech': 'Teknik notlar',
    'nav.run': 'Çalıştırma', 'nav.setup': 'Kurulum', 'nav.options': 'Seçenekler', 'nav.privacy': 'Gizlilik',
    'code': 'Kaynak kod', 'dl': 'İndir', 'apk': 'APK indir', 'guide': 'Kullanım kılavuzu',
    'copy': 'Kopyala', 'copied': 'Kopyalandı', 'close': 'Kapat', 'enlarge': 'Büyüt',
    'limits': 'Bilinen sınırlar', 'more': 'Diğer projeler',
    'pn.muhasebe': 'Mini Ön Muhasebe', 'pn.ntier': 'N-Tier Mimari Oluşturucu', 'pn.sla': 'Çok Kiracılı SLA Platformu',
    'pn.linux': 'Linux Dosya İzleme Servisi',
    'pk.intern': 'Staj projesi', 'pk.tool': 'Araç', 'pk.fs': 'Full-stack', 'pk.mobile': 'Mobil', 'pk.sys': 'Sistem',
    'foot': 'Elle tasarlandı, GitHub Pages\'te yayınlanıyor.',
  };
  let SAYFA = {};
  try { SAYFA = JSON.parse($('#tr').textContent); } catch { /* sayfada çeviri yok */ }
  const TR = Object.assign({}, ORTAK, SAYFA);
  const EN = { 'copy': 'Copy', 'copied': 'Copied', 'close': 'Close', '_title': document.title };

  // İngilizce asıllarını sakla ki dil geri değiştirilebilsin
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

  const t = (key) => (root.lang === 'tr' ? TR[key] : EN[key]);
  function applyLang(lang) {
    root.lang = lang;
    textEls.forEach((el) => {
      const v = lang === 'tr' ? TR[el.dataset.i18n] : el.dataset.en;
      if (v != null) el.textContent = v;
    });
    htmlEls.forEach((el) => {
      const v = lang === 'tr' ? TR[el.dataset.i18nHtml] : el.dataset.en;
      if (v != null) el.innerHTML = v;   // yalnızca bu sayfaya elle yazılmış metin
    });
    attrEls.forEach((el) => {
      el.dataset.i18nAttr.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':');
        const v = lang === 'tr' ? TR[key] : el.dataset['en_' + attr.replace(/-/g, '_')];
        if (v != null) el.setAttribute(attr, v);
      });
    });
    $$('.copy span').forEach((s) => { s.textContent = t('copy'); });
    document.title = t('_title') || EN._title;
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

  // ------------------------------------------------------------ kod bloklarına kopyala düğmesi
  const copyIcon = '<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>';
  $$('.code[data-copy]').forEach((block) => {
    const head = $('.code-head', block);
    const pre = $('pre', block);
    if (!head || !pre) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy';
    btn.innerHTML = copyIcon + '<span></span>';
    $('span', btn).textContent = t('copy');
    let timer;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pre.textContent.replace(/\n$/, '')); } catch { return; }
      $('span', btn).textContent = t('copied');
      clearTimeout(timer);
      timer = setTimeout(() => { $('span', btn).textContent = t('copy'); }, 1600);
    });
    head.appendChild(btn);
  });

  // ------------------------------------------------------------ ekran görüntüsünü büyütme
  const shots = $$('a[data-lightbox]');
  if (shots.length && typeof HTMLDialogElement === 'function') {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML = '<button class="lb-close" type="button"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><p></p>';
    document.body.appendChild(dlg);
    const img = document.createElement('img');   // adresi ilk tıklamada verilir
    const cap = $('p', dlg);
    const closeBtn = $('.lb-close', dlg);
    shots.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const thumb = $('img', a);
        img.src = a.href;
        if (!img.isConnected) dlg.insertBefore(img, cap);
        img.alt = thumb ? thumb.alt : '';
        const fc = a.closest('figure') && $('figcaption', a.closest('figure'));
        cap.textContent = fc ? fc.textContent : '';
        closeBtn.setAttribute('aria-label', t('close'));
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', () => dlg.close());
  }

  // ------------------------------------------------------------ menü gölgesi ve etkin bağlantı
  const nav = $('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const links = $$('.links a[href^="#"]');
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
