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
 * Makes a call to the Research API (Tavily).
 *
 * @param {string} query The search query.
 * @param {string} apiKey The research API key (Tavily).
 * @return {{snippets: string, urls: string}} An object containing formatted snippets and source URLs.
 */
function callResearchAPI(query, apiKey) {
  const url = 'https://api.tavily.com/search';

  // Tavily accepts api_key in the JSON payload. We keep results small and depth basic for cost/speed.
  const payload = {
    api_key: apiKey,
    query: query,
    search_depth: 'basic',
    include_answer: false,
    include_raw_content: false,
    max_results: 3,
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseBody = response.getContentText();

  if (responseCode === 200) {
    const parsedBody = JSON.parse(responseBody);
    let snippets = '';
    let urls = [];

    const results = Array.isArray(parsedBody.results) ? parsedBody.results : [];
    results.slice(0, 3).forEach(item => {
      if (item.content) {
        snippets += `- ${item.content}\n`;
      }
      if (item.url) {
        urls.push(item.url);
      }
    });

    return {
      snippets: snippets || 'No relevant snippets found.',
      urls: urls.join(', '),
    };
  } else {
    Logger.log(`Research API Error: ${responseCode} ${responseBody}`);
    throw new Error(`Research API request failed with code ${responseCode}. Check logs for details.`);
  }
}
