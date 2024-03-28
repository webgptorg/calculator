#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import colors from 'colors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { forImmediate } from 'waitasecond';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(colors.red(`CWD must be root of the project`));
    process.exit(1);
}

balanceSolutions()
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
    // TODO: !!! Implement - maybe use index

    const solutions = await import('../../ranking/index.mjs');

    const solutionsAggregatedFit = {};

    const t0 = performance.now();

    for (const webType of ['presentation', 'eshop', 'blog', 'application']) {
        for (let productsCount = 0; productsCount <= 100000; productsCount += 100) {
            for (let pagesCount = 0; pagesCount <= 10000; pagesCount += 10) {
                for (let customFunctionsCount = 0; customFunctionsCount <= 100; customFunctionsCount += 2) {
                    for (let budgetUpfront = 0; budgetUpfront <= 10000000; budgetUpfront += 10000000 / 10) {
                        for (let budgetPerMonth = 0; budgetPerMonth <= 100000; budgetPerMonth += 100000 / 10) {
                            for (let daysToDeadline = 0; daysToDeadline <= 500; daysToDeadline += 20) {
                                for (let levelOfControl = 0; levelOfControl <= 1; levelOfControl += 0.1) {
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

                                    for (const [key, rankingFunction] of Object.entries(solutions)) {
                                        const ranking = rankingFunction(parameters);

                                        if (!solutionsAggregatedFit[key]) {
                                            solutionsAggregatedFit[key] = 0;
                                        }

                                        solutionsAggregatedFit[key] += ranking.fit;
                                    }

                                    await forImmediate();
                                }
                                console.log('a');
                            }
                            console.log('b');
                        }
                        console.log('c');
                    }
                    console.log('d');
                }
                console.log('e');
            }
            console.log('f');
        }
        console.log('g');
    }

    const t1 = performance.now();

    console.info(`Compute time: ${t1 - t0} milliseconds.`);
    console.info(solutionsAggregatedFit);

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}
