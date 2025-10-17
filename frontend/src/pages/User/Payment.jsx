import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, Hourglass } from "lucide-react"; // icon từ lucide-react
import { useSearchParams } from "react-router-dom";
import { formatNumber } from "../../utils/helper";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";
import axiosInstance from "../../utils/axiosIntence";
import Loading from "../../components/Loading";
import { API_PATHS } from "../../utils/apiPaths";

export default function PaymentPage() {
  const [loading, setLoading] = useState(true);
  const { navigate } = useAppContext();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const amount = searchParams.get("amount");
  const totalTime = 600; // 10 phút = 600 giây
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [bankAccount, setBankAccount] = useState(totalTime);
  const [status, setStatus] = useState("pending");
  let intervalDetail;
  // Tính thời gian còn lại dựa trên createdAt
  const calculateTimeLeft = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - createdTime) / 1000);
    const remaining = totalTime - elapsedSeconds;
    return remaining > 0 ? remaining : 0;
  };
  const getDataSepay = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.PAYMENT.GET_SEPAY);
      console.log(data);
      if (data.success) {
        setBankAccount(data.bankaccount);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!loading) {
      if (timeLeft <= 0) {
        toast.error("Thanh toan that bat");
        navigate("/bookings");
        return;
      }
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  // Lấy data booking 1 lần duy nhất lúc mount để lấy createdAt và status
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axiosInstance.get(
          API_PATHS.BOOKINGS.GET_BOOKING_BY_ID(id)
        );
        if (data.success) {
          setStatus(data.booking.status);
          const remaining = calculateTimeLeft(data.booking.createdAt);
          setTimeLeft(remaining);
          setLoading(false);
        } else {
          toast.error("Lấy thông tin booking thất bại");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi lấy thong tin booking");
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);
  // 🔄 Polling check trạng thái mỗi 5 giây
  useEffect(() => {
    intervalDetail = setInterval(async () => {
      try {
        const { data } = await axiosInstance.get(
          API_PATHS.BOOKINGS.GET_BOOKING_BY_ID(id)
        );
        if (data.success) {
          setStatus(data.booking.status); // ví dụ: pending | success | failed
          if (data.booking.status === "success") {
            clearInterval(intervalDetail); // dừng polling khi thanh toán xong
            toast.success("Thanh toan thanh cong");
            navigate("/bookings");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }, 5000);

    return () => clearInterval(intervalDetail);
  }, [id, navigate]);

  useEffect(() => {
    getDataSepay();
  }, []);
  const percent = (timeLeft / totalTime) * 100;

  // format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return !loading ? (
    <div className="min-h-screen bg-black mt-20 mb-10 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-[#1a1a1a] text-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-700 p-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">Thông Tin Thanh Toán</h1>
            <span className="text-sm font-mono">{formatTime}</span>
          </div>
          {/* Thanh tiến trình */}
          <div className="w-full mt-1 bg-green-500">
            <div className="relative h-2 bg-gray-700 rounded">
              <div
                className="absolute top-0 left-0 h-2 bg-white rounded transition-all duration-1000 ease-linear"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-4 text-lg font-semibold">
              Quét Mã QR Để Thanh Toán
            </h2>
            <div className="relative w-59 h-59 bg-black border-3 border-red-800 rounded-md flex items-center justify-center">
              <ChevronLeftIcon className="w-10 h-10 text-red-500 rotate-45 absolute top-0 left-0 -translate-5" />
              <ChevronLeftIcon className="w-10 h-10 text-red-500 rotate-135 absolute top-0 right-0 translate-5 -translate-y-5" />
              <ChevronLeftIcon className="w-10 h-10 text-red-500 -rotate-45 absolute bottom-0 left-0 -translate-x-5 translate-y-5" />
              <ChevronLeftIcon className="w-10 h-10 text-red-500 -rotate-135 absolute bottom-0 right-0 translate-5" />
              <div className=" rounded-md p-2 bg-white">
                <img
                  src={`${
                    import.meta.env.VITE_QR_CODE_SEPAY
                  }amount=${amount}&des=${id}`}
                  alt="QR Code"
                  className="w-50 h-50"
                />
              </div>
              {/* Thanh quét đỏ */}
              <div className="scan-line"></div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Chi Tiết Thanh Toán</h2>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Ngân hàng</p>
              <p className="font-bold text-red-500">
                {bankAccount.bank_short_name}
              </p>
              <p className="mt-2 text-sm text-gray-400">Chủ Tài Khoản</p>
              <p className="font-bold">{bankAccount.account_holder_name}</p>
              <p className="mt-2 text-sm text-gray-400">Số Tài Khoản</p>
              <p className="font-mono">{bankAccount.account_number}</p>
              <p className="mt-2 text-sm text-gray-400">Số Tiền</p>
              <p className="font-bold text-green-400">
                {formatNumber(amount)} vnd
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Nội Dung Chuyển Khoản
              </p>
              <p className="font-mono text-xs break-all">{id}</p>
              <div className="mt-4 border-t border-gray-700 pt-2 flex justify-between">
                <span className="font-semibold">Tổng Tiền</span>
                <span className="text-red-500 font-bold">
                  {formatNumber(amount)} vnd
                </span>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-red-900/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Cách thanh toán</h3>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Mở ứng dụng ngân hàng của bạn</li>
                <li>
                  Quét mã QR hoặc sử dụng nút "Mở trong Ứng dụng Ngân hàng"
                </li>
                <li>
                  Nhập chính xác nội dung chuyển khoản:
                  <span className="font-mono text-xs">{id}</span>
                </li>
                <li>Hoàn tất thanh toán</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer with hourglass spinner */}
        <div className="bg-gray-800 p-4 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
          <Hourglass className="w-5 h-5 animate-spin text-red-500" />
          <span>Đang chờ thanh toán của bạn...</span>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
