'use client';
import { Clock, Loader, LocationEdit, MailIcon, MessageCircle, PhoneCall } from 'lucide-react';
import { useState } from 'react';


const LocateUsCard = () => {
    const addressText = '795 Timbercrest Road, Alaska 99743';
    const emailText = 'kawsar@gmail.com';
    const phoneText = '01405951898';

    const [copied, setCopied] = useState<string | null>(null);
    async function copy(text: string, key: string) {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key);
            setTimeout(() => setCopied(null), 1200);
        } catch { }
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 rounded-2xl" />
            <div className="relative rounded-2xl border border-gray-200  ">

                <div className="px-5 pb-5 pt-3">
                    <ul className="space-y-3 text-sm">
                        {/* Address */}
                        <li className="group flex items-start  gap-3 rounded-xl border border-transparent p-2 hover:border-gray-200 hover:bg-gray-50">
                            <LocationEdit size={15} />
                            <div className="flex-1">
                                <div className="font-medium">Address</div>
                                <div className="text-gray-700">{addressText}</div>
                            </div>
                            <div className="flex items-center gap-1">

                                <button
                                    onClick={() => copy(addressText, 'address')}
                                    className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-white hover:shadow-sm border border-gray-200"
                                >
                                    {copied === 'address' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </li>


                        <li className="group flex items-start gap-3 rounded-xl border border-transparent p-2 hover:border-gray-200 hover:bg-gray-50">
                            <MailIcon size={15} />
                            <div className="flex-1">
                                <div className="font-medium">Email</div>
                                <a
                                    href={`mailto:${emailText}`}
                                    className="text-gray-700 underline underline-offset-2 hover:no-underline"
                                >
                                    {emailText}
                                </a>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => copy(emailText, 'email')}
                                    className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-white hover:shadow-sm border border-gray-200"
                                >
                                    {copied === 'email' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </li>

                        <li className="group flex items-start gap-3 rounded-xl border border-transparent p-2 hover:border-gray-200 hover:bg-gray-50">
                            <PhoneCall size={15} />
                            <div className="flex-1">
                                <div className="font-medium">Phone</div>
                                <a
                                    href={`tel:${phoneText.replace(/\s+/g, '')}`}
                                    className="text-gray-700 underline underline-offset-2 hover:no-underline"
                                >
                                    {phoneText}
                                </a>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => copy(phoneText, 'phone')}
                                    className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-white hover:shadow-sm border border-gray-200"
                                >
                                    {copied === 'phone' ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </li>
                        <li className="group flex items-start gap-3 rounded-xl border border-transparent p-2 hover:border-gray-200 hover:bg-gray-50">
                            <Clock size={15} />
                            <div className="flex-1">
                                <div className="font-medium">Hours</div>
                                <div className="text-gray-700">Mon–Fri, 9:00–18:00</div>
                            </div>
                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                Typically replies in 1–2 hrs
                            </span>
                        </li>
                    </ul>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <a
                            href={`mailto:${emailText}`}
                            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                        >
                            <Loader className="mr-2 h-4 w-4" />
                            Email us
                        </a>
                        <a
                            href={`https://wa.me/01405951898`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LocateUsCard