// src/components/expert/ExpertNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Expert/ExpertNavbar.module.css';
import { FaBell, FaLeaf } from 'react-icons/fa';

const ExpertNavbar = () => {
    const navigate = useNavigate();
    const unreadCount = 3;
    return (
        <div className={styles.navbar}>
            <div>
                <FaLeaf className={styles.logoIcon} />
                <span className={styles.logoText}>Kilimo Leo</span>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.notifications} onClick={() => navigate('/expert/notifications')}>
                    <FaBell className={styles.icon} />
                    {unreadCount > 0 && (
                        <span className={styles.badge}>{unreadCount}</span>
                    )}
                </div>

                <div className={styles.profile}>
                    <img
                        src="https://www.slashgear.com/img/gallery/heres-why-the-b2-bomber-cost-more-than-any-plane-ever-built/l-intro-1717451569.jpg"
                        alt="Expert"
                        className={styles.avatar}
                    />
                    <span className={styles.name}>Dr. Mkulima</span>
                </div>
            </div>
        </div>
    );
};

export default ExpertNavbar;
