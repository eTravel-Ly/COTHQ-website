import React from "react";
import allContests from "../assets/images/allContests.jpg";

const MyContests = () => {
  const contests = [
    {
      id: 1,
      title: "مسابقة حفظ القرآن الكريم",
      description: "تنافس في حفظ أجزاء من القرآن الكريم وتقديمها.",
      image: allContests,
      result: "المرتبة الأولى",
    },
    {
      id: 2,
      title: "مسابقة السيرة النبوية",
      description: "اختبر معلوماتك حول حياة النبي محمد صلى الله عليه وسلم.",
      image: allContests,
      result: "المرتبة الثانية",
    },
   
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {contests.map((contest) => (
          <div key={contest.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
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
                  <p className="text-sm text-gray-500 ">
                    <strong className="font-bold" >نتيجة المسابقة:</strong> {contest.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContests;
