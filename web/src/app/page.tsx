import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Navigation - Glassmorphism */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/20 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
            Discover Evav
          </div>
          <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
            <li className="hover:text-cyan-600 cursor-pointer transition-colors">Beranda</li>
            <li className="hover:text-cyan-600 cursor-pointer transition-colors">Sejarah</li>
            <li className="hover:text-cyan-600 cursor-pointer transition-colors">Budaya</li>
            <li className="hover:text-cyan-600 cursor-pointer transition-colors">Destinasi</li>
          </ul>
          <button className="px-5 py-2 rounded-full bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-500/30">
            Jelajahi
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-100 via-slate-50 to-white -z-10"></div>
        
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-4xl px-6 text-center z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500"></span>
            Menelusuri Jejak Kepulauan Kei
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Simfoni Evav <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-500">
              Peradaban di Atas Pasir Putih
            </span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            Saksikan harmoni sempurna antara alam yang memukau dan kebudayaan luhur yang mengakar kuat di Kepulauan Kei. Sebuah simfoni kehidupan di atas hamparan pasir putih paling halus di dunia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group">
              Mulai Penjelajahan
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="px-8 py-4 rounded-full bg-white text-slate-700 font-medium border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lihat Video
            </button>
          </div>
        </div>

        {/* Decorative Features Section Below Hero */}
        <div className="w-full max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-20">
          {[
            {
              title: "Pasir Paling Halus",
              desc: "Diakui dunia sebagai pantai dengan pasir paling halus seperti tepung, Pantai Ngurbloat.",
              icon: "🏝️"
            },
            {
              title: "Hukum Larvul Ngabal",
              desc: "Mengenal falsafah hidup dan hukum adat yang masih dipegang teguh oleh masyarakat Evav.",
              icon: "⚖️"
            },
            {
              title: "Pesona Bawah Laut",
              desc: "Eksplorasi terumbu karang perawan dan kehidupan laut yang menakjubkan.",
              icon: "🐠"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
