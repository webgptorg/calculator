import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Solid Pixels solution based on user preferences.
 */
export function rankSolidpixelsSolution(prefecences) {
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
        'Solid Pixels',
        'Kompletní řešení pro tvorbu webových stránek s unikátním designem bez nutnosti kódování.',
    );

    solutionRank.pro('Snadné používání pro nezkušené uživatele.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

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
            ideal: 0,
            possible: 100, // Solid Pixels isn't primarily designed for e-shops
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10, // Limited by no-code platform capabilities
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
            ideal: 1000 /* CZK */,
            possible: 200 /* CZK */,
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
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.disadvantage('Omezená možnost přizpůsobení bez znalosti kódování.');
    solutionRank.disadvantage('Není ideální pro rozsáhlé eshopy nebo specializované webové aplikace.');

    return solutionRank.calculate();
}