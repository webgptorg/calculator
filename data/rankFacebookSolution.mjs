import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Facebook solution based on user preferences for Czech clients.
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
        'Facebook pro firmy',
        'Využijte možností, které nabízí Facebook pro firmy k rychlému spuštění a propagaci Vašeho webu.',
    );

    solutionRank.pro('Snadné nasazení a rychlý start.');
    solutionRank.pro('Široké možnosti propagace.');
    
    solutionRank.bigCon('Nedostatečná úroveň kontrolního přizpůsobení pro komplexnější weby.');
    solutionRank.smallCon('Omezené možnosti vlastních funkcí.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 15,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50, // <- Prodej přes Facebook Marketplace nebo stránku
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Facebook Marketplace nabízí možnosti pro prodej produktů bez nutnosti vlastního eshopu.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // <- Omezené na funkce podporované Facebookem
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */, // <- Velmi nízké náklady na zahájení
            possible: 5000 /* CZK */, // <- V rámci propagace a reklamy
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */, // <- Bez nutnosti měsíčních poplatků
            possible: 10000 /* CZK */, // <- Závisí na rozpočtu na reklamu
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 /* % */ / 100,
            possible: 40 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}