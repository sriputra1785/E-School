import { supabase } from '../js/supabase.js';

export async function render(el, sub) {
  if (sub === 'add') return renderAdd(el);
  const { data, error } = await supabase.from('students').select('*').order('id', { ascending: false });
  if (error) return el.innerHTML = `<div class="panel">${error.message}</div>`;
  el.innerHTML = `<div class="panel"><table><tr><th>ชื่อ</th><th>ห้อง</th></tr>
    ${data.map(s => `<tr><td>${s.full_name}</td><td>${s.class_name ?? ''}</td></tr>`).join('')}</table></div>`;
}

function renderAdd(el) {
  el.innerHTML = `<div class="panel">
    <input id="n" placeholder="ชื่อ-สกุล"> <input id="c" placeholder="ห้อง">
    <button class="primary" id="save">บันทึก</button></div>`;
  el.querySelector('#save').onclick = async () => {
    const { error } = await supabase.from('students')
      .insert({ full_name: el.querySelector('#n').value, class_name: el.querySelector('#c').value });
    if (error) return alert(error.message);
    location.hash = '#/students/list';
  };
}
