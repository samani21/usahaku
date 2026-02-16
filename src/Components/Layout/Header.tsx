"use client";
import { getUserInfo } from '@/store/authStore';
import { Bell, ChevronDown, LogOut, Menu, MoreVertical, Search, Settings, User } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setIsMobileActionMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMobileActionMenuOpen: boolean;
  closeMobileActionMenu: () => void;
  handleNotificationClick: () => void;
  handleProfileClick: () => void;
  title: string[];
  handleLogout: () => void;
}

const Header = ({ setIsSidebarOpen, isSidebarOpen, setIsMobileActionMenuOpen, handleNotificationClick, handleProfileClick, isMobileActionMenuOpen, closeMobileActionMenu, title, handleLogout }: Props) => {
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifications = [
    { id: 1, message: 'Pembayaran sebesar $250 berhasil dikirim.', time: '2 menit lalu' },
    { id: 2, message: 'Tagihan listrik jatuh tempo hari ini.', time: '1 jam lalu' },
    { id: 3, message: 'Top-up dompet berhasil.', time: 'Kemarin' }
  ];
  const user = getUserInfo();
  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-[#f7f9fc] sticky top-0 z-10 border-b border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 hidden md:block">{
        title?.map((item) => (
          <span key={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </span>
        ))
      }</h1>

      <button
        className="md:hidden text-gray-600 p-2 rounded-full hover:bg-gray-100"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden md:flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition">
          <Search className="w-5 h-5" />
        </button>
        <button id="notif-btn" onClick={() => setNotifOpen(!notifOpen)} className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {notifOpen && (
          <div id="notif-menu" className="absolute top-16 right-24 bg-white border border-gray-200 rounded-xl shadow-lg w-64 sm:w-72 z-40">
            <div className="p-3 border-b border-gray-200 font-semibold text-gray-800">Notifikasi</div>
            <div className="max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-200 last:border-none">
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium rounded-b-xl">Lihat Semua</button>
          </div>
        )}

        <div className="flex items-center space-x-3" onClick={() => setProfileOpen(!profileOpen)}>
          <div className="text-right hidden sm:block">
            {/* <p className="text-sm font-semibold text-gray-800">{user?.name}</p> */}
          </div>

          {/* <img className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
            src={`https://placehold.co/40x40/cbd5e1/0f172a?text=${user?.name[0] + user?.name[1]}`}
            alt="Avatar"
          /> */}
          <div className='w-[40px] h-[40px] bg-[#cbd5e1] rounded-full'>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
        </div>
      </div>
      {profileOpen && (
        <div id="profile-menu" className="absolute top-16 right-6 bg-white border border-gray-200 rounded-xl shadow-lg w-56 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50">
            <User className="w-4 h-4 mr-3" /> Profil Saya
          </button>
          <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50">
            <Settings className="w-4 h-4 mr-3" /> Pengaturan
          </button>
          <button className="flex items-center w-full p-3 text-red-500 hover:bg-red-50" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-3" /> Keluar
          </button>
        </div>
      )}
      <button
        id="mobile-action-btn"
        className="md:hidden text-gray-600 p-2 rounded-full hover:bg-gray-100"
        onClick={() => setIsMobileActionMenuOpen(!isMobileActionMenuOpen)}
      >
        <MoreVertical className="w-6 h-6" />
      </button>

      <div
        id="mobile-action-menu"
        className={`${isMobileActionMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-[72px] right-4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 w-48 z-20 space-y-2 transform origin-top-right transition-all duration-300 ease-out`}
        style={{ opacity: isMobileActionMenuOpen ? 1 : 0, scale: isMobileActionMenuOpen ? 1 : 0.9 }}
      >

        <button className="flex items-center w-full p-2 text-gray-600 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition font-medium" onClick={closeMobileActionMenu}>
          <Search className="w-5 h-5 mr-3" /> Pencarian
        </button>

        <button
          className="flex items-center w-full p-2 text-gray-600 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition font-medium relative"
          onClick={handleNotificationClick}
        >
          <Bell className="w-5 h-5 mr-3" /> Notifikasi
          <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="border-t pt-2 mt-2 space-y-1">

          <button
            className="flex items-center w-full p-2 text-gray-800 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition font-semibold"
            onClick={handleProfileClick}
          >
            <img className="w-8 h-8 rounded-full object-cover mr-3"
              src="https://placehold.co/40x40/cbd5e1/0f172a?text=LD"
              alt="Avatar"
            />
            Profil (LD)
          </button>

          <button
            className="flex items-center w-full p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition font-medium"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" /> Keluar
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header