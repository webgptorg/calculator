import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Linktree solution based on user preferences for Czech clients.
 */
export function rankLinktreeSolution(preferences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        linksCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Linktr.ee',
        'Jednoduchá platforma pro sdílení více odkazů na sociálních sítích nebo v emailovejch podpisech.',
    );

    solutionRank.pro('Rychlá a snadná instalace.');
    solutionRank.pro('Ideální pro influencery, malé podniky a tvůrce obsahu.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['eshop', 'application']);

    solutionRank.rankPrefecence(
        { linksCount },
        {
            ideal: 5,
            possible: 20,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 2000 /* CZK */,
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
            ideal: 1 /* day */,
            possible: 3 /* days */,
        },
    );

    solutionRank.con('Omezení vlastního brandingu bez placené verze.');
    solutionRank.con('Nemožnost přidat custom funkce nebo složité webové struktury.');
    solutionRank.con('Neoptimální pro robustní eshopy nebo aplikace.');

    return solutionRank.calculate();
}
