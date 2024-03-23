import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Wix solution based on user preferences.
 */
export function rankWixSolution(prefecences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount, // Relevant for e-shops
        customFunctionsCount, // Implementing through Wix Velo for custom functionality
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK, should include Wix subscription costs
        daysToDeadline, // How quickly the website must be up
        levelOfControl, // Freedom in customization, from drag-and-drop to code
    } = prefecences;

    const solutionRank = new SolutionRank(
        'Wix Platform',
        'Umožňuje snadnou a rychlou tvorbu webových stránek pro vaše podnikání.',
    );

    solutionRank.pro('Intuitivní drag-and-drop editor.');
    solutionRank.pro('Vhodné pro začátečníky bez programovacích dovedností.');

    solutionRank.con('Méně kontrolní a přizpůsobitelné než samostatné systémy.');
    solutionRank.con('Vyšší měsíční náklady.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'eshop']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 1,
            possible: 5000, // With suitable Wix plans
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20, // Implementable through Wix Velo with limitations
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 0 /* CZK */, // No upfront cost, only monthly subscription fees
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 300 /* CZK */,
            possible: 2000 /* CZK */, // Depends on the Wix plan selected
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* days */, // Very quick to deploy
            possible: 1 /* days */, // Basic sites can be set up in a day
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100, // Higher with Wix Velo but limited compared to full coding
        },
    );

    return solutionRank.calculate();
}
