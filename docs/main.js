/**
 * @file Entry point for keymaker
 * @author Ben Scarletti
 * @version 1.0.1
 * @since 2025-07-21
 * @see {@link https://github.com/scarletti-ben}
 * @license MIT
 */

// < ======================================================
// < Imports
// < ======================================================

import { 
    generateKeyPair 
} from "./scripts/keymaker.js";

import { 
    downloadContent
} from "./scripts/helpers.js";

// < ======================================================
// < Element Queries
// < ======================================================

const button = /** @type {HTMLButtonElement} */
    (document.getElementById('button'));

const dropdown = /** @type {HTMLSelectElement} */
    (document.getElementById('dropdown'));

const messenger = /** @type {HTMLDivElement} */
    (document.getElementById('messenger'));

// < ======================================================
// < Toast Function
// < ======================================================

/**
 * Show temporary message in the messenger element
 * 
 * @param {string} message - The message to display
 */
function toast(message) {
    console.log(message);
    messenger.style.display = '';
    messenger.textContent = message;
    setTimeout(() => {
        messenger.style.display = 'none';
        messenger.textContent = '';
    }, 2000);
}

// ~ ======================================================
// ~ Entry Point
// ~ ======================================================

/**
 * Entry point for the application (IIFE)
 * 
 * @async
 * @returns {void}
 */
(async () => {

    // > List of available encryption flavours
    const flavours = [
        'Ed25519',
        'RSA-OAEP',
        'X25519'
    ];

    // > Add encryption flavours to the dropdown
    flavours.forEach(flavour => {
        const option = document.createElement('option');
        option.value = flavour;
        option.textContent = flavour;
        dropdown.appendChild(option);
    });

    // > Add event listener to the generate button
    button.addEventListener('click', async (event) => {
        const flavour = dropdown.value;
        try {
            const keys = await generateKeyPair(flavour);
            const content = `PRIVATE_KEY=${keys.PRIVATE_KEY}\nPUBLIC_KEY=${keys.PUBLIC_KEY}`;
            downloadContent(content, '.env');
        } catch (error) {
            toast(error.message);
        }
    });

})();