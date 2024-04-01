import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Site123 solution based on user preferences.
 */
export function rankSite123Solution(prefecences) {
    const {
        webType, // <- Type of the web being built
        pagesCount, // <- Number of static pages on the web
        productsCount, // <- Number of products to be sold on the web
        customFunctionsCount, // <- Number of custom functions needed on the web
        budgetUpfront, // <- Budget for the web upfront in CZK
        budgetPerMonth, // <- Budget for the web per month in CZK
        daysToDeadline, // <- Number of days to the deadline
        levelOfControl, // <- Level of control the client wants over the web
    } = prefecences;

    const solutionRank = new SolutionRank(
        'Site123',
        'Beginner-friendly website builder for quickly creating simple websites.',
    );

    solutionRank.pro('Velmi jednoduché rozhraní vhodné pro úplné začátečníky.');
    solutionRank.con('Omezené možnosti přizpůsobení a rozšíření.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.smallPro('Includes basic eCommerce functionalities.');
    solutionRank.smallCon('eCommerce functionalities are basic and might not suit all needs.');

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 10, // ideal for small to medium sites
            possible: 50, // can handle up to this but might get cumbersome
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0, // Ideal for sites without ecommerce
            possible: 100, // Can handle some products but not extensive ecommerce needs
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0, // Not ideal for custom functions
            possible: 5, // Can handle few custom elements but with limitations
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0, // Great for very low upfront budgets
            possible: 5000, // Reasonable for some upfront investment
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500, // Ideal for moderate monthly budgets
            possible: 200, // Can be sufficient for lower tier options
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7, // Fast to deploy
            possible: 1, // Can be set up really quickly if needed
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 / 100, // Suitable for clients with need for low control
            possible: 40 / 100, // Can accommodate some level of customization
        },
    );

    

    solutionRank.balance({"fitAverage":-10.674358222205464,"fitMin":-132,"fitMax":106.41});

    return solutionRank.calculate();
}
