import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Custom solution based on user preferences.
 */
export function rankCustomSolution(preferences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Custom Solution',
        'Dokonalé řešení na míru pro vaše specifické podnikatelské potřeby.',
    );

    solutionRank.pro('Flexibilní a plně přizpůsobitelné řešení.');
    solutionRank.pro('Optimalizováno pro výkon a SEO.');

    solutionRank.goodFor({ webType }, ['application', 'eshop', 'presentation', 'blog']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
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
            ideal: 5,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 100000 /* CZK */,
            possible: 50000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 180 /* days */,
            possible: 30 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 90 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    solutionRank.con('Vyšší počáteční náklady.');
    solutionRank.con('Dlouhá doba vývoje.');

    return solutionRank.calculate();
}
