import { SolutionRank } from '../script/SolutionRank.mjs';

export function rankCustomSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Vlastní řešení', 'Naprogramujte si vlastní řešení.');

    if (levelOfControl < 0.5) {
        solutionRank.pushBenefit(-1, 'Mnoho věcí budete muset řešit sami místo abyste se mohli věnovat svému byznysu');
    }

    if (daysToDeadline < 30) {
        solutionRank.pushBenefit(-2, 'Za tak krátkou dobu nestihnete vytvořit vlastní řešení');
    }

    return solutionRank;
}

export function rankWordpressSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank(
        'Self-hosted Wordpress',
        'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
    );

    if (customFunctionsCount < 5) {
        solutionRank.pushBenefit(1, 'Pro základní úkoly má WordPress velké množství pluginů');
    } else if (customFunctionsCount > 10) {
        solutionRank.pushBenefit(-1, 'Ve WordPressu budete muset pro každou vlastní funkci psát nebo hledat plugin');
    }

    if (pagesCount + productsCount > 5000) {
        solutionRank.pushBenefit(-1, 'WordPress není vhodný pro tak velké množství obsahu');
    }

    if (levelOfControl > 0.9) {
        solutionRank.pushBenefit(-0.5, 'Pokud chcete mít dokonalou kontrolu, není WordPress nejlepší volba');
    }

    if (daysToDeadline < 7) {
        solutionRank.pushBenefit(-0.5, 'Za týden nestihnete vytvořit web na WordPressu');
    }

    return solutionRank;

    /*
        !!! pros: ['Nejrozšířenější open-source CMS na světě', 'Mnoho šablon a pluginů'],
        !!! cons: ['Potřeba spravovat hosting', 'Potřeba spravovat aktualizace'],
        */
}

export function rankWebgptSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('WebGPT', 'Vygenerujte si web pomocí WebGPT za 3 minuty.');

    return solutionRank;
}

export function rankWebflowSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('', '');

    return solutionRank;
}

export function rankWixSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Wix', 'Jednoduchý webový builder pro vytvoření webu bez programování.');

    return solutionRank;
}

export function rankSolidpixelsSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('', '');

    return solutionRank;
}

export function rankShopifySolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Shopify', 'Vytvořte si svůj e-shop pomocí Shopify.');

    return solutionRank;
}

export function rankShoptetSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('ShopTet', 'Český systém pro vytvoření e-shopu.');

    return solutionRank;
}

export function rankLinktreeSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Linktr.ee', 'Pro vytvoření jednoduchého webu/rozcestníku s odkazy.');

    if (pagesCount > 1) {
        solutionRank.pushBenefit(-3, 'Vhodné pouze pro jednostránkové rozcestníky s odkazy');
    }

    if (levelOfControl > 0.3) {
        solutionRank.pushBenefit(-3, 'Velmi málo možností úprav');
    }

    return solutionRank;
}

export function rankFacebookSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Facebook profil', 'Nemějte web, ale jen Facebook profil.');

    if (levelOfControl > 0.2) {
        solutionRank.pushBenefit(-3, 'Velmi omezená vlastní kontrola');
    }

    return solutionRank;
}

export function rankLinkedinSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('LinkedIn profil', 'Nemějte web, ale jen LinkedIn profil.');

    if (levelOfControl > 0.2) {
        solutionRank.pushBenefit(-3, 'Velmi omezená vlastní kontrola');
    }

    return solutionRank;
}

export function rankInstagramSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('Instagram profil', 'Nemějte web, ale jen Instagram profil.');

    if (levelOfControl > 0.2) {
        solutionRank.pushBenefit(-3, 'Velmi omezená vlastní kontrola');
    }

    return solutionRank;
}

export function rankChatgptSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank('ChatGPT', 'Vygenerujte si web pomocí ChatGPT.');

    solutionRank.pushBenefit(-0.5, 'Pomocí ChatGPT bez dalších znalostí vytvoříte pouze limitovaný web');

    return solutionRank;
}

/**
 * TODO: !!! Split into multiple files
 */
