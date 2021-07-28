import React, {useState} from "react";
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import styles from './styles.module.scss'
// import noImage from '../../public/images/no_image.png'
import Image from "next/image";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwiperCard = ({data, onClick}) => {

    const [active, setActive] = useState(data?.images[0]?.image)

    return (
        <div style={{background: `url(${active})`}} className={styles.swiperCard}
             onClick={onClick}>
            {data.images.length ?
                data.images.map((item, index) => (<div
                    id={item.image}
                    key={index}
                    onMouseOver={(e) => setActive(e.target.id)}/>))
                :
                [1].map((item, index) => {
                    return <Image src={"/images/no_image.png"} width={'100%'} height={"100%"}/>
                })

            }
        </div>
    )
}
export default SwiperCard;