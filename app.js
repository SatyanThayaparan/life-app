'use strict';
const KEY='lifewrapped.entries.v1';
const categories={Fitness:['💪','#c2fc65'],Reading:['📚','#c6a7ff'],Learning:['🧠','#f5a2c4'],Creative:['🎨','#f9c774'],Social:['🫶','#93d9ff'],Wellness:['🌿','#9de0bc'],Other:['✨','#dfc4ff']};
const $=id=>document.getElementById(id);
let entries=load(),period='month';
function load(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value.filter(x=>x&&typeof x.name==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&Number.isFinite(Number(x.minutes))):[]}catch{return []}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(entries));return true}catch{alert('Unable to save. Check browser storage settings.');return false}}
function localDate(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function selected(){const prefix=period==='month'?localDate().slice(0,7):localDate().slice(0,4);return entries.filter(e=>e.date.startsWith(prefix))}
function stats(data){const mins=data.reduce((sum,e)=>sum+Number(e.minutes),0);const days=new Set(data.map(e=>e.date)).size;const counts={};for(const e of data)counts[e.category]=(counts[e.category]||0)+1;return {count:data.length,mins,days,counts,top:Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]}}
function el(tag,cls,txt){const node=document.createElement(tag);if(cls)node.className=cls;if(txt!==undefined)node.textContent=txt;return node}
function render(){const data=selected(),s=stats(data);$('totalActivities').textContent=s.count;$('totalHours').textContent=(s.mins/60).toLocaleString(undefined,{maximumFractionDigits:1});$('activeDays').textContent=s.days;
const breakdown=$('breakdown');breakdown.replaceChildren();const ranked=Object.entries(s.counts).sort((a,b)=>b[1]-a[1]);if(!ranked.length)breakdown.append(el('p','empty','Nothing logged yet. Add your first moment to see your breakdown.'));for(const [category,count] of ranked){const item=el('div','breakdown-item'),label=el('div','breakdown-label'),name=el('span','',((categories[category]||categories.Other)[0])+' '+category),number=el('strong','',count+' '+(count===1?'activity':'activities')),bar=el('div','bar'),fill=el('div','bar-fill');fill.style.width=(count/s.count*100)+'%';fill.style.background=(categories[category]||categories.Other)[1];label.append(name,number);bar.append(fill);item.append(label,bar);breakdown.append(item)}
const recent=$('recentList');recent.replaceChildren();const sorted=[...data].sort((a,b)=>b.date.localeCompare(a.date)||b.created-b.created).slice(0,5);if(!sorted.length)recent.append(el('p','empty','Your timeline is waiting. Log something you did today!'));for(const entry of sorted){const item=el('div','moment'),ico=el('div','moment-icon',(categories[entry.category]||categories.Other)[0]),main=el('div','moment-main'),name=el('strong','',entry.name),detail=el('small','',entry.category+' · '+entry.minutes+' min · '+entry.date),del=el('button','delete','×');del.type='button';del.title='Delete activity';del.setAttribute('aria-label','Delete '+entry.name);del.addEventListener('click',()=>{if(confirm('Delete this moment?')){entries=entries.filter(x=>x.id!==entry.id);if(persist())render()}});main.append(name,detail);item.append(ico,main,del);recent.append(item)}}
document.querySelectorAll('[data-period]').forEach(b=>b.addEventListener('click',()=>{period=b.dataset.period;document.querySelectorAll('[data-period]').forEach(x=>x.classList.toggle('active',x===b));render()}));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
$('openLog').addEventListener('click',()=>{$('activityDate').value=localDate();$('activityDate').max=localDate();$('logDialog').showModal()});
$('logForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget),name=String(f.get('name')||'').trim(),date=String(f.get('date')),minutes=Number(f.get('minutes'));if(!name||!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>localDate()||!Number.isInteger(minutes)||minutes<1||minutes>1440)return alert('Please enter a valid activity, date and duration.');entries.unshift({id:globalThis.crypto?.randomUUID?.()||String(Date.now())+Math.random(),name,category:String(f.get('category')),date,minutes,note:String(f.get('note')||'').trim(),created:Date.now()});if(persist()){e.currentTarget.reset();$('logDialog').close();render()}});
function card(){const canvas=$('shareCanvas'),c=canvas.getContext('2d');const data=selected(),s=stats(data),w=900,h=1200;c.fillStyle='#c2fc65';c.fillRect(0,0,w,h);c.fillStyle='#1c1730';c.font='bold 38px sans-serif';c.fillText('✳ LifeWrapped',64,90);c.font='bold 25px sans-serif';c.fillText(period==='month'?'MY MONTH, WRAPPED.':'MY YEAR, WRAPPED.',64,170);c.font='bold 154px sans-serif';c.fillText(String(s.count),55,370);c.font='bold 38px sans-serif';c.fillText('MOMENTS THAT MATTERED',65,425);c.fillStyle='#251d39';c.fillRect(56,490,788,400);c.fillStyle='#f7f2ff';c.font='bold 104px sans-serif';c.fillText(String((s.mins/60).toFixed(1))+'h',86,645);c.font='bold 27px sans-serif';c.fillText('TIME INVESTED',90,697);c.fillStyle='#c6a7ff';c.fillRect(85,743,335,95);c.fillStyle='#211733';c.font='bold 49px sans-serif';c.fillText(String(s.days)+' DAYS',108,808);c.fillStyle='#211733';c.font='bold 30px sans-serif';c.fillText('TOP CATEGORY',65,982);c.font='bold 65px sans-serif';c.fillText((s.top?s.top[0]:'Your story').slice(0,18),65,1065);c.font='bold 23px sans-serif';c.fillText('EVERY MOMENT COUNTS. ✦',65,1140)}
$('openWrapped').addEventListener('click',()=>{card();$('wrappedDialog').showModal()});
$('downloadCard').addEventListener('click',()=>{const a=document.createElement('a');a.download='lifewrapped-'+period+'-'+localDate()+'.png';a.href=$('shareCanvas').toDataURL('image/png');a.click()});
render();

function downloadBackup(){
 const blob=new Blob([JSON.stringify({app:'LifeWrapped',version:1,exportedAt:new Date().toISOString(),entries},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='lifewrapped-backup-'+localDate()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('exportBackup').addEventListener('click',downloadBackup);
$('importBackup').addEventListener('click',()=>$('backupFile').click());
$('backupFile').addEventListener('change',async event=>{
 const file=event.target.files?.[0];event.target.value='';if(!file)return;
 try{
  if(file.size>5*1024*1024)throw Error('Backup file is too large.');
  const backup=JSON.parse(await file.text());
  if(backup?.app!=='LifeWrapped'||backup.version!==1||!Array.isArray(backup.entries))throw Error('Not a supported LifeWrapped backup.');
  const ids=new Set();
  const valid=backup.entries.every(e=>{
   if(!e||typeof e.id!=='string'||!e.id||ids.has(e.id)||typeof e.name!=='string'||!e.name.trim()||e.name.length>80||!Object.hasOwn(categories,e.category)||typeof e.date!=='string'||!/^(\d{4})-(\d{2})-(\d{2})$/.test(e.date)||!Number.isFinite(Date.parse(e.date+'T12:00:00'))||new Date(e.date+'T12:00:00').toISOString().slice(0,10)!==e.date||e.date>localDate()||!Number.isInteger(e.minutes)||e.minutes<1||e.minutes>1440||typeof e.note!=='string'||e.note.length>200||!Number.isFinite(e.created))return false;
   ids.add(e.id);return true;
  });
  if(!valid)throw Error('Backup contains invalid or duplicate entries.');
  if(!confirm('Replace all '+entries.length+' current entries with '+backup.entries.length+' backup entries? Export your current data first.'))return;
  const previous=entries;entries=backup.entries;
  if(!persist()){entries=previous;return;}
  render();alert('Backup restored successfully.');
 }catch(error){alert('Import failed: '+error.message+' No entries were changed.');}
});
