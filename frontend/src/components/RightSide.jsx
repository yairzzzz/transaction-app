import { Bitcoin } from "lucide-react";

const RightSide = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center px-10 overflow-hidden bg-base-200">
      {/* Fullscreen icon layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Bitcoin
            key={i}
            className="absolute text-primary/20 fall"
            style={{
              top: `-50px`, // start off-screen
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.floor(Math.random() * 24) + 20}px`,
              animationDuration: `${4 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="z-10 text-center max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Welcome to MalakaCoin
        </h2>
        <p className="text-base-content text-lg">
          Track real-time crypto prices, analyze live charts, and never miss a
          market move.
          <br />
          <span className="text-base-content/70">
            MalakaCoin brings the power of the market straight to your screen —
            fast, simple, and secure.
          </span>
        </p>
      </div>
    </div>
  );
};

export default RightSide;
