// =====================================================================
// ENTRAÎNEMENT : onglets « Coach » (entraîneur) et « Entraînement » (athlètes suivis)
// Chargé avant le script principal ; utilise S, sb, me(), esc, toast, ok, ouvrirPanel, fermer, render, recharger.
// Le poids n'est jamais enregistré.
// =====================================================================
(()=>{
const E={};window.ENT=E;
// ---------- styles propres au module ----------
document.head.insertAdjacentHTML("beforeend",`<style>
.nav.n5 div,.nav.n6 div,.nav.n7 div{min-width:0}.nav.n6 div{grid-template-columns:repeat(6,minmax(0,1fr))}.nav.n6 button,.nav.n7 button{overflow:hidden;white-space:nowrap}.nav.n7 div{grid-template-columns:repeat(7,minmax(0,1fr))}.nav.n7 button{font-size:9.5px;letter-spacing:0}#coach input[type=range],#entrainement input[type=range]{accent-color:var(--red)}.nav.n6 button{font-size:10.5px;letter-spacing:0}
.en-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;padding-bottom:10px;border-bottom:2px solid var(--ink)}
.en-hero h2{font-size:clamp(19px,5.6vw,28px)}.en-j{font-family:var(--display);font-weight:800;font-size:clamp(34px,11vw,48px);line-height:1;color:var(--red);text-align:right;white-space:nowrap}.en-j small{display:block;font:500 11px var(--mono);color:var(--muted);text-transform:uppercase}
.en-rank{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;font-size:14px}.en-rank b{font:800 18px var(--display);text-transform:uppercase}
.en-meter{flex:1 1 140px;height:9px;background:var(--wash);border-radius:6px;overflow:hidden}.en-meter i{display:block;height:100%;background:var(--red)}
.en-tabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}.en-tabs::-webkit-scrollbar{display:none}
.en-tabs button{flex:none;border:1px solid var(--line);background:var(--card);border-radius:999px;padding:8px 14px;font-weight:600;font-size:15px;min-height:40px}
.en-tabs button[aria-selected=true]{background:var(--ink);color:var(--on-ink);border-color:var(--ink)}
.en-chips{display:flex;flex-wrap:wrap;gap:6px}.en-chips button{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:7px 12px;font-size:15px;min-height:40px}
.en-chips button[aria-pressed=true]{background:var(--ink);color:var(--on-ink);border-color:var(--ink)}.en-chips button:disabled{opacity:.4}
.en-leg{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:13px;color:var(--muted)}.en-leg span{display:inline-flex;align-items:center;gap:5px}.en-leg i{width:12px;height:12px;border-radius:3px;border:1px solid var(--ink)}
.en-ttl{display:flex;justify-content:space-between;align-items:center;gap:10px}
.en-i{width:30px;height:30px;min-width:30px;border-radius:50%;border:1.5px solid var(--muted);background:none;color:var(--muted);font-weight:700;padding:0}
.en-fig{position:relative;min-height:260px}.en-fig>svg{position:absolute;inset:0;width:100%;height:100%}
.en-fig svg text{font-family:var(--body);paint-order:stroke;stroke:var(--card);stroke-width:4px}.en-fig svg text.n{stroke:none}
.en-kpi{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;font-size:14px;color:var(--muted)}.en-kpi strong{display:block;font:800 22px var(--display);color:var(--ink)}
.en-dot{display:inline-block;width:11px;height:11px;border-radius:50%;vertical-align:middle;margin-right:5px;background:var(--line)}
.en-row{display:grid;grid-template-columns:38px minmax(0,1fr) 60px;gap:8px;align-items:center;font-size:14px}
.en-bar{position:relative;height:20px}.en-bar u,.en-bar i{position:absolute;left:0;border-radius:4px}.en-bar u{top:0;height:20px;background:var(--wash);text-decoration:none}.en-bar i{top:5px;height:10px;background:var(--red)}
details.en-wk{background:var(--card);border:1px solid var(--line);border-radius:12px}
details.en-wk summary{list-style:none;display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 14px;cursor:pointer;min-height:48px}
details.en-wk summary::-webkit-details-marker{display:none}details.en-wk summary b{font:800 20px var(--display)}
.en-ses{display:grid;grid-template-columns:40px minmax(0,1fr);gap:10px;padding:8px 14px;border-top:1px dashed var(--line);width:100%;text-align:left;background:none;border-left:0;border-right:0;border-bottom:0;font-size:15px}
.en-ses span:first-child{font:600 12px var(--mono);text-transform:uppercase;color:var(--muted);padding-top:3px}.en-ses.cle span+span{color:var(--red);font-weight:700}
.en-goal{border:1px solid var(--line);border-radius:12px;padding:12px;display:grid;gap:8px;background:var(--paper)}.en-goal.main{border:2px solid var(--ink)}
.en-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.en-x{border:0;background:var(--wash);border-radius:8px;min-width:42px;min-height:42px;font-weight:800}
.en-cfg{display:grid;grid-template-columns:minmax(0,1fr) 80px;gap:8px 10px;align-items:center;font-size:15px}
.en-cfg3{display:grid;grid-template-columns:minmax(0,1fr) 80px 42px;gap:6px;align-items:center}
.en-bd{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,120px) 64px 42px;gap:6px;padding-bottom:8px;border-bottom:1px dashed var(--line)}
.en-hb{display:grid;grid-template-columns:42px minmax(0,1fr) 42px 42px;gap:6px;align-items:center}
.en-medals{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:10px}
.en-medal{display:grid;justify-items:center;text-align:center;gap:4px;font-size:13px;line-height:1.2}
.en-medal i{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;font:800 17px var(--display);font-style:normal;border:3px solid var(--ink)}
.en-medal.ok i{background:var(--ink);color:var(--on-ink)}.en-medal.no{color:var(--muted)}.en-medal.no i{border:2px dashed var(--muted)}
.en-habs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.en-hab{display:grid;grid-template-columns:minmax(0,1fr) 26px;grid-template-areas:"i c" "n n" "d d";gap:8px;align-content:start;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;width:100%;color:inherit;font:inherit}
.en-hab svg{grid-area:i}.en-hab .hn{grid-area:n;display:grid;gap:2px}.en-hab .ck{grid-area:c}.en-hab .en-wd{grid-area:d}
.en-hab svg{width:42px;height:42px;stroke:var(--ink);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.en-hab b{font:800 17px/1.05 var(--display);text-transform:uppercase;overflow-wrap:anywhere}.en-hab[aria-pressed=true]{border:2px solid var(--red);background:var(--red-soft)}
.en-hab .ck{width:24px;height:24px;border:2px solid var(--ink);border-radius:50%;display:grid;place-items:center;font-weight:800;color:var(--red);font-size:13px}
.en-hab[aria-pressed=true] .ck::after{content:"✕"}
.en-wd{display:flex;gap:5px}.en-wd i{width:11px;height:11px;border-radius:50%;border:1.5px solid var(--muted)}.en-wd i.on{background:var(--red);border-color:var(--red)}.en-wd i.td{outline:2px solid var(--ink);outline-offset:1px}
.en-meal{display:grid;grid-template-columns:52px minmax(0,1fr);gap:8px;font-size:15px}.en-meal span:first-child{font:600 12px var(--mono);color:var(--muted);padding-top:2px}
.en-lock{border:2px dashed var(--ok);border-radius:12px;padding:10px 12px;background:var(--ok-soft)}
.en-note{border-left:4px solid var(--ink);padding:4px 0 4px 12px}
.en-res{border-left:6px solid var(--ok);border-radius:10px;padding:10px 12px;background:var(--paper)}
.en-fg{display:grid;gap:4px}.en-fg div{display:grid;grid-template-columns:34px repeat(7,16px);gap:5px;align-items:center;font:600 11px var(--mono);color:var(--muted)}.en-fg span{width:14px;height:14px;border-radius:50%}
@keyframes enflow{to{stroke-dashoffset:-40}}.en-flow{animation:enflow 1.6s linear infinite}
@media(prefers-reduced-motion:reduce){.en-flow{animation:none}}
@media(max-width:520px){.en-habs{grid-template-columns:minmax(0,1fr);gap:8px}.en-hab{grid-template-columns:40px minmax(0,1fr) 28px;grid-template-areas:"i n c" "i d c";align-items:center;gap:4px 12px;min-height:68px;padding:10px 12px}.en-hab svg{width:36px;height:36px}.en-hab .ck{width:28px;height:28px}}
.en-det{padding:10px 14px;gap:10px}.en-det summary h2{font-size:21px}.en-dt .en-chips{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.en-dt .en-chips button{padding:7px 8px}
.en-cit{position:relative;background:var(--ink);color:var(--on-ink);border-radius:12px;padding:14px 16px 14px 44px}.en-cit::before{content:"“";position:absolute;left:12px;top:2px;font:800 52px/1 var(--display);color:var(--red)}.en-cit span{font:600 11px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:#a39d93}.en-cit p{margin:4px 0 0;font:700 19px/1.25 var(--display);letter-spacing:.01em}
.en-cl{display:grid;grid-template-columns:minmax(0,1fr) 42px;gap:6px;align-items:start}.en-cl textarea{min-height:58px;resize:vertical;font-size:15px}
.en-det summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:10px;cursor:pointer;min-height:40px}.en-det summary::-webkit-details-marker{display:none}
.en-det summary::after{content:"+";font:800 24px var(--display);color:var(--red)}.en-det[open] summary::after{content:"−"}.en-det>.en-ttl{justify-content:flex-end}
@media(max-width:480px){#entrainement>.en-tabs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}#entrainement>.en-tabs button{padding:7px 2px;font-size:12.5px;letter-spacing:-.01em;min-height:40px;white-space:normal;line-height:1.1}
  #coach>.en-tabs button,#coach .en-tabs button{padding:7px 11px;font-size:14px}.en-ses{grid-template-columns:34px minmax(0,1fr);padding:8px 12px}details.en-wk summary{grid-template-columns:40px minmax(0,1fr) auto;padding:10px 12px}
  .nav.n6 button{font-size:10px}.nav.n7 button{font-size:8.5px}.en-bd input,.en-bd select{padding:8px 6px;font-size:15px}}
@media(max-width:420px){.en-2{grid-template-columns:minmax(0,1fr)}.en-bd{grid-template-columns:minmax(0,1fr) 64px 42px}.en-bd select{grid-column:1/-1;grid-row:2}}
</style>`);

// ---------- outils ----------
const WK=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"],WL=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"],MC=["jan.","fév.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
const pd=s=>{const[a,b,c]=String(s).slice(0,10).split("-").map(Number);return new Date(a,b-1,c)},iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const addD=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n),monday=d=>addD(d,-((d.getDay()+6)%7)),auj=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const fdl=d=>`${WL[(d.getDay()+6)%7]} ${d.getDate()} ${MC[d.getMonth()]}`,fds=d=>`${d.getDate()} ${MC[d.getMonth()]}`;
const fm=m=>m>=60?`${Math.floor(m/60)}h${m%60?String(m%60).padStart(2,"0"):""}`:`${m}'`,r5=m=>Math.max(15,Math.round(m/5)*5),dec=(v,n=1)=>Math.abs(v).toFixed(n).replace(".",",");
const jx=s=>Math.round((pd(s)-auj())/864e5);
const prenomDe=id=>S.membres.find(m=>m.id==id)?.prenom||S.complets.find(m=>m.id==id)?.prenom||"Membre";
const q=(p,ctx)=>p.then(r=>{if(r.error){erreur(r.error,ctx);throw r.error}return r.data});
const X_=(x,y,r,c)=>`<g transform="translate(${x} ${y}) rotate(45)"><rect x="${-r*.22}" y="${-r}" width="${r*.44}" height="${2*r}" rx="1.5" fill="${c}"/><rect x="${-r}" y="${-r*.22}" width="${2*r}" height="${r*.44}" rx="1.5" fill="${c}"/></g>`;

// ---------- réglages (table reglages_entrainement, ligne id = 1) ----------
const CFG0={xpBase:5,xpDiv:10,xpWeek:30,xpHab:5,orangeUp:2,bonusDown:2,fatOrange:4,fatRed:5,cut:20,regLow:60,regHigh:80,
  grades:[["Moussaillon",0],["Matelot",300],["Quartier-maître",800],["Second",1500],["Capitaine",2500]],
  badges:[["Vélo 2h","velo",120],["Vélo 3h","velo",180],["Vélo 4h","velo",240],["Vélo 5h","velo",300],["Course 1h","cap",60],["Course 1h30","cap",90],["Course 2h","cap",120],["4 semaines pleines","sem",4],["8 semaines pleines","sem",8],["12 semaines pleines","sem",12],["7 jours de réflexes","ref",7],["21 jours de réflexes","ref",21],["42 jours de réflexes","ref",42],["Objectif atteint","obj",0]].map(([n,t,v])=>({n,t,v})),
  habits:[["Moitié légumes","leg"],["Protéines à chaque repas","prot"],["Gros matin, soir léger","sun"],["Ravito en sortie","bar"],["Pas de sucré le soir","moon"],["Dormir 7 à 8 h","bed"],["Boire 1,5 L d'eau","eau"]].map(([n,ic])=>({id:ic,n,ic})),
  citations:["Le plus dur, c'est de lacer ses chaussures. Après, tu es déjà en route.","Une séance faite vaut mieux qu'une séance parfaite.","Lentement aujourd'hui, c'est vite le jour J.","La régularité bat le talent quand le talent ne s'entraîne pas.","Tu n'as pas besoin d'envie, juste de commencer. L'envie arrive en chemin.","Chaque kilomètre d'aujourd'hui est un kilomètre de moins à craindre le jour de la course.","Fatigué ? Fais-la courte. Pas motivé ? Fais-la quand même.","Le corps progresse pendant le repos, le mental pendant l'effort.","Personne ne regrette une sortie, tout le monde regrette celle qu'il a sautée.","Petit pas, grande saison.","Respire, souris, pédale.","Le vent de face d'aujourd'hui, c'est la force de demain.","Sois fière de la séance, pas seulement du chrono.","On ne monte pas la montagne d'un coup : on enchaîne les virages.","L'équipage avance ensemble : une séance de plus pour toi, une victoire de plus pour le club."]};
const REF0=["leg","prot","sun","bar","moon","bed","eau"];   // anciens index → identifiants
const rid=x=>/^\d+$/.test(String(x))?(CFG.habits[+x]?.id??REF0[+x]):String(x);
const habDe=k=>CFG.habits.find(h=>h.id===k);
const refsDe=a=>(a?.reflexes||[]).map(rid).filter(k=>habDe(k));
let CFG=JSON.parse(JSON.stringify(CFG0));
const citationDuJour=(d=auj())=>{const l=(CFG.citations||[]).filter(x=>x&&x.trim());if(!l.length)return"";const n=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()))/864e5);const s=(((n*2654435761)>>>0)^((n*2654435761)>>>13))>>>0;return l[s%l.length]};
const BT=[["velo","Vélo ≥ min"],["cap","Course ≥ min"],["sem","Semaines pleines"],["ref","Jours réflexes"],["obj","Objectif atteint"]];
const HIC={leg:'<circle cx="24" cy="26" r="18"/><path d="M24 8v36M24 26h18"/>',prot:'<ellipse cx="24" cy="26" rx="12" ry="15"/><path d="M18 22c2-3 5-4 8-3"/>',sun:'<circle cx="16" cy="18" r="7"/><path d="M16 5v3M5 18h3M7 9l2 2M25 9l-2 2"/><path d="M38 30a8 8 0 1 1-8-10 6 6 0 0 0 8 10z"/>',bar:'<rect x="16" y="10" width="16" height="30" rx="4"/><path d="M19 10V6h10v4M16 20h16"/>',moon:'<path d="M30 10a14 14 0 1 0 8 22 11 11 0 0 1-8-22z"/><path d="M12 38l24-24"/>',bed:'<path d="M6 32h36M8 32V18M40 32v-8a6 6 0 0 0-6-6H20v14"/><circle cx="14" cy="22" r="3"/>',eau:'<path d="M14 8h20l-3 32H17z"/><path d="M15 18h18"/>',fruit:'<circle cx="24" cy="28" r="13"/><path d="M24 15c0-4 3-7 7-7"/>'};

// ---------- aides (popups) ----------
const INFO={goals:"Le principal fixe la fin du plan. Les autres deviennent des jalons : semaine allégée, veille à 30' souple.",off:"Les séances de ces jours sont retirées. La date de fin ne bouge pas.",
  plan:"Séances clés en rouge. Touche une séance pour la modifier, la déplacer ou la supprimer. Une modification repasse le plan « à republier ».",
  sim:"Volume si l'athlète fait ce pourcentage de séances : sous le seuil haut le plan ne progresse plus, sous le seuil bas il recule.",
  xp:"Chaque séance faite rapporte une base + des points selon la durée. Semaine pleine (au plus 1 séance manquée) : bonus. Réflexe tenu : points par jour.",
  badges:"Ils se débloquent seuls : séance vélo ou course faite d'au moins X minutes, semaines pleines d'affilée, jours avec au moins 2 réflexes tenus (cumulés), objectif passé.",
  habsC:"Coche les 3 réflexes de la semaine pour l'athlète choisi. Touche l'icône pour la changer.",
  feux:"Rouge : repos à la place de la séance suivante. Orange : séance suivante en endurance et raccourcie. Bonus : rien ne change.",
  loop:"1. Rappel : la séance du jour. 2. Séance : tu la fais et notes ton ressenti. 3. Récompense : points, série, badges. 4. Prochain cap : le prochain jalon.",
  fuel:"Taille de l'assiette = son importance. Jour d'effort : gros petit-déjeuner et déjeuner, dîner plus léger car on va dormir.",
  habs:"Chaque jour repart à zéro à minuit. Touche la carte si tu as tenu le réflexe aujourd'hui. Les jours avec au moins 2 réflexes comptent pour les badges.",
  kg:"Rien n'est gardé : les champs se vident en quittant l'onglet. Couloir vert : −0,25 à −0,5 kg par semaine.",
  home:"Une pesée par semaine, le lundi au réveil. Note-la sur papier, trace la courbe toutes les 4 semaines. 6 semaines avant l'objectif : on vise la stabilité.",
  nobal:"Énergie en séance qui baisse : tu manges trop peu. Faim gérable. Sommeil stable. Ceinture et vêtements. Cycle perturbé : on remange plus et on en parle au médecin."};
const info=k=>ouvrirPanel(`<div style="display:grid;gap:12px"><p style="margin:0">${INFO[k]}</p><button class="btn pri" data-close>OK</button></div>`);

// ---------- générateur de plan ----------
const SPORT={run:{n:"Course à pied",d:[["5","5 km"],["10","10 km"],["21","Semi"],["42","Marathon"],["50","50 km"],["60","60 km"],["70","70 km"]],free:1},tri:{n:"Triathlon",d:[["S","S"],["M","M"],["L","L"],["XL","XL"]]},bike:{n:"Vélo",d:[50,75,100,125,150,175,200,225,250].map(k=>[String(k),k+" km"]),free:1}};
const DEFD={run:"21",tri:"M",bike:"100"},LEVEL=[["deb","Débutant"],["int","Intermédiaire"],["conf","Confirmé"]];
const gLabel=g=>g.sport==="run"?(g.distance==="21"?"Semi-marathon":g.distance==="42"?"Marathon":+g.distance>42?`Ultra ${g.distance} km`:`${g.distance} km`):g.sport==="tri"?`Triathlon ${g.distance}`:`Vélo ${g.distance} km`;
const dur=s=>String(s).split("+").reduce((a,g)=>{const m=g.match(/(?<![×\d])(\d+)h(\d{2})?|(?<![×\d])(\d+)'/);return a+(m?(m[1]?m[1]*60+(+m[2]||0):+m[3]):0)},0);
const effort=s=>/OBJECTIF/.test(s)?8:/seuil|test \d|vite/.test(s)?7:/tempo|allure/.test(s)?5:3;
const disc=s=>/^N /.test(s)?"Natation":/^CAP/.test(s)?"Course":/^Renfo/.test(s)?"Renfo":/^OBJECTIF/.test(s)?"Objectif":"Vélo";
const soften=t=>t.split(" + ").filter((g,i)=>!i||/^(N|CAP|HT|V) |^renfo/i.test(g)).map(g=>/^renfo/i.test(g)?g:(m=>m?`${m[1]} ${fm(Math.max(20,Math.round(dur(g)*(1-CFG.cut/100)/5)*5))} EF`:g)(g.match(/^(N|CAP|HT|V) /))).join(" + ");
const RAISONS=[["fatigue","Fatigue"],["motivation","Pas motivé·e"],["temps","Pas le temps"],["douleur","Douleur"]],RLAB=Object.fromEntries(RAISONS);
const RMSG={fatigue:"Séance suivante plus courte.",motivation:"La prochaine séance compense un peu.",temps:"On ne rattrape pas, suite inchangée.",douleur:"Repos ou mobilité. Si ça dure plus de 3 jours : médecin."};
const boost=(t,plus)=>t.replace(/^(N|CAP|HT|V) (\d+h\d*|\d+')/,(m0,dsc,d0)=>`${dsc} ${fm(dur(d0)+plus)}`);
// Séance suivante selon le ressenti du jour : douleur ou feu rouge → repos ; fatigue ou feu orange → plus courte ; manque de motivation → un peu plus longue
function adaptSuite(nx,r,se){if(!r||!nx)return{t:nx?.texte,pq:""};const f=r.faite?r.feu:null,ra=r.raison;
  if(ra==="douleur"||f==="rouge")return{t:"Repos ou 20' de mobilité",pq:ra==="douleur"?"douleur":"feu rouge"};
  if(ra==="fatigue"||f==="orange")return{t:soften(nx.texte),pq:ra==="fatigue"?"fatigue":"feu orange"};
  if(ra==="motivation"){const manque=(se?.duree||0)-(r.faite?(r.duree_reelle??se.duree):0),plus=Math.min(Math.round(manque/2/5)*5,Math.round((nx.duree||0)*.25/5)*5);if(plus>0)return{t:boost(nx.texte,plus),pq:`+${fm(plus)} pour compenser`}}
  return{t:nx.texte,pq:""}}
const mainG=gs=>gs.find(g=>g.principal)||gs[0];
function gen(a,goals,offs){const G=mainG(goals),st0=monday(pd(a.debut)),race=pd(G.date),N=Math.max(4,Math.round((monday(race)-st0)/6048e5)+1),raceDi=(race.getDay()+6)%7,km=+G.distance||0;
  const big=G.sport==="tri"?["L","XL"].includes(G.distance):G.sport==="run"?km>=42:km>=150,taper=big||(G.sport==="tri"?G.distance==="M":G.sport==="run"?km>=21:km>=100)?2:1,R=N-1-taper,base=R-Math.round(R*.35);
  const ph=[];for(let i=0;i<N;i++){let x=i===N-1?"Course":i>=R?"Affûtage":i>=base?"Spécifique":base>=6&&i>=Math.ceil(base/2)?"Base 2":base>=6?"Base 1":"Base";if(i<R-1&&i%4===3)x="Récup";ph.push(x)}
  const f0={deb:.6,int:.68,conf:.75}[a.niveau]||.65,load=ph.map((x,i)=>i).filter(i=>!["Récup","Affûtage","Course"].includes(ph[i])),H=+a.heures,vol=[];let ll=H*f0;
  ph.forEach((x,i)=>{if(load.includes(i)){ll=H*(f0+(1.05-f0)*load.indexOf(i)/Math.max(1,load.length-1));vol.push(ll)}else if(x==="Récup")vol.push(ll*.7);else if(x==="Affûtage")vol.push(H*1.05*(i===R?(taper===1?.6:.75):.55));else vol.push(H*.35)});
  const days=[...a.jours].sort((x,y)=>x-y),L=days.includes(a.jour_long)?a.jour_long:days.at(-1),sp=G.sport;
  const weeks=ph.map((x,i)=>{const m=vol[i]*60,ses=[],q2=!["Récup","Course"].includes(x),g=x==="Base 1"||x==="Base"?0:x==="Base 2"?1:x==="Spécifique"?2:3;
    const Q={CAP:["dont 6×(1' vite / 1' lent)","dont 3×8' seuil","dont 3×12' allure course","dont 3×5' allure course"][g],V:["dont 3×10' tempo","dont 3×12' seuil","dont 2×20' allure course","dont 3×8' allure course"][g],N:["éducatifs + 8×100","5×300","4×400 allure course","4×100 allure course"][g]};
    const others=days.filter(d=>d!==L),after=days.includes((L+1)%7)?(L+1)%7:null,add=(di,t,mn,cle)=>ses.push({di,t,min:mn,cle});
    if(sp==="run"){const lg=Math.min(km<=10?80:km<=21?110:km<=42?150:Math.min(240,150+(km-42)*3),m*.32),n=others.length-1;add(L,`CAP ${fm(r5(lg))} EF`,r5(lg),true);
      if(others.length){const d=r5(m*.2);add(others[0],q2?`CAP ${fm(d)} ${Q.CAP}`:`CAP ${fm(d)} EF`,d,q2)}others.slice(1).forEach(di=>{const d=r5((m-lg-m*.2)/Math.max(1,n));add(di,`CAP ${fm(d)} EF`,d,false)})}
    else if(sp==="bike"){const lg=Math.min(Math.min(420,Math.max(120,km*2.2)),m*.5),n=others.length-1;add(L,`V ${fm(r5(lg))} EF`,r5(lg),true);
      if(others.length){const d=r5(m*.2);add(others[0],q2?`HT ${fm(d)} ${Q.V}`:`V ${fm(d)} souple`,d,q2)}others.slice(1).forEach((di,j)=>{const rf=j===n-1&&g<2,d=r5((m-lg-m*.2)/Math.max(1,n));add(di,rf?"Renfo 30' + gainage":`V ${fm(d)} EF`,rf?30:d,false)})}
    else{const sh={N:.2,V:.5,CAP:.3},k={Natation:"N",Vélo:"V","Course à pied":"CAP"}[a.point_faible];if(k){sh[k]+=.05;sh[k==="V"?"CAP":"V"]-=.05}
      const rot=others.filter(d=>d!==after).map((d,j)=>[d,["N","CAP","V","N","CAP"][j%5]]),nN=rot.filter(r=>r[1]==="N").length||1,nV=rot.filter(r=>r[1]==="V").length,nC=rot.filter(r=>r[1]==="CAP").length;
      const Vt=m*sh.V,Ct=m*sh.CAP,brick=r5(Math.min(G.distance==="XL"?60:45,Math.max(10,Ct*.15))),vL=r5(nV?Vt*.7:Vt),cL=after!=null?r5((Ct-brick)*.45):0;
      add(L,`V ${fm(vL)} EF + CAP ${fm(brick)} enchaînée`,vL+brick,true);if(after!=null)add(after,`CAP ${fm(cL)} EF`,cL,true);let qN=0,qC=0,qV=0;
      rot.forEach(([di,kk])=>{if(kk==="N"){const d=r5(m*sh.N/nN);add(di,`N ${fm(d)} : ${!qN&&q2?Q.N:"continu souple"}`,d,!qN);qN=1}
        else if(kk==="CAP"){const d=r5((Ct-brick-cL)/Math.max(1,nC));add(di,!qC&&q2?`CAP ${fm(d)} ${Q.CAP}`:`CAP ${fm(d)} EF`,d,false);qC=1}
        else{const d=r5((Vt-vL)/Math.max(1,nV));add(di,!qV&&q2?`HT ${fm(d)} ${Q.V}`:`V ${fm(d)} EF`,d,false);qV=1}})}
    if(x==="Course"){ses.length=0;days.filter(d=>d<raceDi).slice(-3).forEach((di,j)=>add(di,["N 20' + V 30' souples","CAP 25' dont 3×3' allure course","Activation 20'"][j%3],25,false));add(raceDi,`OBJECTIF : ${G.titre}`,0,true)}
    return{w:i+1,mon:addD(st0,i*7),phase:x,ses}});
  goals.filter(g=>g!==G).forEach(g=>{const d=pd(g.date),wi=Math.round((monday(d)-st0)/6048e5);if(wi<0||wi>=N-1)return;const w=weeks[wi],gd=(d.getDay()+6)%7;
    w.ses=w.ses.filter(s=>s.di<gd).map(s=>{const t=s.di===gd-1?`${s.t.split(" ")[0]} 30' souple`:soften(s.t);return{...s,t,min:dur(t),cle:false}});w.ses.push({di:gd,t:`OBJECTIF : ${g.titre}`,min:0,cle:true})});
  offs.forEach(o=>{if(!o.du||!o.au)return;const a1=pd(o.du),b1=pd(o.au);weeks.forEach(w=>{w.ses=w.ses.filter(s=>{const dd=addD(w.mon,s.di);return dd<a1||dd>b1||/OBJECTIF/.test(s.t)})})});
  return weeks}

// ---------- données ----------
let D={ath:[],obj:[],off:[],ses:[],res:[],ref:[]};
E.charger=async()=>{if(!sb)return;const t=n=>sb.from(n).select("*").then(r=>r.error?[]:r.data||[],()=>[]);
  const [rg,ath,obj,off,ses,res,ref]=await Promise.all(["reglages_entrainement","entrainement_athletes","objectifs","indisponibilites","seances","ressentis","reflexes_jours"].map(t));
  CFG=Object.assign(JSON.parse(JSON.stringify(CFG0)),rg[0]?.data||{});CFG.habits.forEach((h,i)=>{if(!h.id)h.id=REF0[i]&&!CFG.habits.some(x=>x.id===REF0[i])?REF0[i]:"h"+i+"_"+(h.ic||"x")});
  ref.forEach(r=>{if(r.ref==null&&r.idx!=null)r.ref=REF0[r.idx]});D={ath,obj,off,ses:ses.sort((a,b)=>a.date.localeCompare(b.date)),res,ref};
  if(window.MOCK&&!window.MOCK.enDemo)demo()};
E.coachVue=()=>!!S.moi?.coach;
E.apercu=null;const AID=()=>E.apercu??me();
E.athleteVue=()=>E.apercu!=null||D.ath.some(a=>a.membre_id===me()&&a.statut!=="brouillon");
const athOf=id=>D.ath.find(a=>a.membre_id===id),goalsOf=id=>D.obj.filter(o=>o.membre_id===id).sort((a,b)=>a.date.localeCompare(b.date)),offsOf=id=>D.off.filter(o=>o.membre_id===id),sesOf=id=>D.ses.filter(s=>s.membre_id===id),resOf=sid=>D.res.find(r=>r.seance_id===sid);

// ---------- feux, points, badges ----------
const feu=c=>c.douleur||c.fatigue>=CFG.fatRed||(c.fatigue>=CFG.fatOrange&&c.sommeil==="mauvais")?"rouge":c.effort-c.x>=CFG.orangeUp||c.fatigue>=CFG.fatOrange||c.sommeil==="mauvais"?"orange":c.x-c.effort>=CFG.bonusDown&&c.fatigue<=2?"bonus":"vert";
const FEU={vert:["Feu vert","var(--ok)","Suite inchangée."],orange:["Feu orange","var(--warn)","Séance suivante en endurance, plus courte."],rouge:["Feu rouge","var(--red)","Repos ou 20' de mobilité. Douleur plus de 3 jours : médecin."],bonus:["Bonus","#2b5f8a","Inchangé. 3 fois de suite : +10 % la semaine suivante."]};
const fait=s=>(r=>r?.faite?(r.duree_reelle??s.duree??0):0)(resOf(s.id));
const xpOf=(s,m)=>CFG.xpBase+Math.round((m??s.duree??0)/CFG.xpDiv);
const grade=x=>{const G=[...CFG.grades].sort((a,b)=>a[1]-b[1]),g=G.filter(g=>x>=g[1]).pop()||G[0];return{g,n:G[G.indexOf(g)+1]}};
function suiviDe(id){const a=athOf(id),ses=sesOf(id),t0=auj(),st0=monday(pd(a?.debut||iso(t0))),wk=s=>Math.floor((pd(s.date)-st0)/6048e5)+1,TW=Math.floor((t0-st0)/6048e5)+1;
  const passe=ses.filter(s=>pd(s.date)<t0&&s.duree>0),ok1=s=>resOf(s.id)?.faite,wks=[];
  for(let w=1;w<TW;w++){const l=passe.filter(s=>wk(s)===w);if(!l.length)continue;const pl=l.reduce((x,s)=>x+s.duree*s.effort,0),re=l.filter(ok1).reduce((x,s)=>x+fait(s)*(resOf(s.id).effort||s.effort),0);wks.push({w,pl,re,ok:l.filter(ok1).length,n:l.length,hp:l.reduce((x,s)=>x+s.duree,0)/60,hr:l.reduce((x,s)=>x+fait(s),0)/60,km:l.reduce((x,s)=>x+(+resOf(s.id)?.km||0),0)})}
  let streak=0;wks.forEach(w=>streak=w.ok>=w.n-1?streak+1:0);
  const l2=passe.filter(s=>wk(s)>=TW-2),l4=passe.filter(s=>wk(s)>=TW-4),reg=l2.length?l2.filter(ok1).length/l2.length:1,reg4=l4.length?Math.round(100*l4.filter(ok1).length/l4.length):null;
  const refs=D.ref.filter(r=>r.membre_id===id),byDay={};refs.forEach(r=>byDay[r.jour]=(byDay[r.jour]||0)+1);const habDays=Object.values(byDay).filter(n=>n>=2).length;
  const xp=passe.filter(ok1).reduce((x,s)=>x+xpOf(s,fait(s)),0)+wks.filter(w=>w.ok>=w.n-1).length*CFG.xpWeek+refs.length*CFG.xpHab;
  const fx=passe.map(s=>{const r=resOf(s.id);return r?.faite?{s,f:r.feu,p:r.duree_reelle!=null&&r.duree_reelle<s.duree}:{s,f:null}});const last=[...fx].reverse().find(x=>x.f);
  const orange=fx.filter(x=>wk(x.s)===TW-1&&x.f==="orange").length;
  return{a,ses,TW,wk,wks,streak,reg,reg4,habDays,xp,fx,last:last?.f||null,orange,st0}}
const decision=s=>s.orange>=3?["Semaine de récup","3 feux orange","var(--warn)"]:s.reg<CFG.regLow/100?["Semaine refaite",`assiduité < ${CFG.regLow} %`,"var(--red)"]:s.reg<CFG.regHigh/100?["Volume maintenu",`assiduité ${CFG.regLow}-${CFG.regHigh} %`,"var(--warn)"]:["Progression normale",`assiduité ${Math.round(s.reg*100)} %`,"var(--ok)"];
function badges(id){const s=suiviDe(id),faits=s.ses.filter(x=>resOf(x.id)?.faite),B=[];
  CFG.badges.forEach(b=>{if(b.t==="velo"||b.t==="cap"){const re=b.t==="velo"?/^V (\S+)/:/^CAP (\S+)/,hit=l=>l.some(x=>{const m=x.texte.match(re);return m&&dur(m[1])>=b.v});if(hit(s.ses))B.push({n:b.n,s:fm(b.v),ok:hit(faits)})}
    else if(b.t==="sem")B.push({n:b.n,s:"×"+b.v,ok:s.streak>=b.v});else if(b.t==="ref")B.push({n:b.n,s:b.v+"j",ok:s.habDays>=b.v});else goalsOf(id).forEach(g=>B.push({n:`${b.n} : ${g.titre}`,s:"★",ok:jx(g.date)<0}))});return B}
const medals=B=>B.length?`<div class="en-medals">${B.map(b=>`<div class="en-medal ${b.ok?"ok":"no"}"><i>${esc(b.s)}</i><span>${esc(b.n)}</span></div>`).join("")}</div>`:'<p class="hint">Aucun badge.</p>';

// ---------- écritures ----------
async function sauverAthlete(id,draft){const a={membre_id:id,coach_id:me(),heures:draft.heures,jours:draft.jours,jour_long:draft.jour_long,niveau:draft.niveau,point_faible:draft.point_faible,debut:draft.debut,reflexes:(draft.reflexes||["leg","prot","sun"]).map(rid),statut:athOf(id)?.statut||"brouillon"};
  await q(sb.from("entrainement_athletes").upsert(a),"Athlète");
  await q(sb.from("objectifs").delete().eq("membre_id",id),"Objectifs");if(draft.goals.length)await q(sb.from("objectifs").insert(draft.goals.map(g=>({membre_id:id,titre:g.titre,sport:g.sport,distance:g.distance,date:g.date,principal:!!g.principal}))),"Objectifs");
  await q(sb.from("indisponibilites").delete().eq("membre_id",id),"Indisponibilités");const of=draft.offs.filter(o=>o.du&&o.au);if(of.length)await q(sb.from("indisponibilites").insert(of.map(o=>({membre_id:id,du:o.du,au:o.au,motif:o.motif||null}))),"Indisponibilités")}
async function generer(id,draft){const weeks=gen(draft,draft.goals,draft.offs),t0=iso(addD(auj(),-1));
  await q(sb.from("seances").delete().eq("membre_id",id).gt("date",t0),"Séances");
  const rows=weeks.flatMap(w=>w.ses.map(s=>({membre_id:id,date:iso(addD(w.mon,s.di)),texte:s.t,duree:s.min,effort:effort(s.t),cle:!!s.cle,phase:w.phase,modifiee:false}))).filter(r=>r.date>t0);
  if(rows.length)await q(sb.from("seances").insert(rows),"Séances");await q(sb.from("entrainement_athletes").update({statut:"brouillon"}).eq("membre_id",id),"Statut")}
const statut=(id,s)=>q(sb.from("entrainement_athletes").update({statut:s}).eq("membre_id",id),"Statut");
const sauverCfg=()=>q(sb.from("reglages_entrainement").upsert({id:1,data:CFG}),"Réglages");
async function rel(){try{await E.charger()}catch(e){}render()}

// =====================================================================
// COACH
// =====================================================================
const C={det:new Set(),top:"ath",sel:null,sub:"suivi",draft:null,sim:100,gSel:null};
const chipsH=(opts,on,attr,dis)=>`<div class="en-chips">${opts.map(o=>`<button type="button" ${attr}="${esc(o[0])}" aria-pressed="${on(o[0])}" ${dis&&dis(o[0])?"disabled":""}>${esc(o[1])}</button>`).join("")}</div>`;
function draftDe(id){const a=athOf(id)||{},g=goalsOf(id);return{heures:+a.heures||6,jours:a.jours||[1,3,6],jour_long:a.jour_long??6,niveau:a.niveau||"deb",point_faible:a.point_faible||"Aucun",debut:a.debut||iso(monday(addD(auj(),7))),reflexes:a?refsDe(a):["leg","prot","sun"],
  goals:g.length?g.map(x=>({...x})):[{titre:"Mon objectif",sport:"run",distance:"21",date:iso(addD(auj(),112)),principal:true}],offs:offsOf(id).map(o=>({...o}))}}
E.renderCoach=()=>{const el=$("#coach");if(!el)return;E.apercu=null;
  let h=`<div class="en-tabs" role="tablist"><button data-en-top="ath" aria-selected="${C.top==="ath"}">Athlètes</button><button data-en-top="game" aria-selected="${C.top==="game"}">Points, badges, feux</button></div>`;
  h+=C.top==="game"?coachGame():C.sel==null?coachListe():coachFiche();el.innerHTML=h;plier(el);dessiner()};
function plier(root){root.querySelectorAll("[data-en-fold]").forEach(c=>{const k=c.dataset.enFold,d=document.createElement("details"),s=document.createElement("summary"),head=c.firstElementChild,h2=head.tagName==="H2"?head:head.querySelector("h2");
  d.className="card en-det";d.dataset.enDet=k;d.open=C.det.has(k);s.appendChild(h2);if(head!==h2&&!head.textContent.trim()&&!head.querySelector("button"))head.remove();d.appendChild(s);while(c.firstChild)d.appendChild(c.firstChild);c.replaceWith(d)})}
document.addEventListener("toggle",e=>{const d=e.target;if(d.dataset?.enDet)d.open?C.det.add(d.dataset.enDet):C.det.delete(d.dataset.enDet)},true);
function coachListe(){const l=D.ath.filter(a=>a.coach_id===me()||S.moi?.coach);
  return l.map(a=>{const s=suiviDe(a.membre_id),G=mainG(goalsOf(a.membre_id));return`<button class="card" style="text-align:left;width:100%" data-en-ath="${a.membre_id}"><div class="en-ttl"><h2>${esc(prenomDe(a.membre_id))}</h2><span class="pill">${a.statut==="publie"?"Publié":a.statut==="modifie"?"À republier":"Brouillon"}</span></div>
    <span class="hint">${G?`${esc(G.titre)} · J-${jx(G.date)}`:"Objectif à définir"}</span><div class="en-kpi"><span><strong>${s.reg4==null?"–":s.reg4+" %"}</strong>assiduité</span><span><strong>${s.last?`<span class="en-dot" style="background:${FEU[s.last][1]}"></span>`:"–"}</strong>dernier feu</span><span><strong>${s.streak}</strong>sem. pleines</span></div></button>`}).join("")
    +`<button class="btn sec" data-en-add>+ Ajouter un athlète</button>`}
function membresAjout(){const base=S.complets?.length?S.complets:S.membres;return base.filter(m=>(m.actif??true)&&!athOf(m.id))}
function coachFiche(){const id=C.sel,a=athOf(id),G=mainG(goalsOf(id));
  let h=`<button class="btn sec small" style="justify-self:start" data-en-back>‹ Mes athlètes</button><div class="en-hero"><div><h2>${esc(prenomDe(id))}</h2><span class="hint">${G?esc(G.titre+" · "+gLabel(G)):""}</span></div><div class="en-j">${G?"J-"+jx(G.date):""}</div></div>
  <button class="btn sec" data-en-voir="${id}">Voir son onglet Entraînement</button><div class="en-tabs">${[["suivi","Suivi"],["obj","Objectifs et dispos"],["plan","Plan"]].map(x=>`<button data-en-sub="${x[0]}" aria-selected="${C.sub===x[0]}">${x[1]}</button>`).join("")}</div>`;
  if(C.sub==="suivi")h+=coachSuivi(id);else if(C.sub==="obj")h+=coachObj(id);else h+=coachPlan(id,a);return h}
function coachSuivi(id){const s=suiviDe(id);if(!s.wks.length)return`<div class="card"><p class="hint" style="margin:0">Pas encore de ressenti.</p></div>`;const D2=decision(s),mx=Math.max(...s.wks.map(w=>Math.max(w.pl,w.re)))||1,cnt=f=>s.fx.filter(x=>x.f===f).length;
  return`<div class="card" style="border-left:5px solid ${D2[2]}"><span class="sect">Semaine prochaine</span><h2>${D2[0]}</h2><span class="hint">${D2[1]}</span></div>
  <div class="card"><div class="en-kpi"><span><strong>${s.reg4??"–"} %</strong>assiduité 4 sem.</span><span><strong>${s.fx.filter(x=>x.f).length}/${s.fx.length}</strong>séances</span><span><strong>${cnt("vert")+cnt("bonus")}·${cnt("orange")}·${cnt("rouge")}</strong>feux V·O·R</span></div></div>
  <div class="card"><h2>Charge prévue / réalisée</h2>${s.wks.map(w=>`<div class="en-row"><b>S${w.w}</b><div class="en-bar"><u style="width:${100*w.pl/mx}%"></u><i style="width:${100*w.re/mx}%"></i></div><span style="text-align:right">${w.ok}/${w.n}</span></div>`).join("")}</div>
  <div class="card"><h2>Derniers ressentis</h2>${s.fx.slice(-5).reverse().map(x=>`<div><span class="hint">${fdl(pd(x.s.date))}</span><br>${esc(x.s.texte)}<br><span class="en-dot" style="background:${x.f?FEU[x.f][1]:"var(--red)"}"></span>${x.f?FEU[x.f][0]+(x.p?" · en partie":""):"Manquée"}${resOf(x.s.id)?.raison?` · ${RLAB[resOf(x.s.id).raison].toLowerCase()}`:""}</div>`).join("")}</div>`}
function coachObj(id){const d=C.draft||(C.draft=draftDe(id));
  return`<div class="en-ttl"><span class="sect">Objectifs</span><button class="en-i" data-en-info="goals">?</button></div>
  ${d.goals.map((g,i)=>`<div class="en-goal ${g.principal?"main":""}"><div class="en-ttl"><input data-en-g="${i}" data-en-k="titre" value="${esc(g.titre)}" aria-label="Titre">${d.goals.length>1?`<button class="en-x" data-en-delg="${i}" aria-label="Supprimer">✕</button>`:""}</div>
    ${chipsH(Object.entries(SPORT).map(([k,v])=>[k,v.n]),v=>g.sport===v,`data-en-sport="${i}" data-en-v`)}${chipsH(SPORT[g.sport].d,v=>g.distance===v,`data-en-dist="${i}" data-en-v`)}
    ${SPORT[g.sport].free?`<label>Autre distance (km)<input type="number" min="1" data-en-g="${i}" data-en-k="distance" value="${SPORT[g.sport].d.some(x=>x[0]===g.distance)?"":esc(g.distance)}"></label>`:""}
    <div class="en-2"><input type="date" data-en-g="${i}" data-en-k="date" value="${g.date}" aria-label="Date"><button class="btn ${g.principal?"pri":"sec"}" data-en-main="${i}">${g.principal?"Principal":"Mettre principal"}</button></div></div>`).join("")}
  <button class="btn sec" data-en-addg>+ Objectif</button>
  <div class="en-ttl"><span class="sect">Indisponibilités</span><button class="en-i" data-en-info="off">?</button></div>
  ${d.offs.map((o,i)=>`<div class="en-goal"><div class="en-2"><input type="date" data-en-o="${i}" data-en-k="du" value="${o.du||""}" aria-label="Du"><input type="date" data-en-o="${i}" data-en-k="au" value="${o.au||""}" aria-label="Au"></div><div class="en-ttl"><input data-en-o="${i}" data-en-k="motif" value="${esc(o.motif||"")}" placeholder="Motif" aria-label="Motif"><button class="en-x" data-en-delo="${i}" aria-label="Supprimer">✕</button></div></div>`).join("")}
  <button class="btn sec" data-en-addo>+ Période</button>
  <span class="sect">Disponibilités</span>
  <label>Début du plan<input type="date" data-en-d="debut" value="${d.debut}"></label>
  <label>Temps par semaine : ${String(d.heures).replace(".",",")} h<input type="range" min="3" max="14" step="0.5" data-en-d="heures" value="${d.heures}"></label>
  <label>Jours possibles</label>${chipsH(WK.map((x,i)=>[i,x]),v=>d.jours.includes(+v),"data-en-day")}
  <label>Jour de la sortie longue</label>${chipsH(WK.map((x,i)=>[i,x]),v=>d.jour_long===+v,"data-en-long",v=>!d.jours.includes(+v))}
  <label>Niveau</label>${chipsH(LEVEL,v=>d.niveau===v,"data-en-lvl")}
  ${mainG(d.goals).sport==="tri"?`<label>Point faible</label>${chipsH([["Natation","Natation"],["Vélo","Vélo"],["Course à pied","Course"],["Aucun","Aucun"]],v=>d.point_faible===v,"data-en-weak")}`:""}
  <div class="card" id="en-sum">${resume(d)}</div>
  <div class="btns" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sec" data-en-save>Enregistrer</button><button class="btn acc" data-en-gen>Enregistrer et générer</button></div>`}
function resume(d){const G=mainG(d.goals);if(d.jours.length<3||!G?.date||pd(G.date)<=pd(d.debut))return`<span style="color:var(--red)">3 jours minimum et une date d'objectif après le début.</span>`;
  const w=gen(d,d.goals,d.offs),vol=w.map(x=>x.ses.reduce((a,s)=>a+s.min,0)/60);return`<span class="sect">Aperçu</span><h2>${w.length} semaines · pic ${dec(Math.max(...vol))} h</h2><span class="hint">${d.goals.length} objectif${d.goals.length>1?"s":""} · ${d.jours.length} jours par semaine</span>`}
function semaines(id){const a=athOf(id),st0=monday(pd(a?.debut||iso(auj()))),W={};sesOf(id).forEach(s=>{const w=Math.floor((pd(s.date)-st0)/6048e5)+1;(W[w]??={w,mon:addD(st0,(w-1)*7),phase:s.phase,ses:[]}).ses.push(s)});return Object.values(W).sort((x,y)=>x.w-y.w)}
function coachPlan(id,a){if(!a)return`<div class="card"><p class="hint" style="margin:0">Enregistre d'abord les objectifs.</p></div>`;const W=semaines(id),TW=suiviDe(id).TW;
  const lab={publie:"Publié",modifie:"Modifié, à republier",brouillon:"Brouillon, non visible"}[a.statut]||"Brouillon";
  return`<div class="en-ttl"><span class="pill">${lab}</span><span style="display:flex;gap:8px;align-items:center"><button class="en-i" data-en-info="plan">?</button><button class="btn pri" data-en-pub>Publier</button></span></div>
  ${W.length?`<div class="card"><div class="en-ttl"><h2>Volume par semaine</h2><button class="en-i" data-en-info="sim">?</button></div><div class="en-fig" style="min-height:200px"><svg id="en-vol"></svg></div><div class="en-leg">${[["Base 1","var(--wash)"],["Base 2","#d9cdb8"],["Spécifique","var(--warn)"],["Récup","var(--ok-soft)"],["Affûtage","#2b5f8a"],["Course","var(--red)"]].map(([n,c])=>`<span><i style="background:${c}"></i>${n}</span>`).join("")}<span><b style="color:var(--red)">✕</b> objectif</span><span><i style="background:var(--red);height:3px;border:0"></i>volume adapté (curseur)</span></div>
  <label>Assiduité simulée : ${C.sim} %<input type="range" min="40" max="100" step="5" value="${C.sim}" data-en-sim></label></div>`:`<p class="hint">Aucune séance : génère le plan depuis « Objectifs et dispos ».</p>`}
  ${W.map(w=>`<details class="en-wk" ${w.w===Math.max(1,TW)?"open":""}><summary><b>S${w.w}</b><span><span class="pill">${esc(w.phase||"")}</span> <span class="hint">${fds(w.mon)}</span></span><span>${w.ses.some(s=>/OBJECTIF/.test(s.texte))?'<b style="color:var(--red);font-size:14px">objectif</b>':dec(w.ses.reduce((x,s)=>x+(s.duree||0),0)/60)+" h"}</span></summary>
    ${w.ses.map(s=>`<button class="en-ses ${s.cle?"cle":""}" data-en-ses="${s.id}"><span>${WK[(pd(s.date).getDay()+6)%7]}</span><span>${esc(s.texte)}${resOf(s.id)?` <span class="en-dot" style="background:${resOf(s.id).faite?FEU[resOf(s.id).feu]?.[1]:"var(--red)"}"></span>`:""}</span></button>`).join("")}
    <button class="btn sec small" style="margin:6px 14px 12px" data-en-addses="${iso(w.mon)}">+ Séance</button></details>`).join("")}`}
function adapted(vols,phases,a){let reach=null,peak=0;return vols.map((v,i)=>{const ld=!["Récup","Affûtage","Course"].includes(phases[i]);if(reach==null)reach=v;
  if(ld){reach=a>=CFG.regHigh/100?v:a>=CFG.regLow/100?Math.min(v,reach):Math.min(v,reach*.97);peak=v;return reach}return v*(peak?reach/peak:1)})}
function editerSeance(id,sid,lundi){const s=sid?D.ses.find(x=>x.id==sid):{date:lundi,texte:"CAP 45' EF",duree:45,cle:false,phase:""};
  const m=s.texte.match(/^(N|V|HT|CAP|Renfo) (\d+h\d*|\d+')\s*:?\s*(.*)$/),f={d:m?m[1]:"Autre",min:m?dur(m[2]):s.duree,txt:m?m[3]:s.texte,date:s.date,cle:!!s.cle};
  const lun=monday(pd(s.date)),txt=()=>f.d==="Autre"?f.txt:`${f.d} ${fm(+f.min||0)}${f.d==="N"&&f.txt?" :":""}${f.txt?" "+f.txt:""}`;
  const draw=()=>ouvrirPanel(`<div style="display:grid;gap:12px" id="en-edit"><h2>${sid?"Modifier la séance":"Nouvelle séance"}</h2>
    <label>Jour</label>${chipsH(WK.map((x,i)=>[iso(addD(lun,i)),x]),v=>f.date===v,"data-en-ed-day")}
    <label>Discipline</label>${chipsH([["N","Natation"],["V","Vélo"],["HT","Home trainer"],["CAP","Course"],["Renfo","Renfo"],["Autre","Autre"]],v=>f.d===v,"data-en-ed-d")}
    <div class="en-2"><label>Durée (min)<input type="number" min="0" step="5" id="en-ed-min" value="${f.min}"></label><label style="align-self:end;display:flex;gap:8px;align-items:center"><input type="checkbox" id="en-ed-cle" style="width:22px;height:22px" ${f.cle?"checked":""}> Séance clé</label></div>
    <label>Contenu<input id="en-ed-txt" value="${esc(f.txt)}" placeholder="EF, dont 3×8' seuil…"></label><span class="hint" id="en-ed-prev">${esc(txt())}</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn acc" id="en-ed-ok">Enregistrer</button>${sid?'<button class="btn del" id="en-ed-del">Supprimer</button>':""}<button class="btn sec" data-close>Annuler</button></div></div>`);
  draw();const p=$("#panel");
  p.onclick=async e=>{const b=e.target.closest("button");if(!b||!p.querySelector("#en-edit"))return;
    if(b.dataset.enEdDay){f.date=b.dataset.enEdDay;return draw()}if(b.dataset.enEdD){f.d=b.dataset.enEdD;return draw()}
    if(b.id==="en-ed-ok"){const t=txt(),row={membre_id:id,date:f.date,texte:t,duree:dur(t)||+f.min||0,effort:effort(t),cle:f.cle,phase:s.phase,modifiee:true};occupe(b,true);
      try{sid?await q(sb.from("seances").update(row).eq("id",sid),"Séance"):await q(sb.from("seances").insert(row),"Séance");await marquerModifie(id);fermer();toast("Séance enregistrée");rel()}catch(er){occupe(b,false)}}
    if(b.id==="en-ed-del"){occupe(b,true);try{await q(sb.from("seances").delete().eq("id",sid),"Séance");await marquerModifie(id);fermer();toast("Séance supprimée");rel()}catch(er){occupe(b,false)}}};
  p.oninput=e=>{if(!p.querySelector("#en-edit"))return;if(e.target.id==="en-ed-min")f.min=+e.target.value;if(e.target.id==="en-ed-txt")f.txt=e.target.value;if(e.target.id==="en-ed-cle")f.cle=e.target.checked;const pv=p.querySelector("#en-ed-prev");if(pv)pv.textContent=txt()};
  p.onchange=e=>{if(e.target.id==="en-ed-cle")f.cle=e.target.checked}}
const marquerModifie=id=>athOf(id)?.statut==="publie"?statut(id,"modifie"):null;
function coachGame(){const l=D.ath;if(C.gSel==null||!athOf(C.gSel))C.gSel=l[0]?.membre_id??null;const a=athOf(C.gSel),num=(lab,k)=>`<span>${lab}</span><input type="number" data-en-cfg="${k}" value="${CFG[k]}">`;
  return`${l.length?`<div class="card"><div class="en-ttl"><h2>Évolution des points</h2><button class="en-i" data-en-info="xp">?</button></div>${chipsH(l.map(x=>[x.membre_id,prenomDe(x.membre_id)]),v=>C.gSel==v,"data-en-gsel")}<div class="en-fig" style="min-height:220px"><svg id="en-xp"></svg></div>
    <span class="hint"><span class="en-dot" style="background:var(--ink)"></span>réalisé <span class="en-dot" style="background:var(--red)"></span>projection 100 % <span class="en-dot" style="background:var(--warn)"></span>70 %</span></div>`:""}
  <div class="card" data-en-fold="pts"><h2>Gain de points</h2><div class="en-cfg">${num("Base par séance","xpBase")+num("+1 point toutes les … min","xpDiv")+num("Bonus semaine pleine","xpWeek")+num("Réflexe tenu (par jour)","xpHab")}</div></div>
  <div class="card" data-en-fold="gr"><h2>Grades</h2>${CFG.grades.map((g,i)=>`<div class="en-cfg3"><input data-en-grn="${i}" value="${esc(g[0])}" aria-label="Grade"><input type="number" data-en-grv="${i}" value="${g[1]}" ${i?"":"disabled"} aria-label="Points"><button class="en-x" data-en-grd="${i}" ${i?"":"disabled"} aria-label="Supprimer">✕</button></div>`).join("")}<button class="btn sec" data-en-gradd>+ Grade</button></div>
  <div class="card" data-en-fold="bd"><div class="en-ttl"><h2>Badges</h2><button class="en-i" data-en-info="badges">?</button></div>${CFG.badges.map((b,i)=>`<div class="en-bd"><input data-en-bn="${i}" value="${esc(b.n)}" aria-label="Badge"><select data-en-bt="${i}" aria-label="Type">${BT.map(t=>`<option value="${t[0]}" ${b.t===t[0]?"selected":""}>${t[1]}</option>`).join("")}</select><input type="number" data-en-bv="${i}" value="${b.v}" ${b.t==="obj"?"disabled":""} aria-label="Seuil"><button class="en-x" data-en-bd="${i}" aria-label="Supprimer">✕</button></div>`).join("")}<button class="btn sec" data-en-badd>+ Badge</button>${a?`<span class="sect">Badges de ${esc(prenomDe(a.membre_id))}</span>${medals(badges(a.membre_id))}`:""}</div>
  <div class="card" data-en-fold="rf"><div class="en-ttl"><h2>Réflexes</h2><button class="en-i" data-en-info="habsC">?</button></div>${CFG.habits.map((h,i)=>`<div class="en-hb"><button class="en-x" data-en-hic="${i}" aria-label="Changer l'icône"><svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HIC[h.ic]||""}</svg></button><input data-en-hn="${i}" value="${esc(h.n)}" aria-label="Réflexe">${a?`<input type="checkbox" style="width:22px;height:22px;justify-self:center" data-en-hs="${esc(h.id)}" ${refsDe(a).includes(h.id)?"checked":""} aria-label="Pour ${esc(prenomDe(a.membre_id))}">`:"<span></span>"}<button class="en-x" data-en-hd="${i}" aria-label="Supprimer">✕</button></div>`).join("")}<button class="btn sec" data-en-hadd>+ Réflexe</button>${a?`<span class="hint">Case cochée : réflexe de la semaine de ${esc(prenomDe(a.membre_id))} (3 max).</span>`:""}</div>
  <div class="card" data-en-fold="ct"><h2>Citations</h2><span class="hint">Une citation est tirée au sort chaque jour, la même pour tous les athlètes. Aujourd'hui : « ${esc(citationDuJour())} »</span>${(CFG.citations||[]).map((c,i)=>`<div class="en-cl"><textarea data-en-cit="${i}" aria-label="Citation ${i+1}">${esc(c)}</textarea><button class="en-x" data-en-citd="${i}" aria-label="Supprimer">✕</button></div>`).join("")}<button class="btn sec" data-en-citadd>+ Citation</button></div>
  <div class="card" data-en-fold="fx"><div class="en-ttl"><h2>Feux</h2><button class="en-i" data-en-info="feux">?</button></div><div class="en-cfg">${num("Orange si effort ≥ visé +","orangeUp")+num("Bonus si effort ≤ visé −","bonusDown")+num("Orange si fatigue ≥","fatOrange")+num("Rouge si fatigue ≥","fatRed")+num("Orange : raccourcir de (%)","cut")+num("Semaine refaite sous (%)","regLow")+num("Progression dès (%)","regHigh")}</div>
  ${a?`<div class="en-fg">${suiviDe(a.membre_id).wks.map(w=>`<div><span style="width:auto;height:auto">S${w.w}</span>${suiviDe(a.membre_id).fx.filter(x=>suiviDe(a.membre_id).wk(x.s)===w.w).map(x=>`<span style="background:${x.f?FEU[x.f][1]:"transparent"};${x.f?"":"border:2px solid var(--red)"}"></span>`).join("")}</div>`).join("")}</div>`:""}</div>`}
// événements du coach
const coachEl=()=>$("#coach");
document.addEventListener("click",async e=>{const root=e.target.closest("#coach");if(!root)return;const b=e.target.closest("button");if(!b)return;const d=b.dataset,dr=C.draft;e.stopPropagation();
  const re=()=>E.renderCoach();
  if(d.enTop){C.top=d.enTop;return re()}if(d.enInfo)return info(d.enInfo);
  if(d.enVoir){E.apercu=+d.enVoir;A.sub="today";A.phase="signal";vue="entrainement";render();scrollTo(0,0);return toast(`Aperçu : l'onglet de ${prenomDe(E.apercu)}`)}
  if(d.enAth){C.sel=+d.enAth;C.sub="suivi";C.draft=null;return re()}if("enBack" in d){C.sel=null;C.draft=null;return re()}if(d.enSub){C.sub=d.enSub;return re()}
  if("enAdd" in d){const l=membresAjout();return ouvrirPanel(`<div style="display:grid;gap:12px"><h2>Ajouter un athlète</h2><span class="hint">Membres actifs du club.</span>${l.length?`<div class="en-chips">${l.map(m=>`<button data-en-pick="${m.id}" ${m.user_id===null?"disabled":""}>${esc(m.prenom)}${m.user_id===null?" · sans compte":""}</button>`).join("")}</div>`:'<p class="hint">Tous les membres sont déjà suivis.</p>'}<button class="btn sec" data-close>Fermer</button></div>`)}
  if(dr&&d.enSport!==undefined){const g=dr.goals[+d.enSport];g.sport=d.enV;g.distance=DEFD[d.enV];return re()}
  if(dr&&d.enDist!==undefined){dr.goals[+d.enDist].distance=d.enV;return re()}
  if(dr&&d.enMain!==undefined){dr.goals.forEach((g,i)=>g.principal=i===+d.enMain);return re()}
  if(dr&&d.enDelg!==undefined){const w=dr.goals.splice(+d.enDelg,1)[0];if(w.principal&&dr.goals[0])dr.goals[0].principal=true;return re()}
  if(dr&&"enAddg" in d){dr.goals.push({titre:"Objectif",sport:"bike",distance:"100",date:iso(addD(pd(mainG(dr.goals).date),-42)),principal:false});return re()}
  if(dr&&"enAddo" in d){const x=addD(auj(),28);dr.offs.push({du:iso(x),au:iso(addD(x,6)),motif:""});return re()}
  if(dr&&d.enDelo!==undefined){dr.offs.splice(+d.enDelo,1);return re()}
  if(dr&&d.enDay!==undefined){const v=+d.enDay;dr.jours=dr.jours.includes(v)?dr.jours.filter(x=>x!==v):[...dr.jours,v];if(!dr.jours.includes(dr.jour_long))dr.jour_long=dr.jours.at(-1);return re()}
  if(dr&&d.enLong!==undefined){dr.jour_long=+d.enLong;return re()}if(dr&&d.enLvl){dr.niveau=d.enLvl;return re()}if(dr&&d.enWeak){dr.point_faible=d.enWeak;return re()}
  if("enSave" in d||"enGen" in d){if(dr.jours.length<3)return toast("3 jours minimum");occupe(b,true);try{await sauverAthlete(C.sel,dr);if("enGen" in d){await generer(C.sel,dr);C.sub="plan"}C.draft=null;toast("enGen" in d?"Plan généré en brouillon":"Enregistré");await rel()}catch(er){occupe(b,false)}return}
  if("enPub" in d){occupe(b,true);try{await statut(C.sel,"publie");toast("Publié");await rel()}catch(er){occupe(b,false)}return}
  if(d.enSes)return editerSeance(C.sel,d.enSes);if(d.enAddses)return editerSeance(C.sel,null,d.enAddses);
  if(d.enGsel){C.gSel=+d.enGsel;return re()}
  let ch=1;if(d.enGrd!==undefined)CFG.grades.splice(+d.enGrd,1);else if("enGradd" in d){const l=[...CFG.grades].sort((x,y)=>x[1]-y[1]).at(-1);CFG.grades.push(["Nouveau grade",l[1]+800])}
  else if(d.enBd!==undefined)CFG.badges.splice(+d.enBd,1);else if("enBadd" in d)CFG.badges.push({n:"Nouveau badge",t:"velo",v:150});
  else if(d.enHd!==undefined){const k=CFG.habits[+d.enHd].id;CFG.habits.splice(+d.enHd,1);for(const a of D.ath){const r=(a.reflexes||[]).map(rid);if(r.includes(k)){a.reflexes=r.filter(x=>x!==k);sb.from("entrainement_athletes").update({reflexes:a.reflexes}).eq("membre_id",a.membre_id).then(()=>{})}}}
  else if(d.enCitd!==undefined)CFG.citations.splice(+d.enCitd,1);else if("enCitadd" in d){(CFG.citations??=[]).push("");C.det.add("ct")}else if("enHadd" in d)CFG.habits.push({id:"h"+Date.now().toString(36),n:"Nouveau réflexe",ic:"fruit"});else if(d.enHic!==undefined){const h=CFG.habits[+d.enHic],k=Object.keys(HIC);h.ic=k[(k.indexOf(h.ic)+1)%k.length]}else ch=0;
  if(ch){try{await sauverCfg();toast("Réglage enregistré")}catch(er){}re()}},true);
document.addEventListener("click",async e=>{const b=e.target.closest("[data-en-pick]");if(!b)return;e.stopPropagation();const id=+b.dataset.enPick,dr=draftDe(id);occupe(b,true);
  try{await sauverAthlete(id,dr);fermer();C.top="ath";C.sel=id;C.sub="obj";C.draft=null;toast(`${prenomDe(id)} ajouté·e`);await rel()}catch(er){occupe(b,false)}},true);
document.addEventListener("input",e=>{const t=e.target;if(!t.closest("#coach"))return;const d=t.dataset,dr=C.draft;
  if(dr&&d.enG!==undefined){const g=dr.goals[+d.enG];if(d.enK==="distance"){if(+t.value>0)g.distance=String(+t.value)}else g[d.enK]=t.value}
  else if(dr&&d.enO!==undefined)dr.offs[+d.enO][d.enK]=t.value;else if(dr&&d.enD){dr[d.enD]=d.enD==="heures"?+t.value:t.value;if(d.enD==="heures"){const l=t.closest("label");if(l)l.firstChild.textContent=`Temps par semaine : ${String(dr.heures).replace(".",",")} h`}}
  else if(d.enSim!==undefined){C.sim=+t.value;const l=t.closest("label");if(l)l.firstChild.textContent=`Assiduité simulée : ${C.sim} %`;return dessiner()}else return;const s=$("#en-sum");if(s)s.innerHTML=resume(dr)});
document.addEventListener("change",async e=>{const t=e.target;if(!t.closest("#coach"))return;const d=t.dataset;let ch=1;
  if(d.enCfg)CFG[d.enCfg]=+t.value;else if(d.enGrn!==undefined)CFG.grades[+d.enGrn][0]=t.value;else if(d.enGrv!==undefined)CFG.grades[+d.enGrv][1]=+t.value;
  else if(d.enBn!==undefined)CFG.badges[+d.enBn].n=t.value;else if(d.enBt!==undefined)CFG.badges[+d.enBt].t=t.value;else if(d.enBv!==undefined)CFG.badges[+d.enBv].v=+t.value;else if(d.enHn!==undefined)CFG.habits[+d.enHn].n=t.value;else if(d.enCit!==undefined)CFG.citations[+d.enCit]=t.value.trim();
  else if(d.enHs!==undefined){ch=0;const a=athOf(C.gSel),i=d.enHs;let r=refsDe(a);if(t.checked){if(r.length>=3){t.checked=false;return toast("3 réflexes maximum")}r.push(i)}else r=r.filter(x=>x!==i);
    try{await q(sb.from("entrainement_athletes").update({reflexes:r}).eq("membre_id",a.membre_id),"Réflexes");a.reflexes=r;toast("Enregistré")}catch(er){t.checked=!t.checked}return}
  else if(d.enG!==undefined||d.enO!==undefined||d.enD)return;else ch=0;if(ch){try{await sauverCfg();toast("Réglage enregistré")}catch(er){}E.renderCoach()}});

// =====================================================================
// ATHLÈTE
// =====================================================================
const A={raison:null,mode:"complet",dmin:30,km:"",unit:"h",sub:"today",phase:"signal",tok:-Math.PI/2,c:{fatigue:2,sommeil:"bon",douleur:false},rpe:4,dt:0,kgD:7};
const DAYT=[{n:"Sortie longue le matin",sess:8.5,len:3,m:[[1,[.55,.15,.3],"Flocons ou pain, œufs ou fromage blanc, fruit"],[.45,[.7,.3,0],"Ravito : barre, compote, boisson"],[1,[.4,.3,.3],"Féculents, viande ou poisson, légumes"],[.45,[.5,.2,.3],"Yaourt, fruit, amandes"],[.6,[.2,.5,.3],"Soupe ou légumes, œufs ou poisson"]]},
  {n:"Séance l'après-midi",sess:14.5,len:1.25,m:[[.9,[.45,.2,.35],"Pain complet, œufs ou fromage blanc, fruit"],[.3,[.3,.5,.2],"Fruit ou yaourt"],[.75,[.45,.3,.25],"Tôt (12h) et digeste"],[.7,[.5,.2,.3],"Récup : laitage, fruit, pain"],[.8,[.3,.4,.3],"Assiette complète"]]},
  {n:"Séance le soir",sess:18,len:1.25,m:[[.8,[.45,.2,.35],"Pain complet, œufs, fruit"],[.3,[0,.6,.4],"Fruit ou yaourt"],[.9,[.35,.35,.3],"Assiette équilibrée"],[.6,[.65,.15,.2],"Banane, pain, chocolat : 1h30 avant"],[.7,[.3,.4,.3],"Féculents, légumes, protéines"]]},
  {n:"Repos",sess:null,m:[[.7,[.35,.25,.4],"Pain complet, œufs, fruit"],[.2,[0,1,0],"Un fruit si faim"],[.8,[.2,.5,.3],"Moitié légumes, protéines"],[.25,[0,.5,.5],"Yaourt"],[.6,[.15,.55,.3],"Légumes, protéines, peu de féculents"]]}];
const MEALS=["7h","10h","12h30","16h30","19h30"],MN=["Petit-déj","Collation","Déjeuner","Goûter","Dîner"],FC=["var(--warn)","var(--ok)","var(--red)"];
E.renderAthlete=()=>{const el=$("#entrainement");if(!el)return;const id=AID(),s=suiviDe(id),G=mainG(goalsOf(id)),{g,n}=grade(s.xp);
  el.innerHTML=`${E.apercu!=null?`<div class="apercu-m" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span>Aperçu de ${esc(prenomDe(id))} · rien n'est enregistré</span><button data-en-quit type="button">Quitter l'aperçu</button></div>`:""}<div class="en-hero"><div><h2>${G?`Cap sur ${esc(G.titre)}`:"Mon entraînement"}</h2><span class="hint">${G?`${esc(gLabel(G))} · ${fds(pd(G.date))}`:""}</span></div><div class="en-j">${G?"J-"+jx(G.date):""}<small>semaine ${Math.max(1,s.TW)}</small></div></div>
  <div class="en-rank"><b>${esc(g[0])}</b><div class="en-meter"><i style="width:${n?100*(s.xp-g[1])/(n[1]-g[1]):100}%"></i></div><span>${s.xp} pts · série ${s.streak} sem.</span></div>
  <div class="en-tabs">${[["today","Ma séance"],["map","Saison"],["fuel","Carburant"],["poids","Poids"],["rules","Règles"]].map(x=>`<button data-en-a="${x[0]}" aria-selected="${A.sub===x[0]}">${x[1]}</button>`).join("")}</div>`
  +({today:aToday,map:aMap,fuel:aFuel,poids:aPoids,rules:aRules}[A.sub])(id,s);dessiner()};
function jourSeances(id){const t=iso(auj()),l=sesOf(id),td=l.filter(s=>s.date===t),nx=l.find(s=>s.date>t);return{td,nx}}
function aToday(id,s){const{td,nx}=jourSeances(id),se=td[0],r=se&&resOf(se.id),lastF=[...s.fx].reverse().find(x=>x.f)?.f,cit=citationDuJour();
  let h=cit?`<div class="en-cit"><span>Citation du jour</span><p>${esc(cit)}</p></div>`:"";h+=`<div class="card">`;if(!se)h+=`<span class="sect">${fdl(auj())}</span><h2>Repos</h2><span class="hint">Récupère bien.</span>`;
  else{h+=`<span class="sect">${fdl(auj())} · ${disc(se.texte)} · effort visé ${se.effort}/10</span><h2 style="text-transform:none">${esc(se.texte)}</h2>`;
    if(r)h+=`<div class="en-res" style="border-color:${r.faite?FEU[r.feu][1]:"var(--muted)"}"><b>${r.faite?FEU[r.feu][0]+(r.duree_reelle!=null&&r.duree_reelle<se.duree?` · fait ${fm(r.duree_reelle)} sur ${fm(se.duree)}`:"")+(r.km?` · ${String(r.km).replace(".",",")} km`:""):"Pas faite"}</b> · ${r.raison?`Raison : ${RLAB[r.raison].toLowerCase()}. `:""}${r.faite&&["rouge","orange"].includes(r.feu)?FEU[r.feu][2]:r.raison?RMSG[r.raison]:r.faite?FEU[r.feu][2]:"On ne rattrape pas."}</div><button class="btn sec small" style="justify-self:start" data-en-redo>Modifier mon ressenti</button>`;
    else if(A.phase==="action")h+=`${A.mode==="partiel"?`<label>Durée faite (min) sur ${se.duree}<input type="number" min="5" step="5" max="${se.duree}" value="${A.dmin}" data-en-dmin></label><label>Pourquoi moins que prévu ?</label>${chipsH(RAISONS,v=>A.raison===v,"data-en-rs")}`:""}<label>Distance (km, facultatif)<input type="number" min="0" step="0.1" inputmode="decimal" value="${A.km}" data-en-km></label><label>Effort ressenti : ${A.rpe}/10<input type="range" min="1" max="10" value="${A.rpe}" data-en-rpe></label>
      <label>Fatigue générale</label>${chipsH([[1,"1 fraîche"],[2,"2"],[3,"3"],[4,"4"],[5,"5 vidée"]],v=>A.c.fatigue==v,"data-en-fat")}
      <label>Sommeil de la nuit précédente</label>${chipsH([["bon","Bon"],["moyen","Moyen"],["mauvais","Mauvais"]],v=>A.c.sommeil===v,"data-en-sl")}
      <label>Douleur qui gêne</label>${chipsH([["0","Non"],["1","Oui"]],v=>A.c.douleur===(v==="1"),"data-en-pain")}<button class="btn acc" data-en-send>Valider</button>`;
    else if(A.phase==="skip")h+=`<label>Pourquoi pas faite ?</label>${chipsH(RAISONS,v=>A.raison===v,"data-en-rs")}<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn acc" data-en-skipok>Valider</button><button class="btn sec" data-en-cancel>Annuler</button></div>`;
    else h+=`<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn acc" data-en-done>Faite</button><button class="btn sec" data-en-part>En partie</button><button class="btn sec" data-en-skip>Pas faite</button></div>`}
  h+=`</div><div class="card"><div class="en-ttl"><h2>Ma boucle</h2><button class="en-i" data-en-info="loop">?</button></div><div class="en-fig" style="min-height:270px"><svg id="en-loop"></svg></div></div>`;
  if(nx){const{t,pq}=adaptSuite(nx,r,se);h+=`<div class="card"><span class="sect">Prochaine séance · ${fdl(pd(nx.date))}${t!==nx.texte?" · adaptée":""}</span><b>${esc(t)}</b>${t!==nx.texte?`<span class="hint">Prévu : ${esc(nx.texte)} · ${esc(pq)}</span>`:""}</div>`}
  return h}
function aMap(id){return`<div class="card"><div class="en-ttl"><h2>Mon volume</h2>${chipsH([["h","Heures"],["km","Km"]],v=>A.unit===v,"data-en-unit")}</div><div class="en-fig" style="min-height:200px"><svg id="en-mvol"></svg></div><span class="hint" id="en-mvol-l"></span></div><div class="card"><div class="en-fig" style="min-height:340px"><svg id="en-track"></svg></div></div><div class="card"><h2>Mes badges</h2>${medals(badges(id))}</div>`}
function aFuel(id){const a=athOf(id),D2=DAYT[A.dt],lun=monday(auj()),td=(auj().getDay()+6)%7;
  return`<div class="card"><div class="en-ttl"><h2>Ma journée en assiettes</h2><button class="en-i" data-en-info="fuel">?</button></div><div class="en-dt">${chipsH(DAYT.map((x,i)=>[i,x.n]),v=>A.dt==v,"data-en-dt")}</div><div class="en-fig" style="min-height:190px"><svg id="en-day"></svg></div>
  ${MEALS.map((m,i)=>`<div class="en-meal"><span>${m}</span><span><b>${MN[i]}</b> ${D2.m[i][2]}</span></div>`).join("")}<span class="hint"><span class="en-dot" style="background:var(--warn)"></span>Féculents <span class="en-dot" style="background:var(--ok)"></span>Légumes, fruits <span class="en-dot" style="background:var(--red)"></span>Protéines</span></div>
  <div class="en-ttl"><h2>Mes 3 réflexes</h2><button class="en-i" data-en-info="habs">?</button></div><div class="en-habs">${(()=>{const sem=[0,1,2,3,4,5,6].map(k=>iso(addD(lun,k))),cur=refsDe(a).slice(0,3),anc=[...new Set(D.ref.filter(r=>r.membre_id===id&&sem.includes(r.jour)).map(r=>r.ref))].filter(k=>!cur.includes(k));
    const carte=(k,actif)=>{const h=habDe(k)||{n:"Ancien réflexe",ic:"fruit"},on=j=>D.ref.some(r=>r.membre_id===id&&r.ref===k&&r.jour===sem[j]);
      return`<${actif?"button":"div"} class="en-hab" ${actif?`data-en-hab="${esc(k)}" aria-pressed="${on(td)}"`:'style="opacity:.6"'}><svg viewBox="0 0 48 48">${HIC[h.ic]||""}</svg><span class="hn"><b>${esc(h.n)}</b>${actif?"":'<span class="hint">plus suivi cette semaine</span>'}</span>${actif?'<span class="ck"></span>':""}<span class="en-wd">${[0,1,2,3,4,5,6].map(j=>`<i class="${on(j)?"on":""}${j===td?" td":""}" title="${WK[j]}"></i>`).join("")}</span></${actif?"button":"div"}>`};
    return cur.map(k=>carte(k,1)).join("")+anc.map(k=>carte(k,0)).join("")||'<p class="hint">Pas de réflexe cette semaine.</p>'})()}</div>`}
function aPoids(){return`<div class="en-lock">Rien n'est enregistré : ni serveur, ni téléphone, ni coach.</div><div class="card"><div class="en-ttl"><h2>Ma pente</h2><button class="en-i" data-en-info="kg">?</button></div>
  <div class="en-2"><label>Départ (kg)<input type="number" step="0.1" inputmode="decimal" autocomplete="off" id="en-kg0"></label><label>Aujourd'hui (kg)<input type="number" step="0.1" inputmode="decimal" autocomplete="off" id="en-kg1"></label></div>
  ${chipsH([[7,"1 sem."],[14,"2 sem."],[28,"4 sem."]],v=>A.kgD==v,"data-en-kgd")}<div class="en-fig" style="min-height:180px"><svg id="en-kg"></svg></div><div class="en-note" id="en-kgmsg">Zone verte : le couloir visé.</div></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sec" data-en-info="home">Suivre à la maison</button><button class="btn sec" data-en-info="nobal">Repères sans balance</button></div>`}
function aRules(){return`<div class="card"><h2>Après chaque séance</h2>${["vert","orange","rouge","bonus"].map(k=>`<div><span class="en-dot" style="background:${FEU[k][1]}"></span><b>${FEU[k][0]}</b> · ${FEU[k][2]}</div>`).join("")}</div>
  <div class="card"><h2>Selon mon assiduité</h2><div>Moins de ${CFG.regLow} % : semaine refaite</div><div>${CFG.regLow} à ${CFG.regHigh} % : volume maintenu</div><div>${CFG.regHigh} % et plus : progression</div><div>3 feux orange : semaine de récup</div></div>`}
async function ressenti(id,se,faite){const c={...A.c,effort:A.rpe,x:se.effort},row={seance_id:se.id,membre_id:id,faite,raison:(!faite||A.mode==="partiel")?A.raison:null,duree_reelle:faite&&A.mode==="partiel"?Math.min(se.duree,+A.dmin||0):null,km:faite&&+A.km>0?+A.km:null,effort:faite?A.rpe:null,fatigue:faite?A.c.fatigue:null,sommeil:faite?A.c.sommeil:null,douleur:faite?A.c.douleur:null,feu:faite?feu(c):null};
  await q(sb.from("ressentis").upsert(row),"Ressenti");const i=D.res.findIndex(r=>r.seance_id===se.id);i>=0?D.res[i]=row:D.res.push(row);return row}
document.addEventListener("click",async e=>{if(!e.target.closest("#entrainement"))return;const b=e.target.closest("button");if(!b)return;e.stopPropagation();const d=b.dataset,id=AID(),re=()=>E.renderAthlete();
  if("enQuit" in d){E.apercu=null;vue="coach";render();scrollTo(0,0);return}
  if(E.apercu!=null&&("enSend" in d||"enSkipok" in d||"enRedo" in d||d.enHab!==undefined))return toast("Aperçu : rien n'est enregistré");
  if(d.enA){A.sub=d.enA;return re()}if(d.enInfo)return info(d.enInfo);
  const se=jourSeances(id).td[0];
  if("enDone" in d||"enPart" in d){A.phase="action";A.mode="enPart" in d?"partiel":"complet";A.raison=null;if(se)A.dmin=Math.round(se.duree/2/5)*5;A.km="";moveTok(0);return re()}
  if("enSkip" in d&&se){A.phase="skip";A.raison=null;return re()}if("enCancel" in d){A.phase="signal";return re()}if(d.enRs){A.raison=A.raison===d.enRs?null:d.enRs;return re()}
  if("enSkipok" in d&&se){try{await ressenti(id,se,false);A.phase="envie";moveTok(Math.PI)}catch(er){}return re()}
  if("enRedo" in d&&se){A.phase="action";D.res=D.res.filter(r=>r.seance_id!==se.id);return re()}
  if(d.enFat){A.c.fatigue=+d.enFat;return re()}if(d.enSl){A.c.sommeil=d.enSl;return re()}if(d.enPain){A.c.douleur=d.enPain==="1";return re()}
  if("enSend" in d&&se){occupe(b,true);try{const r=await ressenti(id,se,true);A.phase="reward";moveTok(Math.PI/2);toast(`${FEU[r.feu][0]} · +${xpOf(se,r.duree_reelle??se.duree)} pts`);setTimeout(()=>{A.phase="envie";moveTok(Math.PI)},1200)}catch(er){occupe(b,false)}return re()}
  if(d.enUnit){A.unit=d.enUnit;return re()}if(d.enDt){A.dt=+d.enDt;return re()}if(d.enKgd){A.kgD=+d.enKgd;return re()}
  if(d.enHab!==undefined){const k=d.enHab,j=iso(auj()),ex=D.ref.find(r=>r.membre_id===id&&r.ref===k&&r.jour===j);
    try{if(ex){await q(sb.from("reflexes_jours").delete().eq("membre_id",id).eq("jour",j).eq("ref",k),"Réflexe");D.ref=D.ref.filter(r=>r!==ex)}else{const r={membre_id:id,jour:j,ref:k};await q(sb.from("reflexes_jours").upsert(r),"Réflexe");D.ref.push(r)}}catch(er){}return re()}},true);
document.addEventListener("input",e=>{const t=e.target;if(!t.closest("#entrainement"))return;if(t.dataset.enDmin!==undefined)A.dmin=+t.value;if(t.dataset.enKm!==undefined)A.km=t.value;if(t.dataset.enRpe!==undefined){A.rpe=+t.value;const l=t.closest("label");if(l)l.firstChild.textContent=`Effort ressenti : ${A.rpe}/10`}if(t.id==="en-kg0"||t.id==="en-kg1")drawKg()});

// =====================================================================
// DESSINS
// =====================================================================
function dessiner(){drawMy();drawVol();drawXP();drawLoop();drawTrack();drawDay();drawKg()}
let ro=null;function observer(){if(ro)ro.disconnect();ro=new ResizeObserver(()=>dessiner());document.querySelectorAll("#coach .en-fig,#entrainement .en-fig").forEach(f=>ro.observe(f))}
function drawMy(){const s=$("#en-mvol");if(!s)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const st=suiviDe(AID()),Wk=semaines(AID()),km=A.unit==="km";
  const rows=Wk.filter(w=>w.w<=st.TW+4).map(w=>{const z=st.wks.find(x=>x.w===w.w);return{w:w.w,p:w.ses.reduce((a,x)=>a+(x.duree||0),0)/60,r:z?(km?z.km:z.hr):null,fut:w.w>=st.TW}});if(!rows.length)return;
  const mx=Math.max(...rows.map(r=>km?(r.r||0):Math.max(r.p,r.r||0)),1)*1.12,L=28,B=22,T=10,bw=(W-L-4)/rows.length,Y=v=>T+(1-v/mx)*(H-T-B);let h="";
  [0,Math.round(mx/2),Math.floor(mx)].forEach(y=>h+=`<line x1="${L}" x2="${W}" y1="${Y(y)}" y2="${Y(y)}" stroke="var(--line)"/><text x="${L-5}" y="${Y(y)+4}" text-anchor="end" fill="var(--muted)" font-size="13">${y}</text>`);
  rows.forEach((r,i)=>{const x=L+i*bw;if(!km)h+=`<rect x="${x+1}" y="${Y(r.p)}" width="${Math.max(2,bw-2)}" height="${Y(0)-Y(r.p)}" fill="var(--wash)" ${r.fut?'stroke="var(--line)" stroke-dasharray="3 3"':""}/>`;
    if(r.r!=null)h+=`<rect x="${x+bw*.22}" y="${Y(r.r)}" width="${Math.max(2,bw*.56)}" height="${Y(0)-Y(r.r)}" fill="var(--red)"/>`;if(i%(W<420?4:2)===0||i===rows.length-1)h+=`<text x="${x+bw/2}" y="${H-5}" text-anchor="middle" fill="var(--muted)" font-size="13">S${r.w}</text>`});
  s.innerHTML=h;const tot=st.wks.reduce((a,z)=>a+(km?z.km:z.hr),0),l=$("#en-mvol-l");if(l)l.textContent=km?`${dec(tot,0)} km au total (saisis dans tes ressentis).`:`${dec(tot)} h faites au total. Clair : prévu, rouge : fait.`;observer()}
const PHC={"Base":"var(--wash)","Base 1":"var(--wash)","Base 2":"#d9cdb8","Spécifique":"var(--warn)","Récup":"var(--ok-soft)","Affûtage":"#2b5f8a","Course":"var(--red)"};
function drawVol(){const s=$("#en-vol");if(!s||!C.sel)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const Wk=semaines(C.sel),v=Wk.map(w=>w.ses.reduce((a,x)=>a+(x.duree||0),0)/60),ph=Wk.map(w=>w.phase),ad=adapted(v,ph,C.sim/100),mx=Math.max(...v,1)*1.1,L=26,B=22,T=8,bw=(W-L-4)/Math.max(1,v.length),Y=y=>T+(1-y/mx)*(H-T-B);
  let h="";[0,Math.round(mx/2),Math.floor(mx)].forEach(y=>h+=`<line x1="${L}" x2="${W}" y1="${Y(y)}" y2="${Y(y)}" stroke="var(--line)"/><text x="${L-5}" y="${Y(y)+4}" text-anchor="end" fill="var(--muted)" font-size="13">${y}</text>`);
  v.forEach((y,i)=>{h+=`<rect x="${L+i*bw+1}" y="${Y(y)}" width="${Math.max(2,bw-2)}" height="${Y(0)-Y(y)}" fill="${PHC[ph[i]]||"var(--wash)"}" stroke="var(--ink)" stroke-width=".6"/>`;if(Wk[i].ses.some(x=>/OBJECTIF/.test(x.texte)))h+=X_(L+i*bw+bw/2,Y(y)-10,6,"var(--red)");if(i%(W<420?6:4)===0)h+=`<text x="${L+i*bw+bw/2}" y="${H-5}" text-anchor="middle" fill="var(--muted)" font-size="13">S${Wk[i].w}</text>`});
  if(C.sim<100)h+=`<polyline points="${ad.map((y,i)=>`${L+i*bw+bw/2},${Y(y)}`).join(" ")}" fill="none" stroke="var(--red)" stroke-width="3"/>`;s.innerHTML=h;observer()}
function drawXP(){const s=$("#en-xp");if(!s||C.gSel==null)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const st=suiviDe(C.gSel),Wk=semaines(C.gSel),n=Wk.length;if(!n)return;
  const proj=k=>{let x=0;return Wk.map(w=>{if(w.w<st.TW){const ww=st.wks.find(z=>z.w===w.w);x+=w.ses.filter(z=>resOf(z.id)?.faite).reduce((a,z)=>a+xpOf(z),0)+(ww&&ww.ok>=ww.n-1?CFG.xpWeek:0)}else{const l=w.ses.filter(z=>z.duree);x+=l.reduce((a,z)=>a+xpOf(z),0)*k+(k>=(l.length-1)/Math.max(1,l.length)?CFG.xpWeek:0)+14*CFG.xpHab*k/3}return x})};
  const p1=proj(1),p7=proj(.7),G=[...CFG.grades].sort((a,b)=>a[1]-b[1]),mx=Math.max(p1.at(-1),G.at(-1)[1])*1.05,L=6,R=6,T=10,B=22,X=i=>L+(i+.5)/n*(W-L-R),Y=v=>T+(1-v/mx)*(H-T-B);let h="";
  G.forEach(g=>{if(g[1]>0)h+=`<line x1="${L}" x2="${W-R}" y1="${Y(g[1])}" y2="${Y(g[1])}" stroke="var(--line)" stroke-dasharray="4 4"/><text x="${W-R}" y="${Y(g[1])-5}" text-anchor="end" fill="var(--muted)" font-size="13">${esc(g[0])} · ${g[1]}</text>`});
  const real=Wk.filter(w=>w.w<st.TW).length,line=(arr,from,col,dash)=>`<polyline points="${arr.slice(from).map((v,i)=>`${X(i+from)},${Y(v)}`).join(" ")}" fill="none" stroke="${col}" stroke-width="3" ${dash?'stroke-dasharray="6 5"':""}/>`;
  const f=Math.max(0,real-1);h+=line(p7,f,"var(--warn)",1)+line(p1,f,"var(--red)",1);if(real)h+=line(p1.slice(0,real),0,"var(--ink)");
  [0,Math.floor(n/2),n-1].forEach(i=>h+=`<text x="${X(i)}" y="${H-5}" text-anchor="middle" fill="var(--muted)" font-size="13">S${Wk[i].w}</text>`);s.innerHTML=h;observer()}
const STN=[["Rappel",-Math.PI/2],["Séance",0],["Récompense",Math.PI/2],["Prochain cap",Math.PI]],PH=["signal","action","reward","envie"];
function drawLoop(){const s=$("#en-loop");if(!s)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const x=suiviDe(AID()).xp,cx=W/2,cy=H/2,nw=W<480,rx=Math.min(W/2-(nw?46:100),210),ry=Math.min(H/2-46,105),pt=a=>[cx+rx*Math.cos(a),cy+ry*Math.sin(a)],act=PH.indexOf(A.phase);
  let h=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="var(--wash)" stroke-width="22"/><ellipse class="en-flow" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 14"/>`;
  STN.forEach(([n,a],i)=>{const[px,py]=pt(a),on=i===act,lx=nw?px:i===1?px+26:i===3?px-26:px,ly=i===0||(nw&&i%2)?py-26:i===2?py+36:py+5,an=nw?"middle":i===1?"start":i===3?"end":"middle";
    h+=`<circle cx="${px}" cy="${py}" r="16" fill="${on?"var(--red)":"var(--ink)"}" stroke="var(--card)" stroke-width="3"/><text class="n" x="${px}" y="${py+5}" text-anchor="middle" fill="${on?"#fff":"var(--paper)"}" font-weight="800" font-size="14">${i+1}</text><text x="${lx}" y="${ly}" text-anchor="${an}" fill="var(--ink)" font-weight="700" font-size="14">${nw&&i===3?"Cap":n}</text>`});
  const[tx,ty]=pt(A.tok);h+=X_(tx,ty,11,"var(--red)")+`<text x="${cx}" y="${cy+2}" text-anchor="middle" fill="var(--ink)" font-family="Barlow Condensed" font-weight="800" font-size="${Math.min(42,ry*.42)}">${x} pts</text><text x="${cx}" y="${cy+25}" text-anchor="middle" fill="var(--muted)" font-size="14">${esc(grade(x).g[0])}</text>`;s.innerHTML=h;observer()}
function moveTok(to){const from=A.tok,end=to<=from?to+2*Math.PI:to,t0=performance.now(),D2=matchMedia("(prefers-reduced-motion:reduce)").matches?1:650;const step=t=>{const k=Math.min(1,(t-t0)/D2);A.tok=from+(end-from)*(1-(1-k)**3);drawLoop();if(k<1)requestAnimationFrame(step);else A.tok=end%(2*Math.PI)};requestAnimationFrame(step)}
const CP=[[.1,.55],[.12,.25],[.3,.1],[.48,.24],[.62,.1],[.86,.14],[.92,.42],[.76,.55],[.9,.8],[.68,.92],[.46,.76],[.28,.9],[.1,.84]];
function drawTrack(){const s=$("#en-track");if(!s)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const id=AID(),Wk=semaines(id),N=Math.max(1,Wk.length),TW=suiviDe(id).TW,m=26,p=CP.map(([x,y])=>[m+x*(W-2*m),m+y*(H-2*m)]),n=p.length;
  let d=`M${p[0]}`;for(let i=0;i<n;i++){const a=p[(i-1+n)%n],b=p[i],c=p[(i+1)%n],e=p[(i+2)%n];d+=`C${b[0]+(c[0]-a[0])/6},${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6},${c[1]-(e[1]-b[1])/6} ${c[0]},${c[1]}`}
  s.innerHTML=`<path id="en-pth" d="${d}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="7 7"/>`;const pth=s.querySelector("#en-pth"),L=pth.getTotalLength(),at=i=>pth.getPointAtLength(i/N*L);
  let h=`<path d="${d}" fill="none" stroke="var(--red)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${Math.max(0,TW-1)/N*L} ${L}"/>`;
  Wk.forEach((w,i)=>{const q2=at(i),g=w.ses.find(x=>/OBJECTIF/.test(x.texte));if(w.w===TW)h+=`<circle cx="${q2.x}" cy="${q2.y}" r="14" fill="var(--red)" stroke="var(--card)" stroke-width="3"/><text class="n" x="${q2.x}" y="${q2.y+5}" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">${w.w}</text>`;
    else if(g)h+=X_(q2.x,q2.y,11,w.w<TW?"var(--ink)":"var(--red)")+`<text x="${q2.x+15}" y="${q2.y-10}" fill="var(--red)" font-weight="700" font-size="13">${esc(g.texte.replace("OBJECTIF : ",""))}</text>`;
    else h+=`<circle cx="${q2.x}" cy="${q2.y}" r="4.5" fill="${w.w<TW?"var(--ink)":"var(--card)"}" stroke="var(--ink)" stroke-width="2"/>`});s.insertAdjacentHTML("beforeend",h);observer()}
function drawDay(){const s=$("#en-day");if(!s)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const D2=DAYT[A.dt],L=22,R=22,X=t=>L+(t-6)/15.5*(W-L-R),cy=H*.56,rmax=Math.min(38,(X(12.5)-X(10))*.42),tm=[7,10,12.5,16.5,19.5];
  let h=`<line x1="${L}" x2="${W-R}" y1="${cy}" y2="${cy}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 6"/>`;
  if(D2.sess){const x0=X(D2.sess),x1=X(D2.sess+D2.len),yb=cy-rmax-20;h+=`<path d="M${x0},${yb+8}V${yb}H${x1}V${yb+8}" fill="none" stroke="var(--red)" stroke-width="3"/><text x="${(x0+x1)/2}" y="${yb-7}" text-anchor="middle" fill="var(--red)" font-weight="700" font-size="13">séance</text>`}
  tm.forEach((t,i)=>{const[sz,cp]=D2.m[i],r=Math.max(9,rmax*Math.sqrt(sz)),x=X(t);h+=`<circle cx="${x}" cy="${cy}" r="${r+4}" fill="var(--card)" stroke="var(--line)" stroke-width="1.5"/>`;let a=-Math.PI/2;
    cp.forEach((p,k)=>{if(p<=0)return;if(p>=.999){h+=`<circle cx="${x}" cy="${cy}" r="${r}" fill="${FC[k]}"/>`;return}const b=a+p*2*Math.PI;h+=`<path d="M${x},${cy}L${x+r*Math.cos(a)},${cy+r*Math.sin(a)}A${r},${r} 0 ${p>.5?1:0} 1 ${x+r*Math.cos(b)},${cy+r*Math.sin(b)}Z" fill="${FC[k]}" stroke="var(--card)" stroke-width="1.5"/>`;a=b});
    h+=`<text x="${x}" y="${cy+r+22}" text-anchor="middle" fill="var(--ink)" font-weight="700" font-size="13">${MEALS[i]}</text>`});s.innerHTML=h;observer()}
function drawKg(){const s=$("#en-kg");if(!s)return;const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=parseFloat($("#en-kg0")?.value),b=parseFloat($("#en-kg1")?.value),ok=a>20&&b>20,n=A.kgD,L=30,R=14,T=14,B=20,dl=ok?b-a:0,lo=Math.min(-.5*n/7,dl)-.3,hi=Math.max(.3,dl+.3),X=x=>L+x/n*(W-L-R),Y=v=>T+(hi-v)/(hi-lo)*(H-T-B);
  let h=`<path d="M${X(0)},${Y(0)}L${X(n)},${Y(-.25*n/7)}L${X(n)},${Y(-.5*n/7)}Z" fill="var(--ok-soft)"/><line x1="${L}" x2="${W-R}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--line)"/>`;
  if(ok)h+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(n)}" y2="${Y(dl)}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><circle cx="${X(n)}" cy="${Y(dl)}" r="7" fill="var(--red)"/><text x="${X(n)-12}" y="${Y(dl)+(dl<0?-12:22)}" text-anchor="end" fill="var(--ink)" font-weight="700" font-size="15">${dl<0?"−":"+"}${dec(dl)} kg</text>`;
  s.innerHTML=h;observer();const m=$("#en-kgmsg");if(!m)return;if(!ok){m.textContent="Zone verte : le couloir visé.";return}const r=dl/(n/7),rs=`${r<0?"−":"+"}${dec(r)} kg/sem.`;
  m.innerHTML=r<-1?`<b>${rs} : trop rapide.</b> Remets des féculents.`:r<-.5?`<b>${rs} : un peu rapide.</b>`:r<=-.1?`<b>${rs} : dans le couloir.</b>`:r<=.5?`<b>${rs} : stable.</b>`:`<b>${rs} : remontée.</b> Souvent de l'eau.`}

// =====================================================================
// APERÇU ?demo : un plan et des ressentis fictifs pour Léa
// =====================================================================
function demo(){const M=window.MOCK;M.enDemo=1;const db=M.db;if(db.seances.length)return;const a=db.entrainement_athletes.find(x=>x.statut==="publie");if(!a)return;
  const w=gen(a,db.objectifs.filter(o=>o.membre_id===a.membre_id),db.indisponibilites.filter(o=>o.membre_id===a.membre_id));let id=5000,seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647,t=iso(auj());
  w.forEach(x=>x.ses.forEach(s=>{const r={id:++id,membre_id:a.membre_id,date:iso(addD(x.mon,s.di)),texte:s.t,duree:s.min,effort:effort(s.t),cle:!!s.cle,phase:x.phase,modifiee:false};db.seances.push(r);
    if(r.date<t&&r.duree){const f=rnd()>.08,c={effort:Math.max(1,Math.min(10,r.effort+[-1,0,0,1][Math.floor(rnd()*4)])),fatigue:2+Math.floor(rnd()*2),sommeil:"bon",douleur:false,x:r.effort};db.ressentis.push({seance_id:r.id,membre_id:a.membre_id,faite:f,duree_reelle:f&&rnd()<.12?Math.round(r.duree*.6/5)*5:null,km:f&&/^(V|CAP)/.test(r.texte)?Math.round(r.duree*(/^V/.test(r.texte)?.45:.17)):null,effort:f?c.effort:null,fatigue:f?c.fatigue:null,sommeil:f?"bon":null,douleur:f?false:null,feu:f?feu(c):null})}}));
  if(!db.seances.some(s=>s.membre_id===a.membre_id&&s.date===t&&s.duree)){const nx=db.seances.find(s=>s.membre_id===a.membre_id&&s.date>t&&s.duree&&!/OBJECTIF/.test(s.texte));if(nx)nx.date=t}   // aperçu : toujours une séance le jour même
  const lun=monday(auj());for(let k=1;k<=24;k++)["leg","sun"].forEach(i=>db.reflexes_jours.push({membre_id:a.membre_id,jour:iso(addD(lun,-k)),ref:i}));
  D.ses=db.seances.filter(s=>s.membre_id===me()||S.moi?.coach).map(x=>({...x})).sort((x,y)=>x.date.localeCompare(y.date));D.res=db.ressentis.filter(r=>r.membre_id===me()||S.moi?.coach).map(x=>({...x}));D.ref=db.reflexes_jours.filter(r=>r.membre_id===me()||S.moi?.coach).map(x=>({...x}))}
})();
