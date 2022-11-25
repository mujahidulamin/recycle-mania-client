import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Contact from '../Contact/Contact';
import HotSale from '../HotSale/HotSale';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <HotSale></HotSale>
            <Contact></Contact>
        </div>
    );
};

export default Home;