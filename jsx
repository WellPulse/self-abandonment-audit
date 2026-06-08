import { useState, useEffect } from "react";

const KIT_ENDPOINT = "https://api.convertkit.com/v3/forms/9537995/subscribe?api_key=zO884lxZZDqHnXv4PDueDA";
const STRIPE_LINK = "https://buy.stripe.com/YOUR_LINK_HERE";
const PRICE = "$27";

const QUESTIONS = [
  { id:1,  section:"Boundaries & Saying Yes",    text:"How often do you say yes to others when you really mean no?",                                                    options:["Rarely. I honor my own limits","Sometimes, when it feels unavoidable","Often. It's easier than the conflict","Almost always. No feels impossible"] },
  { id:2,  section:"Boundaries & Saying Yes",    text:"After giving to others, how do you usually feel?",                                                               options:["Genuinely fulfilled and energized","Neutral. It balances out","Drained but proud of myself","Completely depleted and resentful"] },
  { id:3,  section:"Boundaries & Saying Yes",    text:"How clearly do you communicate your needs?",                                                                      options:["Clearly and without guilt","I try, but often soften it too much","I hint but rarely say it directly","I push my needs aside entirely"] },
  { id:4,  section:"Boundaries & Saying Yes",    text:"When you set a limit and someone pushes back, you typically:",                                                    options:["Hold the line with calm confidence","Feel uncomfortable but stay firm","Apologize and usually back down","Give in immediately to keep the peace"] },
  { id:5,  section:"Self-Worth & Achievement",   text:"How much does your sense of self-worth depend on what you accomplish?",                                           options:["Very little. I know my worth is inherent","Somewhat. Achievements feel good but aren't everything","A lot. Being productive makes me feel worthy","Completely. I feel worthless without output"] },
  { id:6,  section:"Self-Worth & Achievement",   text:"How do you respond when you make a mistake?",                                                                     options:["I acknowledge it and move on with compassion","I reflect and course-correct without too much self-blame","I replay it and criticize myself for a while","I spiral into shame for days or longer"] },
  { id:7,  section:"Self-Worth & Achievement",   text:"When was the last time you rested without feeling guilty?",                                                       options:["Recently. Rest is part of my rhythm","A few weeks ago, and it took effort","I can't remember a guilt-free rest day","Rest feels like laziness to me"] },
  { id:8,  section:"Energy & Nervous System",    text:"How would you describe your baseline energy most days?",                                                          options:["Steady and sustainable","Up and down, but manageable","Chronically low. I push through constantly","Completely flat. I'm running on empty"] },
  { id:9,  section:"Energy & Nervous System",    text:"How often do you feel physically tense? Jaw clenched, shoulders raised, chest tight.",                           options:["Rarely or never","Occasionally during stressful periods","Most days, especially by evening","Constantly. It's just my body's default"] },
  { id:10, section:"Energy & Nervous System",    text:"How well do you sleep?",                                                                                          options:["Generally well and wake feeling rested","Sometimes disrupted, but mostly okay","Often restless, wired, or wake early","Exhausted no matter how much I sleep"] },
  { id:11, section:"Energy & Nervous System",    text:"How often do you experience anxiety, overwhelm, or a sense of dread?",                                            options:["Rarely, and it passes quickly","Occasionally, usually tied to real events","Regularly. It's become background noise","Almost constantly. I live in it"] },
  { id:12, section:"Identity & Authenticity",    text:"How much do you adjust your personality depending on who you're with?",                                           options:["Very little. I show up as myself","Slightly. Mostly adapting tone or style","Significantly. Different people get different versions of me","Completely. I lose myself in roles and relationships"] },
  { id:13, section:"Identity & Authenticity",    text:"When did you last do something purely because it brought you joy? Not for productivity, obligation, or anyone else.", options:["Recently. I prioritize this regularly","A week or two ago","Can't really remember","What even brings me joy? I'm not sure anymore."] },
  { id:14, section:"Identity & Authenticity",    text:"How connected do you feel to your own desires, preferences, and values?",                                         options:["Very connected. I know what I want and act on it","Somewhat connected, though life crowds it out sometimes","Vaguely. I know what I should want more than what I do want","Completely disconnected. I define myself through others"] },
  { id:15, section:"Relationships & Conflict",   text:"How comfortable are you letting others be disappointed in you?",                                                  options:["Fairly comfortable. I can't control others' feelings","Uncomfortable but manageable","Very uncomfortable. I'll over-explain to avoid it","Intolerable. I'll do almost anything to prevent disapproval"] },
  { id:16, section:"Relationships & Conflict",   text:"How often do you find yourself taking responsibility for others' emotions?",                                       options:["Rarely. I know it's not my job","Sometimes, especially with people I love","Often. Their mood becomes my problem","Always. If someone is upset, it must be my fault"] },
  { id:17, section:"Relationships & Conflict",   text:"Do you find it easy to ask for help when you need it?",                                                           options:["Yes. Receiving support feels natural","Sometimes, but I prefer to handle things myself","Rarely. I don't want to be a burden","Never. Needing help feels like weakness"] },
  { id:18, section:"Body & Self-Care",           text:"How well do you tend to your basic physical needs? Sleep, nutrition, movement.",                                  options:["Consistently. It's non-negotiable","Mostly, with occasional sacrifice","Irregularly. I skip basics when busy","Poorly. Others' needs come first, always"] },
  { id:19, section:"Body & Self-Care",           text:"How do you experience physical symptoms like headaches, gut issues, fatigue, or chronic pain?",                   options:["Rarely. My body generally feels okay","Occasionally, usually tied to stress","Regularly. It's become my normal","Constantly. My body is signaling something is wrong"] },
  { id:20, section:"Body & Self-Care",           text:"How often do you check in with how you're actually feeling, emotionally and physically?",                         options:["Daily. Self-awareness is a practice I maintain","Sometimes, when things get really hard","Rarely. I push through feelings rather than feel them","Almost never. I'm disconnected from my body"] },
];

const ARCHETYPES = {
  caregiver: {
    name:"The Caregiver", tagline:'"I take care of everyone but myself."', symbol:"Heart",
    desc:"Your nervous system has learned to regulate itself through the act of caring for others. Research on fawn response, first described by Pete Walker and later mapped neurologically, shows that for some people, tending to others activates the ventral vagal branch of the autonomic nervous system, creating a felt sense of safety. The problem: your body has outsourced its own regulation. When you stop giving, you may feel anxious, purposeless, or hollow. Not because you're weak, but because your nervous system never learned to self-soothe independently.",
    neuro:"Fawn response (ventral vagal to dorsal collapse under stress). Elevated cortisol awakening response. DHEA suppression. Oxytocin dysregulation under chronic giving without reciprocation.",
    brain:"The anterior cingulate cortex, responsible for self-referential processing, shows reduced activation in chronic caregivers. You are literally less able to register your own needs neurologically.",
    traits:["Emotionally attuned","Overextended","Hard to ask for help","Feels responsible for others' happiness","Self-sacrifice as identity"],
  },
  performer: {
    name:"The Performer", tagline:'"My worth comes from achievement."', symbol:"Star",
    desc:"Achievement activates your brain's dopamine reward pathway, the same system that drives motivation, pleasure, and pursuit. Research from Stanford's Stress and Development Lab shows that individuals with contingent self-worth tied to performance display hyperactivation of the prefrontal cortex during evaluation, meaning your brain treats every task as a threat-or-reward scenario. Rest doesn't feel restorative because your default mode network, the brain's offline system, never fully activates.",
    neuro:"Chronic sympathetic activation. Dopamine cycle dysregulation. Elevated evening cortisol. Default mode network suppression during rest.",
    brain:"The amygdala assigns threat-level to perceived failure. Over time, this sensitizes the threat response so that normal imperfection triggers the same neurological alarm as genuine danger.",
    traits:["High-functioning externally","Rest feels like weakness","Inner critic is loud","Worth = output","Afraid of being ordinary"],
  },
  peacekeeper: {
    name:"The Peacekeeper", tagline:'"I avoid conflict at all costs."', symbol:"Circle",
    desc:"Conflict avoidance is not a personality flaw. It is a learned neurological strategy. Research on social threat processing shows that anticipated interpersonal conflict activates the same brain regions as physical threat: the amygdala, anterior insula, and dorsal anterior cingulate cortex. Polyvagal theory (Stephen Porges) explains this as a ventral vagal-dependent survival strategy: your social engagement system became hypertuned to others' emotional states as a way of preventing rupture.",
    neuro:"Social threat hyperactivation (amygdala + anterior insula). Chronic vagal suppression of authentic emotional expression. Insula underresponsiveness to self-directed signals.",
    brain:"Suppressing emotional expression repeatedly activates the lateral prefrontal cortex as an override mechanism. And this is metabolically expensive and contributes to the cognitive fatigue many Peacekeepers describe.",
    traits:["Conflict-averse","Over-accommodating","Minimizes own feelings","People-pleasing default","Stores tension in the body"],
  },
  shapeshifter: {
    name:"The Shape-Shifter", tagline:'"I become who everyone else needs me to be."', symbol:"Diamond",
    desc:"Identity flexibility is neurologically rooted in the brain's social mirroring system. Mirror neurons, located in the premotor cortex and inferior parietal lobule, fire both when we perform an action and when we observe another performing it. For Shape-Shifters, this system is hyperactive: you don't just observe others, you neurologically inhabit them. Research on self-concept clarity shows that low self-concept clarity is associated with greater emotional reactivity, higher cortisol response to social stress, and reduced psychological resilience.",
    neuro:"Mirror neuron hyperactivation. Reduced medial prefrontal cortex coherence for self-referential processing. Low self-concept clarity linked to elevated cortisol reactivity.",
    brain:"The default mode network, activated during self-reflection, future-imagining, and identity consolidation, is underutilized in people who are chronically other-oriented. Over time this contributes to the hollow feeling of not knowing who you are when you're alone.",
    traits:["Highly adaptable","Identity shaped by context","Difficulty with 'what do I want?'","Feels real in relationships, lost alone","Deep longing to be known"],
  },
  survivor: {
    name:"The Survivor", tagline:'"I\'m functioning, but barely."', symbol:"Triangle",
    desc:"Your nervous system has adapted to a state of chronic threat. This is not metaphor. It is measurable neurobiology. Research on adverse childhood experiences and chronic stress exposure shows structural changes in three key brain regions: the amygdala enlarges, the hippocampus shrinks, and the prefrontal cortex thins. Bessel van der Kolk's research demonstrates that prolonged stress encodes itself in the body's sensorimotor system, meaning the body holds the memory of threat even when the conscious mind has moved on.",
    neuro:"HPA axis dysregulation. Amygdala hypertrophy. Hippocampal volume reduction. Prefrontal thinning. Chronic dorsal vagal activation (freeze/collapse response).",
    brain:"The window of tolerance, the neurological zone in which you can think, feel, and respond effectively, narrows under chronic stress. You may oscillate between hyperarousal (anxiety, reactivity) and hypoarousal (numbness, shutdown) with little stable middle ground.",
    traits:["Hypervigilant","Chronic HPA dysregulation","Emotional numbness or volatility","Dissociation from body signals","Exhaustion despite rest"],
  },
};

const ZONES = {
  green: {
    label:"Green Zone", subtitle:"Mild Self-Abandonment", color:"#7A8C6E", emoji:"🌿",
    desc:"Your nervous system is operating within a functional range. Some self-abandonment patterns are present, but your autonomic nervous system is likely maintaining relatively healthy ventral vagal tone, the state associated with social engagement, emotional flexibility, and physiological restoration. This is the window where early intervention has the highest return.",
    symptoms:["Occasional overcommitment","Mild guilt around rest","Intermittent people-pleasing","Moments of identity disconnection","Mild tension after social demands"],
    hormones:"Cortisol follows a healthy diurnal rhythm, elevated in the morning to support alertness and declining through the day. The HPA axis is likely responding appropriately to acute stressors and recovering. The DHEA-to-cortisol ratio, a key resilience marker, is probably within healthy range.",
    inflammation:"Systemic inflammation (measured by markers like hs-CRP and IL-6) is likely low. The NF-kB inflammatory pathway, activated by psychological stress, is not chronically upregulated.",
    energy:"Mitochondrial function is generally intact. ATP production is meeting demand. Cellular energy is not yet being chronically diverted to threat-response systems.",
    relationships:"Your social nervous system, the ventral vagal circuit, is largely online. You can read social cues accurately, co-regulate with others, and repair ruptures. Some friction around authentic need expression is present.",
    longevity:"Telomere research (Epel et al., UCSF) shows that psychological stress accelerates cellular aging through oxidative stress and telomere shortening. At this zone, that process is minimal.",
  },
  yellow: {
    label:"Yellow Zone", subtitle:"Chronic Stress Patterns Emerging", color:"#C9A84C", emoji:"🌾",
    desc:"Your body is beginning to show the physiological signature of chronic self-abandonment. The key word is chronic. Not intense, but persistent. Research consistently shows that low-grade continuous stress is more damaging to the HPA axis and immune system than acute high-intensity stress, because recovery never fully occurs.",
    symptoms:["Fatigue not resolved by sleep","Subclinical anxiety as background noise","Difficulty declining requests","Reduced capacity for spontaneous joy","Low-grade resentment in close relationships"],
    hormones:"Cortisol is likely showing a blunted morning rise or elevated evening levels, both signs of early HPA dysregulation. The cortisol-progesterone competition for the same precursor (pregnenolone), known as pregnenolone steal, can produce luteal phase insufficiency, PMS intensification, and cycle irregularity.",
    inflammation:"Pro-inflammatory cytokines, particularly IL-6, TNF-a, and IL-1b, are likely mildly elevated. This is why inflammation-driven low mood is qualitatively different from situational sadness. It has a physical substrate.",
    energy:"The shift from parasympathetic to sympathetic dominance means glucose is being preferentially routed away from the prefrontal cortex and digestive function.",
    relationships:"In the Yellow Zone, you are beginning to recruit sympathetic activation in situations that would previously have felt manageable. You may notice increased reactivity or a subtle withdrawal from depth.",
    longevity:"Chronic mild inflammation is now understood as a primary driver of age-related disease, a phenomenon researchers call inflammaging. These changes are reversible with intervention.",
  },
  orange: {
    label:"Orange Zone", subtitle:"Burnout Risk", color:"#D4763B", emoji:"🍂",
    desc:"Your nervous system is operating in sustained threat mode. The World Health Organization classified burnout as an occupational phenomenon in 2019, characterized by three dimensions: exhaustion, cynicism/detachment, and reduced efficacy. Neurologically, this maps onto a specific pattern: the prefrontal cortex, responsible for planning, empathy, and emotional regulation, is being chronically compromised by cortisol-mediated structural changes. You are not imagining it. The brain at this stage is measurably different.",
    symptoms:["Persistent exhaustion unresponsive to rest","Emotional blunting or sudden overwhelm","Frequent infections or slow wound healing","Significant cognitive fog","Anhedonia, reduced capacity to feel pleasure","Chronic muscular tension"],
    hormones:"Cortisol may paradoxically be low, not high, particularly in the morning, a hallmark of burnout vs. acute stress. Thyroid conversion from T4 to active T3 is significantly impaired, producing hypothyroid symptoms even with normal TSH.",
    inflammation:"Neuroinflammation, inflammation within the brain itself, is increasingly recognized as a driver of burnout symptoms. The blood-brain barrier becomes more permeable under chronic stress, allowing inflammatory cytokines direct access to neural tissue.",
    energy:"Mitochondrial dysfunction is now likely present in multiple tissue types. Research from the Karolinska Institute shows burnout patients exhibit measurable changes in mitochondrial gene expression. This is why rest alone doesn't restore. The machinery producing energy is itself impaired.",
    relationships:"The social engagement system, dependent on a well-regulated vagus nerve, is significantly impaired. Oxytocin release, which requires a sense of safety, is suppressed by chronic sympathetic activation. This is physiology, not personality.",
    longevity:"Research from Maslach and Leiter (2016) links burnout to significantly elevated cardiovascular risk, immune dysregulation, accelerated cellular aging, and increased risk of autoimmune conditions.",
  },
  red: {
    label:"Red Zone", subtitle:"Survival Mode", color:"#9B4F2E", emoji:"🔴",
    desc:"Your nervous system has adapted to chronic threat at a deep structural level. Bessel van der Kolk's foundational research demonstrates that sustained stress, particularly interpersonal and chronic, does not remain psychological. It becomes somatic: encoded in the brainstem, the autonomic nervous system, and the body's sensorimotor memory. The part of the brain responsible for language and narrative (Broca's area) often goes offline under chronic threat, which is why it can feel impossible to explain how you feel. It is not weakness. It is neurology.",
    symptoms:["Profound exhaustion even after full sleep","Emotional shutdown alternating with dysregulation","Dissociation, feeling unreal or detached","Chronic pain or widespread inflammation","Near-complete loss of pleasure","Hypervigilance, scanning for danger even in safe environments"],
    hormones:"The HPA axis is severely dysregulated. Pregnenolone steal has depleted the precursor pool, affecting progesterone, DHEA, testosterone, and estrogen simultaneously. Thyroid function is substantially impaired. Reverse T3 is often elevated, blocking active thyroid hormone at the receptor level.",
    inflammation:"Neuroinflammation is likely significant. Research by Naomi Eisenberger (UCLA) demonstrates that social pain, rejection, isolation, chronic relational stress, activates the same neural circuits as physical pain and produces the same inflammatory cascade.",
    energy:"The dorsal vagal state, shutdown, freeze, collapse, is the most ancient autonomic response, activated when the organism perceives that fight or flight are no longer viable. Peter Levine's somatic research shows this energy is not lost. It is bound, held in the body as chronic tension and unresolved activation.",
    relationships:"Deeply strained or withdrawn. You may have genuine warmth for people but lack the neurological capacity to sustain connection. This is physiology, not a reflection of how much you care.",
    longevity:"ACE study data (Felitti et al., 1998, one of the most replicated findings in behavioral medicine) demonstrates that cumulative stress exposure has direct, dose-dependent effects on rates of cancer, cardiovascular disease, autoimmune conditions, and premature mortality. Recovery is possible and well-documented. It requires safety, not discipline.",
  },
};

const ROADMAP = [
  { day:1, task:"Identify 3 things you're tolerating.", desc:"Not the obvious ones. The subtle ones. The situation you've explained away, the dynamic you've normalized, the thing that costs you a little energy every single day." },
  { day:2, task:"Notice where you say yes when you mean no.", desc:"Just observe. No pressure to change yet. Pay attention to the moment just before you agree to something. Notice what's happening in your body." },
  { day:3, task:"Create one boundary.", desc:"One. Small enough to feel doable, real enough to matter. It doesn't need to be announced or explained. It just needs to be honored by you, first." },
  { day:4, task:"Spend 20 minutes doing something solely for yourself.", desc:"Not a bath for self-care performance. Something that has no output. No benefit except that it fills you. Notice how guilty it feels. That guilt is data." },
  { day:5, task:"Ask: What do I actually want?", desc:"Not what you should want. Not what would be reasonable to want. What do you want? In your body, today, in your life? Write for 10 minutes without editing yourself." },
  { day:6, task:"Remove one energy leak.", desc:"Review your inventory. Choose the one thing that costs the most for the least return. You don't have to fix it today. Just choose it, name it, and commit to one action this week." },
  { day:7, task:"Write a letter from your future self.", desc:"The version of you who came back. Who chose herself. Write to present-you, with love, with wisdom, with the hindsight of having done the work. What does she want you to know?" },
];

const LEAKS = {
  "Relationships":["Staying in conversations that drain you","Taking responsibility for others' emotions","Explaining yourself when you owe no explanation","Tolerating chronic criticism or dismissiveness","Over-giving to people who under-reciprocate","Holding space for those who don't hold space for you"],
  "Career":["Doing work that conflicts with your values","Staying in roles where you're undervalued","Over-delivering and under-communicating your needs","Taking on others' responsibilities by default","Performing competence at the cost of authenticity","Never advocating for yourself in professional spaces"],
  "Home Environment":["Living in chronic clutter or disorganization","Spaces that feel unsafe or tension-filled","Tolerating a sleep environment that isn't restorative","Technology consuming hours without intention","A home that serves everyone else's needs but yours","Environment that reflects who you were, not who you are"],
  "Health Habits":["Skipping meals, hydration, or movement when stressed","Using food, alcohol, or substances to numb","Sleeping too little and excusing it as necessary","Ignoring persistent physical symptoms","Treating rest as a reward, not a right","Pushing your body instead of listening to it"],
  "Self-Talk":["Running a commentary of criticism and comparison","Minimizing your own pain or experiences","Measuring your worth against productivity","Speaking to yourself in ways you'd never speak to a friend","Catastrophizing worst-case scenarios daily","Dismissing your own needs as not that bad"],
  "Time Management":["Saying yes before checking your actual capacity","No protected time that belongs only to you","Allowing others to schedule your life for you","Filling every gap with someone else's priority","Busyness as a substitute for meaning","Never asking: does this align with what I actually value?"],
};

function calcScore(answers) {
  const vals = Object.values(answers);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a,b) => a+b, 0) / (vals.length * 3) * 100);
}

function getZone(score) {
  if (score <= 25) return "green";
  if (score <= 50) return "yellow";
  if (score <= 75) return "orange";
  return "red";
}

function getArchetype(answers) {
  const s = { caregiver:0, performer:0, peacekeeper:0, shapeshifter:0, survivor:0 };
  const map = {
    1:  [null,"peacekeeper","peacekeeper","caregiver"],
    2:  [null,null,"caregiver","caregiver"],
    3:  [null,"peacekeeper","peacekeeper","shapeshifter"],
    4:  [null,"peacekeeper","peacekeeper","peacekeeper"],
    5:  [null,"performer","performer","performer"],
    6:  [null,"performer","performer","survivor"],
    7:  [null,"performer","survivor","performer"],
    8:  [null,null,"survivor","survivor"],
    9:  [null,"survivor","survivor","survivor"],
    10: [null,null,"survivor","survivor"],
    11: [null,null,"survivor","survivor"],
    12: [null,"shapeshifter","shapeshifter","shapeshifter"],
    13: [null,"performer","shapeshifter","shapeshifter"],
    14: [null,"shapeshifter","shapeshifter","shapeshifter"],
    15: [null,"peacekeeper","peacekeeper","peacekeeper"],
    16: [null,"caregiver","caregiver","caregiver"],
    17: [null,"performer","caregiver","performer"],
    18: [null,null,"survivor","caregiver"],
    19: [null,null,"survivor","survivor"],
    20: [null,"survivor","survivor","shapeshifter"],
  };
  Object.entries(answers).forEach(([qid, val]) => {
    const a = map[parseInt(qid)]?.[val];
    if (a) s[a]++;
  });
  return Object.entries(s).sort((a,b) => b[1]-a[1])[0][0];
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:#F9F5EF;font-family:'DM Sans',sans-serif;color:#2C2420}
  :root{--cream:#F9F5EF;--bone:#EEE8DC;--sand:#D9CEBC;--terra:#B87A5A;--rust:#9B4F2E;--bark:#5C3D2A;--sage:#7A8C6E;--gold:#C9A84C;--charcoal:#2C2420}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  .wrap{min-height:100vh;background:#F9F5EF}
  .cover{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px}
  .badge{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--terra);border:1px solid var(--terra);padding:6px 18px;border-radius:100px;margin-bottom:40px;animation:fadeUp .8s ease forwards}
  .cover-title{font-family:'Cormorant Garamond',serif;font-size:clamp(42px,7vw,76px);font-weight:300;line-height:1.05;color:var(--bark);max-width:720px;animation:fadeUp .8s ease forwards .2s;opacity:0}
  .cover-title em{font-style:italic;color:var(--terra)}
  .cover-sub{margin-top:24px;font-family:'Cormorant Garamond',serif;font-size:clamp(18px,3vw,26px);font-weight:300;font-style:italic;color:var(--bark);opacity:.7;max-width:520px;line-height:1.4;animation:fadeUp .8s ease forwards .4s}
  .cover-meta{margin-top:14px;font-size:13px;color:var(--terra);letter-spacing:.1em;animation:fadeUp .8s ease forwards .5s;opacity:0}
  .divider{width:60px;height:1px;background:var(--sand);margin:32px auto;animation:fadeUp .8s ease forwards .6s;opacity:0}
  .cover-desc{font-size:15px;line-height:1.7;color:var(--charcoal);opacity:.75;max-width:440px;animation:fadeUp .8s ease forwards .7s}
  .pills{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:28px;animation:fadeUp .8s ease forwards .8s;opacity:0}
  .pill{font-size:12px;font-weight:500;padding:7px 16px;background:var(--bone);border-radius:100px;color:var(--bark);letter-spacing:.05em}
  .btn{padding:17px 48px;background:var(--bark);color:var(--cream);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;border-radius:2px;transition:background .2s,transform .15s;margin-top:48px;animation:fadeUp .8s ease forwards 1s;opacity:0}
  .btn:hover{background:var(--rust);transform:translateY(-1px)}
  .btn-rust{background:var(--rust)}
  .btn-rust:hover{background:var(--bark)}
  .btn-full{width:100%;margin-top:8px;padding:17px;border-radius:3px}
  .quiz-wrap{max-width:660px;margin:0 auto;padding:60px 24px 100px}
  .progress-bar{height:3px;background:var(--sand);border-radius:2px;margin-bottom:52px;overflow:hidden}
  .progress-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--terra),var(--rust));transition:width .5s ease}
  .q-section{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--terra);margin-bottom:8px}
  .q-num{font-family:'Cormorant Garamond',serif;font-size:14px;color:var(--sand);margin-bottom:6px}
  .q-text{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,4vw,32px);font-weight:400;line-height:1.25;color:var(--bark);margin-bottom:36px}
  .options{display:flex;flex-direction:column;gap:12px}
  .option{padding:17px 22px;background:white;border:1.5px solid var(--bone);border-radius:4px;cursor:pointer;font-size:15px;line-height:1.5;color:var(--charcoal);text-align:left;transition:border-color .2s,background .2s,transform .15s;display:flex;align-items:center;gap:14px}
  .option:hover{border-color:var(--terra);background:var(--cream);transform:translateX(3px)}
  .option.sel{border-color:var(--terra);background:rgba(184,122,90,.06)}
  .opt-dot{width:20px;height:20px;min-width:20px;border-radius:50%;border:1.5px solid var(--sand);display:flex;align-items:center;justify-content:center;transition:all .2s;font-size:11px;font-weight:700;color:white}
  .option.sel .opt-dot{background:var(--terra);border-color:var(--terra)}
  .quiz-nav{display:flex;align-items:center;justify-content:space-between;margin-top:40px}
  .btn-ghost{padding:12px 28px;background:transparent;border:1.5px solid var(--sand);border-radius:2px;font-size:13px;font-weight:500;letter-spacing:.08em;color:var(--charcoal);cursor:pointer;transition:border-color .2s}
  .btn-ghost:hover{border-color:var(--bark)}
  .btn-next{padding:14px 36px;background:var(--bark);color:var(--cream);border:none;border-radius:2px;font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background .2s,transform .15s}
  .btn-next:hover:not(:disabled){background:var(--rust);transform:translateY(-1px)}
  .btn-next:disabled{opacity:.35;cursor:not-allowed}
  .loading{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding:40px}
  .loading h2{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;font-style:italic;color:var(--bark);text-align:center}
  .load-steps{display:flex;flex-direction:column;gap:10px;min-width:280px}
  .load-step{display:flex;align-items:center;gap:12px;font-size:13px;color:var(--charcoal);opacity:.4;transition:opacity .4s}
  .load-step.active{opacity:1;color:var(--terra)}
  .load-step.done{opacity:.6}
  .load-dot{width:8px;height:8px;min-width:8px;border-radius:50%;background:var(--sand);transition:background .3s}
  .load-step.active .load-dot{background:var(--terra);animation:pulse 1s infinite}
  .load-step.done .load-dot{background:var(--sage)}
  .optin-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 24px}
  .optin-card{max-width:500px;width:100%;background:white;border-radius:8px;border:1px solid var(--bone);overflow:hidden;box-shadow:0 8px 48px rgba(92,61,42,.1);animation:fadeUp .6s ease forwards}
  .optin-top{padding:40px 40px 32px;background:var(--bark);color:var(--cream);text-align:center}
  .optin-zone-tag{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border:1px solid rgba(255,255,255,.2);border-radius:100px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(249,245,239,.7);margin-bottom:18px}
  .optin-score{font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:300;line-height:1;color:var(--cream)}
  .optin-score-lbl{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(249,245,239,.5);margin-top:4px}
  .optin-headline{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;line-height:1.15;color:var(--cream);margin-top:18px}
  .optin-headline em{font-style:italic;color:var(--terra)}
  .optin-subhead{margin-top:10px;font-size:14px;line-height:1.7;color:rgba(249,245,239,.6)}
  .optin-body{padding:32px 40px 36px}
  .optin-promise{font-size:14px;line-height:1.8;color:var(--charcoal);opacity:.75;margin-bottom:24px}
  .optin-promise strong{color:var(--bark);opacity:1;font-weight:500}
  .optin-fields{display:flex;flex-direction:column;gap:10px}
  .optin-input{width:100%;padding:14px 17px;border:1.5px solid var(--bone);border-radius:3px;font-family:'DM Sans',sans-serif;font-size:15px;color:var(--charcoal);background:var(--cream);outline:none;transition:border-color .2s}
  .optin-input:focus{border-color:var(--terra);background:white}
  .optin-input::placeholder{color:var(--sand)}
  .err{font-size:13px;color:var(--rust);margin-top:4px}
  .optin-skip{display:block;text-align:center;margin-top:12px;font-size:12px;color:var(--charcoal);opacity:.4;cursor:pointer;background:none;border:none;text-decoration:underline;width:100%}
  .optin-gets{margin-top:18px;padding:14px 16px;background:var(--cream);border-radius:4px;display:flex;flex-direction:column;gap:8px}
  .optin-get{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--charcoal);line-height:1.5}
  .optin-get-icon{color:var(--terra);font-size:13px;margin-top:1px;min-width:14px}
  .optin-privacy{text-align:center;margin-top:14px;font-size:11px;color:var(--charcoal);opacity:.35}
  .results{max-width:760px;margin:0 auto;padding:60px 24px 100px}
  .eyebrow{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin-bottom:8px}
  .page-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,5vw,52px);font-weight:300;line-height:1.1;color:var(--bark)}
  .page-title em{font-style:italic}
  .tabs{display:flex;border-bottom:1px solid var(--bone);margin-top:36px;overflow-x:auto}
  .tab{padding:15px 22px;font-size:13px;font-weight:500;letter-spacing:.06em;color:var(--charcoal);opacity:.5;cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;transition:all .2s}
  .tab:hover{opacity:.8}
  .tab.active{opacity:1;color:var(--rust);border-bottom-color:var(--rust)}
  .panel{display:none;animation:fadeUp .4s ease}
  .panel.active{display:block}
  .score-card{margin-top:44px;padding:44px;background:white;border-radius:6px;border:1px solid var(--bone);text-align:center;position:relative;overflow:hidden}
  .score-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--zone-color,var(--sage))}
  .score-num{font-family:'Cormorant Garamond',serif;font-size:88px;font-weight:300;line-height:1;color:var(--bark)}
  .score-lbl{font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:var(--terra);margin-top:4px}
  .zone-badge{display:inline-flex;align-items:center;gap:8px;margin-top:18px;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:500}
  .score-desc{margin-top:16px;font-size:15px;line-height:1.7;color:var(--charcoal);opacity:.8;max-width:440px;margin-left:auto;margin-right:auto}
  .bars{margin-top:32px;padding:0 4px}
  .bars-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--bark);margin-bottom:14px}
  .bar-row{display:flex;align-items:center;gap:14px;margin-bottom:14px}
  .bar-label{min-width:120px;font-size:14px;color:var(--charcoal)}
  .bar-track{flex:1;height:8px;background:var(--bone);border-radius:4px;overflow:hidden}
  .bar-fill{height:100%;border-radius:4px;transition:width 1s ease}
  .bar-val{min-width:70px;font-size:12px;font-weight:500;text-align:right}
  .arch-card{margin-top:44px;padding:44px;background:var(--bark);color:var(--cream);border-radius:6px}
  .arch-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);font-weight:500}
  .arch-name{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,6vw,60px);font-weight:300;font-style:italic;line-height:1.05;margin-top:6px;color:var(--cream)}
  .arch-tagline{margin-top:14px;font-size:17px;font-style:italic;color:var(--sand);font-family:'Cormorant Garamond',serif;font-weight:300}
  .arch-desc{margin-top:22px;font-size:14px;line-height:1.8;color:rgba(249,245,239,.75);max-width:520px}
  .arch-traits{margin-top:24px;display:flex;flex-wrap:wrap;gap:8px}
  .trait{padding:5px 13px;border:1px solid rgba(249,245,239,.2);border-radius:100px;font-size:12px;color:var(--sand);letter-spacing:.05em}
  .sci-panel{padding:20px 24px;background:white;border:1px solid var(--bone);border-radius:6px;margin-top:12px}
  .sci-label{font-size:11px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--terra);margin-bottom:7px}
  .sci-text{font-size:14px;line-height:1.8;color:var(--charcoal);opacity:.85}
  .others-box{margin-top:28px;padding:24px 28px;background:var(--bone);border-radius:6px}
  .others-title{font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--bark);margin-bottom:10px}
  .others-list{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
  .other-item{padding:9px 14px;background:white;border-radius:4px;font-size:13px;color:var(--bark)}
  .other-item em{font-size:12px;color:var(--charcoal);opacity:.6;font-style:italic;display:block;margin-top:2px}
  .ns-card{margin-top:28px;border:1px solid var(--bone);border-radius:6px;overflow:hidden;background:white}
  .ns-head{padding:28px 36px;display:flex;align-items:center;gap:18px}
  .ns-circle{width:58px;height:58px;min-width:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;color:white}
  .ns-head-text h3{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--bark)}
  .ns-head-text p{font-size:14px;color:var(--charcoal);opacity:.6;margin-top:3px}
  .ns-body{padding:0 36px 32px}
  .symptoms-box{padding:18px 20px;background:var(--cream);border-radius:4px;margin-bottom:16px}
  .symptoms-lbl{font-size:12px;font-weight:500;color:var(--bark);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
  .symptoms-tags{display:flex;flex-wrap:wrap;gap:8px}
  .symptom{font-size:13px;padding:4px 11px;background:white;border-radius:100px;color:var(--charcoal)}
  .ns-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}
  .ns-item{padding:16px 18px;background:var(--cream);border-radius:4px}
  .ns-item-lbl{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--terra);font-weight:500;margin-bottom:6px}
  .ns-item-text{font-size:14px;line-height:1.6;color:var(--charcoal);opacity:.85}
  .roadmap-intro{margin-top:28px}
  .roadmap-days{margin-top:36px;display:flex;flex-direction:column}
  .day-row{display:flex;gap:24px;padding-bottom:28px;position:relative}
  .day-row::before{content:'';position:absolute;left:20px;top:44px;bottom:0;width:1px;background:var(--bone)}
  .day-row:last-child::before{display:none}
  .day-circle{width:42px;height:42px;min-width:42px;border-radius:50%;background:var(--bone);border:2px solid var(--sand);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:var(--bark);position:relative;z-index:1;cursor:pointer;transition:all .2s}
  .day-circle.done{background:var(--sage);border-color:var(--sage);color:white}
  .day-circle.active{background:var(--terra);border-color:var(--terra);color:white}
  .day-content{padding-top:8px;flex:1}
  .day-lbl{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--terra);font-weight:500}
  .day-task{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:400;color:var(--bark);margin-top:3px;line-height:1.3}
  .day-desc{font-size:14px;line-height:1.7;color:var(--charcoal);opacity:.7;margin-top:7px}
  .day-btn{margin-top:10px;padding:7px 16px;background:transparent;border:1px solid var(--sand);border-radius:100px;font-size:12px;font-weight:500;color:var(--bark);cursor:pointer;letter-spacing:.05em;transition:all .2s}
  .day-btn:hover{border-color:var(--sage);color:var(--sage)}
  .day-btn.done{background:var(--sage);border-color:var(--sage);color:white}
  .paywall{margin-top:28px;border-radius:8px;overflow:hidden;border:1px solid var(--bone)}
  .paywall-preview{padding:28px 32px;background:white}
  .preview-day{display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;opacity:.2;filter:blur(2px);user-select:none;pointer-events:none}
  .preview-circle{width:34px;height:34px;min-width:34px;border-radius:50%;background:var(--bone);border:2px solid var(--sand);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:var(--bark)}
  .preview-task{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--bark);padding-top:6px}
  .paywall-cta{position:relative;margin-top:-140px;background:linear-gradient(to bottom,transparent,#F9F5EF 44%);padding:90px 32px 36px;text-align:center;display:flex;flex-direction:column;align-items:center}
  .pw-lock{width:50px;height:50px;background:var(--bark);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:18px;box-shadow:0 4px 20px rgba(92,61,42,.25)}
  .pw-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:var(--bark);line-height:1.2;margin-bottom:10px}
  .pw-title em{font-style:italic}
  .pw-desc{font-size:14px;line-height:1.8;color:var(--charcoal);opacity:.7;max-width:360px;margin-bottom:24px}
  .pw-includes{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:22px}
  .pw-pill{font-size:12px;padding:5px 13px;background:var(--bone);border-radius:100px;color:var(--bark)}
  .pw-price{font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:300;color:var(--bark);margin-bottom:18px}
  .pw-secure{margin-top:12px;font-size:12px;color:var(--charcoal);opacity:.4}
  .unlocked-tag{margin-top:14px;display:inline-flex;align-items:center;gap:6px;padding:7px 16px;background:rgba(122,140,110,.12);border-radius:100px;font-size:13px;color:var(--sage);font-weight:500}
  .leaks-intro{margin-top:28px}
  .leaks-count{margin-top:8px;font-size:14px;color:var(--terra);font-weight:500}
  .leaks-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:24px}
  .leak-cat{background:white;border:1px solid var(--bone);border-radius:6px;padding:22px}
  .leak-cat-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:400;color:var(--bark);margin-bottom:14px}
  .leak-item{display:flex;align-items:flex-start;gap:9px;margin-bottom:9px;cursor:pointer}
  .leak-check{width:17px;height:17px;min-width:17px;border-radius:3px;border:1.5px solid var(--sand);margin-top:1px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;transition:all .2s}
  .leak-check.checked{background:var(--terra);border-color:var(--terra)}
  .leak-text{font-size:13px;line-height:1.5;color:var(--charcoal);opacity:.8}
  .formula-box{margin-top:28px;padding:44px 44px;background:var(--charcoal);border-radius:6px;color:var(--cream)}
  .formula-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);font-weight:500}
  .formula-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;font-style:italic;color:var(--cream);margin-top:7px;line-height:1.2}
  .formula-eq{margin-top:28px;padding:22px 26px;background:rgba(255,255,255,.04);border-radius:4px;border:1px solid rgba(255,255,255,.08)}
  .formula-wrong{font-family:'Cormorant Garamond',serif;font-size:19px;color:rgba(249,245,239,.3);text-decoration:line-through}
  .formula-right{font-family:'Cormorant Garamond',serif;font-size:24px;color:#C9A84C;margin-top:14px;line-height:1.4}
  .formula-right span{opacity:.5}
  .formula-body{margin-top:24px;font-size:15px;line-height:1.8;color:rgba(249,245,239,.7)}
  .formula-body strong{color:var(--cream);font-weight:500}
  .summary-box{margin-top:36px;padding:32px 36px;background:white;border:1px solid var(--bone);border-radius:6px}
  .summary-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--bark);margin-bottom:14px}
  .summary-row{display:flex;justify-content:space-between;align-items:center;padding-bottom:11px;border-bottom:1px solid var(--bone);margin-bottom:11px}
  .summary-row:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .summary-lbl{font-size:14px;color:var(--charcoal);opacity:.7}
  .summary-val{font-size:14px;font-weight:500;color:var(--bark)}
  .closing{text-align:center;padding:40px 20px 20px}
  .closing-title{font-family:'Cormorant Garamond',serif;font-size:30px;font-style:italic;color:var(--bark);margin-bottom:10px}
  .closing-text{font-size:15px;line-height:1.8;color:var(--charcoal);opacity:.7;max-width:460px;margin:0 auto}
  .orn{text-align:center;margin:44px 0;color:var(--sand);letter-spacing:.3em;font-size:14px}
  @media(max-width:600px){.ns-grid{grid-template-columns:1fr}.leaks-grid{grid-template-columns:1fr}.arch-card,.formula-box{padding:28px 24px}.ns-head{padding:22px 20px}.ns-body{padding:0 20px 28px}}
`;

export default function App() {
  const [screen, setScreen] = useState("cover");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [loadStep, setLoadStep] = useState(0);
  const [tab, setTab] = useState("score");
  const [doneDays, setDoneDays] = useState({});
  const [checkedLeaks, setCheckedLeaks] = useState({});
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  const score = calcScore(answers);
  const zoneKey = getZone(score);
  const zone = ZONES[zoneKey];
  const archKey = Object.keys(answers).length >= 10 ? getArchetype(answers) : "caregiver";
  const arch = ARCHETYPES[archKey];

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [screen, tab]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("paid") === "success") {
      setUnlocked(true); setScreen("results"); setTab("roadmap");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (screen !== "loading") return;
    [0,1,2,3,4].forEach((s,i) => setTimeout(() => setLoadStep(s), i*700));
    setTimeout(() => setScreen("optin"), 3800);
  }, [screen]);

  const next = () => {
    if (selected === null) return;
    setAnswers(p => ({ ...p, [QUESTIONS[qIndex].id]: selected }));
    setSelected(null);
    if (qIndex < QUESTIONS.length - 1) setQIndex(i => i+1);
    else setScreen("loading");
  };

  const back = () => {
    if (qIndex === 0) { setScreen("cover"); return; }
    setQIndex(i => i-1);
    setSelected(answers[QUESTIONS[qIndex-1].id] ?? null);
  };

  const submitEmail = async () => {
    if (!email || !email.includes("@")) { setEmailErr("Please enter a valid email address."); return; }
    setEmailErr(""); setSubmitting(true);
    try {
      await fetch(KIT_ENDPOINT, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email, first_name:firstName, fields:{ score, zone:zone.label, archetype:arch.name } }),
      });
    } catch(e) {}
    setSubmitting(false); setScreen("results");
  };

  const checkout = () => {
    if (STRIPE_LINK.includes("YOUR_LINK_HERE")) { setUnlocked(true); return; }
    const back = encodeURIComponent(window.location.href.split("?")[0] + "?paid=success");
    window.location.href = STRIPE_LINK + "?success_url=" + back;
  };

  const q = QUESTIONS[qIndex];
  const progress = (qIndex / QUESTIONS.length) * 100;
  const leakCount = Object.values(checkedLeaks).filter(Boolean).length;
  const doneCount = Object.values(doneDays).filter(Boolean).length;

  const STEPS = ["Calculating your Self-Abandonment Score...","Identifying your dominant archetype...","Mapping your nervous system zone...","Building your Return Roadmap...","Preparing your Energy Leak Inventory..."];

  const zoneStyles = {
    green:  { bg:"rgba(122,140,110,.1)",  color:"#4a6b3e" },
    yellow: { bg:"rgba(201,168,76,.1)",   color:"#7a5f10" },
    orange: { bg:"rgba(212,118,59,.1)",   color:"#b85a1a" },
    red:    { bg:"rgba(155,79,46,.1)",    color:"#9B4F2E" },
  };
  const zs = zoneStyles[zoneKey];

  return (
    <div className="wrap">
      <style>{css}</style>

      {screen === "cover" && (
        <div className="cover">
          <div className="badge">Digital Download · The Self-Abandonment Audit</div>
          <h1 className="cover-title">Why Am I So Exhausted If I'm <em>Doing Everything Right?</em></h1>
          <p className="cover-sub">A Self-Abandonment Assessment for the woman who's running on empty but can't figure out why.</p>
          <p className="cover-meta">20 Questions · 5 Minutes · Personalized Report</p>
          <div className="divider"></div>
          <p className="cover-desc">Discover your Self-Abandonment Score, dominant archetype, nervous system zone, and a 7-day Return Roadmap, personalized to your patterns.</p>
          <div className="pills">
            {["Score + Archetype","Nervous System Report","7-Day Roadmap","Energy Leak Inventory"].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
          <button className="btn" onClick={() => setScreen("quiz")}>Begin Your Audit</button>
        </div>
      )}

      {screen === "quiz" && (
        <div className="quiz-wrap">
          <div className="progress-bar"><div className="progress-fill" style={{width: progress+"%"}}></div></div>
          <div className="q-section">{q.section}</div>
          <div className="q-num">Question {qIndex+1} of {QUESTIONS.length}</div>
          <div className="q-text">{q.text}</div>
          <div className="options">
            {q.options.map((opt,i) => (
              <button key={i} className={"option" + (selected===i?" sel":"")} onClick={() => setSelected(i)}>
                <div className="opt-dot">{selected===i?"✓":""}</div>
                {opt}
              </button>
            ))}
          </div>
          <div className="quiz-nav">
            <button className="btn-ghost" onClick={back}>Back</button>
            <button className="btn-next" onClick={next} disabled={selected===null}>
              {qIndex < QUESTIONS.length-1 ? "Continue" : "See My Results"}
            </button>
          </div>
        </div>
      )}

      {screen === "loading" && (
        <div className="loading">
          <h2>Analyzing your answers...</h2>
          <div className="load-steps">
            {STEPS.map((s,i) => (
              <div key={i} className={"load-step" + (loadStep===i?" active":"") + (loadStep>i?" done":"")}>
                <div className="load-dot"></div>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "optin" && (
        <div className="optin-screen">
          <div className="optin-card">
            <div className="optin-top">
              <div className="optin-zone-tag">{zone.emoji} {zone.label}</div>
              <div className="optin-score">{score}</div>
              <div className="optin-score-lbl">Self-Abandonment Score</div>
              <div className="optin-headline">Your report is <em>ready.</em></div>
              <p className="optin-subhead">Enter your email to unlock your free results: your archetype, nervous system report, and energy leak inventory.</p>
            </div>
            <div className="optin-body">
              <p className="optin-promise">You'll also receive <strong>The Return Letters</strong>, a free email series with one insight per week on reclaiming your energy, your voice, and yourself. No spam. Unsubscribe anytime.</p>
              <div className="optin-fields">
                <input className="optin-input" type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} onKeyDown={e => e.key==="Enter" && submitEmail()} />
                <input className="optin-input" type="email" placeholder="Email address" value={email} onChange={e => { setEmail(e.target.value); setEmailErr(""); }} onKeyDown={e => e.key==="Enter" && submitEmail()} />
                {emailErr && <div className="err">{emailErr}</div>}
                <button className="btn btn-rust btn-full" onClick={submitEmail} disabled={submitting} style={{opacity:1,animation:"none",marginTop:4}}>
                  {submitting ? "Sending..." : "Unlock My Free Report"}
                </button>
                <button className="optin-skip" onClick={() => setScreen("results")}>Skip - view without saving my results</button>
              </div>
              <div className="optin-gets">
                {["Your Self-Abandonment Score + Zone breakdown","Your dominant archetype and what drives it","Your Nervous System Report with hormone and energy insights","The Energy Leak Inventory across 6 life areas","Weekly insights from The Return Letters (free)"].map(t => (
                  <div key={t} className="optin-get"><span className="optin-get-icon">+</span><span>{t}</span></div>
                ))}
              </div>
              <p className="optin-privacy">Your information is safe. No selling, no spam, ever.</p>
            </div>
          </div>
        </div>
      )}

      {screen === "results" && (
        <div className="results">
          <div className="eyebrow">Your Results</div>
          <h1 className="page-title">The Self-Abandonment<br /><em>Audit Report</em></h1>
          <div className="tabs">
            {[["score","Your Score"],["archetype","Your Archetype"],["nervous","Nervous System"],["roadmap","7-Day Roadmap"],["leaks","Energy Leaks"],["formula","The Formula"]].map(([k,l]) => (
              <button key={k} className={"tab"+(tab===k?" active":"")} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>

          <div className={"panel"+(tab==="score"?" active":"")}>
            <div className="score-card" style={{"--zone-color": zone.color}}>
              <div className="score-num">{score}</div>
              <div className="score-lbl">Self-Abandonment Score</div>
              <div className="zone-badge" style={{background:zs.bg, color:zs.color}}>{zone.emoji} {zone.label} - {zone.subtitle}</div>
              <p className="score-desc">{zone.desc}</p>
            </div>
            <div className="bars">
              <div className="bars-title">Your Dominant Energy Leaks</div>
              {[["Boundaries", score>50?"High":score>25?"Moderate":"Low"],["Self-Worth",score>60?"High":score>30?"Moderate":"Low"],["Nervous System",score>55?"High":score>25?"Moderate":"Low"],["Identity",score>65?"High":score>35?"Moderate":"Low"]].map(([area, level]) => (
                <div key={area} className="bar-row">
                  <div className="bar-label">{area}</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:level==="High"?"80%":level==="Moderate"?"50%":"20%", background:level==="High"?"var(--rust)":level==="Moderate"?"var(--terra)":"var(--sage)"}}></div></div>
                  <div className="bar-val" style={{color:level==="High"?"var(--rust)":level==="Moderate"?"var(--terra)":"var(--sage)"}}>{level}</div>
                </div>
              ))}
            </div>
            <button className="btn" style={{opacity:1,animation:"none"}} onClick={() => setTab("archetype")}>Discover Your Archetype</button>
          </div>

          <div className={"panel"+(tab==="archetype"?" active":"")}>
            <div className="arch-card">
              <div className="arch-eyebrow">Your Archetype</div>
              <div className="arch-name">{arch.name}</div>
              <div className="arch-tagline">{arch.tagline}</div>
              <p className="arch-desc">{arch.desc}</p>
              <div className="arch-traits">{arch.traits.map(t => <span key={t} className="trait">{t}</span>)}</div>
            </div>
            <div className="sci-panel"><div className="sci-label">Neurological Signature</div><p className="sci-text">{arch.neuro}</p></div>
            <div className="sci-panel"><div className="sci-label">What's Happening in Your Brain</div><p className="sci-text">{arch.brain}</p></div>
            <div className="others-box">
              <div className="others-title">Other Archetypes</div>
              <p style={{fontSize:14,color:"var(--charcoal)",opacity:.7,lineHeight:1.7}}>Most women carry more than one. Your dominant pattern shapes your deepest depletion, and you may recognize yourself in the others too. That is not complexity. That is just human.</p>
              <div className="others-list">
                {Object.entries(ARCHETYPES).filter(([k]) => k !== archKey).map(([k,a]) => (
                  <div key={k} className="other-item">{a.name}<em>{a.tagline}</em></div>
                ))}
              </div>
            </div>
            <button className="btn" style={{opacity:1,animation:"none"}} onClick={() => setTab("nervous")}>See Your Nervous System Report</button>
          </div>

          <div className={"panel"+(tab==="nervous"?" active":"")}>
            <div style={{marginTop:24}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"var(--bark)",marginBottom:8}}>Your Nervous System Report</div>
              <p style={{fontSize:15,lineHeight:1.8,color:"var(--charcoal)",opacity:.7}}>Self-abandonment is not a mindset issue. It is a measurable biological event. Chronic psychological stress produces documented changes in the HPA axis, immune system, mitochondrial function, and brain structure. What you're experiencing has a physiological substrate. Understanding it is the first step to reversing it.</p>
            </div>
            <div className="ns-card">
              <div className="ns-head">
                <div className="ns-circle" style={{background:zone.color}}>{zone.emoji}</div>
                <div className="ns-head-text"><h3>{zone.label}</h3><p>{zone.subtitle}</p></div>
              </div>
              <div className="ns-body">
                <div className="symptoms-box">
                  <div className="symptoms-lbl">Common Symptoms</div>
                  <div className="symptoms-tags">{zone.symptoms.map(s => <span key={s} className="symptom">{s}</span>)}</div>
                </div>
                <div className="ns-grid">
                  {[["Hormones",zone.hormones],["Inflammation",zone.inflammation],["Energy",zone.energy],["Relationships",zone.relationships]].map(([lbl,txt]) => (
                    <div key={lbl} className="ns-item"><div className="ns-item-lbl">{lbl}</div><div className="ns-item-text">{txt}</div></div>
                  ))}
                </div>
                <div className="ns-item" style={{marginTop:14}}><div className="ns-item-lbl">Longevity</div><div className="ns-item-text">{zone.longevity}</div></div>
              </div>
            </div>
            <button className="btn" style={{opacity:1,animation:"none",background:unlocked?"var(--bark)":"var(--rust)"}} onClick={() => setTab("roadmap")}>
              {unlocked ? "Go to Your 7-Day Reset" : "Unlock Your 7-Day Reset - "+PRICE}
            </button>
          </div>

          <div className={"panel"+(tab==="roadmap"?" active":"")}>
            <div className="roadmap-intro">
              <div className="eyebrow">The Return Roadmap</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,4vw,42px)",fontWeight:300,color:"var(--bark)",lineHeight:1.2}}>Your 7-Day Reset</div>
              <p style={{marginTop:14,fontSize:15,lineHeight:1.8,color:"var(--charcoal)",opacity:.7}}>A slow, intentional return to yourself. One day, one practice, one honest question at a time.</p>
            </div>
            {unlocked ? (
              <div>
                <div className="unlocked-tag">Full access unlocked</div>
                <div className="roadmap-days">
                  {ROADMAP.map((d,i) => {
                    const done = doneDays[d.day];
                    const active = !done && doneCount === i;
                    return (
                      <div key={d.day} className="day-row">
                        <div className={"day-circle"+(done?" done":active?" active":"")} onClick={() => setDoneDays(p => ({...p,[d.day]:!p[d.day]}))}>
                          {done?"✓":d.day}
                        </div>
                        <div className="day-content">
                          <div className="day-lbl">Day {d.day}</div>
                          <div className="day-task">{d.task}</div>
                          <div className="day-desc">{d.desc}</div>
                          <button className={"day-btn"+(done?" done":"")} onClick={() => setDoneDays(p => ({...p,[d.day]:!p[d.day]}))}>
                            {done ? "Completed" : "Mark complete"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="paywall">
                <div className="paywall-preview">
                  {ROADMAP.slice(0,4).map(d => (
                    <div key={d.day} className="preview-day">
                      <div className="preview-circle">{d.day}</div>
                      <div className="preview-task">{d.task}</div>
                    </div>
                  ))}
                </div>
                <div className="paywall-cta">
                  <div className="pw-lock">🔒</div>
                  <div className="pw-title">Unlock Your<br /><em>7-Day Return Roadmap</em></div>
                  <p className="pw-desc">Your audit is complete. Now comes the work that actually changes things. A guided, day-by-day practice built around your specific patterns and zone.</p>
                  <div className="pw-includes">
                    {["7 daily practices","Guided prompts","Personalized to your zone","Lifetime access"].map(p => (
                      <span key={p} className="pw-pill">{p}</span>
                    ))}
                  </div>
                  <div className="pw-price">{PRICE}</div>
                  <button className="btn btn-rust" style={{opacity:1,animation:"none"}} onClick={checkout}>Unlock Now - {PRICE}</button>
                  <p className="pw-secure">Secure checkout via Stripe</p>
                </div>
              </div>
            )}
          </div>

          <div className={"panel"+(tab==="leaks"?" active":"")}>
            <div className="leaks-intro">
              <div className="eyebrow">Bonus: The Energy Leak Inventory</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:34,fontWeight:300,color:"var(--bark)",lineHeight:1.2}}>Where Is Your Energy Going?</div>
              <p style={{marginTop:14,fontSize:15,lineHeight:1.8,color:"var(--charcoal)",opacity:.7}}>Check everything that applies. Be honest. No one is watching. This inventory isn't about shame. It's about seeing clearly.</p>
              <p className="leaks-count">{leakCount} leaks identified</p>
            </div>
            <div className="leaks-grid">
              {Object.entries(LEAKS).map(([cat, items]) => (
                <div key={cat} className="leak-cat">
                  <div className="leak-cat-title">{cat}</div>
                  {items.map(item => {
                    const k = cat+":"+item;
                    return (
                      <div key={k} className="leak-item" onClick={() => setCheckedLeaks(p => ({...p,[k]:!p[k]}))}>
                        <div className={"leak-check"+(checkedLeaks[k]?" checked":"")}>{checkedLeaks[k]?"✓":""}</div>
                        <div className="leak-text">{item}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className={"panel"+(tab==="formula"?" active":"")}>
            <div className="formula-box">
              <div className="formula-eyebrow">The Truth</div>
              <div className="formula-title">Your Self-Abandonment Formula</div>
              <div className="formula-eq">
                <div className="formula-wrong">Health = Food + Exercise</div>
                <div className="formula-right">Health <span>=</span> Alignment <span>+</span> Safety <span>+</span> Boundaries <span>+</span> Self-Trust <span>+</span> Nourishment</div>
              </div>
              <p className="formula-body"><strong>The more you abandon yourself, the more your body compensates.</strong> It produces more cortisol to keep you going. It suppresses systems it deems non-essential: digestion, reproduction, repair. It stores rather than releases. It tightens rather than opens. It alarms rather than rests.</p>
              <p className="formula-body" style={{marginTop:16}}><strong>The more you return to yourself, the more your body can redirect energy toward healing, recovery, and longevity.</strong> Not as a reward for being good, but because safety is the physiological signal that allows the body to do what it was designed to do.</p>
              <p className="formula-body" style={{marginTop:16}}>You are not broken. You are adaptive. And the most radical thing you can do for your health is to stop abandoning yourself. One moment, one boundary, one honest answer at a time.</p>
            </div>
            <div className="summary-box">
              <div className="summary-title">Your Summary</div>
              {[["Self-Abandonment Score",score+"/100"],["Zone",zone.label+" - "+zone.subtitle],["Dominant Archetype",arch.name],["Days Completed",doneCount+" of 7"],["Leaks Identified",""+leakCount]].map(([l,v]) => (
                <div key={l} className="summary-row"><span className="summary-lbl">{l}</span><span className="summary-val">{v}</span></div>
              ))}
            </div>
            <div className="orn">- - -</div>
            <div className="closing">
              <div className="closing-title">You found this for a reason.</div>
              <p className="closing-text">Your exhaustion is not a character flaw. It is a signal. And you are already doing the most important thing: paying attention to it.</p>
              <button className="btn" style={{opacity:1,animation:"none"}} onClick={() => { setScreen("cover"); setQIndex(0); setAnswers({}); setSelected(null); setDoneDays({}); setCheckedLeaks({}); setTab("score"); }}>Retake the Audit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
