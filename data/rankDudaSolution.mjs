import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Duda solution based on user preferences.
 */
export function rankDudaSolution(prefecences) {
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
        'Duda - Website Builder',
        'Duda je webový tvůrce speciálně určený pro agentury a freelancery.',
    );

    solutionRank.pro('Intuitivní drag-and-drop rozhraní.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 50,
            possible: 200,
        },
    );

    if (webType === 'eshop') {
        solutionRank.bigPro('Integrované řešení pro e-shopy.');
        solutionRank.smallCon('Možnosti přizpůsobení e-shopu jsou omezené v porovnání s specializovanými platformami.');
    }

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 20000 /* CZK */,
            possible: 5000 /* CZK */,
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
            possible: 3 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 70 /* % */ / 100,
            possible: 90 /* % */ / 100,
        },
    );

    solutionRank.bigCon('Možnosti pro úplné přizpůsobení a pokročilé funkce jsou omezené.');

    return solutionRank.calculate();
}