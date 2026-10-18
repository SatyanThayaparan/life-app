import test from 'node:test';import assert from 'node:assert/strict';
import {buildWrappedSlides} from './wrapped-story.js';import {buildScenario} from './testlab/fixtures.js';
test('empty story is friendly and safe',()=>{const slides=buildWrappedSlides([],'month','2026-10-17');assert.equal(slides.length,1);assert.equal(slides[0].id,'empty')});
test('monthly story contains six cards with real stats',()=>{const slides=buildWrappedSlides(buildScenario('consistent'),'month','2026-10-17');assert.equal(slides.length,6);assert.equal(slides[0].value,'14');assert.equal(slides[3].value,'14 days')});
test('month boundary excludes previous month',()=>{const slides=buildWrappedSlides(buildScenario('month'),'month','2026-11-01');assert.equal(slides[0].value,'1')});
test('year boundary excludes previous year',()=>{const slides=buildWrappedSlides(buildScenario('year'),'year','2027-01-01');assert.equal(slides[0].value,'1')});
test('large history generates finite slide values',()=>{const slides=buildWrappedSlides(buildScenario('power'),'year','2026-12-31');assert.equal(slides[0].value,'500');assert.ok(slides.every(s=>!String(s.value).includes('NaN')))});
