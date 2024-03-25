import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Custom solution based on user preferences.
 */
export function rankCustomSolution(preferences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Vlastní řešení',
        'Nabízíme 100% přizpůsobitelné řešení s nejvyšší flexibilitou a kontrolou.',
    );

    solutionRank.pro('100% přizpůsobitelné řešení.');
    
    solutionRank.goodFor({ webType }, ['application', 'eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog']);

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
            ideal: 500,
            possible: 10000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 50,
            possible: 100,
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
            ideal: 10000 /* CZK */,
            possible: 2000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 180 /* days */,
            possible: 60 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 100 /* % */ / 100,
            possible: 90 /* % */ / 100,
        },
    );

    if (webType === 'application' || webType === 'eshop') {
        solutionRank.bigPro('Ideální pro složité projekty s vysokou mírou přizpůsobení.');
        solutionRank.note('Pro projekty typu aplikace a e-shop nabízíme rozsáhlé možnosti integrace a automatizace.');
    }

    if (daysToDeadline < 60) {
        solutionRank.bigCon('Není ideální pro projekty s krátkým deadline.');
    }

    if (budgetUpfront < 50000) {
        solutionRank.bigCon('Vyžaduje vyšší počáteční investici.');
    }

    if (levelOfControl < 0.9) {
        solutionRank.smallCon('Může být příliš komplexní pro klienty s nižšími nároky na úroveň kontroly.');
    }

    return solutionRank.calculate();
}