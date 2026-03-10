// import { useEffect, useState } from "react";

// export default function Timer() {
//   const [seconds, setSeconds] = useState(20 * 60);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setSeconds((s) => (s > 0 ? s - 1 : 0));
//     }, 1000);
//     return () => clearInterval(t);
//   }, []);

//   const m = Math.floor(seconds / 60);
//   const s = seconds % 60;

//   return (
//     <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-semibold">
//       ⏳ Time Remaining: {m}:{s.toString().padStart(2, "0")}
//     </div>
//   );
// }
