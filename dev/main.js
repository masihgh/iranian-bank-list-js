import { findByCardNumber, findByIBan, findByName } from '../src/index.js';

const cardInput = document.getElementById('cardNumber');
const ibanInput = document.getElementById('iban');
const nameInput = document.getElementById('bankName');
const runBtn = document.getElementById('runBtn');
const resultDiv = document.getElementById('result');

runBtn.addEventListener('click', () => {
  const card = cardInput.value.trim();
  const iban = ibanInput.value.trim();
  const name = nameInput.value.trim().toLowerCase();

  let bank = undefined;

  if (card) {
    bank = findByCardNumber(card);
  } else if (iban) {
    bank = findByIBan(iban);
  } else if (name) {
    bank = findByName(name);
  }

  if (!bank) {
    resultDiv.innerHTML = `<p style="color: red;">No matching bank found.</p>`;
    return;
  }

  // Build styled card HTML
  const cardNoDisplay = card || (iban ? 'N/A' : 'N/A');
  const bankTitle = bank.bank_title || bank.bank_name || 'Unknown Bank';
  const logoSvg = bank.bank_logo || '';
  const color = bank.color || '#444';
  const lighter = bank.lighter_color || '#eee';
  const darker = bank.darker_color || '#222';

  resultDiv.innerHTML = `
    <div style="
      max-width: 400px;
      margin: 1rem auto;
      border-radius: 16px;
      padding: 2rem;
      background: linear-gradient(145deg, ${lighter}, ${darker});
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      border: 4px solid ${color};
    ">
      <div style="margin-bottom: 1rem;">
        <div class="icon-holder" style="width: 80px; height: 80px; margin: 0 auto;">
          ${logoSvg}
        </div>
      </div>
      <h2 style="margin: 0.5rem 0; font-weight: 700;">${bankTitle}</h2>
      <div style="
        font-size: 1.4rem;
        font-weight: 700;
        background: rgba(255 255 255 / 0.15);
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        letter-spacing: 2px;
        margin-top: 1rem;
        user-select: all;
      ">${cardNoDisplay}</div>
    </div>
  `;
});
