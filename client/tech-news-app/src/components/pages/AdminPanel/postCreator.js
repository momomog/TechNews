import needle from 'needle'
import {SECTION_GAMES, SECTION_HARDWARE, SECTION_MOBILE, SECTION_NOTEBOOKS, SECTION_OTHER} from "../../../common/Const";


export const postInitProcess = async (day, month, postNum) => {
    try {
        const resp = await needle('get', `https://4pda.ru/2020/0${month}/${day}/${postNum}`)
        const html = await document.createRange().createContextualFragment(resp.body)

        const photoId = html.querySelector('.photo').querySelector('[itemprop=image]').src
        const title = html.querySelector('[itemprop=headline]').textContent
        const fullDescription = html.querySelector('[itemprop=articleBody]').innerHTML
        const preDescription = html.querySelector('[itemprop=articleBody]').querySelector('p').innerText
        const categoryId = getCategory(fullDescription)

        return {
            postNum: ++postNum,
            photoId,
            title,
            fullDescription,
            preDescription,
            categoryId
        }
    } catch (e) {
        console.log(`Пост номер ${postNum} не найден`)
        await postInitProcess(day, month, ++postNum)
    }
}

function getCategory(fullDescription) {
    let categoryId

    if (fullDescription) {
        const desc = fullDescription.toLowerCase()
        if (desc.indexOf('смартфон') > 0)
            categoryId = SECTION_MOBILE
        else if (desc.indexOf('ноутбук') > 0)
            categoryId = SECTION_NOTEBOOKS
        else if (desc.indexOf('intel') > 0 || desc.indexOf('amd') > 0 || desc.indexOf('nvidia') > 0
            || desc.indexOf('msi') > 0 || desc.indexOf('qualcomm') > 0 || desc.indexOf('microsoft windows') > 0
            || desc.indexOf('процессор') > 0)
            categoryId = SECTION_HARDWARE
        else if (desc.indexOf('игр') > 0)
            categoryId = SECTION_GAMES
        else categoryId = SECTION_OTHER
    }
    return categoryId
}