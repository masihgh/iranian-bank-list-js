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

console.log('Loaded logos:', Object.keys(bankLogos));

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
