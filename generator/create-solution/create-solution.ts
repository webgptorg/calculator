#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { CallbackInterfaceTools, createPromptbookExecutor, promptbookStringToJson } from '@promptbook/core';
import { JavascriptEvalExecutionTools } from '@promptbook/execute-javascript';
import { OpenAiExecutionTools } from '@promptbook/openai';
import type { PromptbookString } from '@promptbook/types';
import { assertsExecutionSuccessful } from '@promptbook/utils';
import chalk from 'chalk';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { OPENAI_API_KEY } from '../config';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

createSolution('Solid Pixels')
    .catch((error) => {
        console.error(chalk.bgRed(error.name || 'NamelessError'));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function createSolution(solutionName: string) {
    console.info(`🏭 Creating solution`);

    const promptbook = promptbookStringToJson(
        (await readFile(join(__dirname, '../promptbook/create-solution.ptbk.md'), 'utf-8')) as PromptbookString,
    );

    const executor = createPromptbookExecutor({
        promptbook,
        tools: {
            natural: new OpenAiExecutionTools({
                isVerbose: false,
                openAiApiKey: OPENAI_API_KEY!,
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
