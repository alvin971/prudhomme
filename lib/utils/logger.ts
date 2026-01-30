export async function logPrompt(
  phase: string,
  promptType: string,
  systemPrompt?: string,
  messages?: any[],
  maxTokens?: number
) {
  try {
    const timestamp = new Date().toISOString();
    let logEntry = `\n\n${'='.repeat(80)}\n`;
    logEntry += `[${timestamp}] PHASE: ${phase} | TYPE: ${promptType}\n`;
    logEntry += `Max tokens: ${maxTokens || 'N/A'}\n`;

    if (systemPrompt) {
      logEntry += `\n--- SYSTEM PROMPT ---\n${systemPrompt}`;
    }

    if (messages && messages.length > 0) {
      logEntry += `\n--- MESSAGES ---\n`;
      messages.forEach((msg, i) => {
        logEntry += `[${i}] ${msg.role || 'user'}: ${msg.content || 'No content'}`;
      });
    }

    logEntry += `\n${'='.repeat(80)}\n`;

    console.log(logEntry);
  } catch (e) {
    console.error('Logging error:', e);
  }
}
