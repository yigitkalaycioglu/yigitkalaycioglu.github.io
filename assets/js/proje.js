(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* gizli sekme vb. */ } },
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let sy = scrollY, dirty = true, revealDirty = true;
  const langHooks = [];
  const onLang = (fn) => { langHooks.push(fn); fn(root.lang); };

  // ------------------------------------------------------------ çeviriler
  // Sayfadaki metin İngilizce; bütün proje sayfalarında ortak olan Türkçeler burada,
  // sayfaya özel olanlar sayfanın sonundaki <script type="application/json" id="tr"> içinde.
  const ORTAK = {
    'skip': 'İçeriğe geç', 'theme': 'Temayı değiştir', 'home': 'Ana sayfa', 'back': 'Tüm projeler',
    'nav.features': 'Özellikler', 'nav.screens': 'Ekranlar', 'nav.how': 'Nasıl çalışıyor', 'nav.tech': 'Teknik notlar',
    'nav.run': 'Çalıştırma', 'nav.setup': 'Kurulum', 'nav.options': 'Seçenekler', 'nav.privacy': 'Gizlilik',
    'nav.cta': 'İletişime geç',
    'code': 'Kaynak kod', 'dl': 'İndir', 'apk': 'APK indir', 'guide': 'Kullanım kılavuzu',
    'copy': 'Kopyala', 'copied': 'Kopyalandı', 'close': 'Kapat', 'enlarge': 'Büyüt',
    'limits': 'Bilinen sınırlar', 'more': 'Diğer projeler',
    'pn.muhasebe': 'Mini Ön Muhasebe', 'pn.cleanarch': 'Clean Architecture Oluşturucu', 'pn.sla': 'Çok Kiracılı SLA Platformu',
    'pn.linux': 'Linux Dosya İzleme Servisi',
    'pk.intern': 'Staj projesi', 'pk.tool': 'Araç', 'pk.fs': 'Full-stack', 'pk.mobile': 'Mobil', 'pk.sys': 'Sistem',
    'foot': 'Elle tasarlandı, GitHub Pages\'te yayınlanıyor.',
    'foot.blurb': 'Web uygulamaları, araçlar ve makine öğrenmesi çalışmaları geliştiren full-stack geliştirici. Sakarya, Türkiye.',
    'foot.nav': 'Gezinti', 'foot.find': 'Bağlantılar', 'foot.process': 'Süreç', 'foot.contact': 'İletişim', 'top': 'Başa dön',
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
    }).map((el) => ({ el, d: clamp(el.getBoundingClientRect().top / vh) * 180 }));
    const outs = seen.map(({ el, d }) => el.animate(
      [{ opacity: 0, translate: '0 -0.25em' }],
      { duration: 240, delay: d, easing: 'cubic-bezier(.55, 0, .75, .2)', fill: 'forwards' }));
    Promise.all(outs.map((a) => a.finished.catch(() => {}))).then(() => {
      applyLang(next);
      seen.forEach(({ el, d }, i) => {
        outs[i].cancel();
        // bölünmüş başlıklar ve manifesto kelime kelime gelir
        const parts = el.matches('[data-split]') ? $$('.sw', el) : el.id === 'mani' ? $$('.mw', el) : [el];
        parts.forEach((part, j) => part.animate(
          [{ opacity: 0, translate: '0 0.35em', offset: 0 }],
          { duration: 700, delay: d * 0.6 + Math.min(j, 14) * 34, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' }));
      });
      setTimeout(() => { langBusy = false; }, 450);
    });
  }
  $('#lang').addEventListener('click', () => {
    if (langBusy) return;   // geçiş bitmeden gelen tıklamalar yok sayılır
    const next = root.lang === 'tr' ? 'en' : 'tr';
    switchLang(next, [...textEls, ...htmlEls, ...$$('.copy span')]);
    store.set('yk-lang', next);
  });

  // başlıklar kelime kelime yerine oturur
  onLang(() => {
    $$('[data-split]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, i) => `<span class="sw" style="--wi:${i}">${esc(w)}</span>`).join(' ');
    });
  });

  // ------------------------------------------------------------ tema
  const effectiveDark = () => root.dataset.theme === 'dark' || (root.dataset.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('#theme').addEventListener('click', () => {
    const next = effectiveDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('yk-theme', next);
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

  // ------------------------------------------------------------ yumuşak kaydırma
  let lenis = null;
  if (!reduce && window.Lenis) lenis = new window.Lenis({ lerp: 0.1, anchors: { offset: -72 }, autoRaf: false });

  // ------------------------------------------------------------ ekran görüntüsünü büyütme
  const shotLinks = $$('a[data-lightbox]');
  if (shotLinks.length && typeof HTMLDialogElement === 'function') {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('data-lenis-prevent', '');
    dlg.innerHTML = '<button class="lb-close" type="button"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><p></p>';
    document.body.appendChild(dlg);
    const img = document.createElement('img');   // adresi ilk tıklamada verilir
    const cap = $('p', dlg);
    const closeBtn = $('.lb-close', dlg);
    shotLinks.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const thumb = $('img', a);
        img.src = a.href;
        if (!img.isConnected) dlg.insertBefore(img, cap);
        img.alt = thumb ? thumb.alt : '';
        const fc = a.closest('figure') && $('figcaption', a.closest('figure'));
        cap.textContent = fc ? fc.textContent : '';
        closeBtn.setAttribute('aria-label', t('close'));
        if (lenis) lenis.stop();
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', () => dlg.close());
    dlg.addEventListener('close', () => { if (lenis) lenis.start(); });
  }

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
  const links = $$('.links a[href^="#"]');
  const ind = $('.links .ind');
  const hero = $('.p-hero');
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
  function scrollFx() {
    // kobalt duvar yalnızca üst kısım; altı oda
    const under = hero && hero.getBoundingClientRect().bottom > nav.offsetHeight - 1;
    nav.dataset.tone = under ? 'wall' : 'room';
    nav.classList.toggle('scrolled', sy > 8);
  }

  // ------------------------------------------------------------ kaydırınca belirme (geri sarar)
  // liste kapsayıcıları tek parça yerine öğe öğe gelsin
  $$('.p-facts.reveal, .weeks.reveal, .steps.reveal, .limits.reveal, .more.reveal').forEach((list) => {
    list.classList.remove('reveal');
    [...list.children].forEach((c) => c.classList.add('reveal'));
  });
  $$('.reveal').forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    if (sib.length > 1) el.style.setProperty('--d', (sib.indexOf(el) % 4) * 90 + 'ms');
  });
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
  let revealTick = () => {
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
  if (reduce) {
    revs.forEach((r) => { r.el.style.setProperty('--p', '1'); r.el.classList.add('done'); });
    revealTick = () => {};
  }
  onLang(() => { revs.forEach((r) => { r.set = -1; }); revealDirty = true; });

  // ------------------------------------------------------------ ana döngü
  let running = true;
  function frame(time) {
    if (lenis) lenis.raf(time);
    sy = scrollY;
    if (dirty) { scrollFx(); dirty = false; }
    revealTick();
    if (running) requestAnimationFrame(frame);
  }
  addEventListener('scroll', () => { dirty = true; revealDirty = true; }, { passive: true });
  const relayout = () => { measureReveals(); moveInd(); dirty = true; };
  addEventListener('resize', relayout);
  new ResizeObserver(relayout).observe(document.body);
  document.addEventListener('visibilitychange', () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) requestAnimationFrame(frame);
  });
  if (document.fonts) document.fonts.ready.then(relayout);
  relayout();
  requestAnimationFrame(frame);
})();
