import React from 'react';




//booking modal
const BookingModal = ({ product }) => {

    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-left font-bold text-lg">{product?.itemName}</h3>
                    <form onSubmit= ""
                    className='grid grid-cols-1 gap-3 mt-8'>
                        <input type="text" disabled value= {product?.resalePrice  + ' Taka'} className="input w-full input-bordered" />
                        <select name='slot' className="select select-bordered w-full">
                            {/* {
                                slots.map((slot, id) => <option
                                    key={id}
                                    value={slot}
                                >{slot}</option>)
                            } */}
                        </select>
                        <input defaultValue="" disabled name='name' type="text" placeholder="Your Name" className="input w-full input-bordered" />
                        <input defaultValue="" disabled name='email' type="email" placeholder="Email Address" className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input className='w-full btn btn-accent' type="submit" value="Submit" />
                    </form>
                </div>
            </div>



        </>
    );
};

export default BookingModal;