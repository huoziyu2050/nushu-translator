// 女书映射表（需要您添加更多的汉字映射）
const nushuMap = {
    "你": "𛆁",
    "好": "𛆉",
    // 添加更多汉字与女书字符的映射
};

// 中文到女书的转换函数
function chineseToNushu(chineseText) {
    return chineseText.split('').map(char => nushuMap[char] || char).join('');
}

// 使用异步函数与后端服务器通信，将英文翻译为中文
async function translateEnglishToChinese(englishText) {
    try {
        const response = await fetch('http://localhost:3000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: englishText })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '翻译失败');
        }
        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error('翻译失败：', error.message);
        return englishText; // 如果翻译失败，返回原始英文文本
    }
}

// 翻译按钮的事件处理函数
async function translateToNushu() {
    const englishText = document.getElementById("englishInput").value;
    console.log('输入的英文文本：', englishText);

    // 英语翻译成中文
    const chineseText = await translateEnglishToChinese(englishText);
    console.log('翻译后的中文文本：', chineseText);

    // 中文转换为女书
    const nushuText = chineseToNushu(chineseText);
    console.log('转换后的女书文本：', nushuText);

    document.getElementById("nushuOutput").innerText = nushuText;
}
const response = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: englishText })
  });
const response = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: englishText })
  });
  
  
