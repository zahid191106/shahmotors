"use client"
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle
} from 'lucide-react';

export default function Contact(){
    return(
        <>
            <section id="contact" className="bg-gray-50/50 py-24 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">GET IN TOUCH WITH SHAH MOTORS</p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Contact Our Galway Car Dealership</h2>
                    
                    {/* Decorative Divider */}
                    <div className="flex justify-center items-center space-x-3 opacity-30">
                        <div className="w-12 h-1 bg-red-600"></div>
                        <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        </div>
                        <div className="w-12 h-1 bg-red-600"></div>
                    </div>
                    <p className="text-gray-600 max-w-5xl mx-auto leading-relaxed text-base md:text-lg pt-2 pb-8">
                        Have a question about one of our vehicles, want to book a test drive, or looking to discuss flexible 
                        car finance packages? The team at Shah Motors is here to help. Whether you are visiting our Galway 
                        showroom or prefer a digital video walkthrough of your chosen second-hand car, reach out to us via phone, 
                        WhatsApp, or email today. 
                    </p>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-16">
                        <img src="./images/pic7.png" alt="Showroom Map" className="w-full h-80 object-cover" />

                        <div className='grid gap-2'>
                            {/* Phone Card */}
                            <Link href="tel:+353833526830" className="grid md:grid-cols-2 items-center bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 p-5 space-y-6">
                                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-0 mx-auto group-hover:bg-red-600 group-hover:text-white transition-all">
                                    <Phone className="w-10 h-10 text-red-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">Call Us</h3>
                                    <span className="text-lg font-bold text-red-600 hover:text-red-700 transition-colors">
                                        +353 833526830
                                    </span>
                                    <p className="text-gray-500 text-sm">Available 9:00am to 5:00pm for your queries</p>
                                </div>
                            </Link>

                            {/* WhatsApp Card */}
                            <Link href="https://wa.me/+353833526830" className="grid md:grid-cols-2 items-center bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 p-5 space-y-6">
                                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-0 mx-auto group-hover:bg-green-500 group-hover:text-white transition-all">
                                    <MessageCircle className="w-10 h-10 text-green-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">WhatsApp</h3>
                                    <span className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                                        +353 833526830
                                    </span>
                                    <p className="text-gray-500 text-sm">Quick response via WhatsApp</p>
                                </div>
                            </Link>

                            {/* Email Card */}
                            <Link href="mailto:shahmotors14@yahoo.com" className="grid md:grid-cols-2 items-center bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 p-5 space-y-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-0 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Mail className="w-10 h-10 text-blue-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">Email Us</h3>
                                    <span className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                        shahmotors14@yahoo.com
                                    </span>
                                    <p className="text-gray-500 text-sm">Fast response within 1-2 hours</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Location and Map Section */}
                <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Location Info */}
                    <div className="space-y-8">
                        <div className="flex items-center text-red-600 font-black uppercase tracking-[0.2em] text-sm">
                            <div className="w-8 h-1 bg-red-600 mr-3 rounded-full"></div> Our Location
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                            Visit Our <span className="text-red-600">Showroom</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            Come and explore our premium fleet of hand-picked vehicles in person. Our modern showroom 
                            is open 7 days a week, featuring a dedicated team of automotive specialists ready to assist 
                            you with vehicle viewings, trade-in valuations, and tailored finance applications.
                        </p>
                        <div className="space-y-6 pt-4">
                            <div className="flex items-start space-x-4 group">
                                <div className="p-4 bg-red-100 rounded-xl group-hover:bg-red-600 transition-colors shrink-0">
                                    <MapPin className="w-6 h-6 text-red-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Address</p>
                                    <span className="text-gray-800 font-bold leading-tight block text-lg">Two Ditch, Castlegar Co. Galway (H91 EE9F)</span>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 group">
                                <div className="p-4 bg-red-100 rounded-xl group-hover:bg-red-600 transition-colors shrink-0">
                                    <Clock className="w-6 h-6 text-red-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Business Hours</p>
                                    <span className="text-gray-800 font-bold block text-lg">Mon - Sun: 9:00 AM - 9:00 PM</span>
                                    <span className="text-gray-600 text-sm">Holidays: 10:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Embed */}
                    <div className="rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 h-96 bg-gray-200">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458.7425064699331!2d-8.997775474740912!3d53.30731490089446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b915ec60a9863%3A0x58a54793a9fd935!2sPollkeen%2C%20Co.%20Galway%2C%20H91%20EE9F%2C%20Ireland!5e1!3m2!1sen!2s!4v1779615330167!5m2!1sen!2s" 
                            width="600" height="450" 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </section>
        </>
    );
}