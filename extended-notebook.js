(() => {
  'use strict';

  const toolNames = {
    catcher: '食材掉落菜籃遊戲',
    dice: '幸運骰子',
    flower: '幸運花朵',
    gachagacha: '八角形抽獎機',
    house: '黑暗小屋',
    maze: '都市散步迷宮',
    mole: '打地鼠',
    popsicle: '冰棒抽選',
    poke: '敲敲樂',
    rhythm: '節奏挑戰',
    sky: '天空冒險',
    spiral: '螺旋抽選',
    teeth: '小貓牙齒抽選',
  };
  const topicNames = {
    challenge: '社牛大挑戰',
    draw: '畫畫沒靈感',
    food: '三餐吃什麼',
    gift: '送禮靈感',
    travel: '假日去哪逛',
    outfit: '穿什麼',
  };
  const topicPages = {
    challenge: ['dice', 'house'],
    draw: ['popsicle', 'spiral'],
    food: ['catcher', 'mole', 'sky'],
    gift: ['gachagacha', 'teeth'],
    travel: ['flower', 'maze'],
    outfit: ['poke', 'rhythm'],
  };
  const results = {
    catcher: { target: '#result-summary', gate: '#result-screen', append: true },
    dice: { target: '#finalOption', gate: '#resultBox' },
    flower: { target: '#resultFood', gate: '#resultOverlay' },
    gachagacha: { target: '#resultText', gate: '#resultView' },
    house: { target: '#finalOption', gate: '#result' },
    maze: { target: '#resultPlace', gate: '#resultOverlay' },
    mole: { target: '#winnerName', gate: '#resultOverlay' },
    popsicle: { target: '#stickLabel', gate: '#drawScreen' },
    poke: { target: '#resultText', gate: '#overlay' },
    rhythm: { target: '#winnerName', gate: '#resultOverlay' },
    sky: { target: '#resultValue', gate: '#resultScreen' },
    spiral: { target: '#resultValue', gate: '#resultOverlay' },
    teeth: { target: '#resultOption', gate: '#resultOverlay' },
  };
  const path = location.pathname;
  const scriptUrl = document.currentScript.src;
  const assetUrl = (asset) => new URL(asset, scriptUrl).href;
  const toolMatch = path.match(/\/tool\/(catcher|dice|flower|gachagacha|house|maze|mole|popsicle|poke|rhythm|sky|spiral|teeth)\.html$/);
  const topicMatch = path.match(/\/(challenge|draw|food|gift|travel|outfit)\/\1-(catcher|dice|flower|gachagacha|house|maze|mole|popsicle|poke|rhythm|sky|spiral|teeth)\.html$/);
  const tool = toolMatch?.[1] || topicMatch?.[2];
  const topicFromQuery = toolMatch ? new URLSearchParams(location.search).get('topic') : null;
  const topic = topicMatch?.[1]
    || (topicNames[topicFromQuery] && topicPages[topicFromQuery]?.includes(tool) ? topicFromQuery : null);
  if (!tool || !toolNames[tool]) return;

  const storageKey = `pickme_extended_notebook:${tool}:`;
  let persistentKey;
  const state = { options: [], records: [], remaining: [], noReplacement: false };
  let overlay;
  let dialog;
  let editor;
  let status;
  let records;
  let focusedElement;
  let resultTimer;
  let lastSource = '';
  let lastApplied = '';

  function loadState() {
    let raw;
    try {
      raw = localStorage.getItem(persistentKey);
    } catch (error) {
      console.error('讀取自訂筆記本失敗。', error);
      return;
    }
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      state.options = Array.isArray(saved.options)
        ? saved.options.filter((value) => typeof value === 'string').map((value) => value.trim()).filter(Boolean).slice(0, 100)
        : [];
      state.records = Array.isArray(saved.records) ? saved.records.slice(-100) : [];
      state.noReplacement = saved.noReplacement === true;
      state.remaining = Array.isArray(saved.remaining)
        ? saved.remaining.filter((value) => state.options.includes(value))
        : state.options.slice();
    } catch (error) {
      console.error('讀取自訂筆記本失敗。', error);
      try {
        localStorage.removeItem(persistentKey);
      } catch (removeError) {
        console.error('無法移除損毀的自訂筆記本資料。', removeError);
      }
    }
  }

  function persist() {
    try {
      localStorage.setItem(persistentKey, JSON.stringify(state));
    } catch (error) {
      console.error('儲存自訂筆記本失敗。', error);
      setStatus('儲存失敗，請檢查瀏覽器儲存空間設定。');
    }
  }

  function setStatus(message) {
    status.textContent = message;
  }

  function showToast(message) {
    let toast = document.querySelector('.extended-notebook-toast');
    if (!toast) {
      toast = document.createElement('p');
      toast.className = 'extended-notebook-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function createButton() {
    const actions = document.createElement('div');
    actions.className = 'extended-page-actions';

    if (topic) {
      const favorite = document.createElement('button');
      favorite.className = 'extended-topic-favorite';
      favorite.type = 'button';
      favorite.setAttribute('aria-label', `收藏${topicNames[topic]}`);
      favorite.addEventListener('click', () => {
        if (!window.Auth?.user?.()) {
          const next = `${path.split('/').slice(-2).join('/')}${location.search}${location.hash}`;
          location.href = `../login.html?next=${encodeURIComponent(next)}`;
          return;
        }
        window.Auth.toggleTopicFav(`category-${topic}`);
        updateFavorite();
      });
      window.addEventListener('storage', updateFavorite);
      actions.appendChild(favorite);
      updateFavorite();

      function updateFavorite() {
        const saved = Boolean(window.Auth?.user?.()
          && window.Auth.favs().includes(`topic:category-${topic}`));
        favorite.classList.toggle('is-saved', saved);
        favorite.setAttribute('aria-pressed', String(saved));
        favorite.textContent = saved ? '★ 已收藏主題' : '☆ 收藏主題';
      }
    }

    const customize = document.createElement('button');
    customize.className = 'extended-notebook-button';
    customize.type = 'button';
    customize.setAttribute('aria-label', `開啟${toolNames[tool]}自訂筆記本`);
    customize.innerHTML = '<span aria-hidden="true">✎</span><span>自訂</span>';
    customize.addEventListener('click', openNotebook);
    actions.appendChild(customize);
    document.body.appendChild(actions);
  }

  function createNotebook() {
    overlay = document.createElement('div');
    overlay.className = 'extended-notebook-overlay';
    overlay.hidden = true;
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeNotebook();
    });

    dialog = document.createElement('section');
    dialog.className = 'extended-notebook';
    dialog.tabIndex = -1;
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'extended-notebook-title');
    dialog.addEventListener('click', (event) => event.stopPropagation());
    dialog.innerHTML = `
      <button class="extended-notebook-close" type="button" aria-label="關閉筆記本">×</button>
      <header class="extended-notebook-header">
        <span>PICKME / NOTEBOOK</span>
        <h2 id="extended-notebook-title">${toolNames[tool]}</h2>
        <p>自訂選項筆記本</p>
      </header>
      <nav class="extended-notebook-tabs" aria-label="筆記本頁面">
        <button type="button" class="is-active" data-page="options">選項編輯</button>
        <button type="button" data-page="records">抽取記錄</button>
        <button type="button" data-page="settings">其他設定</button>
      </nav>
      <section class="extended-notebook-page is-active" data-page-panel="options">
        <p class="extended-notebook-help">每行輸入一個自訂結果；留白時會沿用遊戲原有結果。</p>
        <label class="extended-notebook-label" for="extendedNotebookOptions">自訂抽選結果</label>
        <textarea id="extendedNotebookOptions" rows="8" maxlength="5000" placeholder="例如：選項一&#10;選項二&#10;選項三"></textarea>
        <button class="extended-notebook-save" type="button">儲存選項</button>
      </section>
      <section class="extended-notebook-page" data-page-panel="records">
        <p class="extended-notebook-help">遊戲結算結果會記錄在這裡。</p>
        <ol class="extended-notebook-records"></ol>
        <button class="extended-notebook-clear" type="button">清除記錄</button>
      </section>
      <section class="extended-notebook-page" data-page-panel="settings">
        <label class="extended-notebook-switch">
          <span><strong>抽取後不放回</strong><small>自訂結果抽過後暫不重複。</small></span>
          <input type="checkbox">
        </label>
        <button class="extended-notebook-refill" type="button">補回所有抽取選項</button>
      </section>
      <p class="extended-notebook-status" aria-live="polite"></p>`;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    editor = dialog.querySelector('#extendedNotebookOptions');
    status = dialog.querySelector('.extended-notebook-status');
    records = dialog.querySelector('.extended-notebook-records');

    dialog.querySelector('.extended-notebook-close').addEventListener('click', closeNotebook);
    dialog.querySelectorAll('.extended-notebook-tabs button').forEach((tab) => {
      tab.addEventListener('click', () => showPage(tab.dataset.page));
    });
    dialog.querySelector('.extended-notebook-save').addEventListener('click', () => {
      state.options = editor.value.split(/\r?\n/).map((value) => value.trim()).filter(Boolean).slice(0, 100);
      state.remaining = state.options.slice();
      persist();
      setStatus(state.options.length
        ? `已儲存 ${state.options.length} 個自訂結果。`
        : '已清除自訂選項，將沿用遊戲原有結果。');
    });
    dialog.querySelector('.extended-notebook-clear').addEventListener('click', () => {
      state.records = [];
      persist();
      renderRecords();
      setStatus('已清除抽取記錄。');
    });
    dialog.querySelector('.extended-notebook-switch input').checked = state.noReplacement;
    dialog.querySelector('.extended-notebook-switch input').addEventListener('change', (event) => {
      state.noReplacement = event.currentTarget.checked;
      state.remaining = state.options.slice();
      persist();
      setStatus(state.noReplacement ? '已開啟抽取後不放回。' : '已關閉抽取後不放回。');
    });
    dialog.querySelector('.extended-notebook-refill').addEventListener('click', () => {
      state.remaining = state.options.slice();
      persist();
      setStatus('已補回所有自訂抽選結果。');
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !overlay.hidden) closeNotebook();
    });
  }

  function showPage(page) {
    dialog.querySelectorAll('.extended-notebook-tabs button').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.page === page);
    });
    dialog.querySelectorAll('.extended-notebook-page').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.pagePanel === page);
    });
    if (page === 'records') renderRecords();
  }

  function renderRecords() {
    records.replaceChildren();
    if (!state.records.length) {
      const empty = document.createElement('li');
      empty.className = 'extended-notebook-empty';
      empty.textContent = '尚無抽取記錄。';
      records.appendChild(empty);
      return;
    }
    state.records.slice().reverse().forEach((record) => {
      const item = document.createElement('li');
      const time = document.createElement('time');
      time.textContent = record.date;
      const result = document.createElement('strong');
      result.textContent = record.result;
      item.append(time, result);
      records.appendChild(item);
    });
  }

  function openNotebook() {
    focusedElement = document.activeElement;
    editor.value = state.options.join('\n');
    overlay.hidden = false;
    document.body.classList.add('extended-notebook-open');
    dialog.focus();
    renderRecords();
  }

  function closeNotebook() {
    overlay.hidden = true;
    document.body.classList.remove('extended-notebook-open');
    focusedElement?.focus();
  }

  function isVisible(element) {
    if (!element || !element.getClientRects().length) return false;
    for (let node = element; node && node !== document.body; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (node.hidden || style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
        return false;
      }
    }
    return true;
  }

  function recordResult(result) {
    state.records.push({
      date: new Intl.DateTimeFormat('zh-TW', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()),
      result,
    });
    if (state.records.length > 100) state.records.splice(0, state.records.length - 100);
    persist();
  }

  function chooseOption(original) {
    if (!state.options.length) return original;
    const pool = state.noReplacement ? state.remaining : state.options;
    if (!pool.length) {
      const message = '自訂結果已抽完，請開啟筆記本補回選項。';
      setStatus(message);
      showToast(message);
      return original;
    }
    const index = Math.floor(Math.random() * pool.length);
    const [selected] = state.noReplacement ? pool.splice(index, 1) : [pool[index]];
    return selected;
  }

  function applyResult() {
    const result = results[tool];
    const target = document.querySelector(result.target);
    const gate = document.querySelector(result.gate);
    if (!target || !isVisible(gate)) {
      lastSource = '';
      lastApplied = '';
      return;
    }
    const original = target.textContent.trim();
    if (!original || original === lastApplied || original === lastSource) return;
    lastSource = original;
    const selected = chooseOption(original);
    const display = result.append && selected !== original
      ? `${original}；自訂結果：${selected}`
      : selected;
    lastApplied = display;
    if (display !== original) target.textContent = display;
    recordResult(display);
  }

  function observeResults() {
    const result = results[tool];
    const target = document.querySelector(result.target);
    const gate = document.querySelector(result.gate);
    if (!target || !gate) {
      console.error(`找不到「${toolNames[tool]}」的結果欄位，自訂結果不會套用。`);
      return;
    }
    new MutationObserver(() => {
      window.clearTimeout(resultTimer);
      resultTimer = window.setTimeout(applyResult, 220);
    }).observe(document.body, {
      childList: true,
      characterData: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['class', 'style', 'hidden'],
    });
  }

  function initialize() {
    loadState();
    createNotebook();
    createButton();
    observeResults();
  }

  function initializeWithAuth() {
    if (window.Auth) {
      const user = window.Auth.user?.();
      persistentKey = `${storageKey}${user?.email ? encodeURIComponent(user.email) : 'guest'}`;
      initialize();
      return;
    }
    const authScript = document.createElement('script');
    authScript.src = assetUrl('auth.js');
    authScript.addEventListener('load', () => {
      const user = window.Auth?.user?.();
      persistentKey = `${storageKey}${user?.email ? encodeURIComponent(user.email) : 'guest'}`;
      initialize();
    }, { once: true });
    authScript.addEventListener('error', () => {
      console.error('無法載入登入狀態，自訂筆記本將以訪客模式啟動。');
      persistentKey = `${storageKey}guest`;
      initialize();
    }, { once: true });
    document.body.appendChild(authScript);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWithAuth, { once: true });
  } else {
    initializeWithAuth();
  }
})();
