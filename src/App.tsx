import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Trophy, Stars, Sparkles, RotateCcw, Share2, Twitter, Linkedin, MessageCircle, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  const [yesButtonPos, setYesButtonPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [outcome, setOutcome] = useState<"none" | "yes" | "no">("none");
  const [yesCount, setYesCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const shareText = "I just chose a future-proof career in IT with Jetking! 🚀 #Jetking #ITCareer #Innovation";
  const shareUrl = "https://www.jetking.com"; // Using official site for sharing

  const shareOptions = [
    { 
      name: "Twitter", 
      icon: <Twitter size={20} />, 
      color: "bg-[#1DA1F2]",
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={20} />, 
      color: "bg-[#0077B5]",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: "WhatsApp", 
      icon: <MessageCircle size={20} />, 
      color: "bg-[#25D366]",
      link: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
    }
  ];

  useEffect(() => {
    if (outcome === "yes") {
      const defaults = { startVelocity: 45, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        // Continuous sky shots from random positions
        confetti({ 
          ...defaults, 
          particleCount: 40, 
          origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.2, 0.5) } 
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [outcome]);

  const moveButton = () => {
    const minJump = 100;
    
    // Calculate safe ranges based on viewport size to prevent going off-screen
    const safeWidth = window.innerWidth * 0.6;
    const safeHeight = window.innerHeight * 0.6;
    
    let newX, newY;
    let attempts = 0;
    
    do {
      newX = (Math.random() - 0.5) * safeWidth;
      newY = (Math.random() - 0.5) * safeHeight;
      attempts++;
    } while (
      attempts < 20 &&
      Math.abs(newX - yesButtonPos.x) < minJump && 
      Math.abs(newY - yesButtonPos.y) < minJump
    );

    const newRotate = (Math.random() - 0.5) * 40;
    const newScale = 0.8 + Math.random() * 0.4;

    setYesButtonPos({ x: newX, y: newY, rotate: newRotate, scale: newScale });
    setYesCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setOutcome("yes");
  };

  const handleNo = () => {
    setOutcome("no");
  };

  const handleRefresh = () => {
    setOutcome("none");
    setYesCount(0);
    setYesButtonPos({ x: 0, y: 0, rotate: 0, scale: 1 });
  };

  // Messages that change as they try to click "Yes"
  const getYesText = () => {
    if (yesCount === 0) return "Yes!";
    if (yesCount < 3) return "Catch me!";
    if (yesCount < 6) return "Too slow!";
    if (yesCount < 10) return "Almost there!";
    return "Keep trying! 🚀";
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center overflow-hidden font-sans selection:bg-blue-200">
      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="fixed top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-blue-600 shadow-sm hover:shadow-md hover:bg-white transition-all active:scale-95"
        title="Reset"
      >
        <RotateCcw size={24} />
      </button>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <Stars className="absolute top-10 left-10 text-blue-400 animate-pulse" size={40} />
        <Stars className="absolute bottom-20 right-20 text-blue-400 animate-pulse delay-700" size={30} />
        <Rocket className="absolute top-1/4 right-1/4 text-blue-300 animate-bounce" size={24} />
        <Sparkles className="absolute bottom-1/4 left-1/4 text-blue-300 animate-bounce delay-500" size={32} />
      </div>

      <AnimatePresence mode="wait">
        {outcome === "none" ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-center z-10 p-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8 inline-block"
            >
              <Rocket className="text-blue-600" size={80} />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-12 tracking-tight">
              Do You Want to Join Jetking?
            </h1>
            
            <p className="text-blue-500 text-xl mb-12 italic">The path to your dream IT career!</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative min-h-[100px]">
              <motion.button
                animate={{ 
                  x: yesButtonPos.x, 
                  y: yesButtonPos.y, 
                  rotate: yesButtonPos.rotate,
                  scale: yesButtonPos.scale 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onMouseEnter={moveButton}
                onClick={handleYes}
                className="px-12 py-4 bg-blue-600 text-white rounded-full text-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors z-20 whitespace-nowrap"
              >
                {getYesText()}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={handleNo}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-200 rounded-full text-xl font-semibold shadow-sm hover:shadow-md transition-shadow whitespace-nowrap z-10"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        ) : outcome === "yes" ? (
          <motion.div
            key="success-yes"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-block"
            >
              <Trophy className="text-yellow-500 fill-yellow-200" size={120} />
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-blue-800 mb-6">
              Great Choise! 🚀
            </h2>
            <p className="text-blue-600 text-2xl">Welcome to the world of IT excellence!</p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-100 shadow-xl"
            >
              <h3 className="text-blue-800 text-xl font-bold mb-4 uppercase tracking-widest">Your Future in IT</h3>
              <p className="text-blue-700 leading-relaxed text-lg">
                The IT industry is the engine of global innovation. By choosing this path, 
                you're building a future-proof career where your skills will always be in demand. 
                At Jetking, we don't just teach technology; we empower you to lead the digital revolution. 
                Your journey to becoming an IT expert starts now!
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex justify-center gap-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="text-blue-300" size={24} />
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => setShowShareModal(true)}
              className="mt-12 px-8 py-3 bg-blue-600 text-white rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              <Share2 size={20} />
              Share your success!
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success-no"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-block"
            >
              <Sparkles className="text-green-500" size={120} />
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-green-600 mb-6">
              Congratulations! 🎉
            </h2>
            <p className="text-green-700 text-3xl font-bold tracking-wider">
              AAPKI LIFE SECURE HAI !!
            </p>
            
            <motion.div 
              className="mt-12 flex justify-center gap-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <Stars key={i} className="text-green-400" size={24} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-blue-100"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold text-blue-800 mb-6 pr-8">Share your success!</h3>
              
              <div className="space-y-4">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className={`w-12 h-12 ${option.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-blue-900">{option.name}</div>
                      <div className="text-sm text-blue-500">Share on {option.name}</div>
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareText + " " + shareUrl);
                  alert("Link copied to clipboard!");
                }}
                className="mt-8 w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
              >
                Copy text & link
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
