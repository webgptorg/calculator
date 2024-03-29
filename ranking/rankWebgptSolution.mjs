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

    solutionRank.pro('Rychlé nasazení webu.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 20, // Pre-assumption that basic e-commerce features might be supported but limited
        },
    );

    if (webType === 'eshop') {
        solutionRank.note('E-shop funkce můžou být omezené a méně flexibilní než specializované řešení pro e-shopy.');
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 10000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* day */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.bigPro('Možnost rychlého testování a prototypování.');

    solutionRank.bigCon('Limitovaná přizpůsobivost pro složité weby a aplikace.');

    

    solutionRank.balance(397.0833973339097);

    return solutionRank.calculate();
}
