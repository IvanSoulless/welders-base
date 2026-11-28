
  const I18N = {
    ru: {
      adminSignIn: "Вход администратора",
      uploadFiles: "Добавить PNG",
      localImport: "Импорт: подписи доступны только в этой вкладке.",
      role: "Роль",
      member: "Сотрудник",
      admin: "Администратор",
      password: "Пароль",
      remember: "Запомнить меня",
      signIn: "Войти",
      signOut: "Выйти",
      refresh: "Обновить общую базу",
      excel: "Копировать в Excel",
      publish: "Опубликовать импорт",
      revoke: "Завершить все сеансы",
      signature: "Подпись",
      stampColumn: "Клеймо",
      nameColumn: "ФИО",
      expired: "Сеанс завершён. Войдите снова.",
      syncError: "Не удалось обновить общую базу. Повторите попытку.",
      unavailable: "Сервис недоступен.",
      offline: "Требуется подключение к сети.",
      rateLimited: "Слишком много попыток. Подождите минуту.",
      badPassword: "Неверный пароль.",
      logoutError: "Не удалось завершить сеанс.",
      logoutOffline: "Не удалось завершить сеанс. Проверьте подключение.",
      confirmRevoke: "Завершить сеансы всех пользователей?",
      invalidFile: "Требуется PNG до 1,9 МБ с именем «клеймо - ФИО.png».",
      invalidPng: "Недопустимое изображение PNG.",
      confirmPublish: "Опубликовать локальные изменения в общей базе?",
      publishConflict: "Общая база изменилась. Обновите её и повторите публикацию.",
      publishError: "Не удалось опубликовать импорт.",
      cropLimit: "Обрезанная подпись превышает 1,9 МБ.",
      clipboardError: "Буфер обмена недоступен.",
      title: 'База клейм сварщиков',
      uploadBtn: '📁 Добавить свою папку',
      removeBg: 'Вырезать белый фон (прозрачный PNG)',
      whiteThreshold: 'Порог белого:',
      onlyBlue: 'Оставить только синие чернила (убрать чёрные рамки)',
      blueStrength: 'Синева:',
      searchPlaceholder: 'Клеймо или фамилия (можно списком: 9T47, E5L8, Иванов)...',
      initMem: 'Загрузка базы...',
      emptyDb: 'База пуста. Выбери папку с файлами «Клеймо - ФИО.png»',
      serverLoaded: (n) => `Общая база сайта: ${n} сварщиков`,
      inMemory: (n, dt) => `Объединённая база в памяти: ${n} сварщиков${dt ? ` (от ${dt})` : ''}`,
      savedToMem: (n) => `Объединено в текущей вкладке: ${n} сварщиков`,
      resetServer: 'Вернуть исходную базу сайта',
      noValidFiles: 'Не найдено ни одного корректного файла',
      errToggle: (n) => `⚠️ Ошибки в именах (${n})`,
      errBoxTitle: 'Проблемные файлы (проверь имена):',
      errNotImg: (f) => `«${f}» — не картинка (пропущен)`,
      errNoDash: (f) => `«${f}» — нет дефиса между клеймом и ФИО`,
      errEmpty: (f) => `«${f}» — пустое клеймо или ФИО`,
      errDup: (s, f1, f2) => `Дубль клейма «${s}»: «${f1}» и «${f2}»`,
      notFound: 'Совпадений не найдено',
      fullNameBtn: 'ФИО полностью',
      bgTransparentHint: 'Прозрачный фон (клик по подписи — увеличить)',
      bgWhiteHint: 'Белый фон (клик по подписи — увеличить)',
      zoomBtn: '🔍 Увеличить',
      cropBtn: '✂️ Подрезать',
      copyPng: 'Копировать подпись (PNG)',
      cropTitle: 'Выдели мышкой область подписи (лишние края обрежутся и сохранятся локально)',
      cancel: 'Отмена',
      saveCrop: 'Сохранить обрезку',
      close: 'Закрыть',
      toastCopiedText: (t) => `Скопировано: ${t}`,
      toastCopiedPng: 'Подпись скопирована в буфер (PNG)',
      toastCropped: 'Обрезка сохранена!'
    },
    en: {
      adminSignIn: "Admin sign-in",
      uploadFiles: "Add PNG files",
      localImport: "Imported signatures are available in this tab only.",
      role: "Role",
      member: "Staff",
      admin: "Administrator",
      password: "Password",
      remember: "Remember me",
      signIn: "Sign in",
      signOut: "Sign out",
      refresh: "Refresh shared database",
      excel: "Copy to Excel",
      publish: "Publish import",
      revoke: "End all sessions",
      signature: "Signature",
      stampColumn: "Stamp",
      nameColumn: "Full name",
      expired: "Session ended. Sign in again.",
      syncError: "Could not refresh the shared database. Try again.",
      unavailable: "Service unavailable.",
      offline: "An internet connection is required.",
      rateLimited: "Too many attempts. Wait a minute.",
      badPassword: "Incorrect password.",
      logoutError: "Could not end the session.",
      logoutOffline: "Could not end the session. Check your connection.",
      confirmRevoke: "End all user sessions?",
      invalidFile: "Use a PNG up to 1.9 MB named “Stamp - Full Name.png”.",
      invalidPng: "Invalid PNG image.",
      confirmPublish: "Publish local changes to the shared database?",
      publishConflict: "The shared database changed. Refresh it and try publishing again.",
      publishError: "Could not publish the import.",
      cropLimit: "The cropped signature exceeds 1.9 MB.",
      clipboardError: "Clipboard unavailable.",
      title: 'Welder Stamp Database',
      uploadBtn: '📁 Add Custom Folder',
      removeBg: 'Remove white background (transparent PNG)',
      whiteThreshold: 'White threshold:',
      onlyBlue: 'Keep blue ink only (remove black table borders)',
      blueStrength: 'Blue level:',
      searchPlaceholder: 'Stamp or full name (batch supported: 9T47, E5L8, Smith)...',
      initMem: 'Loading database...',
      emptyDb: 'Database is empty. Select a folder with "Stamp - Full Name.png" files',
      serverLoaded: (n) => `Site database loaded: ${n} welders`,
      inMemory: (n, dt) => `Merged database in browser: ${n} welders${dt ? ` (${dt})` : ''}`,
      savedToMem: (n) => `Merged in this tab: ${n} welders`,
      resetServer: 'Restore original site database',
      noValidFiles: 'No valid image files found',
      errToggle: (n) => `⚠️ Filename errors (${n})`,
      errBoxTitle: 'Problematic files (check filenames):',
      errNotImg: (f) => `"${f}" — not an image (skipped)`,
      errNoDash: (f) => `"${f}" — missing dash between stamp and name`,
      errEmpty: (f) => `"${f}" — empty stamp or name`,
      errDup: (s, f1, f2) => `Duplicate stamp "${s}": "${f1}" and "${f2}"`,
      notFound: 'No matches found',
      fullNameBtn: 'Full Name',
      bgTransparentHint: 'Transparent background (click signature to zoom)',
      bgWhiteHint: 'White background (click signature to zoom)',
      zoomBtn: '🔍 Zoom',
      cropBtn: '✂️ Crop',
      copyPng: 'Copy Signature (PNG)',
      cropTitle: 'Drag mouse to select signature area (edges will be cropped and saved)',
      cancel: 'Cancel',
      saveCrop: 'Save Crop',
      close: 'Close',
      toastCopiedText: (t) => `Copied: ${t}`,
      toastCopiedPng: 'Signature copied to clipboard (PNG)',
      toastCropped: 'Crop saved!'
    },
    tr: {
      adminSignIn: "Yönetici girişi",
      uploadFiles: "PNG dosyaları ekle",
      localImport: "İçe aktarılan imzalar yalnızca bu sekmede kullanılabilir.",
      role: "Rol",
      member: "Çalışan",
      admin: "Yönetici",
      password: "Parola",
      remember: "Beni hatırla",
      signIn: "Giriş yap",
      signOut: "Çıkış yap",
      refresh: "Ortak veritabanını yenile",
      excel: "Excel için kopyala",
      publish: "İçe aktarılanları yayımla",
      revoke: "Tüm oturumları sonlandır",
      signature: "İmza",
      stampColumn: "Damga",
      nameColumn: "Ad soyad",
      expired: "Oturum sona erdi. Yeniden giriş yapın.",
      syncError: "Ortak veritabanı yenilenemedi. Tekrar deneyin.",
      unavailable: "Hizmete ulaşılamıyor.",
      offline: "İnternet bağlantısı gerekiyor.",
      rateLimited: "Çok fazla deneme yapıldı. Bir dakika bekleyin.",
      badPassword: "Parola yanlış.",
      logoutError: "Oturum sonlandırılamadı.",
      logoutOffline: "Oturum sonlandırılamadı. Bağlantınızı kontrol edin.",
      confirmRevoke: "Tüm kullanıcı oturumları sonlandırılsın mı?",
      invalidFile: "En fazla 1,9 MB boyutunda “Damga - Ad Soyad.png” adlı bir PNG kullanın.",
      invalidPng: "Geçersiz PNG görseli.",
      confirmPublish: "Yerel değişiklikler ortak veritabanında yayımlansın mı?",
      publishConflict: "Ortak veritabanı değişti. Yenileyip tekrar yayımlamayı deneyin.",
      publishError: "İçe aktarılanlar yayımlanamadı.",
      cropLimit: "Kırpılan imza 1,9 MB sınırını aşıyor.",
      clipboardError: "Panoya erişilemiyor.",
      title: 'Kaynakçı Damga Veritabanı',
      uploadBtn: '📁 Özel Klasör Ekle',
      removeBg: 'Beyaz arka planı kaldır (şeffaf PNG)',
      whiteThreshold: 'Beyaz eşiği:',
      onlyBlue: 'Sadece mavi mürekkebi tut (siyah çizgileri sil)',
      blueStrength: 'Mavi tonu:',
      searchPlaceholder: 'Damga veya ad soyad (toplu arama: 9T47, E5L8, Yılmaz)...',
      initMem: 'Veritabanı yükleniyor...',
      emptyDb: 'Veritabanı boş. "Damga - Ad Soyad.png" dosyalarını içeren klasörü seçin',
      serverLoaded: (n) => `Site veritabanı yüklendi: ${n} kaynakçı`,
      inMemory: (n, dt) => `Birleştirilmiş yerel veritabanı: ${n} kaynakçı${dt ? ` (${dt})` : ''}`,
      savedToMem: (n) => `Bu sekmede birleştirildi: ${n} kaynakçı`,
      resetServer: 'Orijinal site veritabanına dön',
      noValidFiles: 'Geçerli resim dosyası bulunamadı',
      errToggle: (n) => `⚠️ Dosya adı hataları (${n})`,
      errBoxTitle: 'Hatalı dosyalar (isimleri kontrol edin):',
      errNotImg: (f) => `"${f}" — resim değil (atlandı)`,
      errNoDash: (f) => `"${f}" — damga ve isim arasında tire (-) yok`,
      errEmpty: (f) => `"${f}" — boş damga veya isim`,
      errDup: (s, f1, f2) => `Mükerrer damga "${s}": "${f1}" ve "${f2}"`,
      notFound: 'Eşleşme bulunamadı',
      fullNameBtn: 'Tam Adı',
      bgTransparentHint: 'Şeffaf arka plan (büyütmek için imzaya tıklayın)',
      bgWhiteHint: 'Beyaz arka plan (büyütmek için imzaya tıklayın)',
      zoomBtn: '🔍 Büyüt',
      cropBtn: '✂️ Kırp',
      copyPng: 'İmzayı Kopyala (PNG)',
      cropTitle: 'İmza alanını fareyle seçin (fazlalıklar kırpılıp kaydedilecek)',
      cancel: 'İptal',
      saveCrop: 'Kırpmayı Kaydet',
      close: 'Kapat',
      toastCopiedText: (t) => `Kopyalandı: ${t}`,
      toastCopiedPng: 'İmza panoya kopyalandı (PNG)',
      toastCropped: 'Kırpma kaydedildi!'
    }
  };

  let currentLang = Object.hasOwn(I18N, localStorage.getItem('welders_lang')) ? localStorage.getItem('welders_lang') : 'ru';
  let lastStatusState = { type: 'init', count: 0, date: '' };
  let currentErrorsList = [];

  const translate = key => I18N[currentLang][key];
  let accessMessage = '';
  let accountMessage = '';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = I18N[lang].title;
    localStorage.setItem('welders_lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const selected = btn.dataset.lang === lang;
      btn.classList.toggle('active', selected);
      btn.setAttribute('aria-pressed', selected);
    });

    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'signature' && el.dataset.signatureTitle) return;
      if (typeof dict[key] === 'string') el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (typeof dict[key] === 'string') el.placeholder = dict[key];
    });

    accessStatus(accessMessage);
    accountStatus(accountMessage);
    updateStatusText();
    renderErrors(currentErrorsList);
    handleSearchInput();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  function updateStatusText() {
    const dict = I18N[currentLang];
    const st = document.getElementById('statusText');
    if (lastStatusState.type === 'init') st.textContent = dict.initMem;
    else if (lastStatusState.type === 'empty') st.textContent = dict.emptyDb;
    else if (lastStatusState.type === 'server') st.textContent = dict.serverLoaded(lastStatusState.count);
    else if (lastStatusState.type === 'memory') st.textContent = dict.inMemory(lastStatusState.count, lastStatusState.date);
    else if (lastStatusState.type === 'saved') st.textContent = dict.savedToMem(lastStatusState.count);
    else if (lastStatusState.type === 'novalid') st.textContent = dict.noValidFiles;
  }


  let weldersList = [];
  let activeSugIndex = -1;
  let role = 'visitor';
  let sharedRecords = [];
  const localRecords = new Map();
  let revisionTag;
  let syncCounter = 0;
  let syncing = false;
  let publishing = false;
  let lastActivity = Date.now();
  for (const event of ['pointerdown', 'keydown']) window.addEventListener(event, () => { lastActivity = Date.now(); });
  const element = id => document.getElementById(id);
  const setStatus = (id, key) => { element(id).textContent = key ? translate(key) : ''; };
  const accessStatus = key => { accessMessage = key; setStatus('accessStatus', key); };
  const accountStatus = key => { accountMessage = key; setStatus('accountStatus', key); };
  const api = async (path, options) => {
    const res = await fetch(path, { ...options, cache: 'no-store' });
    if (res.status === 401 && path !== '/api/login' && role === 'admin') leaveAdmin('expired');
    return res;
  };

  function updateAdminControls() {
    const admin = role === 'admin';
    for (const id of ['publish', 'revoke', 'logout']) element(id).hidden = !admin;
    element('showAdmin').hidden = admin;
    element('access').hidden = true;
  }

  function leaveAdmin(message = '') {
    role = 'visitor';
    syncCounter++;
    updateAdminControls();
    accountStatus(message);
  }

  function applyOverlay() {
    const merged = new Map(sharedRecords.map(record => [record.stamp, record]));
    for (const [stamp, record] of localRecords) merged.set(stamp, record);
    weldersList = [...merged.values()].sort((a, b) => a.stamp.localeCompare(b.stamp));
    lastStatusState = { type: localRecords.size ? 'saved' : 'server', count: weldersList.length };
    element('resetToServerBtn').style.display = localRecords.size ? 'inline' : 'none';
    enableSearch();
  }

  async function synchronize() {
    if (syncing || publishing || !role) return;
    syncing = true;
    const counter = syncCounter;
    try {
      if (role === 'admin') {
        const session = await api(Date.now() - lastActivity < 120_000 ? '/api/session?renew=1' : '/api/session');
        if (!session.ok && session.status !== 401) throw new Error();
        if (counter !== syncCounter) return;
      }
      const res = await api('/api/catalog');
      if (!res.ok) throw new Error();
      const keys = await res.json();
      if (counter !== syncCounter || !role) return;
      if (revisionTag !== res.headers.get('ETag')) {
        sharedRecords = keys.map(key => {
          const record = parseSignature(key);
          return record && { ...record, url: '/api/signature/' + key.split('/').map(encodeURIComponent).join('/') };
        }).filter(Boolean);
        revisionTag = res.headers.get('ETag');
        applyOverlay();
        handleSearchInput();
      }
      accountStatus('');
    } catch {
      if (role) accountStatus('syncError');
    } finally {
      syncing = false;
      if (role && counter !== syncCounter) synchronize();
    }
  }

  function resetToServerDB() {
    localRecords.clear();
    renderErrors([]);
    applyOverlay();
    handleSearchInput();
    synchronize();
  }

  window.addEventListener('DOMContentLoaded', async () => {
    setLanguage(currentLang);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    synchronize();
    try {
      const res = await fetch('/api/session', { cache: 'no-store' });
      if (res.ok && (await res.json()).role === 'admin') {
        role = 'admin';
        updateAdminControls();
      }
    } catch { /* Public access works independently of admin login. */ }
  });

  element('showAdmin').onclick = () => {
    accessStatus('');
    element('access').hidden = false;
    element('login').elements.password.focus();
  };
  element('cancelAdmin').onclick = () => {
    element('login').elements.password.value = '';
    element('access').hidden = true;
  };

  element('login').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const button = form.querySelector('button');
    button.disabled = true;
    try {
      const res = await api('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: values.get('password'), role: 'admin', remember: values.has('remember') }) });
      if (res.ok) {
        role = 'admin';
        updateAdminControls();
      }
      else accessStatus(res.status === 429 ? 'rateLimited' : res.status === 401 ? 'badPassword' : 'unavailable');
    } catch {
      accessStatus('offline');
    } finally {
      form.elements.password.value = '';
      button.disabled = false;
    }
  });

  async function endSession(path) {
    try {
      const res = await api(path, { method: 'POST' });
      if (res.ok) leaveAdmin();
      else if (role) accountStatus('logoutError');
    } catch {
      accountStatus('logoutOffline');
    }
  }

  element('logout').onclick = () => endSession('/api/logout');
  element('revoke').onclick = () => {
    if (confirm(translate('confirmRevoke'))) endSession('/api/admin/revoke');
  };
  element('refresh').onclick = synchronize;
  window.addEventListener('focus', () => { lastActivity = Date.now(); synchronize(); });
  window.addEventListener('online', synchronize);
  setInterval(() => {
    if (!document.hidden) synchronize();
  }, 60_000);

  async function importSignatures(event) {
    const input = event.currentTarget;
    const files = [...input.files];
    const counter = syncCounter;
    input.value = '';
    if (!role || publishing || !files.length) return;
    const errors = [];
    const records = new Map();
    for (const file of files) {
      if (file.name.startsWith('.')) continue;
      const record = parseSignature(file.name);
      if (!record || file.size > 1_900_000) {
        errors.push({ code: 'invalidFile', file: file.name });
        continue;
      }
      try {
        const image = await createImageBitmap(file);
        const valid = image.width * image.height <= 16_000_000 &&
          [...new Uint8Array(await file.slice(0, 8).arrayBuffer())].join() === '137,80,78,71,13,10,26,10';
        image.close();
        if (!valid) throw new Error();
      } catch {
        errors.push({ code: 'invalidPng', file: file.name });
        continue;
      }
      if (records.has(record.stamp)) {
        errors.push({ code: 'dup', stamp: record.stamp, f1: file.name, f2: records.get(record.stamp).key });
        continue;
      }
      records.set(record.stamp, { ...record, blob: file });
    }
    if (!role || counter !== syncCounter) return;
    for (const [stamp, record] of records) localRecords.set(stamp, record);
    renderErrors(errors);
    applyOverlay();
    handleSearchInput();
    if (records.size) accountStatus('localImport');
  }
  for (const id of ['folderInput', 'signatureInput']) element(id).addEventListener('change', importSignatures);

  element('publish').onclick = async () => {
    if (publishing || syncing || role !== 'admin' || !revisionTag || !localRecords.size) return;
    if (!confirm(translate('confirmPublish'))) return;
    publishing = true;
    element('publish').disabled = true;
    const counter = syncCounter;
    const version = crypto.randomUUID();
    const changes = [...localRecords];
    const catalog = new Map(sharedRecords.map(record => [record.stamp, record.key]));
    try {
      for (const [stamp, record] of changes) {
        if (!role || counter !== syncCounter) return;
        const key = version + '/' + stamp + ' - ' + record.fio + '.png';
        const upload = await api('/api/signature/' + encodeURIComponent(key), { method: 'PUT', body: record.blob });
        if (!upload.ok) throw new Error();
        catalog.set(stamp, key);
      }
      if (!role || counter !== syncCounter) return;
      const published = await api('/api/catalog', { method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'If-Match': revisionTag },
        body: JSON.stringify([...catalog.values()]) });
      if (!published.ok) {
        accountStatus(published.status === 409 ? 'publishConflict' : 'publishError');
        return;
      }
      for (const [stamp, record] of changes) if (localRecords.get(stamp) === record) localRecords.delete(stamp);
      revisionTag = null;
      publishing = false;
      await synchronize();
    } catch {
      if (role) accountStatus('publishError');
    } finally {
      publishing = false;
      element('publish').disabled = false;
    }
  };

  element('excel').onclick = () => copyText(excelRows(element('searchInput').value.trim() ? displayedRecords : weldersList,
    [translate('stampColumn'), translate('nameColumn')]));


  function enableSearch() {
    const input = document.getElementById('searchInput');
    const status = document.getElementById('statusText');
    input.disabled = false;
    updateStatusText();
    status.style.color = '#4ade80';
  }

  function renderErrors(errors) {
    currentErrorsList = errors || [];
    const dict = I18N[currentLang];
    const toggle = document.getElementById('errToggle');
    const box = document.getElementById('errorsBox');
    const list = document.getElementById('errorsList');

    if (currentErrorsList.length > 0) {
      toggle.style.display = 'inline';
      toggle.textContent = dict.errToggle(currentErrorsList.length);
      list.innerHTML = currentErrorsList.map(err => {
        if (err.code === 'invalidFile' || err.code === 'invalidPng') return '<li>' + escapeHTML(err.file + ': ' + translate(err.code)) + '</li>';
        if (typeof err === 'string') return `<li>${escapeHTML(err)}</li>`;
        if (err.code === 'notImg') return `<li>${escapeHTML(dict.errNotImg(err.file))}</li>`;
        if (err.code === 'noDash') return `<li>${escapeHTML(dict.errNoDash(err.file))}</li>`;
        if (err.code === 'empty') return `<li>${escapeHTML(dict.errEmpty(err.file))}</li>`;
        if (err.code === 'dup') return `<li>${escapeHTML(dict.errDup(err.stamp, err.f1, err.f2))}</li>`;
        return '';
      }).join('');
    } else {
      toggle.style.display = 'none';
      box.style.display = 'none';
    }
  }

  document.getElementById('errToggle').addEventListener('click', () => {
    const box = document.getElementById('errorsBox');
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
  });

  async function getWelderBlob(w) {
    if (w.blob) return w.blob;
    if (w.url) {
      const res = await api(w.url);
      return res.ok ? res.blob() : null;
    }
    return null;
  }

  async function processSignatureImage(welder, removeBg, threshold, onlyBlue, blueMinDiff) {
    const blob = await getWelderBlob(welder);
    if (!blob) return '';

    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        if (removeBg || onlyBlue) {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];

            if (removeBg && r >= threshold && g >= threshold && b >= threshold) {
              data[i + 3] = 0;
              continue;
            }

            if (onlyBlue) {
              const blueDominance = b - Math.max(r, g);
              if (blueDominance < blueMinDiff) {
                if (removeBg) {
                  data[i + 3] = 0;
                } else {
                  data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
                }
              }
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }

        resolve(trimTransparentCanvas(canvas));
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(''); };
      img.src = url;
    });
  }

  function trimTransparentCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const data = ctx.getImageData(0, 0, w, h).data;
    let minX = w, minY = h, maxX = 0, maxY = 0, found = false;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (data[(y * w + x) * 4 + 3] > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }

    if (!found) return canvas.toDataURL('image/png');
    const pad = 4;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w - 1, maxX + pad);
    maxY = Math.min(h - 1, maxY + pad);

    const trimmed = document.createElement('canvas');
    trimmed.width = maxX - minX + 1;
    trimmed.height = maxY - minY + 1;
    trimmed.getContext('2d').drawImage(canvas, minX, minY, trimmed.width, trimmed.height, 0, 0, trimmed.width, trimmed.height);
    return trimmed.toDataURL('image/png');
  }

  const removeBgCheck = document.getElementById('removeBgCheck');
  const bgThreshold = document.getElementById('bgThreshold');
  const onlyBlueCheck = document.getElementById('onlyBlueCheck');
  const blueStrength = document.getElementById('blueStrength');

  removeBgCheck.addEventListener('change', () => {
    document.getElementById('thresholdWrap').style.opacity = removeBgCheck.checked ? '1' : '0.4';
    handleSearchInput();
  });
  bgThreshold.addEventListener('input', () => {
    document.getElementById('thresholdVal').textContent = bgThreshold.value;
    handleSearchInput();
  });
  onlyBlueCheck.addEventListener('change', () => {
    document.getElementById('blueWrap').style.opacity = onlyBlueCheck.checked ? '1' : '0.4';
    handleSearchInput();
  });
  blueStrength.addEventListener('input', () => {
    document.getElementById('blueVal').textContent = blueStrength.value;
    handleSearchInput();
  });

  const searchInput = document.getElementById('searchInput');
  const sugBox = document.getElementById('suggestionsBox');

  searchInput.addEventListener('input', () => {
    updateSuggestions();
    handleSearchInput();
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = sugBox.querySelectorAll('.sug-item');
    if (!items.length || sugBox.style.display === 'none') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeSugIndex = (activeSugIndex + 1) % items.length;
      highlightSuggestion(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeSugIndex = (activeSugIndex - 1 + items.length) % items.length;
      highlightSuggestion(items);
    } else if (e.key === 'Enter' && activeSugIndex >= 0) {
      e.preventDefault();
      items[activeSugIndex].click();
    } else if (e.key === 'Escape') {
      sugBox.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) sugBox.style.display = 'none';
  });

  function highlightSuggestion(items) {
    items.forEach((el, idx) => el.classList.toggle('active', idx === activeSugIndex));
  }

  function updateSuggestions() {
    const raw = searchInput.value;
    const tokens = raw.split(/[,;\s]+/);
    const lastToken = tokens[tokens.length - 1].trim().toUpperCase();
    activeSugIndex = -1;

    if (!lastToken) {
      sugBox.style.display = 'none';
      return;
    }

    const matches = weldersList.filter(w =>
      w.stamp.startsWith(lastToken) || normalize(w.fio).includes(normalize(lastToken))
    ).slice(0, 8);

    if (!matches.length) {
      sugBox.style.display = 'none';
      return;
    }

    sugBox.innerHTML = matches.map(m => `
      <div class="sug-item" data-stamp="${escapeHTML(m.stamp)}">
        <span class="sug-stamp">${escapeHTML(m.stamp)}</span>
        <span class="sug-fio">${escapeHTML(m.fio)}</span>
      </div>
    `).join('');

    sugBox.querySelectorAll('.sug-item').forEach(el => {
      el.addEventListener('click', () => {
        const chosenStamp = el.getAttribute('data-stamp');
        const parts = searchInput.value.split(/([,;\s]+)/);
        parts[parts.length - 1] = chosenStamp;
        searchInput.value = parts.join('');
        sugBox.style.display = 'none';
        searchInput.focus();
        handleSearchInput();
      });
    });

    sugBox.style.display = 'block';
  }

  let searchRevision = 0;
  let displayedRecords = [];
  async function handleSearchInput() {
    const revision = ++searchRevision;
    displayedRecords = [];
    const raw = searchInput.value.trim();
    const container = document.getElementById('resultsContainer');
    const emptyMsg = document.getElementById('emptyMsg');
    const dict = I18N[currentLang];

    if (!raw) {
      container.innerHTML = '';
      emptyMsg.style.display = 'none';
      return;
    }

    const matchedWelders = findWelders(weldersList, raw);
    displayedRecords = matchedWelders;

    if (!matchedWelders.length) {
      container.innerHTML = '';
      emptyMsg.style.display = 'block';
      return;
    }

    emptyMsg.style.display = 'none';
    const removeBg = removeBgCheck.checked;
    const threshold = parseInt(bgThreshold.value, 10);
    const onlyBlue = onlyBlueCheck.checked;
    const blueMinDiff = parseInt(blueStrength.value, 10);

    const slice = matchedWelders.slice(0, 20);
    const cardsHtml = await Promise.all(slice.map(async (w, idx) => {
      const dataUrl = await processSignatureImage(w, removeBg, threshold, onlyBlue, blueMinDiff).catch(() => '');
      const shortFio = formatShortFio(w.fio);
      return `
        <div class="welder-card">
          <div class="card-top">
            <div>
              <span class="stamp-badge">${escapeHTML(w.stamp)}</span>
              <span class="fio-title">${escapeHTML(w.fio)}</span>
            </div>
            <div class="btn-group">
              <button data-copy="${escapeHTML(w.fio)}">${dict.fullNameBtn}</button>
              <button data-copy="${escapeHTML(shortFio)}">${escapeHTML(shortFio)}</button>
            </div>
          </div>
          <div class="sig-preview ${removeBg ? '' : 'solid-white'}" data-zoom="img_${idx}" data-title="${escapeHTML(w.stamp + ' — ' + w.fio)}">
            <img id="img_${idx}" src="${dataUrl}" alt="${escapeHTML(dict.signature)} ${escapeHTML(w.stamp)}">
          </div>
          <div class="card-bottom">
            <span class="hint">${removeBg ? dict.bgTransparentHint : dict.bgWhiteHint}</span>
            <div class="btn-group">
              <button data-zoom="img_${idx}" data-title="${escapeHTML(w.stamp + ' — ' + w.fio)}">${dict.zoomBtn}</button>
              <button data-crop="${escapeHTML(w.stamp)}">${dict.cropBtn}</button>
              <button class="primary" onclick="copyPng('img_${idx}')">${dict.copyPng}</button>
            </div>
          </div>
        </div>
      `;
    }));

    if (revision === searchRevision) container.innerHTML = cardsHtml.join('');
  }

  let currentZoom = 1;
  let currentZoomImgId = null;

  function openZoomModal(imgId, titleText) {
    const srcImg = document.getElementById(imgId);
    if (!srcImg) return;
    currentZoomImgId = imgId;
    currentZoom = 1.5;
    const title = document.getElementById('zoomTitle');
    title.textContent = titleText;
    title.dataset.signatureTitle = 'true';
    const zImg = document.getElementById('zoomImg');
    zImg.src = srcImg.src;
    const viewport = document.getElementById('zoomViewport');
    viewport.classList.toggle('solid-white', !removeBgCheck.checked);
    updateZoomTransform();
    document.getElementById('zoomModal').style.display = 'flex';
  }

  function closeZoomModal() {
    document.getElementById('zoomModal').style.display = 'none';
  }

  function changeZoom(delta) {
    currentZoom = Math.min(5, Math.max(0.5, +(currentZoom + delta).toFixed(2)));
    updateZoomTransform();
  }

  function resetZoom() {
    currentZoom = 1;
    updateZoomTransform();
  }

  function updateZoomTransform() {
    document.getElementById('zoomImg').style.transform = `scale(${currentZoom})`;
    document.getElementById('zoomLevelText').textContent = `${Math.round(currentZoom * 100)}%`;
  }

  document.getElementById('zoomViewport').addEventListener('wheel', (e) => {
    e.preventDefault();
    changeZoom(e.deltaY < 0 ? 0.25 : -0.25);
  }, { passive: false });

  function copyZoomedPng() {
    if (currentZoomImgId) copyPng(currentZoomImgId);
  }

  let cropTargetStamp = null;
  let cropOrigImg = null;
  let isDragging = false, startX = 0, startY = 0, curX = 0, curY = 0;

  async function openCropModal(stamp) {
    const welder = weldersList.find(w => w.stamp === stamp);
    if (!welder) return;
    const counter = syncCounter;
    const blob = await getWelderBlob(welder).catch(() => null);
    if (!blob || counter !== syncCounter) return;

    cropTargetStamp = stamp;
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      if (counter !== syncCounter) { URL.revokeObjectURL(url); return; }
      cropOrigImg = img;
      const canvas = document.getElementById('cropCanvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      startX = 0; startY = 0; curX = canvas.width; curY = canvas.height;
      document.getElementById('cropModal').style.display = 'flex';
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }

  function closeCropModal() {
    document.getElementById('cropModal').style.display = 'none';
  }

  const cropCanvas = document.getElementById('cropCanvas');
  function getCanvasCoords(e) {
    const rect = cropCanvas.getBoundingClientRect();
    const scaleX = cropCanvas.width / rect.width;
    const scaleY = cropCanvas.height / rect.height;
    return {
      x: Math.max(0, Math.min(cropCanvas.width, (e.clientX - rect.left) * scaleX)),
      y: Math.max(0, Math.min(cropCanvas.height, (e.clientY - rect.top) * scaleY))
    };
  }

  cropCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    const pt = getCanvasCoords(e);
    startX = pt.x; startY = pt.y;
    curX = pt.x; curY = pt.y;
  });

  cropCanvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const pt = getCanvasCoords(e);
    curX = pt.x; curY = pt.y;
    const ctx = cropCanvas.getContext('2d');
    ctx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
    ctx.drawImage(cropOrigImg, 0, 0);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);

    const x = Math.min(startX, curX), y = Math.min(startY, curY);
    const w = Math.abs(curX - startX), h = Math.abs(curY - startY);
    ctx.drawImage(cropOrigImg, x, y, w, h, x, y, w, h);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  async function applyCrop() {
    const x = Math.min(startX, curX), y = Math.min(startY, curY);
    const w = Math.abs(curX - startX), h = Math.abs(curY - startY);
    if (!cropOrigImg || publishing || w < 5 || h < 5) { closeCropModal(); return; }

    const out = document.createElement('canvas');
    out.width = w; out.height = h;
    out.getContext('2d').drawImage(cropOrigImg, x, y, w, h, 0, 0, w, h);

    const stamp = cropTargetStamp;
    const counter = syncCounter;
    out.toBlob((newBlob) => {
      if (!newBlob || !role || counter !== syncCounter) return;
      const idx = weldersList.findIndex(item => item.stamp === stamp);
      if (idx !== -1) {
        if (newBlob.size > 1_900_000) { showToast(translate('cropLimit')); closeCropModal(); return; }
        localRecords.set(stamp, { ...weldersList[idx], blob: newBlob });
        applyOverlay();
        handleSearchInput();
        showToast(I18N[currentLang].toastCropped);
      }
      closeCropModal();
    }, 'image/png');
  }

  function formatShortFio(fullFio) {
    const parts = fullFio.trim().split(/\s+/);
    if (parts.length === 3) return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
    if (parts.length === 2) return `${parts[0]} ${parts[1][0]}.`;
    return fullFio;
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1800);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); } catch { showToast(translate('clipboardError')); return; }
    showToast(I18N[currentLang].toastCopiedText(text));
  }

  async function copyPng(imgId) {
    const img = document.getElementById(imgId);
    if (!img?.getAttribute("src")) return;
    const res = await fetch(img.src);
    const blob = await res.blob();
    try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]); } catch { showToast(translate('clipboardError')); return; }
    showToast(I18N[currentLang].toastCopiedPng);
  }

document.getElementById("resultsContainer").addEventListener("click", event => {
  const target = event.target.closest("[data-copy],[data-zoom],[data-crop]");
  if (!target) return;
  if (target.dataset.copy !== undefined) copyText(target.dataset.copy);
  if (target.dataset.zoom) openZoomModal(target.dataset.zoom, target.dataset.title);
  if (target.dataset.crop) openCropModal(target.dataset.crop);
});
