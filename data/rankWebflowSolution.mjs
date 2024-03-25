import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Webflow solution based on user preferences for Czech clients.
 */
export function rankWebflowSolution(prefecences) {
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
        'Webflow',
        'Webflow nabízí vizuální editaci pro tvorbu respondzivních webových stránek bez nutnosti kódování.',
    );

    solutionRank.pro('Nenáročné na technické dovednosti díky vizuálnímu editoru.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'application']);
    solutionRank.badFor({ webType }, ['eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 100,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 100, // <- Webflow Ecommerce plans
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Webflow Ecommerce umožňuje integraci prodeje produktů, ale je více vhodný pro menší obchody.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 20,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 15000 /* CZK */,
            possible: 3000 /* CZK */,
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
            ideal: 60 /* days */,
            possible: 14 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 70 /* % */ / 100,
            possible: 90 /* % */ / 100,
        },
    );

    solutionRank.con('Omezení ve funkcionality pro velké eshopy.');
    solutionRank.smallCon('Vyšší měsíční náklady v porovnání s některými hostovanými řešeními.');
    solutionRank.smallPro('Rychlé prototypování a zaměření na design bez nutnosti kódování.');

    return solutionRank.calculate();
}