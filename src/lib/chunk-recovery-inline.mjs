export const CHUNK_RECOVERY_STORAGE_KEY = "academy:chunk-recovery-attempted";

export const STALE_CHUNK_PATTERN =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Expected a JavaScript(?:-or-Wasm)? module script|Loading(?: CSS)? chunk [\w-]+ failed|ChunkLoadError/i;

export const CHUNK_RECOVERY_INLINE_SCRIPT = `(function(){var key=${JSON.stringify(CHUNK_RECOVERY_STORAGE_KEY)};var stale=${STALE_CHUNK_PATTERN.toString()};function recover(message){if(!stale.test(message||""))return;try{if(sessionStorage.getItem(key)==="1")return;sessionStorage.setItem(key,"1");}catch(e){return;}location.reload();}window.addEventListener("error",function(event){recover(event&&event.message);});window.addEventListener("unhandledrejection",function(event){var reason=event&&event.reason;recover(reason&&reason.message?reason.message:String(reason||""));});})();`;
