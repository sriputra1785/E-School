import { MENUS } from './menus.js';
const $ = s => document.querySelector(s);
const view = $('#view'), subnav = $('#subnav'), title = $('#title');

$('#btn-back').onclick = () => history.length > 1 ? history.back() : (location.hash = '#/');
$('#btn-home').onclick = () => (location.hash = '#/');

function renderHome() {
  view.innerHTML = `<div class="grid">${MENUS.map(m =>
    `<a class="card" href="#/${m.id}"><span class="ico">${m.icon}</span><b>${m.title}</b></a>`).join('')}</div>`;
}

async function route() {
  const [mId, sId] = location.hash.replace(/^#\/?/, '').split('/');
  const menu = MENUS.find(m => m.id === mId);
  $('#btn-back').hidden = $('#btn-home').hidden = !menu;
  if (!menu) { title.textContent = 'เมนูหลัก'; subnav.innerHTML = ''; return renderHome(); }

  title.textContent = menu.title;
  const sub = menu.subs?.find(s => s.id === sId) || menu.subs?.[0];
  subnav.innerHTML = (menu.subs || []).map(s =>
    `<a href="#/${menu.id}/${s.id}" class="${s.id === sub.id ? 'active' : ''}">${s.title}</a>`).join('');

  view.innerHTML = 'กำลังโหลด...';
  try {
    const mod = await import(`../menus/${menu.id}.js`);
    await mod.render(view, sub?.id);
  } catch (e) {
    console.error(e);
    view.innerHTML = `<div class="panel">โหลดเมนูไม่สำเร็จ: ${e.message}</div>`;
  }
}
addEventListener('hashchange', route);
route();
