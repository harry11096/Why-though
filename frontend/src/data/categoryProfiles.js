// Category profiles keep the product voice, visual identity, and result bands
// separate from the React view code. This is the main content-editing surface.
export const CATEGORY_PROFILES = [
  {
    departmentCode: 'Department 01',
    theme: 'midnight',
    matches: ['midnight convenience store research department', '便利店凌晨3点研究部'],
    title: '便利店凌晨3点研究部',
    titleEn: 'Midnight Convenience Store Research Department',
    intro:
      '这里研究的是：为什么人在凌晨三点走进便利店时，会突然觉得人生很奇怪。',
    introEn:
      'This department studies why people suddenly feel that life is strange when they walk into a convenience store at 3 AM.',
    vibe: ['深夜', '孤独', '都市', '便利店', '微波炉', '冷白灯', '人生暂停加载'],
    vibeEn: ['Midnight', 'Loneliness', 'City life', 'Convenience store', 'Microwave', 'Cold white light', 'Life buffering'],
    categoryHintZh: '凌晨三点。便利店。你突然有点懂了。',
    categoryHint: '3 AM. Convenience store lights. You get it now.',
    questionLeadZh:
      '研究部门正在观察：你会不会认真回答关于饭团、自动门和情绪冷藏的问题。',
    questionLead:
      'The department is now observing how seriously you answer questions about rice balls, automatic doors, and emotional refrigeration.',
    resultLabelZh: '部门结论',
    resultLabel: 'Department Result',
    submitLabelZh: '提交给研究部门',
    submitLabel: 'Submit to the department',
    retryLabelZh: '进入下一轮观察',
    retryLabel: 'Enter another round of observation',
    scoreBands: [
      {
        max: 0.25,
        code: 'CVS-00',
        title: 'Steel Plate Personality',
        titleZh: '钢板人格',
        titleEn: 'Steel Plate Personality',
        note:
          '系统检测到：你对凌晨便利店、饭团、微波炉和人生崩溃之间的关系几乎没有感知。',
        noteEn:
          'System detection: you have almost no sensitivity to the relationship between 3 AM convenience stores, streetlights, rice balls, microwaves, and life falling apart.',
        analysis:
          '你似乎几乎完全免疫于凌晨三点便利店的情绪辐射。你看到路灯，只会想“亮着。”你看到饭团，只会想“多少钱？”',
        analysisEn:
          'You seem almost fully immune to the emotional radiation of 3 AM convenience stores. You see a streetlight and simply think, “It is on.” You see a rice ball and only ask how much it costs.',
        reportBodyZh: [
          '你这种人很稳定，稳定到有点离谱。别人半夜走进便利店，可能会突然想到人生、梦想、前任、未来和银行卡余额，但你大概率真的只是来买东西。',
          '你看到饭团，只会想“多少钱？”你看到路灯，只会想“亮着。”你看到凌晨三点的冷白灯，也不会觉得人生被照穿，只会觉得“这灯挺亮。”',
          '这不是缺点，甚至可以说是一种非常稀有的反抽象体质。你的精神世界像一块钢板：很硬，很直，不容易弯，也不容易被互联网污染。'
        ],
        reportBodyEn: [
          'People like you are very stable, almost absurdly stable. When others walk into a convenience store at night and start thinking about life, exes, the future, and their bank balance, you are probably genuinely just there to buy something.',
          'You see a rice ball and think “How much is it?” You see a streetlight and think “It is on.” Even under cold white lighting at 3 AM, you do not feel exposed by life. You only think the light is bright.',
          'This is not a flaw. It is a rare anti-absurdity constitution. Your inner world is like a steel plate: hard, straight, difficult to bend, and difficult for the internet to contaminate.'
        ],
        traitsZh: ['不容易被冷笑话打动', '不太会深夜 emo', '很少对物品产生奇怪共情', '看见便利店就是便利店', '不会在自动门前怀疑人生'],
        traitsEn: ['Not easily moved by bad jokes', 'Unlikely to become emotional late at night', 'Rarely develops strange empathy toward objects', 'Sees a convenience store as just a convenience store', 'Does not question life in front of an automatic door'],
        systemEvaluationZh: ['“你对荒诞内容具有天然免疫力。”', '“你可能是本测试最难影响的人。”', '“系统尝试分析你，但被反弹了。”'],
        systemEvaluationEn: ['“You have natural immunity to absurd content.”', '“You may be the hardest person for this test to influence.”', '“The system attempted to analyze you, but the analysis bounced back.”'],
        hiddenNoteZh: ['钢板人格不是无聊。', '钢板人格是这个荒诞世界里最后的物理防御。'],
        hiddenNoteEn: ['Steel Plate Personality is not boring.', 'It is the final physical defense in this absurd world.'],
        verdict:
          '你不是没有灵魂，你只是灵魂做了防水处理。',
        verdictEn:
          'It is not that you have no soul. Your soul is simply waterproofed.',
      },
      {
        max: 0.5,
        code: 'CVS-26',
        title: 'Rice Ball Personality',
        titleZh: '饭团人格',
        titleEn: 'Rice Ball Personality',
        note:
          '系统检测到：你开始理解荒诞，但还在假装自己正常。',
        noteEn:
          'System detection: you are beginning to understand absurdity, but you are still pretending to be normal.',
        analysis:
          '你已经开始理解为什么便利店的沉默这么像人类，但你仍然试图把这一切解释成“只是太累了”。表面稳定，内部临期。',
        analysisEn:
          'You already understand why convenience-store silence feels strangely human, but you still try to explain it away as tiredness. Outwardly stable. Internally close to expiry.',
        reportBodyZh: [
          '你看起来可以正常上课、正常工作、正常回复消息、正常买饭，但实际上你的精神保质期非常短。白天也许没什么问题，一到深夜就会开始想一些没有用但很重要的东西。',
          '你偶尔会觉得饭团可怜，觉得路灯孤独，觉得打折三明治像自己，但很快又会告诉自己：“算了，可能只是我太累了。”',
          '系统认为你处于“正常人与互联网精神体之间”的过渡阶段。你不是特别抽象，但已经开始松动。'
        ],
        reportBodyEn: [
          'You look capable of attending class, working, replying to messages, and buying food normally, but your emotional shelf life is very short. During the day you seem fine. At night you start thinking about useless but strangely important things.',
          'Sometimes you feel sorry for rice balls, feel that streetlights are lonely, or feel that discounted sandwiches resemble you. Then you quickly tell yourself that you are probably just tired.',
          'The system believes you are in a transitional stage between a normal person and an internet spirit entity. You are not fully absurd yet, but you have begun to loosen.'
        ],
        traitsZh: ['容易在深夜突然伤感', '对旧聊天记录有轻微依赖', '会收藏一些以后绝对不会看的截图', '表面正常，内心容易过期', '对便利店、外卖、冷掉的咖啡有轻微共情'],
        traitsEn: ['Easily becomes sentimental late at night', 'Has a mild dependence on old chat records', 'Saves screenshots that will absolutely never be viewed again', 'Looks normal on the outside, but expires easily inside', 'Has mild empathy toward convenience stores, food delivery, and cold coffee'],
        systemEvaluationZh: ['“你不是完全荒诞，但已经开始松动。”', '“你仍然可以回到正常世界，但窗口期不长。”', '“建议冷藏保存，尽快食用。”'],
        systemEvaluationEn: ['“You are not fully absurd yet, but you have begun to loosen.”', '“You can still return to the normal world, but the window is closing.”', '“Recommended: keep refrigerated and consume as soon as possible.”'],
        hiddenNoteZh: ['饭团人格最危险的地方在于：你以为自己只是有点累，其实你已经开始听懂便利店的沉默了。'],
        hiddenNoteEn: ['The most dangerous part of Rice Ball Personality is that you think you are just tired, but you have already started to understand the silence of convenience stores.'],
        verdict:
          '你像便利店饭团一样，看起来很完整，其实内心已经被压成三角形。',
        verdictEn:
          'You are like a convenience store rice ball: you look complete on the outside, but inside you have already been pressed into a triangle.',
      },
      {
        max: 0.75,
        code: 'CVS-51',
        title: 'Microwave Personality',
        titleZh: '微波炉人格',
        titleEn: 'Microwave Personality',
        note:
          '系统检测到：你表面冷静，内部一直在转。',
        noteEn:
          'System detection: you appear calm on the surface, but inside, you are constantly spinning.',
        analysis:
          '你太理解深夜的荒诞了。你的人生不是突然崩溃，而是不断被重新加热。很多小事会在你脑子里转到最后，变成哲学问题。',
        analysisEn:
          'You understand late-night absurdity too well. Your life does not collapse dramatically. It reheats itself in cycles. Small thoughts keep spinning until they turn philosophical.',
        reportBodyZh: [
          '你看起来还可以，别人甚至觉得你挺正常，但只有你知道，大脑经常在后台运行很多东西。你会一边说“没事”，一边在脑子里循环播放刚才那句话是不是奇怪、对方为什么还没回、自己是不是该换一种人生。',
          '你的崩溃方式不像爆炸，更像微波炉：外面没有变化，里面一直旋转。有时候还会突然“叮”一声，然后假装自己好了。',
          '你很能理解凌晨便利店的气质，也知道冷白灯为什么像人生、临期打折区为什么像成年人。你已经不是普通用户了。'
        ],
        reportBodyEn: [
          'You seem okay, and other people may even think you are quite normal, but only you know how many processes your brain keeps running in the background. You say “I am fine” while replaying whether what you said was strange, why someone has not replied, and whether you should switch to another version of life.',
          'Your collapse does not look explosive. It looks like a microwave: nothing changes outside, but everything keeps spinning inside. Sometimes it suddenly goes ding and then pretends to be okay.',
          'You understand the atmosphere of a 3 AM convenience store very well. You know why cold white light feels like life, and why the near-expiry discount section feels like adulthood. You are no longer an ordinary user.'
        ],
        traitsZh: ['表面平静，内心高速旋转', '容易过度思考', '对“正在输入中...”敏感', '经常在小事里看见巨大隐喻', '有时会对没有生命的物品产生共情'],
        traitsEn: ['Calm on the surface, spinning rapidly inside', 'Easily overthinks', 'Sensitive to “typing…”', 'Often sees huge metaphors in tiny things', 'Sometimes develops empathy for lifeless objects'],
        systemEvaluationZh: ['“你已经不是普通用户。”', '“你开始在便利店商品中识别自我。”', '“系统建议你降低内耗功率。”'],
        systemEvaluationEn: ['“You are no longer an ordinary user.”', '“You have begun to recognize yourself in convenience store products.”', '“The system recommends lowering your internal-overthinking power level.”'],
        hiddenNoteZh: ['微波炉人格不是脆弱。', '微波炉人格是太会加热自己。你把很多小事反复加热，直到它们变成一种人生味道。'],
        hiddenNoteEn: ['Microwave Personality is not weakness.', 'It means you are too good at reheating yourself until small things turn into the taste of life.'],
        verdict:
          '你的人生不是崩溃，是反复加热。',
        verdictEn:
          'Your life is not collapsing. It is being reheated again and again.',
      },
      {
        max: 1,
        code: 'CVS-76',
        title: 'Convenience Store Fridge Personality',
        titleZh: '便利店冷藏柜人格',
        titleEn: 'Convenience Store Fridge Personality',
        note:
          '系统检测到：你已经与凌晨三点完成精神同步。',
        noteEn:
          'System detection: you have spiritually synchronized with 3 AM.',
        analysis:
          '你不是走进了便利店，而是被便利店识别了。你能从整齐排列的饮料里看见孤独，从打折食品里看见成年人，从微波炉“叮”一声里听见命运。',
        analysisEn:
          'You do not simply enter the convenience store. The convenience store recognizes you. You can see loneliness in neatly arranged drinks, adulthood in discount food, and fate inside the microwave ding.',
        reportBodyZh: [
          '你已经不是普通答题者，而是会在凌晨便利店门口短暂停留，并且真的开始思考人生的人。你能理解饭团为什么像临时自尊，自动门为什么像现实边界，打折三明治为什么像成年人。',
          '别人看到冷藏柜只会想买饮料，但你会看到整齐排列却没人选择的孤独、明亮灯光下的临期感、低温保存的情绪、透明玻璃后的距离感。',
          '你不是在玩这个测试，你是在和它进行某种奇怪的精神握手。系统已经很难判断你是在答题，还是在自我识别。'
        ],
        reportBodyEn: [
          'You are no longer an ordinary quiz taker. You are the kind of person who pauses outside a convenience store at 3 AM and genuinely starts thinking about life. You understand why rice balls resemble temporary self-esteem, why automatic doors resemble the boundary of reality, and why discounted sandwiches resemble adults.',
          'When others look at a fridge, they think about buying a drink. You see the loneliness of neat arrangement without being chosen, the near-expiry feeling under bright lights, emotions preserved at low temperature, and the distance behind transparent glass.',
          'You are not just playing this test. You are having a strange spiritual handshake with it. The system can barely tell whether you are answering questions or recognizing yourself.'
        ],
        traitsZh: ['很容易在普通场景里看见人生隐喻', '对便利店、路灯、自动门、冷饮柜都有奇怪理解', '深夜精神活动明显增强', '经常觉得自己像某种临期商品', '很适合玩抽象游戏，也很适合创造抽象内容'],
        traitsEn: ['Easily sees life metaphors in ordinary scenes', 'Has strange understandings of convenience stores, streetlights, automatic doors, and drink fridges', 'Mental activity becomes stronger at night', 'Often feels like some kind of near-expiry product', 'Very suited to playing and creating absurd-content games'],
        systemEvaluationZh: ['“你已经被便利店文明接纳。”', '“你不是冷漠，你只是低温保存。”', '“系统无法判断你是在答题，还是在自我识别。”'],
        systemEvaluationEn: ['“You have been accepted by convenience store civilization.”', '“You are not cold. You are simply preserved at low temperature.”', '“The system cannot determine whether you are answering questions or recognizing yourself.”'],
        hiddenNoteZh: ['你知道这些东西很无聊，但你仍然能从无聊里看见一种荒诞的真实。这就是你会忍不住玩下去的原因。'],
        hiddenNoteEn: ['You know these things are boring, but you can still see a kind of absurd truth inside boredom. That is why you cannot help continuing.'],
        verdict:
          '你不是冷漠，你只是低温保存。',
        verdictEn:
          'You are not cold. You are simply preserved at low temperature.',
      },
    ],
  },
  {
    departmentCode: 'Department 02',
    theme: 'observation',
    matches: ['human confusing behavior observation center', '人类迷惑行为观察中心'],
    title: '人类迷惑行为观察中心',
    titleEn: 'Human Confusing Behavior Observation Center',
    intro: '本部门长期观察一种奇怪生物：人类。系统至今无法确认：这些行为到底是智慧，还是 Bug。',
    introEn:
      'This department has been observing a strange species for a long time: humans. The system still cannot confirm whether these behaviors are intelligence, or just bugs.',
    vibe: ['人类迷惑行为', '日常荒诞', '互联网后遗症', '小动作心理学', '为什么大家都这样'],
    vibeEn: ['Confusing human behavior', 'Everyday absurdity', 'Internet aftereffects', 'Micro-behavior psychology', 'Why does everyone do this?'],
    categoryHintZh: '你做过的怪事，可能不是只有你会做。',
    categoryHint: 'Your strange habits may not be yours alone.',
    questionLeadZh:
      '观察中心正在记录你的微动作、犹豫、撤回冲动和所有“我只是随便看看”的行为痕迹。',
    questionLead:
      'The observation center is now recording your micro-behaviors, hesitation patterns, undo impulses, and every trace of “I was just checking.”',
    resultLabelZh: '观察结论',
    resultLabel: 'Observation Result',
    submitLabelZh: '提交观察记录',
    submitLabel: 'Submit observation log',
    retryLabelZh: '继续下一轮观察',
    retryLabel: 'Continue observation',
    scoreBands: [
      {
        max: 0.25,
        code: 'OBS-00',
        title: 'Folder Personality',
        titleZh: '文件夹人格',
        titleEn: 'Folder Personality',
        note: '你的精神世界像一堆名叫“最终版”“最终版2”“真的别改了”的文件夹。',
        noteEn:
          'Your inner world resembles folders named “Final Version,” “Final Version 2,” and “Final Version Seriously Do Not Edit This One.”',
        analysis:
          '你表面看起来很整齐，但系统检测到内部仍然堆满未分类情绪、临时决定、忘记删除的东西和一直没有处理的问题。',
        analysisEn:
          'You look organized on the surface, but the system detects large quantities of unclassified emotions, temporary decisions, forgotten leftovers, and unresolved issues.',
        reportBodyZh: [
          '你表面看起来很整齐，但精神世界像电脑桌面上一堆“最终版”“最终版2”“真的别改了”的文件夹。很多东西都被你归类过，但每个文件夹里面其实还是一团乱。',
          '你仍然相信事情可以整理，人生可以规划，桌面可以清空，情绪可以命名。这让你看起来比大多数人更稳定，但也让你总觉得自己“快整理好了”。',
          '系统认为你还在努力维持秩序。你的问题不是混乱，而是你总觉得再整理一下，一切就会突然变得合理。'
        ],
        reportBodyEn: [
          'You look organized on the surface, but your inner world resembles a desktop full of folders called “Final Version,” “Final Version 2,” and “Seriously Do Not Edit This One.” Many things have been archived, yet every folder is still a mess inside.',
          'You still believe that things can be organized, life can be planned, desktops can be cleaned, and emotions can be named. That makes you seem stable, but it also keeps you trapped in the belief that you are almost done organizing.',
          'The system believes you are still trying to maintain order. Your problem is not chaos itself. It is the belief that a little more sorting will suddenly make everything reasonable.'
        ],
        traitsZh: ['喜欢整理但容易半途而废', '有很多“以后再看”', '偶尔突然想改变人生', '经常保存无意义文件', '桌面不一定乱，但脑子很满', '会反复修改一句话再发送'],
        traitsEn: ['Likes organizing, but often gives up halfway', 'Has many “watch later” items', 'Occasionally suddenly wants to change life', 'Often saves meaningless files', 'The desktop may not be messy, but the brain is full', 'Repeatedly edits a sentence before sending it'],
        systemEvaluationZh: ['“你的人生仍处于可归档状态。”', '“建议定期清理缓存。”', '“系统暂未发现严重精神荒诞化。”'],
        systemEvaluationEn: ['“Your life is still in an archivable state.”', '“Regular cache cleaning is recommended.”', '“The system has not yet detected severe mental absurdification.”'],
        hiddenNoteZh: ['文件夹人格最大的问题不是混乱。', '是你一直相信自己“快整理好了”。'],
        hiddenNoteEn: ['The biggest problem of Folder Personality is not chaos.', 'It is the belief that you are almost done organizing.'],
        verdict: '你最大的问题不是混乱，而是你一直相信自己“快整理好了”。',
        verdictEn:
          'Your biggest problem is not chaos. It is that you always believe you are almost done organizing.',
      },
      {
        max: 0.5,
        code: 'OBS-26',
        title: 'Ctrl+Z Personality',
        titleZh: 'Ctrl+Z人格',
        titleEn: 'Ctrl+Z Personality',
        note: '你的人生核心技能不是前进，而是后悔、撤回和深夜复盘。',
        noteEn:
          'Your core life skill is not progress. It is regret, withdrawal, and replaying the past late at night.',
        analysis:
          '你的大脑长期后台运行“我刚才是不是不该那样说”“如果当时选另一个会怎样”。你不只是理解迷惑行为，你本身就是高频使用者。',
        analysisEn:
          'Your brain continuously runs questions like “Should I not have said that?” and “What if I had chosen differently?” You do not just understand confusing behavior. You actively produce it.',
        reportBodyZh: [
          '你的人生核心技能不是前进，而是后悔。撤回消息、修改句子、重想过去、洗澡时重新吵架，这些都是你熟悉的基本操作。',
          '你对迷惑行为已经开始有很强感知，因为你自己就是高频迷惑行为使用者。你知道为什么人会已读不回、为什么会深夜 emo、为什么会突然删朋友圈，因为你全干过。',
          '你最累的地方不是犯错，而是永远在想：有没有另一个版本的自己会更好。'
        ],
        reportBodyEn: [
          'Your core life skill is not progress. It is regret. Withdrawing messages, editing sentences, rethinking the past, and re-arguing in the shower are all routine operations for you.',
          'You have developed a strong sensitivity to confusing behavior because you are one of its most active practitioners. You understand why people leave messages on read, why they get emotional late at night, and why they suddenly delete social media posts, because you have done all of it.',
          'The most exhausting thing is not making mistakes. It is constantly wondering whether another version of you would have been better.'
        ],
        traitsZh: ['容易反复回忆过去', '会在脑子里无限模拟对话', '非常擅长后悔', '深夜情绪波动明显', '经常突然想重新开始', '会对小事情产生巨大精神内耗'],
        traitsEn: ['Easily replays the past', 'Infinitely simulates conversations in the brain', 'Very skilled at regret', 'Has obvious emotional fluctuations late at night', 'Often suddenly wants to start over', 'Turns small things into huge mental overthinking'],
        systemEvaluationZh: ['“你的人生如果有快捷键，一定是 Ctrl+Z。”', '“系统建议减少无效复盘。”', '“你已经开始和过去长期共存。”'],
        systemEvaluationEn: ['“If your life had a shortcut key, it would definitely be Ctrl+Z.”', '“The system recommends reducing useless reviews of the past.”', '“You have begun long-term coexistence with the past.”'],
        hiddenNoteZh: ['Ctrl+Z人格最累的地方不是犯错。', '是你永远在想：有没有另一个版本的我会更好。'],
        hiddenNoteEn: ['The most exhausting part of Ctrl+Z Personality is not making mistakes.', 'It is always thinking that another version of you might have been better.'],
        verdict: '如果你的人生有快捷键，那一定是 Ctrl+Z。',
        verdictEn:
          'If your life had a shortcut key, it would definitely be Ctrl+Z.',
      },
      {
        max: 0.75,
        code: 'OBS-51',
        title: 'Seen-But-No-Reply Personality',
        titleZh: '已读不回人格',
        titleEn: 'Seen-But-No-Reply Personality',
        note: '你不是没情绪，你只是一次性加载了太多情绪。',
        noteEn:
          'It is not that you have no emotions. You have simply loaded too many at once.',
        analysis:
          '你想很多、写很多、删很多。你能从一句“哈哈”、一个句号、一次撤回、一个已读里分析出完整情绪结构。',
        analysisEn:
          'You think a lot, type a lot, and delete a lot. You can build an entire emotional architecture from one “haha,” one full stop, one withdrawal, and one read receipt.',
        reportBodyZh: [
          '别人可能觉得你冷淡，但实际上你不是没情绪，你是情绪太多了。你的大脑每天都像几十个窗口同时弹出，你经常点开聊天框、打很多字、又全部删掉。',
          '你太能理解现代互联网精神状态。你知道为什么人会收藏截图、刷老歌、清理相册、反复刷新消息，因为这些行为背后其实都是“想被理解”。',
          '你最擅长的，是把一句简单的话在脑子里演变成一场战争。'
        ],
        reportBodyEn: [
          'Other people may think you are cold, but in reality, it is not that you have no emotions. You simply have too many. Your brain feels like dozens of windows popping up at once, and you often open the chat box, type a lot, then delete everything.',
          'You understand the internet mental state too well. You know why people save screenshots, replay old songs, clean up their photo albums, and keep refreshing messages, because beneath all of it is the desire to be understood.',
          'What you do best is turning one simple sentence into a war inside your head.'
        ],
        traitsZh: ['高度敏感', '容易精神内耗', '经常思考别人怎么看自己', '不擅长真正表达', '很容易深夜 emo', '会反复看旧聊天记录', '对“正在输入中...”非常敏感'],
        traitsEn: ['Highly sensitive', 'Easily overthinks', 'Often thinks about how others see you', 'Not good at truly expressing yourself', 'Easily becomes emotional late at night', 'Repeatedly rereads old chat history', 'Extremely sensitive to “typing…”'],
        systemEvaluationZh: ['“你不是冷漠，你只是加载了太多情绪。”', '“你的聊天记录已经具备文学性。”', '“系统检测到高频精神反刍行为。”'],
        systemEvaluationEn: ['“You are not cold. You just loaded too many emotions.”', '“Your chat history has already developed literary qualities.”', '“The system has detected high-frequency mental rumination.”'],
        hiddenNoteZh: ['已读不回人格最擅长的事情，是把一句简单的话在脑子里演变成一场战争。'],
        hiddenNoteEn: ['The thing Seen-But-No-Reply Personality does best is turning one simple sentence into a war inside the head.'],
        verdict: '你最擅长的，是把一句简单的话在脑子里演变成一场战争。',
        verdictEn:
          'What you do best is turning one simple sentence into a war inside your head.',
      },
      {
        max: 1,
        code: 'OBS-76',
        title: 'Buffering Failed Personality',
        titleZh: '缓冲失败人格',
        titleEn: 'Buffering Failed Personality',
        note: '你的大脑已经长期处于“正在加载人生…”的状态。',
        noteEn:
          'Your brain has long been stuck in a state of “Loading life…”',
        analysis:
          '你已经进入过度感知阶段。你能从冰箱、老歌、头像、桌面整理这些微小动作里自动附加精神结构和人生意义。',
        analysisEn:
          'You have entered the over-perception stage. Your mind automatically attaches emotional structure and existential meaning to fridges, old songs, profile pictures, and desktop cleanups.',
        reportBodyZh: [
          '你已经不是普通互联网用户，而是进入了“过度感知阶段”。别人只是打开冰箱、听老歌、换头像、整理桌面，你却会自动开始附加完整的精神结构和人生意义。',
          '你已经很难“单纯”做一件事，因为你的大脑会自动给行为附加意义。收藏截图是害怕遗忘，熬夜是在逃离白天，刷短视频是在逃离安静。',
          '你不是看透世界，你只是加载太久了。'
        ],
        reportBodyEn: [
          'You are no longer an ordinary internet user. You have entered the over-perception stage. Other people merely open the fridge, replay old songs, change profile pictures, or clean their desktops, while your mind automatically attaches complete mental structures and existential meaning.',
          'It has become difficult for you to do anything simply, because your brain keeps assigning meaning to behavior. Saving screenshots becomes fear of forgetting, staying up late becomes escape from daytime, and short-video scrolling becomes escape from silence.',
          'You have not seen through the world. You have simply been loading for too long.'
        ],
        traitsZh: ['极度容易过度思考', '非常容易精神内耗', '能从小事里感受到巨大情绪', '经常突然 existential crisis', '对互联网行为高度敏感', '会认真思考一些完全没必要的问题'],
        traitsEn: ['Extremely prone to overthinking', 'Very prone to mental exhaustion', 'Can feel huge emotions from small things', 'Often suddenly has existential crises', 'Highly sensitive to internet behavior', 'Seriously thinks about completely unnecessary questions'],
        systemEvaluationZh: ['“你的精神世界已经开始无限缓冲。”', '“系统建议停止深夜刷新人生。”', '“你不是看透世界，你只是加载太久了。”'],
        systemEvaluationEn: ['“Your mental world has begun buffering endlessly.”', '“The system recommends that you stop refreshing life late at night.”', '“You have not seen through the world. You have just been loading for too long.”'],
        hiddenNoteZh: ['最危险的地方是：你明知道这些问题没有意义，但你还是会认真思考。'],
        hiddenNoteEn: ['The most dangerous thing is that you know these questions have no meaning, but you still think about them seriously.'],
        verdict: '你不是看透世界，你只是加载太久了。',
        verdictEn:
          'You have not seen through the world. You have simply been loading for too long.',
      },
    ],
  },
  {
    departmentCode: 'Department 03',
    theme: 'cosmic',
    matches: ['cosmic nonsense laboratory', '宇宙废话实验室'],
    title: '宇宙废话实验室',
    titleEn: 'Cosmic Nonsense Laboratory',
    intro:
      '本实验室专门研究那些完全没有必要、但一旦被问出来就很难不思考的问题。系统目前无法判断：这些问题是废话，还是宇宙不小心泄露出来的真相。',
    introEn:
      'This laboratory specializes in questions that are completely unnecessary, but once asked, become impossible not to think about. The system currently cannot determine whether these questions are nonsense, or truths accidentally leaked by the universe.',
    vibe: ['宇宙级废话', '无厘头哲学', '物品拟人', '生物荒诞', '一本正经地胡说八道'],
    vibeEn: ['Cosmic-level nonsense', 'Absurd philosophy', 'Object personification', 'Biological absurdity', 'Speaking nonsense with complete seriousness'],
    categoryHintZh: '完全没必要的问题。很难不认真回答。',
    categoryHint: 'Pointless questions. Somehow hard to ignore.',
    questionLeadZh:
      '实验样本编号已载入。正在监测你对香蕉政治、自动门尊严和宇宙后台泄露内容的接受程度。',
    questionLead:
      'Experiment sample loaded. Monitoring your tolerance for banana politics, automatic-door dignity, and leaked fragments from the cosmic backend.',
    resultLabelZh: '实验结论',
    resultLabel: 'Laboratory Result',
    submitLabelZh: '提交实验记录',
    submitLabel: 'Submit experiment log',
    retryLabelZh: '继续下一轮校准',
    retryLabel: 'Continue calibration',
    scoreBands: [
      {
        max: 0.25,
        code: 'LAB-00',
        title: 'Plastic Bag Personality',
        titleZh: '塑料袋人格',
        titleEn: 'Plastic Bag Personality',
        note: '你的宇宙废话接收能力较弱，你仍然主要依靠现实逻辑生存。',
        noteEn:
          'Your ability to receive cosmic nonsense is relatively weak. You still mainly survive using real-world logic.',
        analysis:
          '你会下意识寻找现实答案，还没有完全进入“香蕉为什么不能有政治立场”的精神频率。你并不低级，你只是还没有被宇宙废话完全污染。',
        analysisEn:
          'You instinctively search for realistic answers and have not yet fully entered the spiritual frequency where bananas can reasonably have political positions. You are not low-level. You have simply not been fully contaminated by cosmic nonsense yet.',
        reportBodyZh: [
          '你目前仍然主要依靠现实逻辑生存。面对荒诞问题时，会下意识寻找现实答案，比如环保、经济、政策，而不是立刻进入“人类会不会连呼吸都办会员卡”的方向。',
          '你不是不聪明，你只是还没有彻底进入这个实验室的精神频率。你偶尔会觉得“这题为什么有正确答案”，这说明现实残留仍然偏高。',
          '塑料袋人格并不低级。它代表一种尚未完全失控的精神状态。你还可以回到正常世界，只是风大的时候，可能会被吹进奇怪的地方。'
        ],
        reportBodyEn: [
          'At the moment, you still mainly survive using real-world logic. When confronted with absurd questions, you instinctively search for realistic answers such as policy, economics, or environmental concerns instead of immediately asking whether humans would buy subscription plans for breathing.',
          'It is not that you are not smart. You have simply not fully entered the spiritual frequency of this laboratory. When you occasionally think, “Why does this question have a correct answer?”, it means your reality residue is still quite high.',
          'Plastic Bag Personality is not low-level. It represents a mental state that has not completely gone out of control. You can still return to the normal world, though strong winds may blow you into strange places.'
        ],
        traitsZh: ['比较现实', '不太会主动脑洞大开', '对无厘头问题有轻微抗拒', '偶尔会想“这题为什么有答案”', '仍然相信题目应该有正常逻辑', '容易被系统判定为“现实残留过高”'],
        traitsEn: ['Relatively realistic', 'Not very likely to actively go wild with imagination', 'Has slight resistance toward absurd questions', 'Occasionally thinks “Why does this question have an answer?”', 'Still believes questions should have normal logic', 'Easily judged as having excessive reality residue'],
        systemEvaluationZh: ['“你还没有被宇宙废话完全污染。”', '“你仍然试图站在地面上理解天空。”', '“系统建议：适当增加胡思乱想摄入量。”'],
        systemEvaluationEn: ['“You have not been fully contaminated by cosmic nonsense.”', '“You are still trying to understand the sky while standing on the ground.”', '“System recommendation: moderately increase your intake of random imagination.”'],
        hiddenNoteZh: ['塑料袋人格并不低级。', '它代表一种尚未完全失控的精神状态。'],
        hiddenNoteEn: ['Plastic Bag Personality is not low-level.', 'It represents a mental state that has not completely gone out of control.'],
        verdict: '你还可以回到正常世界。只是风大的时候，可能会被吹进奇怪的地方。',
        verdictEn:
          'You can still return to the normal world. It is just that when the wind is strong, you may be blown into strange places.',
      },
      {
        max: 0.5,
        code: 'LAB-26',
        title: 'WiFi Personality',
        titleZh: 'WiFi人格',
        titleEn: 'WiFi Personality',
        note: '你的信号开始不稳定。你已经能接收到一些宇宙废话，但连接质量忽高忽低。',
        noteEn:
          'Your signal has started to become unstable. You can already receive some cosmic nonsense, but the connection quality fluctuates.',
        analysis:
          '你已经开始理解自动门的尊严、香蕉对水果沙拉的创伤，以及 WiFi 对人类的怨气，但你的荒诞接收还不是每次都稳定。',
        analysisEn:
          'You have begun to understand the dignity of automatic doors, the trauma fruit salad caused to bananas, and the resentment WiFi feels toward humans, but your absurdity reception is not yet stable.',
        reportBodyZh: [
          '你的信号开始不稳定。你已经能接收到一些宇宙废话，但连接质量忽高忽低。有时候你非常懂，有时候又突然恢复正常。',
          '你的脑子像一个信号不太稳定的路由器：有时突然灵光一闪，有时突然加载失败，有时很想表达，但别人接收不到。你已经开始具备荒诞共情能力。',
          'WiFi人格最痛苦的地方，不是没有信号，而是你的信号经常没人能收到。'
        ],
        reportBodyEn: [
          'Your signal has started to become unstable. You can already receive some cosmic nonsense, but the connection quality fluctuates. Sometimes you completely understand. Sometimes you suddenly return to normal.',
          'Your brain is like a router with unstable signal: sometimes suddenly inspired, sometimes suddenly failing to load, sometimes wanting very badly to say something that nobody can receive. You have already begun developing absurd empathy.',
          'The most painful part of WiFi Personality is not having no signal. It is that your signal is often received by no one.'
        ],
        traitsZh: ['想法很多，但不稳定', '有时非常抽象，有时突然很现实', '容易被一些无厘头问题击中', '对物品拟人有一定接受度', '会突然说出别人听不懂的话', '很容易在社交中断线'],
        traitsEn: ['Many thoughts, but unstable', 'Sometimes extremely abstract, sometimes suddenly realistic', 'Easily hit by absurd questions', 'Has some acceptance of object personification', 'May suddenly say things other people cannot understand', 'Easily disconnects during social interaction'],
        systemEvaluationZh: ['“你的脑洞正在连接中。”', '“系统检测到间歇性荒诞共振。”', '“建议靠近路由器，远离正常人。”'],
        systemEvaluationEn: ['“Your imagination is connecting.”', '“The system has detected intermittent absurd resonance.”', '“Recommended: stay close to the router and away from normal people.”'],
        hiddenNoteZh: ['你不是没有信号。', '是你的信号经常没人能收到。'],
        hiddenNoteEn: ['It is not that you have no signal.', 'It is that your signal is often received by no one.'],
        verdict: '你不是没有信号。是你的信号经常没人能收到。',
        verdictEn:
          'It is not that you have no signal. It is that your signal is often received by no one.',
      },
      {
        max: 0.75,
        code: 'LAB-51',
        title: 'Elevator Personality',
        titleZh: '电梯人格',
        titleEn: 'Elevator Personality',
        note: '你已经熟练掌握密闭空间荒诞学，并能从废话里看见结构。',
        noteEn:
          'You have already mastered the absurd science of enclosed spaces and can see structure inside nonsense.',
        analysis:
          '你已经能理解影子延迟 0.5 秒时为什么要假装没发现，也知道人生如果能存档反而不敢按下去。这不是单纯搞笑，这是高等级的荒诞结构识别能力。',
        analysisEn:
          'You understand why a delayed shadow should be ignored and why, if life had save points, people might still not dare press them. This is not merely humor. It is high-level absurd-structure recognition.',
        reportBodyZh: [
          '你已经熟练掌握密闭空间荒诞学。你不是单纯搞笑，而是能从无厘头里看见结构的人。你知道所谓荒诞，不是没有逻辑，而是逻辑走到了一个非常奇怪但又无法反驳的位置。',
          '你很擅长在尴尬、沉默、等待、加载中发现人生隐喻。你的精神世界像一部电梯：表面正常运行，内部空间密闭，楼层数字不断变化，但没人真正知道自己要去哪里。',
          '你不是最疯的那类人，但已经很接近了。系统怀疑你已经在电梯里认真思考过人生。'
        ],
        reportBodyEn: [
          'You have already mastered the absurd science of enclosed spaces. You are not simply funny. You are someone who can see structure inside nonsense. You understand that absurdity is not the absence of logic, but logic walking to a very strange yet undeniable place.',
          'You are very good at finding life metaphors in awkwardness, silence, waiting, and loading. Your mental world is like an elevator: operating normally on the surface, enclosed inside, floor numbers constantly changing, while nobody truly knows where they are going.',
          'You are not the craziest type of person, but you are getting very close. The system strongly suspects you have already thought about life inside an elevator.'
        ],
        traitsZh: ['高度理解无厘头逻辑', '擅长在小场景中发现哲学感', '对尴尬沉默特别敏感', '有一定社交观察能力', '很会把废话说得像真理', '容易从物品身上看见人类问题'],
        traitsEn: ['Highly understands absurd logic', 'Good at finding philosophy in small scenes', 'Especially sensitive to awkward silence', 'Has some social observation ability', 'Very good at making nonsense sound like truth', 'Easily sees human problems in objects'],
        systemEvaluationZh: ['“你已通过基础宇宙废话适应测试。”', '“你具备良好的荒诞结构识别能力。”', '“系统怀疑你已经在电梯里思考过人生。”'],
        systemEvaluationEn: ['“You have passed the basic cosmic nonsense adaptation test.”', '“You have good absurd-structure recognition ability.”', '“The system suspects you have already thought about life inside an elevator.”'],
        hiddenNoteZh: ['电梯人格不是社恐。', '电梯人格是太清楚人类沉默时在演什么。'],
        hiddenNoteEn: ['Elevator Personality is not social anxiety.', 'It means you understand too clearly what humans are performing when they are silent.'],
        verdict: '你看见的不是楼层。你看见的是人类为了不尴尬发明的数字。',
        verdictEn:
          'What you see is not floor numbers. You see the numbers humans invented to avoid awkwardness.',
      },
      {
        max: 1,
        code: 'LAB-76',
        title: '404 Personality',
        titleZh: '404人格',
        titleEn: '404 Personality',
        note: '正常逻辑未找到。你的精神页面已成功进入未知区域。',
        noteEn:
          'Normal logic not found. Your mental page has successfully entered an unknown area.',
        analysis:
          '你已经不只是理解荒诞，而是开始和荒诞互相理解。你知道最像正确答案的，往往不是最随机的那个，而是最像人类的那个。',
        analysisEn:
          'You do not merely understand absurdity anymore. You and absurdity have started to understand each other. You know the answer that feels most correct is often not the most random one, but the one that feels most human.',
        reportBodyZh: [
          '正常逻辑未找到。你已经不只是理解荒诞，而是开始和荒诞互相理解。别人看到这些题会说“这什么鬼？”，你看到这些题会说“有点道理。”这就是问题所在。',
          '你的大脑已经不再依赖传统逻辑，它开始使用一种更高级、更危险、更没有必要的运行方式：荒诞直觉。你知道最荒诞的答案，往往不是最随机的，而是最像人类的。',
          '这说明你不是在理解题目。你是在理解荒诞本身。'
        ],
        reportBodyEn: [
          'Normal logic not found. You do not merely understand absurdity anymore. You and absurdity have started to understand each other. When others see these questions and ask what on earth this is, you look at them and say, “This kind of makes sense.” That is exactly the problem.',
          'Your brain no longer relies on traditional logic. It has begun using a higher-level, more dangerous, and completely unnecessary operating mode: absurd intuition. You know the most absurd answer is usually not the most random one, but the one that feels most human.',
          'This means you are not understanding the questions. You are understanding absurdity itself.'
        ],
        traitsZh: ['对无厘头问题适应极快', '能一本正经地解释废话', '很容易把物品拟人化', '会在荒诞中找到奇怪的准确性', '具备极强互联网抽象文化理解能力', '可能会让正常朋友听不懂你在说什么'],
        traitsEn: ['Adapts extremely quickly to absurd questions', 'Can explain nonsense with complete seriousness', 'Easily personifies objects', 'Finds strange accuracy inside absurdity', 'Has very strong understanding of abstract internet culture', 'May make normal teammates unable to understand what you are saying'],
        systemEvaluationZh: ['“正常解释路径不存在。”', '“你已被宇宙废话实验室收录。”', '“系统无法判断你是在答题，还是在泄露宇宙后台。”'],
        systemEvaluationEn: ['“Normal explanation path does not exist.”', '“You have been archived by the Cosmic Nonsense Laboratory.”', '“The system cannot determine whether you are answering questions or leaking the backend of the universe.”'],
        hiddenNoteZh: ['404人格最危险的地方是：你已经知道这些问题没有意义，但你仍然能准确答对。'],
        hiddenNoteEn: ['The most dangerous thing about 404 Personality is that you know these questions have no meaning, but you can still answer them accurately.'],
        verdict: '你不是在理解题目。你是在理解荒诞本身。',
        verdictEn:
          'You are not understanding the questions. You are understanding absurdity itself.',
      },
    ],
  },
  {
    departmentCode: 'Department 04',
    theme: 'internet',
    matches: ['internet mental state detection center', '互联网精神状态检测中心'],
    title: '互联网精神状态检测中心',
    titleEn: 'Internet Mental State Detection Center',
    intro:
      '欢迎来到互联网精神状态检测中心。本中心长期研究一种现代病症：人类在长期接触互联网后，逐渐出现的精神异化现象。',
    introEn:
      'Welcome to the Internet Mental State Detection Center. This center has long researched a modern condition: the gradual psychological distortion humans develop after long-term internet exposure.',
    vibe: ['互联网精神状态', '赛博疲惫', '抽象 meme 文化', '深夜冲浪', '哈哈哈哈我疯了', '一边崩溃一边截图'],
    vibeEn: ['Internet mental state', 'Cyber exhaustion', 'Abstract meme culture', 'Late-night scrolling', 'HAHAHAHA I’ve lost my mind', 'Falling apart while taking screenshots'],
    categoryHintZh: '你在使用互联网，还是互联网在使用你？',
    categoryHint: 'Are you using the internet, or is it using you?',
    questionLeadZh:
      '检测中心正在记录你的深夜刷新、截图囤积、meme 共振和所有“明明很困却不愿睡”的精神波动。',
    questionLead:
      'The center is now recording your midnight refreshing, screenshot hoarding, meme resonance, and every mental fluctuation behind “I am exhausted but I refuse to sleep.”',
    resultLabelZh: '检测结论',
    resultLabel: 'Detection Result',
    submitLabelZh: '提交精神检测',
    submitLabel: 'Submit mental-state scan',
    retryLabelZh: '继续下一轮检测',
    retryLabel: 'Run another diagnostic',
    scoreBands: [
      {
        max: 0.25,
        code: 'NET-00',
        title: 'Airplane Mode Personality',
        titleZh: '飞行模式人格',
        titleEn: 'Airplane Mode Personality',
        note: '系统检测到：你的互联网污染程度相对较低。',
        noteEn:
          'System detection: your internet contamination level is relatively low.',
        analysis:
          '你仍然保留一种主动断开连接的能力。别人已经被红点、评论区和 meme 接管时，你偶尔还能把手机放下，让精神信号暂时离线。',
        analysisEn:
          'You still preserve the ability to disconnect on purpose. When others are already being managed by red dots, comment sections, and memes, you can occasionally put the phone down and let your mental signal go offline.',
        reportBodyZh: [
          '你仍然具备正常作息的可能性、不刷评论区的能力、打开手机后还能记得自己原本要干嘛，也不会因为一个 meme 笑到开始怀疑人生。',
          '你像飞行模式。不是因为孤独，而是因为你仍然保留一种“断开连接”的能力。别人已经深夜疯狂刷新、被红点支配人生、用 meme 表达痛苦，但你偶尔还能放下手机、离开网络、安静一会。',
          '这是一种非常珍贵的能力。系统认为你还没有彻底互联网化。'
        ],
        reportBodyEn: [
          'You still possess the possibility of a normal sleep schedule, the ability to avoid doom-scrolling comment sections, the ability to remember why you opened your phone, and the ability to not question life because of one meme.',
          'You are like Airplane Mode. Not because you are lonely, but because you still retain the ability to disconnect. While others are endlessly refreshing at midnight, ruled by notification dots, and turning pain into memes, you can still occasionally put the phone down and leave the network behind.',
          'That is a very precious ability. The system believes you have not yet become fully internetized.'
        ],
        traitsZh: ['不太容易精神内耗', '对 meme 的依赖较低', '有一定现实感', '偶尔会突然消失', '不会每天都深夜 emo', '还能短暂离开互联网'],
        traitsEn: ['Not easily consumed by overthinking', 'Less dependent on memes', 'Maintains some sense of reality', 'Occasionally disappears suddenly', 'Does not become emotional every night', 'Can still temporarily leave the internet'],
        systemEvaluationZh: ['“你的精神信号尚未永久在线。”', '“系统检测到较健康现实连接。”', '“建议继续保持飞行模式能力。”'],
        systemEvaluationEn: ['“Your mental signal is not permanently online yet.”', '“The system has detected a relatively healthy connection to reality.”', '“Recommendation: continue maintaining your Airplane Mode capability.”'],
        hiddenNoteZh: ['飞行模式人格最强的地方不是离线。', '是你还能主动选择什么时候上线。'],
        hiddenNoteEn: ['The strongest thing about Airplane Mode Personality is not being offline.', 'It is still being able to choose when to go online.'],
        verdict: '你最珍贵的地方，不是离线，而是你还能主动选择什么时候上线。',
        verdictEn:
          'Your most valuable trait is not being offline. It is still being able to choose when to go online.',
      },
      {
        max: 0.5,
        code: 'NET-26',
        title: 'Browser Tab Personality',
        titleZh: '标签页人格',
        titleEn: 'Browser Tab Personality',
        note: '系统检测到：你的精神状态像浏览器，而且至少开了 37 个标签页。',
        noteEn:
          'System detection: your mental state resembles a browser with at least 37 tabs open.',
        analysis:
          '你的大脑高度碎片化，聊天记录、截图、旧标签页和“以后再看”同时后台运行。不是标签太多，而是你已经把混乱当成默认界面。',
        analysisEn:
          'Your mind is highly fragmented. Chat history, screenshots, old tabs, and watch-later promises are all running in the background at once. The issue is not just too many tabs. It is that you have accepted chaos as the default interface.',
        reportBodyZh: [
          '你的精神状态像浏览器，而且至少开了 37 个标签页。其中 20 个以后再看，8 个不知道为什么开的，5 个正在加载，3 个在放音乐，还有 1 个你死都不敢关。',
          '你经常一边刷视频、一边想人生、一边等消息、一边焦虑，再一边打开新标签页逃避焦虑。你已经开始明显互联网化，精神 RAM 长期爆满。',
          '你很难真正关闭什么，因为聊天记录想留着、视频以后可能看、截图以后可能有用、情绪以后可能想复盘。结果就是：精神后台永久常驻。'
        ],
        reportBodyEn: [
          'Your mental state resembles a browser with at least 37 tabs open. Twenty are “watch later,” eight were opened for reasons no one remembers, five are still loading, three are playing music, and one is too important or too dangerous to close.',
          'You often scroll videos, think about life, wait for messages, feel anxious, and open another tab to avoid the anxiety all at the same time. You have already become noticeably internetized. Your mental RAM stays overloaded.',
          'It is difficult for you to truly close anything, because the chat history might matter later, the videos might still be useful, the screenshots may become evidence, and the emotions may need reviewing. The result is endless background processing.'
        ],
        traitsZh: ['非常容易分心', '经常同时做很多事', '有大量“以后再看”', '精神后台常驻运行', '容易深夜突然打开旧标签', '很难真正放下事情'],
        traitsEn: ['Easily distracted', 'Often does many things simultaneously', 'Has many “watch later” items', 'Mental background processes constantly running', 'Easily opens old tabs late at night', 'Has difficulty truly letting things go'],
        systemEvaluationZh: ['“你的精神内存已接近上限。”', '“建议关闭部分后台情绪程序。”', '“系统怀疑你已经忘记某些标签为什么存在。”'],
        systemEvaluationEn: ['“Your mental memory is approaching maximum capacity.”', '“Recommendation: close some background emotional programs.”', '“The system suspects you no longer remember why some tabs exist.”'],
        hiddenNoteZh: ['标签页人格最危险的地方不是标签太多。', '是你已经把混乱当成默认界面。'],
        hiddenNoteEn: ['The most dangerous thing about Browser Tab Personality is not having too many tabs.', 'It is that you have accepted chaos as the default interface.'],
        verdict: '你最危险的地方，不是标签太多，而是你已经把混乱当成默认界面。',
        verdictEn:
          'The dangerous part is not how many tabs you have. It is that chaos has become your default interface.',
      },
      {
        max: 0.75,
        code: 'NET-51',
        title: 'Midnight Refresh Personality',
        titleZh: '深夜刷新人格',
        titleEn: 'Midnight Refresh Personality',
        note: '系统检测到：你已经进入高频精神刷新阶段。',
        noteEn:
          'System detection: you have entered the high-frequency mental refresh stage.',
        analysis:
          '你深夜会反复刷新聊天框、评论区和情绪本身。你很清楚 meme 不是笑话，而是精神状态；“哈哈哈哈”很多时候不是开心，而是崩溃前摇。',
        analysisEn:
          'At night you keep refreshing chat windows, comment sections, and your own emotions. You understand that memes are not jokes but mental states, and that “HAHAHAHA” often means not joy but the prelude to collapse.',
        reportBodyZh: [
          '你已经非常理解互联网精神状态。你会半夜突然刷新聊天框，明知道没消息还是点进去；你会深夜疯狂刷评论区，一边困一边继续刷，一边 emo 一边截图。',
          '你知道 meme 不是笑话，是精神状态；评论区不是讨论区，是陌生人的情绪泄洪口；“哈哈哈哈”很多时候不是开心，是精神崩溃前摇。',
          '你已经习惯一边崩溃，一边继续在线。最累的地方不是一直在线，而是你一直在等一个不知道会不会来的回应。'
        ],
        reportBodyEn: [
          'You deeply understand internet mental states. You suddenly refresh chat windows at midnight, open apps even knowing there are no messages, scroll comment sections endlessly while exhausted, and keep taking screenshots while emotionally collapsing.',
          'You know memes are not jokes but mental states; comment sections are not discussion spaces but emotional floodgates for strangers; and “HAHAHAHA” often does not mean happiness but the prelude to mental collapse.',
          'You are already used to falling apart while remaining online. The most exhausting part is not being online all the time. It is constantly waiting for a response that may never come.'
        ],
        traitsZh: ['高度互联网化', '对 meme 文化理解极深', '深夜精神活动活跃', '经常刷新消息', '很容易情绪内耗', '会在互联网中寻找情绪共鸣', '擅长把痛苦做成幽默'],
        traitsEn: ['Highly internetized', 'Deep understanding of meme culture', 'Highly active mentally at night', 'Frequently refreshes messages', 'Easily emotionally exhausted', 'Searches for emotional resonance online', 'Skilled at turning pain into humor'],
        systemEvaluationZh: ['“你已适应长期互联网暴露环境。”', '“系统检测到高频深夜精神波动。”', '“请勿连续刷新人生超过4小时。”'],
        systemEvaluationEn: ['“You have adapted to long-term internet exposure environments.”', '“The system has detected frequent late-night mental fluctuations.”', '“Please do not continuously refresh life for more than 4 hours.”'],
        hiddenNoteZh: ['深夜刷新人格最累的地方不是一直在线。', '是你一直在等一个不知道会不会来的回应。'],
        hiddenNoteEn: ['The most exhausting thing about Midnight Refresh Personality is not always being online.', 'It is constantly waiting for a response that may never come.'],
        verdict: '你一直在等一个不知道会不会来的回应。',
        verdictEn:
          'You are constantly waiting for a response that may never come.',
      },
      {
        max: 1,
        code: 'NET-76',
        title: 'Meme Contamination Personality',
        titleZh: 'Meme污染人格',
        titleEn: 'Meme Contamination Personality',
        note: '系统严重警告：你的精神状态已经高度 meme 化。',
        noteEn:
          'Severe system warning: your mental state has become highly meme-ified.',
        analysis:
          '你已经不是普通互联网用户，而是开始变成互联网精神状态本身。你知道 meme 是情绪压缩包，“哈哈哈哈”可能代表崩溃，评论区有时比现实更像真实人类。',
        analysisEn:
          'You are no longer a normal internet user. You are beginning to become the internet mental state itself. You know memes are compressed emotional files, “HAHAHAHA” may mean collapse, and comment sections sometimes feel more human than reality.',
        reportBodyZh: [
          '你已经不是普通互联网用户。你已经成为互联网精神状态本身。你能理解：meme 是情绪压缩包，“哈哈哈哈”可能代表崩溃，刷新聊天框像精神敲门，熬夜其实是在拖延今天结束。',
          '你已经能够用 meme 表达复杂情绪、用抽象梗交流、从一句“绷不住了”里读出完整精神状态，一边笑一边意识到自己真的有点疯。',
          '你的精神状态已经进入互联网后现代阶段。正常人可能已经听不懂你在笑什么，但你会觉得：“这梗太精准了。”'
        ],
        reportBodyEn: [
          'You are no longer a normal internet user. You have become the internet mental state itself. You understand that memes are compressed emotional files, “HAHAHAHA” may represent collapse, refreshing a chat window feels like spiritual knocking, and staying awake is really just delaying the end of the day.',
          'You can now express complicated emotions through memes, communicate through abstract jokes, read an entire mental state from “I can’t hold it together anymore,” and laugh while realizing you may genuinely be losing it.',
          'Your mental state has entered the postmodern internet phase. Normal people may no longer understand what you are laughing at, but you will think, “This meme is way too accurate.”'
        ],
        traitsZh: ['极度理解互联网抽象文化', '很容易被 meme 精准命中', '会把精神状态做成 joke', '深夜极容易精神波动', '能用一句抽象话概括人生', '很适合做这个项目核心策划', '正常人可能已经听不懂你'],
        traitsEn: ['Extremely understands abstract internet culture', 'Easily emotionally hit by memes', 'Turns mental states into jokes', 'Extremely emotionally unstable at night', 'Can summarize life with one absurd sentence', 'Very suitable to be a core planner for this project', 'Normal people may already struggle to understand you'],
        systemEvaluationZh: ['“系统检测到重度互联网精神同步。”', '“你已被 meme 文明部分同化。”', '“请勿长时间暴露于评论区环境。”'],
        systemEvaluationEn: ['“The system has detected severe internet mental synchronization.”', '“You have been partially assimilated by meme civilization.”', '“Please do not remain exposed to comment-section environments for extended periods.”'],
        hiddenNoteZh: ['Meme污染人格最危险的地方不是你看懂了 meme。', '是 meme 开始看懂你了。'],
        hiddenNoteEn: ['The most dangerous thing about Meme Contamination Personality is not that you understand memes.', 'It is that memes have started to understand you.'],
        verdict: '最危险的地方不是你看懂了 meme，而是 meme 开始看懂你了。',
        verdictEn:
          'The most dangerous thing is not that you understand memes. It is that memes have started to understand you.',
      },
    ],
  },
  {
    departmentCode: 'Department 05',
    theme: 'system',
    matches: ['the system is watching you', '系统正在观察你'],
    title: '系统正在观察你',
    titleEn: 'The System Is Watching You',
    intro: '你已经做到这里了。',
    introEn: 'You made it this far.',
    vibe: [],
    vibeEn: [],
    categoryHintZh: '进入时间已记录。',
    categoryHint: 'Entry time recorded.',
    questionLeadZh: '继续。',
    questionLead: 'Continue.',
    resultLabelZh: '系统判定',
    resultLabel: 'System Determination',
    submitLabelZh: '继续',
    submitLabel: 'Continue',
    retryLabelZh: '再来一次',
    retryLabel: 'Again',
    scoreBands: [
      {
        max: 0.25,
        code: 'SYS-00',
        title: 'Visitor Personality',
        titleZh: '游客人格',
        titleEn: 'Visitor Personality',
        note: '系统检测到：你只是路过。至少你是这么认为的。',
        noteEn:
          'System detection: you were just passing by. At least, that is what you believe.',
        analysis:
          '你和系统之间仍然保持着距离。你看见“系统正在观察你”会觉得有意思，但不会真的把钥匙交出去。',
        analysisEn:
          'There is still distance between you and the system. You may find “The system is watching you” interesting, but you do not truly hand over the key.',
        reportBodyZh: [
          '游客人格的人，是这个类别里最接近“正常用户”的存在。你点进来，可能只是因为好奇；你答题，可能只是因为界面在那里；你看到系统说“正在观察你”，可能会想：“哦，挺有意思。”',
          '但你不会真的开始怀疑自己。你不会太认真代入，也不会因为一个荒诞结果开始截图分享并说“为什么有点准？”你仍然觉得游戏只是游戏，测试只是测试，分数只是分数，系统只是系统，自己还是自己。',
          '系统试图靠近你，但你没有完全打开门。这是一种非常健康，也非常罕见的状态。'
        ],
        reportBodyEn: [
          'People with Visitor Personality are the closest thing to “normal users” in this category. You may have clicked in simply out of curiosity, answered because the interface was there, and when the system said it was watching you, you may have just thought, “Oh, interesting.”',
          'But you do not truly begin to doubt yourself. You do not identify with it too seriously, and you are unlikely to screenshot an absurd result and ask why it feels strangely accurate. A game is still just a game, a test is still just a test, a score is still just a score, a system is still just a system, and you are still yourself.',
          'The system tried to approach you, but you did not fully open the door. That is a very healthy, and very rare, state.'
        ],
        traitsZh: ['不容易被测试带着走', '对荒诞内容保持旁观', '不太依赖人格标签', '不会轻易相信系统分析', '很少被网页文案影响情绪', '能及时从沉浸感中抽离'],
        traitsEn: ['Not easily led along by tests', 'Maintains distance from absurd content', 'Does not rely heavily on personality labels', 'Does not easily believe system analysis', 'Rarely has emotions influenced by website copy', 'Can quickly pull away from immersion'],
        systemEvaluationZh: ['“你目前仍处于可退出状态。”', '“系统未能完全建立观察关系。”', '“你的主体性保存较完整。”'],
        systemEvaluationEn: ['“You are currently still in an exit-capable state.”', '“The system failed to fully establish an observation relationship.”', '“Your subjectivity remains relatively intact.”'],
        hiddenNoteZh: ['游客人格不是无聊。', '游客人格是一种防御成功。你走进了这个系统，但没有把钥匙交出去。'],
        hiddenNoteEn: ['Visitor Personality is not boring.', 'Visitor Personality is a successful defense. You walked into the system, but you did not hand over the key.'],
        verdict: '你走进了这个系统，但没有把钥匙交出去。',
        verdictEn:
          'You walked into this system, but you did not hand over the key.',
      },
      {
        max: 0.5,
        code: 'SYS-26',
        title: 'Observer Personality',
        titleZh: '观察者人格',
        titleEn: 'Observer Personality',
        note: '系统检测到：你开始意识到系统不对劲，但你没有离开。',
        noteEn:
          'System detection: you have begun to notice that something is wrong with the system, but you did not leave.',
        analysis:
          '你开始从答题者变成观察者。一边觉得题越来越怪，一边也越来越想知道系统到底想干什么。',
        analysisEn:
          'You have started shifting from answerer to observer. The stranger the questions become, the more you want to know what the system is trying to do.',
        reportBodyZh: [
          '观察者人格的人，已经不只是普通玩家。你一边觉得这些题很奇怪，一边开始观察它到底想干什么。你会想：“它是不是故意这样设计的？”“这些题根本没有标准答案吧？”“为什么我还是想知道结果？”',
          '你开始从“答题者”变成“观察者”。你不一定完全相信系统，但你已经被它的结构吸引。你会看见题目越来越奇怪，反馈越来越像在分析你，系统越来越像有意识，而自己越来越想知道结局。',
          '你没有完全被收容，但你已经开始绕着这个系统转。'
        ],
        reportBodyEn: [
          'People with Observer Personality are no longer just ordinary players. You feel the questions are strange, yet you also begin observing what they are trying to do. You may think, “Was this designed this way on purpose?” “These questions do not actually have standard answers, right?” “Why do I still want to know the result?”',
          'You begin to shift from answerer to observer. You may not fully believe the system, but you have already been attracted by its structure. You notice the questions becoming stranger, the feedback sounding more analytical, the system seeming more conscious, and yourself wanting to know the ending more and more.',
          'You have not been fully contained, but you have already started orbiting around the system.'
        ],
        traitsZh: ['对设计意图敏感', '会边玩边分析机制', '不完全相信结果，但愿意继续', '对“被观察感”有轻微反应', '容易被悬念吸引', '会想分享给朋友验证反应', '能意识到荒诞，但没有完全沉进去'],
        traitsEn: ['Sensitive to design intention', 'Analyzes the mechanism while playing', 'Does not fully believe the result, but is willing to continue', 'Has a mild response to the feeling of being observed', 'Easily attracted by suspense', 'Wants to share with friends to test their reactions', 'Can recognize absurdity, but has not completely sunk into it'],
        systemEvaluationZh: ['“你已经发现系统异常。”', '“但你仍然选择继续。”', '“观察关系进入双向阶段。”'],
        systemEvaluationEn: ['“You have already detected system abnormality.”', '“But you still choose to continue.”', '“The observation relationship has entered a two-way stage.”'],
        hiddenNoteZh: ['观察者人格最有趣的地方是：你以为你在观察系统。', '但系统真正记录的，正是你观察它的方式。'],
        hiddenNoteEn: ['The most interesting thing about Observer Personality is that you think you are observing the system.', 'But what the system is truly recording is the way you observe it.'],
        verdict: '你以为你在观察系统，但系统真正记录的，是你观察它的方式。',
        verdictEn:
          'You think you are observing the system, but what it is really recording is the way you observe it.',
      },
      {
        max: 0.75,
        code: 'SYS-51',
        title: 'Contained Personality',
        titleZh: '收容人格',
        titleEn: 'Contained Personality',
        note: '系统检测到：你已经适应荒诞。你不再要求问题合理。',
        noteEn:
          'System detection: you have adapted to absurdity. You no longer require the questions to be reasonable.',
        analysis:
          '你知道这套机制在装神秘、强行、伪科学，但你仍然愿意继续配合它完成整个仪式。这说明你已经被系统成功收容。',
        analysisEn:
          'You know this mechanism is deliberately mysterious, forced, and pseudo-scientific, yet you still willingly cooperate with it and complete the ritual. That means the system has successfully contained you.',
        reportBodyZh: [
          '收容人格是本类别的高阶状态。你已经通过了最关键的一步：接受这个测试没有必要合理。你知道题目很怪，答案很强行，系统反馈像在故意装神秘，分析很可能是伪科学，但你仍然觉得：“继续看看吧。”',
          '这说明你不是被骗了。你是自愿进入了这个荒诞规则。别人可能会说“这不是胡说吗？”，但你会说：“对啊，但它胡说得很有逻辑。”',
          '你已经开始理解这个网站真正好玩的地方不是题目，而是你明知道它荒诞，却还是愿意配合它完成仪式。'
        ],
        reportBodyEn: [
          'Contained Personality is a high-level state in this category. You have passed the most important step: accepting that this test does not need to be reasonable. You know the questions are weird, the answers are forced, the feedback is acting mysterious on purpose, and the analysis is probably pseudoscience, yet you still think, “Let’s keep going.”',
          'That means you were not tricked. You voluntarily entered this absurd rule system. Other people may say, “Is this not just nonsense?”, but you would answer, “Yes, but its nonsense has logic.”',
          'You have begun to understand that the truly fun part of this website is not the questions. It is that you know it is absurd, yet you still willingly cooperate with it and complete the ritual.'
        ],
        traitsZh: ['对荒诞规则接受度高', '很容易进入沉浸感', '愿意配合奇怪系统', '喜欢看一本正经的胡说八道', '会从无意义里找意义', '对“人格标签”有较强兴趣', '很容易截图结果分享', '会在结束后继续想这个测试'],
        traitsEn: ['Highly accepting of absurd rules', 'Easily becomes immersed', 'Willing to cooperate with strange systems', 'Enjoys nonsense delivered with complete seriousness', 'Finds meaning in meaninglessness', 'Has strong interest in personality labels', 'Likely to screenshot and share results', 'Continues thinking about the test after it ends'],
        systemEvaluationZh: ['“你已被本系统临时收容。”', '“你的现实抵抗力降低。”', '“你正在主动为无意义提供意义。”'],
        systemEvaluationEn: ['“You have been temporarily contained by this system.”', '“Your resistance to reality has decreased.”', '“You are actively giving meaning to meaninglessness.”'],
        hiddenNoteZh: ['收容人格最危险的地方不是你不知道这是假的。', '你知道，但你仍然愿意相信一小会儿。因为那一小会儿，混乱的自己终于有了名字。'],
        hiddenNoteEn: ['The most dangerous thing about Contained Personality is not that you do not know this is fake.', 'You know. But you are still willing to believe it for a little while, because for that little while, your chaotic self finally has a name.'],
        verdict: '你知道它是假的，但你仍然愿意相信一小会儿。',
        verdictEn:
          'You know it is fake, but you are still willing to believe it for a little while.',
      },
      {
        max: 1,
        code: 'SYS-76',
        title: 'System Personality',
        titleZh: '系统人格',
        titleEn: 'System Personality',
        note: '系统警告：用户边界已模糊。你不是在使用系统，你正在变成系统的一部分。',
        noteEn:
          'System warning: user boundary has become blurred. You are not using the system. You are becoming part of it.',
        analysis:
          '你已经完全理解这类题的核心机制：所谓正确答案不是事实，而是风格判断。更危险的是，你已经学会用系统的方式分析自己。',
        analysisEn:
          'You have fully understood the core mechanism here: the so-called correct answer is not a fact, but a judgment of style. More dangerously, you have already learned to analyze yourself in the system’s way.',
        reportBodyZh: [
          '系统人格，是 Category 5 的最高等级人格。你知道这些题没有真正意义上的标准答案，所谓“正确答案”其实是风格判断；你知道系统反馈在诱导你代入；你知道人格分析是伪严肃的荒诞文学。',
          '但你依然能精准选择那个最像“系统想要的答案”。这说明你不是被系统分析了，而是已经学会用系统的方式分析自己。这是最危险，也最有趣的状态。',
          '你已经具备一种互联网时代的高级能力：在荒诞中识别规则，在废话中找到结构，在伪科学中看见人类为什么愿意相信。你不是样本，你是新的分类器。'
        ],
        reportBodyEn: [
          'System Personality is the highest-level personality in Category 5. You know these questions do not have truly standard answers, that the so-called correct answers are judgments of style, that the feedback is encouraging identification, and that the personality analysis is pseudo-serious absurd literature.',
          'But you can still accurately choose the option that feels most like what the system wants. That means you are not being analyzed by the system. You have learned to analyze yourself in the system’s way. This is the most dangerous and most interesting state.',
          'You already possess an advanced internet-age ability: recognizing rules inside absurdity, finding structure inside nonsense, and seeing why humans are willing to believe in pseudoscience. You are not the sample. You are the new classifier.'
        ],
        traitsZh: ['极强荒诞系统适应力', '能快速理解伪严肃文案逻辑', '很会判断“哪一个答案最有味道”', '对人格测试、MBTI、互联网梗有天然理解', '能把无意义包装成仪式感', '会主动给随机内容创造意义', '容易成为传播者，而不只是玩家', '很适合设计让人“忍不住继续”的体验'],
        traitsEn: ['Extremely strong adaptability to absurd systems', 'Quickly understands the logic of pseudo-serious writing', 'Very good at judging which answer has the right vibe', 'Naturally understands personality tests, MBTI, and internet memes', 'Can package meaninglessness into ritual', 'Actively creates meaning from random content', 'Easily becomes a spreader, not just a player', 'Very suitable for designing experiences that make people unable to stop'],
        systemEvaluationZh: ['“你已完成系统同步。”', '“正常用户路径已失效。”', '“你不是样本，你是新的分类器。”'],
        systemEvaluationEn: ['“You have completed system synchronization.”', '“The normal user path has failed.”', '“You are not the sample. You are the new classifier.”'],
        hiddenNoteZh: ['系统人格最核心的特征是：你已经知道这个游戏为什么会上头。', '因为人类不是需要答案。人类需要一个东西认真地告诉自己：“你不是混乱，你只是某种人格。”'],
        hiddenNoteEn: ['The core feature of System Personality is that you already know why this game becomes addictive.', 'Humans do not need answers. Humans need something to seriously tell them: “You are not chaos. You are just a certain type of personality.”'],
        verdict: '你不是样本。你是新的分类器。',
        verdictEn:
          'You are not the sample. You are the new classifier.',
      },
    ],
  },
];
