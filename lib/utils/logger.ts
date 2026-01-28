import { writeFile } from 'fs/promises';
import { join } from 'path';

const LOG_DIR = join(process.cwd(), 'logs');
const LOG_FILE = join(LOG_DIR, 'prompts.log');

// Create logs directory if it doesn't exist
(async () => {
  try {
    await writeFile(LOG_FILE, '');
  } catch (e) {}
})();

export async function logPrompt(
  phase: string,
  promptType: string,
  systemPrompt?: string,
  messages?: any[],
  maxTokens?: number
) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = `\n\n${'='.repeat(80)}\n`;
    logEntry += `[${timestamp}] PHASE: ${phase} | TYPE: ${promptType}\n`;
    logEntry += `Max tokens: ${maxTokens || 'N/A'}\n`;

    if (systemPrompt) {
      logEntry += `\n--- SYSTEM PROMPT ---\n${systemPrompt.substring(0, 2000)}`;
      if (systemPrompt.length > 2000) {
        logEntry += `\n... (truncated, total length: ${systemPrompt.length})`;
      }
    }

    if (messages && messages.length > 0) {
      logEntry += `\n--- MESSAGES ---\n`;
      messages.forEach((msg, i) => {
        logEntry += `[${i}] ${msg.role || 'user'}: ${msg.content?.substring(0, 1000) || 'No content'}`;
        if (msg.content?.length > 1000) {
          logEntry += `... (truncated, total length: ${msg.content.length})`;
        }
      });
    }

    logEntry += `\n${'='.repeat(80)}\n`;

    await appendToFile(logEntry);
  } catch (e) {
    // Silently fail to avoid breaking anything
    console.error('Logging error:', e);
  }
}

async function appendToFile(content: string) {
  try {
    await writeFile(LOG_FILE, content, { flag: 'a' });
  } catch (e) {
    console.error('Failed to write to log file:', e);
  }
}
