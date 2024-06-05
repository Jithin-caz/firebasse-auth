import { useState,useEffect } from "react"
import { collection, query, where, addDoc,getDocs } from "firebase/firestore"; 
import { db } from "./config";
export default function Protected(props:any)
{
  const [users,setUsers]=useState([])
  const [user,setUser]=useState("user")
  const [error, setError] = useState('');

  const fetchUserByName = async (name:string) => {
    setError('');
   
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('No user found');
      } else {
        const userData = querySnapshot.docs[0].data();
        setUser(userData.name);
      }
    } catch (e) {
      console.error("Error fetching user: ", e);
      setError('Error fetching user');
    }
  };

    useEffect(() => {
        const fetchUsers = async () => {
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
         setUsers(usersList)
          console.log(`users are ${usersList}`)
          fetchUserByName("qqq")
        };
    
        fetchUsers();
      });
    const [name,setname]=useState("")
    const [age,setage]=useState("")

    const handlesubmit=async(e:any)=>{
        e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        age: age
      });
      console.log("Document written with ID: ", docRef.id);
      setname('');
      setage('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    }
    return <div>
        <h1>{props.email}</h1>
        <h1>user is {user&& user}</h1>
        <h1 className=" text-black">this is protected</h1>
        <div className=" w-dvw flex items-center justify-center">
         
        <form onSubmit={handlesubmit} action="" className=" border p-5">
            <input onChange={(e)=>setname(e.target.value)} type="text" placeholder="name" className=" w-full"/>
            <input onChange={(e)=>setage((e.target.value))} type="text" placeholder="age" className=" w-full"/>
            <button className=" bg-blue-600 text-white p-2 px-5 rounded-md" type="submit">submit</button>
            </form>
        </div>
        <div>
            {users.length>0?<div>
                {
                    users.map(user=>(<li key={user.id}>{user.name} - {user.age}</li>))
                }
            </div>:<div className=" text-black">loading</div>}
        </div>
       </div>
}