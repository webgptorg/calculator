import { spaceTrim } from 'https://cdn.jsdelivr.net/npm/spacetrim@0.11.4/+esm';
import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Wordpress.com Hosted solution based on user preferences.
 */
export function rankWordpresscomSolution(prefecences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank(
        'Wordpress.com',
        'Hostovaná verze Wordpress pro snazší správu webu bez znalosti programování.',
    );

    // General pros and cons for Wordpress.com as a Hosted solution
    solutionRank.bigPro('Rychlý start bez technických znalostí');
    solutionRank.bigCon('Nižší úroveň přizpůsobení oproti WordPressu na vlastním serveru');

    solutionRank.pro('Automatické aktualizace a zálohy');
    solutionRank.con('Měsíční náklady mohou růst s rozšiřujícími se potřebami webu');

    // Advantages and disadvantages specifically tied to user preferences

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    // Eshop is possible with Business and eCommerce plans
    if (webType === 'eshop') {
        solutionRank.smallPro('Plán Ecommerce umožňuje plně funkční Eshop');
    } else {
        solutionRank.smallCon('Pro pokročilé Eshop funkce je nutný dražší plán');
    }

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
            possible: 5000, // Eshop plan supports up to this amount
        },
    );

    if (customFunctionsCount > 0 || webType === 'application' || levelOfControl > 0.5) {
        // TODO: Add here link
        solutionRank.note(
            spaceTrim(`
                Pokud uvažujete vlastní funkce a větší kontrolu, hostujte si Wordpress sami
                Wordpress.com je řešení s jednodušší správou, ale s omezenými možnostmi úprav.
            `),
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 2,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 50000 /* CZK */,
            possible: 1000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 3000 /* CZK */, // Ecommerce plan can touch this limit
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 80,
            possible: 7,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 40 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    solutionRank.balance({ fitAverage: 24.747503183167954, fitMin: -128.5262261728395, fitMax: 124.5314057410588 });

    return solutionRank.calculate();
}
