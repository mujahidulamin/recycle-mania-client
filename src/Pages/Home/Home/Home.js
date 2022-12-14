import React from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Contact from '../Contact/Contact';
import HotSale from '../HotSale/HotSale';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Advertise></Advertise>
            <HotSale></HotSale>
            <Contact></Contact>
        </div>
    );
};

export default Home;