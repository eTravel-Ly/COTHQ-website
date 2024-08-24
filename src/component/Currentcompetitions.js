import React from "react";


const Currentcompetitions = () => {
  const contests = [
    {
      id: 1,
      title: "مسابقة البرمجة",
      description: "اختبر مهاراتك في البرمجة مع هذه المسابقة.",
      date: "2024-09-01",
    },
 
  ];

  return (
    <div className="p-4 ">
      {contests.map((contest) => (
        <div
          key={contest.id}
          className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-2">{contest.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{contest.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            تاريخ المسابقة: {contest.date}
          </p>
          <button className="bg-custom-orange text-white py-2 px-4 rounded-full font-semibold text-base">
            بدء المسابقة
          </button>
        </div>
      ))}
    </div>
  );
};

export default Currentcompetitions;
