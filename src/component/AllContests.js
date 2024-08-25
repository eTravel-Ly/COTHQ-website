import React from "react";
import allContests from "../assets/images/allContests.jpg";

const AllContests = () => {
const contests = [
  {
    id: 1,
    title: "مسابقة حفظ القرآن الكريم",
    description: "تنافس في حفظ أجزاء من القرآن الكريم وتقديمها.",
    date: "2024-10-01",
    image: allContests,
  },
  {
    id: 2,
    title: "مسابقة السيرة النبوية",
    description: "اختبر معلوماتك حول حياة النبي محمد صلى الله عليه وسلم.",
    date: "2024-10-15",
    image: allContests,
  },
  {
    id: 3,
    title: "مسابقة الفقه الإسلامي",
    description: "تنافس في فهم وتطبيق قواعد الفقه الإسلامي.",
    date: "2024-11-01",
    image: allContests,
  },
];

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {contests.map((contest) => (
          <div key={contest.id} className="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex">
              {/* Contest Image */}
              <img
                src={contest.image}
                alt={contest.title}
                className="h-24 w-24 object-cover rounded-lg ml-6 my-4"
              />
              {/* Contest Information */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {contest.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {contest.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    تاريخ المسابقة: {contest.date}
                  </p>
                </div>
                <button className="bg-custom-orange text-white py-2 px-4 rounded-full font-semibold text-base self-start">
                  بدء المسابقة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContests;
