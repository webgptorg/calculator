import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Custom solution based on user preferences.
 */
export function rankCustomSolution(prefecences) {
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
        'Custom Solution',
        'Vytvořte plně přizpůsobitelné webové řešení přesně podle vašich požadavků.',
    );

    solutionRank.pro('Plně přizpůsobitelné řešení.');
    solutionRank.pro('Optimalizováno pro vaši konkrétní potřebu.');

    solutionRank.goodFor({ webType }, ['application', 'eshop']);
    solutionRank.badFor({ webType }, ['blog']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 100,
            possible: 1000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 100,
            possible: 10000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 10,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 100000 /* CZK */,
            possible: 30000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */,
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
            ideal: 70 /* % */ / 100,
            possible: 90 /* % */ / 100,
        },
    );

    solutionRank.con('Vyšší počáteční náklady.');
    solutionRank.con('Vyžaduje delší dobu pro vývoj.');

    return solutionRank.calculate();
}