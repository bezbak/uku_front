import * as React from 'react';
import Link from 'next/link'
import classNames from 'classnames';

const NavLink = ({ url, onClick, as, className, children }) => {
  return (
    <Link href={url} as={as}>
      <a onClick={onClick} className={classNames(className)}>
        {children}
      </a>
    </Link>
  )
};

NavLink.defaultProps = {
  url: '/'
};

export default NavLink
