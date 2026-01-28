/**
 * Copy text to clipboard using Clipboard API with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback to document.execCommand (deprecated but widely supported)
    return copyToClipboardFallback(text);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    
    // Try fallback on error
    try {
      return copyToClipboardFallback(text);
    } catch (fallbackError) {
      console.error('Fallback copy also failed:', fallbackError);
      return false;
    }
  }
}

/**
 * Fallback clipboard copy using document.execCommand
 */
function copyToClipboardFallback(text: string): boolean {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  
  document.body.appendChild(textarea);
  
  try {
    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    // Execute copy command
    const successful = document.execCommand('copy');
    
    return successful;
  } catch (error) {
    console.error('execCommand copy failed:', error);
    return false;
  } finally {
    // Clean up
    document.body.removeChild(textarea);
  }
}
