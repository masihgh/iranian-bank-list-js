// examples/basic-usage.js
import { 
  getAllBanks, 
  getBankByCardNumber, 
  getBankByIban, 
  validateIban, 
  validateIranianCard, 
  validateIbanChecksum, 
  findByName, 
  findByCardNumber, 
  findByIBan 
} from 'iranian-bank-list-js';

const cardNumber = '6273811234567890';
const iban = 'IR820540102680020817909002';
const bankName = 'melli';

console.log('🔍 All Banks:', getAllBanks());

console.log(`🏦 Bank for card number ${cardNumber}:`, getBankByCardNumber(cardNumber));

console.log(`🏦 Bank for IBAN ${iban}:`, getBankByIban(iban));

console.log(`✅ Is IBAN valid?`, validateIban(iban));

console.log(`✅ Is card number valid?`, validateIranianCard(cardNumber));

console.log(`✅ Is IBAN checksum valid?`, validateIbanChecksum(iban));

console.log(`🔎 Find bank by name "${bankName}":`, findByName(bankName));

console.log(`🔎 Find bank by card number "${cardNumber}":`, findByCardNumber(cardNumber));

console.log(`🔎 Find bank by IBAN "${iban}":`, findByIBan(iban));
