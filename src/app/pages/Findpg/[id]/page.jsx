'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import RoomCard from '../RoomCard';
import styles from '../../../../styles/findpg.module.css';
import Category from '../Categories/page';

function Findpg() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    idealFor: '',
    budget: ''
  });

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
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(pg => {
        const matchesCategory = filterCriteria.category ? pg.category === filterCriteria.category : true;
        const matchesIdealFor = filterCriteria.idealFor ? pg.idealFor === filterCriteria.idealFor : true;
        const matchesBudget = filterCriteria.budget ? isWithinBudget(pg.budgetRange, filterCriteria.budget) : true;
        return matchesCategory && matchesIdealFor && matchesBudget;
      });
      setFilteredData(filtered);
    }
  }, [filterCriteria, data]);

  const isWithinBudget = (pgBudget, selectedBudget) => {
    const [min, max] = selectedBudget.split('-').map(Number);
    const [pgMin, pgMax] = pgBudget.split('-').map(Number);
    return pgMin >= min && pgMax <= max;
  };

  const handleFilterSubmit = (criteria) => {
    setFilterCriteria(criteria);
  };

  if (!data) {
    toast.info('Loading data...');
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
                  occupancy={pg.roomOptions.occupancy}
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
