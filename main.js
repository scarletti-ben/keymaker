/**
 * @fileoverview Entry point for keymaker
 * @author Ben Scarletti
 * @version 1.0.0
 * @since 2025-07-21
 * @see {@link https://github.com/scarletti-ben}
 * @license MIT
 */

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
 * Show temporary message in themessenger element
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

// < ======================================================
// < Base64 Conversion Function
// < ======================================================

/**
 * Convert an ArrayBuffer to a Base64-encoded string
 * 
 * @param {ArrayBuffer} buffer - The binary data to encode
 * @returns {string} The Base64 string
 */
function toBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// < ======================================================
// < Key Pair Generation Function
// < ======================================================

/**
 * Generate a public / private key pair
 * - Convert keys to Base64-encoded strings
 * 
 * @async
 * @param {string} flavour The flavour of encryption
 * @returns {Promise<{
 * PRIVATE_KEY: string, 
 * PUBLIC_KEY: string
 * }>} Object with Base64-encoded keys
 */
async function generateKeyPair(flavour) {

    let algorithm, usages, fPrivate, fPublic;
    if (flavour === 'Ed25519') {
        algorithm = { name: "Ed25519" };
        usages = ["sign", "verify"];
        fPrivate = "pkcs8";
        fPublic = "spki";
    } else if (flavour === 'X25519') {
        algorithm = {
            name: "X25519"
        };
        usages = ["deriveKey", "deriveBits"];
        fPrivate = "pkcs8";
        fPublic = "spki";
    } else if (flavour === 'RSA-OAEP') {
        algorithm = {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        };
        usages = ["encrypt", "decrypt"];
        fPrivate = "pkcs8";
        fPublic = "spki";
    } else {
        throw new Error(`Unsupported encrpytion flavour: ${flavour}`);
    }

    toast(`Generating ${algorithm.name} pair`);

    const keyPair = await crypto.subtle.generateKey(algorithm, true, usages);
    const privateKey = await crypto.subtle.exportKey(fPrivate, keyPair.privateKey);
    const publicKey = await crypto.subtle.exportKey(fPublic, keyPair.publicKey);

    return {
        PRIVATE_KEY: toBase64(privateKey),
        PUBLIC_KEY: toBase64(publicKey),
    };

}

// < ======================================================
// < Download Function
// < ======================================================

/**
 * Trigger a download of a given text content as a file
 * 
 * @param {string} content - The text content to save
 * @param {string} filename - The filename to save as
 * @returns {void}
 */
function downloadContent(content, filename) {
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