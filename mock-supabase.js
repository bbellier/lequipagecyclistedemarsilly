// Faux Supabase pour l'aperçu (index.html?demo) : données fictives en mémoire, rien n'est enregistré
// Faux client Supabase en mémoire pour tester l'interface (règles d'accès simplifiées)
(function(){
  const J=n=>{const d=new Date();d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
  let gpx="";for(let i=0;i<=120;i++){const a=i/120*2*Math.PI;gpx+=`<trkpt lat="${(46.23+0.11*Math.sin(a)).toFixed(5)}" lon="${(-1.13+0.16*(1-Math.cos(a))).toFixed(5)}"><ele>${(8+22*Math.max(0,Math.sin(2*a))).toFixed(1)}</ele></trkpt>`}
  gpx=`<?xml version="1.0"?><gpx><trk><trkseg>${gpx}</trkseg></trk></gpx>`;
  const db={
    membres:[["Benjamin","bbellier.perso@gmail.com","bureau"],["Léa","lea@exemple.fr","membre"],["Hugo","hugo@exemple.fr","membre"],["Camille","camille@exemple.fr","membre"],["Thomas","thomas@exemple.fr","membre"]]
      .map(([p,e,r],i)=>({id:i+1,user_id:i<3?"u"+(i+1):null,email:e,prenom:p,role:r,actif:true})),
    evenements:[
      {id:1,saison:"2026-2027",date_debut:J(6),date_fin:J(6),type:"Sortie club",evenement:"Sortie du dimanche",lieu:"Marsilly, place du marché",tarif:"Gratuit",heure_depart:"08:30:00",affiche:"affiches/a.webp",realise:false,commentaires:"Allure 27 km/h"},
      {id:2,saison:"2026-2027",date_debut:J(20),date_fin:J(20),type:"Gravel",evenement:"Gravel dans le marais",lieu:"Coulon, Deux-Sèvres",lieu_lat:46.3225,lieu_lon:-0.5878,tarif:"15 €",lien:"https://example.com",inscription_fermeture:J(12),realise:false},
      {id:3,saison:"2026-2027",date_debut:J(0),date_fin:J(0),type:"Course à pied",evenement:"Footing du mardi",lieu:"Port du Plomb",realise:false},
      {id:4,saison:"2026-2027",date_debut:J(-30),date_fin:J(-30),type:"Triathlon",evenement:"Triathlon de La Rochelle",lieu:"La Rochelle",realise:true},
      {id:6,saison:"2026-2027",date_debut:null,date_fin:null,type:"Aventure",evenement:"Raid vélo de l'été",lieu:"Pyrénées",realise:false},
      {id:5,saison:"2025-2026",date_debut:J(-200),date_fin:J(-200),type:"Trail",evenement:"Trail des Templiers",lieu:"Millau",realise:true}],
    parcours:[{id:1,evenement_id:1,nom:"Grand parcours",discipline:"velo",km:87.5,gpx:"gpx/boucle.gpx",gpx_nom:"boucle.gpx",gpx_km:87.5,gpx_dplus:132,heure_depart:"08:30:00",ordre:0},{id:2,evenement_id:1,nom:"Petit parcours",discipline:"velo",km:55,heure_depart:"09:00:00",ordre:1},
      {id:3,evenement_id:4,discipline:"triathlon",format:"S",heure_depart:"09:00:00",ordre:0},{id:4,evenement_id:4,discipline:"triathlon",format:"L",heure_depart:"07:30:00",ordre:1},{id:5,evenement_id:5,nom:"Grand Trail",discipline:"course",km:80,ordre:0}],
    partenaires:[{id:1,nom:"Vélo Atlantique",logo:"partenaires/logo.png",url:"https://example.com",ordre:1},{id:2,nom:"Boulangerie du Port",ordre:2}],
    participations:[{evenement_id:5,membre_id:3,reponse:true},{evenement_id:1,membre_id:1,reponse:true},{evenement_id:1,membre_id:3,reponse:false},{evenement_id:4,membre_id:1,reponse:true},{evenement_id:4,membre_id:2,reponse:true},{evenement_id:3,membre_id:3,reponse:true}],
    resultats:[{evenement_id:4,membre_id:1,temps:"5:08:30",place:3,partants:142,parcours_id:4},{evenement_id:4,membre_id:2,temps:"1:12:45",place:1,partants:40,parcours_id:3,commentaire:"Super vélo"},{evenement_id:4,membre_id:3,temps:"1:20:00",place:9,partants:142,parcours_id:3,abandon:false},{evenement_id:5,membre_id:3,temps:"11:42:00",place:212,partants:900,parcours_id:5}],
    medias:[{id:1,evenement_id:4,auteur_id:2,type:"image",chemin:"4/2/photo.webp",legende:"Arrivée"}],
    sondages:[{id:1,question:"Quelle taille de maillot ?",options:["S","M","L","XL"],multiple:false,limite:J(20),fichier:"sondages/guide.pdf",fichier_nom:"Guide des tenues.pdf",cree_le:"2026-10-01"},
              {id:2,question:"Pièces à commander ?",options:["Maillot","Cuissard","Gilet"],multiple:true,limite:J(20),cree_le:"2026-10-02"},{id:3,question:"Destination du stage 2026 ?",options:["Pyrénées","Ventoux"],multiple:false,limite:J(-60),archive:true,cree_le:"2026-06-01"}],
    votes:[{sondage_id:1,membre_id:1,choix:[1]},{sondage_id:1,membre_id:3,choix:[2]}],
    profils:[{membre_id:2,nom:"Martin",federations:["FFTri"],taille_maillot:"S",photo:"2/photo.webp"},{membre_id:1,federations:["FFC","FFTri"]}],
    documents:[{id:1,membre_id:2,type:"licence_fftri",chemin:"2/licence.pdf",nom:"licence-fftri.pdf",taille:310000}],
    liens:[{id:1,titre:"Club Strava",url:"https://www.strava.com/clubs/2383594",ordre:1},{id:2,titre:"E-mail du club",url:"mailto:lequipagecycliste@gmail.com",ordre:2},{id:3,titre:"Instagram",url:"https://www.instagram.com/exemple/",ordre:3}],
    notes_bureau:[{id:1,titre:"Réunion de bureau",texte:"Commander les maillots avant fin novembre.\nPrévoir l'AG en janvier.",auteur_id:1,maj_le:"2026-10-20T10:00:00Z"}],
    notes_membres:[]
  };
  const files={club:{"gpx/boucle.gpx":new Blob([gpx]),"affiches/a.webp":"img/montagne.webp","sondages/guide.pdf":new Blob(["%PDF"]),"partenaires/logo.png":"img/logo-noir.png"},medias:{"4/2/photo.webp":"img/montagne2.webp"},documents:{"2/licence.pdf":new Blob(["%PDF"])},avatars:{"2/photo.webp":"img/montagne2.webp"}};
  const keys={notes_membres:["membre_id"],participations:[{evenement_id:5,membre_id:3,reponse:true},"evenement_id","membre_id"],votes:["sondage_id","membre_id"],resultats:["evenement_id","membre_id"],profils:["membre_id"]};
  let seq=100,session=null;window.MOCK={db,files,log:[]};
  const moi=()=>session&&db.membres.find(m=>m.user_id===session.user.id&&m.actif);
  const bureau=()=>moi()?.role==="bureau";
  const refus={data:null,error:{message:"new row violates row-level security policy (42501)"}};
  // Règles simplifiées : les écritures d'un membre sur la ligne d'un autre sont refusées
  function autorise(t,row){
    const m=moi();if(!m)return false;if(bureau())return true;
    if(t==="evenements")return row.cree_par===m.id;
    if(t==="parcours")return db.evenements.some(e=>e.id===row.evenement_id&&e.cree_par===m.id);
    if(["sondages","membres","liens","notes_bureau","notes_membres","partenaires"].includes(t))return false;
    if(t==="participations"||t==="votes"||t==="resultats"||t==="profils"||t==="documents")return row.membre_id===m.id;
    if(t==="medias")return row.auteur_id===m.id;return true;
  }
  class Q{
    constructor(t){this.t=t;this.f=[];this.op="select";this.one=false;this.ord=null}
    select(){if(this.op==="select")this.op="select";this.ret=true;return this}
    eq(c,v){this.f.push(r=>r[c]==v);return this}
    order(c,o={}){this.ord=[c,o.ascending!==false];return this}
    single(){this.one=true;return this}
    insert(r){this.op="insert";this.rows=[].concat(r);return this}
    upsert(r){this.op="upsert";this.rows=[].concat(r);return this}
    update(o){this.op="update";this.patch=o;return this}
    delete(){this.op="delete";return this}
    then(res,rej){return Promise.resolve().then(()=>this.run()).then(res,rej)}
    run(){
      const T=db[this.t];MOCK.log.push([this.t,this.op]);
      if(!moi()&&this.t!=="membres")return {data:[],error:null};
      if(this.op==="select"){let l=T.filter(r=>this.f.every(f=>f(r)));
        if(this.t==="membres"&&!bureau())l=l.filter(r=>r.id===moi()?.id);
        if(this.t==="votes"&&!bureau())l=l.filter(r=>r.membre_id===moi().id);
        if(["notes_bureau","notes_membres"].includes(this.t)&&!bureau())l=[];
        if((this.t==="profils"||this.t==="documents")&&!bureau())l=l.filter(r=>r.membre_id===moi().id);
        if(this.ord)l=[...l].sort((a,b)=>String(a[this.ord[0]]).localeCompare(String(b[this.ord[0]]))*(this.ord[1]?1:-1));
        l=JSON.parse(JSON.stringify(l));return {data:this.one?l[0]??null:l,error:this.one&&!l[0]?{message:"no rows"}:null}}
      if(this.op==="insert"||this.op==="upsert"){const out=[];
        for(const r0 of this.rows){if(!autorise(this.t,r0))return refus;
          if(this.t==="membres"&&T.some(x=>x.email===r0.email))return {data:null,error:{message:"duplicate key value violates unique constraint (23505)"}};
          const k=keys[this.t];const ex=k&&T.find(x=>k.every(c=>x[c]==r0[c]));
          if(ex&&this.op==="upsert"){Object.assign(ex,r0);out.push(ex)}
          else{const r={...(k?{}:{id:++seq}),...(this.t==="membres"?{actif:true,user_id:null,role:"membre"}:{}),...(this.t==="evenements"?{realise:false}:{}),...r0};T.push(r);out.push(r)}}
        return {data:this.one?out[0]:out,error:null}}
      const l=T.filter(r=>this.f.every(f=>f(r)));
      for(const r of l)if(!autorise(this.t,r))return refus;
      if(this.op==="update"){l.forEach(r=>Object.assign(r,this.patch));return {data:this.one?l[0]:l,error:null}}
      if(this.op==="delete"){db[this.t]=T.filter(r=>!l.includes(r));if(this.t==="evenements"){["participations","resultats","medias","parcours"].forEach(t=>db[t]=db[t].filter(x=>!l.some(e=>e.id===x.evenement_id)))}return {data:null,error:null}}
    }
  }
  const rpc=(n,args)=>Promise.resolve().then(()=>{const m=moi();
    if(n==="lier_mon_compte"){if(!session)return {data:null,error:null};const x=db.membres.find(r=>r.email===session.user.email&&!r.user_id);if(x)x.user_id=session.user.id;return {data:moi()?.id??null,error:null}}
    if(!m)return {data:[],error:null};
    if(n==="maj_mon_prenom"){m.prenom=args.p_prenom.trim();return {data:null,error:null}}
    if(n==="annuaire")return {data:db.membres.filter(r=>r.actif).map(({id,prenom,role})=>({id,prenom,role,photo:db.profils.find(p=>p.membre_id===id)?.photo||null})).sort((a,b)=>a.prenom.localeCompare(b.prenom)),error:null};
    if(n==="stats_sondages")return {data:db.sondages.map(s=>({sondage_id:s.id,totaux:s.options.map((_,i)=>db.votes.filter(v=>v.sondage_id===s.id&&v.choix.includes(i)).length),votants:db.votes.filter(v=>v.sondage_id===s.id).length})),error:null};
    return {data:null,error:{message:"rpc inconnue "+n}}});
  const url=(b,p)=>{const f=files[b][p];return typeof f==="string"?f:f?URL.createObjectURL(f):null};
  const storage={from:b=>({
    upload:async(p,f)=>{MOCK.log.push(["upload",b,p]);files[b][p]=f;return {data:{path:p},error:null}},
    remove:async(l)=>{l.forEach(p=>delete files[b][p]);return {data:null,error:null}},
    createSignedUrls:async(l)=>({data:l.map(p=>({path:p,signedUrl:url(b,p)})),error:null}),
    createSignedUrl:async(p)=>files[b][p]?{data:{signedUrl:url(b,p)},error:null}:{data:null,error:{message:"Object not found"}},
    download:async(p)=>{const f=files[b][p];if(!f)return {data:null,error:{message:"not found"}};return {data:typeof f==="string"?await (await fetch(f)).blob():f,error:null}}
  })};
  let cbs=[];
  const auth={
    signInWithOtp:async({email})=>{MOCK.lastEmail=email;return {error:null}},
    verifyOtp:async({email,token})=>{if(token!=="123456")return {error:{message:"Token has expired or is invalid"}};
      let u=db.membres.find(m=>m.email===email);session={user:{id:u?.user_id||"u-"+email,email}};return {data:{session},error:null}},
    getSession:async()=>({data:{session}}),getUser:async()=>({data:{user:session?.user||null}}),
    signOut:async()=>{session=null;cbs.forEach(c=>c("SIGNED_OUT"));return {error:null}},
    onAuthStateChange:cb=>{cbs.push(cb);return {data:{subscription:{unsubscribe(){}}}}}
  };
  window.supabase={createClient:()=>({auth,from:t=>new Q(t),rpc,storage})};
})();
