#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { CallbackInterfaceTools, createPromptbookExecutor, promptbookStringToJson } from '@promptbook/core';
import { JavascriptEvalExecutionTools } from '@promptbook/execute-javascript';
import { OpenAiExecutionTools } from '@promptbook/openai';
import { assertsExecutionSuccessful } from '@promptbook/utils';
// import chalk from 'chalk';
import { readFile, writeFile } from 'fs/promises';
import { OPENAI_API_KEY } from './config.js';

/*
TODO: !!!
if (process.cwd() !== join(__dirname, '../..')) {
    console.error(/*chalk.red(* / `CWD must be root of the project`);
    process.exit(1);
}
*/

createSolution('Shopify')
    .catch((error) => {
        console.error(/*chalk.bgRed(*/ error.name || 'NamelessError');
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function createSolution(solutionName) {
    console.info(`🏭 Creating solution`);

    const promptbook = promptbookStringToJson(
        await readFile('./generator/promptbook/create-solution.ptbk.md', 'utf-8'),
    );

    const executor = createPromptbookExecutor({
        promptbook,
        tools: {
            natural: new OpenAiExecutionTools({
                isVerbose: false,
                openAiApiKey: OPENAI_API_KEY,
                user: 'calculator/create-solution',
            }),
            script: [
                new JavascriptEvalExecutionTools(
                    /* <- TODO: !! Change to JavascriptExecutionTools */ {
                        isVerbose: false,
                    },
                ),
            ],
            userInterface: new CallbackInterfaceTools({
                isVerbose: false,
                async callback(options) {
                    throw new Error('Can not interact with user interface in server');
                },
            }),
        },
        settings: {
            maxExecutionAttempts: 3,
        },
    });

    const inputParameters = {
        solutionName,
    };

    const executionResult = await executor(inputParameters, () => {});

    assertsExecutionSuccessful(executionResult);

    const { outputParameters } = executionResult;
    const { functionName, functionSourceCode } = outputParameters;

    await writeFile(`data/${functionName}.mjs`, functionSourceCode, 'utf-8');

    console.info(`[ Done 🏭  Creating solution ]`);
}
