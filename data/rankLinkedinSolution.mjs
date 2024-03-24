import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the LinkedIn solution for Czech clients based on their specific needs and preferences.
 */
export function rankLinkedinSolution(preferences) {
    const {
        audienceTargeting, // <- 'B2B', 'B2C', 'both'
        contentComplexity, // <- 'simple', 'moderate', 'complex'
        marketingBudget, // <- In CZK
        campaignDuration, // <- In days
        engagementGoals, // <- Number of desired interactions
        languageSupport, // <- Boolean, Czech language needed
        expectedROI, // <- ROE in CZK for the campaign
    } = preferences;

    const solutionRank = new SolutionRank(
        'LinkedIn Ads & Marketing Solutions',
        'Využijte profesionální síť LinkedIn k dosažení vašich marketingových a komunikačních cílů.',
    );

    solutionRank.pro('Cílení na profesionální uživatele.');
    solutionRank.pro('Hodí se pro B2B marketing.');

    solutionRank.goodFor({ audienceTargeting }, ['B2B', 'both']);
    solutionRank.badFor({ audienceTargeting }, ['B2C']);

    solutionRank.rankPrefecence(
        { contentComplexity },
        {
            ideal: 'moderate',
            possible: 'complex',
        },
    );

    solutionRank.rankPrefecence(
        { marketingBudget },
        {
            ideal: 50000 /* CZK */,
            possible: 10000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { campaignDuration },
        {
            ideal: 60 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { engagementGoals },
        {
            ideal: 500 /* interactions */,
            possible: 50 /* interactions */,
        },
    );

    if (!languageSupport) {
        solutionRank.con('LinkedIn má omezenou podporu pro český jazyk v některých funkcích.');
    }

    solutionRank.rankPrefecence(
        { expectedROI },
        {
            ideal: 100000 /* CZK */,
            possible: 20000 /* CZK */,
        },
    );

    return solutionRank.calculate();
}
