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

    let complexity = pagesCount * 0.1 + productsCount * 0.2 + customFunctionsCount * 0.3;
    let budgetRating = (budgetUpfront + budgetPerMonth * 12) / complexity;
    let timeConstraintRating = daysToDeadline / complexity;

    if (levelOfControl < 0.5) {
        solutionRank.pushBenefit(-1, 'Mnoho věcí budete muset řešit sami místo abyste se mohli věnovat svému byznysu');
    }

    if (daysToDeadline < 30) {
        solutionRank.pushBenefit(-2, 'Za tak krátkou dobu nestihnete vytvořit vlastní řešení');
    }

    if (updatesDaysPeriod > 30) {
        solutionRank.pushBenefit(-1, 'Delší doby mezi aktualizacemi zvýšují riziko bezpečnostních hrozeb');
    }

    if (budgetRating < 1) {
        solutionRank.pushBenefit(-2, 'Použitý rozpočet není dostatečný pro požadovanou složitost');
    } else {
        solutionRank.pushBenefit(1, 'Dostatečný rozpočet pro realizaci vlastního řešení');
    }

    if (timeConstraintRating < 1) {
        solutionRank.pushBenefit(-2, 'Nedostatečný čas na vývoj vzhledem k požadované složitosti');
    } else {
        solutionRank.pushBenefit(1, 'Dostatečný čas na vývoj');
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
        'Self-hosted WordPress',
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

    if (budgetPerMonth / (pagesCount + productsCount + customFunctionsCount) < 5) {
        solutionRank.pushBenefit(-1, 'Rozpočet na měsíční údržbu není dostatečný pro očekávaný počet stránek a funkcí');
    }

    if (updatesDaysPeriod > 60) {
        solutionRank.pushBenefit(-1, 'WordPress vyžaduje časté aktualizace pro udržení bezpečnosti');
    }

    return solutionRank;
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

    if (webType !== 'static') {
        solutionRank.pushBenefit(-2, 'WebGPT je ideální pro statické stránky');
    }

    if (customFunctionsCount > 3) {
        solutionRank.pushBenefit(-2, 'WebGPT může mít omezené možnosti pro složité funkce');
    }

    if (daysToDeadline >= 3 && daysToDeadline <= 14) {
        solutionRank.pushBenefit(2, 'Ideální pro rychlé projektové nasazení s kratší deadline');
    }

    if (budgetUpfront < 500) {
        solutionRank.pushBenefit(1, 'Nízké náklady na zahájení jsou vhodné pro menší rozpočty');
    }

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
    const solutionRank = new SolutionRank('Webflow', 'Vytvořte si profesionalní web bez nutnosti programovat.');

    if (webType === 'eCommerce' && productsCount <= 1000) {
        solutionRank.pushBenefit(2, 'Webflow nabízí silné nástroje pro e-commerce do 1000 produktů');
    } else if (productsCount > 1000) {
        solutionRank.pushBenefit(-2, 'Pro více než 1000 produktů již Webflow nemusí být dostatečně efektivní');
    }

    if (customFunctionsCount > 5) {
        solutionRank.pushBenefit(-1, 'Přidání složitějších funkcí může být v Webflow výzvou');
    }

    if (daysToDeadline < 14) {
        solutionRank.pushBenefit(-1, 'Pro kvalitní web na Webflow je potřeba více než dva týdny');
    }

    if (budgetUpfront >= 1000 && budgetPerMonth >= 50) {
        solutionRank.pushBenefit(2, 'Rozpočet je dostatečný pro vytvoření kvalitního webu na Webflow');
    } else {
        solutionRank.pushBenefit(-2, 'Nedostatečný rozpočet pro požadavky vytvoření webu na Webflow');
    }

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

    if (pagesCount <= 20 && productsCount <= 50) {
        solutionRank.pushBenefit(1, 'Ideální pro menší weby a projekty');
    } else {
        solutionRank.pushBenefit(-2, 'Pro větší projekty Wix nemusí být nejefektivnější');
    }

    if (customFunctionsCount > 3) {
        solutionRank.pushBenefit(-2, 'Komplexnější funkční požadavky mohou být problematické realizovat s Wix');
    }

    if (budgetPerMonth < 25) {
        solutionRank.pushBenefit(-1, 'Rozpočet na měsíční údržbu je pod optimalní úrovní pro Wix');
    }

    if (daysToDeadline >= 7 && daysToDeadline <= 30) {
        solutionRank.pushBenefit(1, 'Realistické časové období pro vytvoření webu na platformě Wix');
    }

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
