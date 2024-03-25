import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Instagram solution based on client preferences for Czech clients.
 */
export function rankInstagramSolution(preferences) {
    const {
        webType, // <- 'personalBrand', 'businessBrand', 'productShowcase', 'eventPromotion'
        followerCount,
        engagementRate, // <- in %, indicating the engagement level of followers
        contentFrequency, // <- posts per week
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        visualContentQuality, // <- in %, 100% being high-quality visuals
    } = preferences;

    const solutionRank = new SolutionRank(
        'Instagram pro marketing',
        'Využijte sílu vizuálního storytellingu a angažované komunity pro propagaci vaší značky.',
    );

    solutionRank.pro('Vysoký dosah a zapojení uživatelů.');
    solutionRank.pro('Ideální pro vizuálně orientované značky.');

    solutionRank.goodFor({ webType }, ['personalBrand', 'businessBrand', 'productShowcase']);
    solutionRank.badFor({ webType }, ['eventPromotion']);

    solutionRank.rankPrefecence(
        { followerCount },
        {
            ideal: 10000,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { engagementRate },
        {
            ideal: 5, // <- 5% and above is considered good
            possible: 1, // <- 1% is on the lower side but acceptable for large followings
        },
    );

    solutionRank.rankPrefecence(
        { contentFrequency },
        {
            ideal: 7, // <- Daily posts
            possible: 3, // <- At least three posts a week
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 10000 /* CZK for creating high-quality content and initial promotion */,
            possible: 2000 /* CZK minimum for basic content creation tools and promotion */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK for ongoing promotion and content creation */,
            possible: 1000 /* CZK for minimal promotion efforts */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days to create a strategy and start seeing engagement growth */,
            possible: 7 /* days for a quick setup and start */,
        },
    );

    solutionRank.rankPrefecence(
        { visualContentQuality },
        {
            ideal: 90 /* % - High-quality visuals */,
            possible: 50 /* % - Average quality but still acceptable */,
        },
    );

    return solutionRank.calculate();
}

/*
Advantages:
- High engagement and visibility for visually compelling brands.
- Ideal platform for targeting younger demographics with robust targeting options.
- Effective for establishing a brand's visual identity and increasing brand awareness.

Disadvantages:
- Less effective for web types focused on event promotion or non-visual content.
- Requires constant high-quality visual content, which may increase the cost of content production.
- Rapid changes in Instagram algorithms can affect visibility and engagement unpredictably.
- May require additional investment in Instagram ads to increase reach among new potential followers.
*/