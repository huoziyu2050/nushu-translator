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

    // 返回成功响应，包含 CORS 头
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://chimerical-baklava-52cb2a.netlify.app', // 替换为您的 Netlify 网站 URL
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: JSON.stringify({ translatedText }),
    };
  } catch (error) {
    console.error('翻译出错：', error.response ? error.response.data : error.message);

    // 返回错误响应，包含 CORS 头
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://chimerical-baklava-52cb2a.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: JSON.stringify({ error: '翻译失败', details: error.message }),
    };
  }
};