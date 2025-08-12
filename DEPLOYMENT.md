# ColdForge Deployment Guide (Google Sheets)

Follow these steps to set up and run your own instance of ColdForge.

## Step 1: Create Your Google Sheet

1.  Go to [sheets.new](https://sheets.new) to create a new, blank Google Sheet.
2.  Rename the spreadsheet to "ColdForge".

## Step 2: Set Up the Required Sheets (Tabs)

You need to create three tabs at the bottom of your spreadsheet. Rename them exactly as follows:

1.  `Contacts`
2.  `Settings`
3.  `Prompts`

For the exact column structure required in each sheet, please refer to the `SHEET_STRUCTURE.md` file. It is crucial to set up the headers correctly.

## Step 3: Open the Apps Script Editor

1.  With your "ColdForge" spreadsheet open, click on `Extensions` in the top menu.
2.  Select `Apps Script`. This will open a new tab with the script editor.

## Step 4: Add the Script Files

You will now create the four files that contain the application's code.

1.  **Delete the default `Code.gs` file.**
2.  **Create `appsscript.json`:**
    -   In the left-hand file list, click the `+` icon and select `JSON`.
    -   Name the file `appsscript` (the `.json` is added automatically).
    -   Delete the default content and **copy the entire content** of the `appsscript.json` file from this project into it.
3.  **Create `main.gs`:**
    -   Click the `+` icon and select `Script`.
    -   Name the file `main`.
    -   Delete the default content and **copy the entire content** of `main.gs.js` into this file.
4.  **Create `ui.gs`:**
    -   Click the `+` icon and select `Script`.
    -   Name the file `ui`.
    -   Delete the default content and **copy the entire content** of `ui.gs.js` into this file.
5.  **Create `api.gs`:**
    -   Click the `+` icon and select `Script`.
    -   Name the file `api`.
    -   Delete the default content and **copy the entire content** of `api.gs.js` into this file.

When you are done, you should have four files in your Apps Script project.

## Step 5: Save and Refresh

1.  Click the "Save project" icon (looks like a floppy disk) at the top of the script editor.
2.  Go back to your "ColdForge" spreadsheet tab.
3.  **Refresh the page.**

You should now see a new custom menu named **"ColdForge"** in the spreadsheet's menu bar.

## Step 6: Run the Tool

1.  **Populate your sheets:**
    -   Paste your contact data into the `Contacts` sheet.
    -   Fill out your API keys and other info in the `Settings` sheet (OpenAI API Key and Tavily Research API Key).
    -   Paste the prompt templates into the `Prompts` sheet.
2.  Click on the `ColdForge` menu and select `Run Generation`.
3.  **Authorization:** The first time you run it, Google will ask you to authorize the script.
    -   Click `Continue`.
    -   Choose your Google account.
    -   You may see a "Google hasn't verified this app" screen. Click `Advanced`, then click `Go to [Your Project Name] (unsafe)`.
    -   Review the permissions and click `Allow`.
4.  The script will now run. You will see alerts indicating its progress.
