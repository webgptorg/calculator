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

/* not await */ removeSolutionsBalance()
    .catch((error) => {
        console.error(/*chalk.bgRed(*/ error.name || 'NamelessError');
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function removeSolutionsBalance() {
    console.info(`🏭⚖  Balancing solutions`);

    // TODO: Implement

    /*
    Now doing by:

    Find:
    ^\s+solutionRank.balance((.|\n)*?)$

    And replace
    
    */

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}

async function applyAggregatedFitOnSolution(rankingFunctionName, solutionAverageFit) {
    const rankingFunctionFilename = `ranking/${rankingFunctionName}.mjs`;
    let rankingFunctionCode = await readFile(rankingFunctionFilename, 'utf-8');

    const returnIndex = rankingFunctionCode.indexOf('return solutionRank.calculate()');

    if (returnIndex === -1) {
        throw new Error(`return solutionRank.calculate() not found in ranking function ${rankingFunctionName}`);
    }

    if (Math.abs(solutionAverageFit) < 0.000001) {
        solutionAverageFit = 0;
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
