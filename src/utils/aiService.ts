// 模拟 AI 回复
export const generateAIResponse = async (userMessage: string, emotion?: string): Promise<string> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const responses: Record<string, string[]> = {
    happy: [
      '太棒了！星宝也很开心呢！😊',
      '开心的时候，世界都变得美好了呢！',
      '星宝感受到你的快乐了！继续保持哦！⭐'
    ],
    sad: [
      '一个人的时候会有一点孤单❤️ 不过星宝会陪着你。',
      '难过的时候，可以告诉星宝你心里的感受。',
      '星宝在这里，不管发生什么都会陪着你。💗'
    ],
    angry: [
      '生气是很正常的情绪，星宝理解你。',
      '深呼吸，星宝陪你一起平静下来。',
      '让我们想想，怎么让心情好起来呢？'
    ],
    fear: [
      '不要害怕，星宝会保护你的。',
      '勇敢的孩子，星宝为你骄傲！',
      '告诉星宝，是什么让你感到害怕？'
    ],
    tired: [
      '累了就休息一下吧，星宝等你。',
      '休息是为了走更远的路哦。',
      '星宝给你一个大大的拥抱！🤗'
    ],
    default: [
      '星宝听到了，你想说什么呢？',
      '嗯嗯，星宝在认真听哦。',
      '谢谢你告诉星宝这些。'
    ]
  }
  
  const emotionResponses = emotion ? responses[emotion] || responses.default : responses.default
  const randomResponse = emotionResponses[Math.floor(Math.random() * emotionResponses.length)]
  
  // 根据用户消息内容生成更个性化的回复
  if (userMessage.includes('玩') || userMessage.includes('朋友')) {
    return `一个人的时候会有一点孤单❤️ 不过星宝会陪着你。你愿意告诉我，你最想和谁一起玩吗？`
  }
  
  if (userMessage.includes('不想') || userMessage.includes('不要')) {
    return `星宝明白了，每个人都有自己的想法呢。💭 你可以告诉星宝，是什么让你这样想吗？`
  }
  
  if (userMessage.includes('谢谢')) {
    return `不用谢！能帮助到你，星宝很开心呢！✨`
  }
  
  return randomResponse
}

// 模拟 AI 故事生成
export const generateAIStory = async (theme: string): Promise<{ title: string; content: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const stories: Record<string, { title: string; content: string }> = {
    '情绪管理': {
      title: '《爱发脾气的小恐龙》',
      content: `从前有一只小恐龙，名叫豆豆。豆豆有一个小问题——他很容易发脾气。

有一天，豆豆的积木城堡倒塌了。"哼！"豆豆一脚踢向积木。

这时，他的朋友小兔子蹦蹦跳跳地走过来。"豆豆，你怎么啦？"蹦蹦问。

"我的城堡倒了！"豆豆大声说。

蹦蹦没有说话，而是和豆豆一起重新搭建城堡。搭好后，蹦蹦说："城堡倒了可以再搭，朋友生气了可就不容易和好了哦。"

豆豆低下头："对不起，我不该发脾气。"

从那以后，豆豆学会了深呼吸来控制情绪，成为了大家都喜欢的好朋友。

🌟 小朋友，生气的时候，你会怎么做呢？`
    },
    '社交技能': {
      title: '《分享的快乐》',
      content: `森林里住着一只小狐狸名叫圆圆。圆圆有很多好吃的糖果，但她从来不舍得分给其他小朋友。

有一天，森林派对开始了。小熊带来了蜂蜜，小兔带来了胡萝卜蛋糕，大家都分享着自己的美食。

圆圆也想吃蜂蜜和蛋糕，但她什么都没带。"如果我带了糖果就好了..."圆圆小声说。

小鹿走过来，递给圆圆一块蛋糕："没关系，现在和我们一起分享吧！"

圆圆吃得很开心，她决定明天也要带糖果来分享。

从那以后，圆圆学会了分享，发现分享让快乐加倍！

🍬 小朋友，你有没有和朋友分享过好东西呢？`
    },
    '勇气与自信': {
      title: '《不敢发言的小乌龟》',
      content: `森林学校今天要选举班长。小乌龟慢慢非常想参加选举，但他害怕在大家面前说话。

"我...我可能说不好的..."慢慢小声嘀咕。

小鹿老师走过来："慢慢，你知道吗？勇敢不是不害怕，而是害怕了还愿意尝试。"

慢慢鼓起勇气，举起了手。他慢慢地走上讲台...

"我...我想当班长，我会...我会帮助每一个需要帮助的同学..."慢慢的声音越来越响亮。

台下响起了热烈的掌声。不管结果如何，慢慢觉得自己已经战胜了恐惧！

🌟 小朋友，你有没有做过勇敢的事情呢？`
    }
  }
  
  return stories[theme] || stories['情绪管理']
}

// 模拟绘画情绪分析
export const analyzeDrawing = async (_imageData: string): Promise<{
  mood: string
  description: string
  suggestions: string[]
}> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const analyses = [
    {
      mood: '平静愉悦',
      description: '星宝觉得这幅画充满了温暖的颜色，像阳光一样明亮呢！☀️',
      suggestions: ['继续保持快乐的心情', '可以和其他小朋友分享你的画']
    },
    {
      mood: '有点忧伤',
      description: '这幅画里有一点淡淡的蓝色调，星宝感受到了你的小小心事。🌸',
      suggestions: ['可以告诉星宝，今天发生了什么事吗？', '画画是很好的情绪表达方式']
    },
    {
      mood: '充满能量',
      description: '这幅画充满了活力！星宝觉得你有很多很多能量呢！⚡',
      suggestions: ['试着把这些能量用在帮助别人上', '继续保持活力！']
    }
  ]
  
  const analysis = analyses[Math.floor(Math.random() * analyses.length)]
  return analysis
}
