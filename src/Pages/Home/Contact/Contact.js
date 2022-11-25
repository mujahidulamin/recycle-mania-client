import React from "react";


const Contact = () => {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="hero h-full bg-base-100">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-start lg:text-start">
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
              className="text-5xl font-bold"
            >
              Let's chat.
            </h1>
            <p
              data-aos="fade-right"
              data-aos-duration="900"
              data-aos-delay="400"
              className="py-6 w-4/5"
            >
              We are always connected to our clients. it's makes us understand
              the client requirements clearly , for that we can deliver the best
              quality things to them, We beleive that listening to our clients
              and make their requiremnets full is the untimate goal for us. Feel
              free to contact us for more details..
            </p>
            <p
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="600"
            >
              let's make the world better together!{" "}
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm lg:max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full max-w-md"
              />
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full max-w-md"
              />
              <textarea
                className="textarea input-bordered w-full max-w-md"
                placeholder="Your message"
                rows={6}
              ></textarea>
            <button className="btn-primary p-3 rounded">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;