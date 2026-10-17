import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
export const KEY='lifewrapped.entries.v1';
const native=()=>Capacitor.isNativePlatform();
export async function readEntries(){
 if(native()){
  const {value}=await Preferences.get({key:KEY});
  if(value!==null){const data=JSON.parse(value);if(!Array.isArray(data))throw Error('Invalid stored entries');return data;}
  // Only migrate same-origin webview data on first native launch.
  const legacy=localStorage.getItem(KEY);
  if(legacy!==null){const data=JSON.parse(legacy);if(!Array.isArray(data))throw Error('Invalid legacy entries');await Preferences.set({key:KEY,value:legacy});return data;}
  return [];
 }
 const data=JSON.parse(localStorage.getItem(KEY)||'[]');
 if(!Array.isArray(data))throw Error('Invalid stored entries');
 return data;
}
export async function writeEntries(entries){
 const serialized=JSON.stringify(entries);
 if(native())await Preferences.set({key:KEY,value:serialized});
 else localStorage.setItem(KEY,serialized);
}
