import * as React from 'react';
import classNames from 'classnames';
import {gsap, refreshScrollTrigger} from '../../public/lib/gsap';
import {getHeight} from '../../public/lib/utils';
import {parseMarkdown} from "../../public/lib/parser";
import CollapseArrow from '../../public/icons/collapse.svg'
import styles from './styles.module.scss';

const animatedHeight = (element, height, callback) => {
  gsap.to(element, {
    height,
    duration: 0.2,
    onComplete: callback
  })
};

const Collapse = ({className, containerClassName, titleClassName, descriptionClassName, title = '', content = ''}) => {
  const [isOpen, setOpen] = React.useState(false);
  const titleRef = React.useRef(null);
  const collapseRef = React.useRef(null);

  React.useEffect(() => {
    const minHeight = getHeight(titleRef.current);
    if (isOpen) {
      animatedHeight(collapseRef.current, 'auto', refreshScrollTrigger);
    } else {
      animatedHeight(collapseRef.current, minHeight, refreshScrollTrigger)
    }
  }, [isOpen]);

  return (
    <li
      ref={collapseRef}
      className={classNames(styles.collapse, className)}
    >
      <div
        ref={titleRef}
        className={classNames(styles.collapse__visible, containerClassName)}
        onClick={() => setOpen(!isOpen)}
      >
        <div className={classNames(styles.collapse__title, titleClassName)}>
          <span>
            {title}
          </span>
        </div>
        <div className={styles.collapse__collapseIcon}>
          <CollapseArrow className={classNames('collapse-icon-plus', {
            'collapse-icon-plus_collapsed': !isOpen
          })}/>

        </div>
      </div>
      <div className={classNames(styles.collapse__description, descriptionClassName)}>
        {parseMarkdown(content)}
      </div>
    </li>
  )
};

export default Collapse;
