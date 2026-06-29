export const emotions = [
  {
    id: 'happy',
    emoji: '😊',
    label: '开心',
    color: 'bg-yellow-100',
    borderColor: 'border-yellow-400',
    description: '快乐、愉悦、兴奋'
  },
  {
    id: 'sad',
    emoji: '😭',
    label: '难过',
    color: 'bg-blue-100',
    borderColor: 'border-blue-400',
    description: '伤心、失落、孤单'
  },
  {
    id: 'angry',
    emoji: '😡',
    label: '生气',
    color: 'bg-red-100',
    borderColor: 'border-red-400',
    description: '愤怒、不满、急躁'
  },
  {
    id: 'fear',
    emoji: '😨',
    label: '害怕',
    color: 'bg-purple-100',
    borderColor: 'border-purple-400',
    description: '恐惧、紧张、担心'
  },
  {
    id: 'tired',
    emoji: '😴',
    label: '累了',
    color: 'bg-gray-100',
    borderColor: 'border-gray-400',
    description: '疲惫、困倦、无力'
  }
]

export const emotionQuestions = [
  {
    id: 1,
    emoji: '😊',
    question: '这个表情代表什么？',
    options: ['开心', '生气', '害怕'],
    correctAnswer: 0
  },
  {
    id: 2,
    emoji: '😡',
    question: '这个表情代表什么？',
    options: ['开心', '生气', '难过'],
    correctAnswer: 1
  },
  {
    id: 3,
    emoji: '😭',
    question: '这个表情代表什么？',
    options: ['开心', '难过', '害怕'],
    correctAnswer: 1
  },
  {
    id: 4,
    emoji: '😨',
    question: '这个表情代表什么？',
    options: ['生气', '害怕', '累了'],
    correctAnswer: 1
  },
  {
    id: 5,
    emoji: '😴',
    question: '这个表情代表什么？',
    options: ['难过', '生气', '累了'],
    correctAnswer: 2
  }
]

export const socialScenarios = [
  {
    id: 1,
    title: '小朋友抢走你的玩具怎么办？',
    options: [
      { text: '打他', isCorrect: false, feedback: '打人会伤害别人，也会伤害自己哦。' },
      { text: '哭', isCorrect: false, feedback: '哭虽然能表达难过，但没办法解决问题。' },
      { text: '礼貌表达', isCorrect: true, feedback: '太棒了！我们可以说："请把玩具还给我，我们可以一起玩吗？"这样既友好又能解决问题！' }
    ]
  },
  {
    id: 2,
    title: '想加入其他小朋友的游戏？',
    options: [
      { text: '直接抢过来玩', isCorrect: false, feedback: '这样会让其他小朋友不高兴哦。' },
      { text: '在旁边看着', isCorrect: false, feedback: '主动一点会更好呢！' },
      { text: '礼貌询问', isCorrect: true, feedback: '很好！我们可以说："我可以和你们一起玩吗？"或者"我可以在旁边看吗？"' }
    ]
  },
  {
    id: 3,
    title: '不小心弄坏了别人的东西？',
    options: [
      { text: '装作不知道', isCorrect: false, feedback: '诚实是很重要的品质哦。' },
      { text: '道歉并赔偿', isCorrect: true, feedback: '做得很对！承认错误并想办法弥补，这是负责任的表现！' },
      { text: '责怪别人', isCorrect: false, feedback: '这样做会让别人更加难过。' }
    ]
  }
]
