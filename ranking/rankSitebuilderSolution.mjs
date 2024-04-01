import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the SiteBuilder solution based on user preferences.
 */
export function rankSitebuilderSolution(prefecences) {
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
        'SiteBuilder - Beginner-friendly',
        'Uživatelsky přívětivý webový konstruktor na Sitebuilder.com pro jednoduché a rychlé tvorbu webů.',
    );

    solutionRank.pro('Intuitivní drag-and-drop rozhraní.');
    solutionRank.con('Omezené možnosti přizpůsobení pro pokročilé uživatele.');

    solutionRank.goodFor({ webType }, ['prezentace', 'blog']);
    solutionRank.badFor({ webType }, ['aplikace', 'eshop']);

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
            ideal: 0,
            possible: 50, // Eshop functionality is basic but possible
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Limited by the available widgets/plugins
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 0 /* CZK */, // Very affordable entry costs
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 200 /* CZK */,
            possible: 100 /* CZK */, // Competitive monthly costs
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 14 /* days */,
            possible: 1 /* day */, // Quick setup and deployment
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.5) {
        solutionRank.bigCon('Nedostatečná kontrola nad designem pro vysoký požadavek na úroveň kontroly.');
    }

    

    solutionRank.balance({"fitAverage":-12.394484683747963,"fitMin":-134.66666666666666,"fitMax":105.38868717948716});

    return solutionRank.calculate();
}
