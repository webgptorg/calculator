import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the LinkedIn solution based on user preferences.
 */
export function rankLinkedinSolution(prefecences) {
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
        'LinkedIn jako webová prezentace',
        'Využijte svůj LinkedIn profil nebo stránku jako primární webovou prezentaci vaší firmy nebo osobní značky.',
    );

    solutionRank.pro('Snadná a rychlá implementace bez nutnosti technických znalostí.');

    solutionRank.con('Omezený rozsah přizpůsobení a kontrola nad designem.');

    solutionRank.goodFor({ webType }, ['presentation']);
    solutionRank.badFor({ webType }, ['eshop', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1,
            possible: 10,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 0,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 0,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */,
            possible: 5000 /* CZK */, // Pro potenciální platbu za premium služby LinkedIn
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
            ideal: 0 /* % */,
            possible: 10 /* % */,
        },
    );

    solutionRank.bigPro('Nulové náklady na vývoj a hostování webu.');

    solutionRank.bigCon('Velmi omezené SEO možnosti a nízká kontrola nad uživatelskou zkušeností.');

    solutionRank.smallPro('Vysoká míra důvěry a profesionality spojené s platformou LinkedIn.');

    solutionRank.smallCon('Riziko ztráty dat nebo omezení funkcionality při změnách politik LinkedIn.');

    solutionRank.balance({ fitAverage: -59.13990937007965, fitMin: -125.05, fitMax: 120 });

    return solutionRank.calculate();
}
