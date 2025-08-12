/**
 * @OnlyCurrentDoc
 */

// Global constants for sheet names
const CONTACTS_SHEET = 'Contacts';
const SETTINGS_SHEET = 'Settings';
const PROMPTS_SHEET = 'Prompts';

/**
 * Creates a custom menu in the spreadsheet UI.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('ColdForge')
    .addItem('1. Configure Settings', 'showSettingsSidebar')
    .addItem('2. Edit Prompts', 'showPromptsSidebar')
    .addSeparator()
    .addItem('Run Generation', 'runGeneration')
    .addToUi();
}

/**
 * Reads the key-value pairs from the 'Settings' sheet.
 * @returns {object} An object containing the settings.
 */
function getSettings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTINGS_SHEET);
  const data = sheet.getDataRange().getValues();
  const settings = {};
  data.forEach(row => {
    if (row[0] && row[1]) {
      settings[row[0]] = row[1];
    }
  });
  return settings;
}

/**
 * Reads the prompt templates from the 'Prompts' sheet.
 * @returns {object} An object containing the prompt templates.
 */
function getPrompts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PROMPTS_SHEET);
  const data = sheet.getDataRange().getValues();
  const prompts = {};
  data.forEach(row => {
    if (row[0] && row[1]) {
      prompts[row[0]] = row[1];
    }
  });
  return prompts;
}

/**
 * Main function to run the email generation process.
 */
function runGeneration() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('Starting the generation process. This may take several minutes.');

  try {
    const settings = getSettings();
    const prompts = getPrompts();

    const contactsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONTACTS_SHEET);
    const contactsData = contactsSheet.getDataRange().getValues();

    const headers = contactsData.shift(); // Get and remove header row

    // Find column indices for required fields
    const colIndices = {
      firstName: headers.indexOf('FirstName'),
      company: headers.indexOf('Company'),
      website: headers.indexOf('WebsiteOrProfileURL'),
      // ... add others as needed
    };

    // Check for required columns
    if (colIndices.firstName === -1 || colIndices.company === -1 || colIndices.website === -1) {
      throw new Error('Required columns (FirstName, Company, WebsiteOrProfileURL) not found in Contacts sheet.');
    }

    // Add output columns if they don't exist
    const outputColumns = ['Email_Original', 'FollowUp_1', 'FollowUp_2', 'FollowUp_3', 'Research_Snippets', 'Source_URLs'];
    let lastCol = headers.length;
    outputColumns.forEach(colName => {
      if (headers.indexOf(colName) === -1) {
        contactsSheet.getRange(1, lastCol + 1).setValue(colName);
        lastCol++;
      }
    });

    // Process each contact
    contactsData.forEach((row, index) => {
      const firstName = row[colIndices.firstName];
      const company = row[colIndices.company];
      const website = row[colIndices.website];

      Logger.log(`Processing ${firstName} at ${company}...`);

      // 1. Perform Research (Simulated)
      const researchQuery = `${company} recent news or about page`;
      const researchResult = callResearchAPI(researchQuery, settings['Research API Key']);

      // 2. Generate Emails (Simulated)
      const originalEmail = callOpenAI({ model: 'gpt-4o-mini', prompt: prompts['Original Email'] /* + context */ }, settings['OpenAI API Key']);
      const followup1 = callOpenAI({ model: 'gpt-4o-mini', prompt: prompts['Follow-Up 1'] /* + context */ }, settings['OpenAI API Key']);
      const followup2 = callOpenAI({ model: 'gpt-4o-mini', prompt: prompts['Follow-Up 2'] /* + context */ }, settings['OpenAI API Key']);
      const followup3 = callOpenAI({ model: 'gpt-4o-mini', prompt: prompts['Follow-Up 3'] /* + context */ }, settings['OpenAI API Key']);

      // 3. Write results to the sheet
      const outputData = [originalEmail, followup1, followup2, followup3, researchResult, 'simulated-source.com'];
      contactsSheet.getRange(index + 2, headers.length + 1, 1, outputData.length).setValues([outputData]);

      // Add a small delay to avoid overwhelming the APIs
      Utilities.sleep(1000);
    });

    ui.alert('Generation process completed successfully!');

  } catch (e) {
    Logger.log(e);
    ui.alert('An error occurred: ' + e.message);
  }
}
