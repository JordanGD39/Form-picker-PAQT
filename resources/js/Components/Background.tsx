import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

export default function Background(props: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const [triangleHeight, setTriangleHeight] = useState(0);

  //Make the triangle as big as the background with Observer since borderWidth doesn't support %
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setTriangleHeight(entries[0].contentRect.height);
    });

    if (ref.current) {
        observer.observe(ref.current);
    }

    return () => {
        ref.current && observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className='text-white bg-slate-900 min-h-full h-max z-0 absolute w-full'>
        <div style={{borderTopWidth: triangleHeight}} className={`border-r-[70vw] border-[#111d2eaa] border-y-transparent right-0 absolute -z-10`} />
        {props.children}
    </div>
  )
}
