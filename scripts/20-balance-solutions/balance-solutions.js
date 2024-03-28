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
        for (let pagesCount = 1; pagesCount <= 10000; pagesCount += 10) {
            const parameters = {
                webType,
                pagesCount,
                productsCount: 10,
                customFunctionsCount: 10,
                budgetUpfront: 10,
                budgetPerMonth: 10,
                daysToDeadline: 10,
                levelOfControl: 0.5,
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
    }

    const t1 = performance.now();

    console.info(`Compute time: ${t1 - t0} milliseconds.`);
    console.info(solutionsAggregatedFit);

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}
