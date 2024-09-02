import noDataFound from '../../assets/No_Data_Found.svg'

const NoDataAvailable = ({size})=>{
    return <div className="h-fit w-full  flex justify-center flex-col items-center">
        <img src={noDataFound} width={size||'250px'}/>
        <p className={size?'font-[500]  text-sm':'font-[500]'}>No Data Available 204</p>
    </div>
}

export {NoDataAvailable}