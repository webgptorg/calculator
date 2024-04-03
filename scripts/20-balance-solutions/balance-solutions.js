#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import colors from 'colors';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(colors.red(`CWD must be root of the project`));
    process.exit(1);
}

/* not await */ balanceSolutions()
    .catch((error) => {
        console.error(/*chalk.bgRed(*/ error.name || 'NamelessError');
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function balanceSolutions() {
    console.info(`🏭⚖  Balancing solutions`);

    const solutions = await import('../../ranking/index.mjs');
    const { RANGES } = await import('../../src/ranges.mjs');

    // TODO: Maybe put whole this into separate function

    function increase(value) {
        if (value === 0) {
            return 1;
        } else {
            return value * 2; // <- TODO: [💫] Tweak this exponent
        }
    }

    for (const [rankingFunctionName, rankingFunction] of Object.entries(solutions)) {
        console.info(colors.cyan(`Balancing ${rankingFunctionName}`));

        let fitCount = 0;
        let fitSum = 0;
        let fitMin = null;
        let fitMax = null;

        const t0 = performance.now();

        for (const webType of ['presentation', 'eshop', 'blog', 'application']) {
            for (
                let productsCount = RANGES.productsCount.min;
                productsCount <= RANGES.productsCount.max;
                productsCount = increase(productsCount)
            ) {
                for (
                    let pagesCount = RANGES.pagesCount.min;
                    pagesCount <= RANGES.pagesCount.max;
                    pagesCount = increase(pagesCount)
                ) {
                    for (
                        let customFunctionsCount = RANGES.customFunctionsCount.min;
                        customFunctionsCount <= RANGES.customFunctionsCount.max;
                        customFunctionsCount = increase(customFunctionsCount)
                    ) {
                        for (
                            let budgetUpfront = RANGES.budgetUpfront.min;
                            budgetUpfront <= RANGES.budgetUpfront.max;
                            budgetUpfront = increase(budgetUpfront)
                        ) {
                            for (
                                let budgetPerMonth = RANGES.budgetPerMonth.min;
                                budgetPerMonth <= RANGES.budgetPerMonth.max;
                                budgetPerMonth = increase(budgetPerMonth)
                            ) {
                                for (
                                    let daysToDeadline = RANGES.daysToDeadline.min;
                                    daysToDeadline <= RANGES.daysToDeadline.max;
                                    daysToDeadline = increase(daysToDeadline)
                                ) {
                                    for (
                                        let levelOfControl = RANGES.levelOfControl.min;
                                        levelOfControl <= RANGES.levelOfControl.max;
                                        levelOfControl = increase(levelOfControl)
                                    ) {
                                        const parameters = {
                                            webType,
                                            pagesCount,
                                            productsCount,
                                            customFunctionsCount,
                                            budgetUpfront,
                                            budgetPerMonth,
                                            daysToDeadline,
                                            levelOfControl,
                                        };

                                        const ranking = rankingFunction(parameters);
                                        fitCount++;
                                        fitSum += ranking.fit;

                                        if (fitMin === null || ranking.fit < fitMin) {
                                            fitMin = ranking.fit;
                                        }
                                        if (fitMax === null || ranking.fit > fitMax) {
                                            fitMax = ranking.fit;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        const t1 = performance.now();

        let fitAverage = fitSum / fitCount;

        if (Math.abs(fitAverage) < 0.000001) {
            fitAverage = 0;
        }

        await applyAggregatedFitOnSolution(rankingFunctionName, { fitAverage /* fitSum, fitCount */, fitMin, fitMax });

        console.info(colors.green(`Done in ${Math.round(((t1 - t0) / 1000 / 60) * 10) / 10} minutes`));
    }

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}

async function applyAggregatedFitOnSolution(rankingFunctionName, fitStats) {
    const rankingFunctionFilename = `ranking/${rankingFunctionName}.mjs`;
    let rankingFunctionCode = await readFile(rankingFunctionFilename, 'utf-8');

    const returnIndex = rankingFunctionCode.indexOf('return solutionRank.calculate()');

    if (returnIndex === -1) {
        throw new Error(`return solutionRank.calculate() not found in ranking function ${rankingFunctionName}`);
    }

    rankingFunctionCode =
        rankingFunctionCode.slice(0, returnIndex) +
        `\n\n    solutionRank.balance(${JSON.stringify(fitStats)});\n\n    ` +
        rankingFunctionCode.slice(returnIndex);

    await writeFile(rankingFunctionFilename, rankingFunctionCode, 'utf-8');
}

/**
 * TODO: Put applyAggregatedFitOnSolutions to new file
 */
