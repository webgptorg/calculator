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

    // TODO: Maybe put whole this into separate function

    function increase(value) {
        if (value === 0) {
            return 1;
        } else {
            return value * 2; // <- TODO: Tweak this exponent
        }
    }

    for (const [rankingFunctionName, rankingFunction] of Object.entries(solutions)) {
        console.info(colors.cyan(`Balancing ${rankingFunctionName}`));

        let solutionCount = 0;
        let solutionAggregatedFit = 0;

        const t0 = performance.now();

        for (const webType of ['presentation', 'eshop', 'blog', 'application']) {
            for (let productsCount = 0; productsCount <= 100000; productsCount = increase(productsCount)) {
                for (let pagesCount = 0; pagesCount <= 10000; pagesCount = increase(pagesCount)) {
                    for (
                        let customFunctionsCount = 0;
                        customFunctionsCount <= 100;
                        customFunctionsCount = increase(customFunctionsCount)
                    ) {
                        for (
                            let budgetUpfront = 0;
                            budgetUpfront <= 10000000;
                            budgetUpfront = increase(budgetUpfront)
                        ) {
                            for (
                                let budgetPerMonth = 0;
                                budgetPerMonth <= 100000;
                                budgetPerMonth = increase(budgetPerMonth)
                            ) {
                                for (
                                    let daysToDeadline = 0;
                                    daysToDeadline <= 500;
                                    daysToDeadline = increase(daysToDeadline)
                                ) {
                                    for (
                                        let levelOfControl = 0;
                                        levelOfControl <= 1;
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
                                        solutionCount++;
                                        solutionAggregatedFit += ranking.fit;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        const t1 = performance.now();

        console.info(colors.green(`Done in ${Math.round(((t1 - t0) / 1000 / 60) * 10) / 10} minutes`));

        const solutionAverageFit = solutionAggregatedFit / solutionCount;

        await applyAggregatedFitOnSolution(rankingFunctionName, solutionAverageFit);

        console.info(colors.bgGreen(`[ Saved ]`));
    }

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}

async function applyAggregatedFitOnSolution(rankingFunctionName, solutionAverageFit) {
    const rankingFunctionFilename = `ranking/${rankingFunctionName}.mjs`;
    let rankingFunctionCode = await readFile(rankingFunctionFilename, 'utf-8');

    const returnIndex = rankingFunctionCode.indexOf('return solutionRank.calculate()');

    if (returnIndex === -1) {
        throw new Error(`return solutionRank.calculate() not found in ranking function ${rankingFunctionName}`);
    }

    rankingFunctionCode =
        rankingFunctionCode.slice(0, returnIndex) +
        `\n\n    solutionRank.balance(${-solutionAverageFit});\n\n    ` +
        rankingFunctionCode.slice(returnIndex);

    await writeFile(rankingFunctionFilename, rankingFunctionCode, 'utf-8');
}

/**
 * TODO: Put applyAggregatedFitOnSolutions to new file
 */
