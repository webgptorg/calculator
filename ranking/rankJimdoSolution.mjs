import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Jimdo solution based on user preferences.
 */
export function rankJimdoSolution(prefecences) {
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
        'Jimdo',
        'Jednoduchý nástroj pro tvorbu webových stránek se spoustou šablon.',
    );

    solutionRank.pro('Velmi uživatelsky přívětivý.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

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

    if (productsCount > 0) {
        solutionRank.note('Jimdo umožňuje snadnou integraci e-shopu, ale je optimální pro menší obchody.');
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 10,
        },
    );

    if (customFunctionsCount > 0) {
        solutionRank.con('Omezené možnosti pro vlastní funkcionalitu ve srovnání s konkurencí.');
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
            ideal: 200 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* days */,
            possible: 30 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.5) {
        solutionRank.con('Jimdo nemusí poskytovat dostatečnou úroveň kontroly pro některé klienty.');
    }

    solutionRank.bigPro('Rychlá implementace webových stránek.');
    solutionRank.bigCon('Nevhodné pro složité aplikace a webové stránky s vysokou mírou customizace.');

    

    solutionRank.balance(155.46401006147218);

    return solutionRank.calculate();
}
