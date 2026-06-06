import { CheckCircle2, Clock, Heart, MessageCircle, MoreHorizontal, Plus, Share2, ShoppingBag } from 'lucide-react'
import React from 'react'
import { PostType, StoriesType } from './StoresType';
import { motion } from 'framer-motion';

type Props = {
    isDark: boolean
}

const STORIES: StoriesType[] = [
    { id: 1, storeName: "Kopi Senja", avatar: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=100", seen: false },
    { id: 2, storeName: "Sembako Barokah", avatar: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=100", seen: false },
    { id: 3, storeName: "Batik Jaya", avatar: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=100", seen: true },
    { id: 4, storeName: "Bengkel Pro", avatar: "https://images.unsplash.com/photo-1762604462421-fff920b0c418?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", seen: true },
    { id: 5, storeName: "Dapur Mama", avatar: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=100", seen: false },
];

const PREMIUM_POSTS: PostType[] = [
    {
        id: 1,
        storeName: "Warung Kopi Senja",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
        caption: "Promo Flash Sale! ☕ Beli 1 Gratis 1 khusus varian Kopi Susu Gula Aren mulai jam 16:00 - 18:00 sore ini. Jangan sampai kehabisan lur!",
        time: "2 jam yang lalu",
        likes: "1.2k",
        comments: "45",
        category: "Kuliner",
        isPremium: true
    },
    {
        id: 2,
        storeName: "Toko Sembako Barokah",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
        caption: "Minyak Goreng kemasan 2L ready stok banyak. Harga stabil! Yuk mampir sebelum diborong tetangga sebelah. 🛒 #UMKMLokal",
        time: "5 jam yang lalu",
        likes: "850",
        comments: "12",
        category: "Sembako",
        isPremium: true
    }
];


const StoryCircle = ({ story, isDark }: { story: StoriesType, isDark: boolean }) => (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
        <div className={`p-0.5 rounded-full border-2 ${story.seen ? 'border-zinc-300 dark:border-zinc-800' : 'border-emerald-500'}`}>
            <div className={`w-16 h-16 rounded-full p-1 ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
                <img src={story.avatar} className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform" alt={story.storeName} />
            </div>
        </div>
        <span className={`text-[10px] font-bold truncate w-16 text-center ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{story.storeName}</span>
    </div>
);


const PostCard = ({ post, isDark }: { post: PostType, isDark: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className={`mb-6 rounded-[2.5rem] border overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}
    >
        {/* Post Header */}
        <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500 border-2 border-emerald-500/20 flex items-center justify-center text-white font-black">
                    {post.storeName.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-zinc-800'}`}>{post.storeName}</h4>
                        <CheckCircle2 size={14} className="text-blue-500 fill-blue-500/10" />
                    </div>
                    <p className={`text-[10px] font-bold ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>{post.time} • {post.category}</p>
                </div>
            </div>
            <button className={`p-2 rounded-xl ${isDark ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                <MoreHorizontal size={18} className={isDark ? 'text-zinc-500' : 'text-gray-400'} />
            </button>
        </div>

        {/* Caption */}
        <div className="px-5 pb-3">
            <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>{post.caption}</p>
        </div>

        {/* Post Image */}
        <div className="px-2">
            <img src={post.image} className="w-full aspect-[4/5] object-cover rounded-[2rem]" alt="Promo Content" />
        </div>

        {/* Post Footer / Actions */}
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5 cursor-pointer group">
                        <Heart size={22} className={`transition-colors ${isDark ? 'text-zinc-400 group-hover:text-red-500' : 'text-zinc-700 group-hover:text-red-500'}`} />
                        <span className={`text-xs font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-700'}`}>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 cursor-pointer group">
                        <MessageCircle size={22} className={`transition-colors ${isDark ? 'text-zinc-400 group-hover:text-emerald-500' : 'text-zinc-700 group-hover:text-emerald-500'}`} />
                        <span className={`text-xs font-bold ${isDark ? 'text-zinc-500' : 'text-zinc-700'}`}>{post.comments}</span>
                    </div>
                    <Share2 size={22} className={`cursor-pointer transition-colors ${isDark ? 'text-zinc-400 group-hover:text-blue-500' : 'text-zinc-700 group-hover:text-blue-500'}`} />
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform active:scale-95">
                    <ShoppingBag size={14} /> Ke Toko
                </button>
            </div>
        </div>
    </motion.div>
);
const DailyUpdatePage = ({ isDark }: Props) => {
    return (
        <div className="max-w-xl mx-auto py-6 pb-32">

            {/* Fitur Story Bar */}
            <div className="mb-8 overflow-x-auto no-scrollbar px-4 flex gap-5">
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <button className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-colors ${isDark ? 'border-zinc-700 text-zinc-500 hover:border-emerald-500 hover:text-emerald-500' : 'border-gray-300 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'}`}>
                        <Plus size={24} />
                    </button>
                    <span className={`text-[10px] font-bold ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>Tambah</span>
                </div>
                {STORIES.map(story => <StoryCircle key={story.id} story={story} isDark={isDark} />)}
            </div>

            {/* Postingan Feed */}
            <div className="px-4">
                {/* <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>Update <span className="text-emerald-500">Premium</span></h2>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Terbaru <Clock size={12} />
                    </div>
                </div> */}
                {PREMIUM_POSTS.map(post => <PostCard key={post.id} post={post} isDark={isDark} />)}

                {/* No more posts indicator */}
                <div className="py-10 text-center">
                    <p className={`text-xs font-bold ${isDark ? 'text-zinc-700' : 'text-gray-300'}`}>Kamu sudah melihat semua update hari ini.</p>
                </div>
            </div>

        </div>
    )
}

export default DailyUpdatePage