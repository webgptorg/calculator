import { SolutionRank } from '../script/SolutionRank.mjs';
/**
 * Rank the suitability of the Webflow solution based on user preferences.
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
        'Použijte Webflow pro vizuálně orientované designy a bez nutnosti psát kód.',
    );

    solutionRank.pro('Umožňuje rychlý vývoj bez potřeby psát kód.');
    solutionRank.pro('Intuitivní drag-and-drop rozhraní.');
    solutionRank.pro('Výborná volba pro vizuální marketing a prezentace.');

    solutionRank.con('Omezenější možnosti přizpůsobení bez znalostí HTML/CSS.');
    solutionRank.con('Může být dražší než některé další alternativy v závislosti na rozsahu projektu.');
    solutionRank.con('Eshop a pokročilé funkce mohou vyžadovat dražší plány.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

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
            possible: 200, // <- With Ecommerce plans
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Webflow nabízí speciální plány pro E-commerce, které je možné využít k vytvoření eshopu.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10, // <- With custom code embedding
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.note(
            'Umožňuje vkládání vlastního kódu pro rozšíření funkcionalit, avšak vyžaduje zkušenosti s HTML/CSS a JavaScriptem.',
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
            possible: 500 /* CZK */,
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
            ideal: 30 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
