import React from 'react';
import Sale from './Sale';

const HotSale = () => {



    

    const hotSales = [
        {
            id: 1,
            configuration: 'Hp folio 1040 g3 i7 256-8 gb',
            brand: 'HP',
            price: 39000,
            img:'https://images.unsplash.com/photo-1544099858-75feeb57f01b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'

        },
        {
            id: 2,
            configuration: 'Dell 3340 i3 4th gen 500-4 gb',
            brand: 'Dell',
            price: 35000,
            img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
            id: 3,
            configuration: 'Hp 450 g2 i7 5th gen 500-4 gb',
            brand: 'HP',
            price: 25000,
            img: 'https://images.unsplash.com/photo-1618412687308-52a053fc4e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }
    ]




    return (
        <div className='container mx-auto '>
            <h2 data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className='text-4xl font-bold my-12'>Hot Sale</h2>
            <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 lg:mx-0'>
                {
                    hotSales.map(sale => <Sale
                        key={sale.id}
                        sale={sale}
                    ></Sale>)
                }
            </div>
        </div>
    );
};

export default HotSale;