import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import cashIcon from '../assets/images/cash.png'; // استبدل بمسار الصورة الحقيقية
import walletIcon from '../assets/images/wallet.png'; // استبدل بمسار الصورة الحقيقية
import yusrIcon from '../assets/images/yusr.png'; // استبدل بمسار الصورة الحقيقية
import unnamed from '../assets/images/unnamed.png';
function OrderConfirmation() {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-6 max-w-4xl" style={{ direction: 'rtl' }}>
          {/* Order Confirmation Header */}
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">تأكيد الطلب</h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Order Summary Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">ملخص الطلب</h3>
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <span className="text-gray-700">3 عناصر</span>
                <span className="font-bold text-lg">32.5 د.ل</span>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-600">معلومات التوصيل</h4>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-sm">البيت, طرابلس</p>
                    <p className="text-sm">أروي عبدالرحمن أبوزقية</p>
                    <p className="text-sm">911120701</p>
                  </div>
               {/**<button className="text-orange-600 text-sm">تعديل</button> */}   
                </div>
              </div>
            </div>

            {/* Payment Options Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">طريقة الدفع</h3>
              <div className="space-y-4">
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
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <label htmlFor="cash" className="mr-3 flex items-center">
                      <img src={cashIcon} alt="Cash" className="ml-2 h-8 w-8" />
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
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="wallet" className="mr-3 flex items-center">
                      <img src={walletIcon} alt="Wallet" className="ml-2 h-8 w-8" />
                      محفظة
                    </label>
                  </div>
                  <span className="text-gray-500 text-sm">رصيد المحفظة: 0.5 د.ل</span>
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
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="yusr-online" className="mr-3 flex items-center">
                      <img src={yusrIcon} alt="Yusr Online" className="ml-2 h-8 w-8" />
                      السداد 
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yusr-online"
                      name="payment-method"
                      value="unnamed"
                      checked={paymentMethod === 'unnamed'}
                      onChange={handlePaymentChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="yusr-online" className="mr-3 flex items-center">
                      <img src={unnamed} alt="Yusr Online" className="ml-2 h-8 w-8" />
                      موبي كاش 
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className="mt-6 text-center">
            <button className="bg-custom-orange text-white py-3 px-8 rounded-full font-semibold text-lg w-full md:w-auto">
              إنشاء طلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
