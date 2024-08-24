import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import cashIcon from '../assets/images/cash.png'; // استبدل بمسار الصورة الحقيقية
import walletIcon from '../assets/images/wallet.png'; // استبدل بمسار الصورة الحقيقية
import yusrIcon from '../assets/images/yusr.png'; // استبدل بمسار الصورة الحقيقية
import unnamed from '../assets/images/unnamed.png'; // استبدل بمسار الصورة الحقيقية

function OrderConfirmation() {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-full lg:w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4 sm:p-6 max-w-full lg:max-w-4xl" style={{ direction: 'rtl' }}>
          {/* Order Confirmation Header */}
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">تأكيد الطلب</h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Order Summary Section */}
            <div className="bg-blues p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">ملخص الطلب</h3>
              <div className="flex justify-between items-center border-b pb-2 mb-3 sm:mb-4">
                <span className="text-gray-700 text-sm sm:text-base">3 عناصر</span>
                <span className="font-bold text-md sm:text-lg">32.5 د.ل</span>
              </div>
              <div className="mb-3 sm:mb-4">
                <h4 className="font-medium text-gray-600 text-sm sm:text-base">معلومات التوصيل</h4>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm sm:text-base">
                    <p>البيت, طرابلس</p>
                    <p>أروي عبدالرحمن أبوزقية</p>
                    <p>911120701</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">طريقة الدفع</h3>
              <div className="space-y-3 sm:space-y-4">
                {/* Payment Option Item */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="payment-method"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={handlePaymentChange}
                      className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-green-600"
                    />
                    <label htmlFor="cash" className="mr-3 flex items-center text-sm sm:text-base">
                      <img src={cashIcon} alt="Cash" className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
                      نقداً
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="wallet"
                      name="payment-method"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={handlePaymentChange}
                      className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                    />
                    <label htmlFor="wallet" className="mr-3 flex items-center text-sm sm:text-base">
                      <img src={walletIcon} alt="Wallet" className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
                      محفظة
                    </label>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">رصيد المحفظة: 0.5 د.ل</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yusr-online"
                      name="payment-method"
                      value="yusr-online"
                      checked={paymentMethod === 'yusr-online'}
                      onChange={handlePaymentChange}
                      className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                    />
                    <label htmlFor="yusr-online" className="mr-3 flex items-center text-sm sm:text-base">
                      <img src={yusrIcon} alt="Yusr Online" className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
                      السداد
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="mobicash"
                      name="payment-method"
                      value="unnamed"
                      checked={paymentMethod === 'unnamed'}
                      onChange={handlePaymentChange}
                      className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                    />
                    <label htmlFor="mobicash" className="mr-3 flex items-center text-sm sm:text-base">
                      <img src={unnamed} alt="MobiCash" className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
                      موبي كاش
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className="mt-6 text-center">
            <button className="bg-custom-orange text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg w-full md:w-auto">
              إنشاء طلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
