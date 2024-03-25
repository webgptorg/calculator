import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Webflow solution based on user preferences.
 */
export function rankWebflowSolution(prefecences) {
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
        'Webflow',
        'Webflow umožňuje vizuálně navrhovat, postavit a spustit úžasné webové stránky.',
    );

    solutionRank.pro('Nenáročné na technické znalosti.');
    solutionRank.pro('Vysoká míra vizuální přizpůsobitelnosti.');

    solutionRank.con('Limitované možnosti pro rozsáhlé eshopy.');
    solutionRank.con('Vyšší měsíční náklady ve srovnání s některými alternativami.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

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
            ideal: 0,
            possible: 2000, // Limited by plan
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Webflow nabízí integrované nástroje pro eshopy s možností snadné správy produktů.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20, // Dependent on 3rd party integrations or custom code
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 15000 /* CZK */,
            possible: 5000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 200 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 30 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}