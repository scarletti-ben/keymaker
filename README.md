# keymaker
This project uses the `Web Crypto API` built into `JavaScript` to generate public / private key pairs, convert the keys to `Base-64` encoded strings, and store them as a `.env` file on the user's system. All at the click of a button.

You can access the site [here](https://scarletti-ben.github.io/keymaker), or clone the repository and run it via your own local server.

> [!WARNING]
> The generation of the keys should be secure but make sure that you are careful with the contents of the `.env` file, never expose the contents publicly under any circumstances

## Web Crypto API
The `Web Crypto API` uses `crypto.subtle.generateKey()`, with a set of options, to create a public / private key-pair. It requires that the browser is in a secure environment eg. `HTTPS`

## Asymmetric Keys
I am not going to go too deeply into the concept of `asymmetric keys` as I can't pretend to understand it too deeply, it is detailed quite heavily across the internet and can be found on the `Wikipedia` page for [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). 

In essence you are attempting to create two mathematically linked keys, a public key (which will be shared openly), and a private key (which will be kept safe). The most common uses of a private key would be for decrypting and signing, whereas a public key is usually used for encrypting or verifying. For example the public key could be used to encrypt text which can be sent securely to the owner of the private key who is able to decrypt it. There are different methods / algorithms for generating these key-pairs, and the purposes of these key-pairs may differ.

In simple terms, a system of `asymmetric keys` and one with `symmetric keys` differ in the sense that a `symmetric` system uses the same secret key for both decryption / signing as well as encrypting / verifying, and both parties must have the same key. Historically it was difficult to ensure that a `symmetric key` was kept secret, `asymmetric` systems were developed to use separate public and private keys, allowing more secure communication without needing to share a secret key beforehand.

> [!NOTE]
> Whilst symmetric keys might sound like a relic of the past, they still find many uses today. In fact one example use of asymmetric keys is "key-exchange" (eg. Diffie-Hellman (DH)) which allows two parties to establish a shared symmetric key

# Project Metadata
```yaml
---
title: "keymaker"
date: "2025-07-21"
# last_modified_at: "2025-07-21"
# description: ""
categories: [
  miscellaneous
]
tags: [
  coding, dev, webdev, javascript, html, encryption, cryptography, private key, public key, key pairs, base64, .env, environment variables
]
---
```