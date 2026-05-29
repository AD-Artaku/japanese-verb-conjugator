const translations_devlog = {

  // =====================
  // ja — Japanese
  // =====================
  ja: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "概要：",
    label_problem:  "課題：",
    label_solution: "対応：",
    label_image:    "画像：",

    // Devlog badges
    badge_new:      "新機能",
    badge_bug:      "バグ修正",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "バックエンド",
    badge_quality:  "品質改善",
    badge_optimize: "最適化",

    // =====================
    // ver.1.0.7
    // =====================
    v107_title:    "ver.1.0.7 アップデート: 「Starry Dreams - 星空に夢中」",
    v107_summary:  "「Starry Dreams - 星空に夢中」という新しいデザインテーマへUIを更新しました。",
    v107_problem:  "今回のデザインでは、「ヴィンテージ感」「夢のような柔らかさ」「静かな存在感」をテーマとして設計しています。<br><br>特に意識したポイントは、「硬いエッジ」と「柔らかいエッジ」のバランス、そしてUI全体におけるテクスチャ表現の密度バランスです。柔らかい光やガラス表現を使いながらも、単に曖昧で淡いだけのデザインにならないよう、コントラストや輪郭感を意識して調整を行いました。",
    v107_solution: "また、このデザインは、今後さらに発展させていく予定の「Liquid Glass」スタイルとも相性が良くなるよう設計しています。現在は、その表現をより高い完成度で実装するために、新しいツールや技術についても学習を進めています。",

    // =====================
    // ver.1.0.6
    // =====================
    v106_title:    "ver.1.0.6 アップデート：「Devログ」",
    v106_summary:  "Devログのページを追加しました。",
    v106_problem:  "まだ開発経験が浅いため、このWebサイトには多くのバグや未完成な部分があります。しかし、だからこそ、自分の考え方や学習過程も含めて記録として残していきたいと思いました。<br><br>もしミスや改善点などを見つけた場合は、ぜひホームページ内の「お問い合わせ」から気軽にご連絡いただけると嬉しいです。今回のチャレンジは、新しいUIを設計することに加え、「単一ページ構成のWebサイトから、どのように複数ページ構成へ拡張していくか」を学ぶことでした。",
    v106_solution: "実際に実装してみると、プログラム側の構造は思っていたよりシンプルでした。新しいページは基本的に新規HTMLファイルとして追加し、それに合わせてCSSやルーティング処理も更新していきます。<br><br>当時は、Webサイトというものをまだ完全には理解できていませんでした。自分の中では、「Webサイトは、縦にとても長いページを持つ本のようなもの」という感覚でした。ユーザーはその一部分だけを拡大して見ていて、別のページへ移動すると、app.py 内の「目次」のようなルーティング処理を参照して、目的のページを探し出しているのだと理解していました。",

    // =====================
    // ver.1.0.5
    // =====================
    v105_title:    "ver.1.0.5 アップデート：「ひらがな優先表記に対応」",
    v105_summary:  "ひらがなを入力場合、一般的でない漢字への自動変換を防止しました。",
    v105_problem:  "ひらがな入力時、一部の動詞が一般的でない漢字へ自動変換されてしまう不具合を修正しました。<br><br>例えば、「ある」「できる」「いらっしゃる」などが、それぞれ「有る」「出来る」「居らっしゃる」に変換されていました。<br><br>この問題は、以前追加した「ひらがな入力時の自動漢字変換機能」に起因するものでした。当時は、実装した機能が実際にユーザー環境でどのように使用されるかという視点がまだ十分ではありませんでした。<br><br>ただ、今回この不具合を早期に発見・修正できたことは非常に良かったと感じています。ユーザーの皆様に大きな影響が出る前に対応できていれば幸いです。",
    v105_solution: "まず、「ひらがな表記が一般的な動詞かどうか」を判定する処理を、JP_Verb_Conjugator_v3.py 内の動詞変換ロジックに追加しました。そのうえで、app.py 側では、入力された単語を変換処理へ渡す前に事前チェックを行うよう修正しています。具体的には、「ひらがなのまま保持する単語リスト」を用意し、そのリストに含まれる単語は漢字変換を行わず、ひらがなのまま活用処理へ渡す仕様に変更しました。<br><br>一方、リストに含まれていない単語については、従来通り漢字表記へ自動変換されます。この対策により、「たべる」は「食べる」へ変換される一方で、「いらっしゃる」のような単語は、ひらがなのまま自然に活用されるようになりました。",

    // =====================
    // ver.1.0.3
    // =====================
    v103_title:    "ver.1.0.3 アップデート：「モバイルUIUX更新」",
    v103_summary:  "前に、デスクトップ向けなWebサイトがモバイルバージョンが追加させました。",
    v103_problem:  "このプロジェクトのき起源はほとんどにだてのPythonを最初に勉強するために小さいローカルアプリケーションでした。だが、この元々のプロジェクトの挙句、ちょっと寂しかったです。あの最初のいー週間は楽しすぎたり、勉強もなったりからこのプロジェクトをみんなの勉強になるように公開したかったです。<br><br>だから、このサイトはもともとデスクトップ向けました。でも、ユーザー様方はたぶんパソコンが持っていない方が多いと、日本語クラスの中で動詞の接続を確認したい場合もあると思いました。この気持ちから、二日目にモバイルのデザインとバグを早めにやり直しました。",
    v103_solution: "モバイルUIは、デスクトップUIとは大きく異なります。文字サイズだけでなく、画像のアスペクト比やレイアウトも、モバイル向けに最適化する必要がありました。<br><br>そこで、以前Webデザインの仕事で使用していたデザインシステムを改めて見直し、モバイル用のサイズ調整を素早く行えるよう対応しました。その後、新しいヘッダーやハンバーガーメニューのデザインを進めていた際に、少し厄介なバグにも遭遇しました。本来、ナビゲーションメニューはポップアップ外をタップすると閉じる仕様だったのですが、モバイル対応初日の時点では、ヘッダー領域内でしか正常に閉じることができませんでした。<br><br>しかし、二日ほど試行錯誤を続ける中で、「z-index」の仕組みが原因であることを発見しました。ポップアップメニューをヘッダーの 隣外へ移動することで、無事に問題を解決することができました。フロントエンド構造とCSSのレイヤー管理について、多くを学べた良い経験だったと思います。",

    // =====================
    // ver.1.0.0
    // =====================
    v100_title:    "ver.1.0.0 公式リリース：「日本語動詞変換ツール」",
    v100_summary:  "辞書形の動詞を入力すると、よく使われる11種類の活用形を一覧表示するWebアプリです。",
    v100_problem:  "既存の日本語動詞変換サイトは、広告が多く、情報設計やUIの面でも使いづらさを感じることがありました。",
    v100_solution: "「自分自身が本当に使いたいと思える動詞変換ツールを作れないか？」という発想から、本プロジェクトを制作しました。",
  },

  // =====================
  // en — English
  // =====================
  en: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Summary:",
    label_problem:  "Problem:",
    label_solution: "Solution:",
    label_image:    "Image:",

    // Devlog badges
    badge_new:      "New Feature",
    badge_bug:      "Bug Fix",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Quality",
    badge_optimize: "Optimize",

    // =====================
    // ver.1.0.7
    // =====================
    v107_title:    "ver.1.0.7 Update: \"Starry Dreams\"",
    v107_summary:  "Updated the UI to the new design theme \"Starry Dreams.\"",
    v107_problem:  "This design was built around three core ideas: a vintage feel, a dreamy softness, and a quiet presence.<br><br>The key challenge was balancing hard and soft edges, and managing the density of texture throughout the UI. While using soft light and glass-like effects, I had to make sure the design didn't feel simply vague or washed out — so I paid careful attention to contrast and definition.",
    v107_solution: "The design was also built with future compatibility in mind — specifically to work well with the \"Liquid Glass\" style I plan to develop further. I'm currently studying new tools and techniques to implement that aesthetic at a higher level of quality.",

    // =====================
    // ver.1.0.6
    // =====================
    v106_title:    "ver.1.0.6 Update: Dev Log",
    v106_summary:  "Added the Dev Log page.",
    v106_problem:  "Since I'm still early in my development journey, this site has bugs and unfinished parts. But that's exactly why I wanted to document my thought process and learning along the way.<br><br>If you spot any mistakes or areas for improvement, please feel free to reach out through the Contact section on the homepage. The challenge this time wasn't just designing a new UI — it was learning how to expand a single-page site into a multi-page one.",
    v106_solution: "When I actually implemented it, the structure on the code side was simpler than I expected. New pages are essentially added as new HTML files, with corresponding CSS and routing updates.<br><br>At the time, I didn't fully understand what a website actually was. My mental model was something like: \"A website is like a book with a very long vertical page.\" The user zooms into just one part of it, and when they navigate to a different page, the routing logic in app.py acts like a table of contents to find the right destination.",

    // =====================
    // ver.1.0.5
    // =====================
    v105_title:    "ver.1.0.5 Update: Hiragana-Preferred Display",
    v105_summary:  "Prevented automatic conversion to uncommon kanji when hiragana is entered.",
    v105_problem:  "When entering hiragana, some verbs were being automatically converted to uncommon kanji representations.<br><br>For example, \"ある\", \"できる\", and \"いらっしゃる\" were being converted to \"有る\", \"出来る\", and \"居らっしゃる\" respectively.<br><br>This issue stemmed from the automatic kanji conversion feature added earlier. At the time, I didn't yet have enough perspective on how a feature would actually be used in a real user environment.<br><br>That said, I'm really glad this was caught and fixed early — hopefully before it had a meaningful impact on anyone.",
    v105_solution: "First, I added logic to JP_Verb_Conjugator_v3.py to check whether a verb is commonly written in hiragana. Then, in app.py, I added a pre-check before passing input to the conversion logic.<br><br>Specifically, I created a list of words that should stay in hiragana, and those words are passed directly to the conjugation engine without kanji conversion. Words not on the list continue to be converted as before.<br><br>With this fix, \"たべる\" still becomes \"食べる\", while \"いらっしゃる\" conjugates naturally in hiragana.",

    // =====================
    // ver.1.0.3
    // =====================
    v103_title:    "ver.1.0.3 Update: Mobile UI/UX Overhaul",
    v103_summary:  "Added a mobile version to what was originally a desktop-only website.",
    v103_problem:  "This project started as a small local app to practice Python. But after putting in that first exciting week of work, I felt it was too good to keep to myself — I wanted to share it as a learning tool for others.<br><br>The site was originally built for desktop. But I realized many users probably don't have a laptop nearby, and someone in a Japanese class might want to look up conjugations on their phone. That feeling pushed me to tackle the mobile redesign early, on day two.",
    v103_solution: "Mobile UI is quite different from desktop — it's not just font sizes, but aspect ratios and layouts that all need rethinking for smaller screens.<br><br>I revisited the design system I'd used in past web design work and adapted it for mobile sizing. While working on the new header and hamburger menu, I ran into a frustrating bug: the navigation menu was supposed to close when tapping outside it, but on day one of mobile support it would only close when tapping inside the header area.<br><br>After a couple of days of trial and error, I traced the issue to z-index layering. Moving the popup menu outside the header element resolved it. It was a great lesson in frontend structure and CSS layer management.",

    // =====================
    // ver.1.0.0
    // =====================
    v100_title:    "ver.1.0.0 Official Release: Japanese Verb Conjugator",
    v100_summary:  "A web app that takes a verb in dictionary form and displays 11 commonly used conjugations.",
    v100_problem:  "Existing Japanese verb conjugation sites felt cluttered with ads and were often poorly organized or difficult to use.",
    v100_solution: "The project came from a simple question: could I build a verb conjugation tool that I'd actually want to use myself?",
  },

  // =====================
  // zh — Chinese (Simplified)
  // =====================
  zh: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "概要：",
    label_problem:  "问题：",
    label_solution: "解决：",
    label_image:    "图片：",

    // Devlog badges
    badge_new:      "新功能",
    badge_bug:      "修复Bug",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "后端",
    badge_quality:  "质量改善",
    badge_optimize: "优化",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 更新：「Starry Dreams - 星空入梦」",
    v107_summary:  "将UI更新为全新设计主题「Starry Dreams - 星空入梦」。",
    v107_problem:  "本次设计围绕三个核心主题展开：复古感、梦幻般的柔和，以及静谧的存在感。<br><br>重点在于平衡「硬边」与「软边」之间的关系，以及整体UI中纹理表现的密度。在使用柔和光线和玻璃效果的同时，我需要确保设计不会显得过于模糊或淡薄，因此在对比度和轮廓感上进行了细心调整。",
    v107_solution: "此外，该设计也考虑到了未来与「Liquid Glass」风格的兼容性。目前正在学习新工具和技术，以便以更高的质量实现这种视觉表现。",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 更新：「开发日志」",
    v106_summary:  "新增了开发日志页面。",
    v106_problem:  "由于开发经验尚浅，本站仍存在不少Bug和未完善的地方。但正因如此，我想将自己的思考过程和学习记录下来。<br><br>如果发现任何问题或改进建议，欢迎通过主页的「联系我们」随时告知。这次的挑战除了设计新UI之外，还包括学习如何将单页网站扩展为多页结构。",
    v106_solution: "实际实现后发现，代码层面的结构比预想的简单。新页面基本上以新的HTML文件形式添加，同时更新对应的CSS和路由处理。<br><br>当时我对网站的理解还不完整。我的心理模型是：「网站就像一本竖向很长的书，用户只是放大查看其中一部分，跳转到其他页面时，app.py中的路由逻辑就像目录一样指引到目标页面。」",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 更新：「平假名优先显示」",
    v105_summary:  "修复了输入平假名时自动转换为非常用汉字的问题。",
    v105_problem:  "输入平假名时，部分动词会被自动转换为非常用汉字。<br><br>例如「ある」「できる」「いらっしゃる」分别被转换为「有る」「出来る」「居らっしゃる」。<br><br>这个问题源于之前添加的平假名自动转换汉字功能。当时对于功能在真实用户环境中如何使用，还没有足够的预判。<br><br>不过，能够尽早发现并修复这个问题，感到非常庆幸。希望在影响到大家之前已经处理完毕。",
    v105_solution: "首先，在JP_Verb_Conjugator_v3.py的动词转换逻辑中添加了判断「该动词是否习惯用平假名书写」的处理。然后在app.py中，在将输入传递给转换逻辑之前添加了预检查。<br><br>具体来说，准备了一个「保持平假名的单词列表」，列表中的单词不进行汉字转换，直接以平假名传递给活用处理。不在列表中的单词仍按原来方式自动转换为汉字。<br><br>通过此修复，「たべる」仍会转换为「食べる」，而「いらっしゃる」等单词则以平假名形式自然活用。",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 更新：「移动端UI/UX改版」",
    v103_summary:  "为原本只面向桌面端的网站新增了移动端版本。",
    v103_problem:  "这个项目最初是为了学习Python而开发的小型本地应用。但经过最初那充实的一周后，感觉只留给自己太可惜了，想把它作为学习工具分享给大家。<br><br>网站最初只面向桌面端。但我意识到很多用户可能身边没有电脑，在日语课上也可能想用手机查询动词活用。出于这种想法，我在第二天就着手进行了移动端设计和Bug修复。",
    v103_solution: "移动端UI与桌面端差异显著。不仅是字体大小，图片比例和布局也需要针对小屏幕进行优化。<br><br>我重新审视了以前在Web设计工作中使用的设计系统，并快速完成了移动端尺寸调整。在设计新的导航栏和汉堡菜单时，还遇到了一个棘手的Bug：导航菜单本来应该在点击弹窗外部时关闭，但在移动端适配第一天，只有在点击导航栏区域内时才能正常关闭。<br><br>经过两天的反复尝试，发现问题出在z-index层级上。将弹窗菜单移到导航栏元素之外后，问题得以解决。这是一次关于前端结构和CSS层级管理的宝贵学习经历。",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 正式发布：「日语动词变位工具」",
    v100_summary:  "输入字典形动词，一览显示11种常用活用形的Web应用。",
    v100_problem:  "现有的日语动词变位网站广告多，信息架构和UI设计也不够友好。",
    v100_solution: "「能不能做一个自己真正想用的动词变位工具？」——这个想法成为了本项目的起点。",
  },

  // =====================
  // ko — Korean
  // =====================
  ko: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "개요：",
    label_problem:  "과제：",
    label_solution: "대응：",
    label_image:    "이미지：",

    // Devlog badges
    badge_new:      "새 기능",
    badge_bug:      "버그 수정",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "백엔드",
    badge_quality:  "품질 개선",
    badge_optimize: "최적화",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 업데이트: 「Starry Dreams - 별빛 꿈속」",
    v107_summary:  "새로운 디자인 테마 「Starry Dreams - 별빛 꿈속」으로 UI를 업데이트했습니다.",
    v107_problem:  "이번 디자인은 「빈티지 감성」, 「꿈처럼 부드러운 느낌」, 「조용한 존재감」을 테마로 설계했습니다.<br><br>특히 신경 쓴 부분은 「딱딱한 엣지」와 「부드러운 엣지」의 균형, 그리고 UI 전체에서 텍스처 표현의 밀도 균형입니다. 부드러운 빛이나 유리 효과를 사용하면서도 단순히 흐릿하고 연한 디자인이 되지 않도록 대비와 윤곽감을 의식하며 조정했습니다.",
    v107_solution: "또한 이 디자인은 앞으로 더 발전시켜 나갈 예정인 「Liquid Glass」 스타일과도 잘 어울리도록 설계했습니다. 현재는 그 표현을 더 높은 완성도로 구현하기 위해 새로운 툴과 기술도 학습하고 있습니다.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 업데이트：「개발 로그」",
    v106_summary:  "개발 로그 페이지를 추가했습니다.",
    v106_problem:  "아직 개발 경험이 부족하여 이 웹사이트에는 많은 버그와 미완성 부분이 있습니다. 하지만 그렇기 때문에 오히려 생각의 과정과 학습 기록을 남기고 싶었습니다.<br><br>실수나 개선점을 발견하셨다면 홈페이지의 「문의하기」를 통해 편하게 연락해 주시면 감사하겠습니다. 이번 도전은 새로운 UI를 설계하는 것 외에도 「단일 페이지 구성의 웹사이트를 어떻게 다중 페이지 구성으로 확장할지」를 배우는 것이었습니다.",
    v106_solution: "실제로 구현해 보니 코드 측 구조는 생각보다 단순했습니다. 새로운 페이지는 기본적으로 새 HTML 파일로 추가하고, 이에 맞춰 CSS와 라우팅 처리도 업데이트합니다.<br><br>당시에는 웹사이트가 무엇인지 완전히 이해하지 못했습니다. 「웹사이트는 세로로 매우 긴 페이지를 가진 책 같은 것」이라는 감각이었습니다. 사용자는 그 일부만을 확대해서 보고 있고, 다른 페이지로 이동하면 app.py 내의 「목차」 같은 라우팅 처리를 참조해 목적지 페이지를 찾는다고 이해했습니다.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 업데이트：「히라가나 우선 표기 대응」",
    v105_summary:  "히라가나 입력 시 일반적이지 않은 한자로 자동 변환되는 것을 방지했습니다.",
    v105_problem:  "히라가나 입력 시 일부 동사가 일반적이지 않은 한자로 자동 변환되는 버그를 수정했습니다.<br><br>예를 들어 「ある」「できる」「いらっしゃる」가 각각 「有る」「出来る」「居らっしゃる」로 변환되었습니다.<br><br>이 문제는 이전에 추가한 「히라가나 입력 시 자동 한자 변환 기능」에서 비롯된 것이었습니다. 당시에는 구현한 기능이 실제 사용자 환경에서 어떻게 사용될지에 대한 시각이 아직 부족했습니다.<br><br>다만, 이번에 이 버그를 조기에 발견하고 수정할 수 있었던 것은 매우 잘 됐다고 생각합니다. 사용자 여러분께 큰 영향이 미치기 전에 대응할 수 있었으면 좋겠습니다.",
    v105_solution: "먼저 JP_Verb_Conjugator_v3.py의 동사 변환 로직에 「히라가나 표기가 일반적인 동사인지」를 판정하는 처리를 추가했습니다. 그런 다음 app.py에서 입력된 단어를 변환 처리에 넘기기 전에 사전 확인을 수행하도록 수정했습니다.<br><br>구체적으로는 「히라가나 그대로 유지할 단어 목록」을 만들어, 목록에 포함된 단어는 한자 변환을 하지 않고 히라가나 그대로 활용 처리에 넘기도록 변경했습니다.<br><br>이 조치로 인해 「たべる」는 「食べる」로 변환되는 반면, 「いらっしゃる」 같은 단어는 히라가나 그대로 자연스럽게 활용됩니다.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 업데이트：「모바일 UI/UX 개편」",
    v103_summary:  "원래 데스크톱 전용이었던 웹사이트에 모바일 버전을 추가했습니다.",
    v103_problem:  "이 프로젝트의 기원은 Python을 처음 공부하기 위한 작은 로컬 애플리케이션이었습니다. 하지만 첫 일주일이 너무 즐겁고 많이 배워서 이 프로젝트를 모두의 학습에 도움이 되도록 공개하고 싶었습니다.<br><br>그래서 이 사이트는 원래 데스크톱 전용이었습니다. 하지만 사용자 중 노트북이 없는 분도 많고, 일본어 수업 중에 스마트폰으로 동사 활용을 확인하고 싶은 경우도 있을 것이라고 생각했습니다. 이런 마음에서 이틀째에 모바일 디자인과 버그를 서둘러 수정했습니다.",
    v103_solution: "모바일 UI는 데스크톱 UI와 크게 다릅니다. 글꼴 크기뿐만 아니라 이미지 비율이나 레이아웃도 모바일에 최적화할 필요가 있었습니다.<br><br>이전에 웹 디자인 업무에서 사용했던 디자인 시스템을 다시 검토하여 모바일용 크기 조정을 빠르게 진행했습니다. 그 후 새로운 헤더와 햄버거 메뉴 디자인을 진행하던 중 약간 까다로운 버그를 만났습니다. 원래 내비게이션 메뉴는 팝업 외부를 탭하면 닫히는 사양이었지만, 모바일 대응 첫날에는 헤더 영역 내에서만 정상적으로 닫을 수 있었습니다.<br><br>그러나 이틀 정도 시행착오를 거듭하는 과정에서 「z-index」 구조가 원인임을 발견했습니다. 팝업 메뉴를 헤더 요소 밖으로 이동함으로써 문제를 해결할 수 있었습니다. 프론트엔드 구조와 CSS 레이어 관리에 대해 많이 배울 수 있었던 좋은 경험이었습니다.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 공식 릴리즈：「일본어 동사 활용 도구」",
    v100_summary:  "사전형 동사를 입력하면 자주 사용되는 11가지 활용형을 목록으로 표시하는 웹앱입니다.",
    v100_problem:  "기존 일본어 동사 변환 사이트는 광고가 많고 정보 구조나 UI 면에서도 사용하기 불편함을 느꼈습니다.",
    v100_solution: "「자신이 정말 사용하고 싶은 동사 변환 도구를 만들 수 없을까？」라는 발상에서 본 프로젝트를 제작했습니다.",
  },

  // =====================
  // es — Spanish
  // =====================
  es: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Resumen:",
    label_problem:  "Problema:",
    label_solution: "Solución:",
    label_image:    "Imagen:",

    // Devlog badges
    badge_new:      "Nueva función",
    badge_bug:      "Corrección",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Calidad",
    badge_optimize: "Optimización",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 Actualización: \"Starry Dreams\"",
    v107_summary:  "Se actualizó la interfaz al nuevo tema de diseño \"Starry Dreams.\"",
    v107_problem:  "Este diseño se construyó en torno a tres ideas principales: sensación vintage, suavidad soñadora y una presencia tranquila.<br><br>El desafío clave fue equilibrar los bordes duros y suaves, y gestionar la densidad de las texturas en toda la interfaz. Al usar efectos de luz suave y vidrio, tuve que asegurarme de que el diseño no se sintiera simplemente vago o desvaído, por lo que presté atención al contraste y la definición.",
    v107_solution: "El diseño también se pensó para ser compatible con el estilo \"Liquid Glass\" que planeo desarrollar más adelante. Actualmente estoy estudiando nuevas herramientas y técnicas para implementar esa estética con mayor calidad.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 Actualización: Registro Dev",
    v106_summary:  "Se añadió la página de Registro Dev.",
    v106_problem:  "Dado que todavía soy principiante en desarrollo, este sitio tiene bugs y partes incompletas. Pero precisamente por eso quise documentar mi proceso de pensamiento y aprendizaje.<br><br>Si detectas errores o áreas de mejora, no dudes en contactarme desde la sección de Contacto. El desafío esta vez no fue solo diseñar una nueva interfaz, sino aprender a expandir un sitio de una sola página a múltiples páginas.",
    v106_solution: "Al implementarlo, la estructura del código resultó más sencilla de lo esperado. Las nuevas páginas se añaden básicamente como nuevos archivos HTML, actualizando el CSS y el enrutamiento correspondientes.<br><br>En ese momento, no entendía completamente qué era un sitio web. Mi modelo mental era algo así: \"Un sitio web es como un libro con una página vertical muy larga.\" El usuario amplía solo una parte, y al navegar a otra página, la lógica de enrutamiento en app.py actúa como un índice para encontrar el destino.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 Actualización: Visualización preferida en hiragana",
    v105_summary:  "Se evitó la conversión automática a kanji poco comunes al ingresar hiragana.",
    v105_problem:  "Al ingresar hiragana, algunos verbos se convertían automáticamente a representaciones poco comunes en kanji.<br><br>Por ejemplo, \"ある\", \"できる\" e \"いらっしゃる\" se convertían en \"有る\", \"出来る\" y \"居らっしゃる\" respectivamente.<br><br>El problema se originó en la función de conversión automática de kanji añadida anteriormente. En ese momento, aún no tenía suficiente perspectiva sobre cómo se usaría la función en un entorno real.<br><br>De todos modos, me alegra mucho haberlo detectado y corregido a tiempo.",
    v105_solution: "Primero, añadí lógica en JP_Verb_Conjugator_v3.py para verificar si un verbo se escribe habitualmente en hiragana. Luego, en app.py, agregué una verificación previa antes de pasar la entrada a la lógica de conversión.<br><br>Concretamente, creé una lista de palabras que deben mantenerse en hiragana, y esas palabras se pasan directamente al motor de conjugación sin conversión. Las palabras que no están en la lista siguen convirtiéndose como antes.<br><br>Con esta corrección, \"たべる\" sigue convirtiéndose en \"食べる\", mientras que \"いらっしゃる\" se conjuga naturalmente en hiragana.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 Actualización: Renovación de UI/UX móvil",
    v103_summary:  "Se añadió una versión móvil a lo que originalmente era un sitio solo para escritorio.",
    v103_problem:  "Este proyecto comenzó como una pequeña aplicación local para practicar Python. Pero después de esa primera semana tan emocionante, sentí que sería una pena guardarlo solo para mí — quería compartirlo como herramienta de aprendizaje.<br><br>El sitio fue pensado originalmente para escritorio. Pero me di cuenta de que muchos usuarios probablemente no tienen un ordenador cerca, y que alguien en una clase de japonés podría querer consultar conjugaciones desde el teléfono. Eso me impulsó a abordar el rediseño móvil el segundo día.",
    v103_solution: "La UI móvil es muy diferente a la de escritorio: no solo los tamaños de fuente, sino también las proporciones de imagen y los layouts necesitan ajustarse para pantallas pequeñas.<br><br>Revisé el sistema de diseño que había usado en trabajos anteriores de diseño web y lo adapté para móvil. Al trabajar en el nuevo encabezado y el menú hamburguesa, encontré un bug molesto: el menú de navegación debía cerrarse al tocar fuera de él, pero el primer día solo se cerraba dentro del área del encabezado.<br><br>Tras dos días de prueba y error, encontré que el problema era el z-index. Mover el menú popup fuera del elemento del encabezado lo resolvió. Fue una gran lección sobre la estructura del frontend y la gestión de capas en CSS.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 Lanzamiento oficial: Conjugador de Verbos Japoneses",
    v100_summary:  "Una app web que toma un verbo en forma diccionario y muestra 11 conjugaciones de uso común.",
    v100_problem:  "Los sitios existentes de conjugación de verbos japoneses estaban llenos de anuncios y solían ser desorganizados o difíciles de usar.",
    v100_solution: "El proyecto surgió de una simple pregunta: ¿podría construir una herramienta de conjugación que yo mismo quisiera usar?",
  },

  // =====================
  // pt — Portuguese
  // =====================
  pt: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Resumo:",
    label_problem:  "Problema:",
    label_solution: "Solução:",
    label_image:    "Imagem:",

    // Devlog badges
    badge_new:      "Nova função",
    badge_bug:      "Correção",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Qualidade",
    badge_optimize: "Otimização",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 Atualização: \"Starry Dreams\"",
    v107_summary:  "A interface foi atualizada para o novo tema de design \"Starry Dreams.\"",
    v107_problem:  "Este design foi construído em torno de três ideias centrais: sensação vintage, suavidade onírica e uma presença tranquila.<br><br>O principal desafio foi equilibrar bordas duras e suaves, e gerenciar a densidade de texturas em toda a interface. Ao usar efeitos de luz suave e vidro, precisei garantir que o design não ficasse simplesmente vago ou desbotado, então prestei atenção ao contraste e à definição.",
    v107_solution: "O design também foi pensado para ser compatível com o estilo \"Liquid Glass\" que planejo desenvolver mais adiante. Atualmente estou estudando novas ferramentas e técnicas para implementar essa estética com maior qualidade.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 Atualização: Diário Dev",
    v106_summary:  "A página de Diário Dev foi adicionada.",
    v106_problem:  "Como ainda sou iniciante em desenvolvimento, este site tem bugs e partes incompletas. Mas é exatamente por isso que quis documentar meu processo de pensamento e aprendizado.<br><br>Se encontrar erros ou sugestões de melhoria, sinta-se à vontade para entrar em contato pela seção de Contato. O desafio desta vez não foi apenas criar uma nova interface, mas aprender a expandir um site de página única para múltiplas páginas.",
    v106_solution: "Ao implementar, a estrutura do código foi mais simples do que esperava. Novas páginas são basicamente adicionadas como novos arquivos HTML, com as atualizações de CSS e roteamento correspondentes.<br><br>Na época, eu não entendia completamente o que era um site. Meu modelo mental era algo como: \"Um site é como um livro com uma página vertical muito longa.\" O usuário amplia apenas uma parte, e ao navegar para outra página, a lógica de roteamento em app.py age como um índice para encontrar o destino.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 Atualização: Exibição preferencial em hiragana",
    v105_summary:  "Evitada a conversão automática para kanji incomuns ao inserir hiragana.",
    v105_problem:  "Ao inserir hiragana, alguns verbos eram automaticamente convertidos para representações incomuns em kanji.<br><br>Por exemplo, \"ある\", \"できる\" e \"いらっしゃる\" eram convertidos para \"有る\", \"出来る\" e \"居らっしゃる\" respectivamente.<br><br>O problema se originou na função de conversão automática de kanji adicionada anteriormente. Na época, ainda não tinha perspectiva suficiente sobre como a função seria usada em um ambiente real.<br><br>Ainda assim, fico feliz de ter detectado e corrigido isso cedo.",
    v105_solution: "Primeiro, adicionei lógica em JP_Verb_Conjugator_v3.py para verificar se um verbo é habitualmente escrito em hiragana. Em seguida, em app.py, adicionei uma verificação prévia antes de passar a entrada para a lógica de conversão.<br><br>Especificamente, criei uma lista de palavras que devem permanecer em hiragana, e essas palavras são passadas diretamente ao motor de conjugação sem conversão. Palavras que não estão na lista continuam sendo convertidas como antes.<br><br>Com essa correção, \"たべる\" ainda se converte em \"食べる\", enquanto \"いらっしゃる\" se conjuga naturalmente em hiragana.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 Atualização: Reformulação da UI/UX mobile",
    v103_summary:  "Uma versão mobile foi adicionada ao que era originalmente um site apenas para desktop.",
    v103_problem:  "Este projeto começou como um pequeno aplicativo local para praticar Python. Mas depois daquela primeira semana tão animada, senti que seria uma pena guardar só para mim — queria compartilhar como ferramenta de aprendizado.<br><br>O site foi originalmente feito para desktop. Mas percebi que muitos usuários provavelmente não têm um computador por perto, e alguém em uma aula de japonês pode querer consultar conjugações pelo celular. Isso me levou a abordar o redesign mobile no segundo dia.",
    v103_solution: "A UI mobile é bem diferente da desktop: não são apenas os tamanhos de fonte, mas também proporções de imagem e layouts que precisam ser otimizados para telas menores.<br><br>Revisei o sistema de design que havia usado em trabalhos anteriores de web design e o adaptei para mobile. Ao trabalhar no novo cabeçalho e menu hambúrguer, encontrei um bug chato: o menu de navegação deveria fechar ao tocar fora dele, mas no primeiro dia só fechava dentro da área do cabeçalho.<br><br>Após dois dias de tentativa e erro, encontrei que o problema era o z-index. Mover o popup menu para fora do elemento cabeçalho resolveu. Foi uma ótima lição sobre estrutura frontend e gerenciamento de camadas CSS.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 Lançamento oficial: Conjugador de Verbos Japoneses",
    v100_summary:  "Um app web que recebe um verbo na forma dicionário e exibe 11 conjugações de uso comum.",
    v100_problem:  "Os sites existentes de conjugação de verbos japoneses eram cheios de anúncios e geralmente mal organizados ou difíceis de usar.",
    v100_solution: "O projeto veio de uma pergunta simples: eu poderia construir uma ferramenta de conjugação que eu mesmo quisesse usar?",
  },

  // =====================
  // fr — French
  // =====================
  fr: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Résumé :",
    label_problem:  "Problème :",
    label_solution: "Solution :",
    label_image:    "Image :",

    // Devlog badges
    badge_new:      "Nouvelle fonction",
    badge_bug:      "Correction",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Qualité",
    badge_optimize: "Optimisation",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 Mise à jour : \"Starry Dreams\"",
    v107_summary:  "L'interface a été mise à jour avec le nouveau thème de design \"Starry Dreams.\"",
    v107_problem:  "Ce design a été construit autour de trois idées principales : une sensation vintage, une douceur onirique et une présence tranquille.<br><br>Le défi clé était d'équilibrer les bords durs et doux, et de gérer la densité des textures dans l'ensemble de l'interface. En utilisant des effets de lumière douce et de verre, je devais m'assurer que le design ne paraisse pas simplement vague ou délavé — j'ai donc porté une attention particulière au contraste et à la définition.",
    v107_solution: "Le design a également été pensé pour être compatible avec le style \"Liquid Glass\" que je prévois de développer davantage. J'étudie actuellement de nouveaux outils et techniques pour implémenter cette esthétique avec une meilleure qualité.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 Mise à jour : Journal Dev",
    v106_summary:  "La page Journal Dev a été ajoutée.",
    v106_problem:  "Comme je suis encore débutant en développement, ce site présente des bugs et des parties incomplètes. Mais c'est précisément pour cela que je voulais documenter mon processus de réflexion et d'apprentissage.<br><br>Si vous repérez des erreurs ou des points à améliorer, n'hésitez pas à me contacter via la section Contact. Le défi cette fois n'était pas seulement de concevoir une nouvelle interface, mais d'apprendre à étendre un site d'une seule page vers plusieurs pages.",
    v106_solution: "En l'implémentant, la structure du code s'est avérée plus simple que prévu. Les nouvelles pages sont essentiellement ajoutées comme de nouveaux fichiers HTML, avec les mises à jour CSS et de routage correspondantes.<br><br>À l'époque, je ne comprenais pas complètement ce qu'était un site web. Mon modèle mental était quelque chose comme : \"Un site web est comme un livre avec une page verticale très longue.\" L'utilisateur zoome sur une partie seulement, et en naviguant vers une autre page, la logique de routage dans app.py agit comme une table des matières pour trouver la destination.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 Mise à jour : Affichage préférentiel en hiragana",
    v105_summary:  "Prévention de la conversion automatique vers des kanji peu courants lors de la saisie en hiragana.",
    v105_problem:  "Lors de la saisie en hiragana, certains verbes étaient automatiquement convertis en représentations kanji peu courantes.<br><br>Par exemple, \"ある\", \"できる\" et \"いらっしゃる\" étaient convertis en \"有る\", \"出来る\" et \"居らっしゃる\" respectivement.<br><br>Ce problème provenait de la fonction de conversion automatique en kanji ajoutée précédemment. À l'époque, je n'avais pas encore assez de recul sur la façon dont la fonctionnalité serait utilisée dans un environnement réel.<br><br>Je suis néanmoins soulagé d'avoir pu détecter et corriger cela tôt.",
    v105_solution: "D'abord, j'ai ajouté une logique dans JP_Verb_Conjugator_v3.py pour vérifier si un verbe s'écrit habituellement en hiragana. Ensuite, dans app.py, j'ai ajouté une vérification préalable avant de passer l'entrée à la logique de conversion.<br><br>Concrètement, j'ai créé une liste de mots devant rester en hiragana, et ces mots sont transmis directement au moteur de conjugaison sans conversion. Les mots ne figurant pas sur la liste continuent d'être convertis comme avant.<br><br>Avec cette correction, \"たべる\" est toujours converti en \"食べる\", tandis que \"いらっしゃる\" se conjugue naturellement en hiragana.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 Mise à jour : Refonte de l'UI/UX mobile",
    v103_summary:  "Une version mobile a été ajoutée à ce qui était à l'origine un site uniquement pour ordinateur.",
    v103_problem:  "Ce projet a commencé comme une petite application locale pour pratiquer Python. Mais après cette première semaine si stimulante, il m'a semblé dommage de le garder pour moi — je voulais le partager comme outil d'apprentissage.<br><br>Le site était à l'origine conçu pour le bureau. Mais j'ai réalisé que beaucoup d'utilisateurs n'ont probablement pas d'ordinateur à portée de main, et que quelqu'un en cours de japonais pourrait vouloir consulter des conjugaisons sur son téléphone. Cela m'a poussé à m'attaquer à la refonte mobile dès le deuxième jour.",
    v103_solution: "L'UI mobile est très différente de la version bureau : ce ne sont pas seulement les tailles de police, mais aussi les proportions d'image et les mises en page qui doivent être optimisées pour les petits écrans.<br><br>J'ai revu le système de design que j'avais utilisé dans mes travaux de design web précédents et je l'ai adapté pour mobile. En travaillant sur le nouveau header et le menu hamburger, j'ai rencontré un bug frustrant : le menu de navigation devait se fermer en tapotant en dehors, mais le premier jour il ne se fermait que dans la zone du header.<br><br>Après deux jours d'essais et d'erreurs, j'ai trouvé que le problème était le z-index. Déplacer le menu popup en dehors de l'élément header a résolu le problème. Ce fut une excellente leçon sur la structure frontend et la gestion des calques CSS.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 Lancement officiel : Conjugueur de Verbes Japonais",
    v100_summary:  "Une application web qui prend un verbe sous forme dictionnaire et affiche 11 conjugaisons couramment utilisées.",
    v100_problem:  "Les sites existants de conjugaison de verbes japonais étaient surchargés de publicités et souvent mal organisés ou difficiles à utiliser.",
    v100_solution: "Le projet est né d'une question simple : pouvais-je construire un outil de conjugaison que je voudrais vraiment utiliser moi-même ?",
  },

  // =====================
  // id — Indonesian
  // =====================
  id: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Ringkasan:",
    label_problem:  "Masalah:",
    label_solution: "Solusi:",
    label_image:    "Gambar:",

    // Devlog badges
    badge_new:      "Fitur Baru",
    badge_bug:      "Perbaikan Bug",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Kualitas",
    badge_optimize: "Optimasi",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 Pembaruan: \"Starry Dreams\"",
    v107_summary:  "UI diperbarui ke tema desain baru \"Starry Dreams.\"",
    v107_problem:  "Desain ini dibangun di sekitar tiga ide utama: nuansa vintage, kelembutan yang seperti mimpi, dan kehadiran yang tenang.<br><br>Tantangan utamanya adalah menyeimbangkan tepi yang keras dan lembut, serta mengelola kepadatan tekstur di seluruh antarmuka. Saat menggunakan efek cahaya lembut dan kaca, saya harus memastikan desain tidak terasa samar atau pudar — sehingga saya memperhatikan kontras dan definisi.",
    v107_solution: "Desain ini juga dirancang agar kompatibel dengan gaya \"Liquid Glass\" yang berencana saya kembangkan lebih lanjut. Saat ini saya sedang mempelajari alat dan teknik baru untuk mengimplementasikan estetika tersebut dengan kualitas yang lebih tinggi.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 Pembaruan: Catatan Dev",
    v106_summary:  "Halaman Catatan Dev telah ditambahkan.",
    v106_problem:  "Karena saya masih pemula dalam pengembangan, situs ini memiliki banyak bug dan bagian yang belum selesai. Tapi justru karena itu, saya ingin mendokumentasikan proses berpikir dan pembelajaran saya.<br><br>Jika menemukan kesalahan atau saran perbaikan, jangan ragu untuk menghubungi melalui bagian Kontak. Tantangan kali ini bukan hanya merancang UI baru, tetapi belajar cara memperluas situs satu halaman menjadi banyak halaman.",
    v106_solution: "Saat mengimplementasikannya, struktur kode ternyata lebih sederhana dari yang diperkirakan. Halaman baru pada dasarnya ditambahkan sebagai file HTML baru, dengan pembaruan CSS dan routing yang sesuai.<br><br>Saat itu, saya belum sepenuhnya memahami apa itu situs web. Model mental saya adalah: \"Situs web seperti buku dengan halaman vertikal yang sangat panjang.\" Pengguna hanya memperbesar satu bagian, dan saat berpindah ke halaman lain, logika routing di app.py bertindak seperti daftar isi untuk menemukan tujuan.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 Pembaruan: Tampilan Hiragana Diutamakan",
    v105_summary:  "Mencegah konversi otomatis ke kanji yang tidak umum saat memasukkan hiragana.",
    v105_problem:  "Saat memasukkan hiragana, beberapa kata kerja dikonversi secara otomatis ke representasi kanji yang tidak umum.<br><br>Misalnya, \"ある\", \"できる\", dan \"いらっしゃる\" dikonversi menjadi \"有る\", \"出来る\", dan \"居らっしゃる\".<br><br>Masalah ini berasal dari fitur konversi kanji otomatis yang ditambahkan sebelumnya. Saat itu, saya belum memiliki cukup perspektif tentang bagaimana fitur tersebut akan digunakan di lingkungan pengguna nyata.<br><br>Meski begitu, saya senang bisa mendeteksi dan memperbaikinya lebih awal.",
    v105_solution: "Pertama, saya menambahkan logika di JP_Verb_Conjugator_v3.py untuk memeriksa apakah kata kerja biasanya ditulis dalam hiragana. Kemudian, di app.py, saya menambahkan pemeriksaan awal sebelum meneruskan input ke logika konversi.<br><br>Secara spesifik, saya membuat daftar kata yang harus tetap dalam hiragana, dan kata-kata tersebut diteruskan langsung ke mesin konjugasi tanpa konversi. Kata-kata yang tidak ada dalam daftar terus dikonversi seperti sebelumnya.<br><br>Dengan perbaikan ini, \"たべる\" masih dikonversi menjadi \"食べる\", sementara \"いらっしゃる\" dikonjugasikan secara alami dalam hiragana.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 Pembaruan: Perombakan UI/UX Mobile",
    v103_summary:  "Versi mobile ditambahkan ke situs yang awalnya hanya untuk desktop.",
    v103_problem:  "Proyek ini dimulai sebagai aplikasi lokal kecil untuk berlatih Python. Tapi setelah seminggu pertama yang begitu menyenangkan, rasanya sayang jika disimpan sendiri — saya ingin membagikannya sebagai alat belajar.<br><br>Situs ini awalnya dibuat untuk desktop. Tapi saya menyadari banyak pengguna yang mungkin tidak memiliki laptop di dekatnya, dan seseorang di kelas bahasa Jepang mungkin ingin memeriksa konjugasi dari ponsel. Hal itu mendorong saya untuk mengerjakan desain ulang mobile di hari kedua.",
    v103_solution: "UI mobile sangat berbeda dari desktop: bukan hanya ukuran font, tetapi juga rasio gambar dan tata letak yang perlu dioptimalkan untuk layar kecil.<br><br>Saya meninjau kembali sistem desain yang pernah digunakan dalam pekerjaan web design sebelumnya dan mengadaptasinya untuk mobile. Saat mengerjakan header baru dan menu hamburger, saya menemukan bug yang menjengkelkan: menu navigasi seharusnya menutup saat mengetuk di luar, tapi pada hari pertama hanya menutup di dalam area header.<br><br>Setelah dua hari mencoba, saya menemukan bahwa masalahnya adalah z-index. Memindahkan menu popup ke luar elemen header menyelesaikannya. Ini adalah pelajaran bagus tentang struktur frontend dan manajemen lapisan CSS.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 Rilis Resmi: Konjugator Kata Kerja Jepang",
    v100_summary:  "Aplikasi web yang menerima kata kerja dalam bentuk kamus dan menampilkan 11 konjugasi yang umum digunakan.",
    v100_problem:  "Situs konjugasi kata kerja Jepang yang ada dipenuhi iklan dan sering kali tidak terorganisir atau sulit digunakan.",
    v100_solution: "Proyek ini lahir dari pertanyaan sederhana: bisakah saya membangun alat konjugasi yang ingin saya gunakan sendiri?",
  },

  // =====================
  // vi — Vietnamese
  // =====================
  vi: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Tóm tắt:",
    label_problem:  "Vấn đề:",
    label_solution: "Giải pháp:",
    label_image:    "Hình ảnh:",

    // Devlog badges
    badge_new:      "Tính năng mới",
    badge_bug:      "Sửa lỗi",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Chất lượng",
    badge_optimize: "Tối ưu hóa",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 Cập nhật: \"Starry Dreams\"",
    v107_summary:  "Đã cập nhật giao diện với chủ đề thiết kế mới \"Starry Dreams.\"",
    v107_problem:  "Thiết kế này được xây dựng xung quanh ba ý tưởng cốt lõi: cảm giác vintage, sự mềm mại như trong mơ, và sự hiện diện yên tĩnh.<br><br>Thách thức chính là cân bằng giữa các cạnh cứng và mềm, đồng thời quản lý mật độ kết cấu trong toàn bộ giao diện. Khi sử dụng hiệu ứng ánh sáng mềm và kính, tôi phải đảm bảo thiết kế không trở nên mơ hồ hay nhạt nhòa — vì vậy tôi chú ý đến độ tương phản và độ rõ nét.",
    v107_solution: "Thiết kế cũng được tạo ra để tương thích với phong cách \"Liquid Glass\" mà tôi dự định phát triển thêm. Hiện tôi đang nghiên cứu các công cụ và kỹ thuật mới để triển khai thẩm mỹ đó với chất lượng cao hơn.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 Cập nhật: Nhật ký Dev",
    v106_summary:  "Đã thêm trang Nhật ký Dev.",
    v106_problem:  "Vì tôi vẫn còn là người mới trong lĩnh vực phát triển, trang web này có nhiều lỗi và phần chưa hoàn thiện. Nhưng chính vì vậy tôi muốn ghi lại quá trình suy nghĩ và học hỏi của mình.<br><br>Nếu bạn phát hiện lỗi hoặc có góp ý, hãy liên hệ qua phần Liên hệ. Thách thức lần này không chỉ là thiết kế giao diện mới, mà còn học cách mở rộng từ trang đơn sang nhiều trang.",
    v106_solution: "Khi triển khai, cấu trúc mã đơn giản hơn tôi nghĩ. Các trang mới về cơ bản được thêm vào như các tệp HTML mới, cùng với các cập nhật CSS và định tuyến tương ứng.<br><br>Lúc đó, tôi chưa hiểu hoàn toàn website là gì. Mô hình tâm lý của tôi là: \"Website giống như một cuốn sách với trang dọc rất dài.\" Người dùng chỉ phóng to một phần, và khi điều hướng sang trang khác, logic định tuyến trong app.py hoạt động như mục lục để tìm đích đến.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 Cập nhật: Hiển thị ưu tiên hiragana",
    v105_summary:  "Ngăn chặn việc tự động chuyển đổi sang kanji không phổ biến khi nhập hiragana.",
    v105_problem:  "Khi nhập hiragana, một số động từ bị tự động chuyển đổi sang các ký tự kanji không phổ biến.<br><br>Ví dụ, \"ある\", \"できる\" và \"いらっしゃる\" bị chuyển thành \"有る\", \"出来る\" và \"居らっしゃる\".<br><br>Vấn đề này xuất phát từ tính năng chuyển đổi kanji tự động được thêm trước đó. Lúc đó, tôi chưa có đủ góc nhìn về cách tính năng sẽ được sử dụng trong môi trường thực tế.<br><br>Dù vậy, tôi rất vui vì đã phát hiện và sửa điều này sớm.",
    v105_solution: "Đầu tiên, tôi thêm logic vào JP_Verb_Conjugator_v3.py để kiểm tra xem động từ có thường được viết bằng hiragana hay không. Sau đó, trong app.py, tôi thêm kiểm tra trước khi truyền đầu vào cho logic chuyển đổi.<br><br>Cụ thể, tôi tạo danh sách các từ phải giữ nguyên hiragana, và những từ đó được truyền thẳng vào máy chia động từ mà không chuyển đổi. Các từ không có trong danh sách vẫn được chuyển đổi như trước.<br><br>Với sửa lỗi này, \"たべる\" vẫn được chuyển thành \"食べる\", trong khi \"いらっしゃる\" được chia tự nhiên bằng hiragana.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 Cập nhật: Cải tổ UI/UX mobile",
    v103_summary:  "Đã thêm phiên bản mobile cho trang web ban đầu chỉ dành cho máy tính.",
    v103_problem:  "Dự án này bắt đầu như một ứng dụng local nhỏ để luyện Python. Nhưng sau tuần đầu tiên thú vị đó, tôi cảm thấy tiếc nếu chỉ giữ cho riêng mình — tôi muốn chia sẻ nó như một công cụ học tập.<br><br>Trang web ban đầu được thiết kế cho máy tính. Nhưng tôi nhận ra nhiều người dùng có thể không có laptop bên cạnh, và ai đó trong lớp tiếng Nhật có thể muốn tra cứu chia động từ trên điện thoại. Điều đó thúc đẩy tôi xử lý thiết kế lại cho mobile vào ngày thứ hai.",
    v103_solution: "UI mobile rất khác với desktop: không chỉ cỡ chữ, mà cả tỷ lệ ảnh và bố cục cũng cần được tối ưu cho màn hình nhỏ.<br><br>Tôi xem lại hệ thống thiết kế đã dùng trong các công việc web design trước đây và điều chỉnh cho mobile. Khi làm việc với header mới và menu hamburger, tôi gặp một bug khó chịu: menu điều hướng đáng lẽ phải đóng khi chạm bên ngoài, nhưng ngày đầu tiên chỉ đóng được trong vùng header.<br><br>Sau hai ngày thử nghiệm, tôi tìm ra nguyên nhân là z-index. Chuyển menu popup ra ngoài phần tử header đã giải quyết được. Đây là bài học tuyệt vời về cấu trúc frontend và quản lý lớp CSS.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 Ra mắt chính thức: Công cụ Chia động từ Tiếng Nhật",
    v100_summary:  "Ứng dụng web nhận động từ ở dạng từ điển và hiển thị 11 dạng chia phổ biến.",
    v100_problem:  "Các trang chia động từ tiếng Nhật hiện có đầy quảng cáo và thường được tổ chức kém hoặc khó sử dụng.",
    v100_solution: "Dự án xuất phát từ một câu hỏi đơn giản: liệu tôi có thể xây dựng một công cụ chia động từ mà chính mình muốn dùng không?",
  },

  // =====================
  // hi — Hindi
  // =====================
  hi: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "सारांश:",
    label_problem:  "समस्या:",
    label_solution: "समाधान:",
    label_image:    "चित्र:",

    // Devlog badges
    badge_new:      "नई सुविधा",
    badge_bug:      "बग सुधार",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "बैकएंड",
    badge_quality:  "गुणवत्ता",
    badge_optimize: "अनुकूलन",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 अपडेट: \"Starry Dreams\"",
    v107_summary:  "UI को नए डिज़ाइन थीम \"Starry Dreams\" से अपडेट किया गया।",
    v107_problem:  "यह डिज़ाइन तीन मुख्य विचारों पर बनाया गया था: विंटेज अहसास, स्वप्निल कोमलता और एक शांत उपस्थिति।<br><br>मुख्य चुनौती कठोर और नरम किनारों को संतुलित करना और पूरे UI में बनावट की घनत्व को प्रबंधित करना था। नरम प्रकाश और कांच जैसे प्रभावों का उपयोग करते हुए, मुझे यह सुनिश्चित करना था कि डिज़ाइन केवल अस्पष्ट या फीका न लगे — इसलिए मैंने कंट्रास्ट और स्पष्टता पर ध्यान दिया।",
    v107_solution: "डिज़ाइन को भविष्य में \"Liquid Glass\" शैली के साथ संगत होने के लिए भी बनाया गया था। वर्तमान में मैं उस सौंदर्यशास्त्र को उच्च गुणवत्ता के साथ लागू करने के लिए नए टूल और तकनीकों का अध्ययन कर रहा हूँ।",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 अपडेट: Dev Log",
    v106_summary:  "Dev Log पेज जोड़ा गया।",
    v106_problem:  "चूंकि मैं अभी भी विकास में शुरुआती हूँ, इस साइट में कई बग और अधूरे हिस्से हैं। लेकिन यही कारण है कि मैं अपनी सोच और सीखने की प्रक्रिया को दस्तावेज़ीकृत करना चाहता था।<br><br>अगर आपको कोई त्रुटि या सुधार का सुझाव मिले, तो होमपेज के Contact अनुभाग से बेझिझक संपर्क करें। इस बार की चुनौती केवल नया UI डिज़ाइन करना नहीं थी, बल्कि यह सीखना था कि एकल-पेज साइट को बहु-पेज में कैसे विस्तारित किया जाए।",
    v106_solution: "इसे लागू करने पर, कोड की संरचना अपेक्षा से सरल निकली। नए पेज मूल रूप से नए HTML फ़ाइलों के रूप में जोड़े जाते हैं, साथ में CSS और रूटिंग अपडेट होती है।<br><br>उस समय, मुझे पूरी तरह समझ नहीं था कि वेबसाइट क्या होती है। मेरा मानसिक मॉडल था: \"वेबसाइट एक बहुत लंबे ऊर्ध्वाधर पेज वाली किताब की तरह है।\" उपयोगकर्ता केवल एक हिस्से को ज़ूम करके देखता है, और दूसरे पेज पर जाने पर app.py में रूटिंग लॉजिक एक सूचकांक की तरह काम करता है।",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 अपडेट: हिरागाना प्राथमिकता प्रदर्शन",
    v105_summary:  "हिरागाना दर्ज करने पर असामान्य कांजी में स्वचालित रूपांतरण को रोका गया।",
    v105_problem:  "हिरागाना दर्ज करने पर कुछ क्रियाएं स्वचालित रूप से असामान्य कांजी में बदल जाती थीं।<br><br>उदाहरण के लिए, \"ある\", \"できる\" और \"いらっしゃる\" क्रमशः \"有る\", \"出来る\" और \"居らっしゃる\" में बदल जाते थे।<br><br>यह समस्या पहले जोड़ी गई स्वचालित कांजी रूपांतरण सुविधा से उत्पन्न हुई। उस समय मुझे वास्तविक उपयोगकर्ता परिवेश में इस सुविधा के उपयोग के बारे में पर्याप्त दृष्टिकोण नहीं था।<br><br>फिर भी, इसे जल्दी पकड़ने और ठीक करने में प्रसन्नता हुई।",
    v105_solution: "पहले, JP_Verb_Conjugator_v3.py में यह जांचने के लिए लॉजिक जोड़ा कि क्रिया आमतौर पर हिरागाना में लिखी जाती है या नहीं। फिर app.py में, रूपांतरण लॉजिक को इनपुट पास करने से पहले एक पूर्व-जाँच जोड़ी।<br><br>विशेष रूप से, हिरागाना में रखे जाने वाले शब्दों की एक सूची बनाई, और उन शब्दों को बिना रूपांतरण के सीधे संयुग्मन इंजन को पास किया जाता है। सूची में नहीं आने वाले शब्द पहले की तरह रूपांतरित होते रहते हैं।<br><br>इस सुधार से, \"たべる\" अभी भी \"食べる\" में बदलता है, जबकि \"いらっしゃる\" हिरागाना में स्वाभाविक रूप से संयुग्मित होता है।",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 अपडेट: मोबाइल UI/UX ओवरहॉल",
    v103_summary:  "मूल रूप से केवल डेस्कटॉप साइट में मोबाइल संस्करण जोड़ा गया।",
    v103_problem:  "यह प्रोजेक्ट Python सीखने के लिए एक छोटे लोकल ऐप के रूप में शुरू हुआ। लेकिन उस पहले रोमांचक हफ्ते के बाद, इसे केवल अपने लिए रखना अफसोसजनक लगा — मैं इसे सीखने के एक उपकरण के रूप में साझा करना चाहता था।<br><br>साइट मूल रूप से डेस्कटॉप के लिए बनाई गई थी। लेकिन मुझे एहसास हुआ कि कई उपयोगकर्ताओं के पास लैपटॉप नहीं हो सकता, और जापानी कक्षा में कोई फोन पर क्रिया संयुग्मन देखना चाहे। इसी भावना से दूसरे दिन मोबाइल डिज़ाइन पर काम किया।",
    v103_solution: "मोबाइल UI, डेस्कटॉप UI से काफी अलग है: केवल फ़ॉन्ट आकार नहीं, बल्कि छवि अनुपात और लेआउट भी छोटी स्क्रीन के लिए अनुकूलित करने की ज़रूरत थी।<br><br>पहले के web design कार्य में उपयोग किए गए डिज़ाइन सिस्टम को फिर से देखा और मोबाइल के लिए जल्दी से अनुकूलित किया। नए हेडर और हैमबर्गर मेनू पर काम करते समय एक परेशान करने वाला बग मिला: नेविगेशन मेनू को बाहर टैप करने पर बंद होना चाहिए था, लेकिन पहले दिन केवल हेडर क्षेत्र में टैप करने पर बंद होता था।<br><br>दो दिन की कोशिशों के बाद पाया कि समस्या z-index की थी। पॉपअप मेनू को हेडर एलिमेंट से बाहर ले जाने से समस्या हल हो गई। यह frontend संरचना और CSS लेयर प्रबंधन के बारे में एक अच्छा सबक था।",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 आधिकारिक रिलीज़: जापानी क्रिया संयुग्मन उपकरण",
    v100_summary:  "एक वेब ऐप जो शब्दकोश रूप में क्रिया लेता है और 11 आमतौर पर उपयोग किए जाने वाले संयुग्मन दिखाता है।",
    v100_problem:  "मौजूदा जापानी क्रिया संयुग्मन साइटें विज्ञापनों से भरी थीं और अक्सर खराब तरीके से व्यवस्थित या उपयोग में कठिन थीं।",
    v100_solution: "प्रोजेक्ट एक सरल सवाल से आया: क्या मैं एक ऐसा संयुग्मन उपकरण बना सकता हूँ जिसे मैं खुद उपयोग करना चाहूँगा?",
  },

  // =====================
  // ne — Nepali
  // =====================
  ne: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "सारांश:",
    label_problem:  "समस्या:",
    label_solution: "समाधान:",
    label_image:    "तस्वीर:",

    // Devlog badges
    badge_new:      "नयाँ सुविधा",
    badge_bug:      "बग सुधार",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "ब्याकएन्ड",
    badge_quality:  "गुणस्तर",
    badge_optimize: "अप्टिमाइज",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 अपडेट: \"Starry Dreams\"",
    v107_summary:  "UI लाई नयाँ डिजाइन थिम \"Starry Dreams\" मा अपडेट गरियो।",
    v107_problem:  "यो डिजाइन तीन मुख्य विचारमा आधारित थियो: भिन्टेज अनुभव, सपनेजस्तो कोमलता र शान्त उपस्थिति।<br><br>मुख्य चुनौती कडा र मुलायम किनारहरूको सन्तुलन मिलाउनु र पूरै UI मा बनावटको घनत्व व्यवस्थापन गर्नु थियो। नरम प्रकाश र काँचजस्ता प्रभावहरू प्रयोग गर्दा, डिजाइन अस्पष्ट वा फिक्का नदेखिओस् भनेर कन्ट्रास्ट र स्पष्टतामा ध्यान दिइयो।",
    v107_solution: "डिजाइन भविष्यमा \"Liquid Glass\" स्टाइलसँग पनि मिल्ने गरी बनाइएको छ। त्यो सौन्दर्यशास्त्र उच्च गुणस्तरमा लागू गर्न हाल नयाँ टूल र प्रविधिहरू अध्ययन गरिँदैछ।",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 अपडेट: Dev Log",
    v106_summary:  "Dev Log पेज थपियो।",
    v106_problem:  "अझै विकासमा शुरुआती भएकाले यस साइटमा धेरै बग र अपूर्ण भागहरू छन्। तर यही कारणले मैले आफ्नो सोच र सिकाइ प्रक्रिया दस्तावेजीकरण गर्न चाहेँ।<br><br>यदि कुनै त्रुटि वा सुझाव छ भने होमपेजको Contact खण्डबाट सम्पर्क गर्नुस्। यसपटकको चुनौती नयाँ UI डिजाइन गर्नु मात्र नभई एकल-पेज साइटलाई बहु-पेजमा कसरी विस्तार गर्ने भनेर सिक्नु पनि थियो।",
    v106_solution: "लागू गर्दा कोड संरचना सोचेभन्दा सरल निस्कियो। नयाँ पेजहरू मूलतः नयाँ HTML फाइलका रूपमा थपिन्छन्, सँगसँगै CSS र रुटिङ पनि अपडेट हुन्छ।<br><br>त्यसबेला वेबसाइट के हो भनेर पूर्णतः बुझेको थिइनँ। मेरो मानसिक मोडल थियो: \"वेबसाइट धेरै लामो ठाडो पेज भएको किताबजस्तो हो।\" प्रयोगकर्ताले एउटा भाग मात्र जुम गरेर हेर्छ, अर्को पेजमा जाँदा app.py को रुटिङ लजिकले सूचीजस्तो काम गर्छ।",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 अपडेट: हिरागाना प्राथमिकता प्रदर्शन",
    v105_summary:  "हिरागाना प्रविष्ट गर्दा असामान्य कान्जीमा स्वचालित रूपान्तरण रोकियो।",
    v105_problem:  "हिरागाना प्रविष्ट गर्दा केही क्रियाहरू स्वचालित रूपमा असामान्य कान्जीमा रूपान्तरित हुन्थे।<br><br>उदाहरणका लागि, \"ある\", \"できる\" र \"いらっしゃる\" क्रमशः \"有る\", \"出来る\" र \"居らっしゃる\" मा रूपान्तरित हुन्थे।<br><br>यो समस्या अघि थपिएको स्वचालित कान्जी रूपान्तरण सुविधाबाट उत्पन्न भएको थियो। त्यसबेला वास्तविक प्रयोगकर्ता वातावरणमा सुविधा कसरी प्रयोग हुन्छ भन्ने पर्याप्त दृष्टिकोण थिएन।<br><br>तैपनि यसलाई चाँडो पत्ता लगाएर सुधार गर्न पाएकोमा खुसी लाग्यो।",
    v105_solution: "पहिले JP_Verb_Conjugator_v3.py मा क्रिया सामान्यतः हिरागानामा लेखिन्छ कि छैन जाँच्ने लजिक थपियो। त्यसपछि app.py मा रूपान्तरण लजिकमा इनपुट पठाउनु अघि पूर्व-जाँच थपियो।<br><br>विशेष रूपमा, हिरागानामा राखिनुपर्ने शब्दहरूको सूची बनाइयो र ती शब्दहरू रूपान्तरण नगरी सिधै संयुग्मन इन्जिनमा पठाइन्छन्। सूचीमा नभएका शब्दहरू पहिलेझैँ रूपान्तरित हुन्छन्।<br><br>यस सुधारले \"たべる\" अझै \"食べる\" मा रूपान्तरित हुन्छ, जबकि \"いらっしゃる\" हिरागानामा स्वाभाविक रूपमा संयुग्मित हुन्छ।",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 अपडेट: मोबाइल UI/UX ओभरहल",
    v103_summary:  "मूलतः डेस्कटप-मात्र वेबसाइटमा मोबाइल संस्करण थपियो।",
    v103_problem:  "यो प्रोजेक्ट Python सिक्नको लागि साना स्थानीय एप्लिकेसनको रूपमा शुरु भएको थियो। तर त्यो पहिलो रोमाञ्चक हप्तापछि, यसलाई आफैँले राख्नु अफसोसजनक लाग्यो — यसलाई सबैको सिकाइको लागि साझा गर्न चाहेँ।<br><br>साइट मूलतः डेस्कटपको लागि बनाइएको थियो। तर धेरै प्रयोगकर्तासँग ल्यापटप नहुन सक्छ र जापानी कक्षामा फोनमा क्रिया संयुग्मन जाँच्न चाहने हुन सक्छन् भनेर सोचेँ। यही भावनाले दोस्रो दिन मोबाइल डिजाइनमा काम गरियो।",
    v103_solution: "मोबाइल UI डेस्कटप UIभन्दा धेरै फरक छ: फन्ट साइज मात्र होइन, इमेज अनुपात र लेआउट पनि साना स्क्रिनका लागि अप्टिमाइज गर्नुपर्छ।<br><br>अघिको वेब डिजाइन कामको डिजाइन सिस्टम पुनरावलोकन गरी मोबाइलको लागि छिटो अनुकूलन गरियो। नयाँ हेडर र ह्यामबर्गर मेनुमा काम गर्दा झन्झटिलो बग भेटियो: नेभिगेसन मेनु बाहिर ट्याप गर्दा बन्द हुनुपर्नेमा पहिलो दिन हेडर क्षेत्रभित्रमात्र बन्द हुन्थ्यो।<br><br>दुई दिन परीक्षण पछि z-index नै समस्या थियो भन्ने पत्ता लाग्यो। पपअप मेनुलाई हेडर एलिमेन्टबाहिर सार्दा समस्या समाधान भयो। फ्रन्टएन्ड संरचना र CSS लेयर व्यवस्थापनबारे राम्रो सिकाइ भयो।",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 आधिकारिक रिलिज: जापानी क्रिया संयुग्मन उपकरण",
    v100_summary:  "शब्दकोश रूपको क्रिया प्रविष्ट गर्दा ११ प्रकारका सामान्य संयुग्मन देखाउने वेब एप।",
    v100_problem:  "विद्यमान जापानी क्रिया संयुग्मन साइटहरू विज्ञापनले भरिएका र प्रायः अव्यवस्थित वा प्रयोग गर्न गाह्रो थिए।",
    v100_solution: "\"आफूले सच्चिकै प्रयोग गर्न चाहने क्रिया संयुग्मन उपकरण बनाउन सकिन्छ कि?\" भन्ने सोचबाट यो प्रोजेक्ट सुरु भयो।",
  },

  // =====================
  // my — Burmese
  // =====================
  my: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "အကျဉ်းချုပ်−",
    label_problem:  "ပြဿနာ−",
    label_solution: "ဖြေရှင်းချက်−",
    label_image:    "ပုံ−",

    // Devlog badges
    badge_new:      "အသစ်",
    badge_bug:      "ဘတ်ပြင်",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "ဘက်ကန်း",
    badge_quality:  "အရည်အသွေး",
    badge_optimize: "အကောင်းဆုံးပြု",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 အပ်ဒိတ်: \"Starry Dreams\"",
    v107_summary:  "UI ကို \"Starry Dreams\" ဒီဇိုင်းသစ်သို့ အပ်ဒိတ်လုပ်ခဲ့သည်။",
    v107_problem:  "ဤဒီဇိုင်းကို အဓိကစိတ်ကူးသုံးခုဖြင့် ဖန်တီးခဲ့သည်: ဗင်တေ့ဂ်ခံစားချက်၊ အိပ်မက်ကဲ့သို့ ပျော့ပြောင်းမှုနှင့် တိတ်ဆိတ်သောသြဇာ။<br><br>အဓိကစိန်ခေါ်မှုမှာ မာကြောသောနှင့် ပျော့ပြောင်းသောနားများကို မျှတစေခြင်းနှင့် UI တစ်ခုလုံးတွင် ဖွဲ့စည်းမှုဆိုင်ရာ ထိပ်တိုက်ဖြစ်မှုကို စီမံခန့်ခွဲရန်ဖြစ်သည်။ ပျော့ပြောင်းသောမီးနှင့် မှန်ကဲ့သို့ အထူးသဖြင့် သုံးနေချိန်တွင် ဒီဇိုင်းသည် ရောထွေးပြောင်းလဲနေသောပုံမဟုတ်ဘဲ ကွဲပြားလင်းသည်ဆိုတာ သေချာနေစေရန် ကျွန်တော် အာရုံစိုက်ခဲ့သည်။",
    v107_solution: "ဒီဇိုင်းကို ရှေ့ဆက် ဖွံ့ဖြိုးတိုးတက်ရန် စီစဉ်ထားသည့် \"Liquid Glass\" ပုံစံနှင့် ကိုက်ညီအောင်လည်း ဖန်တီးထားသည်။ ထို aesthetics ကို ပိုမိုကောင်းမွန်သောအရည်အသွေးဖြင့် အကောင်အထည်ဖော်ရန် ကိရိယာသစ်များနှင့် နည်းပညာများကို ယခုလေ့လာဆဲဖြစ်သည်။",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 အပ်ဒိတ်: Dev Log",
    v106_summary:  "Dev Log စာမျက်နှာကို ထည့်သွင်းခဲ့သည်။",
    v106_problem:  "ဖွံ့ဖြိုးရေးတွင် အစပြုသူဖြစ်သောကြောင့် ဤဆိုက်တွင် bugs များနှင့် မပြီးစီးသေးသောအပိုင်းများ ရှိသည်။ ဒါကြောင့်ပင် ကျွန်တော်၏ တွေးခေါ်ပုံနှင့် သင်ယူမှုကို မှတ်တမ်းတင်ချင်ခဲ့သည်။<br><br>မှားယွင်းမှုများ သို့မဟုတ် တိုးတက်မှုအကြံဉာဏ်များ တွေ့ပါက မိမိနှစ်သက်ရာ ဆက်သွယ်မှုအပိုင်းမှ ဆက်သွယ်နိုင်သည်။ ဤတစ်ကြိမ်တွင် UI အသစ်ဒီဇိုင်းဆွဲရုံမက single-page site မှ multi-page သို့ ချဲ့ထွင်နည်းကိုလည်း သင်ယူနေခဲ့သည်။",
    v106_solution: "အကောင်အထည်ဖော်တော့ code ဖွဲ့စည်းပုံသည် ထင်ထားသည်ထက် ပိုရိုးစင်းကြောင်း တွေ့ရှိသည်။ စာမျက်နှာသစ်များကို HTML ဖိုင်သစ်များအဖြစ် ထည့်သွင်းပြီး CSS နှင့် routing ကို သက်ဆိုင်ရာ update လုပ်သည်။<br><br>ထိုအချိန်တွင် website ဆိုတာ ဘာဆိုတာ မပြည့်ပြည့်ဝဝ နားမလည်သေးခဲ့ပါ။ ကျွန်တော်၏ mental model မှာ \"Website ဆိုတာ ဒေါင်လိုက်ရှည်လျားသောစာမျက်နှာ ရှိသောစာအုပ်နှင့် တူသည်\" ဟူ၍ ဖြစ်ခဲ့သည်။ user က တစ်ပိုင်းကိုသာ zoom ကြည့်ပြီး အခြားစာမျက်နှာသို့ သွားတော့ app.py ၏ routing logic က မာတိကာကဲ့သို့ ဦးတည်ရာကို ရှာပေးသည် ဟု နားလည်ခဲ့သည်။",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 အပ်ဒိတ်: Hiragana ဦးစားပေးပြသမှု",
    v105_summary:  "Hiragana ထည့်သွင်းသောအခါ မသုံးလေ့ရှိသော kanji သို့ အလိုအလျောက် ပြောင်းခြင်းကို တားဆီးသည်။",
    v105_problem:  "Hiragana ထည့်သွင်းသောအခါ အချို့သောကြိယာများသည် မသုံးလေ့ရှိသော kanji သို့ အလိုအလျောက် ပြောင်းသွားသည်ဟု တွေ့ရှိခဲ့သည်။<br><br>ဥပမာ \"ある\"၊ \"できる\" နှင့် \"いらっしゃる\" တို့သည် \"有る\"၊ \"出来る\" နှင့် \"居らっしゃる\" သို့ ပြောင်းသွားသည်။<br><br>ဤပြဿနာသည် ယခင်ထည့်သွင်းခဲ့သော hiragana အလိုအလျောက် kanji ပြောင်းလဲခြင်း function မှ ဖြစ်ပေါ်ခဲ့သည်။ ထိုအချိန်တွင် အသုံးပြုသူပတ်ဝန်းကျင်တွင် feature ကို မည်သို့ အသုံးပြုမည်ဆိုသည့် အမြင်မလုံလောက်ခဲ့ပါ။<br><br>သို့သော် ဤပြဿနာကို အစောပိုင်းတွင်ပင် ရှာဖွေပြင်ဆင်နိုင်ခဲ့သည့်အတွက် ဝမ်းသာပါသည်။",
    v105_solution: "ပထမဦးစွာ JP_Verb_Conjugator_v3.py တွင် ကြိယာကို hiragana ဖြင့် ရေးလေ့ရှိသလား စစ်ဆေးသော logic ကို ထည့်သွင်းသည်။ ထို့နောက် app.py တွင် input ကို ပြောင်းလဲမှု logic သို့ မပို့မီ ကြိုတင်စစ်ဆေးမှုကို ထည့်သွင်းသည်။<br><br>သတ်မှတ်ချက်အရ hiragana ဖြစ်နေရမည့် စကားလုံးများ၏ list တစ်ခုကို ဖန်တီးပြီး ထိုစကားလုံးများကို ပြောင်းလဲမှုမရှိဘဲ တိုက်ရိုက် conjugation engine သို့ ပို့သည်။ List တွင်မပါသောစကားလုံးများသည် ယခင်အတိုင်း ပြောင်းလဲဆဲဖြစ်သည်။<br><br>ဤပြင်ဆင်မှုကြောင့် \"たべる\" သည် \"食べる\" သို့ ဆက်ပြောင်းသောအခါ \"いらっしゃる\" ကဲ့သို့သောစကားလုံးများသည် hiragana ဖြင့် သဘာဝကျကျ conjugate ဖြစ်သည်။",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 အပ်ဒိတ်: မိုဘိုင်း UI/UX ပြုပြင်မှု",
    v103_summary:  "မူလကတည်းက desktop-only ဆိုက်တွင် mobile version ထည့်သွင်းသည်။",
    v103_problem:  "ဤပရောဂျက်သည် Python သင်ယူရန် သေးငယ်သော local application အဖြစ် စတင်ခဲ့သည်။ သို့သော် ထိုပထမဆုံးရောင်းရဲ၍ ရှည်လျားသောအပတ်ပြီးနောက် ကိုယ်တိုင်သာ ထိန်းသိမ်းရန် ဝမ်းနည်းဖွယ်ဖြစ်ခဲ့သည် — သင်ကြားရေးကိရိယာတစ်ခုအဖြစ် မျှဝေချင်ခဲ့သည်။<br><br>ဆိုက်ကို မူလက desktop အတွက်သာ ဒီဇိုင်းဆွဲခဲ့သည်။ သို့သော် user အများစုတွင် laptop မရှိနိုင်ပြီး ဂျပန်ဘာသာသင်တန်းတွင် ဖုန်းဖြင့် ကြိယာ conjugation ကြည့်ချင်နိုင်ကြောင်း ဝိုင်းဝန်းတွေးဆမိသည်။ ဤခံစားချက်ကြောင့် ဒုတိယနေ့တွင် mobile design ကို ကိုင်တွယ်ခဲ့သည်။",
    v103_solution: "Mobile UI သည် desktop UI နှင့် ကွာခြားချက် များပြားသည်: font size သာမက image ratio နှင့် layout လည်း သေးငယ်သောမျက်နှာပြင်များအတွက် optimize လုပ်ရသည်။<br><br>ယခင် web design အလုပ်တွင် သုံးခဲ့သော design system ကို ပြန်လည်သုံးသပ်ပြီး mobile အတွက် မြန်မြန်ဆန်ဆန် ညှိနှိုင်းသည်။ header သစ်နှင့် hamburger menu ဒီဇိုင်းဆွဲနေချိန်တွင် bug တစ်ခု တွေ့ရှိသည်: navigation menu ကို ပြင်ပ တွင် tap လုပ်သောအခါ ပိတ်သင့်သော်လည်း ပထမနေ့တွင် header ဧရိယာအတွင်းတွင်သာ ပိတ်နိုင်ခဲ့သည်။<br><br>နှစ်ရက်ကြာ ကြိုးပမ်းပြီးနောက် z-index ဖြစ်ကြောင်း ရှာဖွေတွေ့ရှိသည်။ popup menu ကို header element ပြင်ပသို့ ရွှေ့ပြောင်းခြင်းဖြင့် ပြဿနာ ဖြေရှင်းနိုင်ခဲ့သည်။ Frontend structure နှင့် CSS layer စီမံခန့်ခွဲမှုနှင့် ပတ်သက်ပြီး ကောင်းမွန်သောသင်ခန်းစာ ဖြစ်ခဲ့သည်။",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 တရားဝင်ထုတ်ပြန်ခြင်း: ဂျပန်ဘာသာ ကြိယာပုံစံပြောင်းစနစ်",
    v100_summary:  "dictionary form တွင် ကြိယာတစ်ခုကို ထည့်သွင်းလျှင် အသုံးများသော conjugation ၁၁ ခုကို ပြသသော web app ဖြစ်သည်။",
    v100_problem:  "ရှိပြီးသার ဂျပန်ဘာသာ ကြိယာ conjugation ဆိုက်များသည် ကြော်ငြာများပြည့်နှက်ပြီး မကောင်းမွန်သောသတင်းအချက်အလက်ဖွဲ့စည်းပုံ သို့မဟုတ် အသုံးပြုရခက်ကြောင်း ခံစားမိသည်။",
    v100_solution: "\"ကိုယ်တိုင်အမှန်တကယ် သုံးချင်မည့် ကြိယာ conjugation tool တစ်ခု တည်ဆောက်နိုင်မလား\" ဆိုသောစိတ်ကူးမှ ဤပရောဂျက် ဖန်တီးခဲ့သည်။",
  },

  // =====================
  // th — Thai
  // =====================
  th: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "สรุป:",
    label_problem:  "ปัญหา:",
    label_solution: "วิธีแก้:",
    label_image:    "รูปภาพ:",

    // Devlog badges
    badge_new:      "ฟีเจอร์ใหม่",
    badge_bug:      "แก้บัก",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "แบ็กเอนด์",
    badge_quality:  "คุณภาพ",
    badge_optimize: "ปรับปรุง",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 อัปเดต: \"Starry Dreams\"",
    v107_summary:  "อัปเดต UI ด้วยธีมดีไซน์ใหม่ \"Starry Dreams\"",
    v107_problem:  "ดีไซน์นี้ถูกสร้างขึ้นรอบๆ สามแนวคิดหลัก: ความรู้สึกวินเทจ ความอ่อนนุ่มแบบฝัน และการดำรงอยู่อย่างเงียบสงบ<br><br>ความท้าทายหลักคือการสร้างสมดุลระหว่างขอบที่แข็งและอ่อน และการจัดการความหนาแน่นของพื้นผิวทั่วทั้ง UI เมื่อใช้เอฟเฟกต์แสงอ่อนและกระจก ต้องมั่นใจว่าดีไซน์ไม่ดูเพียงแค่ฟุ้งซ่านหรือซีดจาง — ดังนั้นจึงใส่ใจกับคอนทราสต์และความชัดเจน",
    v107_solution: "ดีไซน์นี้ยังสร้างขึ้นเพื่อความเข้ากันได้กับสไตล์ \"Liquid Glass\" ที่วางแผนจะพัฒนาต่อไป ปัจจุบันกำลังศึกษาเครื่องมือและเทคนิคใหม่เพื่อนำสุนทรียภาพนั้นไปใช้ด้วยคุณภาพที่สูงขึ้น",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 อัปเดต: บันทึก Dev",
    v106_summary:  "เพิ่มหน้าบันทึก Dev แล้ว",
    v106_problem:  "เนื่องจากยังเป็นมือใหม่ในการพัฒนา เว็บไซต์นี้จึงมีบัคและส่วนที่ยังไม่สมบูรณ์หลายอย่าง แต่นั่นแหละเหตุผลที่ต้องการบันทึกกระบวนการคิดและการเรียนรู้<br><br>ถ้าพบข้อผิดพลาดหรือข้อเสนอแนะ สามารถติดต่อได้ผ่านส่วนติดต่อ ความท้าทายครั้งนี้ไม่ใช่แค่ออกแบบ UI ใหม่ แต่ยังต้องเรียนรู้วิธีขยายเว็บไซต์จากหน้าเดียวเป็นหลายหน้า",
    v106_solution: "เมื่อนำไปใช้จริง โครงสร้างโค้ดง่ายกว่าที่คาดไว้ หน้าใหม่โดยพื้นฐานแล้วเพิ่มเป็นไฟล์ HTML ใหม่พร้อมการอัปเดต CSS และ routing ที่สอดคล้องกัน<br><br>ตอนนั้นยังไม่เข้าใจอย่างถ่องแท้ว่าเว็บไซต์คืออะไร โมเดลทางความคิดคือ \"เว็บไซต์เหมือนหนังสือที่มีหน้าแนวตั้งยาวมาก\" ผู้ใช้ขยายดูเพียงส่วนหนึ่ง และเมื่อนำทางไปยังหน้าอื่น logic การ routing ใน app.py ทำหน้าที่เหมือนสารบัญเพื่อค้นหาปลายทาง",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 อัปเดต: การแสดงผลแบบ Hiragana ที่ต้องการ",
    v105_summary:  "ป้องกันการแปลงอัตโนมัติเป็น kanji ที่ไม่ค่อยพบเมื่อป้อน hiragana",
    v105_problem:  "เมื่อป้อน hiragana กริยาบางคำถูกแปลงอัตโนมัติเป็น kanji ที่ไม่ค่อยพบ<br><br>ตัวอย่างเช่น \"ある\", \"できる\" และ \"いらっしゃる\" ถูกแปลงเป็น \"有る\", \"出来る\" และ \"居らっしゃる\" ตามลำดับ<br><br>ปัญหานี้มาจากฟีเจอร์การแปลง kanji อัตโนมัติที่เพิ่มไว้ก่อนหน้า ตอนนั้นยังไม่มีมุมมองเพียงพอเกี่ยวกับวิธีที่ฟีเจอร์จะถูกใช้ในสภาพแวดล้อมผู้ใช้จริง<br><br>อย่างไรก็ตาม ดีใจที่สามารถตรวจพบและแก้ไขได้เร็ว",
    v105_solution: "ขั้นแรก เพิ่ม logic ใน JP_Verb_Conjugator_v3.py เพื่อตรวจสอบว่ากริยามักเขียนด้วย hiragana หรือไม่ จากนั้นใน app.py เพิ่มการตรวจสอบล่วงหน้าก่อนส่ง input ไปยัง logic การแปลง<br><br>โดยเฉพาะ สร้างรายการคำที่ต้องคงไว้ใน hiragana และคำเหล่านั้นจะถูกส่งตรงไปยัง conjugation engine โดยไม่แปลง คำที่ไม่อยู่ในรายการยังคงถูกแปลงเหมือนเดิม<br><br>ด้วยการแก้ไขนี้ \"たべる\" ยังคงถูกแปลงเป็น \"食べる\" ในขณะที่ \"いらっしゃる\" ถูก conjugate ตามธรรมชาติใน hiragana",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 อัปเดต: ปรับปรุง UI/UX มือถือ",
    v103_summary:  "เพิ่มเวอร์ชันมือถือให้กับเว็บไซต์ที่เดิมออกแบบสำหรับเดสก์ท็อปเท่านั้น",
    v103_problem:  "โปรเจกต์นี้เริ่มต้นเป็นแอปพลิเคชันขนาดเล็กเพื่อฝึก Python แต่หลังจากสัปดาห์แรกที่น่าตื่นเต้นมาก รู้สึกเสียดายถ้าเก็บไว้คนเดียว — อยากแบ่งปันเป็นเครื่องมือเรียนรู้<br><br>เว็บไซต์ออกแบบสำหรับเดสก์ท็อปแต่แรก แต่ตระหนักว่าผู้ใช้หลายคนอาจไม่มีแล็ปท็อปอยู่ใกล้ๆ และคนในชั้นเรียนภาษาญี่ปุ่นอาจต้องการค้นหาคำผันบนโทรศัพท์ ความรู้สึกนั้นผลักดันให้จัดการออกแบบมือถือในวันที่สอง",
    v103_solution: "UI มือถือแตกต่างจากเดสก์ท็อปมาก ไม่ใช่แค่ขนาดตัวอักษร แต่ยังรวมถึงสัดส่วนรูปภาพและ layout ที่ต้องปรับสำหรับหน้าจอขนาดเล็ก<br><br>ทบทวนระบบการออกแบบที่เคยใช้ในงาน web design ก่อนหน้าและปรับสำหรับมือถือ เมื่อทำงานกับ header ใหม่และเมนูแฮมเบอร์เกอร์ พบบัคที่น่าหงุดหงิด: เมนูนำทางควรปิดเมื่อแตะนอกพื้นที่ แต่วันแรกปิดได้เฉพาะในพื้นที่ header เท่านั้น<br><br>หลังจากสองวันของการทดลอง พบว่าปัญหาคือ z-index การย้าย popup menu ออกจาก element header แก้ปัญหาได้ เป็นบทเรียนที่ดีเกี่ยวกับโครงสร้าง frontend และการจัดการ CSS layer",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 เปิดตัวอย่างเป็นทางการ: เครื่องมือผันคำกริยาภาษาญี่ปุ่น",
    v100_summary:  "แอปเว็บที่รับคำกริยาในรูปพจนานุกรมและแสดงคำผัน 11 รูปแบบที่ใช้บ่อย",
    v100_problem:  "เว็บไซต์ผันคำกริยาญี่ปุ่นที่มีอยู่เต็มไปด้วยโฆษณาและมักจัดระเบียบไม่ดีหรือใช้งานยาก",
    v100_solution: "โปรเจกต์นี้มาจากคำถามง่ายๆ: ฉันสามารถสร้างเครื่องมือผันคำกริยาที่ฉันเองอยากใช้ได้ไหม?",
  },

  // =====================
  // tl — Tagalog
  // =====================
  tl: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "Buod:",
    label_problem:  "Problema:",
    label_solution: "Solusyon:",
    label_image:    "Larawan:",

    // Devlog badges
    badge_new:      "Bagong Feature",
    badge_bug:      "Bug Fix",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "Backend",
    badge_quality:  "Kalidad",
    badge_optimize: "Optimize",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 Update: \"Starry Dreams\"",
    v107_summary:  "Na-update ang UI sa bagong design theme na \"Starry Dreams.\"",
    v107_problem:  "Ang design na ito ay binuo sa paligid ng tatlong pangunahing ideya: vintage na pakiramdam, malambot na parang panaginip, at tahimik na presensya.<br><br>Ang pangunahing hamon ay ang pag-balance ng matitigas at malambot na gilid, at ang pamamahala ng density ng texture sa buong UI. Habang gumagamit ng malambot na ilaw at glass-like na epekto, kailangan kong tiyakin na ang design ay hindi lamang mukhang malabo o kupas — kaya binigyan ko ng pansin ang contrast at kalinawan.",
    v107_solution: "Ang design ay ginawa rin na may compatibility sa \"Liquid Glass\" na estilo na plano kong paunlarin pa. Kasalukuyan akong nag-aaral ng mga bagong kasangkapan at pamamaraan para maipatupad ang aesthetics na iyon sa mas mataas na kalidad.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 Update: Dev Log",
    v106_summary:  "Idinagdag ang pahina ng Dev Log.",
    v106_problem:  "Dahil bago pa ako sa development, ang site na ito ay may maraming bug at hindi pa natapos na bahagi. Ngunit iyon mismo ang dahilan kung bakit nais kong idokumento ang aking proseso ng pag-iisip at pag-aaral.<br><br>Kung makakita ng mga pagkakamali o mungkahi para sa pagpapabuti, huwag mag-atubiling makipag-ugnayan sa pamamagitan ng seksyon ng Makipag-ugnayan. Ang hamon ngayon ay hindi lamang ang pagdisenyo ng bagong UI, kundi ang pag-aaral kung paano palawakin ang isang single-page site sa maraming pahina.",
    v106_solution: "Nang ipatupad ito, ang istruktura ng code ay mas simple kaysa inaasahan. Ang mga bagong pahina ay karaniwang idinaragdag bilang mga bagong HTML file, kasama ang mga kaukulang update sa CSS at routing.<br><br>Noong panahon na iyon, hindi ko pa ganap na naiintindihan kung ano ang isang website. Ang aking mental na modelo ay: \"Ang website ay parang isang aklat na may napakahabang patayong pahina.\" Ang gumagamit ay nag-zoom lamang sa isang bahagi, at kapag nag-navigate sa ibang pahina, ang routing logic sa app.py ay gumaganap bilang talaan ng nilalaman para mahanap ang destinasyon.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 Update: Hiragana-Preferred na Display",
    v105_summary:  "Pinigilan ang awtomatikong pagbabago sa hindi karaniwang kanji kapag naglalagay ng hiragana.",
    v105_problem:  "Kapag naglalagay ng hiragana, ang ilang mga pandiwa ay awtomatikong nababago sa hindi karaniwang mga representasyon ng kanji.<br><br>Halimbawa, ang \"ある\", \"できる\", at \"いらっしゃる\" ay nababago sa \"有る\", \"出来る\", at \"居らっしゃる\" ayon sa pagkakasunod-sunod.<br><br>Ang problemang ito ay nagmula sa feature ng awtomatikong conversion ng kanji na idinagdag nang mas maaga. Noong panahon na iyon, wala pa akong sapat na perspektibo kung paano gagamitin ang feature sa isang tunay na kapaligiran ng gumagamit.<br><br>Gayunpaman, masaya akong naagarang natukoy at naayos ito.",
    v105_solution: "Una, nagdagdag ako ng logic sa JP_Verb_Conjugator_v3.py para suriin kung ang isang pandiwa ay karaniwang isinusulat sa hiragana. Pagkatapos, sa app.py, nagdagdag ng pre-check bago ipasa ang input sa conversion logic.<br><br>Partikular na, gumawa ako ng listahan ng mga salitang dapat manatili sa hiragana, at ang mga salitang iyon ay direktang ipinapasa sa conjugation engine nang walang conversion. Ang mga salitang hindi nasa listahan ay patuloy na nako-convert tulad ng dati.<br><br>Sa pag-aayos na ito, ang \"たべる\" ay nako-convert pa rin sa \"食べる\", habang ang \"いらっしゃる\" ay natural na nagko-conjugate sa hiragana.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 Update: Mobile UI/UX Overhaul",
    v103_summary:  "Idinagdag ang mobile na bersyon sa site na orihinal na para lamang sa desktop.",
    v103_problem:  "Ang proyektong ito ay nagsimula bilang isang maliit na lokal na application para magsanay ng Python. Ngunit pagkatapos ng unang linggo na lubhang nakakaaliw, naramdaman ko na sayang kung itatago ko ito para sa sarili ko lamang — nais ko itong ibahagi bilang kasangkapan sa pag-aaral.<br><br>Ang site ay orihinal na dinisenyo para sa desktop. Ngunit napagtanto ko na maraming gumagamit ang malamang na walang laptop sa kanilang tabi, at ang isang tao sa isang klase ng Hapon ay maaaring gustong hanapin ang mga conjugation sa kanilang telepono. Ang pakiramdam na iyon ang nag-udyok sa akin na harapin ang mobile redesign sa ikalawang araw.",
    v103_solution: "Ang mobile UI ay ibang-iba sa desktop: hindi lamang ang mga sukat ng font, kundi pati na rin ang mga ratio ng larawan at mga layout na kailangang ma-optimize para sa mas maliliit na screen.<br><br>Binago ko ang sistema ng disenyo na ginamit ko sa nakaraang mga trabaho sa web design at inangkop ito para sa mobile. Habang nagtatrabaho sa bagong header at hamburger menu, nakatagpo ako ng nakakainis na bug: ang navigation menu ay dapat na magsara kapag nag-tap sa labas nito, ngunit sa unang araw ay nagsasara lamang ito sa loob ng lugar ng header.<br><br>Pagkatapos ng dalawang araw ng pagsubok at error, natuklasan ko na ang problema ay ang z-index. Ang paglipat ng popup menu palabas ng header element ang naglutas nito. Ito ay isang mahusay na aral tungkol sa istruktura ng frontend at pamamahala ng CSS layer.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 Opisyal na Paglabas: Japanese Verb Conjugator",
    v100_summary:  "Isang web app na kumukuha ng pandiwa sa anyo ng diksyunaryo at nagpapakita ng 11 karaniwang ginagamit na conjugation.",
    v100_problem:  "Ang mga kasalukuyang site ng conjugation ng pandiwa sa Hapon ay puno ng mga advertisement at kadalasang hindi maayos na nakaayos o mahirap gamitin.",
    v100_solution: "Ang proyekto ay nagmula sa isang simpleng tanong: kaya ko bang bumuo ng isang kasangkapan ng conjugation na gusto ko talaga gamitin?",
  },

  // =====================
  // ar — Arabic
  // =====================
  ar: {
    // Footer
    footer_copy: "© 2026 Eric Chou",

    // Shared row labels
    label_summary:  "ملخص:",
    label_problem:  "المشكلة:",
    label_solution: "الحل:",
    label_image:    "صورة:",

    // Devlog badges
    badge_new:      "ميزة جديدة",
    badge_bug:      "إصلاح خطأ",
    badge_api:      "API",
    badge_uiux:     "UI/UX",
    badge_backend:  "الواجهة الخلفية",
    badge_quality:  "جودة",
    badge_optimize: "تحسين",

    // ver.1.0.7
    v107_title:    "ver.1.0.7 تحديث: \"Starry Dreams\"",
    v107_summary:  "تم تحديث واجهة المستخدم بثيم التصميم الجديد \"Starry Dreams.\"",
    v107_problem:  "تم بناء هذا التصميم حول ثلاثة أفكار رئيسية: الإحساس العتيق، النعومة الحالمة، والحضور الهادئ.<br><br>كان التحدي الرئيسي هو الموازنة بين الحواف الصلبة والناعمة، وإدارة كثافة الملمس في جميع أنحاء الواجهة. عند استخدام تأثيرات الضوء الناعم والزجاج، كان يجب التأكد من أن التصميم لا يبدو ضبابياً أو باهتاً فحسب — لذا أوليت اهتماماً للتباين والوضوح.",
    v107_solution: "صُمِّم أيضاً ليكون متوافقاً مع أسلوب \"Liquid Glass\" الذي أخطط لتطويره أكثر. أدرس حالياً أدوات وتقنيات جديدة لتطبيق تلك الجمالية بجودة أعلى.",

    // ver.1.0.6
    v106_title:    "ver.1.0.6 تحديث: سجل التطوير",
    v106_summary:  "تمت إضافة صفحة سجل التطوير.",
    v106_problem:  "بما أنني لا أزال مبتدئاً في التطوير، يحتوي هذا الموقع على كثير من الأخطاء والأجزاء غير المكتملة. لكن هذا بالضبط ما دفعني لتوثيق تفكيري وتعلمي.<br><br>إذا لاحظت أخطاء أو اقتراحات للتحسين، لا تتردد في التواصل عبر قسم الاتصال. التحدي هذه المرة لم يكن مجرد تصميم واجهة جديدة، بل تعلم كيفية توسيع موقع من صفحة واحدة إلى صفحات متعددة.",
    v106_solution: "عند التطبيق، اتضح أن بنية الكود أبسط مما توقعت. الصفحات الجديدة تُضاف أساساً كملفات HTML جديدة، مع تحديثات CSS والتوجيه المقابلة.<br><br>في ذلك الوقت، لم أكن أفهم تماماً ما هو الموقع الإلكتروني. كان نموذجي الذهني: \"الموقع الإلكتروني مثل كتاب بصفحة عمودية طويلة جداً.\" يقوم المستخدم بتكبير جزء واحد فقط، وعند الانتقال إلى صفحة أخرى، يعمل منطق التوجيه في app.py كفهرس للعثور على الوجهة.",

    // ver.1.0.5
    v105_title:    "ver.1.0.5 تحديث: العرض المفضل للهيراغانا",
    v105_summary:  "منع التحويل التلقائي إلى كانجي غير شائع عند إدخال الهيراغانا.",
    v105_problem:  "عند إدخال الهيراغانا، كانت بعض الأفعال تتحول تلقائياً إلى تمثيلات كانجي غير شائعة.<br><br>على سبيل المثال، كانت \"ある\" و\"できる\" و\"いらっしゃる\" تتحول إلى \"有る\" و\"出来る\" و\"居らっしゃる\" على التوالي.<br><br>نشأت هذه المشكلة من ميزة التحويل التلقائي للكانجي التي أُضيفت سابقاً. في ذلك الوقت، لم يكن لدي منظور كافٍ حول كيفية استخدام الميزة في بيئة المستخدم الفعلية.<br><br>على أي حال، يسعدني أنني اكتشفت ذلك وأصلحته مبكراً.",
    v105_solution: "أولاً، أضفت منطقاً في JP_Verb_Conjugator_v3.py للتحقق مما إذا كان الفعل يُكتب عادةً بالهيراغانا. ثم في app.py، أضفت فحصاً مسبقاً قبل تمرير الإدخال إلى منطق التحويل.<br><br>تحديداً، أنشأت قائمة بالكلمات التي يجب أن تبقى بالهيراغانا، وهذه الكلمات تُمرَّر مباشرةً إلى محرك التصريف دون تحويل. الكلمات التي ليست في القائمة تستمر في التحويل كالسابق.<br><br>بهذا الإصلاح، \"たべる\" لا تزال تتحول إلى \"食べる\"، بينما \"いらっしゃる\" تُصرَّف بشكل طبيعي بالهيراغانا.",

    // ver.1.0.3
    v103_title:    "ver.1.0.3 تحديث: إعادة تصميم واجهة الجوال",
    v103_summary:  "تمت إضافة نسخة الجوال إلى ما كان في الأصل موقعاً للحاسوب فقط.",
    v103_problem:  "بدأ هذا المشروع كتطبيق محلي صغير لتدريب Python. لكن بعد الأسبوع الأول المثير، شعرت أنه سيكون مؤسفاً الاحتفاظ به لنفسي فقط — أردت مشاركته كأداة تعليمية.<br><br>صُمِّم الموقع في الأصل للحاسوب. لكنني أدركت أن كثيراً من المستخدمين ربما لا يحملون حاسوباً محمولاً، وأن شخصاً ما في فصل اللغة اليابانية قد يريد البحث عن تصريفات على هاتفه. هذا الشعور دفعني لمعالجة إعادة تصميم الجوال في اليوم الثاني.",
    v103_solution: "واجهة الجوال مختلفة تماماً عن الحاسوب: ليس فقط أحجام الخطوط، بل نسب الصور والتخطيطات أيضاً تحتاج إلى تحسين للشاشات الأصغر.<br><br>راجعت نظام التصميم الذي استخدمته في أعمال تصميم الويب السابقة وتكيفت مع الجوال. أثناء العمل على الرأس الجديد وقائمة الهمبرغر، واجهت خطأً محبطاً: كان من المفترض أن تغلق قائمة التنقل عند النقر خارجها، لكن في اليوم الأول لم تكن تغلق إلا داخل منطقة الرأس.<br><br>بعد يومين من التجربة والخطأ، وجدت أن المشكلة كانت z-index. نقل القائمة المنبثقة خارج عنصر الرأس حلّها. كان ذلك درساً رائعاً في بنية الواجهة الأمامية وإدارة طبقات CSS.",

    // ver.1.0.0
    v100_title:    "ver.1.0.0 الإصدار الرسمي: أداة تصريف الأفعال اليابانية",
    v100_summary:  "تطبيق ويب يأخذ الفعل بصيغة القاموس ويعرض 11 تصريفاً شائع الاستخدام.",
    v100_problem:  "كانت مواقع تصريف الأفعال اليابانية الموجودة مليئة بالإعلانات وغالباً ما تكون سيئة التنظيم أو صعبة الاستخدام.",
    v100_solution: "جاء المشروع من سؤال بسيط: هل أستطيع بناء أداة تصريف أريد استخدامها بنفسي؟",
  },

};

// ===== ver.1.1.0 patch =====
const patches_110 = {
  ja: {
    v110_title:      "ver.1.1.0 大型アップデート：「多言語サポート！」",
    v110_summary:    "世界中の日本語学習者に向けて、多言語サポート機能を追加しました。",
    v110_problem:    "このプロジェクトは、もともと自分自身のために作り始めたツールでした。しかし、約1か月間アップデートを続ける中で、多くの方々からサポートや改善案をいただくようになり、「もっと幅広い人に使ってもらえるサイトにしたい」という気持ちが強くなっていきました。<br><br>また、日本へ来てから、多くの同級生がパソコンを持っていないことにも気づきました。そのため、ブラウザ翻訳機能に頼るだけではなく、サイト自体に翻訳機能を内蔵することで、より直感的で使いやすい体験を提供したいと考えるようになりました。",
    v110_solution:   "もちろん、GoogleやAppleのブラウザには既に翻訳機能が存在しています。しかし、それらの機能は、すべてのユーザーにとって必ずしも分かりやすく、使いやすいとは限りません。<br><br>そこで、このWebサイトでは内蔵型の多言語翻訳機能を実装しました。できる限り「正確」「高速」「シンプル」で使いやすい翻訳体験を目指しています。",
    v110_lang_label: "言語：",
    v110_languages:  "日本語、英語、中国語（簡字）、韓国語、スペイン語、ポルトガル語、フランス語、インドネシア語、ベトナム語、ヒンディー語、ネパール語、ビルマ語、タイ語、タガログ語、アラビア語<br><br>今後も、ユーザーからの要望に応じて対応言語を順次追加していく予定です。もしご希望の言語がありましたら、ぜひ「お問い合わせ」からお気軽にご連絡ください。",
  },
  en: {
    v110_title:      "ver.1.1.0 Major Update: \"Multilingual Support!\"",
    v110_summary:    "Added multilingual support for Japanese learners around the world.",
    v110_problem:    "This project started as a tool I built for myself. But after a month of continuous updates, I started receiving support and suggestions from many people, and my desire grew to make the site accessible to a wider audience.<br><br>Since coming to Japan, I also noticed that many of my classmates don't own a computer. Rather than relying solely on browser translation tools, I wanted to build the translation feature directly into the site for a more intuitive and accessible experience.",
    v110_solution:   "Of course, Google and Apple browsers already have translation features. But those aren't always intuitive or easy to use for every user.<br><br>So I implemented a built-in multilingual translation system for this site, aiming for a translation experience that is as accurate, fast, and simple as possible.",
    v110_lang_label: "Languages:",
    v110_languages:  "Japanese, English, Chinese (Simplified), Korean, Spanish, Portuguese, French, Indonesian, Vietnamese, Hindi, Nepali, Burmese, Thai, Tagalog, Arabic<br><br>I plan to continue adding more languages based on user requests. If there's a language you'd like to see, please feel free to reach out through the Contact section.",
  },
  zh: {
    v110_title:      "ver.1.1.0 重大更新：「多语言支持！」",
    v110_summary:    "为全球日语学习者新增了多语言支持功能。",
    v110_problem:    "这个项目最初是为自己开发的工具。但在持续更新约一个月后，越来越多的人给予支持和改进建议，让我萌生了「希望更多人能使用这个网站」的想法。<br><br>来到日本后，我也注意到很多同学没有电脑。因此，与其依赖浏览器翻译功能，不如在网站本身内置翻译功能，从而提供更直观、更易用的体验。",
    v110_solution:   "当然，Google和Apple的浏览器已经具备翻译功能。但这些功能对所有用户来说并不一定直观易用。<br><br>因此，本网站实现了内置多语言翻译功能，力求提供尽可能「准确」「快速」「简洁」的翻译体验。",
    v110_lang_label: "语言：",
    v110_languages:  "日语、英语、中文（简体）、韩语、西班牙语、葡萄牙语、法语、印度尼西亚语、越南语、印地语、尼泊尔语、缅甸语、泰语、他加禄语、阿拉伯语<br><br>今后将根据用户需求陆续增加支持语言。如有希望添加的语言，欢迎通过「联系我们」告知。",
  },
  ko: {
    v110_title:      "ver.1.1.0 대형 업데이트：「다국어 지원！」",
    v110_summary:    "전 세계 일본어 학습자를 위해 다국어 지원 기능을 추가했습니다.",
    v110_problem:    "이 프로젝트는 원래 자신을 위해 만들기 시작한 도구였습니다. 하지만 약 1개월간 업데이트를 계속하는 과정에서 많은 분들로부터 지원과 개선 아이디어를 받게 되었고, 「더 많은 사람들이 사용할 수 있는 사이트로 만들고 싶다」는 마음이 강해졌습니다.<br><br>일본에 온 후, 많은 학우들이 컴퓨터를 가지고 있지 않다는 것도 알게 되었습니다. 그래서 브라우저 번역 기능에만 의존하지 않고, 사이트 자체에 번역 기능을 내장하여 보다 직관적이고 사용하기 편한 경험을 제공하고자 했습니다.",
    v110_solution:   "물론 Google과 Apple 브라우저에는 이미 번역 기능이 있습니다. 하지만 그 기능이 모든 사용자에게 항상 직관적이고 사용하기 쉬운 것은 아닙니다.<br><br>그래서 이 웹사이트에는 내장형 다국어 번역 기능을 구현했습니다. 가능한 한 「정확」「빠르고」「심플」하고 사용하기 쉬운 번역 경험을 목표로 하고 있습니다.",
    v110_lang_label: "언어：",
    v110_languages:  "일본어, 영어, 중국어(간체), 한국어, 스페인어, 포르투갈어, 프랑스어, 인도네시아어, 베트남어, 힌디어, 네팔어, 버마어, 태국어, 타갈로그어, 아랍어<br><br>앞으로도 사용자의 요청에 따라 지원 언어를 순차적으로 추가할 예정입니다. 원하는 언어가 있으시면 「문의하기」를 통해 편하게 연락해 주세요.",
  },
  es: {
    v110_title:      "ver.1.1.0 Gran actualización: \"¡Soporte multilingüe!\"",
    v110_summary:    "Se añadió soporte multilingüe para estudiantes de japonés de todo el mundo.",
    v110_problem:    "Este proyecto comenzó como una herramienta que construí para mí mismo. Pero tras un mes de actualizaciones continuas, empecé a recibir apoyo y sugerencias de muchas personas, y creció en mí el deseo de hacer el sitio accesible para un público más amplio.<br><br>Desde que llegué a Japón, también noté que muchos de mis compañeros no tienen computadora. En lugar de depender solo de las herramientas de traducción del navegador, quise incorporar la función de traducción directamente en el sitio para una experiencia más intuitiva y accesible.",
    v110_solution:   "Por supuesto, los navegadores de Google y Apple ya tienen funciones de traducción. Pero no siempre son intuitivas ni fáciles de usar para todos los usuarios.<br><br>Por eso implementé un sistema de traducción multilingüe integrado en este sitio, buscando una experiencia de traducción lo más precisa, rápida y sencilla posible.",
    v110_lang_label: "Idiomas:",
    v110_languages:  "Japonés, Inglés, Chino (Simplificado), Coreano, Español, Portugués, Francés, Indonesio, Vietnamita, Hindi, Nepalí, Birmano, Tailandés, Tagalo, Árabe<br><br>Planeo seguir añadiendo más idiomas según las solicitudes de los usuarios. Si hay algún idioma que te gustaría ver, no dudes en contactarme a través de la sección de Contacto.",
  },
  pt: {
    v110_title:      "ver.1.1.0 Grande Atualização: \"Suporte Multilíngue!\"",
    v110_summary:    "Adicionado suporte multilíngue para estudantes de japonês ao redor do mundo.",
    v110_problem:    "Este projeto começou como uma ferramenta que construí para mim mesmo. Mas após um mês de atualizações contínuas, comecei a receber apoio e sugestões de muitas pessoas, e cresceu em mim o desejo de tornar o site acessível a um público mais amplo.<br><br>Desde que cheguei ao Japão, também percebi que muitos dos meus colegas não têm computador. Em vez de depender apenas das ferramentas de tradução do navegador, quis incorporar o recurso de tradução diretamente no site para uma experiência mais intuitiva e acessível.",
    v110_solution:   "Claro, os navegadores do Google e da Apple já têm recursos de tradução. Mas nem sempre são intuitivos ou fáceis de usar para todos os usuários.<br><br>Por isso implementei um sistema de tradução multilíngue integrado neste site, visando uma experiência de tradução o mais precisa, rápida e simples possível.",
    v110_lang_label: "Idiomas:",
    v110_languages:  "Japonês, Inglês, Chinês (Simplificado), Coreano, Espanhol, Português, Francês, Indonésio, Vietnamita, Hindi, Nepalês, Birmanês, Tailandês, Tagalo, Árabe<br><br>Pretendo continuar adicionando mais idiomas com base nas solicitações dos usuários. Se houver um idioma que você gostaria de ver, sinta-se à vontade para entrar em contato pela seção de Contato.",
  },
  fr: {
    v110_title:      "ver.1.1.0 Mise à jour majeure : \"Support multilingue !\"",
    v110_summary:    "Ajout du support multilingue pour les apprenants de japonais du monde entier.",
    v110_problem:    "Ce projet a commencé comme un outil que j'ai créé pour moi-même. Mais après un mois de mises à jour continues, j'ai commencé à recevoir du soutien et des suggestions de nombreuses personnes, et le désir de rendre le site accessible à un public plus large a grandi en moi.<br><br>Depuis mon arrivée au Japon, j'ai également remarqué que beaucoup de mes camarades n'ont pas d'ordinateur. Plutôt que de me fier uniquement aux outils de traduction du navigateur, j'ai voulu intégrer la fonction de traduction directement dans le site pour une expérience plus intuitive et accessible.",
    v110_solution:   "Bien sûr, les navigateurs de Google et Apple disposent déjà de fonctions de traduction. Mais celles-ci ne sont pas toujours intuitives ni faciles à utiliser pour tous les utilisateurs.<br><br>J'ai donc implémenté un système de traduction multilingue intégré dans ce site, visant une expérience de traduction aussi précise, rapide et simple que possible.",
    v110_lang_label: "Langues :",
    v110_languages:  "Japonais, Anglais, Chinois (Simplifié), Coréen, Espagnol, Portugais, Français, Indonésien, Vietnamien, Hindi, Népalais, Birman, Thaï, Tagalog, Arabe<br><br>Je prévois de continuer à ajouter des langues en fonction des demandes des utilisateurs. Si vous souhaitez voir une langue en particulier, n'hésitez pas à me contacter via la section Contact.",
  },
  id: {
    v110_title:      "ver.1.1.0 Pembaruan Besar: \"Dukungan Multibahasa!\"",
    v110_summary:    "Menambahkan dukungan multibahasa untuk pelajar bahasa Jepang di seluruh dunia.",
    v110_problem:    "Proyek ini awalnya adalah alat yang saya buat untuk diri sendiri. Namun setelah sebulan melakukan pembaruan terus-menerus, saya mulai menerima dukungan dan saran dari banyak orang, dan keinginan untuk membuat situs ini dapat diakses oleh lebih banyak orang semakin kuat.<br><br>Sejak datang ke Jepang, saya juga menyadari bahwa banyak teman sekelas saya tidak memiliki komputer. Daripada hanya mengandalkan fitur terjemahan browser, saya ingin membangun fitur terjemahan langsung ke dalam situs untuk pengalaman yang lebih intuitif dan mudah diakses.",
    v110_solution:   "Tentu saja, browser Google dan Apple sudah memiliki fitur terjemahan. Namun fitur tersebut tidak selalu intuitif atau mudah digunakan untuk semua pengguna.<br><br>Oleh karena itu saya mengimplementasikan sistem terjemahan multibahasa bawaan di situs ini, dengan tujuan memberikan pengalaman terjemahan yang seakurat, secepat, dan sesederhana mungkin.",
    v110_lang_label: "Bahasa:",
    v110_languages:  "Jepang, Inggris, Cina (Sederhana), Korea, Spanyol, Portugis, Prancis, Indonesia, Vietnam, Hindi, Nepali, Burma, Thai, Tagalog, Arab<br><br>Saya berencana untuk terus menambahkan lebih banyak bahasa berdasarkan permintaan pengguna. Jika ada bahasa yang ingin Anda lihat, jangan ragu untuk menghubungi melalui bagian Kontak.",
  },
  vi: {
    v110_title:      "ver.1.1.0 Cập nhật lớn: \"Hỗ trợ đa ngôn ngữ!\"",
    v110_summary:    "Đã thêm hỗ trợ đa ngôn ngữ cho người học tiếng Nhật trên toàn thế giới.",
    v110_problem:    "Dự án này bắt đầu như một công cụ tôi tự xây dựng cho mình. Nhưng sau một tháng cập nhật liên tục, tôi bắt đầu nhận được sự hỗ trợ và góp ý từ nhiều người, và mong muốn làm cho trang web tiếp cận được nhiều người hơn ngày càng lớn hơn.<br><br>Kể từ khi đến Nhật Bản, tôi cũng nhận thấy nhiều bạn cùng lớp không có máy tính. Thay vì chỉ dựa vào công cụ dịch của trình duyệt, tôi muốn tích hợp tính năng dịch trực tiếp vào trang web để mang lại trải nghiệm trực quan và dễ tiếp cận hơn.",
    v110_solution:   "Tất nhiên, trình duyệt của Google và Apple đã có tính năng dịch. Nhưng những tính năng đó không phải lúc nào cũng trực quan hay dễ sử dụng với mọi người dùng.<br><br>Vì vậy tôi đã triển khai hệ thống dịch đa ngôn ngữ tích hợp sẵn trong trang web này, hướng đến trải nghiệm dịch càng chính xác, nhanh và đơn giản càng tốt.",
    v110_lang_label: "Ngôn ngữ:",
    v110_languages:  "Tiếng Nhật, Tiếng Anh, Tiếng Trung (Giản thể), Tiếng Hàn, Tiếng Tây Ban Nha, Tiếng Bồ Đào Nha, Tiếng Pháp, Tiếng Indonesia, Tiếng Việt, Tiếng Hindi, Tiếng Nepal, Tiếng Miến Điện, Tiếng Thái, Tiếng Tagalog, Tiếng Ả Rập<br><br>Tôi dự định tiếp tục thêm nhiều ngôn ngữ hơn dựa trên yêu cầu của người dùng. Nếu có ngôn ngữ bạn muốn thấy, hãy liên hệ qua phần Liên hệ.",
  },
  hi: {
    v110_title:      "ver.1.1.0 बड़ा अपडेट: \"बहुभाषी समर्थन!\"",
    v110_summary:    "दुनिया भर के जापानी भाषा सीखने वालों के लिए बहुभाषी समर्थन जोड़ा गया।",
    v110_problem:    "यह प्रोजेक्ट मूल रूप से मैंने अपने लिए बनाया था। लेकिन लगभग एक महीने के लगातार अपडेट के बाद, कई लोगों से समर्थन और सुझाव मिलने लगे, और मन में यह इच्छा बढ़ती गई कि इस साइट को और अधिक लोगों तक पहुंचाया जाए।<br><br>जापान आने के बाद मुझे यह भी पता चला कि कई सहपाठियों के पास कंप्यूटर नहीं है। इसलिए केवल ब्राउज़र अनुवाद पर निर्भर रहने के बजाय, साइट में ही अनुवाद सुविधा जोड़ने का निर्णय लिया ताकि अनुभव अधिक सहज और सुलभ हो।",
    v110_solution:   "बेशक, Google और Apple के ब्राउज़र में पहले से अनुवाद सुविधा मौजूद है। लेकिन वे सुविधाएं सभी उपयोगकर्ताओं के लिए हमेशा सहज और उपयोग में आसान नहीं होतीं।<br><br>इसलिए इस वेबसाइट में एक अंतर्निहित बहुभाषी अनुवाद प्रणाली लागू की गई है, जो यथासंभव सटीक, तेज़ और सरल अनुवाद अनुभव प्रदान करने का लक्ष्य रखती है।",
    v110_lang_label: "भाषाएं:",
    v110_languages:  "जापानी, अंग्रेजी, चीनी (सरलीकृत), कोरियाई, स्पेनिश, पुर्तगाली, फ्रेंच, इंडोनेशियाई, वियतनामी, हिंदी, नेपाली, बर्मी, थाई, तागालोग, अरबी<br><br>भविष्य में उपयोगकर्ताओं की मांग के अनुसार और भाषाएं जोड़ने की योजना है। यदि आप किसी भाषा को जोड़वाना चाहते हैं, तो Contact अनुभाग के माध्यम से बेझिझक संपर्क करें।",
  },
  ne: {
    v110_title:      "ver.1.1.0 ठूलो अपडेट: \"बहुभाषी समर्थन!\"",
    v110_summary:    "विश्वभरका जापानी भाषा सिक्नेहरूका लागि बहुभाषी समर्थन थपियो।",
    v110_problem:    "यो प्रोजेक्ट मूलतः आफ्नैलागि बनाएको थिएँ। तर लगभग एक महिना लगातार अपडेट गर्दै जाँदा धेरै मान्छेहरूबाट समर्थन र सुझावहरू आउन थाले, र यो साइटलाई अझ धेरै मान्छेहरूसम्म पुर्‍याउने इच्छा बढ्दै गयो।<br><br>जापान आएपछि धेरै सहपाठीहरूसँग कम्प्युटर नरहेको पनि थाहा भयो। त्यसैले ब्राउजर अनुवादमा मात्र निर्भर नरहेर साइटमै अनुवाद सुविधा राख्ने निर्णय गरियो ताकि अनुभव अझ सहज र सुलभ होस्।",
    v110_solution:   "Google र Apple ब्राउजरमा पहिलेदेखि नै अनुवाद सुविधा छ। तर ती सुविधाहरू सबै प्रयोगकर्ताका लागि सधैँ सहज र प्रयोगमा सजिलो हुन्न।<br><br>त्यसैले यस वेबसाइटमा अन्तर्निहित बहुभाषी अनुवाद प्रणाली लागू गरिएको छ, जुन यथासम्भव सटीक, छिटो र सरल अनुवाद अनुभव प्रदान गर्ने लक्ष्य राख्छ।",
    v110_lang_label: "भाषाहरू:",
    v110_languages:  "जापानी, अंग्रेजी, चिनियाँ (सरलीकृत), कोरियाली, स्पेनिश, पोर्तुगाली, फ्रान्सेली, इन्डोनेसियाली, भियतनामी, हिन्दी, नेपाली, बर्मी, थाई, तागालोग, अरबी<br><br>भविष्यमा प्रयोगकर्ताहरूको अनुरोधअनुसार थप भाषाहरू थप्ने योजना छ। कुनै भाषा थप्न चाहनुहुन्छ भने Contact खण्डबाट सम्पर्क गर्नुस्।",
  },
  my: {
    v110_title:      "ver.1.1.0 အကြီးစားအပ်ဒိတ်: \"ဘာသာစကားများစွာ ပံ့ပိုးမှု!\"",
    v110_summary:    "ကမ္ဘာတစ်ဝှမ်းရှိ ဂျပန်ဘာသာ သင်ယူသူများအတွက် ဘာသာစကားများစွာ ပံ့ပိုးမှုကို ထည့်သွင်းခဲ့သည်။",
    v110_problem:    "ဤပရောဂျက်သည် မူလကတည်းက ကိုယ်တိုင်အသုံးပြုရန် တည်ဆောက်ခဲ့သော ကိရိယာဖြစ်သည်။ သို့သော် တစ်လကြာ အဆက်မပြတ် update လုပ်ရင်း လူများစွာထံမှ ပံ့ပိုးမှုနှင့် အကြံဉာဏ်များ ရရှိလာပြီး ဤဆိုက်ကို ပိုမိုများပြားသော လူများ ဝင်ရောက်နိုင်အောင် ပြုလုပ်ချင်သော ဆန္ဒ တိုးပွားလာခဲ့သည်။<br><br>ဂျပန်သို့ ရောက်ရှိပြီးနောက် လူတန်းစားဖော်များ အများစုတွင် ကွန်ပျူတာ မရှိကြောင်း သိလာခဲ့သည်။ ထို့ကြောင့် ဘရောက်ဆာ ဘာသာပြန်ကိရိယာများကိုသာ မမှီခိုဘဲ ဆိုက်ထဲသို့ ဘာသာပြန်လုပ်ဆောင်ချက်ကို တိုက်ရိုက်ထည့်သွင်းကာ ပိုမိုလွယ်ကူသော အတွေ့အကြုံ ပေးချင်ခဲ့သည်။",
    v110_solution:   "Google နှင့် Apple ဘရောက်ဆာများတွင် ဘာသာပြန်လုပ်ဆောင်ချက်များ ရှိပြီးဖြစ်သည်။ သို့သော် ထိုလုပ်ဆောင်ချက်များသည် အသုံးပြုသူ အားလုံးအတွက် အမြဲတမ်း လွယ်ကူမည်တော့ မဟုတ်ပါ။<br><br>ထို့ကြောင့် ဤဝက်ဘ်ဆိုက်တွင် built-in ဘာသာစကားများစွာ ဘာသာပြန်စနစ်ကို အကောင်အထည်ဖော်ခဲ့ပြီး တတ်နိုင်သမျှ တိကျ၊ မြန်ဆန်၊ ရိုးရှင်းသော ဘာသာပြန် အတွေ့အကြုံ ပေးရန် ရည်မှန်းထားသည်။",
    v110_lang_label: "ဘာသာစကားများ−",
    v110_languages:  "ဂျပန်၊ အင်္ဂလိပ်၊ တရုတ် (ရိုးရှင်း)၊ ကိုရီးယား၊ စပိန်၊ ပေါ်တူဂီ၊ ပြင်သစ်၊ အင်ဒိုနီးရှား၊ ဗီယက်နမ်၊ ဟိန်ဒီ၊ နီပေါ၊ မြန်မာ၊ ထိုင်း၊ တာဂါလော့၊ အာရဗီ<br><br>အနာဂတ်တွင် အသုံးပြုသူများ၏ တောင်းဆိုမှုအပေါ် မူတည်ကာ ဘာသာစကားများ ဆက်လက်ထည့်သွင်းသွားမည်ဖြစ်သည်။ ဘာသာစကားတစ်ခုခု ထည့်သွင်းပေးစေလိုပါက Contact ကဏ္ဍမှ ဆက်သွယ်နိုင်သည်။",
  },
  th: {
    v110_title:      "ver.1.1.0 อัปเดตใหญ่: \"รองรับหลายภาษา!\"",
    v110_summary:    "เพิ่มการรองรับหลายภาษาสำหรับผู้เรียนภาษาญี่ปุ่นทั่วโลก",
    v110_problem:    "โปรเจกต์นี้เริ่มต้นเป็นเครื่องมือที่สร้างขึ้นสำหรับตัวเอง แต่หลังจากอัปเดตต่อเนื่องมาประมาณหนึ่งเดือน เริ่มได้รับการสนับสนุนและข้อเสนอแนะจากผู้คนมากมาย ความปรารถนาที่จะทำให้ไซต์เข้าถึงผู้คนในวงกว้างขึ้นก็เติบโตขึ้น<br><br>ตั้งแต่มาถึงญี่ปุ่น ยังสังเกตด้วยว่าเพื่อนร่วมชั้นหลายคนไม่มีคอมพิวเตอร์ แทนที่จะพึ่งพาเครื่องมือแปลของเบราว์เซอร์เพียงอย่างเดียว จึงต้องการสร้างฟีเจอร์การแปลเข้าไปในไซต์โดยตรงเพื่อประสบการณ์ที่ใช้งานง่ายและเข้าถึงได้มากขึ้น",
    v110_solution:   "แน่นอน เบราว์เซอร์ของ Google และ Apple มีฟีเจอร์แปลอยู่แล้ว แต่ฟีเจอร์เหล่านั้นไม่ได้ใช้งานง่ายสำหรับผู้ใช้ทุกคนเสมอไป<br><br>จึงได้ติดตั้งระบบแปลหลายภาษาแบบในตัวสำหรับไซต์นี้ โดยมุ่งหวังประสบการณ์การแปลที่แม่นยำ รวดเร็ว และเรียบง่ายที่สุดเท่าที่จะเป็นไปได้",
    v110_lang_label: "ภาษา:",
    v110_languages:  "ญี่ปุ่น, อังกฤษ, จีน (ตัวย่อ), เกาหลี, สเปน, โปรตุเกส, ฝรั่งเศส, อินโดนีเซีย, เวียดนาม, ฮินดี, เนปาล, พม่า, ไทย, ตากาล็อก, อาหรับ<br><br>วางแผนที่จะเพิ่มภาษาอื่นๆ ต่อไปตามคำขอของผู้ใช้ หากมีภาษาที่ต้องการเพิ่ม สามารถติดต่อได้ผ่านส่วนติดต่อ",
  },
  tl: {
    v110_title:      "ver.1.1.0 Malaking Update: \"Multilingual na Suporta!\"",
    v110_summary:    "Idinagdag ang multilingual na suporta para sa mga nag-aaral ng Hapon sa buong mundo.",
    v110_problem:    "Ang proyektong ito ay nagsimula bilang isang kasangkapan na ginawa ko para sa sarili ko. Ngunit pagkatapos ng isang buwan ng tuluy-tuloy na mga update, nagsimula akong makatanggap ng suporta at mungkahi mula sa maraming tao, at lumaki ang aking pagnanais na gawing accessible ang site para sa mas malawak na madla.<br><br>Mula nang dumating sa Japan, napansin ko rin na marami sa aking mga kaklase ang walang kompyuter. Sa halip na umasa lamang sa mga tool sa pagsasalin ng browser, nais kong isama ang feature ng pagsasalin nang direkta sa site para sa isang mas intuitive at accessible na karanasan.",
    v110_solution:   "Siyempre, ang mga browser ng Google at Apple ay mayroon nang mga feature ng pagsasalin. Ngunit ang mga ito ay hindi laging intuitive o madaling gamitin para sa lahat ng gumagamit.<br><br>Kaya naman nagpatupad ako ng built-in na multilingual na sistema ng pagsasalin para sa site na ito, na naglalayong magbigay ng karanasan sa pagsasalin na kasing tumpak, mabilis, at simple hangga't maaari.",
    v110_lang_label: "Mga Wika:",
    v110_languages:  "Hapon, Ingles, Tsino (Pinasimple), Koreano, Espanyol, Portuges, Pranses, Indonesyo, Biyetnames, Hindi, Nepali, Burmese, Thai, Tagalog, Arabe<br><br>Plano kong magpatuloy na magdagdag ng mas maraming wika batay sa mga kahilingan ng gumagamit. Kung mayroon kang wikang nais mong makita, huwag mag-atubiling makipag-ugnayan sa pamamagitan ng seksyon ng Makipag-ugnayan.",
  },
  ar: {
    v110_title:      "ver.1.1.0 تحديث كبير: \"دعم متعدد اللغات!\"",
    v110_summary:    "تمت إضافة دعم متعدد اللغات لمتعلمي اليابانية حول العالم.",
    v110_problem:    "بدأ هذا المشروع كأداة بنيتها لنفسي. لكن بعد شهر من التحديثات المستمرة، بدأت أتلقى الدعم والاقتراحات من كثير من الناس، ونما لدي الرغبة في جعل الموقع أكثر وصولاً لجمهور أوسع.<br><br>منذ قدومي إلى اليابان، لاحظت أيضاً أن كثيراً من زملائي لا يملكون حاسوباً. بدلاً من الاعتماد فقط على أدوات الترجمة في المتصفح، أردت دمج ميزة الترجمة مباشرة في الموقع لتجربة أكثر سهولة وإتاحة.",
    v110_solution:   "بالطبع، متصفحات Google وApple تمتلك بالفعل ميزات الترجمة. لكنها ليست دائماً سهلة الاستخدام لجميع المستخدمين.<br><br>لذا قمت بتنفيذ نظام ترجمة متعدد اللغات مدمج في هذا الموقع، بهدف تقديم تجربة ترجمة دقيقة وسريعة وبسيطة قدر الإمكان.",
    v110_lang_label: "اللغات:",
    v110_languages:  "اليابانية، الإنجليزية، الصينية (المبسطة)، الكورية، الإسبانية، البرتغالية، الفرنسية، الإندونيسية، الفيتنامية، الهندية، النيبالية، البورمية، التايلاندية، التاغالوغية، العربية<br><br>أخطط للاستمرار في إضافة المزيد من اللغات بناءً على طلبات المستخدمين. إذا كنت ترغب في رؤية لغة معينة، فلا تتردد في التواصل عبر قسم الاتصال.",
  },
};

Object.keys(patches_110).forEach(lang => {
  if (translations_devlog[lang]) {
    Object.assign(translations_devlog[lang], patches_110[lang]);
  }
});
