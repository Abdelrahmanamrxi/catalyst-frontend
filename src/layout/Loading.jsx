
export default function Loading({height}) {

  return (
    <div className={`loader-container`} style={{ height: height ? `${height}vh` : '100vh' }}>
    <div className='loader'>
    </div>
    <h1 className='mt-3 font-sans font-semibold text-md'>Loading..</h1>
      
    </div>
  )
}
