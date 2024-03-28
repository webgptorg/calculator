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

    const solutionRank = new SolutionRank(
        'Custom Solutions',
        'Vytvoření webových stránek od základu podle specifických požadavků klienta.',
    );

    solutionRank.bigPro('Naprostá flexibilita a kontrola nad designem a funkcionalitou.');
    solutionRank.bigCon('Vysoké náklady na vývoj a údržbu.');

    solutionRank.pro('Lze plně přizpůsobit všechny aspekty webu.');
    solutionRank.con('Vyžaduje větší časovou investici pro vývoj.');

    solutionRank.goodFor({ webType }, ['application', 'eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 10,
            possible: 100,
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
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 100000 /* CZK */,
            possible: 50000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */,
            possible: 1000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 180 /* days */,
            possible: 30 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 100 /* % */ / 100,
            possible: 80 /* % */ / 100,
        },
    );

    solutionRank.smallPro('Plně vlastní vzhled a specifické funkcionality.');
    solutionRank.smallCon('Vyšší riziko bezpečnostních chyb bez poskytování pravidelné údržby.');

    solutionRank.pushBenefit(-1.5897524114487391,'balancing');
return solutionRank.calculate();
}
