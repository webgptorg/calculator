import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Facebook Page solution based on user preferences.
 */
export function rankFacebookSolution(prefecences) {
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
        'Facebook Page',
        'Použijte stránku na Facebooku jako svou jedinou internetovou prezentaci.',
    );

    solutionRank.pro('Rychlé zřízení a bez nutnosti technických znalostí.');
    solutionRank.con('Omezení ve funkčnosti a designu oproti plnohodnotné webové stránce.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1, // Since it's a single page usually
            possible: 5, // Considering tabs and sections as "pages"
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50, // Using Facebook shop features
        },
    );

    if (productsCount > 0) {
        solutionRank.note('Facebook umožňuje přidávat produkty a vytvářet "mini-eshop" přímo na vaší stránce.');
    }

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
            ideal: 0 /* CZK */,
            possible: 1000 /* CZK */, // Considering some potential minor investments
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */,
            possible: 100 /* CZK */, // Advertisement or promotions are not considered
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* days */,
            possible: 0 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 0 /* % */ / 100,
            possible: 20 /* % */ / 100,
        },
    );

    

    solutionRank.balance({"fitAverage":-1908.1516446734229,"fitMin":-3121,"fitMax":30.89795918367347});

    return solutionRank.calculate();
}
