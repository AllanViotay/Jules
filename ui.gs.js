/**
 * Displays an HTML sidebar for configuring settings.
 * The sidebar content guides the user to the 'Settings' sheet.
 */
function showSettingsSidebar() {
  const html = HtmlService.createHtmlOutput(
    `<div>
      <h2>Configure Settings</h2>
      <p>Please enter your API keys and other settings directly in the <strong>'${SETTINGS_SHEET}'</strong> sheet.</p>
      <p>Required settings:</p>
      <ul>
        <li>OpenAI API Key</li>
        <li>Research API Key</li>
        <li>Your Name</li>
        <li>Your Company</li>
        <li>Value Prop</li>
        <li>Call to Action</li>
      </ul>
    </div>`
  )
  .setTitle('ColdForge Settings')
  .setWidth(300);

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Displays an HTML sidebar for editing prompts.
 * The sidebar content guides the user to the 'Prompts' sheet.
 */
function showPromptsSidebar() {
  const html = HtmlService.createHtmlOutput(
    `<div>
      <h2>Edit Prompts</h2>
      <p>You can edit the four email prompts directly in the <strong>'${PROMPTS_SHEET}'</strong> sheet.</p>
      <p>Each prompt should have a name in the first column and the full prompt text in the second.</p>
      <p>The four required prompt names are:</p>
      <ul>
        <li>Original Email</li>
        <li>Follow-Up 1</li>
        <li>Follow-Up 2</li>
        <li>Follow-Up 3</li>
      </ul>
      <p>Refer to the PRD for copy-pasteable default prompts.</p>
    </div>`
  )
  .setTitle('ColdForge Prompts')
  .setWidth(300);

  SpreadsheetApp.getUi().showSidebar(html);
}
