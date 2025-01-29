import Head from "next/head";
import { Header } from "../containers/header";
import Searchbox from "../containers/searchbox";

const Search = () => {
    return (
        <div>
            <Head>
                <title>uku.kg</title>
                <meta name="description" content="&#12304;uku.kg&#12305; Крупнейший сайт для размещения бесплатных объявлений ➤ Кыргызстан ❱❱❱ 〚Актуальные объявления по темам〛▷ Недвижимость ➦ Транспорт ➦ Электроника ➦ Работа ➦ Услуги ➦ Дом и Сад ➦ Животные ➤ Кыргызстан ᐉ Сервис бесплатных частных и бизнес объявлений от uku.kg!" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="google" content="notranslate" />
                <meta name="keywords" content="новости, лента, обновления" />
                <meta name="robots" content="all" />
                <meta property="og:title" content="Лента новостей" />
                <meta property="og:description" content="&#12304;uku.kg&#12305; Крупнейший сайт для размещения бесплатных объявлений ➤ Кыргызстан ❱❱❱ 〚Актуальные объявления по темам〛▷ Недвижимость ➦ Транспорт ➦ Электроника ➦ Работа ➦ Услуги ➦ Дом и Сад ➦ Животные ➤ Кыргызстан ᐉ Сервис бесплатных частных и бизнес объявлений от uku.kg!" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/_logo.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/_logo.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/_logo.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/images/_logo.png" />
                <meta property="og:url" content="https://uku.kg/" />
                <link rel="canonical" href="https://uku.kg/" />
            </Head>
            <Header />
            <Searchbox />
        </div>
    )
}

export default Search;