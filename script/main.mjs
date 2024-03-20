import { solutions } from '../data/solutions.mjs';

export function main() {
    console.log(solutions);

    // TODO: Extract this to separate function
    for (const inputElement of Array.from(document.querySelectorAll(`input[type="range"][data-show-output]`))) {
        inputElement.addEventListener('input', (event) => {
            const value = parseFloat(inputElement.value);
            const showOutput = inputElement.dataset.showOutput;

            let valueFormatted = value.toLocaleString('cs-CZ');

            if (showOutput === 'scalar') {
                // Note: Do nothing
            } else if (showOutput === 'CZK') {
                valueFormatted = value.toLocaleString('cs-CZ', {
                    style: 'currency',
                    currency: 'CZK',
                    minimumFractionDigits: 0,
                });
            } else if (showOutput === 'scalar+pretty') {
                if (value < 200) {
                    // Note: Do nothing
                } else if (value < 2000) {
                    valueFormatted = `řádově stovky (${valueFormatted})`;
                } else if (value < 20000) {
                    valueFormatted = `řádově tisíce (${valueFormatted})`;
                } else if (value < 200000) {
                    valueFormatted = `řádově desítky tisíc (${valueFormatted})`;
                } else if (value < 2000000) {
                    valueFormatted = `řádově stovky tisíc (${valueFormatted})`;
                } else if (value < 20000000) {
                    valueFormatted = `řádově miliony (${valueFormatted})`;
                }
            } else if (showOutput === 'days-period') {
                const k = 1.2;

                if (value <= 1 * k) {
                    valueFormatted = 'Denně';
                } else if (value <= 7 * k) {
                    valueFormatted = 'Každý týden';
                } else if (value <= 7 * 2 * k) {
                    valueFormatted = 'Každý druhý týden';
                } else if (value <= 30 * k) {
                    valueFormatted = 'Měsíčně';
                } else if (value <= 30 * 3 * k) {
                    valueFormatted = 'Jednou za čtvrt roku';
                } else if (value <= 30 * 6 * k) {
                    valueFormatted = 'Jednou za půl roku';
                } else if (value <= 365 * k) {
                    valueFormatted = 'Jednou za rok';
                } else {
                    valueFormatted = `Jednou za ${Math.round((value / 365) * 10) / 10} roky`;
                }
            } else if (showOutput === 'days-to-deadline') {
                const k = 1.2;

                if (value <= 0) {
                    valueFormatted = 'Ideálně včera';
                } else if (value <= 1 * k) {
                    valueFormatted = 'Dnes';
                } else if (value <= 7 * k) {
                    valueFormatted = 'Do týdne';
                } else if (value <= 7 * 2 * k) {
                    valueFormatted = 'Do dvou týdnů';
                } else if (value <= 30 * k) {
                    valueFormatted = 'Do měsíce';
                } else if (value <= 30 * 3 * k) {
                    valueFormatted = 'Do čtvrt roku';
                } else if (value <= 30 * 6 * k) {
                    valueFormatted = 'Do půl roku';
                } else if (value <= 365 * k) {
                    valueFormatted = 'Do roku';
                } else {
                    valueFormatted = `Do ${Math.round((value / 365) * 10) / 10} let`;
                }
            } else {
                console.error(`Unknown data-show-output="${showOutput}"`);
            }

            event.target.nextElementSibling.value = valueFormatted;
        });
    }
}
