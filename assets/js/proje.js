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
  let sy = scrollY, lastSy = sy, vel = 0, dirty = true, revealDirty = true;
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
  $('#lang').addEventListener('click', () => {
    const next = root.lang === 'tr' ? 'en' : 'tr';
    applyLang(next);
    store.set('yk-lang', next);
  });

  // başlıklar kelime kelime bulanıklıktan netleşir
  onLang(() => {
    $$('[data-split]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.style.setProperty('--wn', words.length);
      el.innerHTML = words.map((w, i) => `<span class="sw" style="--wi:${i}">${esc(w)}</span>`).join(' ');
    });
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

  // ------------------------------------------------------------ karışık harf efekti
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

  // bölüm numaraları (01, 02, ...)
  $$('main > .section > .sec-head:not(.sub)').forEach((head, i) => {
    const n = document.createElement('span');
    n.className = 'sec-num';
    n.setAttribute('aria-hidden', 'true');
    n.textContent = String(i + 1).padStart(2, '0');
    head.prepend(n);
  });

  // ------------------------------------------------------------ parçacık ağı (arka plan)
  const fx = $('#fx');
  const ctx = fx && fx.getContext('2d');
  let W = 0, H = 0, pts = [], cA = '180,167,255', cB = '255,110,199';
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
      const n = Math.round(clamp((nw * nh) / 22000, 18, 64));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * nw, y: Math.random() * nh, z: 0.35 + Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, b: Math.random() < 0.4,
      }));
    }
    W = nw; H = nh;
  }
  let mx = -9999, my = -9999;
  function drawFx(move) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const off = sy * 0.18, span = H + 40, P = [];
    for (const p of pts) {
      if (move) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      }
      let x = p.x;
      let y = ((((p.y - off * p.z) % span) + span) % span) - 20;
      const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
      if (d2 < 28000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 167) * 22 * p.z; x += (dx / d) * f; y += (dy / d) * f; }
      P.push([x, y, p.z, p.b]);
    }
    const MAX = 135, MAX2 = MAX * MAX;
    ctx.lineWidth = 1;
    for (let i = 0; i < P.length; i++) {
      const [xi, yi, zi] = P[i];
      for (let j = i + 1; j < P.length; j++) {
        const dx = xi - P[j][0], dy = yi - P[j][1], d2 = dx * dx + dy * dy;
        if (d2 > MAX2) continue;
        ctx.strokeStyle = `rgba(${cA},${((1 - Math.sqrt(d2) / MAX) * 0.32 * Math.min(zi, P[j][2])).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(xi, yi); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke();
      }
      const md = (xi - mx) ** 2 + (yi - my) ** 2;
      if (md < 48400) {
        ctx.strokeStyle = `rgba(${cB},${((1 - Math.sqrt(md) / 220) * 0.5).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(xi, yi); ctx.lineTo(mx, my); ctx.stroke();
      }
    }
    for (const [x, y, z, b] of P) {
      ctx.fillStyle = `rgba(${b ? cB : cA},${(0.35 + z * 0.55).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(x, y, 0.6 + z * 1.4, 0, 6.2832); ctx.fill();
    }
  }

  // ------------------------------------------------------------ fare: ışık, kart eğimi, kenar parlaması, mıknatıs
  const glow = $('.glow-cursor');
  const GLOW = '.fcard, .box, .chal article, .more a, .steps > li, .limits li, .weeks li, .shot-card a';
  const TILT = '.fcard, .more a';
  let lastEl = null;
  const untilt = (el) => { el.style.setProperty('--tx', '0deg'); el.style.setProperty('--ty', '0deg'); el.classList.remove('tilting'); };
  if (fine && !reduce) {
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (glow) glow.classList.add('on');
      const el = e.target.closest && e.target.closest(GLOW);
      if (lastEl && lastEl !== el && lastEl.matches(TILT)) untilt(lastEl);
      lastEl = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      el.style.setProperty('--mx', px + 'px');
      el.style.setProperty('--my', py + 'px');
      if (el.matches(TILT)) {
        el.classList.add('tilting');
        el.style.setProperty('--tx', ((py / r.height - 0.5) * -6).toFixed(2) + 'deg');
        el.style.setProperty('--ty', ((px / r.width - 0.5) * 8).toFixed(2) + 'deg');
      }
    }, { passive: true });
    document.addEventListener('pointerleave', () => {
      mx = my = -9999;
      if (glow) glow.classList.remove('on');
      if (lastEl && lastEl.matches(TILT)) untilt(lastEl);
      lastEl = null;
    });
    $$('.p-hero .cta .btn, .nav-cta').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  // ------------------------------------------------------------ menü: gölge, etkin bağlantı ve kayan gösterge
  const nav = $('.nav');
  const links = $$('.links a[href^="#"]');
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
  const hero = $('.p-hero');
  const heroFig = $('.p-hero-in > figure');
  function scrollFx() {
    const max = root.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? (sy / max).toFixed(4) : 0})`;
    nav.classList.toggle('scrolled', sy > 8);
    if (hero && !reduce) hero.style.setProperty('--hp', clamp(sy / (hero.offsetHeight * 0.9)).toFixed(3));
  }

  // ------------------------------------------------------------ belirme: her öğe kendi yönünden, kaydırmaya bağlı
  // liste kapsayıcıları tek parça yerine öğe öğe gelsin
  $$('.p-facts.reveal, .weeks.reveal, .steps.reveal, .limits.reveal, .more.reveal').forEach((list) => {
    list.classList.remove('reveal');
    [...list.children].forEach((c) => c.classList.add('reveal'));
  });
  $$('.reveal').forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    if (sib.length > 1) el.style.setProperty('--d', (sib.indexOf(el) % 4) * 100 + 'ms');
  });
  if (!reduce) {
    const rnd = (a, b) => a + Math.random() * (b - a);
    const fxs = (els, list) => els.forEach((el, i) => { if (!el.dataset.fx) el.dataset.fx = list[i % list.length]; });
    const colsOf = (el) => (el ? getComputedStyle(el).gridTemplateColumns.split(' ').length : 1);
    $$('.feat-grid').forEach((g) => {
      const c = colsOf(g);
      fxs($$(':scope > .reveal', g), c >= 4 ? ['left', 'flip', 'zoom', 'right'] : c === 3 ? ['left', 'iris', 'right'] : c === 2 ? ['left', 'right'] : ['left', 'right', 'flip']);
    });
    $$('.gallery').forEach((g) => fxs($$(':scope > .reveal', g), colsOf(g) >= 3 ? ['flip', 'zoom', 'flip'] : ['left', 'right']));
    $$('.split').forEach((sp) => {
      const [a, b] = [...sp.children];
      if (a && a.classList.contains('reveal')) a.dataset.fx = 'left';
      if (b) fxs(b.classList.contains('reveal') ? [b] : $$(':scope > .reveal', b), ['right']);
    });
    $$('.chal').forEach((g) => fxs($$(':scope > .reveal', g), ['left', 'right']));
    fxs($$('.p-facts > li'), ['flip']);
    fxs($$('.weeks > li'), ['drop']);
    fxs($$('.steps > li'), ['left']);
    fxs($$('.limits > li'), ['right']);
    fxs($$('.more > a'), ['scatter']);
    fxs($$('.tbl-wrap.reveal, .term.reveal'), ['rise']);
    $$('.feat-grid > .reveal[data-fx="iris"]').forEach((el, i) => {
      el.style.setProperty('--ox', i % 2 ? '100%' : '0%');
      el.style.setProperty('--oy', i % 2 ? '100%' : '0%');
    });
    $$('[data-fx="scatter"]').forEach((el, i) => {
      const side = i % 2 ? 1 : -1;
      el.style.setProperty('--sx', (side * rnd(40, 140)).toFixed(0) + 'px');
      el.style.setProperty('--sy', rnd(60, 160).toFixed(0) + 'px');
      el.style.setProperty('--r', (side * rnd(6, 14)).toFixed(1) + 'deg');
    });
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
    // öne çıkan sayılar: düz tam sayılar sayarak, diğerleri karışık harflerle gelir
    facts: $$(':scope > b', el.matches('.p-facts > li') ? el : document.createElement('i')),
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
        r.facts.forEach((b) => {
          if (b.dataset.num == null) return;
          b.textContent = Math.round(+b.dataset.num * easeOut(clamp(p / 0.7)));
        });
      }
      if (p > 0.15 && !r.shown) {
        r.shown = true;
        r.nums.forEach((n) => scramble(n, n.dataset.n || (n.dataset.n = n.textContent), 700, '0123456789'));
        r.facts.forEach((b) => { if (b.dataset.num == null) scramble(b, b.textContent, 900); });
      } else if (p < 0.02) r.shown = false;
    }
    revealDirty = moving;
  };
  const markFacts = () => revs.forEach((r) => r.facts.forEach((b) => {
    if (/^\d+$/.test(b.textContent.trim()) && !b.hasAttribute('data-i18n')) b.dataset.num = b.textContent.trim();
  }));
  markFacts();
  if (reduce) {
    revs.forEach((r) => { r.el.style.setProperty('--p', '1'); r.el.classList.add('in'); });
    revealTick = () => {};
  } else {
    measureReveals();
    onLang(() => { revs.forEach((r) => { r.set = -1; }); revealDirty = true; });
    new ResizeObserver(measureReveals).observe(document.body);
  }

  // ------------------------------------------------------------ ana döngü
  let rx = 0, ry = 0, gx = innerWidth / 2, gy = innerHeight / 3, running = true;
  function frame(time) {
    if (lenis) lenis.raf(time);
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
      if (heroFig && sy < innerHeight * 1.2) {
        const tx = mx > -999 ? (my / innerHeight - 0.5) * -8 : 0;
        const ty = mx > -999 ? (mx / innerWidth - 0.5) * 12 : 0;
        rx += (tx - rx) * 0.06; ry += (ty - ry) * 0.06;
        heroFig.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        heroFig.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      }
    }
    if (running) requestAnimationFrame(frame);
  }
  addEventListener('scroll', () => { dirty = true; revealDirty = true; }, { passive: true });
  addEventListener('resize', () => { resizeFx(); moveInd(); measureReveals(); dirty = true; if (reduce) drawFx(false); });
  document.addEventListener('visibilitychange', () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) requestAnimationFrame(frame);
  });
  readFx();
  resizeFx();
  if (document.fonts) document.fonts.ready.then(() => { moveInd(); measureReveals(); });
  if (reduce) drawFx(false);
  requestAnimationFrame(frame);
})();
