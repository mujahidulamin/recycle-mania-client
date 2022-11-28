import React, { useContext } from 'react';
import { AuthContext } from './../../../../context/AuthProvider';
import { toast } from 'react-hot-toast';





//booking modal
const BookingModal = ({ product, setProduct }) => {

    const { user } = useContext(AuthContext)

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const img = product.picture;
        const itemName = product?.itemName;
        const price = product?.resalePrice;
        const buyerName = form.name.value;
        const buyerEmail = form.email.value;
        const phone = form.phone.value;
        const meetingLocation = form.meetingLocation.value;
        const booking = {
            itemName: itemName,
            price: price,
            buyerName: buyerName,
            buyerEmail: buyerEmail,
            phone: phone,
            meetingLocation: meetingLocation,
            img: img
        }

        fetch('https://recycle-mania-server.vercel.app/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(null)
                toast.success('Booking Successfully')
            })


    }

    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-left font-bold text-lg">{product?.itemName}</h3>
                    <form onSubmit={handleBooking}
                        className='grid grid-cols-1 gap-3 mt-8'>
                        <label className="label">
                            <span className="label-text mb-[-12px]">Brand Name</span>
                        </label>
                        <input type="text" disabled value={product?.itemName} className="input w-full input-bordered" />
                        <label className="label">
                            <span className="label-text mb-[-12px]">Price</span>
                        </label>
                        <input type="text" disabled value={product?.resalePrice + ' Taka'} className="input w-full input-bordered" />
                        <input defaultValue={user?.displayName} disabled name='name' type="text" placeholder="Your Name" className="input w-full input-bordered" />
                        <input defaultValue={user?.email} disabled name='email' type="email" placeholder="Email Address" className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name='meetingLocation' type="text" placeholder="Meeting Location" className="input w-full input-bordered" />
                        <input className='w-full btn btn-accent' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;