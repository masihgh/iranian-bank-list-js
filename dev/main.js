import { getBankByCardNumber } from '../src/index.js';

const card = '6273811234567890';

const bank = getBankByCardNumber(card);

const logoSVG = bank ? bank.bank_logo : ''; // bank_logo is raw SVG string now

document.body.innerHTML = `
  <h1>Bank Lookup Result</h1>
  <p><strong>Card Number:</strong> ${card}</p>
  <p><strong>Bank:</strong> ${bank ? bank.bank_title : 'Not found'}</p>
  ${logoSVG ? `<div style="width:100px; height:auto;">${logoSVG}</div>` : ''}
`;
