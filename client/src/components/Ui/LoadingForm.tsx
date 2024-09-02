import Loading from "./Loading"

const LoadingForm = ()=>{

return <div className="bg-white/70 h-full w-full absolute z-10 top-0 left-0 flex justify-center flex-col">
  <Loading/>
  <h2 className="font-bold -mt-4 ">Fetching user data please wait a while</h2>
</div>}

export default LoadingForm