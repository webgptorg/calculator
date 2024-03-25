import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Wix solution based on user preferences.
 */
export function rankWixSolution(prefecences) {
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
        'Wix',
        'Použijte Wix pro jednoduché a rychlé vytvoření webových stránek s drag and drop editorem.',
    );

    solutionRank.pro('Umožňuje snadnou a rychlou tvorbu webových stránek.');
    solutionRank.con('Nižší úroveň přizpůsobení pro komplexní projekty.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'eshop']);
    solutionRank.badFor({ webType }, ['application']);

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
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Wix has limited capabilities for custom functions
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
            ideal: 500 /* CZK */,
            possible: 200 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */,
        },
    );

    if (daysToDeadline < 7) {
        solutionRank.bigPro('Rychlá realizace webových stránek.');
    } 

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.5) {
        solutionRank.bigCon('Wix nemusí poskytovat dostatečnou míru kontroly pro velmi specifické požadavky.');
    }

    return solutionRank.calculate();
}