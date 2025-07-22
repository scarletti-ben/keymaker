/**
 * @file Helper functions for keymaker
 * @author Ben Scarletti
 * @since 2025-07-22
 * @see {@link https://github.com/scarletti-ben}
 * @license MIT
 */

// > ======================================================
// > Exported Download Function
// > ======================================================

/**
 * Trigger download of text content as a file
 * 
 * @param {string} content - The text content to save
 * @param {string} filename - The filename to save as
 * @returns {void}
 */
export function downloadContent(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}