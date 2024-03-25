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
        'Solid Pixels poskytuje snadno použitelnou platformu pro vytvoření moderních webů bez nutnosti programování.',
    );

    solutionRank.pro('Snadné použití pro začátečníky i pokročilé.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop']);
    solutionRank.badFor({ webType }, ['application', 'blog']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 50,
            possible: 500,
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.bigCon(
            'Vlastní funkcionality vyžadují externí nástroje nebo služby.',
        );
    } else {
        solutionRank.bigPro(
            'Základní webové funkce jsou plně podporované bez nutnosti vlastního kódování.',
        );
    }

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
            possible: 1 /* day */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 70 /* % */ / 100,
            possible: 90 /* % */ / 100,
        },
    );

    solutionRank.note(
        'Solid Pixels je vhodný pro projekty, kde je důležitá rychlost vývoje a nejsou požadovány složité vlastní funkce.',
    );

    return solutionRank.calculate();
}