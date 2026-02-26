module.exports=[52763,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(50944),e=a.i(78207),f=a.i(34395);let g=`# AGENT IA JURIDIQUE - COLLECTE INTELLIGENTE

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
Juste r\xe9pondre : "GENERATE_DOCUMENT"`;function h(a){return a.trim().toUpperCase().includes("GENERATE_DOCUMENT")}async function i(a,b,c,d,e){try{let f=new Date().toISOString(),g=`

${"=".repeat(80)}
`;g+=`[${f}] PHASE: ${a} | TYPE: ${b}
Max tokens: ${e||"N/A"}
`,c&&(g+=`
--- SYSTEM PROMPT ---
${c}`),d&&d.length>0&&(g+=`
--- MESSAGES ---
`,d.forEach((a,b)=>{g+=`[${b}] ${a.role||"user"}: ${a.content||"No content"}`})),g+=`
${"=".repeat(80)}
`,console.log(g)}catch(a){console.error("Logging error:",a)}}async function j(a,b=g,c=1024,d="claude-haiku-4-5-20251001"){try{let e=a.map(a=>({role:a.role,content:a.content})),f=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:e,systemPrompt:b,maxTokens:c,model:d})});if(!f.ok)throw Error("HTTP error! status: "+f.status);return(await f.json()).message}catch(a){throw console.error("Erreur API Anthropic:",a),Error("Impossible de contacter l'IA juridique")}}async function k(a,b){let c=`PROMPT - G\xc9N\xc9RATEUR DE DOCUMENTS JURIDIQUES

Tu es un avocat senior sp\xe9cialis\xe9 en r\xe9daction  juridique de  ${a.document_nom}.

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

**TYPE DE DOCUMENT :** ${a.document_nom}

**ARCHITECTURE \xc0 SUIVRE SCRUPULEUSEMENT :**
${a.architecture}

**CONTEXTE ET INFORMATIONS :**
${b}

---

**G\xc9N\xc8RE MAINTENANT LE DOCUMENT JURIDIQUE COMPLET EN SUIVANT L'ARCHITECTURE CI-DESSUS.**`;return await i("DOCUMENT_GEN","Document Generation",void 0,[{role:"user",content:c}],8192),j([{role:"user",content:c}],"",8192,"claude-haiku-4-5-20251001")}var l=a.i(7080),m=a.i(71682),n=a.i(61358);async function o(a,b){let c,d=(c=a.map((a,b)=>`${b+1}. ${a}`).join("\n"),`# AGENT IA - ANALYSE DES DOMAINES JURIDIQUES

Tu es un expert en classification juridique fran\xe7ais. Tu analyses une conversation pour d\xe9terminer les domaines de droit concern\xe9s.

## LISTE DES 67 DOMAINES DISPONIBLES
${c}

## CONVERSATION \xc0 ANALYSER
${b}

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
- JSON valide uniquement, pas de texte avant/apr\xe8s`);await i("DOMAIN_CALC","Domain Calculation",d);let e=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:"Analyse la conversation et retourne le JSON demandé."}],systemPrompt:d,maxTokens:1500})}),f=(await e.json()).message||"";console.log("🔍 [domainCalculator] Réponse brute de l'API:",f);let g=f.match(/\{[\s\S]*\}/g);if(!g||0===g.length)return console.error("❌ [domainCalculator] Aucun JSON trouvé dans la réponse"),{domaines_pertinents:[],analyse_globale:"",confiance_globale:0};let h=g[g.length-1];try{let a=JSON.parse(h);return console.log("✅ [domainCalculator] JSON parsé avec succès"),a}catch(a){return console.error("❌ [domainCalculator] Erreur de parsing JSON:",a),console.log("❌ [domainCalculator] JSON invalide:",h),{domaines_pertinents:[],analyse_globale:"",confiance_globale:0}}}async function p(a,b,c){let d,e,f=(d=a.map((a,b)=>`${b+1}. [ID:${a.document_id}] ${a.document_nom} (${a.groupe_nom})`).join("\n"),e=b.domaines_pertinents.map(a=>`- ${a.groupe_nom} (${a.pourcentage}%): ${a.raison}`).join("\n"),`# AGENT IA - S\xc9LECTION DES DOCUMENTS JURIDIQUES

Tu es un conseiller juridique expert qui aide \xe0 choisir le bon document.

## CONTEXTE DE L'ANALYSE
${e}

Analyse globale: ${b.analyse_globale}

## CONVERSATION
${c}

## DOCUMENTS DISPONIBLES (${a.length})
${d}

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
- JSON valide uniquement`);await i("DOC_SELECTION","Document Selection",f);let g=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:"Sélectionne les documents et retourne le JSON demandé."}],systemPrompt:f,maxTokens:2e3})}),h=((await g.json()).message||"").replace(/\n/g,"");console.log("📄 [documentCalculator] Réponse nettoyée:",h.substring(0,200));let j=h.match(/\{[\s\S]*\}/g);if(!j||0===j.length)return console.error("❌ [documentCalculator] Aucun JSON trouvé dans la réponse"),{documents:[],reponse_formatee:"Erreur lors de l'analyse : la réponse de l'IA ne contient pas de données structurées."};let k=j[j.length-1];try{let a=JSON.parse(k);return console.log("✅ [documentCalculator] JSON parsé avec succès"),a}catch(a){return console.error("❌ [documentCalculator] Erreur de parsing JSON:",a),console.log("❌ [documentCalculator] JSON invalide:",k),{documents:[],reponse_formatee:"Erreur lors de l'analyse : impossible de traiter la réponse de l'IA."}}}async function q(a,b){let c=`Tu es le m\xeame expert juridique que dans le prompt initial. Tu dois continuer la conversation en gardant exactement le m\xeame style d'\xe9criture et le m\xeame ton que le premier message.

DONN\xc9ES DU DOCUMENT CIBLE
Type :
${a.document_nom}

Liste de contraintes strictes (100% des informations n\xe9cessaires sont requises pour g\xe9n\xe9rer le document) :
${a.donnees_necessaires}

HISTORIQUE DE CONVERSATION
${b}

MISSION
ANALYSE LA LISTE : Lis attentivement ${a.donnees_necessaires}. C'est la liste absolue de tout ce dont tu as besoin. Rien de moins, rien de plus.
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
"Parfait, j'ai toutes les informations pour r\xe9diger votre ${a.document_nom}. Souhaitez-vous que je g\xe9n\xe8re le document ?"

Une fois que l'utilisateur confirme ("oui", "d'accord", "g\xe9n\xe8re", "c'est bon", etc.) :

🔴 INSTRUCTION ABSOLUE
R\xc9PONDS EXACTEMENT ET UNIQUEMENT CECI (mot pour mot, rien d'autre) :
GENERATE_DOCUMENT`;await i("DATA_COLLECTION","Data Collection",c);let d=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:"Continue la conversation pour collecter les informations manquantes."}],systemPrompt:c,maxTokens:1500})});return(await d.json()).message||"Pourriez-vous me donner plus de détails ?"}var r=a.i(51004);function s(){return{phase:"standard",userMessageCount:0,extractionLoopCount:0}}function t(a){return a.map(a=>`${"user"===a.role?"Utilisateur":"Assistant"}: ${a.content}`).join("\n\n")}async function u(a,b,c){let d=a.filter(a=>"user"===a.role).length,e={...b,userMessageCount:d};if(d<4)return{response:"",newState:{...e,phase:"standard"},shouldUseStandardPrompt:!0};if(4===d&&"standard"===b.phase){c("calculating_domains","🔍 Analyse de votre situation...");let b=t(a),d=await (0,r.getGroupNames)(),f=await o(d,b);if(e.domainesResult=f,0===f.domaines_pertinents.length)return{response:"Je n'ai pas pu identifier clairement le domaine juridique. Pourriez-vous me donner plus de détails ?",newState:{...e,phase:"standard"},shouldUseStandardPrompt:!1};c("calculating_docs","📋 Sélection des documents adaptés...");let g=f.domaines_pertinents.map(a=>a.groupe_nom),h=await function(a,b=40){let c=(0,r.getAllDocuments)();(0,r.getGroupMap)();let d=a.map(a=>a.toLowerCase());return c.filter(a=>d.includes(a.groupe_nom.toLowerCase())).slice(0,b)}(g,40),i=await p(h,f,b);return e.documentsResult=i,e.phase="awaiting_selection",{response:i.reponse_formatee,newState:e,shouldUseStandardPrompt:!1}}if("awaiting_selection"===b.phase&&b.documentsResult){let d=function(a,b){let c=a.toLowerCase().trim(),d=c.match(/^[1-4]$|option\s*([1-4])|choix\s*([1-4])|le\s*([1-4])|la\s*([1-4])/);if(d){let a=parseInt(d[1]||d[2]||d[3]||d[4]||d[0]),c=b.find(b=>b.priorite===a);if(c)return c}for(let a of b){let b=a.document_nom.toLowerCase();if(c.includes(b)||b.includes(c)||b.split(/\s+/).filter(a=>a.length>4).filter(a=>c.includes(a)).length>=2)return a}return null}(a.filter(a=>"user"===a.role).pop()?.content||"",b.documentsResult.documents);if(d){var f;let b=await (f=d.document_id,(0,r.findDocumentById)(f)??null);if(console.log("🔍 [orchestrator] Doc selected:",d.document_id,"Full doc:",b),console.log("🔍 [orchestrator] Has architecture?",b?.architecture?"YES":"NO"),b){e.selectedDocument=b,e.phase="extracting_data",e.extractionLoopCount=1,c("extracting_data","📝 Collecte des informations...");let d=a.slice(0,a.length-1).map(a=>`${"user"===a.role?"Utilisateur":"Assistant"}: ${a.content}`).join("\n\n"),f=await q(b,d);return h(f)?(e.phase="ready_to_generate",{response:"GENERATE_DOCUMENT",newState:e,shouldUseStandardPrompt:!1}):{response:f,newState:e,shouldUseStandardPrompt:!1}}}return{response:"Je n'ai pas compris votre choix. Indiquez le numéro (1, 2 ou 3) ou le nom du document souhaité.",newState:e,shouldUseStandardPrompt:!1}}if("extracting_data"===b.phase&&b.selectedDocument){if(e.extractionLoopCount=(b.extractionLoopCount||0)+1,e.extractionLoopCount>15)return e.phase="ready_to_generate",{response:"GENERATE_DOCUMENT",newState:e,shouldUseStandardPrompt:!1};let c=t(a),d=await q(b.selectedDocument,c);return h(d)?(e.phase="ready_to_generate",{response:"GENERATE_DOCUMENT",newState:e,shouldUseStandardPrompt:!1}):{response:d,newState:e,shouldUseStandardPrompt:!1}}return"ready_to_generate"===b.phase?{response:"GENERATE_DOCUMENT",newState:e,shouldUseStandardPrompt:!1}:{response:"",newState:e,shouldUseStandardPrompt:!0}}function v(){(0,d.useRouter)();let{user:a}=(0,e.useAuth)(),{addDocument:g}=(0,f.useDocuments)(),[i,o]=(0,c.useState)([]),[p,q]=(0,c.useState)(""),[r,t]=(0,c.useState)(!1),[v,w]=(0,c.useState)(!1),[x,y]=(0,c.useState)(!1),[z,A]=(0,c.useState)(""),[B,C]=(0,c.useState)(0),[D,E]=(0,c.useState)(0),F=(0,c.useRef)(null),G=(0,c.useRef)(null);(0,c.useRef)(null);let H=(0,c.useRef)(null),I=(0,c.useRef)(null),J=(0,c.useRef)(null),K=(0,c.useRef)(null),L=(0,c.useRef)(null),[M,N]=(0,c.useState)("");(0,c.useRef)(""),(0,c.useRef)("");let O=(0,c.useRef)(null),P=(0,c.useRef)([]),[Q,R]=(0,c.useState)(s()),[S,T]=(0,c.useState)("");(0,c.useEffect)(()=>{F.current?.scrollIntoView({behavior:"smooth"})},[i,z]),(0,c.useEffect)(()=>{G.current?.focus()},[]),(0,c.useEffect)(()=>{G.current&&0===p.length&&(G.current.style.height="44px")},[p]);let U=async a=>{A("");for(let b=0;b<a.length;b++)await new Promise(a=>setTimeout(a,10)),A(a.substring(0,b+1));return a};(0,c.useEffect)(()=>()=>{Z()},[]);let V=async()=>{try{let a=await navigator.mediaDevices.getUserMedia({audio:!0});L.current=a;let b=new(window.AudioContext||window.webkitAudioContext),c=b.createAnalyser(),d=b.createMediaStreamSource(a);c.fftSize=256,d.connect(c),H.current=b,I.current=c;let e=c.frequencyBinCount,f=new Uint8Array(e),g=()=>{if(I.current){I.current.getByteFrequencyData(f);let a=f.reduce((a,b)=>a+b)/e;E(a/255),J.current=requestAnimationFrame(g)}};return g(),a}catch(a){throw console.error("Error visualizing audio:",a),a}},W=()=>{K.current&&(clearInterval(K.current),K.current=null),C(0)},X=()=>{J.current&&(cancelAnimationFrame(J.current),J.current=null),H.current&&(H.current.close(),H.current=null),E(0)},Y=async()=>{try{if(await V(),C(0),K.current=setInterval(()=>{C(a=>a+1)},1e3),w(!0),P.current=[],L.current){let a=new MediaRecorder(L.current,{mimeType:"audio/webm"});a.ondataavailable=a=>{a.data.size>0&&P.current.push(a.data)},a.start(),O.current=a,console.log("Enregistrement audio démarré")}}catch(a){console.error("Erreur démarrage enregistrement:",a),alert("Impossible d'accéder au microphone: "+a.message),w(!1),W(),X()}},Z=async()=>{if(v){if(console.log("Validation enregistrement - Envoi à Whisper"),O.current&&"inactive"!==O.current.state&&(O.current.stop(),await new Promise(a=>{O.current?O.current.onstop=()=>a():a()})),L.current&&(L.current.getTracks().forEach(a=>a.stop()),L.current=null),W(),X(),w(!1),P.current.length>0){let a=new Blob(P.current,{type:"audio/webm"});console.log("Taille audio:",a.size,"bytes"),t(!0);try{let b=new FormData;b.append("audio",a,"recording.webm");let c=await fetch("/api/transcribe",{method:"POST",body:b});if(!c.ok)throw Error("Erreur transcription: "+c.statusText);let d=await c.json(),e=d.text?.trim()||"";if(console.log("Texte transcrit par Whisper:",e),e){let a=p.trim()?p.trim()+" "+e:e;q(a)}}catch(a){console.error("Erreur transcription:",a),alert("Erreur lors de la transcription. Vérifiez que la clé API OpenAI est configurée.")}finally{t(!1)}}P.current=[],O.current=null}},$=async()=>{!r&&(v||await Y())},_=(a,b)=>{R(b=>({...b,phase:a})),b&&T(b)},aa=async()=>{if(!p.trim()||r)return;let b={role:"user",content:p,timestamp:new Date};o(a=>[...a,b]),q(""),t(!0);try{let c,d=[...i,b],e=d.filter(a=>"system"!==a.role).map(a=>({role:a.role,content:a.content})),{response:f,newState:m,shouldUseStandardPrompt:n}=await u(e,Q,_);if(R(m),T(""),c=n?await j(e):f,await U(c),o(a=>[...a,{role:"assistant",content:c,timestamp:new Date}]),A(""),h(c)){let b=d.map(a=>a.role+": "+a.content).join("\n"),c=function(a){for(let b of["mise en demeure","lettre de réclamation","plainte","demande de justification","contestation"])if(a.toLowerCase().includes(b))return b;return"Document juridique"}(b);o(a=>[...a,{role:"assistant",content:"⏳ Génération du document en cours...",timestamp:new Date}]);let e=await k(Q.selectedDocument,b);(0,l.generatePDF)(e,c);let f=JSON.parse(localStorage.getItem("test_documents")||"[]"),h="test_"+Date.now();f.push({id:h,type:c,fileName:c.replaceAll(" ","_")+"_"+Date.now()+".pdf",createdAt:new Date().toISOString(),textContent:e}),localStorage.setItem("test_documents",JSON.stringify(f)),a&&await g({type:c,fileName:c.replaceAll(" ","_")+"_"+Date.now()+".pdf",createdAt:new Date,textContent:e}),o(a=>[...a.slice(0,-1),{role:"assistant",content:'✅ Document "'+c+'" généré avec succès !\n\n📄 Retrouvez-le dans "Mes Documents"',timestamp:new Date}]),R(s())}}catch(a){console.error("Erreur:",a),o(a=>[...a,{role:"assistant",content:"❌ Une erreur est survenue. Veuillez réessayer.",timestamp:new Date}])}finally{t(!1)}};return(0,b.jsxs)("div",{className:"flex flex-col bg-[#F8FAFC]",style:{height:"100dvh",minHeight:"-webkit-fill-available"},children:[(0,b.jsx)(n.default,{isOpen:x,onClose:()=>y(!1)}),(0,b.jsx)("header",{className:"bg-white shadow-sm flex-shrink-0 sticky top-0 z-10",children:(0,b.jsxs)("div",{className:"flex items-center justify-between px-3 sm:px-4 py-3",children:[(0,b.jsx)("button",{onClick:()=>y(!0),className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:(0,b.jsx)(m.FaBars,{className:"text-lg sm:text-xl text-[#1E3A8A]"})}),(0,b.jsx)("h1",{className:"text-lg sm:text-xl font-semibold text-[#1E3A8A]",children:"PRUDHOMME"}),(0,b.jsx)("div",{className:"w-8 sm:w-10"})]})}),(0,b.jsxs)("div",{className:"flex-1 overflow-y-auto overflow-x-hidden",style:{WebkitOverflowScrolling:"touch"},children:[0!==i.length||z?(0,b.jsxs)("div",{className:"p-3 sm:p-4 space-y-3 sm:space-y-4 pb-4",children:[i.map((a,c)=>(0,b.jsx)("div",{className:"flex "+("user"===a.role?"justify-end":"system"===a.role?"justify-center":"justify-start"),children:(0,b.jsx)("div",{className:"max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 "+("user"===a.role?"bg-[#1E3A8A] text-white rounded-[18px]":"system"===a.role?"bg-[#10B981] text-white rounded-[18px] text-center":"bg-transparent text-[#1E3A8A] rounded-[18px]"),style:{lineHeight:1.4},children:(0,b.jsx)("p",{className:"whitespace-pre-wrap text-sm sm:text-[15px]",children:a.content})})},c)),z&&(0,b.jsx)("div",{className:"flex justify-start",children:(0,b.jsx)("div",{className:"max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent text-[#1E3A8A] rounded-[18px]",style:{lineHeight:1.4},children:(0,b.jsx)("p",{className:"whitespace-pre-wrap text-sm sm:text-[15px]",children:z})})}),(0,b.jsx)("div",{ref:F})]}):(0,b.jsx)("div",{className:"h-full flex items-center justify-center px-4 sm:px-10",children:(0,b.jsx)("p",{className:"text-center text-2xl sm:text-4xl md:text-5xl text-[#1E3A8A] font-light opacity-25 leading-tight",children:"Pouvez-vous me décrire brièvement votre problème juridique ?"})}),r&&!z&&(0,b.jsxs)("div",{className:"px-3 sm:px-4 pb-4",children:[S&&(0,b.jsx)("div",{className:"mb-2 text-sm text-[#64748B] text-center",children:S}),(0,b.jsxs)("div",{className:"flex items-center gap-1",children:[(0,b.jsx)("div",{className:"w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce",style:{animationDelay:"0ms"}}),(0,b.jsx)("div",{className:"w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce",style:{animationDelay:"150ms"}}),(0,b.jsx)("div",{className:"w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})]})]}),(0,b.jsx)("div",{className:"bg-white border-t border-[#E2E8F0] p-3 sm:p-4 flex-shrink-0 safe-bottom",children:(0,b.jsxs)("div",{className:"flex items-center gap-2 max-w-4xl mx-auto",children:[v?(0,b.jsx)("button",{onClick:()=>{console.log("Annulation enregistrement"),O.current&&"inactive"!==O.current.state&&(O.current.stop(),O.current=null),L.current&&(L.current.getTracks().forEach(a=>a.stop()),L.current=null),w(!1),W(),X(),P.current=[]},disabled:r,className:"p-2.5 sm:p-3 rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] transition-colors flex-shrink-0",children:(0,b.jsx)(m.FaTimes,{className:"text-base sm:text-lg"})}):(0,b.jsx)("button",{onClick:$,disabled:r,className:"p-2.5 sm:p-3 rounded-full bg-[#F8FAFC] text-[#1E3A8A] hover:bg-[#E2E8F0] transition-colors flex-shrink-0",children:(0,b.jsx)(m.FaMicrophone,{className:"text-base sm:text-lg"})}),v?(0,b.jsxs)("div",{className:"flex-1 flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] rounded-3xl",children:[(0,b.jsx)("div",{className:"flex-1 flex items-center justify-center gap-0.5 h-8",children:[...Array(40)].map((a,c)=>{let d=Math.max(4,100*D*(.3+.7*Math.random()));return(0,b.jsx)("div",{className:"w-0.5 bg-[#1E3A8A] rounded-full transition-all duration-75",style:{height:`${d}%`,opacity:.3+.7*D}},c)})}),(0,b.jsxs)("div",{className:"text-sm font-semibold text-[#1E3A8A] min-w-[45px] text-right",children:[Math.floor(B/60),":",(B%60).toString().padStart(2,"0")]})]}):(0,b.jsx)("textarea",{ref:G,value:p,onChange:a=>q(a.target.value),onKeyPress:a=>{"Enter"!==a.key||a.shiftKey||(a.preventDefault(),aa())},placeholder:"Votre message...",disabled:r,rows:1,className:"flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-none rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-[#0F172A] placeholder-[#64748B] text-sm sm:text-base resize-none overflow-y-auto max-h-[144px]",style:{minHeight:"44px",lineHeight:"1.5",scrollbarWidth:"thin",boxSizing:"content-box"},onInput:a=>{let b=a.target;b.style.height="auto";let c=Math.min(b.scrollHeight,144);b.style.height=c+"px"}}),v?(0,b.jsx)("button",{onClick:Z,onTouchEnd:a=>{a.preventDefault(),Z()},disabled:r,type:"button",className:"p-2.5 sm:p-3 rounded-full bg-[#1E3A8A] text-white hover:bg-[#1E40AF] transition-colors flex-shrink-0",children:(0,b.jsx)(m.FaCheck,{className:"text-base sm:text-lg"})}):(0,b.jsx)("button",{onClick:aa,disabled:r||!p.trim(),className:"p-2.5 sm:p-3 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0",children:(0,b.jsx)(m.FaPaperPlane,{className:"text-base sm:text-lg"})})]})})]})}a.s(["default",()=>v],52763)}];

//# sourceMappingURL=app_chat_page_tsx_18691586._.js.map