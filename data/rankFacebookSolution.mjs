import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Facebook solution based on user preferences for Czech clients.
 */
export function rankFacebookSolution(prefecences) {
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
        'Facebook pro firmy',
        'Využijte sílu největší sociální sítě na světě pro propagaci vaší firmy.',
    );

    solutionRank.pro('Silná platforma pro propagaci a komunitní engagement.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1, // Facebook page acts as a single "page"
            possible: 1, // Limited to one, but can have multiple sections
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 50, // Ideal number of products for a Facebook shop
            possible: 200, // Can handle more but becomes less manageable
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Facebook provides some customization, but it's limited
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */, // No upfront cost for setting up a Facebook page
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */, // Ideal for ads and promotions
            possible: 0 /* CZK */, // No mandatory monthly fees, but promotions cost
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 1 /* day */, // Fast to set up
            possible: 7 /* days */, // Including time for creating content and initial setup
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100, // Lower level of control due to platform constraints
            possible: 40 /* % */ / 100,
        },
    );

    solutionRank.con(
        'Omezená možnost přizpůsobení a nízká úroveň kontroly nad platformou.'
    );

    solutionRank.note(
        'Ideální pro malé podniky a podnikatele, kteří chtějí rychle vstoupit na trh bez velkých investic do webového vývoje.'
    );

    return solutionRank.calculate();
}