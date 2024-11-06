const cors = require('cors');
app.use(cors({
  origin: 'https://chimerical-baklava-52cb2a.netlify.app'
}));

const axios = require('axios');

exports.handler = async function(event, context) {
  const { text } = JSON.parse(event.body);
  const API_KEY = process.env.API_KEY;

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
    return {
      statusCode: 200,
      body: JSON.stringify({ translatedText }),
    };
  } catch (error) {
    console.error('翻译出错：', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '翻译失败', details: error.message }),
    };
  }
};
