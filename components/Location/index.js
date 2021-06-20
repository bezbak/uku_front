import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import CloseIcon from '../../public/icons/CloseIcon.svg'
import ArrowIcon from '../../public/icons/ArrowIcon.svg'
import {actions} from "../../public/store/locations/slice";
import Button from "../Button";
import styles from './styles.module.scss'


const Location = ({modalOpen, getAddress}) => {
  const swiperRef = useRef();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(modalOpen)
  const [searchValue, setSearchValue] = useState("");
  const [slides, setSlides] = useState([])
  const [activeRegion, setActiveRegion] = useState()
  const [address, setAddress] = useState([]);
  const slideNext = () => swiperRef.current.slideNext();
  const slidePrev = () => swiperRef.current.slidePrev();
  const locationRequest = () => dispatch(actions.locationRequestStart());
  useEffect(() => {
    locationRequest()
  });
  const modalCloseHandle = () => setIsModalOpen(false)

  function RegionsInRegion(children, name) {
    setAddress(address => [...address, name])
    if (children.length > 0) {
      const filterArray = slides?.filter(slide => {
        if (
          JSON.stringify(slide) !== JSON.stringify(children)
        )
          return slide
      });
      setSlides(() => [...filterArray, children])
    } else {
      getAddress((address.concat(name)).toString())
      setIsModalOpen(false)
    }

  }

  const childRegionFunction = (children, name) => {
    setActiveRegion(name)
    setSearchValue("")
    RegionsInRegion(children, name)
    setTimeout(() => slideNext(), 500);
  }
  const prevSlide = () => {
    slidePrev()
    setTimeout(() => {
      slides.pop();
      address.pop()
    }, 500);

  }
  const region = useSelector((store) => store.location?.location);
  return (

    <Modal modalOpen={isModalOpen} >
      <div className={styles.location}>
        <div className={styles.location__headline}>
          <div className={styles.location__headline__title}>
            <span>Выберите расположение</span>
          </div>
          <Button className={styles.location__headline__closeButton} onClick={modalCloseHandle}>
            <CloseIcon/>
          </Button>
        </div>
        <div className={styles.location__search}>
         <input placeholder={"Введите название страны"}
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}/>
        </div>
        <Swiper
          className={styles.location__swiper}
          slidesPerView={'auto'}
          allowSlidePrev={false}
          noSwiping={false}
          centeredSlides={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide>
            <div className={classNames(styles.location__slide)}>
              {region?.filter(val => {
                if(searchValue === "") {
                  return val
                }else if (val.name.toLowerCase().includes(searchValue?.toLowerCase())){return val}
              })?.map((reg, key) => {
                return (
                  <div key={key}
                       className={classNames(styles.location__slide__regionWrap,
                         {[styles.location__slide__regionWrap_activeRegion]: reg.name === activeRegion})}
                       onClick={() => childRegionFunction(reg.children, reg.name)}>
                    <label className={styles.location__slide__regionWrap_label}>{reg.name}</label>
                    {reg.children.length > 0 &&
                    <ArrowIcon className={styles.location__slide__regionWrap__arrowRightIcon}/>}
                  </div>
                )
              })}
            </div>
          </SwiperSlide>

          {slides?.map((child, index) =>
            <SwiperSlide>
              <div className={classNames(styles.location__slide)}>

                {child?.filter(val => {
                  if(searchValue === "") {
                    return val
                  }else if (val.name.toLowerCase().includes(searchValue?.toLowerCase())){return val}
                }).map((reg, key) => {
                  return (
                    <div key={key}
                         className={classNames(styles.location__slide__regionWrap,
                           {[styles.location__slide__regionWrap_activeRegion]: reg.name === address[address.length-1]})}>
                      <ArrowIcon className={styles.location__slide__regionWrap__arrowLeftIcon} onClick={prevSlide}/>
                      <div className={classNames(styles.location__slide__regionWrap)}
                           onClick={() => childRegionFunction(reg.children, reg.name)}>
                        <label className={styles.location__slide__regionWrap_label}>
                          {reg.name}
                        </label>
                        {reg.children.length > 0 &&
                        <ArrowIcon
                          className={styles.location__slide__regionWrap__arrowRightIcon}/>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            </SwiperSlide>
          )
          }
        </Swiper>
      </div>
    </Modal>
  )
}

export default Location