import {wrappedInsights} from './tracking.js';
export function buildWrappedSlides(entries,period='month',reference){
 const w=wrappedInsights(entries,period,reference);
 const title=period==='year'?'Your year':'Your month';
 const label=reference.slice(0,period==='year'?4:7);
 if(!w.count)return [{id:'empty',eyebrow:title.toUpperCase()+' · '+label,headline:'Your story starts here.',value:'✳',detail:'Log a moment to unlock your personal Wrapped.',tone:'purple'}];
 return [
 {id:'intro',eyebrow:title.toUpperCase()+' · '+label,headline:'You showed up.',value:String(w.count),detail:w.count===1?'moment worth remembering':'moments worth remembering',tone:'purple'},
 {id:'time',eyebrow:'TIME WELL SPENT',headline:'You invested',value:(w.minutes/60).toFixed(1)+'h',detail:'doing the things that matter to you',tone:'pink'},
 {id:'passion',eyebrow:'YOUR TOP CATEGORY',headline:'You kept coming back to',value:w.topCategory?.category||'Yourself',detail:w.topCategory?Math.round(w.topCategory.minutes/w.minutes*100)+'% of your tracked time':'Every moment matters',tone:'green'},
 {id:'streak',eyebrow:'CONSISTENCY COUNTS',headline:'Your longest streak',value:w.bestStreak+' day'+(w.bestStreak===1?'':'s'),detail:'of showing up for yourself',tone:'orange'},
 {id:'favorite',eyebrow:'ON REPEAT',headline:'Your most repeated activity',value:w.favorite?.name||'—',detail:(w.favorite?.count||0)+' logged moment'+(w.favorite?.count===1?'':'s'),tone:'purple'},
 {id:'final',eyebrow:'THAT WAS YOUR '+(period==='year'?'YEAR':'MONTH'),headline:'Your life. Your story.',value:'✳',detail:w.activeDays+' active days · '+w.count+' moments · '+(w.minutes/60).toFixed(1)+' hours',tone:'pink'}
 ];
}
