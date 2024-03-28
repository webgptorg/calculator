import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Squarespace solution based on user preferences.
 */
export function rankSquarespaceSolution(prefecences) {
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

    const solutionRank = new SolutionRank('Squarespace', 'Pokročilý nástroj pro tvorbu webů na squarespace.com.');

    solutionRank.pro('Intuitivní a uživatelsky přívětivá tvorba obsahu.');
    solutionRank.con('Nižší úroveň přizpůsobení pro pokročilé funkce a design.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);
    solutionRank.neutralFor({ webType }, ['eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 25,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 250, // Squarespace supports e-commerce but might not be ideal for large inventories
        },
    );

    if (productsCount > 0) {
        solutionRank.note('Podpora pro e-commerce je přítomna, ale může být limitující pro velké inventáře.');
    }

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
            ideal: 10000 /* CZK */,
            possible: 15000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 1000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 30 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.7) {
        solutionRank.bigCon('Pro velmi specifické nebo detailně přizpůsobené projekty může být Squarespace omezující.');
    }

    solutionRank.pushBenefit(-0.1218273043457708,'balancing');
return solutionRank.calculate();
}
