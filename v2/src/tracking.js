import {summarize,shiftDay} from './insights.js';
const validDate=(day)=>typeof day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(day)&&!Number.isNaN(Date.parse(day+'T12:00:00'))&&new Date(day+'T12:00:00').toISOString().slice(0,10)===day;
export function validateActivity(input,reference){
 const name=String(input.name||'').trim(),note=String(input.note||''),minutes=Number(input.minutes);
 const mood=String(input.mood||''),tags=String(input.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
 if(!name||name.length>80)throw Error('Activity name must be 1–80 characters.');
 if(!Number.isInteger(minutes)||minutes<1||minutes>1440)throw Error('Duration must be 1–1440 minutes.');
 if(!validDate(input.date)||input.date>reference)throw Error('Choose a valid date that is not in the future.');
 if(note.length>200)throw Error('Notes must be 200 characters or fewer.');
 if(mood&&!['Great','Good','Okay','Tough'].includes(mood))throw Error('Invalid mood.');
 if(tags.length>5||tags.some(t=>t.length>20))throw Error('Use up to five tags, each 20 characters or fewer.');
 return {name,note,minutes,mood,tags:tags.join(', ')};
}
export function wrappedInsights(entries,period='month',reference){
 const summary=summarize(entries,period,reference);
 const ranked=[...summary.selected].sort((a,b)=>Number(b.minutes)-Number(a.minutes));
 const counts=new Map();
 for(const entry of summary.selected){const name=entry.name?.trim();if(name)counts.set(name,(counts.get(name)||0)+1)}
 const favorite=[...counts.entries()].sort((a,b)=>b[1]-a[1])[0];
 const moodCounts=new Map();
 for(const entry of summary.selected){if(entry.mood)moodCounts.set(entry.mood,(moodCounts.get(entry.mood)||0)+1)}
 const topMood=[...moodCounts.entries()].sort((a,b)=>b[1]-a[1])[0];
 const days=[...new Set(summary.selected.map(e=>e.date))].sort();
 let bestStreak=0,streak=0,previous=null;
 for(const day of days){streak=previous&&shiftDay(previous,1)===day?streak+1:1;bestStreak=Math.max(bestStreak,streak);previous=day}
 return {...summary,biggest:ranked[0]||null,favorite:favorite?{name:favorite[0],count:favorite[1]}:null,topMood:topMood?{mood:topMood[0],count:topMood[1]}:null,bestStreak};
}
