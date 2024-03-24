import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the LinkedIn solution for Czech clients based on their specific needs and preferences.
 */
export function rankLinkedinSolution(preferences) {
    const {} = preferences;

    const solutionRank = new SolutionRank(
        'LinkedIn Ads & Marketing Solutions',
        'Využijte profesionální síť LinkedIn k dosažení vašich marketingových a komunikačních cílů.',
    );

    solutionRank.pro('Cílení na profesionální uživatele.');
    solutionRank.pro('Hodí se pro B2B marketing.');

    // TODO: !!!! Regenerate

    return solutionRank.calculate();
}
