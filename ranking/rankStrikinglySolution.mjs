import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Strikingly solution for single page websites based on user preferences.
 */
export function rankStrikinglySolution(prefecences) {
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
        'Strikingly',
        'Vytvořte si atraktivní jednostránkovou webovou prezentaci pomocí Strikingly.',
    );

    solutionRank.pro('Ideální pro jednostránkové weby.');
    solutionRank.con('Není vhodné pro složité weby a aplikace.');

    solutionRank.goodFor({ webType }, ['presentation']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 5, // Even though Strikingly focuses on single-page, it can somewhat handle a few more pages.
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 20, // Strikingly does offer some e-commerce capabilities but is limited.
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Strikingly poskytuje základní možnosti pro e-commerce, ale je vhodnější pro menší počet produktů.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Strikingly's customization is limited compared to other platforms.
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 10000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 200 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* days */,
            possible: 1 /* day */, // Strikingly is quick to deploy but might require some setup.
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.pushBenefit(3.4525788148541166,'balancing');
return solutionRank.calculate();
}
