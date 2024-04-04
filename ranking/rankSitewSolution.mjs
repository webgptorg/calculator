import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the SiteW solution for small businesses based on user preferences.
 */
export function rankSitewSolution(prefecences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank(
        'SiteW',
        'Využijte jednoduchý a intuitivní nástroj SiteW pro rychlé vytvoření webu pro malé podniky.',
    );

    solutionRank.pro('Jednoduché a intuitivní uživatelské rozhraní.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    if (webType === 'eshop') {
        solutionRank.smallPro('Základní nástroje pro správu produktů a objednávek.');
    } else {
        solutionRank.smallCon('Omezené možnosti pro rozsáhlé eshopy s pokročilými funkcemi.');
    }

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
            possible: 100, // SiteW offers basic e-commerce capabilities
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10, // Limited by the simplicity of the platform
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 7000 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 100 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */,
        },
    );

    // SiteW's simplicity means less control over fine details.
    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
