import { solutions } from '../data/solutions.mjs';

export function main() {
    console.log(solutions);

    for (const inputElement of Array.from(document.querySelectorAll(`input[type="range"][data-show-output]`))) {
        inputElement.addEventListener('input', (event) => {
            const value = parseFloat(inputElement.value);
            const showOutput = inputElement.dataset.showOutput;
            const formattedValue = value.toLocaleString(
                'cs-CZ',
                {
                    scalar: {
                        minimumFractionDigits: 0,
                    },
                    CZK: {
                        style: 'currency',
                        currency: 'CZK',
                        minimumFractionDigits: 0,
                    },
                }[showOutput],
            );

            event.target.nextElementSibling.value = formattedValue;
        });
    }
}
