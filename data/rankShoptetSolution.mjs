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
        'Jednoduché řešení pro eshopy s širokým spektrem modulů a přednastavených funkcí.',
    );

    solutionRank.pro('Optimalizováno pro tvorbu a správu e-shopů.');
    solutionRank.pro('Snadné použití bez potřeby technických znalostí.');
    solutionRank.pro('Množství integrovaných platforem pro platby a logistiku.');
    
    solutionRank.con('Omezení na úrovni přizpůsobení a rozšiřitelnosti.');
    solutionRank.con('Měsíční poplatky mohou být vyšší ve srovnání s open-source řešeními.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 50,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 100,
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10, // Considering the use of additional modules and some level of customization.
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 10000 /* CZK */, // Initial setup with some custom design or modules.
            possible: 0 /* CZK */, // Basic setup without custom needs.
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */, // For a large shop with high demands on functionality and bandwidth.
            possible: 1000 /* CZK */, // Basic plan for starting e-shops.
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */, // Enough time to set up and customize the shop.
            possible: 1 /* day */, // Basic setups can be very quick.
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 30 /* % */ / 100, // As Shoptet handles a lot of the technical side.
            possible: 70 /* % */ / 100, // With some custom modul integrations and design changes.
        },
    );

    return solutionRank.calculate();
}