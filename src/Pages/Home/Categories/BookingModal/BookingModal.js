import React from 'react';




//booking modal
const BookingModal = ({ product }) => {
    
    return (
        <>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">{product?.itemName}</h3>
                            <p className="py-4">{product?.location}</p>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn">Yay!</label>
                            </div>
                        </div>
                    </div>

    
            
        </>
    );
};

export default BookingModal;