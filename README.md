# iranian-bank-list-js
A Javascript library to identify Iranian banks based on card numbers (first 6 digits) and IBANs. It also includes utility functions to validate card numbers and IBANs using standard algorithms.


## Methods

### 1. `getAllBanks()`

Returns an array of all bank objects with their inline SVG logos.

**Returns:**

```js
Array<Object>
```

**Example:**

```js
import { getAllBanks } from 'iranian-bank-list-js';

const banks = getAllBanks();
console.log(banks[0]);
// {
//   bank_name: "...",
//   bank_logo: "<svg>...</svg>",
//   card_regex: "...",
//   iban_regex: "...",
//   ...
// }
```

---

### 2. `getBankByCardNumber(cardNumber)`

Finds a bank object matching a given full card number using the bank's regex pattern.

**Parameters:**

- `cardNumber` (`string | number`): The full bank card number to check.

**Returns:**

- `Object | undefined` — The matching bank object or `undefined` if not found.

**Example:**

```js
import { getBankByCardNumber } from 'iranian-bank-list-js';

const bank = getBankByCardNumber('6273811234567890');
if (bank) {
  console.log(bank.bank_name);
}
```

---

### 3. `getBankByIban(iban)`

Finds a bank object matching a given IBAN string using the bank's regex pattern.

**Parameters:**

- `iban` (`string`): The full IBAN string to check.

**Returns:**

- `Object | undefined` — The matching bank object or `undefined` if not found.

**Example:**

```js
import { getBankByIban } from 'iranian-bank-list-js';

const bank = getBankByIban('IR820540102680020817909002');
if (bank) {
  console.log(bank.bank_name);
}
```

---

### 4. `validateIban(iban)`

Checks if the IBAN belongs to a known bank (using `getBankByIban`).

**Parameters:**

- `iban` (`string`): The IBAN string to validate.

**Returns:**

- `boolean` — `true` if IBAN matches a known bank, `false` otherwise.

**Example:**

```js
import { validateIban } from 'iranian-bank-list-js';

console.log(validateIban('IR820540102680020817909002'));  // true or false
```

---

### 5. `validateIranianCard(cardNumber)`

Validates an Iranian bank card number using the Luhn algorithm.

**Parameters:**

- `cardNumber` (`string | number`): The full 16-digit bank card number.

**Returns:**

- `boolean` — `true` if the card number is valid, `false` otherwise.

**Example:**

```js
import { validateIranianCard } from 'iranian-bank-list-js';

console.log(validateIranianCard('6273811234567890')); // true or false
```

---

### 6. `validateIbanChecksum(iban)`

Validates an IBAN string using the international standard mod-97 checksum.

**Parameters:**

- `iban` (`string`): The full IBAN string to validate.

**Returns:**

- `boolean` — `true` if the IBAN checksum is valid, `false` otherwise.

**Example:**

```js
import { validateIbanChecksum } from 'iranian-bank-list-js';

console.log(validateIbanChecksum('IR820540102680020817909002')); // true or false
```