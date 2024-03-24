
import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Instagram solution for promoting or operating within the Czech market.
 */
export function rankInstagramSolution(preferences) {
    const {
        contentFrequency, // <- Number of posts per week
        followersTarget, // <- Target number of followers
        engagementRateTarget, // <- Target engagement rate (%)
        budgetForAds, // <- Budget for ads in CZK
        typeOfContent, // <- 'image', 'video', 'story'
        productsCount, // <- Relevant for businesses
    } = preferences;

    const solutionRank = new SolutionRank(
        'Instagram Pro Český Trh',
        'Staňte se viditelní na jedné z nejpopulárnějších sociálních platforem s vizuálně atraktivním obsahem.',
    );

    solutionRank.pro('Vysoká angažovanost u cílové skupiny.');
    solutionRank.pro('Vizuálně zaměřený obsah s vysokým dosahem.');
    solutionRank.con('Potřebuje kvalitní vizuální obsah a pravidelnou údržbu.');
    solutionRank.con('Konkurenční prostředí může být náročné.');

    solutionRank.goodFor({ typeOfContent }, ['image', 'video', 'story']);
    solutionRank.badFor({ typeOfContent }, []);

    solutionRank.rankPrefecence(
        { contentFrequency },
        {
            ideal: 7, // <- Ideal posting once a day
            possible: 3, // <- Minimal suggestion is thrice a week
        },
    );

    solutionRank.rankPrefecence(
        { followersTarget },
        {
            ideal: 10000,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { engagementRateTarget },
        {
            ideal: 5 /* % */,
            possible: 1 /* % */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetForAds },
        {
            ideal: 10000 /* CZK */,
            possible: 1000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 50, // Good for showcasing a variety of products
            possible: 1, // At least one product to showcase
        },
    );

    return solutionRank.calculate();
}
