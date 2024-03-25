import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the LinkedIn solution based on user preferences.
 */
export function rankLinkedinSolution(prefecences) {
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
        'LinkedIn pro firmy',
        'Využijte sílu LinkedInu pro prezentaci Vaší firmy, nábor nových zaměstnanců nebo pro B2B marketing.',
    );

    solutionRank.pro('Cílení na profesionály a podniky.');
    solutionRank.pro('Silný nástroj pro B2B marketing.');
    solutionRank.pro('Možnost přímé komunikace s potenciálními zaměstnanci nebo klienty.');

    solutionRank.goodFor({ webType }, ['presentation']);
    solutionRank.badFor({ webType }, ['eshop', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1, // LinkedIn profil count as one page
            possible: 1, // Limited to the structure of the LinkedIn page
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 0, // LinkedIn is not suited for selling products directly
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 0, // Limited customization, mainly for networking and content sharing
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */, // It's free to create a company page
            possible: 15000 /* CZK */, // For premium accounts and initial setup assistance
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */, // No monthly fees for basic usage
            possible: 5000 /* CZK */, // For premium accounts and running ads
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* day */,
            possible: 7 /* days */, // Considering content creation and profile optimization
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 /* % */ / 100, // Low level of customization
            possible: 30 /* % */ / 100, // Some degree of control over content and networking features
        },
    );

    return solutionRank.calculate();
}