// เพิ่มเมนูใหม่: เพิ่ม object ที่นี่ + สร้างไฟล์ menus/<id>.js
export const MENUS = [
  { id: 'students',   title: 'ข้อมูลนักเรียน', icon: '🎓',
    subs: [ { id: 'list', title: 'รายชื่อ' }, { id: 'add', title: 'เพิ่มนักเรียน' } ] },
  { id: 'attendance', title: 'เช็คชื่อ', icon: '✅' }, // ไม่มี subs = ไม่แสดง navbar
];
