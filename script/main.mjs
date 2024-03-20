import { normalizeTo_camelCase } from 'https://cdn.jsdelivr.net/npm/n12@1.8.28/+esm';
import { spaceTrim } from 'https://cdn.jsdelivr.net/npm/spacetrim@0.11.4/+esm';
import solutions from '../data/index.mjs';

export function main() {
    console.log(solutions);

    // ======================

    const recalculateResult = () => {
        const inputParameters = {};
        for (const id of [
            'web-type',
            'pages-count',
            'products-count',
            'updates-days-period',
            'custom-functions-count',
            'budget-upfront',
            'budget-per-month',
            'days-to-deadline',
            'level-of-control',
        ]) {
            const inputElement = document.getElementById(id);
            if (!inputElement) {
                console.error(`Element with id="${id}" not found`);
                continue;
            }

            let value;

            if (id === 'web-type') {
                value = inputElement.value;
            } else {
                value = parseFloat(inputElement.value);
            }

            inputParameters[normalizeTo_camelCase(id)] = value;
        }

        // console.info({ inputParameters });

        const solutionsForMe = solutions.map((solution) => solution(inputParameters));

        // TODO: !!! Filter
        // TODO: !!! Sort

        // console.info({ solutionsForMe });

        const outputElement = document.getElementById('output');

        outputElement.innerHTML = '';
        for (const { fit, title, description, pros, cons } of solutionsForMe) {
            // TODO: !!! Use fit, pros and cons
            outputElement.innerHTML += spaceTrim(`
                <li>
                    
                    <b>${title}</b> ${description}
                    <br/>
                    <i>(${Math.round(fit * 100)}%)</i>

                    <div class="proscons">
                        <ul class="pros">
                            <li>Aaaaa</li>
                            <li>Bbbb</li>
                        </ul>
                        <ul class="cons">
                            <li>Aaaaa</li>
                            <li>Bbbb</li>
                        </ul>
                    </div>

                </li>
            `);
        }
    };

    requestAnimationFrame(() => {
        recalculateResult();
    });

    // ======================

    // TODO: Extract this to separate function
    for (const inputElement of Array.from(document.querySelectorAll(`input[type="range"][data-show-output]`))) {
        const updateOutput = () => {
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
            } else if (showOutput === 'level-of-control') {
                if (value < 5/100) {
                    valueFormatted = 'Chci být vidět na internetu, jedno jak';
                } else if (value < 10/100) {
                    valueFormatted = 'Chci web, který bude fungovat';
                } else if (value < 20/100) {
                    valueFormatted = 'Chci web, který bude fungovat a trochu vypadat';
                } else if (value < 50/100) {
                    valueFormatted = 'Chci web, který bude fungovat a vypadat';
                } else if (value < 60/100) {
                    valueFormatted = 'Chci web, který bude vypadat dobře';
                } else if (value < 70/100) {
                    valueFormatted = 'Chci web, který bude vypadat skvěle';
                } else if (value < 80/100) {
                    valueFormatted = 'Chci web, který bude vypadat přesně tak, jak chci';
                } else {
                    valueFormatted = 'Chci web, který bude do PUNTÍKU přesně tak, jak chci';
                }
            } else {
                console.error(`Unknown data-show-output="${showOutput}"`);
            }

            inputElement.nextElementSibling.value = valueFormatted;
        };

        inputElement.addEventListener('input', () => {
            updateOutput();
            recalculateResult();
        });

        requestAnimationFrame(() => {
            updateOutput();
        });
    }
}
