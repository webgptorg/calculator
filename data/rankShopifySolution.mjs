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
        'Shopify poskytuje kompletní řešení pro e-shopy s možností snadného rozšiřování funkcí skrze aplikace.',
    );

    solutionRank.pro('Ideální řešení pro rychlé spuštění e-shopu.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'application', 'blog']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 100,
            possible: 1000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 50,
            possible: 5000,
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Shopify je vyvinut speciálně pro potřeby e-commerce, a proto poskytuje optimalizované nástroje pro prodej produktů.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20,
        },
    );

    if(customFunctionsCount > 0) {
        solutionRank.note(
            'Pro přidání vlastních funkcí je možné využít Shopify App Store nebo speciální vývojářské práce, které mohou vyžadovat zvýšený rozpočet.',
        );
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 20000 /* CZK */,
            possible: 5000 /* CZK */,
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
            ideal: 50 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    solutionRank.smallCon('Omezenější úprava designu pro vyšší úroveň kontroly.');
    solutionRank.bigPro('Rychlé řešení pro spuštění e-shopu bez potřeby technických znalostí.');
    solutionRank.smallCon('Měsíční poplatky mohou být významnější s růstem e-shopu.');

    return solutionRank.calculate();
}