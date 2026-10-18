import React,{useEffect,useRef,useState} from 'react';
import {buildWrappedSlides} from './wrapped-story.js';
import './wrapped-story.css';
const tones={purple:['#6034c9','#241342'],pink:['#e44c91','#692657'],green:['#397e59','#143f38'],orange:['#db653b','#783142']};
function drawCard(slide){
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Image export unavailable');
 const [a,b]=tones[slide.tone]||tones.purple;
 const gradient=ctx.createLinearGradient(0,0,1080,1350);gradient.addColorStop(0,a);gradient.addColorStop(1,b);ctx.fillStyle=gradient;ctx.fillRect(0,0,1080,1350);
 ctx.fillStyle='rgba(255,255,255,.12)';ctx.beginPath();ctx.arc(980,170,350,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(60,1200,250,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#fff';ctx.textAlign='center';
 function wrap(text,maxWidth,font,maxLines){ctx.font=font;const words=String(text).split(' '),lines=[];let line='';for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width>maxWidth&&line){lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines.slice(0,maxLines)}
 ctx.font='bold 36px system-ui';ctx.fillText('✳ LifeWrapped',540,110);
 ctx.font='bold 28px system-ui';ctx.fillText(slide.eyebrow,540,335);
 const headlines=wrap(slide.headline,880,'bold 65px system-ui',3);ctx.font='bold 65px system-ui';headlines.forEach((line,i)=>ctx.fillText(line,540,470+i*80));
 let size=132;while(size>52){ctx.font='bold '+size+'px system-ui';if(ctx.measureText(slide.value).width<900)break;size-=4}
 ctx.font='bold '+size+'px system-ui';ctx.fillText(slide.value,540,790);
 const details=wrap(slide.detail,880,'38px system-ui',3);ctx.font='38px system-ui';details.forEach((line,i)=>ctx.fillText(line,540,950+i*54));
 ctx.font='28px system-ui';ctx.fillText('Your life is worth celebrating.',540,1240);
 return canvas;
}
export default function WrappedStory({entries,period,reference,onClose}){
 const slides=buildWrappedSlides(entries,period,reference);
 const [index,setIndex]=useState(0),[notice,setNotice]=useState('');
 const touch=useRef(null),closeRef=useRef(onClose);closeRef.current=onClose;
 const slide=slides[index];
 useEffect(()=>{const onKey=e=>{if(e.key==='Escape')closeRef.current();if(e.key==='ArrowRight')setIndex(i=>Math.min(slides.length-1,i+1));if(e.key==='ArrowLeft')setIndex(i=>Math.max(0,i-1))};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[slides.length]);
 useEffect(()=>{const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before}},[]);
 const save=async()=>{try{const canvas=drawCard(slide);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('Image unavailable');const file=new File([blob],'lifewrapped-'+slide.id+'.png',{type:'image/png'});if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'My LifeWrapped'});return}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);setNotice('Image prepared. Check your downloads or Files app.')}catch(e){if(e.name!=='AbortError')setNotice('Could not share image: '+e.message)}};
 return <div className="story-overlay" role="dialog" aria-modal="true" aria-label="Your LifeWrapped story"><div className={'story-card story-'+slide.tone} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;touch.current=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))setIndex(i=>Math.min(slides.length-1,Math.max(0,i+(dx<0?1:-1))))}}><div className="story-progress" aria-label={'Slide '+(index+1)+' of '+slides.length}>{slides.map((s,i)=><div key={s.id} className={i<=index?'filled':''}/>)}</div><div className="story-toolbar"><span>✳ LifeWrapped</span><button type="button" className="story-close" aria-label="Close Wrapped story" onClick={onClose}>✕</button></div><div className="story-center" key={slide.id}><p>{slide.eyebrow}</p><h2>{slide.headline}</h2><strong>{slide.value}</strong><p>{slide.detail}</p></div><div className="story-bottom"><button type="button" onClick={()=>setIndex(i=>Math.max(0,i-1))} disabled={index===0}>← Back</button><span>{index+1} / {slides.length}</span><button type="button" onClick={()=>index===slides.length-1?setIndex(0):setIndex(i=>i+1)}>{index===slides.length-1?'Replay ↻':'Next →'}</button></div></div><div className="story-share"><button onClick={save}>↓ Save / Share this card</button>{notice&&<span role="status">{notice}</span>}</div></div>
}
