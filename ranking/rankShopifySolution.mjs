import { SolutionRank } from '../src/SolutionRank.mjs';

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
        'Shopify je přední e-commerce platforma, která umožňuje jednoduše vytvořit profesionální online obchod bez potřeby pokročilých technických znalostí.',
    );

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog', 'application']);

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
            ideal: 50,
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 5,
            possible: 20,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 10000 /* CZK */,
            possible: 3000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000 /* CZK */,
            possible: 300 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 70 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.pro('Snadná integrace s mnoha platebními bránami.');
    solutionRank.con('Messy for small-scale shops due to the plethora of features.');

    solutionRank.bigPro('Robustní e-commerce funkce "out-of-the-box".');
    solutionRank.bigCon('Omezená možnost zákaznického přizpůsobení bez placených aplikací.');

    solutionRank.smallPro('Vynikající zákaznická podpora.');
    solutionRank.smallCon('Měsíční poplatky mohou být vysoké s rostoucím počtem aplikací.');

    return solutionRank.calculate();
}
