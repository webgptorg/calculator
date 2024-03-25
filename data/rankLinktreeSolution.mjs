import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Linktree solution based on user preferences.
 */
export function rankLinktreeSolution(prefecences) {
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
        'Linktree',
        'Vytvořte si jednoduše elegantní propojovací stránku pro všechny vaše odkazy.',
    );

    solutionRank.pro('Snadný a rychlý způsob, jak sdílet více odkazů přes jednu URL.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 3,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 5, // <- By linking to external product pages
        },
    );

    if (productsCount > 0) { 
        solutionRank.note(
            'Linktree umožňuje pouze odkazovat na externí produktové stránky, nikoli přímo prodávat produkty.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 2, // <- Limited to basic functionalities
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 500 /* CZK */, // <- Very low initial cost
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */,
            possible: 150 /* CZK */, // <- Affordable subscription plans
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* day */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 /* % */ / 100,
            possible: 30 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}