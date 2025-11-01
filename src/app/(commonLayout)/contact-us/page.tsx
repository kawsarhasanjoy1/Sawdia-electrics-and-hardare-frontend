'use client';
import ContactForm from '@/component/Contact/ContactForm';
import LocateUsCard from '@/component/Contact/LocateContact';
import CommonBanner from '@/component/shared/CommonBanner';



export default function ContactPage() {
    return (
        <main className=" space-y-2 mb-10">
            <section className="">
                 <CommonBanner title='Contact us' background='https://t3.ftcdn.net/jpg/05/47/40/44/360_F_547404496_ZV5aB55KPrKJ90qzD2zhoPhNbjn07wX3.jpg' subtitle='We’d love to hear from you'/>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10'>
                    <ContactForm />
                    <LocateUsCard />
                </div>

                <aside>
                    <div className="rounded-xl overflow-hidden mt-5 border border-gray-200">
                        <iframe
                            title="Store location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159042!3d-37.81627974201114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzI2LjQiRQ!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                            width="100%"
                            height="320"
                            loading="lazy"
                            style={{ border: 0 }}
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </aside>
            </section>
        </main>
    );
}













