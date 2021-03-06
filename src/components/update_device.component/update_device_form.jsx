import React,{useState}  from 'react'
import {useMsal,useAccount} from '@azure/msal-react'
import { InteractionRequiredAuthError} from "@azure/msal-browser"
import { useNavigate } from 'react-router-dom';
import {protectedResources} from '../../authConfig'
import {useParams,useLocation} from 'react-router-dom'; 
import './update_device_form.css'
import 'tachyons'




const UpdateDeviceForm = ({upDateDevices})=> {

 
  const { instance, accounts, inProgress } = useMsal();
  const  {category}= useParams();
  const {state} = useLocation();
  const navigate = useNavigate();

  console.log(state,"statatstst")
  
  const account = useAccount(accounts[0] || {});


  const [deviceInfo,setDeviceInfo] = useState({
    name:state.name,
    description:state.description,
    // category:"lightning",
    // user,
    // status
    type:state.type,
    // ip:""//may be later
    
})


 const  onInputChange=(event)=>{
    setDeviceInfo({...deviceInfo,[event.target.name]:event.target.value})
  }

 const handleSubmit=async (event)=>{


  if (account && inProgress === "none" ) {
    // aquare an access token to access the express-api that will be used as 
    // bearer token to request the api
    instance.acquireTokenSilent({
        scopes: protectedResources.smartHomeAPI.scopes,//scopes for protected API
        account: account// get access token for this account
    }).then((response) => {

        console.log(response,"see the response")

        // window.alert(`access token recieved ${response.accessToken}`);

        fetch(`https://smart-home-controller-api.herokuapp.com/devices/${category}/${state.id}`,{

            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'authorization':`Bearer ${response.accessToken}`
            },
            body:JSON.stringify({...state,name:deviceInfo.name,description:deviceInfo.description,type:deviceInfo.type})

        
        }).then(res=>{

          console.log("res is retured",res)
        
        return   res.json()
        })
        .then(data=>
          
          
         { 
           console.log(data,"update data is")
           
          upDateDevices(data)
          navigate(-1)
         
        
        
        
        }
          
          
          )
        .catch(err=>console.log(err))


        // callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
        //     .then(response => setHelloData(response));



    }).catch((error) => {
        //if acquireTokenSilent fails then it requires interactive methods to get the access token
        if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
                instance.acquireTokenPopup({
                    scopes: protectedResources.smartHomeAPI.scopes,
                }).then((response) => {
                    // callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                    //     .then(response => setHelloData(response));
                    console.log("Call the Express API")
                }).catch(error => console.log(error));
            }
        }
        console.log(error)

       

    });
}

  }

    
        return(
        <div className="custom">
        <article style={{backgroundColor: '#FFFFFF',flexDirection:'column'}}className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center ">
        <span  onClick={()=>navigate(-1)} className="cross">&Chi;</span>
        <main className="pa4 black-80" style={{paddingTop:0}}>
          <div className="measure">
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value = {deviceInfo.name}
                  onChange={onInputChange}
             
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="age">Description</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="description"
                  id="age"
                  value = {deviceInfo.description}
                  onChange={onInputChange}
             
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Type</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="type"
                  id="pet"
                  value={deviceInfo.type}
                  onChange={onInputChange}
                />
              </div>

            <div className="buttons_container">
            <div className="Update">
              <input
                className="b ph3 pv2 input-reset ba  grow pointer f6 dib"
                type="submit"
                value="Update"
                onClick={handleSubmit}
              />
            </div>
            
            <div className="Cancel">
              <input
                className="b ph3 pv2 input-reset ba   grow pointer f6 dib"
                type="submit"
                value="Cancel"
                onClick={()=>navigate(-1)}
              />
            </div>
            </div>
          </div>
        </main>
      </article>
      </div>
        )
    


}


export default UpdateDeviceForm;




















