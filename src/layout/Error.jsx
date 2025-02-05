

export default function Error({message}) {
  return (
    <div>
      <h1 className='text-red-800 font-bold md:font-semibold font-sans md:text-xl text-xs'>{message}</h1>
    </div>
  )
}

