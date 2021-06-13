// import { useEffect, useState } from "react";

// export const useResize = (myRef) => {
//   const getDimensions = () => ({
//     width: myRef.current.offsetWidth,
//     height: myRef.current.offsetHeight,
//   });

//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions(getDimensions());
//     };

//     if (myRef.current) {
//       setDimensions(getDimensions());
//     }

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [myRef]);

//   return dimensions;
// };

// // const MyComponent = () => {
// //   const componentRef = useRef()
// //   const { width, height } = useContainerDimensions(componentRef)

// //   return (
// //     <div ref={componentRef}>
// //       <p>width: {width}px</p>
// //       <p>height: {height}px</p>
// //     </div>
// //   )
// // }
