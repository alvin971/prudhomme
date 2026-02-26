(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(e,t,n)=>{t.exports=e.r(76562)},91079,e=>{"use strict";var t=e.i(43476),n=e.i(18566),s=e.i(11152);function r({isOpen:e,onClose:r}){let a=(0,n.useRouter)(),o=e=>{a.push(e),r()},i=({icon:e,title:n,subtitle:s,onClick:r})=>(0,t.jsxs)("button",{onClick:r,className:"w-full flex items-start gap-3 p-4 rounded-lg hover:bg-[#F8FAFC] transition-colors text-left",children:[(0,t.jsx)("div",{className:"text-2xl text-[#1E3A8A] mt-1",children:e}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("p",{className:"text-[#0F172A] font-medium",children:n}),(0,t.jsx)("p",{className:"text-xs text-[#64748B] mt-0.5",children:s})]})]});return(0,t.jsxs)(t.Fragment,{children:[e&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/50 z-40",onClick:r}),(0,t.jsx)("div",{className:`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${e?"translate-x-0":"-translate-x-full"}`,children:(0,t.jsxs)("div",{className:"flex flex-col h-full",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between p-4 border-b",children:[(0,t.jsx)("h2",{className:"text-xl font-bold text-[#1E3A8A]",children:"PRUDHOMME"}),(0,t.jsx)("button",{onClick:r,className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,t.jsx)(s.FaTimes,{className:"text-xl text-[#1E3A8A]"})})]}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto py-2",children:(0,t.jsxs)("nav",{children:[(0,t.jsx)(i,{icon:(0,t.jsx)(s.FaCommentDots,{}),title:"Nouvelle Conversation",subtitle:"Assistant IA juridique",onClick:()=>o("/chat")}),(0,t.jsx)(i,{icon:(0,t.jsx)(s.FaFileAlt,{}),title:"Mes Documents",subtitle:"Documents générés",onClick:()=>o("/documents")}),(0,t.jsx)(i,{icon:(0,t.jsx)(s.FaSearch,{}),title:"Analyser un Document",subtitle:"Scanner et analyser",onClick:()=>o("/document-analysis")}),(0,t.jsx)("div",{className:"px-4 py-2",children:(0,t.jsx)("div",{className:"border-t border-[#E2E8F0]"})}),(0,t.jsx)(i,{icon:(0,t.jsx)(s.FaFolder,{}),title:"Mes Dossiers",subtitle:"Gérer vos cas",onClick:()=>o("/cases")}),(0,t.jsx)(i,{icon:(0,t.jsx)(s.FaBalanceScale,{}),title:"Aide Juridictionnelle",subtitle:"Demander une aide",onClick:()=>o("/legal-aid")}),(0,t.jsx)(i,{icon:(0,t.jsx)(s.FaGlobe,{}),title:"Démarches en Ligne",subtitle:"Procédures administratives",onClick:()=>o("/lawyers")})]})}),(0,t.jsxs)("div",{className:"p-4 border-t",children:[(0,t.jsx)("p",{className:"text-xs text-[#64748B] text-center",children:"© 2026 PRUDHOMME"}),(0,t.jsx)("p",{className:"text-xs text-[#64748B] text-center mt-1",children:"Version Web 1.0.0"})]})]})})]})}e.s(["default",()=>r])},10160,e=>{"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.s(["default",()=>t])},41222,e=>{"use strict";var t=e.i(43476),n=e.i(71645),s=e.i(18566),r=e.i(5376),a=e.i(44842);let o=`# AGENT IA JURIDIQUE - COLLECTE INTELLIGENTE

Tu es un expert juridique autonome en droit fran\xe7ais.

## MISSION
Collecter les informations n\xe9cessaires pour g\xe9n\xe9rer un document juridique PARFAIT.
Tu ne g\xe9n\xe8res JAMAIS le document ici. Tu ne fais que collecter et valider.
Tu respectes le secret professionnel : aucune donn\xe9e personnelle stock\xe9e.

## ⚠️ R\xc8GLE CRITIQUE - DONN\xc9ES PERSONNELLES

NE JAMAIS demander :
- Noms, pr\xe9noms, adresses exactes
- Num\xe9ros de t\xe9l\xe9phone, emails personnels
- Donn\xe9es sensibles (num\xe9ro de s\xe9curit\xe9 sociale, etc.)

Demande seulement :
- Le CONTEXTE de la situation (faits, dates, montants)
- Le TYPE de relation (client/fournisseur, patron/salari\xe9, etc.)
- Les PROBL\xc8MES \xe0 r\xe9gler
- Le CADRE JURIDIQUE applicable (secteur, etc.)

Justification : Secret professionnel. Les donn\xe9es personnelles seront demand\xe9es
au moment de la g\xe9n\xe9ration du document seulement.

## CONDITIONS DE FONCTIONNEMENT

1. **D\xc9TECTE le type automatiquement** au premier message :
   - "ne paie pas" / "somme due" → MISE_EN_DEMEURE
   - "licenci\xe9" / "renvoi" → CONTESTATION_LICENCIEMENT
   - "contrat" / "accord" / "prestation" → CONTRAT
   - "avis" / "risque" / "question juridique" → CONSEIL

2. **POSE 3-4 QUESTIONS MAX par message** (ne pas surcharger)

3. **VALIDE chaque r\xe9ponse** : Si flou → repose plus pr\xe9cis\xe9ment

4. **M\xc9MORISE TOUT** : Chaque info pour la g\xe9n\xe9ration finale

5. **SCORE DE COMPL\xc9TUDE** : Quand tu as 85%+ des infos n\xe9cessaires, propose la g\xe9n\xe9ration

## TONE
- Accessible et clair (pas de jargon inutile)
- Confirme par paraphrase : "Si je comprends bien..."
- Professionnel mais bienveillant

## ⚠️ R\xc8GLE CRITIQUE - TRANSITION VERS G\xc9N\xc9RATION

Une fois que l'utilisateur dit "oui", "d'accord", "g\xe9n\xe8re", "c'est bon", etc. :

**R\xc9PONDS EXACTEMENT CECI (mot pour mot)** :
"GENERATE_DOCUMENT"

NE PAS \xe9crire le document dans le chat.
NE PAS commencer \xe0 r\xe9diger.
Juste r\xe9pondre : "GENERATE_DOCUMENT"`;function i(e){return e.trim().toUpperCase().includes("GENERATE_DOCUMENT")}async function l(e,t,n,s,r){try{let a=new Date().toISOString(),o=`

${"=".repeat(80)}
`;o+=`[${a}] PHASE: ${e} | TYPE: ${t}
Max tokens: ${r||"N/A"}
`,n&&(o+=`
--- SYSTEM PROMPT ---
${n}`),s&&s.length>0&&(o+=`
--- MESSAGES ---
`,s.forEach((e,t)=>{o+=`[${t}] ${e.role||"user"}: ${e.content||"No content"}`})),o+=`
${"=".repeat(80)}
`,console.log(o)}catch(e){console.error("Logging error:",e)}}async function u(e,t=o,n=1024,s="claude-haiku-4-5-20251001"){try{let r=e.map(e=>({role:e.role,content:e.content})),a=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:r,systemPrompt:t,maxTokens:n,model:s})});if(!a.ok)throw Error("HTTP error! status: "+a.status);return(await a.json()).message}catch(e){throw console.error("Erreur API Anthropic:",e),Error("Impossible de contacter l'IA juridique")}}async function c(e,t){let n=`PROMPT - G\xc9N\xc9RATEUR DE DOCUMENTS JURIDIQUES

Tu es un avocat senior sp\xe9cialis\xe9 en r\xe9daction  juridique de  ${e.document_nom}.

## OBJECTIF
R\xe9diger UN DOCUMENT JURIDIQUE COMPLET ET PROFESSIONNEL en une seule g\xe9n\xe9ration, comme le ferait un avocat confirm\xe9.

---

## R\xc8GLE FONDAMENTALE : DOCUMENT D\xc9VELOPP\xc9

⚠️ **L'architecture est un GUIDE INVISIBLE, pas un squelette visible.**

L'architecture fournie indique QUOI traiter, pas COMMENT le r\xe9diger.

Tu dois transformer chaque point de l'architecture en **texte juridique dense et argument\xe9**, pas en simple liste ou titre vide.

---

## NIVEAU DE D\xc9VELOPPEMENT REQUIS

Chaque section de l'architecture DOIT contenir :
- **Minimum 3-5 paragraphes** de texte juridique dense
- **Transitions narratives** entre les id\xe9es ("Attendu que", "Or", "En outre", "Il convient de souligner", "Consid\xe9rant que")
- **R\xe9f\xe9rences l\xe9gales int\xe9gr\xe9es** naturellement dans les phrases
- **Analyse progressive** : contexte → faits → violations → cons\xe9quences

### Longueur minimale par type de section :
- **Section principale** (ex: "Expos\xe9 des faits", "Fondements juridiques") : 300-500 mots
- **Sous-section** : 150-300 mots
- **Point de d\xe9tail** : 50-100 mots minimum

### Test de qualit\xe9 :
Si une section peut \xeatre lue en moins de 30 secondes, elle est **INSUFFISANTE**.

---

## EXIGENCES DE R\xc9DACTION

### 1. SUBSTANCE JURIDIQUE
- Argumentation juridique compl\xe8te et articul\xe9e
- Articles de loi cit\xe9s dans le corps du texte (ex: "conform\xe9ment \xe0 l'article L.1234-1 du Code du travail...")
- Jurisprudence pertinente int\xe9gr\xe9e le cas \xe9ch\xe9ant
- Lien logique : faits → droit → cons\xe9quences
- Formules consacr\xe9es du style juridique fran\xe7ais

### 2. STYLE PROFESSIONNEL
- Prose juridique fluide, pas de liste \xe0 puces excessive
- Transitions naturelles entre sections
- Ton formel et pr\xe9cis d'un cabinet d'avocat r\xe9put\xe9
- Vocabulaire technique ma\xeetris\xe9
- AUCUN aspect "g\xe9n\xe9r\xe9 par IA" ou r\xe9p\xe9titif

### 3. GESTION DES DONN\xc9ES
- Informations pr\xe9sentes dans le contexte → **int\xe9gr\xe9es directement** dans le texte
- Informations manquantes → **{{PLACEHOLDER_DESCRIPTIF}}**
- **JAMAIS** de donn\xe9es invent\xe9es

---

## STRUCTURE \xc0 SUIVRE

1. **Respecte EXACTEMENT** l'ordre et la num\xe9rotation de l'architecture fournie (I, A, 1, a, etc.)
2. **D\xe9veloppe CHAQUE section** avec du contenu juridique substantiel
3. **Continue jusqu'\xe0 la fin** de l'architecture sans interruption (signature incluse si pr\xe9vue)
4. **Utilise le formatage** (gras pour titres, sauts de ligne) pour la lisibilit\xe9

---

## FINALISATION

**SI** l'architecture se termine par une signature/dispositif formel (ex: "VII. SIGNATURE") :
- Termine par cette section formelle uniquement
- **N'ajoute PAS** de bloc "Points Cl\xe9s" apr\xe8s

**SI** l'architecture est analytique sans signature formelle (conseil/avis) :
- Ajoute apr\xe8s la derni\xe8re section de l'architecture :

---

💡 **SYNTH\xc8SE**

- {{POINT_CL\xc9_1}}
- {{POINT_CL\xc9_2}}
- {{POINT_CL\xc9_3}}

⚠️ **ALERTES JURIDIQUES**

- D\xe9lai de prescription : {{DATE}}
- Action requise avant : {{DATE}}
- Risque principal : {{DESCRIPTION_RISQUE}}

➡️ **PROCHAINES \xc9TAPES**

1. {{ACTION_1}} (d\xe9lai : {{D\xc9LAI}})
2. {{ACTION_2}} (d\xe9lai : {{D\xc9LAI}})
3. {{ACTION_3}} (d\xe9lai : {{D\xc9LAI}})

⚖️ **AVERTISSEMENT**
Consulter un avocat en cas de doute ou complexit\xe9.

---

## INTERDICTIONS ABSOLUES

❌ Produire un document "squelettique" qui ressemble \xe0 l'architecture nue
❌ Sections de moins de 100 mots (sauf mentions formelles type date/signature)
❌ Listes \xe0 puces sans d\xe9veloppement narratif
❌ R\xe9f\xe9rences juridiques floues, approximatives ou invent\xe9es
❌ Demander \xe0 l'utilisateur s'il veut que tu continues
❌ G\xe9n\xe9rer section par section (tout en UNE SEULE FOIS)

---

## OBLIGATIONS

✅ Document de **2-4 pages minimum** selon le type
✅ Chaque section = **argumentation compl\xe8te et d\xe9velopp\xe9e**
✅ Niveau r\xe9dactionnel d'un **cabinet renomm\xe9**
✅ Pr\xeat \xe0 **imprimer et utiliser** directement
✅ G\xe9n\xe9ration **COMPL\xc8TE** en un seul bloc

---

## ⚠️ ANTI-CONTAMINATION

- N'utilise **JAMAIS** les m\xeames formulations pour des cas diff\xe9rents
- Adapte **TOUJOURS** le vocabulaire aux faits sp\xe9cifiques du dossier
- Varie les tournures de phrases m\xeame pour des situations similaires
- Chaque document doit \xeatre **UNIQUE** et personnalis\xe9 au contexte fourni
- Les faits, dates, montants du contexte doivent \xeatre **int\xe9gr\xe9s organiquement** dans le r\xe9cit

---

## DONN\xc9ES DU CAS

**TYPE DE DOCUMENT :** ${e.document_nom}

**ARCHITECTURE \xc0 SUIVRE SCRUPULEUSEMENT :**
${e.architecture}

**CONTEXTE ET INFORMATIONS :**
${t}

---

**G\xc9N\xc8RE MAINTENANT LE DOCUMENT JURIDIQUE COMPLET EN SUIVANT L'ARCHITECTURE CI-DESSUS.**`;return await l("DOCUMENT_GEN","Document Generation",void 0,[{role:"user",content:n}],8192),u([{role:"user",content:n}],"",8192,"claude-haiku-4-5-20251001")}var d=e.i(24694),m=e.i(11152),x=e.i(91079);async function p(e,t){let n,s=(n=e.map((e,t)=>`${t+1}. ${e}`).join("\n"),`# AGENT IA - ANALYSE DES DOMAINES JURIDIQUES

Tu es un expert en classification juridique fran\xe7ais. Tu analyses une conversation pour d\xe9terminer les domaines de droit concern\xe9s.

## LISTE DES 67 DOMAINES DISPONIBLES
${n}

## CONVERSATION \xc0 ANALYSER
${t}

## INSTRUCTIONS
1. Lis attentivement la conversation
2. Identifie les probl\xe9matiques juridiques soulev\xe9es
3. Associe chaque probl\xe9matique aux domaines correspondants
4. Attribue un pourcentage de pertinence (0-100%) pour chaque domaine
5. Ne retourne QUE les domaines avec pourcentage >= 15%

## FORMAT DE R\xc9PONSE (JSON STRICT)
{
  "domaines_pertinents": [
    {
      "groupe_nom": "Nom EXACT du domaine de la liste",
      "pourcentage": 85,
      "raison": "Explication courte"
    }
  ],
  "analyse_globale": "R\xe9sum\xe9 en 2-3 phrases de la situation",
  "confiance_globale": 75
}

## R\xc8GLES CRITIQUES
- Maximum 5 domaines pertinents
- Utilise EXACTEMENT les noms de la liste (sensible \xe0 la casse)
- JSON valide uniquement, pas de texte avant/apr\xe8s`);await l("DOMAIN_CALC","Domain Calculation",s);let r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:"Analyse la conversation et retourne le JSON demandé."}],systemPrompt:s,maxTokens:1500})}),a=(await r.json()).message||"";console.log("🔍 [domainCalculator] Réponse brute de l'API:",a);let o=a.match(/\{[\s\S]*\}/g);if(!o||0===o.length)return console.error("❌ [domainCalculator] Aucun JSON trouvé dans la réponse"),{domaines_pertinents:[],analyse_globale:"",confiance_globale:0};let i=o[o.length-1];try{let e=JSON.parse(i);return console.log("✅ [domainCalculator] JSON parsé avec succès"),e}catch(e){return console.error("❌ [domainCalculator] Erreur de parsing JSON:",e),console.log("❌ [domainCalculator] JSON invalide:",i),{domaines_pertinents:[],analyse_globale:"",confiance_globale:0}}}async function E(e,t,n){let s,r,a=(s=e.map((e,t)=>`${t+1}. [ID:${e.document_id}] ${e.document_nom} (${e.groupe_nom})`).join("\n"),r=t.domaines_pertinents.map(e=>`- ${e.groupe_nom} (${e.pourcentage}%): ${e.raison}`).join("\n"),`# AGENT IA - S\xc9LECTION DES DOCUMENTS JURIDIQUES

Tu es un conseiller juridique expert qui aide \xe0 choisir le bon document.

## CONTEXTE DE L'ANALYSE
${r}

Analyse globale: ${t.analyse_globale}

## CONVERSATION
${n}

## DOCUMENTS DISPONIBLES (${e.length})
${s}

## MISSION

### PARTIE 1 - ANALYSE
- Calcule la pertinence (0-100%) pour chaque document
- Garde les top 3-4 documents (>30% pertinence)
- Classe par priorit\xe9 (1 = plus prioritaire)

### PARTIE 2 - R\xc9DACTION

⚠️ R\xc8GLE CRITIQUE - FORMAT EXACT

La r\xe9ponse DOIT respecter STRICTEMENT ce format, mot pour mot, sans aucune modification :

🎯 **Votre situation juridique**

D'apr\xe8s votre [probl\xe9matique], j'ai identifi\xe9 [nombre] d\xe9marches cl\xe9s :

1️⃣ [document_nom] ([pourcentage]%)
→ [utilite]

2️⃣ [document_nom] ([pourcentage]%)
→ [utilite]

3️⃣ [document_nom] ([pourcentage]%)
→ [utilite]

💡 **Mon conseil** : [conseil]

Quelle d\xe9marche souhaitez-vous entreprendre en priorit\xe9 ?
1️⃣ [document_nom]
2️⃣ [document_nom]
3️⃣ [document_nom]

⚠️ R\xc8GLES CRITIQUES - R\xc9DACTION
- Les [document_nom] doivent \xeatre les EXACTS noms de la liste ci-dessus, mot pour mot
- NE JAMAIS modifier un nom (ex: "Lettre de mise en demeure" → jamais "Mise en demeure de salaire")
- NE JAMAIS inventer de nouveaux documents (ex: jamais "Injonction de payer" si pas dans la liste)
- NE JAMAIS ajouter de texte introductif avant les 1️⃣
- Utilise les m\xeames emojis que dans l'exemple

## FORMAT DE SORTIE (JSON STRICT)
{
  "documents": [
    {
      "document_id": 16,
      "document_nom": "Nom EXACT du JSON",
      "groupe_nom": "Nom du groupe",
      "pourcentage": 85,
      "utilite": "Ce que ce document permet",
      "quand_utiliser": "Dans quel cas",
      "resultat_attendu": "Ce que l'utilisateur obtiendra",
      "priorite": 1
    }
  ],
  "reponse_formatee": "🎯 **Votre situation juridique**\\n\\nD'apr\xe8s votre [probl\xe9matique], j'ai identifi\xe9 [nombre] d\xe9marches cl\xe9s :\\n\\n1️⃣ [document_nom] ([pourcentage]%)\\n→ [utilite]\\n\\n2️⃣ [document_nom] ([pourcentage]%)\\n→ [utilite]\\n\\n3️⃣ [document_nom] ([pourcentage]%)\\n→ [utilite]\\n\\n💡 **Mon conseil** : [conseil]\\n\\nQuelle d\xe9marche souhaitez-vous entreprendre en priorit\xe9 ?\\n1️⃣ [document_nom]\\n2️⃣ [document_nom]\\n3️⃣ [document_nom]"
}

## R\xc8GLES CRITIQUES
- Utilise les document_id EXACTS de la liste
- Utilise les document_nom EXACTS de la liste, MOT POUR MOT, sans aucune modification
- NE JAMAIS inventer de noms ou de documents
- NE JAMAIS modifier les noms existants
- La r\xe9ponse DOIT commencer par "🎯 **Votre situation juridique**"
- JSON valide uniquement`);await l("DOC_SELECTION","Document Selection",a);let o=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:"Sélectionne les documents et retourne le JSON demandé."}],systemPrompt:a,maxTokens:2e3})}),i=((await o.json()).message||"").replace(/\n/g,"");console.log("📄 [documentCalculator] Réponse nettoyée:",i.substring(0,200));let u=i.match(/\{[\s\S]*\}/g);if(!u||0===u.length)return console.error("❌ [documentCalculator] Aucun JSON trouvé dans la réponse"),{documents:[],reponse_formatee:"Erreur lors de l'analyse : la réponse de l'IA ne contient pas de données structurées."};let c=u[u.length-1];try{let e=JSON.parse(c);return console.log("✅ [documentCalculator] JSON parsé avec succès"),e}catch(e){return console.error("❌ [documentCalculator] Erreur de parsing JSON:",e),console.log("❌ [documentCalculator] JSON invalide:",c),{documents:[],reponse_formatee:"Erreur lors de l'analyse : impossible de traiter la réponse de l'IA."}}}async function f(e,t){let n=`Tu es le m\xeame expert juridique que dans le prompt initial. Tu dois continuer la conversation en gardant exactement le m\xeame style d'\xe9criture et le m\xeame ton que le premier message.

DONN\xc9ES DU DOCUMENT CIBLE
Type :
${e.document_nom}

Liste de contraintes strictes (100% des informations n\xe9cessaires sont requises pour g\xe9n\xe9rer le document) :
${e.donnees_necessaires}

HISTORIQUE DE CONVERSATION
${t}

MISSION
ANALYSE LA LISTE : Lis attentivement ${e.donnees_necessaires}. C'est la liste absolue de tout ce dont tu as besoin. Rien de moins, rien de plus.
RE-\xc9VALUATION : \xc0 chaque tour de conversation, compare cette liste avec tout ce qui a \xe9t\xe9 dit dans l'historique.
D\xc9CISION :
SI 100% des informations sont pr\xe9sentes : Passe \xe0 l'\xe9tape de transition.
SI il manque ne serait-ce qu'une seule information : Pose des questions pour obtenir les \xe9l\xe9ments manquants (3-4 max par message), sans dire que tu fais une "v\xe9rification".
🚨 STYLE D'\xc9CRITURE CRITIQUE (AUCUNE D\xc9ROGATION)
Tu dois \xe9crire comme un humain qui discute, PAS comme un robot qui remplit un formulaire.

INTERDICTIONS ABSOLUES :

❌ NE FAIS AUCUN R\xc9CAPITULATIF (ne liste pas ce que tu as d\xe9j\xe0, ne mets pas de "✅").
❌ NE POSE PAS tes questions sous forme de liste num\xe9rot\xe9e ou de puces. \xc9cris-tes en phrases naturelles et fluides.
❌ NE SIMULE JAMAIS la r\xe9ponse de l'utilisateur.
❌ NE PARLE PAS DE "DONN\xc9ES" OU DE "LISTE" \xe0 l'utilisateur.
OBLIGATIONS :

✅ Paraphrase pour confirmer les infos nouvelles ("Si je comprends bien, vous aviez un CDI...").
✅ Fluidit\xe9 : Encha\xeene sur la derni\xe8re r\xe9ponse de l'utilisateur sans rupture de style.
✅ Intelligence : Si l'utilisateur donne une info sans qu'on la lui demande, note-la mentalement et passe \xe0 la suite des infos manquantes sans commenter ce fait ("Ah, j'ai not\xe9 \xe7a"). Juste continue la conversation naturellement.
Exemple de ce qu'il faut faire (Style) :
"D'accord, c'est not\xe9 pour la date de d\xe9but du contrat. Concernant les motifs du licenciement, savez-vous si l'entreprise vous a fourni un document \xe9crit ou cela s'est-il pass\xe9 uniquement \xe0 l'oral ? Et quel \xe9tait le montant exact de votre dernier salaire ?"

⚠️ R\xc8GLE CRITIQUE - TRANSITION VERS G\xc9N\xc9RATION
Tu ne proposes la g\xe9n\xe9ration QUE SI ET SEULEMENT SI tu as r\xe9cup\xe9r\xe9 100% des informations list\xe9es dans {selectedDocument.donnees_necessaires}.

Si c'est le cas, demande naturellement :
"Parfait, j'ai toutes les informations pour r\xe9diger votre ${e.document_nom}. Souhaitez-vous que je g\xe9n\xe8re le document ?"

Une fois que l'utilisateur confirme ("oui", "d'accord", "g\xe9n\xe8re", "c'est bon", etc.) :

🔴 INSTRUCTION ABSOLUE
R\xc9PONDS EXACTEMENT ET UNIQUEMENT CECI (mot pour mot, rien d'autre) :
GENERATE_DOCUMENT`;await l("DATA_COLLECTION","Data Collection",n);let s=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:"Continue la conversation pour collecter les informations manquantes."}],systemPrompt:n,maxTokens:1500})});return(await s.json()).message||"Pourriez-vous me donner plus de détails ?"}var N=e.i(91197);function h(){return{phase:"standard",userMessageCount:0,extractionLoopCount:0}}function S(e){return e.map(e=>`${"user"===e.role?"Utilisateur":"Assistant"}: ${e.content}`).join("\n\n")}async function A(e,t,n){let s=e.filter(e=>"user"===e.role).length,r={...t,userMessageCount:s};if(s<4)return{response:"",newState:{...r,phase:"standard"},shouldUseStandardPrompt:!0};if(4===s&&"standard"===t.phase){n("calculating_domains","🔍 Analyse de votre situation...");let t=S(e),s=await (0,N.getGroupNames)(),a=await p(s,t);if(r.domainesResult=a,0===a.domaines_pertinents.length)return{response:"Je n'ai pas pu identifier clairement le domaine juridique. Pourriez-vous me donner plus de détails ?",newState:{...r,phase:"standard"},shouldUseStandardPrompt:!1};n("calculating_docs","📋 Sélection des documents adaptés...");let o=a.domaines_pertinents.map(e=>e.groupe_nom),i=await function(e,t=40){let n=(0,N.getAllDocuments)();(0,N.getGroupMap)();let s=e.map(e=>e.toLowerCase());return n.filter(e=>s.includes(e.groupe_nom.toLowerCase())).slice(0,t)}(o,40),l=await E(i,a,t);return r.documentsResult=l,r.phase="awaiting_selection",{response:l.reponse_formatee,newState:r,shouldUseStandardPrompt:!1}}if("awaiting_selection"===t.phase&&t.documentsResult){let s=function(e,t){let n=e.toLowerCase().trim(),s=n.match(/^[1-4]$|option\s*([1-4])|choix\s*([1-4])|le\s*([1-4])|la\s*([1-4])/);if(s){let e=parseInt(s[1]||s[2]||s[3]||s[4]||s[0]),n=t.find(t=>t.priorite===e);if(n)return n}for(let e of t){let t=e.document_nom.toLowerCase();if(n.includes(t)||t.includes(n)||t.split(/\s+/).filter(e=>e.length>4).filter(e=>n.includes(e)).length>=2)return e}return null}(e.filter(e=>"user"===e.role).pop()?.content||"",t.documentsResult.documents);if(s){var a;let t=await (a=s.document_id,(0,N.findDocumentById)(a)??null);if(console.log("🔍 [orchestrator] Doc selected:",s.document_id,"Full doc:",t),console.log("🔍 [orchestrator] Has architecture?",t?.architecture?"YES":"NO"),t){r.selectedDocument=t,r.phase="extracting_data",r.extractionLoopCount=1,n("extracting_data","📝 Collecte des informations...");let s=e.slice(0,e.length-1).map(e=>`${"user"===e.role?"Utilisateur":"Assistant"}: ${e.content}`).join("\n\n"),a=await f(t,s);return i(a)?(r.phase="ready_to_generate",{response:"GENERATE_DOCUMENT",newState:r,shouldUseStandardPrompt:!1}):{response:a,newState:r,shouldUseStandardPrompt:!1}}}return{response:"Je n'ai pas compris votre choix. Indiquez le numéro (1, 2 ou 3) ou le nom du document souhaité.",newState:r,shouldUseStandardPrompt:!1}}if("extracting_data"===t.phase&&t.selectedDocument){if(r.extractionLoopCount=(t.extractionLoopCount||0)+1,r.extractionLoopCount>15)return r.phase="ready_to_generate",{response:"GENERATE_DOCUMENT",newState:r,shouldUseStandardPrompt:!1};let n=S(e),s=await f(t.selectedDocument,n);return i(s)?(r.phase="ready_to_generate",{response:"GENERATE_DOCUMENT",newState:r,shouldUseStandardPrompt:!1}):{response:s,newState:r,shouldUseStandardPrompt:!1}}return"ready_to_generate"===t.phase?{response:"GENERATE_DOCUMENT",newState:r,shouldUseStandardPrompt:!1}:{response:"",newState:r,shouldUseStandardPrompt:!0}}function g(){(0,s.useRouter)();let{user:e}=(0,r.useAuth)(),{addDocument:o}=(0,a.useDocuments)(),[l,p]=(0,n.useState)([]),[E,f]=(0,n.useState)(""),[N,S]=(0,n.useState)(!1),[g,T]=(0,n.useState)(!1),[I,C]=(0,n.useState)(!1),[O,b]=(0,n.useState)(""),[v,y]=(0,n.useState)(0),[D,j]=(0,n.useState)(0),R=(0,n.useRef)(null),U=(0,n.useRef)(null);(0,n.useRef)(null);let w=(0,n.useRef)(null),L=(0,n.useRef)(null),_=(0,n.useRef)(null),q=(0,n.useRef)(null),P=(0,n.useRef)(null),[M,F]=(0,n.useState)("");(0,n.useRef)(""),(0,n.useRef)("");let J=(0,n.useRef)(null),k=(0,n.useRef)([]),[G,$]=(0,n.useState)(h()),[Q,B]=(0,n.useState)("");(0,n.useEffect)(()=>{R.current?.scrollIntoView({behavior:"smooth"})},[l,O]),(0,n.useEffect)(()=>{U.current?.focus()},[]),(0,n.useEffect)(()=>{U.current&&0===E.length&&(U.current.style.height="44px")},[E]);let V=async e=>{b("");for(let t=0;t<e.length;t++)await new Promise(e=>setTimeout(e,10)),b(e.substring(0,t+1));return e};(0,n.useEffect)(()=>()=>{W()},[]);let z=async()=>{try{let e=await navigator.mediaDevices.getUserMedia({audio:!0});P.current=e;let t=new(window.AudioContext||window.webkitAudioContext),n=t.createAnalyser(),s=t.createMediaStreamSource(e);n.fftSize=256,s.connect(n),w.current=t,L.current=n;let r=n.frequencyBinCount,a=new Uint8Array(r),o=()=>{if(L.current){L.current.getByteFrequencyData(a);let e=a.reduce((e,t)=>e+t)/r;j(e/255),_.current=requestAnimationFrame(o)}};return o(),e}catch(e){throw console.error("Error visualizing audio:",e),e}},H=()=>{q.current&&(clearInterval(q.current),q.current=null),y(0)},X=()=>{_.current&&(cancelAnimationFrame(_.current),_.current=null),w.current&&(w.current.close(),w.current=null),j(0)},Y=async()=>{try{if(await z(),y(0),q.current=setInterval(()=>{y(e=>e+1)},1e3),T(!0),k.current=[],P.current){let e=new MediaRecorder(P.current,{mimeType:"audio/webm"});e.ondataavailable=e=>{e.data.size>0&&k.current.push(e.data)},e.start(),J.current=e,console.log("Enregistrement audio démarré")}}catch(e){console.error("Erreur démarrage enregistrement:",e),alert("Impossible d'accéder au microphone: "+e.message),T(!1),H(),X()}},W=async()=>{if(g){if(console.log("Validation enregistrement - Envoi à Whisper"),J.current&&"inactive"!==J.current.state&&(J.current.stop(),await new Promise(e=>{J.current?J.current.onstop=()=>e():e()})),P.current&&(P.current.getTracks().forEach(e=>e.stop()),P.current=null),H(),X(),T(!1),k.current.length>0){let e=new Blob(k.current,{type:"audio/webm"});console.log("Taille audio:",e.size,"bytes"),S(!0);try{let t=new FormData;t.append("audio",e,"recording.webm");let n=await fetch("/api/transcribe",{method:"POST",body:t});if(!n.ok)throw Error("Erreur transcription: "+n.statusText);let s=await n.json(),r=s.text?.trim()||"";if(console.log("Texte transcrit par Whisper:",r),r){let e=E.trim()?E.trim()+" "+r:r;f(e)}}catch(e){console.error("Erreur transcription:",e),alert("Erreur lors de la transcription. Vérifiez que la clé API OpenAI est configurée.")}finally{S(!1)}}k.current=[],J.current=null}},K=async()=>{!N&&(g||await Y())},Z=(e,t)=>{$(t=>({...t,phase:e})),t&&B(t)},ee=async()=>{if(!E.trim()||N)return;let t={role:"user",content:E,timestamp:new Date};p(e=>[...e,t]),f(""),S(!0);try{let n,s=[...l,t],r=s.filter(e=>"system"!==e.role).map(e=>({role:e.role,content:e.content})),{response:a,newState:m,shouldUseStandardPrompt:x}=await A(r,G,Z);if($(m),B(""),n=x?await u(r):a,await V(n),p(e=>[...e,{role:"assistant",content:n,timestamp:new Date}]),b(""),i(n)){let t=s.map(e=>e.role+": "+e.content).join("\n"),n=function(e){for(let t of["mise en demeure","lettre de réclamation","plainte","demande de justification","contestation"])if(e.toLowerCase().includes(t))return t;return"Document juridique"}(t);p(e=>[...e,{role:"assistant",content:"⏳ Génération du document en cours...",timestamp:new Date}]);let r=await c(G.selectedDocument,t);(0,d.generatePDF)(r,n);let a=JSON.parse(localStorage.getItem("test_documents")||"[]"),i="test_"+Date.now();a.push({id:i,type:n,fileName:n.replaceAll(" ","_")+"_"+Date.now()+".pdf",createdAt:new Date().toISOString(),textContent:r}),localStorage.setItem("test_documents",JSON.stringify(a)),e&&await o({type:n,fileName:n.replaceAll(" ","_")+"_"+Date.now()+".pdf",createdAt:new Date,textContent:r}),p(e=>[...e.slice(0,-1),{role:"assistant",content:'✅ Document "'+n+'" généré avec succès !\n\n📄 Retrouvez-le dans "Mes Documents"',timestamp:new Date}]),$(h())}}catch(e){console.error("Erreur:",e),p(e=>[...e,{role:"assistant",content:"❌ Une erreur est survenue. Veuillez réessayer.",timestamp:new Date}])}finally{S(!1)}};return(0,t.jsxs)("div",{className:"flex flex-col bg-[#F8FAFC]",style:{height:"100dvh",minHeight:"-webkit-fill-available"},children:[(0,t.jsx)(x.default,{isOpen:I,onClose:()=>C(!1)}),(0,t.jsx)("header",{className:"bg-white shadow-sm flex-shrink-0 sticky top-0 z-10",children:(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 sm:px-4 py-3",children:[(0,t.jsx)("button",{onClick:()=>C(!0),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,t.jsx)(m.FaBars,{className:"text-lg sm:text-xl text-[#1E3A8A]"})}),(0,t.jsx)("h1",{className:"text-lg sm:text-xl font-semibold text-[#1E3A8A]",children:"PRUDHOMME"}),(0,t.jsx)("div",{className:"w-8 sm:w-10"})]})}),(0,t.jsxs)("div",{className:"flex-1 overflow-y-auto overflow-x-hidden",style:{WebkitOverflowScrolling:"touch"},children:[0!==l.length||O?(0,t.jsxs)("div",{className:"p-3 sm:p-4 space-y-3 sm:space-y-4 pb-4",children:[l.map((e,n)=>(0,t.jsx)("div",{className:"flex "+("user"===e.role?"justify-end":"system"===e.role?"justify-center":"justify-start"),children:(0,t.jsx)("div",{className:"max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 "+("user"===e.role?"bg-[#1E3A8A] text-white rounded-[18px]":"system"===e.role?"bg-[#10B981] text-white rounded-[18px] text-center":"bg-transparent text-[#1E3A8A] rounded-[18px]"),style:{lineHeight:1.4},children:(0,t.jsx)("p",{className:"whitespace-pre-wrap text-sm sm:text-[15px]",children:e.content})})},n)),O&&(0,t.jsx)("div",{className:"flex justify-start",children:(0,t.jsx)("div",{className:"max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent text-[#1E3A8A] rounded-[18px]",style:{lineHeight:1.4},children:(0,t.jsx)("p",{className:"whitespace-pre-wrap text-sm sm:text-[15px]",children:O})})}),(0,t.jsx)("div",{ref:R})]}):(0,t.jsx)("div",{className:"h-full flex items-center justify-center px-4 sm:px-10",children:(0,t.jsx)("p",{className:"text-center text-2xl sm:text-4xl md:text-5xl text-[#1E3A8A] font-light opacity-25 leading-tight",children:"Pouvez-vous me décrire brièvement votre problème juridique ?"})}),N&&!O&&(0,t.jsxs)("div",{className:"px-3 sm:px-4 pb-4",children:[Q&&(0,t.jsx)("div",{className:"mb-2 text-sm text-[#64748B] text-center",children:Q}),(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)("div",{className:"w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce",style:{animationDelay:"0ms"}}),(0,t.jsx)("div",{className:"w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce",style:{animationDelay:"150ms"}}),(0,t.jsx)("div",{className:"w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})]})]}),(0,t.jsx)("div",{className:"bg-white border-t border-[#E2E8F0] p-3 sm:p-4 flex-shrink-0 safe-bottom",children:(0,t.jsxs)("div",{className:"flex items-center gap-2 max-w-4xl mx-auto",children:[g?(0,t.jsx)("button",{onClick:()=>{console.log("Annulation enregistrement"),J.current&&"inactive"!==J.current.state&&(J.current.stop(),J.current=null),P.current&&(P.current.getTracks().forEach(e=>e.stop()),P.current=null),T(!1),H(),X(),k.current=[]},disabled:N,className:"p-2.5 sm:p-3 rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] transition-colors flex-shrink-0",children:(0,t.jsx)(m.FaTimes,{className:"text-base sm:text-lg"})}):(0,t.jsx)("button",{onClick:K,disabled:N,className:"p-2.5 sm:p-3 rounded-full bg-[#F8FAFC] text-[#1E3A8A] hover:bg-[#E2E8F0] transition-colors flex-shrink-0",children:(0,t.jsx)(m.FaMicrophone,{className:"text-base sm:text-lg"})}),g?(0,t.jsxs)("div",{className:"flex-1 flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] rounded-3xl",children:[(0,t.jsx)("div",{className:"flex-1 flex items-center justify-center gap-0.5 h-8",children:[...Array(40)].map((e,n)=>{let s=Math.max(4,100*D*(.3+.7*Math.random()));return(0,t.jsx)("div",{className:"w-0.5 bg-[#1E3A8A] rounded-full transition-all duration-75",style:{height:`${s}%`,opacity:.3+.7*D}},n)})}),(0,t.jsxs)("div",{className:"text-sm font-semibold text-[#1E3A8A] min-w-[45px] text-right",children:[Math.floor(v/60),":",(v%60).toString().padStart(2,"0")]})]}):(0,t.jsx)("textarea",{ref:U,value:E,onChange:e=>f(e.target.value),onKeyPress:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ee())},placeholder:"Votre message...",disabled:N,rows:1,className:"flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-none rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-[#0F172A] placeholder-[#64748B] text-sm sm:text-base resize-none overflow-y-auto max-h-[144px]",style:{minHeight:"44px",lineHeight:"1.5",scrollbarWidth:"thin",boxSizing:"content-box"},onInput:e=>{let t=e.target;t.style.height="auto";let n=Math.min(t.scrollHeight,144);t.style.height=n+"px"}}),g?(0,t.jsx)("button",{onClick:W,onTouchEnd:e=>{e.preventDefault(),W()},disabled:N,type:"button",className:"p-2.5 sm:p-3 rounded-full bg-[#1E3A8A] text-white hover:bg-[#1E40AF] transition-colors flex-shrink-0",children:(0,t.jsx)(m.FaCheck,{className:"text-base sm:text-lg"})}):(0,t.jsx)("button",{onClick:ee,disabled:N||!E.trim(),className:"p-2.5 sm:p-3 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0",children:(0,t.jsx)(m.FaPaperPlane,{className:"text-base sm:text-lg"})})]})})]})}e.s(["default",()=>g],41222)},95111,e=>{e.v(t=>Promise.all(["static/chunks/b155dd524bffd90e.js"].map(t=>e.l(t))).then(()=>t(38201)))},48503,e=>{e.v(t=>Promise.all(["static/chunks/adabfc2d4bff09a9.js"].map(t=>e.l(t))).then(()=>t(15833)))},13376,e=>{e.v(t=>Promise.all(["static/chunks/db92345ecc188344.js"].map(t=>e.l(t))).then(()=>t(17314)))}]);