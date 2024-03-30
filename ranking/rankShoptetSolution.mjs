import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the Shoptet solution based on user preferences.
 */
export function rankShoptetSolution(prefecences) {
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
        'Shoptet',
        'Řešení na míru pro vaše e-commerce potřeby s velkou podporou a širokou škálou funkcí.',
    );

    solutionRank.pro('Kompletní e-commerce řešení se širokou škálou funkcí.');

    solutionRank.goodFor({ webType }, ['eshop']);
    solutionRank.badFor({ webType }, ['presentation', 'blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 50,
            possible: 500,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 500,
            possible: 5000,
        },
    );

    if (productsCount > 0) {
        solutionRank.note(
            'Shoptet nabízí pokročilé funkce pro správu produktů a objednávek, což z něj dělá ideální platformu pro e-shopy.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 10,
            possible: 50,
        },
    );

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 20000 /* CZK */,
            possible: 5000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 2000 /* CZK */,
            possible: 500 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 30 /* days */,
            possible: 7 /* days */,
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 70 /* % */ / 100,
            possible: 50 /* % */ / 100,
        },
    );

    if (webType !== 'eshop') {
        solutionRank.bigCon(
            'Nejlepší využití Shoptetu je pro e-shop, pro jiné typy webů může být příliš specifické nebo omezené.',
        );
    }

    if (budgetPerMonth < 500) {
        solutionRank.con(
            'Na nízkém měsíčním rozpočtu nemusí Shoptet nabídnout všechny požadované funkce nebo podporu.',
        );
    }

    if (levelOfControl > 70 / 100) {
        solutionRank.smallCon('Vyšší požadavky na kontrolu nad designem mohou být v Shoptetu obtížně splnitelné.');
    }

    solutionRank.balance({ fitAverage: -56.72081654758352, fitMin: -136.44583333333335, fitMax: 125.64913206601787 });

    return solutionRank.calculate();
}
