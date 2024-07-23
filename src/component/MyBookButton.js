import React from "react";
import ContinueReadingSection1 from "../assets/images/ContinueReadingSection1.png";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
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
    image: ContinueReadingSection1,
    progress: 80,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection1,
    progress: 50,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: ContinueReadingSection1,
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

const MyBookButton = () => {
  const navigate = useNavigate();
  const openBook = () => {
    navigate('/ReadBooks');
  };
  // Split courses into rows of 4
  const rows = [];
  for (let i = 0; i < books.length; i += 4) {
    rows.push(books.slice(i, i + 4));
  }

  return (
    <div className="p-4"  onClick={openBook}>
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((book, idx) => (
            <div key={idx} className="w-1/4 p-2">
              <div className="bg-white shadow-lg rounded-lg p-4 flex-shrink-0 flex items-center text-right">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-32 object-cover rounded-lg ml-4"
                />
                <div
                  className="flex-1"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.description}</p>
                 
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">نسبة التقدم</p>
                    <p className="text-sm text-custom-orange font-bold">
                      {book.progress}%
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-custom-orange h-2.5 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    ></div>
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

export default MyBookButton;
