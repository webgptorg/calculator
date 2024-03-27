import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Linktr.ee solution based on user preferences.
 */
export function rankLinktreeSolution(preferences) {
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
        'Linktr.ee',
        'Jednoduchý profil s odkazy pro sjednocení vaší online přítomnosti na jednom místě.',
    );

    solutionRank.smallPro('Ideální pro sdružení všech online profilů.');
    solutionRank.smallCon('Limitovaná personalizace a funkcionalita.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 5,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 0,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 0,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 1000 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 300 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* days */,
            possible: 0 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 5 /* % */ / 100,
            possible: 10 /* % */ / 100,
        },
    );

    solutionRank.bigPro('Rychlé nastavení a spuštění.');
    solutionRank.bigCon('Velmi omezený prostor pro růst a rozšiřování. Nepodporuje eshop ani aplikace.');

    return solutionRank.calculate();
}
