import React from 'react'

const ThemeSection = () => {
    return (
        <section id="themes" className="py-20 md:py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-[var(--primary-color)] text-3xl font-semibold uppercase tracking-widest">Tema Katalog Responsif</h2>
                    <p className="text-xl text-center text-gray-500 mb-16 max-w-2xl mx-auto">Pilih tema sesuai kebutuhan — produk, jasa, atau gabungan keduanya.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform hover:scale-[1.02] transition duration-300">
                        <div className="h-40 w-full rounded-xl p-4 flex flex-col justify-between" style={{ backgroundColor: '#f8f8f8', border: '1px solid #eee' }}>
                            <div className="flex justify-between items-center">
                                <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
                                    <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></div>
                                </div>
                            </div>
                            <div className="h-2 w-3/4 bg-gray-300 rounded-full mb-2"></div>
                            <div className="h-10 rounded-lg bg-white shadow-inner border border-gray-100"></div>
                        </div>
                        <h4 className="text-lg font-semibold mt-4 text-gray-800 text-center">Light Theme</h4>
                    </div>

                    <div className="bg-[var(--dark-bg)] p-6 rounded-2xl shadow-xl border border-gray-700 transform hover:scale-[1.02] transition duration-300">
                        <div className="h-40 w-full rounded-xl p-4 flex flex-col justify-between" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                            <div className="flex justify-between items-center">
                                <div className="w-10 h-2 bg-gray-500 rounded-full"></div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
                                    <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></div>
                                </div>
                            </div>
                            <div className="h-2 w-3/4 bg-gray-500 rounded-full mb-2"></div>
                            <div className="h-10 rounded-lg bg-[#0f172a] shadow-inner border border-gray-700"></div>
                        </div>
                        <h4 className="text-lg font-semibold mt-4 text-white text-center">Dark Theme</h4>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform hover:scale-[1.02] transition duration-300">
                        <div className="h-40 w-full rounded-xl p-4 flex flex-col justify-between bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--secondary-color)]/20 border border-[var(--secondary-color)]/50">
                            <div className="flex justify-between items-center">
                                <div className="w-10 h-2 bg-[var(--secondary-color)] rounded-full"></div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
                                    <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></div>
                                </div>
                            </div>
                            <div className="h-2 w-3/4 bg-[var(--primary-color)] rounded-full mb-2"></div>
                            <div className="h-10 rounded-lg bg-white shadow-xl border border-[var(--primary-color)]/50"></div>
                        </div>
                        <h4 className="text-lg font-semibold mt-4 text-gray-800 text-center">Colorful Theme</h4>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ThemeSection