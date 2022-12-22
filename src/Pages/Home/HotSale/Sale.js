import React from 'react';

const Sale = ({sale}) => {
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-xl drop-shadow-2xl">
                <figure><img src= {sale.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title mx-auto">
                        {
                            sale.brand
                        }
                        <div className="badge badge-secondary">Hot Sale</div>
                    </h2>
                    <p>{sale.configuration}</p>
                    <div className="card-actions justify-center">
                        <div className="badge badge-outline">Price</div>
                        <div className="badge badge-outline">{sale.price} Taka</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sale;