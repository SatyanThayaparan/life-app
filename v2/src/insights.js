export const categories=['Fitness','Reading','Learning','Creative','Social','Wellness','Other'];
export const icons={Fitness:'💪',Reading:'📚',Learning:'🧠',Creative:'🎨',Social:'🫶',Wellness:'🌿',Other:'✨'};
export const localDay=(date=new Date())=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
export const dateFromDay=day=>new Date(day+'T12:00:00');
export const shiftDay=(day,offset)=>{const d=dateFromDay(day);d.setDate(d.getDate()+offset);return localDay(d)};
export function summarize(entries,period='month',reference=localDay()){
 const prefix=reference.slice(0,period==='year'?4:7);
 const selected=entries.filter(e=>typeof e.date==='string'&&e.date.startsWith(prefix));
 const minutes=selected.reduce((sum,e)=>sum+(Number(e.minutes)||0),0);
 const days=new Set(selected.map(e=>e.date));
 const byCategory=categories.map(category=>({category,count:selected.filter(e=>e.category===category).length,minutes:selected.filter(e=>e.category===category).reduce((sum,e)=>sum+(Number(e.minutes)||0),0)})).filter(e=>e.count>0).sort((a,b)=>b.minutes-a.minutes);
 return {selected,count:selected.length,minutes,activeDays:days.size,byCategory,topCategory:byCategory[0]||null};
}
export function currentStreak(entries,reference=localDay()){
 const days=new Set(entries.map(e=>e.date));
 let day=days.has(reference)?reference:shiftDay(reference,-1),streak=0;
 while(days.has(day)){streak++;day=shiftDay(day,-1)}
 return streak;
}
export function lastSevenDays(entries,reference=localDay()){
 return Array.from({length:7},(_,i)=>{const day=shiftDay(reference,i-6);const matches=entries.filter(e=>e.date===day);return {day,label:dateFromDay(day).toLocaleDateString(undefined,{weekday:'short'}),count:matches.length,minutes:matches.reduce((sum,e)=>sum+(Number(e.minutes)||0),0)}});
}
export function activitySuggestions(entries){
 const seen=new Map();
 for(const entry of [...entries].sort((a,b)=>(b.date||'').localeCompare(a.date||''))){const key=entry.category+'|'+entry.name?.trim().toLowerCase();if(entry.name?.trim()&&!seen.has(key))seen.set(key,entry)}
 return [...seen.values()].slice(0,4);
}
