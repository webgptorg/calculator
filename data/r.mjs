import { SolutionRank } from '../script/SolutionRank.mjs';
import { webTypeToMessage } from './other/webTypeToMessage.mjs';

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

    if (['presentation', 'eshop', 'blog'].includes(webType)) {
        solutionRank.pushBenefit(-0.5, `Pro ${webTypeToMessage(webType, 2)} je vhodnější použít hotové řešení`);
    }

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
        solutionRank.pushBenefit(0.5, 'Dostatečný čas na vývoj');
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

    if (['application', 'eshop'].includes(webType)) {
        solutionRank.pushBenefit(-0.5, `Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

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

    if (['application', 'blog'].includes(webType)) {
        solutionRank.pushBenefit(-0.5, `Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    if (pagesCount > 10) {
        solutionRank.pushBenefit(-2, 'Není ideální pro více stránek');
    }

    if (customFunctionsCount > 2) {
        solutionRank.pushBenefit(-2, 'Omezené možnosti pro vlastní funkce');
    }

    if (daysToDeadline < 15) {
        solutionRank.pushBenefit(2, 'Ideální pro rychlé nasazení');
    }

    if (budgetUpfront < 500) {
        solutionRank.pushBenefit(1, 'Levné');
    }

    if (budgetPerMonth < 300) {
        solutionRank.pushBenefit(1, 'Levné');
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

    if (['application'].includes(webType)) {
        solutionRank.pushBenefit(-0.5, `Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    if (productsCount + pagesCount + customFunctionsCount > 1000) {
        solutionRank.pushBenefit(-1, 'Nevhodné pro velké weby');
    }

    if (customFunctionsCount > 5) {
        solutionRank.pushBenefit(-1, 'Přidání složitějších funkcí může být výzvou');
    }

    if (daysToDeadline < 7) {
        solutionRank.pushBenefit(-1, 'Nedostatečný čas pro vytvoření webu');
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

    if (['application'].includes(webType)) {
        solutionRank.pushBenefit(-0.5, `Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

    if (productsCount > 100) {
        solutionRank.pushBenefit(-1, 'Nevhodné pro větší e-shopy');
    }

    if (pagesCount > 100) {
        solutionRank.pushBenefit(-1, 'Nevhodné pro větší weby');
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
    const solutionRank = new SolutionRank('Solid Pixels', '');

    if (['eshop', 'application'].includes(webType)) {
        solutionRank.pushBenefit(-0.5, `Není nejlepší volbou pro ${webTypeToMessage(webType, 2)}`);
    }

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

    if (webType !== 'eshop') {
        solutionRank.pushBenefit(-5, 'Vhodné pouze pro e-shopy');
    }

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

    if (webType !== 'eshop') {
        solutionRank.pushBenefit(-5, 'Vhodné pouze pro e-shopy');
    }

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

    if (!['presentation'].includes(webType)) {
        solutionRank.pushBenefit(-5, `Nevhodné pro ${webTypeToMessage(webType, 2)}`);
    }

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

    if (!['presentation', 'eshop'].includes(webType)) {
        solutionRank.pushBenefit(-5, `Nelze použít jako ${webTypeToMessage(webType, 2)}`);
    }

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

    if (!['presentation', 'blog'].includes(webType)) {
        solutionRank.pushBenefit(-5, `Nelze použít jako ${webTypeToMessage(webType, 2)}`);
    }

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

    if (!['presentation', 'blog'].includes(webType)) {
        solutionRank.pushBenefit(-5, `Nelze použít jako ${webTypeToMessage(webType, 2)}`);
    }

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
    // Note: Making web via ChatGPT is pretty much the same as custom solution but with some modifications
    const solutionRank = rankCustomSolution({
        webType,
        pagesCount,
        productsCount,
        updatesDaysPeriod,
        customFunctionsCount,
        budgetUpfront: budgetUpfront / 2,
        budgetPerMonth: budgetPerMonth / 2,
        daysToDeadline: daysToDeadline * 2,
        levelOfControl,
    });

    solutionRank.title = 'ChatGPT';
    solutionRank.description = 'Vygenerujte si web pomocí ChatGPT.';

    solutionRank.pushBenefit(-0.5, 'Pomocí ChatGPT bez dalších znalostí vytvoříte pouze limitovaný web');

    return solutionRank;
}

/**
 * TODO: !!! Split into multiple files
 */
