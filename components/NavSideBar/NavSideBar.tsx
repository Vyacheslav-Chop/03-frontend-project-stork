import css from './NavSideBar.module.css';
import Link from 'next/link';

interface NavSidebarProps {
  isAuth: boolean;
}

const NavSideBar = ({ isAuth }: NavSidebarProps) => {
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          <Link href={isAuth ? '/' : '/sign-up'} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/sideBar/myDay.svg#icon-myDay"></use>
            </svg>
            Мій день
          </Link>
        </li>
        <li>
          <Link href={isAuth ? '/' : '/sign-up'} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/sideBar/travel.svg"></use>
            </svg>
            Подорож
          </Link>
        </li>
        <li>
          <Link href={isAuth ? '/' : '/sign-up'} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/sideBar/book.svg"></use>
            </svg>
            Щоденник
          </Link>
        </li>
        <li>
          <Link href={isAuth ? '/' : '/sign-up'} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/sideBar/account.svg"></use>
            </svg>
            Профіль
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavSideBar;
