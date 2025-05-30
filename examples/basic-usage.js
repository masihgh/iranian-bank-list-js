// examples/basic-usage.js
import { getAllBanks, getBankByCardNumber } from '../src/index.js';

const card = '6273811234567890';

console.log('🔍 All Banks:', getAllBanks());
console.log(`🏦 Bank for card ${card}:`, getBankByCardNumber(card));
