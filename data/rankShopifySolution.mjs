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
        'Využijte oblíbenou platformu pro tvorbu e-shopů s mnoha vestavěnými funkcemi.',
    );

    solutionRank.pro('Snadné použití bez nutnosti programování.');
    solutionRank.pro('Mnoho vestavěných funkcí a bezpečnostních prvků.');
    solutionRank.pro('Spolehlivý hosting a podpora jsou součástí.');

    solutionRank.con('Menší míra přizpůsobení designu a funkcí.');
    solutionRank.con('Vyšší provozní náklady v porovnání s open-source řešeními.');
    solutionRank.con('Omezení ve volbě platebních bran bez dalších poplatků.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 10000,
            possible: 50000,
        },
    );

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 100,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 10,
            possible: 50, // <- Via Apps or custom development
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.note(
            'Shopify umožňuje rozšiřování funkcí prostřednictvím aplikací z [Shopify App Store](https://apps.shopify.com/) nebo vlastního vývoje.',
        );
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 20000, /* CZK - with customization and setup */
            possible: 10000, /* CZK - minimal setup */
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000, /* CZK - with advanced plans and apps */
            possible: 500, /* CZK - basic plan */
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30, /* days */
            possible: 1, /* days - with ready themes */
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 40 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}