/**
 * Download text content as a file
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  // Create a Blob with the content
  const blob = new Blob([content], { type: mimeType });
  
  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Download UUIDs as a text file
 */
export function downloadAsText(uuids: string[], filename: string = 'uuids.txt'): void {
  const content = uuids.join('\n');
  downloadFile(content, filename, 'text/plain');
}

/**
 * Download UUIDs as a JSON file
 */
export function downloadAsJSON(uuids: string[], filename: string = 'uuids.json'): void {
  const content = JSON.stringify(uuids, null, 2);
  downloadFile(content, filename, 'application/json');
}
