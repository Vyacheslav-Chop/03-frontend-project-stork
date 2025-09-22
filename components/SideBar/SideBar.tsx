'use client';

import Link from 'next/link';
import css from './SideBar.module.css';
import NavSideBar from '../NavSideBar/NavSideBar';
import { logout } from '@/lib/api/apiClient';
import { useRouter } from 'next/router';

interface SidebarProps {
  onClose: () => void;
}

const SideBar = ({ onClose }: SidebarProps) => {
  const isAuth = false;
  const rouret = useRouter();

  const handleLogout = async () => {
    await logout();
    rouret.replace('/sign-in');
  };

  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <Link href="/">
          <svg width={30} height={31}>
            <use href="/icons/sideBar/stork.svg"></use>
          </svg>
          <span className={css.LogoText}>Лелека</span>
        </Link>

        <button className={css.closeBtn} onClick={onClose}>
          <svg width={32} height={32}>
            <use href="/icons/sideBar/close.svg"></use>
          </svg>
        </button>
      </div>
      <NavSideBar isAuth={isAuth} />
      <div className={css.footer}>
        {isAuth ? (
          <button className={css.logoutBtn} onClick={handleLogout}>
            <svg width={40} height={40}>
              <use href="/icons/sideBar/logout.svg"></use>
            </svg>
          </button>
        ) : (
          <div className={css.authLinks}>
            <Link href="/sign-in" className={css.authLoginBtn}>
              Увійти
            </Link>
            <Link href="/sign-up" className={css.registerBtn}>
              Зареєструватися
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
