import { SolutionRank } from '../script/SolutionRank.mjs';
/**
 * Rank the suitability of the Shoptet solution based on user preferences.
 */
export function rankShoptetSolution(preferences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Shoptet',
        'Komplexní řešení pro eshopy a online prodej v Čechách.',
    );

    solutionRank.pro('Vše v jednom řešení pro rychlý start e-shopu.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 100,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 500,
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20, // <- Limited by Shoptet's extension ecosystem
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 20000 /* CZK */,
            possible: 5000 /* CZK */, // Minimal setup fees may apply
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000 /* CZK */, // Including hosting, support, SSL
            possible: 1000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */, // Thanks to pre-built templates and setups
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100, // Shoptet manages most of the technical aspects.
            possible: 40 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
