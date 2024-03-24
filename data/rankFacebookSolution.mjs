import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Facebook solution for building a Czech client's web presence.
 */
export function rankFacebookSolution(preferences) {
    const {
        webType, // 'presentation', 'eshop', 'blog', 'application'
        // !!! followersCount,
        // !!! engagementRate,
        budgetUpfront, // In CZK
        budgetPerMonth, // For ads and maintenance, in CZK
        daysToDeadline,
        levelOfControl, // Level of control over content and presentation
    } = preferences;

    const solutionRank = new SolutionRank(
        'Facebook Business Page',
        'Vytvořte si prezentaci své firmy na Facebooku pro snadné sdílení obsahu a interakci s vašimi zákazníky.',
    );

    solutionRank.pro('Snadné sdílení obsahu a interakce s klienty.');
    solutionRank.pro('Žádné náklady na start - vytvoření stránky je zdarma.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 10000 /* CZK */, // Ideal for ads to kickstart
            possible: 0 /* CZK */, // It's possible to start without any budget
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */, // Ideal for ongoing ads and content creation
            possible: 1000 /* CZK */, // Minimal budget for some visibility
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
            possible: 80 /* % */ / 100,
        },
    );

    solutionRank.con('Omezená kontrola nad vzhledem a funkcemi.');
    solutionRank.con('Závislost na politice a změnách platformy Facebook.');
    solutionRank.con('Potřeba platit za reklamu pro zajištění viditelnosti.');

    return solutionRank.calculate();
}
