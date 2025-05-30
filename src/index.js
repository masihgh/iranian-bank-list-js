/**
 * src/index.js
 * 
 * Main package entry point for bank data and utility functions.
 * 
 * Imports bank data JSON and SVG logos, exposing functions to
 * query banks by card number or IBAN, with inline SVG logos.
 */

import banks from '../data/banks.json';

// Helper to import all SVGs as raw text
const importAll = (modules) => {
  const images = {};
  for (const path in modules) {
    const key = path.split('/').pop(); // filename.svg
    images[key] = modules[path];       // raw SVG string
  }
  return images;
};

// Import all SVG logos as raw strings eagerly
export const bankLogos = importAll(
  import.meta.glob('../data/images/*.svg', { eager: true, query: '?raw', import: 'default' })
);

// Map banks to replace logo path with raw SVG content (inline SVG)
const mapBanksWithLogos = () =>
  banks.map(bank => ({
    ...bank,
    bank_logo: bankLogos[bank.bank_logo.split('/').pop()] || bank.bank_logo,
  }));

/**
 * Get all available banks with inline SVG logos
 * @returns {Array} Array of all bank objects with inline SVG logos
 */
export const getAllBanks = () => mapBanksWithLogos();

/**
 * Find a bank using a full card number
 * Matches based on regex in `card_regex` field
 * @param {string|number} cardNumber - The full card number
 * @returns {Object|undefined} Bank object if found, else undefined
 */
export const getBankByCardNumber = (cardNumber) =>
  mapBanksWithLogos().find(bank => new RegExp(bank.card_regex).test(String(cardNumber)));

/**
 * Find a bank using an IBAN number
 * Matches based on regex in `iban_regex` field
 * @param {string} iban - The full IBAN string
 * @returns {Object|undefined} Bank object if found, else undefined
 */
export const getBankByIban = (iban) =>
  mapBanksWithLogos().find(bank => new RegExp(bank.iban_regex).test(String(iban)));

/**
 * Check if an IBAN is valid (matches a known bank)
 * @param {string} iban - The IBAN string
 * @returns {boolean} True if valid, false otherwise
 */
export const validateIban = (iban) => !!getBankByIban(iban);

/**
 * Validate Iranian bank card number using Luhn algorithm
 * @param {string|number} cardNumber - Full card number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateIranianCard(cardNumber) {
  const digits = String(cardNumber).replace(/\D/g, '');
  if (digits.length !== 16) return false; // Typical Iranian card length

  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let digit = parseInt(digits.charAt(i), 10);
    if (i % 2 === 0) {  // even index digits (0-based) are doubled
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

/**
 * Validate IBAN using international standard (mod-97 checksum)
 * @param {string} iban - The IBAN string to validate
 * @returns {boolean} True if valid IBAN, false otherwise
 */
export function validateIbanChecksum(iban) {
  if (!iban || typeof iban !== 'string') return false;

  // Remove spaces and to uppercase
  const trimmed = iban.replace(/\s+/g, '').toUpperCase();

  // IBAN basic format check (length between 15 and 34)
  if (trimmed.length < 15 || trimmed.length > 34) return false;

  // Move first 4 chars to the end
  const rearranged = trimmed.slice(4) + trimmed.slice(0, 4);

  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  const converted = rearranged.split('').map(ch => {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return code - 55;  // A=10, ..., Z=35
    else return ch;
  }).join('');

  // Perform mod-97 operation in chunks (to handle large numbers)
  let remainder = converted;
  let block;
  while (remainder.length > 2) {
    block = remainder.slice(0, 9);
    remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
  }
  const mod = parseInt(remainder, 10) % 97;

  return mod === 1;
}
