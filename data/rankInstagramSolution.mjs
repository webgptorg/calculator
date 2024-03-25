import { SolutionRank } from '../script/SolutionRank.mjs';

/**
 * Rank the suitability of the Instagram solution based on user preferences.
 */
export function rankInstagramSolution(prefecences) {
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
        'Instagram E-shop and Presentation',
        'Využijte sílu sociálních médií pro prezentaci vašeho obchodu a produktů.',
    );

    solutionRank.pro('Široké možnosti propagace a interakce se zákazníky.');

    solutionRank.goodFor({ webType }, ['eshop', 'presentation']);
    solutionRank.badFor({ webType }, ['blog', 'application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1, // Instagram, jako platforma, nepracuje s klasickým počtem stránek
            possible: 5, // Rekreačně lze uvažovat několik "highlight" sekcí
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 100,  // Při dobré organizaci lze na Instagramu využít obrázky a stories k prezentaci produktů
            possible: 1000, // Při intenzivním využívání může být přenos daleko větší
        },
    );

    if(productsCount > 1000) {
        solutionRank.note(
            'Pro velký počet produktů se doporučuje použít kombinaci s webovou stránkou nebo externím eshopem.',
        );
    }

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 5, // Limitované možnosti integrace a customizace mimo standardní funkce Instagramu
        },
    );

    if(customFunctionsCount > 5) {
        solutionRank.note(
            'Instagram nabízí omezené možnosti pro vlastní funkce. Pro složitější potřeby je vhodnější alternativní platforma.',
        );
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 0 /* CZK */,
            possible: 5000 /* CZK */ // Kvůli možným nákladům na grafiku a marketing
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 500 /* CZK */,
            possible: 5000 /* CZK */, // Pro reklamu a možné propagace na Instagramu
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 7 /* days */,
            possible: 1 /* day */, // Velmi rychlá nastavení profilu a zveřejnění obsahu
        },
    );

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 10 /* % */ / 100,
            possible: 40 /* % */ / 100, // Omezená kontrola nad designem a prezentací ve srovnání s klasickými webovými stránkami
        },
    );

    if(levelOfControl > 0.4) {
        solutionRank.note(
            'Instagram nabízí omezené možnosti customizace, pro vyšší kontrolu nad prezentací je potřeba zvážit jiné platformy.',
        );
    }

    return solutionRank.calculate();
}