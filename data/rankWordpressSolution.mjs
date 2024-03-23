import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the WordPress solution based on user preferences.
 */
export function rankWordpressSolution(prefecences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        // [🆙]  updatesDaysPeriod,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank(
        'Self-hosted WordPress',
        'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
    );

    solutionRank.pro('Nejrozšířenější open-source CMS na světě.');

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application', 'eshop']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1000,
            possible: 10000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 1000, // <- With some plugins like WooCommerce
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Existují pluginy jako [WooCommerce](https://wordpress.org/plugins/woocommerce/), které umožňují vytvořit eshop na WordPressu.',
        );
    }

    /*
    // [🆙] 
    solutionRank.rankPrefecence(
        { updatesDaysPeriod },
        {
            ideal: /* Update per * / 30 /* days * /,
            possible: /* Update per * / 90 /* days * /,
        },
    );
    */

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 30,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 30000 /* CZK */,
            possible: 7000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 1000 /* CZK */,
            possible: 100 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 90 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 40 /* % */ / 100,
            possible: 60 /* % */ / 100,
        },
    );

    return solutionRank.calculate();
}
