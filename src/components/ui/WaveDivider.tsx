interface WaveDividerProps {
  className?: string;
  height?: string;
}

const WaveDivider = ({ className = "", height = "h-20" }: WaveDividerProps) => {
  return (
    <div className={`relative ${height} bg-background -mt-px ${className}`} aria-hidden="true">
      {/* Layer 1 - darkest (primary color), back layer - highest reach */}
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="absolute top-0 w-full"
        style={{ height: '100%' }}
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z"
          fill="hsl(195, 70%, 28%)"
          fillOpacity="0.06"
        />
      </svg>
      {/* Layer 2 - mid opacity */}
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="absolute top-0 w-full"
        style={{ height: '80%' }}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V24.2C57.1,1.08,156.85,50.82,321.39,56.44Z"
          fill="hsl(195, 70%, 28%)"
          fillOpacity="0.1"
        />
      </svg>
      {/* Layer 3 - solid, front layer - lowest reach */}
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="absolute top-0 w-full"
        style={{ height: '60%' }}
      >
        <path
          d="M985.66,27.17C906.67,48,823.78,89,743.84,105.81c-82.26,17.34-168.06,16.33-250.45-.39-57.84-11.73-114-31.07-172-41.86A600.21,600.21,0,0,0,0,92.65V0H1200V24.2C1132.19,1.08,1055.71,8.69,985.66,27.17Z"
          fill="hsl(195, 70%, 28%)"
          fillOpacity="0.17"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
