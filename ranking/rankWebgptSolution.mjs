import { spaceTrim } from 'https://cdn.jsdelivr.net/npm/spacetrim@0.11.4/+esm';
import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the WebGPT solution based on user preferences.
 */
export function rankWebgptSolution(prefecences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank(
        'WebGPT',
        'Použijte AI nástroj pro generování vašeho webu během 2 minut na webgpt.cz.',
    );

    solutionRank.bigPro('Velmi rychlé nasazení webu.');

    if (pagesCount + productsCount + customFunctionsCount > 20) {
        solutionRank.bigCon(`Není vhodné pro rozsáhlé weby`);
    }

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 5,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 1,
            possible: 12,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 2,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 3000 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 600 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* day */,
            possible: 1 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.5) {
        solutionRank.note(
            spaceTrim(`
                Pokud chcete mít větší kontrolu nad svým webem, můžete si vygenerovat web pomocí WebGPT a následně upravit kód dle svých představ.
            `),
        );
    }

    return solutionRank.calculate();
}
