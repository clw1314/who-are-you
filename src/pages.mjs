// The topic pages: the same tool with one check in front, each with its own title, description, H1, body text and
// questions in every language, at /<lang>/<page>/. The build gives each page its URLs, sitemap entries, hreflang and
// link preview; the page script fills the focus panel from the same sniffers as the main page.
//   rows   the sniffer rows the focus panel shows
//   check  the disguise check whose verdict heads it
//   go     what to link to when the host announces it: "dns" DNS Test, "egress" EgressLens
export const PAGES = {
  fingerprint: { rows: ["fpid", "canvas", "webgl", "audio", "fontfp", "rand"], check: "fp" },
  "dns-leak": { rows: ["dns", "ip", "ex_cn", "ex_intl", "stack"], check: "dns", go: "dns" },
  "webrtc-leak": { rows: ["webrtc", "lan", "ip", "stack"], check: "webrtc", go: "egress" },
};

// per page, per language: seo_title, seo_desc, seo_kw, h1, og_sub, intro (the body text above the result),
// focus_h (the result's heading) and docs (the page's own questions)
export const TEXT = {
  fingerprint: {
    en: {
      seo_title: "Browser Fingerprint Test: can sites track you without cookies? · Who Are You",
      seo_desc: "Free browser fingerprint test: your canvas, WebGL, audio and font fingerprints and the combined ID any site can compute without cookies, whether your browser randomizes it, and whether it recognized you since your last visit. Nothing is stored.",
      seo_kw: "browser fingerprint test, browser fingerprinting, canvas fingerprint, WebGL fingerprint, audio fingerprint, fingerprint checker, anti-fingerprinting, am I trackable",
      h1: "Browser fingerprint test", og_sub: "The ID any site computes for you, without cookies",
      intro: "Sites don't need cookies to recognize you. How your system draws text and shapes, processes sound and which fonts it has add up to an ID that stays the same across sites, private windows and VPNs. Here is yours, what it is made of, and whether your browser scrambles it.",
      focus_h: "Your fingerprint",
      docs: [
        ["What is a browser fingerprint?", "A set of small differences between computers: how the graphics card and driver draw a canvas or a WebGL scene, how the audio stack rounds a sound, which fonts are installed, plus screen, language and time zone. Each alone is common; together they are often unique. A site hashes them into an ID, and every site that runs the same script gets the same ID for you."],
        ["Does a VPN or a private window change it?", "No. None of it depends on your IP address, and private windows draw and play sound the same way. That is why a fingerprint can follow you after you clear cookies or switch VPN servers. The ID card on this page remembers your last visit (in your browser only) to show it."],
        ["How do I stop being fingerprinted?", "Use a browser that fights it: Brave adds random noise to canvas, WebGL and audio by default; Firefox has privacy.resistFingerprinting; Tor Browser makes every user look the same. Extensions that change the user agent or block canvas often make you more unique, not less. The \"Fingerprint protection\" row tells whether your browser randomizes."],
        ["Can this test tell how unique I am?", "Not without collecting everyone's fingerprints, which this page refuses to do: it stores nothing. It shows what a site can compute and whether it stays stable. Come back later: if the ID card says the fingerprint is the same, any site could have recognized you the same way."],
      ],
    },
    "zh-CN": {
      seo_title: "浏览器指纹检测：不用 Cookie，网站能认出你吗 · 你是谁",
      seo_desc: "免费浏览器指纹检测：查看你的 Canvas、WebGL、音频和字体指纹，以及任何网站不用 Cookie 就能算出的综合指纹 ID；看浏览器有没有开防指纹，上次来访后有没有被认出来。不保存任何数据。",
      seo_kw: "浏览器指纹检测, 浏览器指纹, Canvas 指纹, WebGL 指纹, 音频指纹, 指纹浏览器检测, 防指纹, 指纹追踪",
      h1: "浏览器指纹检测", og_sub: "不用 Cookie，网站也能算出你的 ID",
      intro: "网站不需要 Cookie 也能认出你。你的系统怎么画文字和图形、怎么处理声音、装了哪些字体，合在一起就是一个 ID：换网站、开无痕、开 VPN 都不变。下面是你的指纹、它由什么组成，以及你的浏览器有没有把它打乱。",
      focus_h: "你的指纹",
      docs: [
        ["浏览器指纹是什么？", "电脑之间的一组细微差别：显卡和驱动画 Canvas、WebGL 的结果，声卡处理声音时的舍入，装了哪些字体，再加上屏幕、语言和时区。单看每一项都很常见，合在一起往往独一无二。网站把它们算成一个哈希，跑同一段脚本的每个网站，都会得到你同一个 ID。"],
        ["开 VPN 或无痕模式会改变指纹吗？", "不会。这些都和 IP 无关，无痕窗口画图、放声音的方式也一样。所以清了 Cookie、换了 VPN 节点，指纹照样能跟着你。页面上的指纹卡会记住你上次来访（只记在你的浏览器里），下次来就能看到效果。"],
        ["怎样防止被指纹追踪？", "用会对抗指纹的浏览器：Brave 默认给 Canvas、WebGL 和音频加随机干扰；Firefox 可以开 privacy.resistFingerprinting；Tor 浏览器让所有人看起来一模一样。改 UA、屏蔽 Canvas 的扩展反而常常让你更独特。「防指纹」那一行会告诉你你的浏览器有没有随机化。"],
        ["这个检测能说出我有多独特吗？", "要回答这个，就得收集所有人的指纹，而这个页面拒绝这么做：它什么都不存。它展示的是网站能算出什么、是否稳定。过段时间再来：如果指纹卡说指纹没变，那任何网站都能用同样的办法认出你。"],
      ],
    },
    "zh-TW": {
      seo_title: "瀏覽器指紋檢測：不用 Cookie，網站認得出你嗎 · 你是誰",
      seo_desc: "免費瀏覽器指紋檢測：查看你的 Canvas、WebGL、音訊和字型指紋，以及任何網站不用 Cookie 就能算出的綜合指紋 ID；看瀏覽器有沒有開防指紋，上次造訪後有沒有被認出來。不儲存任何資料。",
      seo_kw: "瀏覽器指紋檢測, 瀏覽器指紋, Canvas 指紋, WebGL 指紋, 音訊指紋, 指紋瀏覽器, 防指紋, 指紋追蹤",
      h1: "瀏覽器指紋檢測", og_sub: "不用 Cookie，網站也能算出你的 ID",
      intro: "網站不需要 Cookie 也認得出你。你的系統怎麼畫文字和圖形、怎麼處理聲音、裝了哪些字型，合在一起就是一個 ID：換網站、開無痕、開 VPN 都不變。下面是你的指紋、它由什麼組成，以及你的瀏覽器有沒有把它打亂。",
      focus_h: "你的指紋",
      docs: [
        ["瀏覽器指紋是什麼？", "電腦之間的一組細微差異：顯示卡和驅動畫 Canvas、WebGL 的結果，音效處理時的捨入，裝了哪些字型，再加上螢幕、語言和時區。單看每一項都很常見，合在一起往往獨一無二。網站把它們算成一個雜湊，跑同一段腳本的每個網站，都會得到你同一個 ID。"],
        ["開 VPN 或無痕模式會改變指紋嗎？", "不會。這些都和 IP 無關，無痕視窗畫圖、播聲音的方式也一樣。所以清了 Cookie、換了 VPN 節點，指紋照樣跟著你。頁面上的指紋卡會記住你上次造訪（只記在你的瀏覽器裡），下次來就看得到效果。"],
        ["怎樣防止被指紋追蹤？", "用會對抗指紋的瀏覽器：Brave 預設給 Canvas、WebGL 和音訊加隨機干擾；Firefox 可以開 privacy.resistFingerprinting；Tor 瀏覽器讓所有人看起來一模一樣。改 UA、封鎖 Canvas 的擴充功能反而常讓你更獨特。「防指紋」那一列會告訴你瀏覽器有沒有隨機化。"],
        ["這個檢測能說出我有多獨特嗎？", "要回答這個，就得收集所有人的指紋，而這個頁面拒絕這麼做：它什麼都不存。它呈現的是網站能算出什麼、是否穩定。過一陣子再來：如果指紋卡說指紋沒變，任何網站都能用同樣的辦法認出你。"],
      ],
    },
    ja: {
      seo_title: "ブラウザフィンガープリント検査：Cookie なしで追跡される？ · あなたは誰",
      seo_desc: "無料のブラウザフィンガープリント検査：Canvas・WebGL・オーディオ・フォントのフィンガープリントと、どのサイトでも Cookie なしで計算できる総合 ID、ブラウザがランダム化しているか、前回の訪問から見分けられたかを表示。データは保存しません。",
      seo_kw: "ブラウザフィンガープリント, フィンガープリント 確認, Canvas フィンガープリント, WebGL フィンガープリント, オーディオ フィンガープリント, 追跡 防止, アンチフィンガープリント",
      h1: "ブラウザフィンガープリント検査", og_sub: "Cookie なしでサイトが計算するあなたの ID",
      intro: "サイトは Cookie がなくてもあなたを見分けられます。文字や図形の描き方、音の処理、入っているフォントを合わせると 1 つの ID になり、サイトを変えても、プライベートウィンドウでも、VPN でも変わりません。あなたの ID と、その中身、ブラウザがそれをかき混ぜているかをここに示します。",
      focus_h: "あなたのフィンガープリント",
      docs: [
        ["ブラウザフィンガープリントとは？", "コンピューターごとの小さな違いの集まりです：GPU とドライバーによる Canvas や WebGL の描画結果、音声処理の丸め方、インストール済みフォント、それに画面・言語・タイムゾーン。1 つずつはありふれていても、合わせると唯一になりがちです。サイトはこれをハッシュにして ID にし、同じスクリプトを動かすサイトはどこでも同じ ID を得ます。"],
        ["VPN やプライベートウィンドウで変わる？", "変わりません。どれも IP に関係なく、プライベートウィンドウでも描画や音の処理は同じです。だから Cookie を消しても VPN を変えても追いかけられます。このページの ID カードは前回の訪問を（ブラウザ内だけに）覚えていて、それを確かめられます。"],
        ["フィンガープリント追跡を防ぐには？", "対策のあるブラウザを使います：Brave は標準で Canvas・WebGL・オーディオにノイズを加え、Firefox には privacy.resistFingerprinting があり、Tor Browser は全員を同じに見せます。UA を変えたり Canvas をブロックする拡張機能は、かえって目立つことが多いです。「フィンガープリント対策」の行で、ランダム化されているか分かります。"],
        ["どれくらい珍しいか分かる？", "それには全員のフィンガープリントを集める必要があり、このページはそれをしません：何も保存しないからです。示すのは、サイトが何を計算でき、それが安定しているかです。また来てみてください。ID カードが「同じ」と言えば、どのサイトも同じ方法であなたを見分けられたということです。"],
      ],
    },
    ko: {
      seo_title: "브라우저 지문 검사: 쿠키 없이도 추적될까 · 당신은 누구",
      seo_desc: "무료 브라우저 지문 검사: Canvas, WebGL, 오디오, 글꼴 지문과 어떤 사이트든 쿠키 없이 계산하는 종합 지문 ID, 브라우저가 무작위화하는지, 지난 방문 이후 알아봤는지를 보여 줍니다. 아무것도 저장하지 않습니다.",
      seo_kw: "브라우저 지문 검사, 브라우저 핑거프린트, 캔버스 지문, WebGL 지문, 오디오 지문, 핑거프린팅 방지, 추적 방지",
      h1: "브라우저 지문 검사", og_sub: "쿠키 없이 사이트가 계산하는 당신의 ID",
      intro: "사이트는 쿠키 없이도 당신을 알아봅니다. 시스템이 글자와 도형을 그리는 방식, 소리를 처리하는 방식, 설치된 글꼴을 합치면 하나의 ID가 되고, 사이트를 바꿔도, 시크릿 창에서도, VPN을 써도 그대로입니다. 당신의 ID와 그 구성, 그리고 브라우저가 그것을 뒤섞는지 보여 줍니다.",
      focus_h: "당신의 지문",
      docs: [
        ["브라우저 지문이란?", "컴퓨터마다 다른 작은 차이들의 묶음입니다. 그래픽 카드와 드라이버가 Canvas, WebGL을 그린 결과, 오디오 처리의 반올림, 설치된 글꼴, 여기에 화면, 언어, 시간대. 하나씩은 흔해도 합치면 대개 유일합니다. 사이트는 이것을 해시로 만들어 ID로 쓰고, 같은 스크립트를 돌리는 모든 사이트가 당신에게서 같은 ID를 얻습니다."],
        ["VPN이나 시크릿 창을 쓰면 바뀌나요?", "아니요. 모두 IP와 무관하고, 시크릿 창도 그리는 방식과 소리 처리는 같습니다. 그래서 쿠키를 지우거나 VPN 서버를 바꿔도 지문이 따라옵니다. 이 페이지의 ID 카드는 지난 방문을 브라우저 안에만 기억해서 그걸 보여 줍니다."],
        ["지문 추적을 막으려면?", "지문에 대응하는 브라우저를 쓰세요. Brave는 기본으로 Canvas, WebGL, 오디오에 무작위 잡음을 넣고, Firefox는 privacy.resistFingerprinting이 있으며, Tor 브라우저는 모두를 똑같이 보이게 합니다. UA를 바꾸거나 Canvas를 막는 확장은 오히려 더 눈에 띄게 만들기 쉽습니다. ‘지문 보호’ 줄에서 무작위화 여부를 볼 수 있습니다."],
        ["내가 얼마나 독특한지 알 수 있나요?", "그러려면 모두의 지문을 모아야 하는데, 이 페이지는 그러지 않습니다. 아무것도 저장하지 않으니까요. 보여 주는 건 사이트가 무엇을 계산할 수 있고 그것이 유지되는지입니다. 나중에 다시 와 보세요. ID 카드가 지문이 같다고 하면, 어떤 사이트든 같은 방법으로 당신을 알아볼 수 있었다는 뜻입니다."],
      ],
    },
    es: {
      seo_title: "Test de huella del navegador: ¿te rastrean sin cookies? · ¿Quién eres?",
      seo_desc: "Test gratuito de huella digital del navegador: tus huellas canvas, WebGL, audio y de fuentes y el ID combinado que cualquier sitio calcula sin cookies, si tu navegador la aleatoriza y si te reconoció desde tu última visita. No se guarda nada.",
      seo_kw: "test huella digital navegador, browser fingerprint, huella canvas, huella WebGL, huella de audio, fingerprinting, anti fingerprinting, rastreo sin cookies",
      h1: "Test de huella del navegador", og_sub: "El ID que cualquier sitio calcula para ti, sin cookies",
      intro: "Los sitios no necesitan cookies para reconocerte. Cómo dibuja tu sistema texto y formas, cómo procesa el sonido y qué fuentes tiene suman un ID que no cambia entre sitios, ventanas privadas ni VPN. Aquí está el tuyo, de qué está hecho y si tu navegador lo mezcla.",
      focus_h: "Tu huella",
      docs: [
        ["¿Qué es la huella del navegador?", "Un conjunto de pequeñas diferencias entre equipos: cómo la gráfica y el controlador dibujan un canvas o una escena WebGL, cómo redondea el audio, qué fuentes hay instaladas, más pantalla, idioma y zona horaria. Cada una es común; juntas suelen ser únicas. Un sitio las convierte en un ID, y cada sitio que ejecuta el mismo script obtiene el mismo ID tuyo."],
        ["¿La cambia una VPN o una ventana privada?", "No. Nada de eso depende de tu IP, y una ventana privada dibuja y suena igual. Por eso la huella te sigue aunque borres cookies o cambies de servidor VPN. La tarjeta de ID de esta página recuerda tu última visita (solo en tu navegador) para demostrarlo."],
        ["¿Cómo evito el fingerprinting?", "Usa un navegador que lo combata: Brave añade ruido aleatorio a canvas, WebGL y audio por defecto; Firefox tiene privacy.resistFingerprinting; Tor Browser hace que todos parezcan iguales. Las extensiones que cambian el user agent o bloquean canvas suelen hacerte más único, no menos. La fila «Protección de huella» dice si tu navegador la aleatoriza."],
        ["¿Puede decir lo único que soy?", "No sin reunir las huellas de todos, y esta página se niega: no guarda nada. Muestra lo que un sitio puede calcular y si se mantiene estable. Vuelve más tarde: si la tarjeta dice que la huella es la misma, cualquier sitio te habría reconocido igual."],
      ],
    },
    fr: {
      seo_title: "Test d’empreinte du navigateur : pisté sans cookies ? · Qui êtes-vous ?",
      seo_desc: "Test gratuit d’empreinte du navigateur : vos empreintes canvas, WebGL, audio et polices et l’ID combiné que tout site calcule sans cookies, si votre navigateur la rend aléatoire et s’il vous a reconnu depuis votre dernière visite. Rien n’est conservé.",
      seo_kw: "test empreinte navigateur, empreinte digitale navigateur, browser fingerprint, empreinte canvas, empreinte WebGL, empreinte audio, anti fingerprinting, pistage sans cookies",
      h1: "Test d’empreinte du navigateur", og_sub: "L’ID que tout site calcule pour vous, sans cookies",
      intro: "Les sites n’ont pas besoin de cookies pour vous reconnaître. La façon dont votre système dessine texte et formes, traite le son et les polices qu’il possède forment un ID qui reste le même d’un site à l’autre, en navigation privée et derrière un VPN. Voici le vôtre, ce qui le compose, et si votre navigateur le brouille.",
      focus_h: "Votre empreinte",
      docs: [
        ["Qu’est-ce que l’empreinte du navigateur ?", "Un ensemble de petites différences entre machines : la façon dont la carte graphique et son pilote dessinent un canvas ou une scène WebGL, l’arrondi du son, les polices installées, plus l’écran, la langue et le fuseau. Chacune est banale ; ensemble, elles sont souvent uniques. Un site en fait un ID, et chaque site qui exécute le même script obtient le même ID pour vous."],
        ["Un VPN ou la navigation privée la changent-ils ?", "Non. Rien de tout cela ne dépend de votre IP, et une fenêtre privée dessine et joue le son de la même façon. C’est pourquoi l’empreinte vous suit après l’effacement des cookies ou un changement de serveur VPN. La carte d’ID de cette page garde votre dernière visite (dans votre navigateur seulement) pour le montrer."],
        ["Comment éviter le pistage par empreinte ?", "Prenez un navigateur qui le combat : Brave ajoute du bruit aléatoire au canvas, au WebGL et à l’audio par défaut ; Firefox a privacy.resistFingerprinting ; Tor Browser fait que tout le monde se ressemble. Les extensions qui changent le user agent ou bloquent le canvas vous rendent souvent plus unique. La ligne « Protection d’empreinte » indique si votre navigateur la rend aléatoire."],
        ["Le test peut-il dire à quel point je suis unique ?", "Pas sans collecter les empreintes de tout le monde, ce que cette page refuse : elle ne conserve rien. Elle montre ce qu’un site peut calculer et si c’est stable. Revenez plus tard : si la carte dit que l’empreinte est la même, n’importe quel site aurait pu vous reconnaître ainsi."],
      ],
    },
    de: {
      seo_title: "Browser-Fingerprint-Test: Tracking ohne Cookies? · Wer sind Sie?",
      seo_desc: "Kostenloser Browser-Fingerprint-Test: Ihre Canvas-, WebGL-, Audio- und Schriften-Fingerabdrücke und die Gesamt-ID, die jede Website ohne Cookies berechnen kann, ob Ihr Browser sie verwürfelt und ob er Sie seit dem letzten Besuch wiedererkannt hat. Nichts wird gespeichert.",
      seo_kw: "Browser Fingerprint Test, Browser-Fingerabdruck, Canvas Fingerprint, WebGL Fingerprint, Audio Fingerprint, Fingerprinting verhindern, Tracking ohne Cookies",
      h1: "Browser-Fingerprint-Test", og_sub: "Die ID, die jede Website ohne Cookies für Sie berechnet",
      intro: "Websites brauchen keine Cookies, um Sie wiederzuerkennen. Wie Ihr System Text und Formen zeichnet, Ton verarbeitet und welche Schriften es hat, ergibt eine ID, die über Websites, private Fenster und VPNs hinweg gleich bleibt. Hier ist Ihre, woraus sie besteht und ob Ihr Browser sie verwürfelt.",
      focus_h: "Ihr Fingerabdruck",
      docs: [
        ["Was ist ein Browser-Fingerabdruck?", "Eine Menge kleiner Unterschiede zwischen Rechnern: wie Grafikkarte und Treiber ein Canvas oder eine WebGL-Szene zeichnen, wie die Audioverarbeitung rundet, welche Schriften installiert sind, dazu Bildschirm, Sprache und Zeitzone. Einzeln alltäglich, zusammen oft einmalig. Eine Website macht daraus eine ID, und jede Website mit demselben Skript bekommt dieselbe ID von Ihnen."],
        ["Ändert ein VPN oder ein privates Fenster ihn?", "Nein. Nichts davon hängt von Ihrer IP ab, und ein privates Fenster zeichnet und spielt Ton genauso. Deshalb folgt Ihnen der Fingerabdruck auch nach dem Löschen von Cookies oder einem VPN-Wechsel. Die ID-Karte dieser Seite merkt sich Ihren letzten Besuch (nur in Ihrem Browser) und zeigt das."],
        ["Wie verhindere ich Fingerprinting?", "Mit einem Browser, der dagegen arbeitet: Brave verrauscht Canvas, WebGL und Audio standardmäßig; Firefox hat privacy.resistFingerprinting; der Tor Browser lässt alle gleich aussehen. Erweiterungen, die den User-Agent ändern oder Canvas blockieren, machen Sie oft auffälliger. Die Zeile „Fingerabdruck-Schutz“ zeigt, ob Ihr Browser verwürfelt."],
        ["Kann der Test sagen, wie einmalig ich bin?", "Nicht ohne die Fingerabdrücke aller zu sammeln, und das tut diese Seite nicht: Sie speichert nichts. Sie zeigt, was eine Website berechnen kann und ob es stabil bleibt. Kommen Sie später wieder: Sagt die Karte, der Fingerabdruck sei gleich, hätte jede Website Sie genauso erkannt."],
      ],
    },
    pt: {
      seo_title: "Teste de impressão digital do navegador: rastreado sem cookies? · Quem é você?",
      seo_desc: "Teste gratuito de impressão digital do navegador: suas impressões canvas, WebGL, de áudio e de fontes e o ID combinado que qualquer site calcula sem cookies, se o navegador embaralha e se ele reconheceu você desde a última visita. Nada é guardado.",
      seo_kw: "teste impressão digital navegador, browser fingerprint, fingerprint canvas, fingerprint WebGL, fingerprint de áudio, anti fingerprinting, rastreamento sem cookies",
      h1: "Teste de impressão digital do navegador", og_sub: "O ID que qualquer site calcula para você, sem cookies",
      intro: "Sites não precisam de cookies para reconhecer você. O jeito como seu sistema desenha texto e formas, processa som e quais fontes tem somam um ID que não muda entre sites, janelas anônimas e VPNs. Aqui está o seu, do que ele é feito e se o seu navegador o embaralha.",
      focus_h: "Sua impressão digital",
      docs: [
        ["O que é a impressão digital do navegador?", "Um conjunto de pequenas diferenças entre computadores: como a placa de vídeo e o driver desenham um canvas ou uma cena WebGL, como o áudio arredonda, quais fontes estão instaladas, mais tela, idioma e fuso. Cada uma é comum; juntas costumam ser únicas. Um site transforma isso num ID, e todo site que roda o mesmo script obtém o mesmo ID seu."],
        ["VPN ou janela anônima mudam a impressão?", "Não. Nada disso depende do seu IP, e uma janela anônima desenha e toca som do mesmo jeito. Por isso a impressão segue você mesmo depois de apagar cookies ou trocar de servidor VPN. O cartão de ID desta página lembra sua última visita (só no seu navegador) para mostrar isso."],
        ["Como evitar o fingerprinting?", "Use um navegador que o combata: o Brave adiciona ruído aleatório a canvas, WebGL e áudio por padrão; o Firefox tem privacy.resistFingerprinting; o Tor Browser faz todos parecerem iguais. Extensões que trocam o user agent ou bloqueiam canvas costumam deixar você mais único. A linha \"Proteção de impressão\" mostra se o seu navegador embaralha."],
        ["O teste diz quão único eu sou?", "Não sem coletar a impressão de todo mundo, e esta página se recusa: não guarda nada. Ela mostra o que um site consegue calcular e se isso se mantém. Volte depois: se o cartão disser que a impressão é a mesma, qualquer site teria reconhecido você do mesmo jeito."],
      ],
    },
    ru: {
      seo_title: "Проверка отпечатка браузера: следят ли без cookie? · Кто вы?",
      seo_desc: "Бесплатная проверка отпечатка браузера: отпечатки canvas, WebGL, аудио и шрифтов и общий ID, который любой сайт вычисляет без cookie, перемешивает ли его браузер и узнал ли он вас с прошлого визита. Ничего не сохраняется.",
      seo_kw: "проверка отпечатка браузера, отпечаток браузера, browser fingerprint, canvas fingerprint, WebGL отпечаток, аудио отпечаток, защита от фингерпринтинга, слежка без cookie",
      h1: "Проверка отпечатка браузера", og_sub: "ID, который любой сайт вычисляет для вас без cookie",
      intro: "Сайтам не нужны cookie, чтобы узнать вас. То, как ваша система рисует текст и фигуры, обрабатывает звук и какие у неё шрифты, складывается в ID, который не меняется между сайтами, в приватном окне и через VPN. Вот ваш, из чего он состоит и перемешивает ли его ваш браузер.",
      focus_h: "Ваш отпечаток",
      docs: [
        ["Что такое отпечаток браузера?", "Набор мелких различий между компьютерами: как видеокарта и драйвер рисуют canvas или сцену WebGL, как аудиотракт округляет звук, какие установлены шрифты, плюс экран, язык и часовой пояс. По отдельности это обычно, вместе часто уникально. Сайт сводит это в ID, и каждый сайт с тем же скриптом получает от вас тот же ID."],
        ["Меняют ли его VPN или приватное окно?", "Нет. Ничто из этого не зависит от IP, а приватное окно рисует и звучит так же. Поэтому отпечаток следует за вами даже после очистки cookie и смены VPN-сервера. Карточка ID на этой странице помнит прошлый визит (только в вашем браузере), чтобы это показать."],
        ["Как защититься от отпечатков?", "Возьмите браузер, который с ними борется: Brave по умолчанию добавляет шум в canvas, WebGL и аудио; в Firefox есть privacy.resistFingerprinting; Tor Browser делает всех одинаковыми. Расширения, меняющие User-Agent или блокирующие canvas, часто делают вас заметнее. Строка «Защита от отпечатков» показывает, перемешивает ли ваш браузер."],
        ["Скажет ли тест, насколько я уникален?", "Не собирая отпечатки всех, а эта страница этого не делает: она ничего не хранит. Она показывает, что сайт может вычислить и стабильно ли это. Зайдите позже: если карточка скажет, что отпечаток тот же, любой сайт узнал бы вас так же."],
      ],
    },
  },
  "dns-leak": {
    en: {
      seo_title: "DNS Leak Test: does your DNS go around your VPN? · Who Are You",
      seo_desc: "Free DNS leak test: find the DNS resolver that actually looks up sites for you, its country and network, and compare it with the IP sites see. If they differ, your VPN or proxy leaks DNS. With how to fix it in Clash, V2Ray and the browser.",
      seo_kw: "DNS leak test, DNS leak, VPN DNS leak, which DNS server am I using, DNS resolver test, Clash DNS leak, fake-ip, proxy DNS leak",
      h1: "DNS leak test", og_sub: "Does your DNS go around your VPN?",
      intro: "Your VPN may carry your traffic while your DNS lookups still go to your own provider, which tells whoever runs the name servers where you really are. This test makes a lookup nobody made before and asks the name server who made it: your resolver, its country and network, compared with the address sites see.",
      focus_h: "Your DNS resolver",
      docs: [
        ["What is a DNS leak?", "Before your browser connects to a site, a DNS resolver turns the name into an address. If that lookup skips the VPN or proxy, it goes to your own ISP's resolver: the ISP sees every site you visit, and sites that compare your resolver with your IP can tell you're using a VPN and where you actually are."],
        ["How does this test find my resolver?", "The page looks up a random name under edns.ip-api.com that has never been asked before, so no cache can answer: your resolver has to ask ip-api's name server, which reports the resolver's address and network, and the client subnet if your resolver passes one along (ECS). The test compares the resolver's country with the country of your IP."],
        ["How do I fix a DNS leak?", "Clash / Mihomo: enable its DNS with enhanced-mode fake-ip, or use TUN mode so every lookup goes through it. V2Ray / Xray clients: route DNS through the proxy (or set a DoH server that goes through it). In the browser, Secure DNS (DoH) also keeps lookups away from the ISP. Then run this test again."],
        ["My resolver is Cloudflare or Google in another city. Is that a leak?", "Usually not. Public resolvers like 1.1.1.1 and 8.8.8.8 answer from the data center nearest to the request, so the city may differ from your VPN exit. What gives you away is a resolver run by your home ISP, or in your home country while your IP is abroad."],
      ],
    },
    "zh-CN": {
      seo_title: "DNS 泄露检测：你的 DNS 有没有绕过 VPN · 你是谁",
      seo_desc: "免费 DNS 泄露检测：找出实际替你解析域名的 DNS 服务器，看它在哪个国家、属于哪家运营商，再和网站看到的 IP 对比。对不上，就是 VPN 或代理漏了 DNS。附 Clash、V2Ray 和浏览器里的修复方法。",
      seo_kw: "DNS 泄露检测, DNS 泄漏, VPN DNS 泄露, 查看我的 DNS 服务器, DNS 解析器检测, Clash DNS 泄露, fake-ip, 代理 DNS 泄露",
      h1: "DNS 泄露检测", og_sub: "你的 DNS 有没有绕过 VPN？",
      intro: "VPN 可能替你转发了流量，DNS 查询却还是发给本地运营商，等于告诉别人你真正在哪。这个检测会查询一个从来没人查过的域名，再问权威服务器是谁来查的：也就是你的解析器、它所在的国家和运营商，然后和网站看到的 IP 对比。",
      focus_h: "你的 DNS 解析器",
      docs: [
        ["什么是 DNS 泄露？", "浏览器连接网站之前，要先由 DNS 解析器把域名换成地址。如果这一步没走 VPN 或代理，查询就发给了你本地运营商的解析器：运营商能看到你访问的每个网站；网站把解析器和你的 IP 一对比，也能看出你在用 VPN，以及你实际在哪。"],
        ["这个检测怎么找到我的解析器？", "页面会查询 edns.ip-api.com 下一个随机的、从没人查过的域名，所以没有缓存能直接回答：你的解析器只能去问 ip-api 的权威服务器，它会报告解析器的地址和运营商；如果解析器带上了你的客户端子网（ECS），也会一起报告。检测再把解析器所在国家和你 IP 的国家对比。"],
        ["DNS 泄露怎么修？", "Clash / Mihomo：开启 DNS，并把 enhanced-mode 设为 fake-ip，或者开 TUN 模式让所有查询都经过它。V2Ray / Xray 客户端：让 DNS 也走代理（或者设置一个走代理的 DoH 服务器）。浏览器里打开「安全 DNS」（DoH）也能让查询避开运营商。改完再测一次。"],
        ["解析器显示是 Cloudflare 或 Google，但在另一个城市，算泄露吗？", "一般不算。1.1.1.1、8.8.8.8 这类公共 DNS 会从离请求最近的数据中心回答，所以城市可能和 VPN 出口不一样。真正会暴露你的，是本地运营商的解析器，或者 IP 在国外、解析器却在国内。"],
      ],
    },
    "zh-TW": {
      seo_title: "DNS 洩漏檢測：你的 DNS 有沒有繞過 VPN · 你是誰",
      seo_desc: "免費 DNS 洩漏檢測：找出實際替你解析網域的 DNS 伺服器，看它在哪個國家、屬於哪家電信業者，再和網站看到的 IP 比對。對不上，就是 VPN 或代理漏了 DNS。附 Clash、V2Ray 和瀏覽器裡的修正方法。",
      seo_kw: "DNS 洩漏檢測, DNS 洩漏, VPN DNS 洩漏, 查看我的 DNS 伺服器, DNS 解析器檢測, Clash DNS 洩漏, fake-ip",
      h1: "DNS 洩漏檢測", og_sub: "你的 DNS 有沒有繞過 VPN？",
      intro: "VPN 可能替你轉送了流量，DNS 查詢卻還是送到本地電信業者，等於告訴別人你真正在哪。這個檢測會查詢一個從來沒人查過的網域，再問權威伺服器是誰來查的：也就是你的解析器、它所在的國家和業者，然後和網站看到的 IP 比對。",
      focus_h: "你的 DNS 解析器",
      docs: [
        ["什麼是 DNS 洩漏？", "瀏覽器連上網站之前，要先由 DNS 解析器把網域換成位址。如果這一步沒走 VPN 或代理，查詢就送到你本地電信業者的解析器：業者看得到你造訪的每個網站；網站把解析器和你的 IP 一比對，也看得出你在用 VPN，以及你實際在哪。"],
        ["這個檢測怎麼找到我的解析器？", "頁面會查詢 edns.ip-api.com 底下一個隨機、從沒人查過的網域，所以沒有快取能直接回答：你的解析器只能去問 ip-api 的權威伺服器，它會回報解析器的位址和業者；如果解析器帶上了你的用戶端子網（ECS），也會一起回報。檢測再把解析器所在國家和你 IP 的國家比對。"],
        ["DNS 洩漏怎麼修？", "Clash / Mihomo：開啟 DNS，並把 enhanced-mode 設為 fake-ip，或開 TUN 模式讓所有查詢都經過它。V2Ray / Xray 用戶端：讓 DNS 也走代理（或設定一個走代理的 DoH 伺服器）。瀏覽器裡開啟「安全 DNS」（DoH）也能讓查詢避開業者。改完再測一次。"],
        ["解析器是 Cloudflare 或 Google，但在另一個城市，算洩漏嗎？", "通常不算。1.1.1.1、8.8.8.8 這類公共 DNS 會從離請求最近的資料中心回答，所以城市可能和 VPN 出口不一樣。真正會暴露你的，是本地電信業者的解析器，或者 IP 在國外、解析器卻在本國。"],
      ],
    },
    ja: {
      seo_title: "DNS リークテスト：DNS が VPN を迂回していない？ · あなたは誰",
      seo_desc: "無料の DNS リークテスト：実際にあなたの名前解決をしている DNS リゾルバーを見つけ、国とネットワークを、サイトから見える IP と比べます。食い違えば VPN やプロキシから DNS が漏れています。Clash、V2Ray、ブラウザでの直し方付き。",
      seo_kw: "DNS リーク テスト, DNS 漏れ, VPN DNS リーク, 使っている DNS サーバー 確認, DNS リゾルバー 確認, Clash DNS 漏れ, fake-ip",
      h1: "DNS リークテスト", og_sub: "DNS が VPN を迂回していませんか？",
      intro: "VPN が通信を運んでいても、DNS の問い合わせは手元のプロバイダーに出ているかもしれません。そうなると、ネームサーバーの運営者にあなたの本当の居場所が分かります。このテストは誰も問い合わせたことのない名前を引き、ネームサーバーに誰が問い合わせたかを聞きます。それがあなたのリゾルバーで、その国とネットワークを、サイトから見えるアドレスと比べます。",
      focus_h: "あなたの DNS リゾルバー",
      docs: [
        ["DNS リークとは？", "ブラウザがサイトにつなぐ前に、DNS リゾルバーが名前をアドレスに変えます。この問い合わせが VPN やプロキシを通らないと、手元のプロバイダーのリゾルバーに行きます。プロバイダーには訪れたサイトがすべて見え、リゾルバーと IP を比べるサイトには、VPN を使っていることと本当の居場所が分かります。"],
        ["どうやってリゾルバーを見つける？", "ページは edns.ip-api.com の下の、誰も問い合わせたことのないランダムな名前を引きます。キャッシュでは答えられないので、あなたのリゾルバーは ip-api のネームサーバーに聞くしかなく、ネームサーバーはリゾルバーのアドレスとネットワーク、リゾルバーが付けたクライアントサブネット（ECS）を報告します。テストはリゾルバーの国と IP の国を比べます。"],
        ["DNS リークの直し方は？", "Clash / Mihomo：DNS を有効にして enhanced-mode を fake-ip にするか、TUN モードで全問い合わせを通します。V2Ray / Xray：DNS もプロキシ経由に（プロキシを通る DoH サーバーを設定）。ブラウザの「セキュア DNS」（DoH）でもプロバイダーを避けられます。直したらもう一度テストしてください。"],
        ["リゾルバーが別の都市の Cloudflare や Google。これは漏れ？", "たいてい違います。1.1.1.1 や 8.8.8.8 のような公開 DNS は問い合わせに最も近いデータセンターから答えるので、都市が VPN の出口と違うことがあります。正体がばれるのは、手元のプロバイダーのリゾルバーや、IP は海外なのにリゾルバーが自国にある場合です。"],
      ],
    },
    ko: {
      seo_title: "DNS 유출 테스트: DNS가 VPN을 우회하나 · 당신은 누구",
      seo_desc: "무료 DNS 유출 테스트: 실제로 이름 조회를 해 주는 DNS 리졸버를 찾아 국가와 네트워크를 사이트가 보는 IP와 비교합니다. 다르면 VPN이나 프록시에서 DNS가 새는 것입니다. Clash, V2Ray, 브라우저에서 고치는 방법 포함.",
      seo_kw: "DNS 유출 테스트, DNS 누출, VPN DNS 유출, 내 DNS 서버 확인, DNS 리졸버 확인, Clash DNS 유출, fake-ip",
      h1: "DNS 유출 테스트", og_sub: "DNS가 VPN을 우회하고 있나요?",
      intro: "VPN이 트래픽을 옮겨도 DNS 조회는 여전히 내 통신사로 갈 수 있고, 그러면 네임서버 운영자에게 진짜 위치가 드러납니다. 이 테스트는 아무도 조회한 적 없는 이름을 조회한 뒤 네임서버에 누가 물었는지 묻습니다. 그것이 당신의 리졸버이고, 그 국가와 네트워크를 사이트가 보는 주소와 비교합니다.",
      focus_h: "당신의 DNS 리졸버",
      docs: [
        ["DNS 유출이란?", "브라우저가 사이트에 접속하기 전에 DNS 리졸버가 이름을 주소로 바꿉니다. 이 조회가 VPN이나 프록시를 거치지 않으면 내 통신사의 리졸버로 갑니다. 통신사는 방문하는 모든 사이트를 보게 되고, 리졸버와 IP를 비교하는 사이트는 VPN 사용과 실제 위치를 알아챕니다."],
        ["리졸버를 어떻게 찾나요?", "페이지는 edns.ip-api.com 아래에서 아무도 조회한 적 없는 무작위 이름을 조회합니다. 캐시로는 답할 수 없으니 리졸버가 ip-api의 네임서버에 물어야 하고, 네임서버는 리졸버의 주소와 네트워크, 리졸버가 전달한 클라이언트 서브넷(ECS)을 알려 줍니다. 테스트는 리졸버의 국가와 IP의 국가를 비교합니다."],
        ["DNS 유출은 어떻게 고치나요?", "Clash / Mihomo: DNS를 켜고 enhanced-mode를 fake-ip로 하거나, TUN 모드로 모든 조회를 거치게 합니다. V2Ray / Xray: DNS도 프록시로 보내세요(프록시를 거치는 DoH 서버 설정). 브라우저의 보안 DNS(DoH)도 통신사를 피하게 해 줍니다. 고친 뒤 다시 테스트하세요."],
        ["리졸버가 다른 도시의 Cloudflare나 Google이면 유출인가요?", "대개 아닙니다. 1.1.1.1, 8.8.8.8 같은 공개 DNS는 요청에 가장 가까운 데이터 센터에서 답하므로 도시가 VPN 출구와 다를 수 있습니다. 정체가 드러나는 건 내 통신사의 리졸버이거나, IP는 해외인데 리졸버는 자국에 있는 경우입니다."],
      ],
    },
    es: {
      seo_title: "Test de fuga de DNS: ¿tu DNS se salta la VPN? · ¿Quién eres?",
      seo_desc: "Test gratuito de fuga de DNS: encuentra el resolvedor DNS que de verdad busca los sitios por ti, su país y su red, y compáralo con la IP que ven los sitios. Si no coinciden, tu VPN o proxy filtra el DNS. Con cómo arreglarlo en Clash, V2Ray y el navegador.",
      seo_kw: "test fuga DNS, fuga de DNS, DNS leak test, fuga DNS VPN, qué servidor DNS uso, comprobar resolvedor DNS, Clash fuga DNS, fake-ip",
      h1: "Test de fuga de DNS", og_sub: "¿Tu DNS se salta la VPN?",
      intro: "Tu VPN puede llevar tu tráfico mientras tus consultas DNS siguen yendo a tu proveedor, lo que le dice a quien gestiona los servidores de nombres dónde estás de verdad. Este test hace una consulta que nadie ha hecho antes y pregunta al servidor de nombres quién la hizo: tu resolvedor, su país y su red, comparados con la dirección que ven los sitios.",
      focus_h: "Tu resolvedor DNS",
      docs: [
        ["¿Qué es una fuga de DNS?", "Antes de que el navegador se conecte a un sitio, un resolvedor DNS convierte el nombre en una dirección. Si esa consulta se salta la VPN o el proxy, va al resolvedor de tu proveedor: este ve cada sitio que visitas, y los sitios que comparan tu resolvedor con tu IP notan que usas VPN y dónde estás en realidad."],
        ["¿Cómo encuentra el test mi resolvedor?", "La página consulta un nombre aleatorio bajo edns.ip-api.com que nadie ha pedido antes, así que ninguna caché puede responder: tu resolvedor tiene que preguntar al servidor de nombres de ip-api, que informa de la dirección y la red del resolvedor, y de la subred del cliente si el resolvedor la envía (ECS). El test compara el país del resolvedor con el de tu IP."],
        ["¿Cómo arreglo una fuga de DNS?", "Clash / Mihomo: activa su DNS con enhanced-mode fake-ip o usa el modo TUN para que todas las consultas pasen por él. Clientes V2Ray / Xray: envía el DNS por el proxy (o configura un servidor DoH que pase por él). En el navegador, el DNS seguro (DoH) también aleja las consultas del proveedor. Después, repite el test."],
        ["Mi resolvedor es Cloudflare o Google en otra ciudad. ¿Es una fuga?", "Normalmente no. Los resolvedores públicos como 1.1.1.1 y 8.8.8.8 responden desde el centro de datos más cercano a la consulta, así que la ciudad puede no coincidir con la salida de la VPN. Lo que te delata es un resolvedor de tu proveedor, o uno en tu país cuando tu IP está en el extranjero."],
      ],
    },
    fr: {
      seo_title: "Test de fuite DNS : votre DNS contourne-t-il le VPN ? · Qui êtes-vous ?",
      seo_desc: "Test gratuit de fuite DNS : trouvez le résolveur DNS qui résout vraiment les sites pour vous, son pays et son réseau, et comparez-le à l’IP que voient les sites. S’ils diffèrent, votre VPN ou proxy laisse fuir le DNS. Avec la correction dans Clash, V2Ray et le navigateur.",
      seo_kw: "test fuite DNS, fuite DNS, DNS leak test, fuite DNS VPN, quel serveur DNS j’utilise, vérifier résolveur DNS, Clash fuite DNS, fake-ip",
      h1: "Test de fuite DNS", og_sub: "Votre DNS contourne-t-il le VPN ?",
      intro: "Votre VPN peut transporter votre trafic pendant que vos requêtes DNS partent encore chez votre fournisseur, ce qui indique à qui gère les serveurs de noms où vous êtes vraiment. Ce test fait une requête que personne n’a jamais faite et demande au serveur de noms qui l’a faite : votre résolveur, son pays et son réseau, comparés à l’adresse que voient les sites.",
      focus_h: "Votre résolveur DNS",
      docs: [
        ["Qu’est-ce qu’une fuite DNS ?", "Avant que le navigateur se connecte à un site, un résolveur DNS transforme le nom en adresse. Si cette requête contourne le VPN ou le proxy, elle part chez le résolveur de votre fournisseur : celui-ci voit chaque site visité, et les sites qui comparent votre résolveur à votre IP voient que vous utilisez un VPN et où vous êtes vraiment."],
        ["Comment le test trouve-t-il mon résolveur ?", "La page résout un nom aléatoire sous edns.ip-api.com que personne n’a jamais demandé, donc aucun cache ne peut répondre : votre résolveur doit interroger le serveur de noms d’ip-api, qui indique l’adresse et le réseau du résolveur, et le sous-réseau client s’il le transmet (ECS). Le test compare le pays du résolveur à celui de votre IP."],
        ["Comment corriger une fuite DNS ?", "Clash / Mihomo : activez son DNS avec enhanced-mode fake-ip, ou passez en mode TUN pour que toutes les requêtes passent par lui. Clients V2Ray / Xray : faites passer le DNS par le proxy (ou configurez un serveur DoH qui y passe). Dans le navigateur, le DNS sécurisé (DoH) éloigne aussi les requêtes du fournisseur. Puis refaites le test."],
        ["Mon résolveur est Cloudflare ou Google dans une autre ville. Est-ce une fuite ?", "En général, non. Les résolveurs publics comme 1.1.1.1 et 8.8.8.8 répondent depuis le centre de données le plus proche de la requête ; la ville peut donc différer de la sortie VPN. Ce qui vous trahit, c’est un résolveur de votre fournisseur, ou situé dans votre pays alors que votre IP est à l’étranger."],
      ],
    },
    de: {
      seo_title: "DNS-Leak-Test: Umgeht Ihr DNS das VPN? · Wer sind Sie?",
      seo_desc: "Kostenloser DNS-Leak-Test: Finden Sie den DNS-Resolver, der Websites tatsächlich für Sie auflöst, sein Land und Netz, und vergleichen Sie ihn mit der IP, die Websites sehen. Weichen sie ab, leckt Ihr VPN oder Proxy DNS. Mit Lösung für Clash, V2Ray und den Browser.",
      seo_kw: "DNS Leak Test, DNS-Leck, VPN DNS Leak, welchen DNS-Server nutze ich, DNS-Resolver prüfen, Clash DNS Leak, fake-ip",
      h1: "DNS-Leak-Test", og_sub: "Umgeht Ihr DNS das VPN?",
      intro: "Ihr VPN transportiert vielleicht Ihren Verkehr, während DNS-Anfragen weiter an Ihren Anbieter gehen, und das verrät den Betreibern der Nameserver, wo Sie wirklich sind. Dieser Test stellt eine Anfrage, die noch nie jemand gestellt hat, und fragt den Nameserver, wer sie gestellt hat: Ihren Resolver, sein Land und Netz, verglichen mit der Adresse, die Websites sehen.",
      focus_h: "Ihr DNS-Resolver",
      docs: [
        ["Was ist ein DNS-Leck?", "Bevor der Browser eine Website aufruft, übersetzt ein DNS-Resolver den Namen in eine Adresse. Umgeht diese Anfrage VPN oder Proxy, landet sie beim Resolver Ihres Anbieters: Er sieht jede besuchte Website, und Websites, die Resolver und IP vergleichen, erkennen das VPN und Ihren tatsächlichen Standort."],
        ["Wie findet der Test meinen Resolver?", "Die Seite löst einen zufälligen, nie zuvor abgefragten Namen unter edns.ip-api.com auf; kein Cache kann antworten. Ihr Resolver muss den Nameserver von ip-api fragen, der Adresse und Netz des Resolvers meldet, dazu das Client-Subnetz, falls der Resolver es mitschickt (ECS). Der Test vergleicht das Land des Resolvers mit dem Ihrer IP."],
        ["Wie behebe ich ein DNS-Leck?", "Clash / Mihomo: DNS mit enhanced-mode fake-ip einschalten oder den TUN-Modus nutzen, damit alle Anfragen hindurchgehen. V2Ray / Xray: DNS ebenfalls über den Proxy leiten (oder einen DoH-Server, der hindurchgeht). Im Browser hält sicheres DNS (DoH) Anfragen ebenfalls vom Anbieter fern. Danach erneut testen."],
        ["Mein Resolver ist Cloudflare oder Google in einer anderen Stadt. Ist das ein Leck?", "Meist nicht. Öffentliche Resolver wie 1.1.1.1 und 8.8.8.8 antworten aus dem Rechenzentrum, das der Anfrage am nächsten ist; die Stadt kann also vom VPN-Ausgang abweichen. Verräterisch ist ein Resolver Ihres eigenen Anbieters oder einer in Ihrem Heimatland, während Ihre IP im Ausland liegt."],
      ],
    },
    pt: {
      seo_title: "Teste de vazamento de DNS: seu DNS escapa da VPN? · Quem é você?",
      seo_desc: "Teste gratuito de vazamento de DNS: encontre o resolvedor de DNS que de fato consulta os sites para você, seu país e sua rede, e compare com o IP que os sites veem. Se não batem, sua VPN ou proxy vaza DNS. Com como corrigir no Clash, V2Ray e no navegador.",
      seo_kw: "teste vazamento DNS, vazamento de DNS, DNS leak test, vazamento DNS VPN, qual servidor DNS uso, verificar resolvedor DNS, Clash vazamento DNS, fake-ip",
      h1: "Teste de vazamento de DNS", og_sub: "Seu DNS escapa da VPN?",
      intro: "Sua VPN pode levar seu tráfego enquanto as consultas DNS continuam indo para o seu provedor, o que conta a quem opera os servidores de nomes onde você realmente está. Este teste faz uma consulta que ninguém fez antes e pergunta ao servidor de nomes quem a fez: seu resolvedor, o país e a rede dele, comparados com o endereço que os sites veem.",
      focus_h: "Seu resolvedor de DNS",
      docs: [
        ["O que é vazamento de DNS?", "Antes de o navegador se conectar a um site, um resolvedor de DNS transforma o nome em endereço. Se essa consulta escapa da VPN ou do proxy, ela vai para o resolvedor do seu provedor: ele vê cada site que você visita, e sites que comparam o resolvedor com o seu IP percebem a VPN e onde você realmente está."],
        ["Como o teste encontra meu resolvedor?", "A página consulta um nome aleatório em edns.ip-api.com que ninguém pediu antes, então nenhum cache responde: seu resolvedor precisa perguntar ao servidor de nomes da ip-api, que informa o endereço e a rede do resolvedor, e a sub-rede do cliente se o resolvedor a repassar (ECS). O teste compara o país do resolvedor com o do seu IP."],
        ["Como corrijo um vazamento de DNS?", "Clash / Mihomo: ligue o DNS com enhanced-mode fake-ip ou use o modo TUN para que todas as consultas passem por ele. Clientes V2Ray / Xray: mande o DNS pelo proxy (ou configure um servidor DoH que passe por ele). No navegador, o DNS seguro (DoH) também afasta as consultas do provedor. Depois, teste de novo."],
        ["Meu resolvedor é Cloudflare ou Google em outra cidade. É vazamento?", "Normalmente não. Resolvedores públicos como 1.1.1.1 e 8.8.8.8 respondem do data center mais próximo da consulta, então a cidade pode não bater com a saída da VPN. O que entrega você é um resolvedor do seu provedor, ou um no seu país enquanto seu IP está no exterior."],
      ],
    },
    ru: {
      seo_title: "Проверка утечки DNS: обходит ли DNS ваш VPN? · Кто вы?",
      seo_desc: "Бесплатная проверка утечки DNS: найдите DNS-резолвер, который на самом деле разрешает для вас сайты, его страну и сеть, и сравните с IP, который видят сайты. Если не совпадает, ваш VPN или прокси пропускает DNS. С инструкциями для Clash, V2Ray и браузера.",
      seo_kw: "проверка утечки DNS, утечка DNS, DNS leak test, утечка DNS VPN, какой DNS сервер я использую, проверить DNS резолвер, Clash утечка DNS, fake-ip",
      h1: "Проверка утечки DNS", og_sub: "Обходит ли ваш DNS VPN?",
      intro: "VPN может везти ваш трафик, а DNS-запросы при этом уходят к вашему провайдеру, и это сообщает владельцам серверов имён, где вы на самом деле. Тест делает запрос, которого ещё никто не делал, и спрашивает у сервера имён, кто его сделал: это ваш резолвер, его страна и сеть, которые сравниваются с адресом, видимым сайтам.",
      focus_h: "Ваш DNS-резолвер",
      docs: [
        ["Что такое утечка DNS?", "Прежде чем браузер откроет сайт, DNS-резолвер превращает имя в адрес. Если этот запрос идёт мимо VPN или прокси, он попадает к резолверу вашего провайдера: провайдер видит каждый сайт, а сайты, сравнивающие резолвер с IP, понимают, что вы через VPN, и где вы на самом деле."],
        ["Как тест находит мой резолвер?", "Страница запрашивает случайное имя в зоне edns.ip-api.com, которое никто раньше не запрашивал, поэтому ответить из кэша нельзя: ваш резолвер вынужден спросить сервер имён ip-api, а тот сообщает адрес и сеть резолвера и подсеть клиента, если резолвер её передаёт (ECS). Тест сравнивает страну резолвера со страной вашего IP."],
        ["Как устранить утечку DNS?", "Clash / Mihomo: включите DNS с enhanced-mode fake-ip или режим TUN, чтобы все запросы шли через него. Клиенты V2Ray / Xray: пустите DNS через прокси (или настройте DoH-сервер, идущий через него). В браузере безопасный DNS (DoH) тоже уводит запросы от провайдера. Потом проверьте снова."],
        ["Резолвер — Cloudflare или Google в другом городе. Это утечка?", "Обычно нет. Публичные резолверы вроде 1.1.1.1 и 8.8.8.8 отвечают из ближайшего к запросу дата-центра, так что город может не совпадать с выходом VPN. Выдаёт вас резолвер вашего провайдера или резолвер в вашей стране, когда IP за границей."],
      ],
    },
  },
  "webrtc-leak": {
    "en": {
      "seo_title": "WebRTC Leak Test: does WebRTC show your real IP? · Who Are You",
      "seo_desc": "Free WebRTC leak test: the public IPv4 and IPv6 addresses and the local addresses WebRTC hands to any site, compared with the IP your VPN or proxy shows. If they differ, WebRTC leaks your real IP. With how to fix it in Chrome, Firefox, Brave and proxy clients.",
      "seo_kw": "WebRTC leak test, WebRTC leak, WebRTC IP leak, VPN WebRTC leak, check WebRTC, STUN IP leak, local IP leak, disable WebRTC",
      "h1": "WebRTC leak test",
      "og_sub": "Does WebRTC show your real IP?",
      "intro": "Video calls in the browser use WebRTC, and any page can start it without asking. It asks a STUN server which address you came from, over UDP, which many VPNs and proxies don't carry. Here are the addresses WebRTC gives away, compared with the address sites see.",
      "focus_h": "Your WebRTC addresses",
      "docs": [
        [
          "What is a WebRTC leak?",
          "To set up a call, WebRTC collects every address it could be reached at: the local ones on your network card, and the public one a STUN server sees. A page reads them with a few lines of script, no permission needed. If your VPN or proxy carries only the page's web requests, the STUN request goes out on your own line, and the page learns your real IP behind the VPN."
        ],
        [
          "How does this test work?",
          "The page opens a WebRTC connection to the STUN servers of Cloudflare and Google and lists the addresses they report (\"server reflexive\" candidates), then compares them with the address this site, your other exits and the IPv6 test see. An address that none of them show is a leak. The local addresses come from the \"host\" candidates; nothing is stored or sent anywhere."
        ],
        [
          "How do I fix a WebRTC leak?",
          "Proxy clients (Clash, V2Ray and others): turn on TUN mode so UDP goes through the proxy too. Chrome and Edge: the WebRTC Network Limiter extension, or uBlock Origin's \"Prevent WebRTC from leaking local IP addresses\". Brave: Settings → Privacy → WebRTC IP handling policy → Disable non-proxied UDP. Firefox: set media.peerconnection.ice.default_address_only to true in about:config, or media.peerconnection.enabled to false to turn WebRTC off. Then run this test again."
        ],
        [
          "Is a local address or a .local name a leak?",
          "A name ending in .local is the browser hiding your local address (mDNS), which is what you want. A real local address such as 192.168.1.5 doesn't reveal where you are, but it makes your fingerprint more unique. An IPv6 address that differs from your IPv4 exit is a leak only if it isn't your IPv6 exit: the test checks it against the IPv6 address sites see."
        ]
      ]
    },
    "zh-CN": {
      "seo_title": "WebRTC 泄漏检测：WebRTC 会不会暴露你的真实 IP · 你是谁",
      "seo_desc": "免费 WebRTC 泄漏检测：列出 WebRTC 交给任何网站的公网 IPv4、IPv6 和局域网地址，和 VPN 或代理显示的 IP 对比。对不上，就是 WebRTC 泄露了真实 IP。附 Chrome、Firefox、Brave 和代理客户端的修复方法。",
      "seo_kw": "WebRTC 泄漏检测, WebRTC 泄露检测, WebRTC 泄露, WebRTC IP 泄露, VPN WebRTC 泄漏, WebRTC 检测, 真实 IP 泄露, 关闭 WebRTC, WebRTC leak test",
      "h1": "WebRTC 泄漏检测",
      "og_sub": "WebRTC 会不会暴露你的真实 IP？",
      "intro": "浏览器里的视频通话靠 WebRTC，任何网页都能直接启动它，不用你同意。它会通过 UDP 问 STUN 服务器你从哪个地址来，而很多 VPN 和代理不转发 UDP。下面是 WebRTC 暴露的地址，和网站看到的地址对比。",
      "focus_h": "你的 WebRTC 地址",
      "docs": [
        [
          "什么是 WebRTC 泄漏？",
          "为了建立通话，WebRTC 会收集所有能联系到你的地址：网卡上的局域网地址，以及 STUN 服务器看到的公网地址。网页几行脚本就能读到，不需要任何权限。如果 VPN 或代理只转发网页请求，STUN 请求就会走你自己的线路，网页就能拿到 VPN 背后的真实 IP。"
        ],
        [
          "这个检测怎么做的？",
          "页面向 Cloudflare 和 Google 的 STUN 服务器发起 WebRTC 连接，列出它们报告的地址（srflx 候选），再和本站、你的其他出口以及 IPv6 测试看到的地址比较。哪个都对不上的地址，就是泄漏。局域网地址来自 host 候选。所有数据不存储、不上传。"
        ],
        [
          "WebRTC 泄漏怎么修？",
          "代理客户端（Clash、V2Ray 等）：打开 TUN 模式，让 UDP 也走代理。Chrome 和 Edge：装 WebRTC Network Limiter 扩展，或在 uBlock Origin 里勾选「防止 WebRTC 泄露本地 IP 地址」。Brave：设置 → 隐私 → WebRTC IP 处理策略 → 禁用非代理 UDP。Firefox：在 about:config 把 media.peerconnection.ice.default_address_only 设为 true，或把 media.peerconnection.enabled 设为 false 彻底关闭。改完再测一次。"
        ],
        [
          "局域网地址或 .local 名字算泄漏吗？",
          "以 .local 结尾的名字是浏览器把局域网地址藏起来了（mDNS），这正是你想要的。真实的局域网地址（比如 192.168.1.5）不会暴露你在哪，但会让你的指纹更独特。和 IPv4 出口不同的 IPv6 地址，只有不是你的 IPv6 出口时才算泄漏：检测会拿它和网站看到的 IPv6 地址比对。"
        ]
      ]
    },
    "zh-TW": {
      "seo_title": "WebRTC 洩漏檢測：WebRTC 會不會暴露你的真實 IP · 你是誰",
      "seo_desc": "免費 WebRTC 洩漏檢測：列出 WebRTC 交給任何網站的公網 IPv4、IPv6 和區域網路位址，與 VPN 或代理顯示的 IP 比對。對不上，就是 WebRTC 洩漏了真實 IP。附 Chrome、Firefox、Brave 和代理用戶端的修復方法。",
      "seo_kw": "WebRTC 洩漏檢測, WebRTC 洩露, WebRTC IP 洩漏, VPN WebRTC 洩漏, WebRTC 檢測, 真實 IP 洩漏, 關閉 WebRTC, WebRTC leak test",
      "h1": "WebRTC 洩漏檢測",
      "og_sub": "WebRTC 會不會暴露你的真實 IP？",
      "intro": "瀏覽器裡的視訊通話靠 WebRTC，任何網頁都能直接啟動它，不必經過你同意。它會透過 UDP 問 STUN 伺服器你從哪個位址來，而很多 VPN 和代理不轉送 UDP。下面是 WebRTC 暴露的位址，與網站看到的位址比對。",
      "focus_h": "你的 WebRTC 位址",
      "docs": [
        [
          "什麼是 WebRTC 洩漏？",
          "為了建立通話，WebRTC 會收集所有能聯絡到你的位址：網卡上的區域網路位址，以及 STUN 伺服器看到的公網位址。網頁幾行程式就能讀到，不需要任何權限。如果 VPN 或代理只轉送網頁請求，STUN 請求就會走你自己的線路，網頁就能拿到 VPN 背後的真實 IP。"
        ],
        [
          "這個檢測怎麼做的？",
          "頁面向 Cloudflare 和 Google 的 STUN 伺服器發起 WebRTC 連線，列出它們回報的位址（srflx 候選），再與本站、你的其他出口以及 IPv6 測試看到的位址比較。哪個都對不上的位址，就是洩漏。區域網路位址來自 host 候選。所有資料不儲存、不上傳。"
        ],
        [
          "WebRTC 洩漏怎麼修？",
          "代理用戶端（Clash、V2Ray 等）：開啟 TUN 模式，讓 UDP 也走代理。Chrome 和 Edge：安裝 WebRTC Network Limiter 擴充功能，或在 uBlock Origin 勾選「防止 WebRTC 洩漏本機 IP 位址」。Brave：設定 → 隱私 → WebRTC IP 處理政策 → 停用非代理 UDP。Firefox：在 about:config 把 media.peerconnection.ice.default_address_only 設為 true，或把 media.peerconnection.enabled 設為 false 完全關閉。改完再測一次。"
        ],
        [
          "區域網路位址或 .local 名稱算洩漏嗎？",
          "以 .local 結尾的名稱是瀏覽器把區域網路位址藏起來了（mDNS），這正是你要的。真實的區域網路位址（例如 192.168.1.5）不會暴露你在哪，但會讓你的指紋更獨特。與 IPv4 出口不同的 IPv6 位址，只有不是你的 IPv6 出口時才算洩漏：檢測會拿它和網站看到的 IPv6 位址比對。"
        ]
      ]
    },
    "ja": {
      "seo_title": "WebRTC リークテスト：WebRTC で本当の IP が見えていないか · あなたは誰",
      "seo_desc": "無料の WebRTC リークテスト：WebRTC がどのサイトにも渡す公開 IPv4・IPv6 アドレスとローカルアドレスを一覧にし、VPN やプロキシが示す IP と比べます。違えば WebRTC から本当の IP が漏れています。Chrome、Firefox、Brave、プロキシクライアントでの対策つき。",
      "seo_kw": "WebRTC リークテスト, WebRTC リーク, WebRTC IP 漏れ, VPN WebRTC リーク, WebRTC チェック, ローカル IP 漏洩, WebRTC 無効化, WebRTC leak test",
      "h1": "WebRTC リークテスト",
      "og_sub": "WebRTC で本当の IP が見えていないか",
      "intro": "ブラウザのビデオ通話は WebRTC を使い、どのページも許可なしに起動できます。WebRTC は UDP で STUN サーバーにどのアドレスから来たかを尋ねますが、UDP を通さない VPN やプロキシは少なくありません。WebRTC が明かすアドレスを、サイトから見えるアドレスと比べます。",
      "focus_h": "あなたの WebRTC アドレス",
      "docs": [
        [
          "WebRTC リークとは？",
          "通話をつなぐため、WebRTC は連絡に使えるアドレスをすべて集めます。ネットワークカードのローカルアドレスと、STUN サーバーから見た公開アドレスです。ページは数行のスクリプトで、許可なしにそれを読めます。VPN やプロキシがページの通信しか運ばないと、STUN の問い合わせは自分の回線から出て、VPN の裏の本当の IP がページに知られます。"
        ],
        [
          "このテストの仕組みは？",
          "ページは Cloudflare と Google の STUN サーバーに WebRTC 接続を開き、返ってきたアドレス（srflx 候補）を一覧にして、このサイト、ほかの出口、IPv6 テストから見えるアドレスと比べます。どれとも一致しないアドレスがリークです。ローカルアドレスは host 候補から取ります。何も保存・送信しません。"
        ],
        [
          "WebRTC リークの直し方は？",
          "プロキシクライアント（Clash、V2Ray など）：TUN モードをオンにして UDP もプロキシに通します。Chrome と Edge：拡張機能 WebRTC Network Limiter か、uBlock Origin の「WebRTC によるローカル IP アドレスの漏洩を防ぐ」。Brave：設定 → プライバシー → WebRTC IP 処理ポリシー → プロキシ経由でない UDP を無効にする。Firefox：about:config で media.peerconnection.ice.default_address_only を true に、完全に止めるなら media.peerconnection.enabled を false に。変更後にもう一度テストしてください。"
        ],
        [
          "ローカルアドレスや .local の名前はリーク？",
          ".local で終わる名前は、ブラウザがローカルアドレスを隠している（mDNS）印で、望ましい状態です。192.168.1.5 のような本物のローカルアドレスは居場所を明かしませんが、フィンガープリントをより一意にします。IPv4 の出口と違う IPv6 アドレスは、それが自分の IPv6 出口でない場合だけリークです。テストはサイトから見える IPv6 アドレスと照合します。"
        ]
      ]
    },
    "ko": {
      "seo_title": "WebRTC 유출 테스트: WebRTC가 실제 IP를 드러내나요? · 당신은 누구",
      "seo_desc": "무료 WebRTC 유출 테스트: WebRTC가 아무 사이트에나 넘겨주는 공인 IPv4·IPv6 주소와 로컬 주소를 보여 주고, VPN이나 프록시가 보여 주는 IP와 비교합니다. 다르면 WebRTC가 실제 IP를 유출하는 것입니다. Chrome, Firefox, Brave, 프록시 클라이언트에서 고치는 법도 함께.",
      "seo_kw": "WebRTC 유출 테스트, WebRTC 누출, WebRTC IP 유출, VPN WebRTC 유출, WebRTC 확인, 로컬 IP 유출, WebRTC 끄기, WebRTC leak test",
      "h1": "WebRTC 유출 테스트",
      "og_sub": "WebRTC가 실제 IP를 드러내나요?",
      "intro": "브라우저의 영상 통화는 WebRTC를 쓰고, 어떤 페이지든 묻지 않고 실행할 수 있습니다. WebRTC는 UDP로 STUN 서버에 어느 주소에서 왔는지 묻는데, UDP를 전달하지 않는 VPN과 프록시가 많습니다. WebRTC가 드러내는 주소를 사이트가 보는 주소와 비교합니다.",
      "focus_h": "내 WebRTC 주소",
      "docs": [
        [
          "WebRTC 유출이란?",
          "통화를 연결하려고 WebRTC는 연락 가능한 모든 주소를 모읍니다. 네트워크 카드의 로컬 주소와 STUN 서버가 본 공인 주소입니다. 페이지는 스크립트 몇 줄로 권한 없이 이를 읽습니다. VPN이나 프록시가 페이지 요청만 전달하면 STUN 요청은 내 회선으로 나가고, 페이지는 VPN 뒤의 실제 IP를 알게 됩니다."
        ],
        [
          "이 테스트는 어떻게 작동하나요?",
          "페이지는 Cloudflare와 Google의 STUN 서버에 WebRTC 연결을 열고, 돌려받은 주소(srflx 후보)를 이 사이트, 다른 출구, IPv6 테스트가 보는 주소와 비교합니다. 어느 것과도 맞지 않는 주소가 유출입니다. 로컬 주소는 host 후보에서 옵니다. 아무것도 저장하거나 보내지 않습니다."
        ],
        [
          "WebRTC 유출은 어떻게 막나요?",
          "프록시 클라이언트(Clash, V2Ray 등): TUN 모드를 켜서 UDP도 프록시로 보냅니다. Chrome과 Edge: WebRTC Network Limiter 확장 프로그램, 또는 uBlock Origin의 \"WebRTC가 로컬 IP 주소를 유출하지 않도록 방지\". Brave: 설정 → 개인정보 보호 → WebRTC IP 처리 정책 → 프록시되지 않은 UDP 사용 중지. Firefox: about:config에서 media.peerconnection.ice.default_address_only를 true로, 완전히 끄려면 media.peerconnection.enabled를 false로. 바꾼 뒤 다시 테스트하세요."
        ],
        [
          "로컬 주소나 .local 이름도 유출인가요?",
          ".local로 끝나는 이름은 브라우저가 로컬 주소를 숨긴 것(mDNS)으로, 바람직한 상태입니다. 192.168.1.5 같은 실제 로컬 주소는 위치를 드러내지 않지만 지문을 더 고유하게 만듭니다. IPv4 출구와 다른 IPv6 주소는 그것이 내 IPv6 출구가 아닐 때만 유출입니다. 테스트는 사이트가 보는 IPv6 주소와 대조합니다."
        ]
      ]
    },
    "es": {
      "seo_title": "Test de fuga WebRTC: ¿WebRTC muestra tu IP real? · ¿Quién eres?",
      "seo_desc": "Test de fuga WebRTC gratis: las direcciones IPv4 e IPv6 públicas y las locales que WebRTC entrega a cualquier sitio, comparadas con la IP que muestra tu VPN o proxy. Si no coinciden, WebRTC filtra tu IP real. Con cómo arreglarlo en Chrome, Firefox, Brave y clientes proxy.",
      "seo_kw": "test de fuga WebRTC, fuga WebRTC, WebRTC leak test, fuga de IP WebRTC, VPN fuga WebRTC, comprobar WebRTC, fuga de IP local, desactivar WebRTC",
      "h1": "Test de fuga WebRTC",
      "og_sub": "¿WebRTC muestra tu IP real?",
      "intro": "Las videollamadas en el navegador usan WebRTC, y cualquier página puede iniciarlo sin pedir permiso. Pregunta a un servidor STUN, por UDP, desde qué dirección llegas, y muchas VPN y proxies no llevan UDP. Aquí están las direcciones que WebRTC revela, comparadas con la que ven los sitios.",
      "focus_h": "Tus direcciones WebRTC",
      "docs": [
        [
          "¿Qué es una fuga WebRTC?",
          "Para establecer una llamada, WebRTC reúne todas las direcciones en las que se te puede alcanzar: las locales de tu tarjeta de red y la pública que ve un servidor STUN. Una página las lee con unas líneas de script, sin permiso. Si tu VPN o proxy solo lleva las peticiones web de la página, la consulta STUN sale por tu propia línea y la página conoce tu IP real tras la VPN."
        ],
        [
          "¿Cómo funciona este test?",
          "La página abre una conexión WebRTC con los servidores STUN de Cloudflare y Google, lista las direcciones que devuelven (candidatos srflx) y las compara con la que ven este sitio, tus otras salidas y el test de IPv6. Una dirección que ninguno muestra es una fuga. Las direcciones locales salen de los candidatos host; no se guarda ni se envía nada."
        ],
        [
          "¿Cómo arreglo una fuga WebRTC?",
          "Clientes proxy (Clash, V2Ray y otros): activa el modo TUN para que el UDP también pase por el proxy. Chrome y Edge: la extensión WebRTC Network Limiter, o en uBlock Origin «Evitar que WebRTC filtre direcciones IP locales». Brave: Configuración → Privacidad → Política de gestión de IP de WebRTC → Desactivar UDP sin proxy. Firefox: en about:config pon media.peerconnection.ice.default_address_only en true, o media.peerconnection.enabled en false para apagar WebRTC. Luego repite el test."
        ],
        [
          "¿Una dirección local o un nombre .local es una fuga?",
          "Un nombre terminado en .local es el navegador ocultando tu dirección local (mDNS), justo lo que quieres. Una dirección local real como 192.168.1.5 no revela dónde estás, pero hace tu huella más única. Una IPv6 distinta de tu salida IPv4 solo es una fuga si no es tu salida IPv6: el test la compara con la IPv6 que ven los sitios."
        ]
      ]
    },
    "fr": {
      "seo_title": "Test de fuite WebRTC : WebRTC montre-t-il votre vraie IP ? · Qui êtes-vous ?",
      "seo_desc": "Test de fuite WebRTC gratuit : les adresses IPv4 et IPv6 publiques et les adresses locales que WebRTC donne à n'importe quel site, comparées à l'IP que montre votre VPN ou proxy. Si elles diffèrent, WebRTC fait fuiter votre vraie IP. Avec les correctifs pour Chrome, Firefox, Brave et les clients proxy.",
      "seo_kw": "test de fuite WebRTC, fuite WebRTC, WebRTC leak test, fuite IP WebRTC, VPN fuite WebRTC, vérifier WebRTC, fuite IP locale, désactiver WebRTC",
      "h1": "Test de fuite WebRTC",
      "og_sub": "WebRTC montre-t-il votre vraie IP ?",
      "intro": "Les appels vidéo dans le navigateur passent par WebRTC, et n'importe quelle page peut le lancer sans demander. Il demande à un serveur STUN, en UDP, de quelle adresse vous venez, et beaucoup de VPN et de proxys ne transportent pas l'UDP. Voici les adresses que WebRTC révèle, comparées à celle que voient les sites.",
      "focus_h": "Vos adresses WebRTC",
      "docs": [
        [
          "Qu'est-ce qu'une fuite WebRTC ?",
          "Pour établir un appel, WebRTC rassemble toutes les adresses où l'on peut vous joindre : les adresses locales de votre carte réseau et l'adresse publique que voit un serveur STUN. Une page les lit en quelques lignes de script, sans autorisation. Si votre VPN ou proxy ne transporte que les requêtes web de la page, la requête STUN sort par votre propre ligne et la page apprend votre vraie IP derrière le VPN."
        ],
        [
          "Comment fonctionne ce test ?",
          "La page ouvre une connexion WebRTC vers les serveurs STUN de Cloudflare et Google, liste les adresses qu'ils renvoient (candidats srflx) et les compare à celle que voient ce site, vos autres sorties et le test IPv6. Une adresse qu'aucun d'eux ne montre est une fuite. Les adresses locales viennent des candidats host ; rien n'est stocké ni envoyé."
        ],
        [
          "Comment corriger une fuite WebRTC ?",
          "Clients proxy (Clash, V2Ray et autres) : activez le mode TUN pour que l'UDP passe aussi par le proxy. Chrome et Edge : l'extension WebRTC Network Limiter, ou dans uBlock Origin « Empêcher WebRTC de divulguer les adresses IP locales ». Brave : Paramètres → Confidentialité → Règle de gestion des IP WebRTC → Désactiver l'UDP hors proxy. Firefox : dans about:config, mettez media.peerconnection.ice.default_address_only à true, ou media.peerconnection.enabled à false pour couper WebRTC. Puis refaites le test."
        ],
        [
          "Une adresse locale ou un nom en .local, est-ce une fuite ?",
          "Un nom en .local, c'est le navigateur qui cache votre adresse locale (mDNS) : c'est ce que vous voulez. Une vraie adresse locale comme 192.168.1.5 ne dit pas où vous êtes, mais rend votre empreinte plus unique. Une IPv6 différente de votre sortie IPv4 n'est une fuite que si ce n'est pas votre sortie IPv6 : le test la compare à l'IPv6 que voient les sites."
        ]
      ]
    },
    "de": {
      "seo_title": "WebRTC-Leak-Test: Zeigt WebRTC Ihre echte IP? · Wer sind Sie?",
      "seo_desc": "Kostenloser WebRTC-Leak-Test: die öffentlichen IPv4- und IPv6-Adressen und die lokalen Adressen, die WebRTC jeder Website gibt, verglichen mit der IP, die Ihr VPN oder Proxy zeigt. Weichen sie ab, verrät WebRTC Ihre echte IP. Mit Lösungen für Chrome, Firefox, Brave und Proxy-Clients.",
      "seo_kw": "WebRTC-Leak-Test, WebRTC Leak, WebRTC leak test, WebRTC IP-Leak, VPN WebRTC Leak, WebRTC prüfen, lokale IP Leak, WebRTC deaktivieren",
      "h1": "WebRTC-Leak-Test",
      "og_sub": "Zeigt WebRTC Ihre echte IP?",
      "intro": "Videoanrufe im Browser laufen über WebRTC, und jede Seite kann es ohne Nachfrage starten. Es fragt einen STUN-Server per UDP, von welcher Adresse Sie kommen, und viele VPNs und Proxys leiten kein UDP weiter. Hier sind die Adressen, die WebRTC verrät, verglichen mit der, die Websites sehen.",
      "focus_h": "Ihre WebRTC-Adressen",
      "docs": [
        [
          "Was ist ein WebRTC-Leak?",
          "Um einen Anruf aufzubauen, sammelt WebRTC jede Adresse, unter der Sie erreichbar sind: die lokalen Ihrer Netzwerkkarte und die öffentliche, die ein STUN-Server sieht. Eine Seite liest sie mit ein paar Zeilen Skript, ohne Erlaubnis. Leitet Ihr VPN oder Proxy nur die Webanfragen der Seite weiter, geht die STUN-Anfrage über Ihre eigene Leitung, und die Seite erfährt Ihre echte IP hinter dem VPN."
        ],
        [
          "Wie funktioniert dieser Test?",
          "Die Seite öffnet eine WebRTC-Verbindung zu den STUN-Servern von Cloudflare und Google, listet die gemeldeten Adressen (srflx-Kandidaten) und vergleicht sie mit denen, die diese Website, Ihre anderen Ausgänge und der IPv6-Test sehen. Eine Adresse, die keiner davon zeigt, ist ein Leak. Die lokalen Adressen stammen aus den host-Kandidaten; nichts wird gespeichert oder gesendet."
        ],
        [
          "Wie behebe ich einen WebRTC-Leak?",
          "Proxy-Clients (Clash, V2Ray und andere): TUN-Modus einschalten, damit auch UDP durch den Proxy geht. Chrome und Edge: die Erweiterung WebRTC Network Limiter oder in uBlock Origin „Verhindern, dass WebRTC lokale IP-Adressen preisgibt“. Brave: Einstellungen → Datenschutz → WebRTC-IP-Verarbeitungsrichtlinie → Nicht über Proxy geleitetes UDP deaktivieren. Firefox: in about:config media.peerconnection.ice.default_address_only auf true, oder media.peerconnection.enabled auf false, um WebRTC abzuschalten. Dann den Test wiederholen."
        ],
        [
          "Ist eine lokale Adresse oder ein .local-Name ein Leak?",
          "Ein Name auf .local heißt, der Browser versteckt Ihre lokale Adresse (mDNS) – genau das wollen Sie. Eine echte lokale Adresse wie 192.168.1.5 verrät nicht, wo Sie sind, macht Ihren Fingerabdruck aber einzigartiger. Eine IPv6-Adresse, die von Ihrem IPv4-Ausgang abweicht, ist nur dann ein Leak, wenn sie nicht Ihr IPv6-Ausgang ist: Der Test vergleicht sie mit der IPv6-Adresse, die Websites sehen."
        ]
      ]
    },
    "pt": {
      "seo_title": "Teste de vazamento WebRTC: o WebRTC mostra seu IP real? · Quem é você?",
      "seo_desc": "Teste de vazamento WebRTC grátis: os endereços IPv4 e IPv6 públicos e os locais que o WebRTC entrega a qualquer site, comparados com o IP que sua VPN ou proxy mostra. Se forem diferentes, o WebRTC vaza seu IP real. Com como corrigir no Chrome, Firefox, Brave e clientes proxy.",
      "seo_kw": "teste de vazamento WebRTC, vazamento WebRTC, WebRTC leak test, vazamento de IP WebRTC, VPN vazamento WebRTC, verificar WebRTC, vazamento de IP local, desativar WebRTC",
      "h1": "Teste de vazamento WebRTC",
      "og_sub": "O WebRTC mostra seu IP real?",
      "intro": "Chamadas de vídeo no navegador usam WebRTC, e qualquer página pode iniciá-lo sem pedir. Ele pergunta a um servidor STUN, por UDP, de qual endereço você vem, e muitas VPNs e proxies não transportam UDP. Aqui estão os endereços que o WebRTC revela, comparados com o que os sites veem.",
      "focus_h": "Seus endereços WebRTC",
      "docs": [
        [
          "O que é um vazamento WebRTC?",
          "Para montar uma chamada, o WebRTC reúne todos os endereços em que você pode ser alcançado: os locais da sua placa de rede e o público que um servidor STUN vê. Uma página os lê com poucas linhas de script, sem permissão. Se sua VPN ou proxy só leva as requisições web da página, a consulta STUN sai pela sua própria linha e a página descobre seu IP real por trás da VPN."
        ],
        [
          "Como este teste funciona?",
          "A página abre uma conexão WebRTC com os servidores STUN da Cloudflare e do Google, lista os endereços que eles devolvem (candidatos srflx) e os compara com o que este site, suas outras saídas e o teste de IPv6 veem. Um endereço que nenhum deles mostra é um vazamento. Os endereços locais vêm dos candidatos host; nada é guardado nem enviado."
        ],
        [
          "Como corrijo um vazamento WebRTC?",
          "Clientes proxy (Clash, V2Ray e outros): ative o modo TUN para que o UDP também passe pelo proxy. Chrome e Edge: a extensão WebRTC Network Limiter, ou no uBlock Origin \"Impedir que o WebRTC vaze endereços IP locais\". Brave: Configurações → Privacidade → Política de tratamento de IP do WebRTC → Desativar UDP sem proxy. Firefox: em about:config, defina media.peerconnection.ice.default_address_only como true, ou media.peerconnection.enabled como false para desligar o WebRTC. Depois, teste de novo."
        ],
        [
          "Um endereço local ou um nome .local é vazamento?",
          "Um nome terminado em .local é o navegador escondendo seu endereço local (mDNS), que é o que você quer. Um endereço local real como 192.168.1.5 não revela onde você está, mas deixa sua impressão digital mais única. Um IPv6 diferente da sua saída IPv4 só é vazamento se não for a sua saída IPv6: o teste o compara com o IPv6 que os sites veem."
        ]
      ]
    },
    "ru": {
      "seo_title": "Проверка утечки WebRTC: видно ли через WebRTC ваш настоящий IP? · Кто вы?",
      "seo_desc": "Бесплатная проверка утечки WebRTC: публичные IPv4- и IPv6-адреса и локальные адреса, которые WebRTC отдаёт любому сайту, в сравнении с IP, который показывает ваш VPN или прокси. Если они не совпадают, WebRTC выдаёт ваш настоящий IP. С инструкциями для Chrome, Firefox, Brave и прокси-клиентов.",
      "seo_kw": "проверка утечки WebRTC, утечка WebRTC, WebRTC leak test, утечка IP через WebRTC, VPN утечка WebRTC, проверить WebRTC, утечка локального IP, отключить WebRTC",
      "h1": "Проверка утечки WebRTC",
      "og_sub": "Видно ли через WebRTC ваш настоящий IP?",
      "intro": "Видеозвонки в браузере работают через WebRTC, и любая страница может запустить его без спроса. Он спрашивает STUN-сервер по UDP, с какого адреса вы пришли, а многие VPN и прокси UDP не пропускают. Вот адреса, которые выдаёт WebRTC, в сравнении с тем, что видят сайты.",
      "focus_h": "Ваши адреса WebRTC",
      "docs": [
        [
          "Что такое утечка WebRTC?",
          "Чтобы установить звонок, WebRTC собирает все адреса, по которым с вами можно связаться: локальные адреса сетевой карты и публичный адрес, который видит STUN-сервер. Страница читает их парой строк скрипта, без разрешения. Если VPN или прокси пропускает только веб-запросы страницы, запрос к STUN уходит по вашей собственной линии, и страница узнаёт ваш настоящий IP за VPN."
        ],
        [
          "Как работает эта проверка?",
          "Страница открывает WebRTC-соединение со STUN-серверами Cloudflare и Google, перечисляет адреса, которые они вернули (кандидаты srflx), и сравнивает их с адресом, который видят этот сайт, ваши другие выходы и тест IPv6. Адрес, которого нет ни у одного из них, — утечка. Локальные адреса берутся из кандидатов host; ничего не сохраняется и не отправляется."
        ],
        [
          "Как устранить утечку WebRTC?",
          "Прокси-клиенты (Clash, V2Ray и другие): включите режим TUN, чтобы UDP тоже шёл через прокси. Chrome и Edge: расширение WebRTC Network Limiter или в uBlock Origin «Предотвращать утечку локальных IP-адресов через WebRTC». Brave: Настройки → Конфиденциальность → Политика обработки IP WebRTC → Отключить UDP без прокси. Firefox: в about:config задайте media.peerconnection.ice.default_address_only = true или media.peerconnection.enabled = false, чтобы выключить WebRTC. Затем проверьте ещё раз."
        ],
        [
          "Локальный адрес или имя .local — это утечка?",
          "Имя на .local означает, что браузер прячет ваш локальный адрес (mDNS), — так и должно быть. Настоящий локальный адрес вроде 192.168.1.5 не выдаёт, где вы, но делает отпечаток уникальнее. IPv6-адрес, отличный от вашего IPv4-выхода, — утечка, только если это не ваш IPv6-выход: проверка сравнивает его с IPv6-адресом, который видят сайты."
        ]
      ]
    }
  },
};
