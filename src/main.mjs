#!/usr/bin/env node

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import { normalizeTo_camelCase, normalizeToKebabCase } from 'https://cdn.jsdelivr.net/npm/n12@1.8.28/+esm';
import showdown from 'https://cdn.jsdelivr.net/npm/showdown@2.1.0/+esm';
import { spaceTrim } from 'https://cdn.jsdelivr.net/npm/spacetrim@0.11.4/+esm';
import * as solutions from '../ranking/index-used.mjs';
import { RANGES } from './ranges.mjs';

//mermaid.initialize({ startOnLoad: false });

// TODO: [💫] Maybe to some global config
const valueExponentBase = 2; // <- Which is better 2 OR Math.E;
const valueExponentStep = 0.00001;
const valueExponentMin = 0;
const valueExponentMax = 10;

const converter = new showdown.Converter();

export function main() {
    // ======================

    for (const [key, { min, max, step, defaultValue }] of Object.entries(RANGES)) {
        const elementId = normalizeToKebabCase(key);
        const inputElement = document.getElementById(elementId);
        if (!inputElement) {
            console.error(`Element with id="${elementId}" not found`);
            continue;
        }

        inputElement.setAttribute('min', min);
        inputElement.setAttribute('max', max);
        inputElement.setAttribute('step', step);
        inputElement.setAttribute('value', defaultValue);
    }

    // ======================

    const recalculateResult = async () => {
        const inputParameters = {};
        for (const elementId of [
            'web-type',
            'pages-count',
            'products-count',
            // [🆙] 'updates-days-period',
            'custom-functions-count',
            'budget-upfront',
            'budget-per-month',
            'days-to-deadline',
            'level-of-control',
        ]) {
            const inputElement = document.getElementById(elementId);
            if (!inputElement) {
                console.error(`Element with id="${elementId}" not found`);
                continue;
            }

            let value;

            if (elementId === 'web-type') {
                value = inputElement.value;
            } else if (inputElement.dataset.value) {
                value = parseFloat(inputElement.dataset.value);
            } else {
                value = parseFloat(inputElement.value);
            }

            inputParameters[normalizeTo_camelCase(elementId)] = value;
        }

        const solutionsForMeUnfiltered = Object.values(solutions)
            .map(
                (solution) => solution(inputParameters),
                /*{
                    const solutionForMe = solution(inputParameters);

                    if (solutionForMe.color === undefined) {
                        // TODO: Each solution should have its own FIXED color
                        solutionForMe.color = faker.internet.color();
                    }

                    return solutionForMe;
                }*/
            )
            // TODO: Warn when there is infinite fit here or during balancing
            .filter((solution) => solution.percentile !== Infinity && solution.fit !== -Infinity);

        const solutionsForList = [...solutionsForMeUnfiltered]
            .filter((solution) => solution.percentile > 0)
            .sort((a, b) => b.percentile - a.percentile);

        const solutionsForGraph = [...solutionsForMeUnfiltered]
            .filter((solution) => solution.percentile > 0)
            .sort((a, b) => a.title < b.title);

        const solutionsListElement = document.getElementById('solutions-list');
        const solutionsGraphElement = document.getElementById('solutions-graph');
        const solutionsGraphSourceElement = document.getElementById('solutions-graph-source');

        solutionsListElement.innerHTML = '';
        for (const { percentile, title, description, pros, cons } of solutionsForList) {
            solutionsListElement.innerHTML += spaceTrim(
                (block) => `
                <li>
                    
                    <b>${title}</b> ${converter.makeHtml(description)}
                    <i class="debug">(${percentile > 0 ? '+' : ''}${
                    Math.round(percentile * 100 * 10) / 10 /* <- [♎] Should be in one place */
                }%)</i>

                    <div class="proscons">
                        <ul class="pros">
                            ${block(
                                pros.map((text) => `<li><b>+</b>&nbsp;${converter.makeHtml(text)}</li>`).join('\n'),
                            )}
                        </ul>
                        <ul class="cons">
                            ${block(
                                cons.map((text) => `<li><b>-</b>&nbsp;${converter.makeHtml(text)}</li>`).join('\n'),
                            )}
                        </ul>
                    </div>

                </li>
            `,
            );
        }

        const mermaidConfig = {
            theme: 'base',
            themeVariables: Object.fromEntries(
                solutionsForGraph.map(({ color }, i) => [`pie${i + 1}`, color || `#000000`]),
            ),
        };
        const graphSource = spaceTrim(
            (block) => `
                pie
                    ${block(solutionsForGraph.map(({ title, percentile }) => `"${title}" : ${percentile}`).join('\n'))}
            `,
        );

        solutionsGraphSourceElement.innerHTML = spaceTrim(
            `
                %%${JSON.stringify({
                    init: mermaidConfig,
                })}%%
                ${graphSource}
            `,
        );

        solutionsGraphElement.innerHTML = graphSource;
        delete solutionsGraphElement.dataset.processed;

        await mermaid.initialize(mermaidConfig);

        await mermaid.run({
            nodes: [solutionsGraphElement],
        });
        /**/

        /*
        await mermaid.render('solutions-graph', graphSource, (a) => {
            console.log({ a });
        });
        */
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

                /*
            // [🆙]
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

            */
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

        inputElement.addEventListener('input', async () => {
            updateOutput();
            await recalculateResult();
        });

        requestAnimationFrame(() => {
            updateOutput();
        });
    }

    for (const inputElement of Array.from(document.querySelectorAll(`select`))) {
        inputElement.addEventListener('input', async () => {
            await recalculateResult();
        });
    }

    requestAnimationFrame(async () => {
        await recalculateResult();
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
