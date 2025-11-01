'use client';

import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm('mldopzgr');

  if (state.succeeded) {
    return (
      <section className="mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Thanks for your message!</h2>
            <p className="mt-1 text-sm text-gray-600">We’ll reply within one business day.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" ">{/* <-- fixed: no space after '<' */}
      <div className="mx-auto ">
        <div className="md:col-span-3">
          <div className="relative rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-sky-500" />

            {/* IMPORTANT: remove action, let handleSubmit do the POST */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900">Send a message</h2>
              <p className="mt-1 text-sm text-gray-600">We reply within one business day.</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="relative">
                  <label htmlFor="name" className="peer sr-only">Name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder=" "
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                    Name
                  </span>
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                {/* Email (required by Formspree) */}
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder=" "
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                    Email
                  </span>
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder=" "
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                    Phone (optional)
                  </span>
                </div>

                {/* Topic */}
                <div className="relative">
                  <label htmlFor="topic" className="sr-only">Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Support</option>
                    <option>Bulk Order</option>
                    <option>PC Build</option>
                    <option>Other</option>
                  </select>
                  <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                    Topic
                  </span>
                </div>

                {/* Message (required by Formspree for most setups) */}
                <div className="relative md:col-span-2">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder=" "
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                    Message
                  </span>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
              </div>

              {/* Honeypot to reduce spam (optional but helpful) */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Optional subject that shows up in Formspree email */}
              <input type="hidden" name="_subject" value="New message from Contact page" />

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                >
                  {state.submitting ? 'Sending…' : 'Send message'}
                </button>

                <button
                  type="reset"
                  className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>

              {/* Global form-level errors */}
              <ValidationError errors={state.errors} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
