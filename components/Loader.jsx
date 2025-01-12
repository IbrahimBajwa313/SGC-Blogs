// // components/Loader.js
// export default function Loader() {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }
  
// Dual Ring
// export default function Loader() {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="h-16 w-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
//     </div>
//   );
// }

//WaveLoader
// export default function Loader() {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="flex space-x-2">
//         <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//         <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
//         <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
//       </div>
//     </div>
//   );
// }
export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-16 w-16 bg-blue-500 rounded-full animate-ping transition-all duration-500 ease-in-out"></div>
    </div>
  );
}

