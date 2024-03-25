import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Linktree solution based on user preferences.
 */
export function rankLinktreeSolution(preferences) {
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
        'Linktree',
        'Jednoduchá a efektivní platforma pro správu více odkazů na jediné webové stránce, populární mezi influencery a značkami.',
    );

    solutionRank.pro('Okamžité spuštění bez potřeby technických znalostí.');
    solutionRank.pro('Ideální pro řízení více online profilů a odkazů z jednoho místa.');
    solutionRank.pro('Měsíční platby za pokročilé funkce jsou poměrně nízké.');

    solutionRank.goodFor({ webType }, ['presentation']);
    solutionRank.badFor({ webType }, ['eshop', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 1, // Linktree is designed to manage multiple links from a single page
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 10, // Limited e-commerce capabilities via external links
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Limited by the platform's inherent capabilities
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */, // No upfront costs for basic usage
            possible: 1000 /* CZK */, // Considering potential costs for premium features
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */, // Free for basic usage
            possible: 300 /* CZK */, // For access to advanced features
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* days */,
            possible: 0 /* days */, // Can be set up in minutes
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 /* % */ / 100,
            possible: 20 /* % */ / 100, // Limited control due to platform constraints
        },
    );

    // Disadvantages
    solutionRank.con('Omezené možnosti přizpůsobení a funkcionality.');
    solutionRank.con('Není vhodné pro složitější webové projekty nebo eshopy.');
    solutionRank.con('Nízký stupeň kontroly nad designem a strukturou webové stránky.');

    return solutionRank.calculate();
}