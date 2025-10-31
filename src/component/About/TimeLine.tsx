const TimeLine = () => {
    const timeline = [
        {
            year: "2019",
            title: "We Opened Our Doors",
            text: "Started as a small shop focused on honest pricing and dependable parts.",
        },
        {
            year: "2021",
            title: "Nationwide Shipping",
            text: "Scaled logistics to deliver across Bangladesh with improved lead times.",
        },
        {
            year: "2023",
            title: "PC Builder & Business Solutions",
            text: "Launched custom PC builder flow and bulk procurement for SMEs.",
        },
        {
            year: "2025",
            title: "Service & Support Hub",
            text: "Expanded after-sales repair, RMA handling, and pro build services.",
        },
      
    ];

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our story</h2>
                    <p className="mt-3 text-gray-600">
                        From a compact storefront to a nationwide operation—our growth has always been driven by listening to customers.
                    </p>
                </div>

                <ol className="mt-10 relative border-s">
                    {timeline.map((t, idx) => (
                        <li key={t.year} className="mb-10 ms-4">
                            <div className="absolute w-3 h-3 bg-green-600 mt-1.5 -start-1.5 rounded-full border border-white" />
                            <time className="mb-1 text-sm font-medium leading-none text-green-700">{t.year}</time>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">{t.title}</h3>
                            <p className="text-gray-600">{t.text}</p>
                            {idx !== timeline.length - 1 && <div className="mt-6" />}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}


export default TimeLine