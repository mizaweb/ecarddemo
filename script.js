const templates={
  1:{names:'Adam & Hawa',initials:'A & W',scenes:[]},
  2:{names:'Ammar & Aisyah',initials:'A & A',scenes:[]},
  3:{names:'Ahmed & Dalia',initials:'A & D',scenes:[]}
};
const shared={date:'12 Disember 2026',time:'11.00 pagi — 4.00 petang',venue:'Dewan Seri Harmoni',address:'Kajang, Selangor'};
const chooser=document.querySelector('#chooser'),app=document.querySelector('#app'),music=document.querySelector('#music'),menu=document.querySelector('#menu'),shareModal=document.querySelector('#shareModal');
const templateMusic={1:'assets/music-template01.mp3',2:'assets/music-template02.mp3',3:'assets/music-template03.mp3'};
let musicFadeTimer=null;
function prepareTemplateMusic(n){
  clearInterval(musicFadeTimer);
  music.pause();
  music.src=templateMusic[n]||'';
  music.load();
  music.volume=n===3?0:.55;
}
async function startTemplateMusic(n){
  clearInterval(musicFadeTimer);
  const start=n===3?72:0;
  const play=async()=>{
    try{music.currentTime=start}catch{}
    music.volume=n===3?0:.55;
    try{await music.play()}catch{}
    if(n===3){
      let v=0;
      musicFadeTimer=setInterval(()=>{v=Math.min(.55,v+.015);music.volume=v;if(v>=.55)clearInterval(musicFadeTimer)},100);
    }
  };
  if(music.readyState>=1) await play(); else music.addEventListener('loadedmetadata',play,{once:true});
}
let active=null,current=0,timer=null;

// E-Card 1 original floral artwork — keep exactly scoped to Template 1.
const ecard1FlowerSpecs={'2.png':[0,0,667,432],'3.png':[0,230,150,795],'4.png':[0,0,1055,880],'5.png':[956,0,1240,286],'6.png':[1111,178,1240,497],'7.png':[0,1439,311,1748],'8.png':[0,1228,160,1560],'10.png':[749,1321,1240,1748],'11.png':[621,1530,983,1748],'12.png':[185,841,1240,1748],'13.png':[1091,953,1240,1517]};
const ecard1Flowers=document.querySelector('#t1 .flowers');
if(ecard1Flowers){for(const [file,b] of Object.entries(ecard1FlowerSpecs)){const [x0,y0,x1,y1]=b,img=document.createElement('img');img.className='flower';img.src='assets/ecard1/crops/'+file;img.style.left=(x0/1240*100)+'%';img.style.top=(y0/1748*100)+'%';img.style.width=((x1-x0)/1240*100)+'%';img.style.transformOrigin=(x0<620?'left':'right')+' '+(y0<874?'top':'bottom');ecard1Flowers.append(img)}}

function pageHTML(i){
 const names=templates[active].names;
 if(i===0)return `<div class="copy page-fill details-page"><p class="kicker">WALIMATUL URUS</p><h2>Butiran Majlis</h2><h1 class="names">${names.replace(' & ',' <em>&amp;</em> ')}</h1><p class="invite-copy">Dengan penuh kesyukuran, kami menjemput Dato’ / Datin / Tuan / Puan / Encik / Cik ke majlis perkahwinan kami.</p><div class="detail-grid"><div><small>TARIKH</small><strong>${shared.date}</strong></div><div><small>MASA</small><strong>${shared.time}</strong></div><div class="wide"><small>LOKASI</small><strong>${shared.venue}</strong><span>${shared.address}</span></div></div></div>`;
 if(i===1)return `<div class="copy page-fill"><p class="kicker">JADUAL MAJLIS</p><h2>Atur Cara</h2><div class="timeline"><div><time>11.00</time><span>Ketibaan Tetamu</span></div><div><time>12.30</time><span>Jamuan Makan</span></div><div><time>2.00</time><span>Ketibaan Pengantin</span></div><div><time>4.00</time><span>Majlis Bersurai</span></div></div></div>`;
 if(i===2)return `<div class="copy page-fill"><p class="kicker">TEMPAT MAJLIS</p><h2>Lokasi</h2><div class="location-card"><div class="pin">⌖</div><strong>${shared.venue}</strong><p>${shared.address}</p><div class="map-placeholder"><span>Peta Lokasi</span><small>Tekan butang di bawah untuk navigasi</small></div><div class="actions"><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=Kajang%20Selangor">Google Maps</a><a target="_blank" href="https://www.waze.com/ul?q=Kajang%20Selangor&navigate=yes">Waze</a></div></div></div>`;
 if(i===3)return `<div class="copy page-fill"><p class="kicker"></p><h2>Galeri</h2><div class="gallery-slider"><button class="gal-prev" aria-label="Sebelum">‹</button><div class="gallery-track">${[1,2,3,4].map(n=>`<figure><img src="assets/gallery/gallery-${n}.svg" alt="Galeri ${n}"><figcaption>Foto ${String(n).padStart(2,'0')}</figcaption></figure>`).join('')}</div><button class="gal-next" aria-label="Seterusnya">›</button></div><div class="gallery-count"><b>1</b> / 4</div><p class="gallery-hint">Swipe kiri atau kanan</p></div>`;
 if(i===4)return `<div class="copy page-fill"><p class="kicker">TITIPAN BUAT MEMPELAI</p><h2>Doa &amp; Ucapan</h2><p class="prayer">Ya Allah, berkatilah majlis ini dan kurniakanlah kebahagiaan, kasih sayang dan rahmat yang berpanjangan kepada kedua mempelai.</p><form class="wish-form"><input required placeholder="Nama anda"><textarea required placeholder="Titipkan ucapan anda..."></textarea><button class="pill" type="submit">Hantar Ucapan</button><small class="form-msg"></small></form></div>`;
 return `<div class="copy page-fill"><p class="kicker"></p><h2></h2><p class="form-intro">Mohon sahkan kehadiran anda untuk membantu kami membuat persiapan.</p><form class="rsvp-form"><label>Nama<input required placeholder="Nama tetamu"></label><label>Kehadiran<select required><option value="">Pilih kehadiran</option><option>Hadir</option><option>Tidak dapat hadir</option></select></label><label>Jumlah tetamu<input required type="number" min="1" max="10" value="1"></label><button class="pill" type="submit">Hantar RSVP</button><small class="form-msg"></small></form></div>`;
}
function wireScene(){
 const scene=document.querySelector('#t'+active+' .scene');
 scene.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const m=f.querySelector('.form-msg');if(m)m.textContent='Terima kasih ♡ Maklumat anda telah diterima.'}));
 const track=scene.querySelector('.gallery-track');if(track){let idx=0;const count=scene.querySelector('.gallery-count b');const go=n=>{idx=(n+4)%4;track.scrollTo({left:track.clientWidth*idx,behavior:'smooth'});count.textContent=idx+1};scene.querySelector('.gal-prev').onclick=()=>go(idx-1);scene.querySelector('.gal-next').onclick=()=>go(idx+1);track.addEventListener('scroll',()=>{idx=Math.round(track.scrollLeft/track.clientWidth);count.textContent=Math.min(4,idx+1)},{passive:true});}
}
function selectTemplate(n){active=n;current=0;clearTimeout(timer);chooser.hidden=true;app.hidden=false;document.querySelectorAll('.template').forEach(x=>x.hidden=true);const t=document.querySelector('#t'+n);t.hidden=false;t.querySelector('.cover').classList.remove('leaving','opening-out');t.querySelector('.cover').hidden=false;t.querySelector('.stage').hidden=true;menu.hidden=true;prepareTemplateMusic(n);const scene=t.querySelector('.scene');scene.innerHTML=pageHTML(0);scene.className='scene active';wireScene()}
document.querySelectorAll('[data-template]').forEach(b=>b.onclick=()=>selectTemplate(+b.dataset.template));
document.querySelector('#backBtn').onclick=()=>{clearTimeout(timer);music.pause();menu.hidden=true;app.hidden=true;chooser.hidden=false};
function show(i,auto=true){if(!active||i<0||i>5)return;const t=document.querySelector('#t'+active),scene=t.querySelector('.scene');scene.classList.add('leave');setTimeout(()=>{current=i;scene.innerHTML=pageHTML(i);scene.className='scene active';wireScene()},520);clearTimeout(timer);if(auto&&i<5){const delays=[6500,5200,5600,7000,6000,6000];const delay=delays[i]||6000;timer=setTimeout(()=>show(i+1,true),delay)}if(i===5)music.pause()}
document.querySelectorAll('.open-hit').forEach(btn=>btn.onclick=async()=>{const t=btn.closest('.template'),cover=t.querySelector('.cover'),stage=t.querySelector('.stage');await startTemplateMusic(active);menu.hidden=true;if(t.id==='t2'){btn.disabled=true;cover.classList.add('opening-out');setTimeout(()=>{stage.hidden=false;show(0,true)},420);setTimeout(()=>{cover.hidden=true;cover.classList.remove('opening-out');btn.disabled=false;menu.hidden=false},1250)}else if(t.id==='t3'){btn.disabled=true;cover.classList.add('opening-out');setTimeout(()=>{stage.hidden=false;show(0,true)},520);setTimeout(()=>{cover.hidden=true;cover.classList.remove('opening-out');btn.disabled=false;menu.hidden=false},1650)}else{cover.classList.add('leaving');setTimeout(()=>{cover.hidden=true;stage.hidden=false;show(0,true)},900);setTimeout(()=>{menu.hidden=false},1200)}});

// Modal helpers
const infoModal=document.createElement('div');infoModal.id='infoModal';infoModal.className='modal info-modal';infoModal.innerHTML='<div class="info-box"><button class="modal-close" aria-label="Tutup">×</button><div class="info-content"></div></div>';app.append(infoModal);const infoContent=infoModal.querySelector('.info-content');
function openInfo(html){clearTimeout(timer);infoContent.innerHTML=html;infoModal.classList.add('show');infoModal.querySelector('.modal-close').onclick=()=>infoModal.classList.remove('show');infoModal.onclick=e=>{if(e.target===infoModal)infoModal.classList.remove('show')}}
menu.querySelector('.calendar').onclick=()=>openInfo(`<p class="kicker">SIMPAN TARIKH</p><h2>Kalendar</h2><div class="calendar-date"><b>12</b><span>DISEMBER<br>2026</span></div><p>${shared.time}</p><button class="pill" id="addCal">Tambah ke Kalendar</button>`);
infoModal.addEventListener('click',e=>{if(e.target.id==='addCal'){const data=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20261212T030000Z\nDTEND:20261212T080000Z\nSUMMARY:Majlis Perkahwinan ${templates[active].names}\nLOCATION:${shared.venue}, ${shared.address}\nEND:VEVENT\nEND:VCALENDAR`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'text/calendar'}));a.download='majlis-perkahwinan.ics';a.click()}});
menu.querySelector('.location').onclick=()=>openInfo(`<p class="kicker">TEMPAT MAJLIS</p><h2>Lokasi</h2><div class="popup-icon">⌖</div><h3>${shared.venue}</h3><p>${shared.address}</p><div class="popup-actions"><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=Kajang%20Selangor">Google Maps</a><a target="_blank" href="https://www.waze.com/ul?q=Kajang%20Selangor&navigate=yes">Waze</a></div>`);
menu.querySelector('.rsvp').onclick=()=>openInfo(`<p class="kicker">PENGESAHAN KEHADIRAN</p><h2>RSVP</h2><form class="popup-form"><input required placeholder="Nama tetamu"><select required><option value="">Pilih kehadiran</option><option>Hadir</option><option>Tidak dapat hadir</option></select><input type="number" min="1" value="1" placeholder="Jumlah tetamu"><button class="pill">Hantar RSVP</button></form>`);
menu.querySelector('.contact').onclick=()=>openInfo(`<p class="kicker">HUBUNGI KAMI</p><h2>Hubungi</h2><p>Untuk pertanyaan mengenai majlis, sila hubungi pihak keluarga pengantin.</p><div class="popup-actions"><a href="tel:+60000000000">Panggilan</a><a target="_blank" href="https://wa.me/60000000000">WhatsApp</a></div><small class="placeholder-note">Gantikan nombor placeholder dalam script.js dengan nombor sebenar.</small>`);
infoModal.addEventListener('submit',e=>{e.preventDefault();e.target.innerHTML='<div class="success-msg">Terima kasih ♡<br><small>RSVP anda telah diterima.</small></div>'});
menu.querySelector('.share').onclick=()=>{document.querySelector('#shareNames').textContent=templates[active].names;shareModal.classList.add('show')};document.querySelector('#closeShare').onclick=()=>shareModal.classList.remove('show');document.querySelector('#copyLink').onclick=async()=>{await navigator.clipboard.writeText(location.href);alert('Link disalin')};document.querySelector('#waShare').onclick=()=>window.open('https://wa.me/?text='+encodeURIComponent('Jemputan Majlis Perkahwinan '+templates[active].names+' '+location.href),'_blank');
