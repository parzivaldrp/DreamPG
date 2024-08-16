'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../../../styles/Skeleton.module.css';
import { toast } from 'react-toastify'; // Import toastify

const Skeleton = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPgData = async () => {
    try {
      const res = await fetch(`/api/spg/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch PG');
      }
      const data = await res.json();
      setPg(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      toast.error('Failed to fetch PG'); // Display error toast notification
    }
  };

  useEffect(() => {
    if (id) {
      fetchPgData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pg) {
    toast.error('PG not found'); // Display error toast notification
    return <div>PG not found</div>;
  }
  return (
    <div className={styles.mainSkeleton}>
      <div className={styles.SelHd}>
        <h3>{pg.propertyName} PG rooms</h3>
      </div>
      <div className={styles.klgd}>
        <hr width='80%' />
      </div>
      <div className={styles.imgDivg}>
        <div className={styles.imgskel}>
          {pg.propertyImages.map((image, index) => (
            <img key={index} src={image} className={styles.Photo} alt='' />
          ))}
        </div>
        <div className={styles.parantdev}>
          <div className={styles.desSkel}>
            <div className={styles.LeftlesSkel}>
              <div>
                <h2>{pg.propertyName}</h2>
              </div>
              <div className={styles.Leftlocation}>
                <img src='/location.svg' alt='loc' />
                <p>{pg.address}, {pg.city}, {pg.state}</p>
              </div>
              <div className={styles.Leftlocation}>
                <img src='/call.svg' alt='loc' />
                <p>{pg.mobileNumber}</p>
              </div>
              <div className={styles.hrLeftInfo}>
                <div className={styles.Leftlocation}>
                  <img src='/occupancy.svg' alt='loc' />
                  <p>{pg.roomOptions.occupancy}</p>
                </div>
                <div className={styles.Leftlocation}>
                  <img src='/living.svg' alt='loc' />
                  <p>{pg.whoCanStay}</p>
                </div>
                <div className={styles.Leftlocation}>
                  <img src='/profession.svg' alt='loc' />
                  <p>{pg.idealFor}</p>
                </div>
              </div>
              <div className={styles.hryuj}>
                <hr width='90%' />
              </div>
              <div className={styles.leftAditionalInfo}>
                <h4>PG Rules</h4>
                <div className={styles.listInfo}>
                  <div>
                    <ul>
                      {pg.rules && pg.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.hryuj}>
                <hr width='90%' />
              </div>
              <div className={styles.leftAditionalInfo}>
                <h4>Amenities</h4>
                <div className={styles.listInfoAmenities}>
                  {Object.keys(pg.amenities).map((amenity, index) => (
                    <div key={index} className={styles.AmenTick}>
                      <img src='/tick.svg' alt='tick' />
                      <p>{amenity.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.hryuj}>
                <hr width='90%' />
              </div>
              <div className={styles.leftAditionalInfo}>
                <h4>Agreement Details</h4>
                <div className={styles.listInfo}>
                  <p>Agreement Duration: {pg.agreementDuration}</p>
                  <p>Security Deposit Duration: {pg.securityDepositDuration}</p>
                  <p>Notice Period: {pg.noticePeriod}</p>
                </div>
              </div>
              <div className={styles.hryuj}>
                <hr width='90%' />
              </div>
              <div className={styles.leftAditionalInfo}>
                <h4>Rent Details</h4>
                <div className={styles.listInfo}>
                  <p>Rent Cycle: {pg.rentCycle}</p>
                  <p>Late Payment Fine: {pg.latePaymentFine}</p>
                </div>
              </div>
              <div className={styles.hryuj}>
                <hr width='90%' />
              </div>
              <div className={styles.leftAditionalInfo}>
                <h4>Budget and Extra Charges</h4>
                <div className={styles.listInfo}>
                  <p>Budget Range: {pg.budgetRange}</p>
                  <p>Extra Charge: {pg.extraCharge}</p>
                </div>
              </div>
              <div className={styles.hryuj}>
                <hr width='90%' />
              </div>
              <div className={styles.leftAditionalInfo}>
                <h4>Description</h4>
                <div className={styles.listInfo}>
                  <p>{pg.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.RightlesSkel}>
              <h4>Owner Details</h4>
              <div className={styles.listInfo}>
                <p>Owner Name: {pg.ownerName}</p>
                <p>Owner Email: {pg.ownerEmail}</p>
              </div>
              <h4>Verification</h4>
              <div className={styles.listInfo}>
                <p>Not a Robot: {pg.notARobot ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
