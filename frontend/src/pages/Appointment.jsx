import { useParams } from "react-router-dom"
import { useContext , useState , useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/assets"
import RelatedDoctors from "../components/RelatedDoctors"


const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbol} = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [ docInfo , setDocInfo ] = useState(null);
  const [ docSlots, setDocSlots ] = useState([]);
  const [ slotIndex, setSlotIndex ] = useState(0);
  const [ slotTime, setSlotTime ] = useState('');

  const fetchDocInfo = async() => {
    const doctorInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(doctorInfo);
  }

  const getAvailableSlots = async() => {
    setDocSlots([]);

    //creating date object to get current date and time
    let today = new Date();

    for(let i = 0; i < 7; i++){

      //creating date object for each day
      let currentDate = new Date(today);
      //setting only the date for currentDate object.Here we can also write currentDate instead of today
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      //setting date for endTime object to represent date for each day
      endTime.setDate(today.getDate() + i);
      //setting time for endTime object to represent the end time for each day
      endTime.setHours(21,0,0,0);

      //setting initial start time for each day
      if(today.getDate() === currentDate.getDate()){
        // Check if the time is before 9:00 AM
        if (currentDate.getHours() < 9) {
            // If it's before 9 AM, set the time slot to 10:00 AM, regardless of the minutes
            currentDate.setHours(10);
            currentDate.setMinutes(0);
        } else  {
            currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10);
            currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
          }
      } else {
        //as from current date , slots of 6 more days is also showing so for that 6 days the initial time will be 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      //created array to store all time slots for current day
      let timeSlots = [];

      // here only the time property will be compared as date property for both object is same
      while(currentDate < endTime){

        //setting particular format of the currentDate object
        let formattedTime = currentDate.toLocaleTimeString([], { hour : '2-digit', minute : '2-digit' });

        //add slot to array
        timeSlots.push({
          //datetime object will contains the time set by if loop and date set by 2nd statement in the main for loop
          datetime : new Date(currentDate),
          time : formattedTime
        })
         
        //increment current time by 30 minutes to create next slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      //here prev is used to ensures that the time slots from each iteration(for each day) are added to existing iteration(current day)
      setDocSlots(prev => ([...prev, timeSlots]));
    }
  }

  useEffect(() => {
    fetchDocInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[doctors , docId])


  useEffect(() => {
    getAvailableSlots();
  },[docInfo])

  useEffect(() => {
    console.log(docSlots);
  },[docSlots])


  return  docInfo && (
    <div>
      {/*-------------Doctors detials------------*/}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt=""/>
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
           {/*----------Doc Info : name, degree, experience------------*/}
           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt=""/>
           </p>
           <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{docInfo.degree}-{docInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
           </div>
           {/*-----------Doctor About-----------*/}
           <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About
              <img src={assets.info_icon} alt=""/>
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
           </div>
           <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{currencySymbol} {docInfo.fees}</span>
           </p>
        </div>
      </div>
      {/*-----------Booking slots----------*/}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p className="">Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {
              docSlots.length && docSlots.map((item,index) => (
                <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                  <p >{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length && docSlots[slotIndex].map((item,index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p> 
            ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
      </div>
      {/*----------Related Doctors-----------*/}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment