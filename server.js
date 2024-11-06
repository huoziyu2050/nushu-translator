require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // 在.env文件中存储你的API密钥

// 调试：输出 API_KEY（完成后请删除）
// console.log('API_KEY:', API_KEY);

app.post('/translate', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios({
      method: 'post',
      url: 'https://translation.googleapis.com/language/translate/v2',
      params: {
        key: API_KEY,
      },
      data: {
        q: text,
        target: 'zh-CN',
      },
    });
    const translatedText = response.data.data.translations[0].translatedText;
    res.send({ translatedText });
  } catch (error) {
    console.error('翻译出错：', error.response ? error.response.data : error.message);
    res.status(500).json({ error: '翻译出错', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`服务器正在运行在端口 ${PORT}`);
});

