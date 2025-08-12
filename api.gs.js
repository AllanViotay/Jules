/**
 * Makes a call to the OpenAI API.
 *
 * @param {string} prompt The full prompt to send.
 * @param {string} apiKey The OpenAI API key.
 * @param {string} model The model to use, e.g., 'gpt-4o-mini'.
 * @return {string} The text response from the API.
 */
function callOpenAI(prompt, apiKey, model = 'gpt-4o-mini') {
  const url = 'https://api.openai.com/v1/chat/completions';

  const payload = {
    model: model,
    messages: [{ role: 'user', content: prompt }],
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + apiKey,
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseBody = response.getContentText();

  if (responseCode === 200) {
    const parsedBody = JSON.parse(responseBody);
    return parsedBody.choices[0].message.content.trim();
  } else {
    Logger.log(`OpenAI Error: ${responseCode} ${responseBody}`);
    throw new Error(`OpenAI API request failed with code ${responseCode}. Check logs for details.`);
  }
}

/**
 * Makes a call to the Research API (Serper).
 *
 * @param {string} query The search query.
 * @param {string} apiKey The Research API key.
 * @return {{snippets: string, urls: string}} An object containing formatted snippets and source URLs.
 */
function callResearchAPI(query, apiKey) {
  const url = 'https://google.serper.dev/search';

  const payload = { q: query };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'X-API-KEY': apiKey,
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseBody = response.getContentText();

  if (responseCode === 200) {
    const parsedBody = JSON.parse(responseBody);
    let snippets = '';
    let urls = [];

    if (parsedBody.organic && parsedBody.organic.length > 0) {
      // Extract snippets and URLs from the top 3 results
      parsedBody.organic.slice(0, 3).forEach(item => {
        if (item.snippet) {
          snippets += `- ${item.snippet}\n`;
        }
        if (item.link) {
          urls.push(item.link);
        }
      });
    }
    return {
        snippets: snippets || "No relevant snippets found.",
        urls: urls.join(', ')
    };
  } else {
    Logger.log(`Research API Error: ${responseCode} ${responseBody}`);
    throw new Error(`Research API request failed with code ${responseCode}. Check logs for details.`);
  }
}
