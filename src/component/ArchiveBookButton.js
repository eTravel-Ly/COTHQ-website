import React from "react";
import ContinueReadingSection1 from "../assets/images/ContinueReadingSection1.png";
import { FaRegUserCircle } from "react-icons/fa";
import ContinueReadingSection2 from "../assets/images/ContinueReadingSection2.png";
import ContinueReadingSection3 from "../assets/images/ContinueReadingSection3.png";

const books = [
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection1,
    progress: 90,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection3,
    progress: 80,
  },

  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection2,
    progress: 50,
  },

  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection3,
    progress: 20,
  },

  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection1,
    progress: 70,
  },

  // Add more courses as needed
];

const ArchiveBookButton = () => {
  const rows = [];
  for (let i = 0; i < books.length; i += 3) {
    rows.push(books.slice(i, i + 3));
  }

  return (
    <div className="p-4">
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((book, idx) => (
            <div key={idx} className="w-1/3 p-2"> {/* Changed from w-1/3 to w-1/4 */}
              <div className="bg-white shadow-lg rounded-lg p-3 flex-shrink-0 flex items-center text-right ">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-32 object-cover rounded-lg ml-4"
                />
                <div
                  className="flex-1"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  <h3 className="text-md font-bold mb-1">{book.title}</h3>
                  <p className="text-xs text-gray-500">{book.description}</p> 
                  <div className="flex items-center mt-2 justify-between">
                    <div className="flex ">
                      <FaRegUserCircle
                        className="text-gray-600 ml-2"
   
                      />
                      <p
                        className="text-gray-600 text-xs mb-4" 
                        style={{ fontFamily: "Tajwal, sans-serif" }}
                      >
                        {book.instructor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArchiveBookButton;
