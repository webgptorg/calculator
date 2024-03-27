#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import colors from 'colors';
import glob from 'glob-promise';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
    // TODO: !!! Implement

    glob('./solutions/**/*.json');

    console.info(colors.bgGreen(`[ Done 🏭⚖  Balancing solutions ]`));
}

async function ballanceSolution(solutionName, solutionDescription) {
    // TODO: !!! Implement
}
