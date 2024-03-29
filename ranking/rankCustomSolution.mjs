import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Custom solution based on user preferences.
 */
export function rankCustomSolution(prefecences) {
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

    const solutionRank = new SolutionRank('Vlastní řešení', 'Zce');

    // TODO: Maybe put to some reusable util
    let completityLevel = 'lowpage'; // <- 'lowpage', 'highpage', 'dynamic', 'complex'

    if (pagesCount + productsCount > 10) {
        completityLevel = 'highpage';
    } else if (['blog'].includes(webType) || pagesCount + productsCount > 100) {
        completityLevel = 'dynamic';
    } else if (['eshop', 'application'].includes(webType) || customFunctionsCount > 0) {
        completityLevel = 'complex';
    }

    if (completityLevel !== 'lowpage') {
        solutionRank.note('Zvažte využití frameworků a knihoven pro zrychlení vývoje.');
    } else {
        solutionRank.note('Zvažte využit statické generátory pro zrychlení vývoje.');
    }

    solutionRank.bigPro('Naprostá flexibilita a kontrola nad designem a funkcionalitou.');
    solutionRank.bigCon('Vysoké náklady na vývoj a údržbu.');

    /*
    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 10,
            possible: 100,
        },
    );
    */

    /*
    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 50,
            possible: 5000,
        },
    );
    */

    /*
    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 5,
            possible: 50,
        },
    );
    */

    if (completityLevel === 'lowpage') {
        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 20000 /* CZK */,
                possible: 1000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 120 /* CZK */,
                possible: 25 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { daysToDeadline },
            {
                ideal: 60 /* days */,
                possible: 7 /* days */,
            },
        );
    } else if (completityLevel === 'highpage') {
        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 80000 /* CZK */,
                possible: 30000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 1000 /* CZK */,
                possible: 200 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { daysToDeadline },
            {
                ideal: 90 /* days */,
                possible: 14 /* days */,
            },
        );
    }

    if (completityLevel === 'dynamic') {
        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 120000 /* CZK */,
                possible: 50000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 1000 /* CZK */,
                possible: 200 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { daysToDeadline },
            {
                ideal: 120 /* days */,
                possible: 30 /* days */,
            },
        );
    }

    if (completityLevel === 'complex') {
        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 2000000 /* CZK */,
                possible: 300000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 50000 /* CZK */,
                possible: 2000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { daysToDeadline },
            {
                ideal: 300 /* days */,
                possible: 90 /* days */,
            },
        );
    }

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 70 /* % */ / 100,
            possible: 100 /* % */ / 100,
        },
    );

    

    solutionRank.balance({"fitAverage":-8.991188397043153,"fitMin":-20,"fitMax":14.830902823078862});

    return solutionRank.calculate();
}
