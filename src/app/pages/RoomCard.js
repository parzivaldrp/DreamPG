import React from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../../styles/RoomCards.module.css";

const RoomCard = ({ id, title, location, occupancy, living, profession, image, price }) => {
    const router = useRouter();

    const handleEditUser = () => {
        router.push(`/pages/Skeleton/${id}`);
    };

    let livingImageSrc = '';
    if (living === 'Only-boys') {
        livingImageSrc = '/living.svg';
    } else if (living === 'Only-girls') {
        livingImageSrc = '/living2.svg';
    } else {
        livingImageSrc = '/living.svg';
    }

    return (
        <div className={styles.roomCard}>
            <div className={styles.contentRc}>
                <div className={styles.roomImage}>
                    <img src={`${image}`} className={styles.image} alt={title} />
                </div>
                <div className={styles.roomInfo}>
                    <div className={styles.roomInfoUpper}>
                        <div>
                            <h3 className={styles.title}>{title}</h3>
                            <div className={styles.roomInfoLocation}>
                                <img src='/location.svg' alt='location' />
                                <p>{location}</p>
                            </div>
                        </div>
                        <div className={styles.roomPrice}>
                            <h3><b>{price}</b></h3>
                        </div>
                    </div>
                    <div className={styles.roomInfoBottom}>
                        <div className={styles.roomInfoLocation}>
                            <img src='/occupancy.svg' alt='occupancy' />
                            <p>{occupancy}</p>
                        </div>
                        <div className={styles.roomInfoLocation}>
                            <img src={livingImageSrc} alt='living' />
                            <p>{living}</p>
                        </div>
                        <div className={styles.roomInfoLocation}>
                            <img src='/profession.svg' alt='profession' />
                            <p>{profession}</p>
                        </div>
                    </div>
                    <div className={styles.roomPB}>
                        <button className={styles.roomButton} onClick={handleEditUser}>I'm Interested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
