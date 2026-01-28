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

    console.log(logEntry);
  } catch (e) {
    console.error('Logging error:', e);
  }
}
