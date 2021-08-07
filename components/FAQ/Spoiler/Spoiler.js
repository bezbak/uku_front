import styles from './styles.module.scss'
import classNames from "classnames";
import cs from 'classnames'
import {useState} from "react";

const Spoiler = () => {

    const [spoiler, setSpoiler] = useState(false)


    return (
        <div
            onClick={() => setSpoiler(!spoiler)}
            className={styles.spoiler}>
            <div className={styles.defaultSpoiler}>
                <h3>Title</h3>
                <img style={spoiler ? {transform: "rotate(90deg)"} : {transform: "rotate(0deg)"}}
                     src="/icons/arrow.png"
                     alt=""/>
            </div>
            <div
                className={classNames(styles.spoilerContent, spoiler ? styles.expanded : styles.collapsed)}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur
                    tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio
                    mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo
                    praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
                    scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies
                    luctus
                    massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra
                    nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu
                    tellus ut
                    odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt
                    aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum
                    tortor.Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique
                    nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris,
                    faucibus consequat tincidunt </p>
            </div>
        </div>

    )
}

export default Spoiler;