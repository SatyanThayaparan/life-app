import {shiftDay} from '../insights.js';
const names=[['Fitness','Run'],['Reading','Read'],['Learning','Study'],['Creative','Sketch'],['Social','Friends'],['Wellness','Meditate']];
const pad=(n)=>String(n).padStart(2,'0');
const make=(id,day,index)=>{const [category,name]=names[index%names.length];return {id:'test-'+id,name,category,date:day,minutes:15+(index%8)*10,note:'Sample activity #'+id,created:Date.parse(day+'T12:00:00'),mood:['Great','Good','Okay','Tough'][index%4],tags:'sample, '+category.toLowerCase()}};
export const scenarios=[
 {id:'empty',label:'New user — empty history',description:'No activities or highlights',date:'2026-10-17',build:()=>[]},
 {id:'consistent',label:'Daily tracker — 14 days',description:'Unbroken streak and repeated activities',date:'2026-10-17',build:date=>Array.from({length:14},(_,i)=>make(i,shiftDay(date,-i),i))},
 {id:'missed',label:'Missed days',description:'Streak ended three days ago',date:'2026-10-17',build:date=>Array.from({length:12},(_,i)=>make(i,shiftDay(date,-i-3),i))},
 {id:'month',label:'Month rollover',description:'Activity spanning October and November',date:'2026-11-01',build:date=>Array.from({length:12},(_,i)=>make(i,shiftDay(date,-i),i))},
 {id:'year',label:'Year rollover',description:'Activity spanning December and January',date:'2027-01-01',build:date=>Array.from({length:12},(_,i)=>make(i,shiftDay(date,-i),i))},
 {id:'leap',label:'Leap day',description:'Feb 29 and surrounding dates',date:'2028-03-01',build:date=>Array.from({length:7},(_,i)=>make(i,shiftDay(date,-i),i))},
 {id:'power',label:'Power user — 500 logs',description:'High volume and mixed categories',date:'2026-12-31',build:date=>Array.from({length:500},(_,i)=>make(i,shiftDay(date,-Math.floor(i/3)),i))}
];
export function buildScenario(id,date){const scenario=scenarios.find(s=>s.id===id);if(!scenario)throw Error('Unknown test scenario');return scenario.build(date||scenario.date)}
