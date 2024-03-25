import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the LinkedIn solution based on user preferences.
 */
export function rankLinkedinSolution(prefecences) {
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
        'LinkedIn Profinder',
        'Využijte platformu LinkedIn k nalezení profesionálů ve vaší oblasti pro vývoj webu.',
    );

    solutionRank.note('LinkedIn Profinder pomáhá klientům najít správné odborníky k realizaci jejich projektů webu.');
    
    solutionRank.badFor({webType}, ['eshop', 'application']);
    solutionRank.goodFor({webType}, ['presentation', 'blog']);

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
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 50000 /* CZK */,
            possible: 10000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 0 /* CZK */,
            possible: 1000 /* CZK */,
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
            ideal: 70 /* % */ / 100,
            possible: 90 /* % */ / 100,
        },
    );

    solutionRank.smallPro('Snadné nalezení kvalifikovaných odborníků.');
    solutionRank.smallCon('Není ideální pro složité webové aplikace nebo eshopy.');
    solutionRank.bigPro('Přímá komunikace a spolupráce s freelancery a agenturami.');
    solutionRank.bigCon('Vyšší upfrontové náklady v porovnání s DIY řešeními.');
    
    return solutionRank.calculate();
}