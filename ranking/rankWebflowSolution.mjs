import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Webflow solution based on user preferences.
 */
export function rankWebflowSolution(preferences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Webflow',
        'Pokročilý nástroj pro tvorbu webových stránek s vizuálním editorom na webflow.com.',
    );

    solutionRank.bigPro('Umožňuje rychlou a flexibilní tvorbu webových stránek bez kódování.');
    solutionRank.bigCon('Vyšší měsíční náklady v porovnání s hostovanými řešeními.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog', 'application']);
    solutionRank.badFor({ webType }, ['eshop']);

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
            ideal: 0,
            possible: 300,
        },
    );

    if (productsCount > 0) {
        solutionRank.note('I když Webflow podporuje e-shopy, pro velký počet produktů může být cenově nevýhodný.');
    }

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
            ideal: 20000 /* CZK */,
            possible: 50000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 1500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 90 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    solutionRank.pro('Webflow nabízí detailní kontrolu nad designem.');
    solutionRank.con('Přechod na jinou platformu může být komplikovaný.');

    solutionRank.smallPro('Obsahuje hosting v ceně předplatného.');
    solutionRank.smallCon('Může vyžadovat čas na učení kvůli bohatému rozhraní a funkcím.');

    

    solutionRank.balance({"fitAverage":43.87173469885308,"fitMin":-129.18333333333334,"fitMax":106.18384347826088});

    return solutionRank.calculate();
}
