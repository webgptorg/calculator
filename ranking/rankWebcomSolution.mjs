import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Web.com AI Website Builder solution based on user preferences.
 */
export function rankWebcomSolution(prefecences) {
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
        'Web.com AI Website Builder',
        'Vytvořte si svou webovou stránku snadno a rychle s AI website builderem od Web.com.',
    );

    solutionRank.pro('Snadné a rychlé nastavení webové stránky.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);
    solutionRank.neutralFor({ webType }, ['eshop']); // assuming Web.com AI builder supports e-shops, but not as strongly as the presentation sites or blogs

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 50,
        },
    );

    if (productsCount > 50) {
        solutionRank.note(
            'Pokud plánujete prodat více než 50 produktů, může být řešení Web.com méně vhodné. Rozhodněte se pro robustnější e-commerce řešení.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    if (customFunctionsCount > 5) {
        solutionRank.bigCon('Omezené možnosti přizpůsobení a potíže se specifickými funkcemi.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 15000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 50 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* days */,
            possible: 1 /* day */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 60 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.6) {
        solutionRank.bigCon('Nižší míra kontrolu nad vzhledem a funkcemi.');
    } else {
        solutionRank.smallPro(
            'Vhodné pro klienty, kteří potřebují rychle vytvořit webovou stránku bez potřeby hluboké personalizace.',
        );
    }

    solutionRank.balance({ fitAverage: -5.832927061091883, fitMin: -41, fitMax: 35.92838888888889 });

    return solutionRank.calculate();
}
