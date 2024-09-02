import { useState,FocusEvent, useEffect } from "react"
import Loading from "./Loading"

const SelectInput = ({
    dataList,
    value,
    setValue,
    onChange,
    isLoading,
    totalItem,
    searchName,
    keyNameArr=[
     'name',
     'code',
     'dial_code'
    ]
})=>{

    const [isOpen,setIsOpen] = useState(false)

    const hnadleOpen=(e:FocusEvent<HTMLInputElement>)=>{
      if(e.target.id==='open-select-input-34424'){
        setIsOpen(true)
      }
    }

      useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (
            !target.closest("#open-select-input-34424")
          ) {
            setIsOpen(false);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);

    return <div   id='open-select-input-34424' className="relative h-fit">
        <input id='open-select-input-34424' className="p-2 rounded w-full border mb-0.5"
         onFocus={hnadleOpen} value={searchName} onChange={(e)=>onChange(e.target.value)}
        />
        <div  id='open-select-input-34424'  className={`absolute shadow-xl rounded   border-white  top-full left-0 w-full bg-white duration-200 ${isOpen?'max-h-64 overflow-y-scroll mb-12 pt-2 px-1 border-2':'h-0 overflow-hidden'}`}>
          
         { !isLoading?dataList?.map((el)=><div onClick={()=>{setValue(el)}} 
         className={`flex  cursor-pointer mb-2 p-2 rounded-md  duration-200 ${value===el?'bg-blue-500 text-white':'hover:bg-gray-100'}`}>
            <span  >
            {
               keyNameArr.map((KeyName)=><span >{el?.[KeyName]},</span>)
            }
          </span>
          <img src={el.img} alt="" width={40} className="ml-auto border rounded" />
          <span>
          </span>

            </div>):<Loading/>        
            }
            {!!totalItem||<p className="font-semibold mb-2">No matched countries found.</p>}
        </div>
    </div>
}

export default SelectInput