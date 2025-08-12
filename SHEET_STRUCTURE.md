# ColdForge Google Sheet Structure

This document outlines the required structure for the Google Sheet that runs ColdForge. The app uses three distinct sheets (tabs) for its operation: `Contacts`, `Settings`, and `Prompts`.

---

## 1. `Contacts` Sheet

This is the main workspace where you paste your contact list and where the results will appear.

**Setup:**
- The first row **must** be a header row.
- The script will automatically find the columns it needs based on the headers defined in the PRD: `FirstName`, `Company`, `WebsiteOrProfileURL`, etc.
- After a successful run, the script will append the following new columns to the right of your existing data.

**Output Columns (Appended by the script):**
- `Email_Original`
- `FollowUp_1`
- `FollowUp_2`
- `FollowUp_3`
- `Research_Snippets`
- `Source_URLs`

---

## 2. `Settings` Sheet

This sheet stores your API keys and other configurations. The script reads these values to authenticate with external services.

**Setup:**
- The sheet should have two columns: `Setting Name` and `Value`.

| Setting Name       | Value                |
| ------------------ | -------------------- |
| `OpenAI API Key`   | `sk-xxxxxxxxxxxx...` |
| `Research API Key` | `xxxxxxxxxxxx...`    |
| `Budget Cap (USD)` | `10`                 |
| `Your Name`        | `[Your Name]`        |
| `Your Company`     | `[Your Company]`     |
| `Value Prop`       | `[Your one-sentence value proposition]` |
| `Call to Action`   | `[Your desired call to action]` |


---

## 3. `Prompts` Sheet

This sheet holds the four email drafting templates. You can edit them directly here.

**Setup:**
- The sheet should have two columns: `Prompt Name` and `Prompt Content`.
- The `Prompt Name` must match one of the four required names exactly.

| Prompt Name      | Prompt Content                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `Original Email` | `(Paste the full system and user prompt for the original email here. Use variables like {first_name}.)`        |
| `Follow-Up 1`    | `(Paste the full system and user prompt for the first follow-up here.)`                                       |
| `Follow-Up 2`    | `(Paste the full system and user prompt for the second follow-up here.)`                                      |
| `Follow-Up 3`    | `(Paste the full system and user prompt for the final follow-up here.)`                                       |

**Note:** The copy-pasteable prompt templates from the PRD should be used to populate this sheet.
