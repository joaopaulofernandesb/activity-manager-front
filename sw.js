if(!self.define){let e,t={};const n=(n,a)=>(n=new URL(n+".js",a).href,t[n]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=t,document.head.appendChild(e)}else e=n,importScripts(n),t()})).then((()=>{let e=t[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,s)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(t[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};t[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(s(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/activity-manager-front/_next/app-build-manifest.json",revision:"3bdaa10b9955fc49ef1569af7643287b"},{url:"/activity-manager-front/_next/static/YMHSt8OEhbvPGtW1IPDBq/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/activity-manager-front/_next/static/YMHSt8OEhbvPGtW1IPDBq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/activity-manager-front/_next/static/chunks/0e5ce63c-3cf02ef880a1995c.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/103-508bc4944b004b02.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/23-9cbd35136d01812f.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/464-6ec4afc578d304b6.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/584-9436ec24e67ed810.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/626-67215b10125ede60.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/950-b9a6bd32fb191785.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/app/_not-found/page-bf722dbcec450396.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/app/activities/page-1ec010345a87f1ce.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/app/layout-d4c3de886df1fd56.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/app/page-6af4d560ad78f608.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/fd9d1056-c4050f5b61ad0a3b.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/framework-f66176bb897dc684.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/main-app-f443ba95b0d07125.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/main-d5eb2a8251b4fe28.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/activity-manager-front/_next/static/chunks/webpack-d51d00db3f0952bd.js",revision:"YMHSt8OEhbvPGtW1IPDBq"},{url:"/activity-manager-front/_next/static/css/062f1a9096d94111.css",revision:"062f1a9096d94111"},{url:"/activity-manager-front/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/activity-manager-front/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/activity-manager-front/icons/icon-128x128.png",revision:"2d8baff7f3ea1aed04e44d61863cb798"},{url:"/activity-manager-front/icons/icon-192x192.png",revision:"6930c6e388dd31619d02e8096548d259"},{url:"/activity-manager-front/icons/icon-512x512.png",revision:"33ae75ce1983e7d851fba1e46dd11d29"},{url:"/activity-manager-front/manifest.json",revision:"858f1e8cb12c3d48ce2d44eba4376465"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/activity-manager-front",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:n,state:a})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
