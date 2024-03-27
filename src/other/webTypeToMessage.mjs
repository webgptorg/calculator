export function webTypeToMessage(webType, grammarFall) {
    if (grammarFall === 2) {
        return (
            {
                presentation: 'prezentační web',
                ecommerce: 'e-shop',
                blog: 'blog',
                application: 'aplikaci',
            }[webType] || webType
        );
    } else {
        return webType;
    }
}
