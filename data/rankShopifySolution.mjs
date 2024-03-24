import { SolutionRank } from '../script/SolutionRank.mjs';
/**
 * Rank the suitability of the Shopify solution based on user preferences.
 */
export function rankShopifySolution(prefecences) {
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
        'Shopify',
        'Shopify je kompletní e-commerce platforma, která vám umožní začít, provozovat a spravovat obchod.',
    );

    solutionRank.pro('Velmi snadná nastavitelnost a použití.');
    solutionRank.pro('Zahrnuje hosting, SSL certifikát a základní bezpečnostní funkce.');
    solutionRank.pro('Rozsáhlý výběr témat a aplikací pro rozšíření funkčnosti.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'application', 'blog']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 50,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 500,
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 50, // With Shopify apps and some custom development
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */, // Shopify's monthly fee means typically low upfront costs
            possible: 15000 /* CZK */, // Custom themes or development might increase this
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */, // Including Shopify's monthly fees plus any app subscriptions
            possible: 300 /* CZK */, // On the lowest plan, without additional apps
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* days */, // Shopify stores can be set up very quickly with pre-made themes
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 30 /* % */ / 100,
            possible: 70 /* % */ / 100, // Shopify offers good control but not as much as a fully custom solution might
        },
    );

    return solutionRank.calculate();
}
