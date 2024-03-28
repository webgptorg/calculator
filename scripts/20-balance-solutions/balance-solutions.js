#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import colors from 'colors';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { spaceTrim } from 'spaceTrim';
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

    let rankingCount = 0;
    let solutionsAggregatedFit = {};

    /**/
    // Note: Keeping for testing
    rankingCount = 2255040000;
    solutionsAggregatedFit = {
        rankChatgptSolution: 89820671.99889593,
        rankCustomSolution: 123619147.51425396,
        rankDudaSolution: 241094862.72074685,
        rankFacebookSolution: -654809299.1971602,
        rankFormatSolution: 169283059.2003875,
        rankGodaddySolution: -30155900.493874323,
        rankInstagramSolution: -283776480.00918245,
        rankJimdoSolution: -145463822.35821527,
        rankLinkedinSolution: -795898080.0707253,
        rankLinktreeSolution: -416978265.5989906,
        rankMozelloSolution: -48788066.66714392,
        rankPixpaSolution: -68129944.65418386,
        rankShopifySolution: 388571535.9416235,
        rankShoptetSolution: 260565170.546282,
        rankSite123Solution: -53667417.6001361,
        rankSitebuilderSolution: -30917984.787886783,
        rankSitewSolution: 168417156.55764246,
        rankSolidpixelsSolution: 68313123.50642425,
        rankSquarespaceSolution: 9473291.185927138,
        rankStrikinglySolution: -268472528.6430561,
        rankWebcomSolution: -100364378.87965807,
        rankWebflowSolution: 174783759.02624804,
        rankWebgptSolution: -202958576.64121133,
        rankWebnodeSolution: 227660664.75909004,
        rankWeeblySolution: 136830445.24169192,
        rankWixSolution: 278632734.3842762,
        rankWordpressSolution: 338157659.16943735,
        rankWordpresscomSolution: 122169524.92142123,
        rankZyroSolution: 50355843.640244275,
    };
    /**/

    if (rankingCount === 0) {
        // TODO: Maybe put whole this into separate function

        const t0 = performance.now();

        function increase(value) {
            if (value === 0) {
                return 1;
            } else {
                return value * 2; // <- TODO: Tweak this exponent
            }
        }

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

                                        for (const [rankingFunctionName, rankingFunction] of Object.entries(
                                            solutions,
                                        )) {
                                            const ranking = rankingFunction(parameters);
                                            rankingCount++;

                                            if (!solutionsAggregatedFit[rankingFunctionName]) {
                                                solutionsAggregatedFit[rankingFunctionName] = 0;
                                            }

                                            solutionsAggregatedFit[rankingFunctionName] += ranking.fit;
                                        }

                                        // await forImmediate();
                                    }
                                    // console.log('a');
                                }
                                // console.log('b');
                            }
                            // console.log('c');
                        }
                        // console.log('d');
                    }
                    console.log('e');
                }
                console.log('f');
            }
            console.log('g');
        }

        const t1 = performance.now();

        console.info(
            colors.cyan(
                spaceTrim(`
    
                    Compute time: ${Math.round(((t1 - t0) / 1000 / 60 / 60) * 10) / 10} hours
                    Total rank count: ${rankingCount}
                    Average time per rank: ${(t1 - t0) / rankingCount} ms
                
                `),
            ),
        );
    }

    const solutionsAverageFit = Object.fromEntries(
        Object.entries(solutionsAggregatedFit).map(([key, value]) => [
            key,
            value / (rankingCount / Object.keys(solutions).length),
        ]),
    );

    // console.info({ solutionsAggregatedFit, solutionsAverageFit });

    await applyAggregatedFitOnSolutions(solutionsAverageFit);

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}

async function applyAggregatedFitOnSolutions(solutionsAverageFit) {
    for (const [rankingFunctionName, solutionAverageFit] of Object.entries(solutionsAverageFit)) {
        const rankingFunctionFilename = `ranking/${rankingFunctionName}.mjs`;
        let rankingFunctionCode = await readFile(rankingFunctionFilename, 'utf-8');

        const returnIndex = rankingFunctionCode.indexOf('return solutionRank.calculate()');

        if (returnIndex === -1) {
            throw new Error(`return solutionRank.calculate() not found in ranking function ${rankingFunctionName}`);
        }

        rankingFunctionCode =
            rankingFunctionCode.slice(0, returnIndex) +
            `\n\n    solutionRank.balance(${-solutionAverageFit});\n\n` +
            rankingFunctionCode.slice(returnIndex);

        await writeFile(rankingFunctionFilename, rankingFunctionCode, 'utf-8');
    }
}

/**
 * TODO: Put applyAggregatedFitOnSolutions to new file
 */
