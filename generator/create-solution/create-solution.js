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

createSolutions()
    .catch((error) => {
        console.error(/*chalk.bgRed(*/ error.name || 'NamelessError');
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function createSolutions() {
    for (const [solutionName, solutionDescription] of [
        ['Wordpress', 'Self-hosted website builder'],
        ['Wordpress.com', 'Hosted Wordpress website builder on wordpress.com'],
        ['Custom', 'Make everything by yourself'],
        ['WebGPT', 'Use AI tool to generate your website in 2 minutes on webgpt.cz'],
        ['Webflow', 'Advanced website builder on webflow.com'],
        ['Wix', 'Simple website builder on wix.com'],
        ['Solid Pixels', 'Simple website builder on solidpixels.cz or solidpixels.com'],
        ['Shopify', 'E-commerce platform on shopify.com'],
        ['Shoptet', 'E-commerce platform on shoptet.cz'],
        ['Linktr.ee', 'Simple profile with links'],
        ['Facebook', 'Do not have website, just use Facebook page for the appearance on the internet'],
        ['LinkedIn', 'Do not have website, just use LinkedIn page or profile for the appearance on the internet'],
        ['Instagram', 'Do not have website, just use Instagram account for the appearance on the internet'],
        ['ChatGPT', 'Generate website with AI chatbot but prompt it manually'],

        // Note: Automatically generated solutions:
        // @see https://webgpt.cz/experiments/story
        ['Webnode', 'Website builder on webnode.com'],
        ['Squarespace', 'Advanced website builder on squarespace.com'],
        ['GoDaddy', 'Domain registration and website builder on godaddy.com'],
        ['Weebly', 'Simple website builder on weebly.com'],
        ['Strikingly', 'Single page website builder on strikingly.com'],
        ['Jimdo', 'Simple website builder on jimdo.com'],
        ['Site123', 'Beginner-friendly website builder on site123.com'],
        ['Format', 'Portfolio builder for artists and photographers on format.com'],
        ['Zyro', 'Simple website builder on zyro.com'],
        ['Duda', 'Website builder for agencies and freelancers on duda.co'],
        ['SiteBuilder', 'Beginner-friendly website builder on sitebuilder.com'],
        ['Web.com', 'AI website builder on web.com'],
        ['Mozello', 'Simple website and online store builder on mozello.com'],
        ['SiteW', 'Website builder for small businesses on sitew.com'],
        ['Pixpa', 'Website builder for top creatives on pixpa.com'],

        // <- TODO: To some configuration
    ]) {
        await createSolution(solutionName, solutionDescription);
    }
}

async function createSolution(solutionName, solutionDescription) {
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
        solutionDescription,
    };

    const executionResult = await executor(inputParameters, () => {});

    assertsExecutionSuccessful(executionResult);

    const { outputParameters } = executionResult;
    const { functionName, functionSourceCode } = outputParameters;

    await writeFile(
        `data/${functionName}.mjs`,
        `import { SolutionRank } from '../script/SolutionRank.mjs';` + '\n\n' + functionSourceCode,
        'utf-8',
    );

    console.info(`[ Done 🏭  Creating solution ]`);
}

/**
 * TODO: !!! Add generated disclaimer to generated files (and maybe make this as postprocessing function + [🧠] maybe prettifyWhatever (+ it should wor))
 * TODO: !!! Generated ranks must be ballanced
 */
