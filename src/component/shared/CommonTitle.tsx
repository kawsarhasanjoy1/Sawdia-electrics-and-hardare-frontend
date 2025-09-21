const CommonTitle = ({
  title: { a, b },
  description,
  classN,
}: {
  title: Record<string, any>;
  description: string;
  classN?: string;
}) => {
  return (
    <div>
      <h2
        className={`${classN} text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center`}
      >
        {a} <span className="text-blue-600">{b}</span>
      </h2>
      <p
        className={`${classN} text-gray-600 max-w-2xl mx-auto mb-12 text-center`}
      >
        {description}
      </p>
    </div>
  );
};

export default CommonTitle;
