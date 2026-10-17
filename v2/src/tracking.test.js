import test from 'node:test';import assert from 'node:assert/strict';import {validateActivity,wrappedInsights} from './tracking.js';
const base={name:' Run ',category:'Fitness',date:'2026-10-17',minutes:45,note:'Nice',mood:'Great',tags:'outside, cardio'};
test('normalizes optional fields',()=>{const a=validateActivity(base,'2026-10-17');assert.equal(a.name,'Run');assert.equal(a.tags,'outside, cardio')});
test('rejects future dates',()=>assert.throws(()=>validateActivity({...base,date:'2026-10-18'},'2026-10-17')));
test('rejects too many tags',()=>assert.throws(()=>validateActivity({...base,tags:'a,b,c,d,e,f'},'2026-10-17')));
test('rejects invalid moods',()=>assert.throws(()=>validateActivity({...base,mood:'Amazing'},'2026-10-17')));
test('calculates wrapped highlights',()=>{const entries=[{...base,name:'Run',date:'2026-10-16',minutes:60},{...base,name:'Run',date:'2026-10-17',minutes:45},{...base,name:'Read',category:'Reading',date:'2026-10-14',minutes:30}];const w=wrappedInsights(entries,'month','2026-10-17');assert.equal(w.favorite.name,'Run');assert.equal(w.biggest.minutes,60);assert.equal(w.bestStreak,2);assert.equal(w.topMood.mood,'Great')});
