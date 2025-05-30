import {
  getAllBanks,
  getBankByCardNumber,
  getBankByIban,
  validateIban,
  validateIranianCard,
  validateIbanChecksum,
  findByName,
  findByCardNumber,
  findByIBan,
} from '../src/index.js';

const cardInput = document.getElementById('cardNumber');
const ibanInput = document.getElementById('iban');
const nameInput = document.getElementById('bankName');
const runBtn = document.getElementById('runBtn');
const resultDiv = document.getElementById('result');

runBtn.addEventListener('click', () => {
  const card = cardInput.value.trim();
  const iban = ibanInput.value.trim();
  const name = nameInput.value.trim();

  // Run all methods and collect output
  const allBanks = getAllBanks();

  const bankByCard = card ? getBankByCardNumber(card) : null;
  const bankByIban = iban ? getBankByIban(iban) : null;
  const isIbanValid = iban ? validateIban(iban) : null;
  const isCardValid = card ? validateIranianCard(card) : null;
  const isIbanChecksumValid = iban ? validateIbanChecksum(iban) : null;
  const bankByName = name ? findByName(name) : null;
  const bankByCardAlias = card ? findByCardNumber(card) : null;
  const bankByIbanAlias = iban ? findByIBan(iban) : null;

  let output = '';

  output += `🗂️ Total Banks Loaded: ${allBanks.length}\n\n`;

  output += `🏦 getBankByCardNumber('${card}'):\n`;
  output += bankByCard
    ? `  - Bank Name: ${bankByCard.bank_title || bankByCard.bank_name}\n`
    : '  - Not found\n';
  output += bankByCard && bankByCard.bank_logo ? `  - Logo SVG available\n` : '';

  output += `\n🏦 getBankByIban('${iban}'):\n`;
  output += bankByIban
    ? `  - Bank Name: ${bankByIban.bank_title || bankByIban.bank_name}\n`
    : '  - Not found\n';

  output += `\n✅ validateIban('${iban}'): ${isIbanValid}\n`;
  output += `✅ validateIranianCard('${card}'): ${isCardValid}\n`;
  output += `✅ validateIbanChecksum('${iban}'): ${isIbanChecksumValid}\n`;

  output += `\n🔎 findByName('${name}'):\n`;
  output += bankByName
    ? `  - Bank Name: ${bankByName.bank_title || bankByName.bank_name}\n`
    : '  - Not found\n';

  output += `\n🔎 findByCardNumber('${card}'):\n`;
  output += bankByCardAlias
    ? `  - Bank Name: ${bankByCardAlias.bank_title || bankByCardAlias.bank_name}\n`
    : '  - Not found\n';

  output += `\n🔎 findByIBan('${iban}'):\n`;
  output += bankByIbanAlias
    ? `  - Bank Name: ${bankByIbanAlias.bank_title || bankByIbanAlias.bank_name}\n`
    : '  - Not found\n';

  resultDiv.textContent = output;

  // If bank by card has logo SVG, show it below
  if (bankByCard && bankByCard.bank_logo) {
    const svgContainer = document.createElement('div');
    svgContainer.classList.add('bank-logo');
    svgContainer.innerHTML = bankByCard.bank_logo;

    // Clear previous logos if any and append
    const oldLogo = document.querySelector('.bank-logo');
    if (oldLogo) oldLogo.remove();

    document.body.appendChild(svgContainer);
  }
});
