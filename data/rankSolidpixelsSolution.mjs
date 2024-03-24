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
        'Solid Pixels nabízí uživatelům snadnou cestu k sestavení elegantních a funkčních webových stránek.',
    );

    solutionRank.pro('Velmi snadné použití bez nutnosti programovacích dovedností.');
    solutionRank.pro('Český produkt s podporou v českém jazyce.');

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
            possible: 200, // Solid Pixels can support simple e-shops
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10, // Limited by the platform's capabilities
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
            ideal: 300 /* CZK */,
            possible: 100 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */, // Quick to set up for simple sites
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
