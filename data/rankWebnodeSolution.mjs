import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Webnode solution based on user preferences.
 */
export function rankWebnodeSolution(prefecences) {
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
        'Webnode',
        'Rychlé a snadné vytváření webů s Webnode, oblíbeným nástrojem pro tvorbu webů v ČR.',
    );

    solutionRank.pro('Jednoduché použití pro začátečníky.');
    solutionRank.con('Omezené možnosti přizpůsobení pro pokročilé uživatele.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'eshop']);
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
            possible: 100, // Considering built-in e-commerce capabilities
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Webnode nabízí integrované řešení pro eshopy, ale s omezenými funkcemi v porovnání s specializovanými platformami.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Limited by built-in functionalities and lack of support for deep customizations
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 200 /* CZK */,
            possible: 50 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */, // Quick setup time for simple sites
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    solutionRank.smallPro('Nízké náklady na spuštění.');
    solutionRank.smallCon('Nedostatečný výkon pro velmi náročné projekty.');

    solutionRank.bigPro('Rychlost spuštění bez významných technických znalostí.');
    solutionRank.bigCon('Obtížnost integrace složitějších funkcí a modifikací.');

    return solutionRank.calculate();
}