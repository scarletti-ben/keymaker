/**
 * @file Core functionality for keymaker
 * @author Ben Scarletti
 * @since 2025-07-22
 * @see {@link https://github.com/scarletti-ben}
 * @license MIT
 */

// < ======================================================
// < Base64 Conversion Function
// < ======================================================

/**
 * Convert an ArrayBuffer to a Base64-encoded string
 * 
 * @param {ArrayBuffer} buffer - The binary data to encode
 * @returns {string} The Base64-encoded string
 */
function toBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// > ======================================================
// > Exported Key Pair Generation Function
// > ======================================================

/**
 * Generate a public / private key pair
 * - Convert keys to Base64-encoded strings
 * 
 * @async
 * @param {string} flavour - The flavour of encryption
 * @returns {Promise<{
 * PRIVATE_KEY: string, 
 * PUBLIC_KEY: string
 * }>} Object with Base64-encoded keys
 */
export async function generateKeyPair(flavour) {

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

    const keyPair = await crypto.subtle.generateKey(algorithm, true, usages);
    const privateKey = await crypto.subtle.exportKey(fPrivate, keyPair.privateKey);
    const publicKey = await crypto.subtle.exportKey(fPublic, keyPair.publicKey);

    return {
        PRIVATE_KEY: toBase64(privateKey),
        PUBLIC_KEY: toBase64(publicKey),
    };

}
