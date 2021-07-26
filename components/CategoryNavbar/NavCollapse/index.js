import * as React from 'react';
import classNames from 'classnames';
import {gsap, refreshScrollTrigger} from '../../../lib/gsap';
import {getHeight} from '../../../lib/utils';
import CollapseIcon from '../../../public/icons/collapse.svg'
import ActiveCollapseIcon from '../../../public/icons/activeCollapse.svg'
import styles from './styles.module.scss';

const animatedHeight = (element, height, callback) => {
  gsap.to(element, {
    height,
    duration: 0.5,
    onComplete: callback
  })
};

const NavCollapse = ({
                       className, onClick,
                       containerClassName, titleClassName, titleActiveClassName, contentClassName, title = '',
                       levelOption, children, disabled, collapseIcon
                     }) => {
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
        className={classNames(styles.collapse__visible,
          containerClassName)}
        onClick={() => {
          !disabled &&
          setOpen(!isOpen)
        }}>
        <div className={classNames(titleClassName, titleActiveClassName)} onClick={onClick}>
          <span>
            {title}
          </span>
        </div>
        {titleActiveClassName && <div className={styles.collapse__collapseIcon}>
          <ActiveCollapseIcon/>
        </div>}
        {!titleActiveClassName && collapseIcon && <div className={styles.collapse__collapseIcon}>
          <CollapseIcon className={classNames({[styles.collapse__collapseIcon_collapsed]: isOpen})}/>
        </div>}

      </div>

      <div className={classNames(styles.collapse__content, contentClassName)}>
        {children}
      </div>
    </li>
  )
};

export default NavCollapse;
