import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Wordpress.com Hosted solution based on user preferences.
 */
export function rankWordpresscomSolution(prefecences) {
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
        'Wordpress.com Hosted',
        'Hostovaná verze Wordpress pro snazší správu webu bez znalosti programování.',
    );

    // General pros and cons for Wordpress.com as a Hosted solution
    solutionRank.bigPro('Rychlý start bez technických znalostí');
    solutionRank.bigCon('Nižší úroveň přizpůsobení ve srovnání s self-hosted WordPress');

    solutionRank.pro('Automatické aktualizace a zálohy');
    solutionRank.con('Měsíční náklady mohou růst s rozšiřujícími se potřebami webu');

    // Advantages and disadvantages specifically tied to user preferences

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    // Eshop is possible with Business and eCommerce plans
    if (webType === 'eshop') {
        solutionRank.smallPro('Plán Ecommerce umožňuje plně funkční Eshop');
    } else {
        solutionRank.smallCon('Pro pokročilé Eshop funkce je nutný dražší plán');
    }

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 0,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 5000, // Eshop plan supports up to this amount
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10, // Custom functionality is limited without plugins
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 15000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 3000 /* CZK */, // Ecommerce plan can touch this limit
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */, // Rapid deployment is possible
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
