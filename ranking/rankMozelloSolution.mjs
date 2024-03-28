import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Mozello solution based on user preferences.
 */
export function rankMozelloSolution(preferences) {
    const {
        webType, // <- 'presentation', 'eshop', 'blog', 'application'
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront, // <- In CZK
        budgetPerMonth, // <- In CZK
        daysToDeadline,
        levelOfControl,
    } = preferences;

    const solutionRank = new SolutionRank(
        'Mozello',
        'Vytvořte snadno a rychle vizuálně přitažlivé webové stránky nebo online obchod s Mozello.',
    );

    solutionRank.pro('Jednoduché a intuitivní rozhraní pro rychlou tvorbu webových stránek.');
    solutionRank.con('Omezené možnosti přizpůsobení pro složité webové aplikace.');

    solutionRank.goodFor({ webType }, ['presentation', 'eshop', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 20,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 500, // Mozello supports up to 500 products ideally
        },
    );

    if (productsCount > 0) {
        solutionRank.note('Mozello poskytuje pohodlné řešení pro malé a střední eshopy s podporou až 500 produktů.');
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5,
        },
    );

    if (customFunctionsCount > 5) {
        solutionRank.bigCon('Nelze realizovat složité vlastní funkce nebo rozsáhlé API integrace.');
    } else {
        solutionRank.smallPro('Nabízí základní vlastní funkčnosti jako jsou formuláře a galerie.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 5000 /* CZK */,
            possible: 0 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 150 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 1 /* day */,
        },
    );

    solutionRank.smallPro('Rychlé zprovoznění webu díky předdefinovaným šablonám.');
    solutionRank.smallCon('Méně flexibilní při náročnějších projektových požadavcích.');

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 20 /* % */ / 100,
            possible: 70 /* % */ / 100,
        },
    );

    if (levelOfControl > 0.7) {
        solutionRank.bigCon(
            'Mozello nemusí být ideální volbou pro klienty vyžadující vysokou úroveň kontrolu nad designem.',
        );
    } else {
        solutionRank.smallPro('Vhodné pro klienty, kteří preferují jednoduchost před komplexností.');
    }

    solutionRank.pushBenefit(0.6274185528182088,'balancing');
return solutionRank.calculate();
}
