import { normalizeTo_camelCase } from 'https://cdn.jsdelivr.net/npm/n12@1.8.28/+esm';
import { spaceTrim } from 'https://cdn.jsdelivr.net/npm/spacetrim@0.11.4/+esm';
import solutions from '../data/index.mjs';

const valueExponentBase = 2; // <- Which is better 2 OR Math.E;
const valueExponentStep = 0.00001;
const valueExponentMin = 0;
const valueExponentMax = 10;

export function main() {
    // console.info(solutions);
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
            } else if (inputElement.dataset.value) {
                value = parseFloat(inputElement.dataset.value);
            } else {
                value = parseFloat(inputElement.value);
            }

            inputParameters[normalizeTo_camelCase(id)] = value;
        }

        const solutionsForMe = solutions
            .map((solution) => solution(inputParameters))
            // !!! .filter((solution) => solution.fit > 0.2)
            .sort((a, b) => b.fit - a.fit);

        const solutionsElement = document.getElementById('solutions');

        solutionsElement.innerHTML = '';
        for (const { fit, title, description, pros, cons } of solutionsForMe) {
            solutionsElement.innerHTML += spaceTrim(
                (block) => `
                <li>
                    
                    <b>${title}</b> ${description}
                    <i class="debug">(${Math.round(fit * 100)}%)</i>

                    <div class="proscons">
                        <ul class="pros">
                            ${block(pros.map((text) => `<li>${text /* <- TODO: Escape */}</li>`).join('\n'))}
                        </ul>
                        <ul class="cons">
                            ${block(cons.map((text) => `<li>${text /* <- TODO: Escape */}</li>`).join('\n'))}
                        </ul>
                    </div>

                </li>
            `,
            );
        }
    };

    // ======================

    // TODO: Extract this to separate function
    for (const inputElement of Array.from(document.querySelectorAll(`input[type="range"][data-show-output]`))) {
        if (inputElement.dataset.isActivated) {
            console.error({ inputElement });
            throw new Error('This input is already activated');
        }

        inputElement.dataset.isActivated = true;

        const scaleType = inputElement.dataset.scaleType;

        const minValue = parseFloat(inputElement.getAttribute('min'));
        const maxValue = parseFloat(inputElement.getAttribute('max'));
        const stepValue = parseFloat(inputElement.getAttribute('step'));

        const initialValue = parseFloat(inputElement.value);

        if (scaleType === 'linear') {
            console.log(inputElement, initialValue);
            inputElement.dataset.value = initialValue;
            // No need to re-set:> inputElement.value = initialValue;
        } else if (scaleType === 'logarithmic') {
            const initialValueExponentValue =
                Math.log(
                    ((initialValue - minValue) / (maxValue - minValue)) *
                        Math.pow(valueExponentBase, valueExponentMax) +
                        1,
                ) / Math.log(valueExponentBase);

            // Note: Just for backup back into DOM
            inputElement.dataset.valueMin = minValue;
            inputElement.dataset.valueMax = maxValue;
            inputElement.dataset.stepValue = stepValue;

            inputElement.setAttribute('min', valueExponentMin);
            inputElement.setAttribute('max', valueExponentMax);
            inputElement.setAttribute('step', valueExponentStep);

            inputElement.dataset.value = initialValueExponentValue;
            inputElement.value = initialValueExponentValue;
        } else {
            throw new Error(`Unknown scale type "${scaleType}"`);
        }

        const updateOutput = () => {
            let value;

            if (scaleType === 'linear') {
                value = parseFloat(inputElement.value);

                // Note: Just for backup back into DOM
                inputElement.dataset.value = value;
                inputElement.value = value;
            } else if (scaleType === 'logarithmic') {
                const valueExponentValue = parseFloat(inputElement.value);

                const valueUnrounded =
                    ((Math.pow(valueExponentBase, valueExponentValue) - 1) /
                        Math.pow(valueExponentBase, valueExponentMax)) *
                        (maxValue - minValue) +
                    minValue;

                value = Math.round(valueUnrounded / stepValue) * stepValue;

                // Note: Just for backup back into DOM
                inputElement.dataset.value = value;
                inputElement.value = valueExponentValue;
            }

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
                } else if (value <= 365 * 2.5) {
                    valueFormatted = `Do ${Math.round((value / 365) * 10) / 10} let`;
                } else {
                    valueFormatted = `Až to bude, tak to bude`;
                }
            } else if (showOutput === 'level-of-control') {
                if (value < 5 / 100) {
                    valueFormatted = 'Chci být vidět na internetu, jedno jak';
                } else if (value < 10 / 100) {
                    valueFormatted = 'Chci web, který bude fungovat';
                } else if (value < 20 / 100) {
                    valueFormatted = 'Chci web, který bude fungovat a trochu vypadat';
                } else if (value < 50 / 100) {
                    valueFormatted = 'Chci web, který bude fungovat a vypadat';
                } else if (value < 60 / 100) {
                    valueFormatted = 'Chci web, který bude vypadat dobře';
                } else if (value < 70 / 100) {
                    valueFormatted = 'Chci web, který bude vypadat skvěle';
                } else if (value < 80 / 100) {
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

    for (const inputElement of Array.from(document.querySelectorAll(`select`))) {
        inputElement.addEventListener('input', () => {
            recalculateResult();
        });
    }

    requestAnimationFrame(() => {
        recalculateResult();
    });

    // ======================
    const webTypeElement = window.document.getElementById('web-type');
    const productsCountElement = window.document.getElementById('products-count');

    function updateWebType() {
        if (!['eshop', 'application'].includes(webTypeElement.value)) {
            // TODO: [⛑] productsCountElement.dataset.valueBackup = productsCountElement.value;

            productsCountElement.disabled = true;
            productsCountElement.value = 0;
            productsCountElement.dataset.value = 0;
            productsCountElement.nextElementSibling.innerHTML = '&nbsp;';
        } else {
            productsCountElement.disabled = false;
            // TODO: [⛑] productsCountElement.value = productsCountElement.dataset.valueBackup;
            // TODO: [⛑] productsCountElement.dataset.value = productsCountElement.dataset.valueBackup;
        }
    }
    window.document.getElementById('web-type').addEventListener('input', updateWebType);
    requestAnimationFrame(updateWebType);

    // ======================
}
