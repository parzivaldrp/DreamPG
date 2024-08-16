'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import RoomCard from '../RoomCard';
import Category from '../Categories/page';
import styles from '../../../../styles/findpg.module.css';

function Findpg() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    idealFor: '',
    budget: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Login first and then enjoy your DreamPG');
      router.push('/pages/Login');
      return;
    }
    

    const fetchData = async () => {
      try {
        const response = await fetch('/api/allpg');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData.pgs);
        setFilteredData(jsonData.pgs); // Initially, all data is unfiltered
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleFilterSubmit = async (criteria) => {
    console.log('Filter criteria:', criteria);
    setFilterCriteria(criteria);
  
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams(criteria);
      console.log('Query params:', queryParams);
      const response = await fetch(`/api/querypg?${queryParams}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered data');
      }
      const jsonData = await response.json();
      console.log('Filtered data:', jsonData.pgs);
      setFilteredData(jsonData.pgs);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      toast.error('Failed to fetch filtered data. Please try again.');
      setIsLoading(false);
    }
  };
  

  if (isLoading) {
    return <div className={styles.Loading}>Loading data...</div>;
  }

  const isFiltered = filterCriteria.category || filterCriteria.idealFor || filterCriteria.budget;

  return (
    <div>
      <div className={styles.headingfpg}>
        <h3>Property/PG List</h3>
      </div>

      <div className={styles.fphr}>
        <hr width='80%' />
      </div>

      <div className={styles.bapuo}>
        <div>
          <Category onSubmit={handleFilterSubmit} />
        </div>
        <div className={styles.scrolll}>
          <main>
            <section>
              {isFiltered && (
                <div className={styles.filterMessage}>
                  <p>Showing filtered results</p>
                </div>
              )}
              {filteredData.length === 0 && (
                <div className={styles.noResultsMessage}>
                  <p>No results found</p>
                </div>
              )}
              {filteredData.map((pg) => (
                <RoomCard
                  key={pg._id}
                  id={pg._id}
                  title={pg.propertyName}
                  location={`${pg.address}, ${pg.city}, ${pg.state}`}
                  occupancy={pg.occupancy}
                  living={pg.whoCanStay}
                  profession={pg.idealFor}
                  image={pg.propertyImages[0]}
                  price={pg.budgetRange}
                />
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Findpg;
