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
        'Vytvořte si krásné webové stránky snadno s Wixem, cloudovou platformou pro webdesign.',
    );

    solutionRank.pro('Jednoduché drag-and-drop rozhraní.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'eshop']);
    solutionRank.badFor({ webType }, ['application']); // Omezené možnosti pro pokročilé webové aplikace

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 500,
            possible: 1000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 200,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20, // Přes Wix App Market a malý prostor pro vlastní vývoj
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 10000 /* CZK */,
            possible: 0 /* CZK */, // Může začít zdarma s možností upgradovat
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 300 /* CZK */,
            possible: 150 /* CZK */, // Závisí na požadavcích a vybraném balíčku
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */, // Rychlá implementace díky šablonám a editoru
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 40 /* % */ / 100, // Nižší stupeň kontroly kvůli uzavřené platformě
        },
    );

    return solutionRank.calculate();
}
