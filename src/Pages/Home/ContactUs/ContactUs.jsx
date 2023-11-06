
const ContactUs = () => {
    return (
        <div className="max-w-7xl mx-auto pb-20 mt-20" style={{ backgroundImage: 'url(https://i.ibb.co/YTsYkwn/dark-cloth-with-plate-waffles.jpg)', backgroundSize: 'cover' }}>
            <h3 className="text-5xl text-center text-white font-bold pt-10">Contact Us</h3>
            <div className="max-w-5xl mx-auto text-white grid grid-cols-3 gap-10 mt-10">
                <div>
                    <h3 className="text-3xl font-bold mb-5">Locations</h3>
                    <p className="text-xl font-medium">Branch-01</p>
                    <p className="font-medium mb-3"><address>Mazar road, 2nd colony, mirpur, Dhaka-1218, Dhaka.</address></p>
                    <p className="text-xl font-medium">Branch-02</p>
                    <p className="font-medium"><address>Shahjalal upo-shahar, Sylhet-3100, Sylhet.</address></p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-5">Opening Hour</h3>
                    <p className="font-medium">Monday - Thursday</p>
                    <p className="font-medium mb-3">10.00AM-6.00PM</p>
                    <p className="font-medium">Friday & Saturday</p>
                    <p className="font-medium mb-3">10.00AM-4.00PM</p>
                    <p className="font-medium">Available for private events on Sunday</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-5">Contacts</h3>
                    <p className="text-xl font-medium">Call</p>
                    <p className="font-medium mb-3">+99 23876151760</p>
                    <p className="text-xl font-medium">Email</p>
                    <p className="font-medium mb-3">taiatulislamapon@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;