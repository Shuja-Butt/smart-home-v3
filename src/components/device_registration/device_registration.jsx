
import { useState, useEffect } from 'react';
import './device_registration.css';
import { useMsal, useAccount } from '@azure/msal-react'
import { Routes, Route } from 'react-router-dom';
// import {devices} from '../../mockdata';
import { useParams } from 'react-router-dom';
import CustomButton from '../custombutton.component/custombutton'
import { protectedResources } from '../../authConfig'
import Modal from '../modal.component/modal'
// import AddDeviceForm from '../../components/add_device.component/add_device'
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import AddDeviceForm from '../add_device.component/add_device_form';
import UpdateDeviceForm from '../update_device.component/update_device_form';
import RemoveDeviceForm from '../remove_device.component/remove_device_form';
import { useNavigate } from "react-router-dom";



import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';







const DeviceRegistration = () => {

    //useParams hook to access the query parameter in urlor route
    const { category } = useParams()
    const [devices, setDevices] = useState([])
    console.log(devices,"devices are")

   


    const { instance, accounts, inProgress } = useMsal();


    const account = useAccount(accounts[0] || {});
    const navigate = useNavigate();

    // console.log("account is",account,"useAccount hook")
    // console.log("accounts is",accounts)




    const renderUpdateForm = (deviceData) => {
        navigate('configure', { state: deviceData })
    }
    const renderAddDeviceForm = () => {
        navigate('add')
    }
    const renderDeleteForm = (deviceData) => {
        navigate('remove', { state: deviceData }


        )
    }


   const  sendEventSchedule=(e,deviceData)=>{

        instance.acquireTokenSilent({
            scopes: protectedResources.smartHomeAPI.scopes,//scopes for protected API
            account: account// get access token for this account
        }).then((response) => {

        fetch(`https://smart-home-controller-api.herokuapp.com/schedule/`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${response.accessToken}`
            }
            ,
            body:JSON.stringify({
                device:deviceData,
                id:e.target.getAttribute('deviceId')
            })


        }).then(res=>console.log('res'))



    })
       
        //    let darray= devices.filter(device=>device.name===name)
        //    darray[0].schedule =time
        //    let aarray = devices.filter(device=>device.name!==name)

         
        //   setDevices([...darray,...aarray])
        
    


        
    }

    const  scheduleEvent =(time,arg_device,deviceId)=>{


       setDevices( devices.map(device=>{

            if(device.name===arg_device.name){
                device.schedule= time.toString()
            }

            return device



        }))


        
      



       






    }










    const callDeviceMethod = (e, deviceData) => {
        console.log(deviceData,"io",`Device${e.target.getAttribute('deviceId')}${e.target.innerHTML.toLowerCase()}`)

        let uri = 'https://smart-home-controller-api.herokuapp.com/devices/'
        let methodname = 'method1'
        // console.log(deviceData.name, "see the device data", e.target.innerHTML)
        // if (deviceData.name === 'Led1' && e.target.innerHTML === 'On') {
        //     methodname = 'method1'
        // }
        // else if (deviceData.name === 'Led1' && e.target.innerHTML === 'Off') {
        //     methodname = 'method2'
        // }
        // else if (deviceData.name === 'Led2' && e.target.innerHTML === 'On') {
        //     methodname = 'method3'
        // }
        // else if (deviceData.name === 'Led2' && e.target.innerHTML === 'Off') {
        //     methodname = 'method4'
        // }
        // else if (deviceData.name === 'Led3' && e.target.innerHTML === 'On') {
        //     methodname = 'method5'
        // }
        // else if (deviceData.name === 'Led3' && e.target.innerHTML === 'Off') {
        //     methodname = 'method6'
        // }

        uri = uri + methodname
        console.log(uri, "uri is")

        instance.acquireTokenSilent({
            scopes: protectedResources.smartHomeAPI.scopes,//scopes for protected API
            account: account// get access token for this account
        }).then((response) => {

            fetch(uri, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${response.accessToken}`
                },
                body: JSON.stringify({
                    methodParams: {
                        methodName: methodname,
                        payload: `Device${e.target.getAttribute('deviceId')}${e.target.innerHTML.toLowerCase()}`,//Device1on
                        responseTimeoutInSeconds: 30, // set response timeout as 15 seconds
                        deviceData

                    }
                })


            }).then(res => res.json())
                .then(data => console.log(data))


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







    useEffect(() => {

        console.log("device registarrtion is called useEffect")

        if (account && inProgress === "none") {
            // aquare an access token to access the express-api that will be used as 
            // bearer token to request the api
            instance.acquireTokenSilent({
                scopes: protectedResources.smartHomeAPI.scopes,//scopes for protected API
                account: account// get access token for this account
            }).then((response) => {

                console.log(response, "see the response")

                // window.alert(`access token recieved ${response.accessToken}`);

                fetch(`https://smart-home-controller-api.herokuapp.com/devices/${category}`, {

                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${response.accessToken}`
                    }


                }).then(res => res.json())
                    .then(data => setDevices(data))


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
    }, [account, inProgress, instance]);







    return (


        // Object.keys(currentDevices).length?

        <div className="device-registartion-container">
            <div className="homeregistration-heading-container">
                <h1>{category}</h1>
            </div>

            <div className='device-card-container'>

            {
                devices.map((device,index) => {
                    return <div className="device-registartion">
                        <img src="https://images.unsplash.com/photo-1597809259188-0e5ffcbb0ba9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt=""/>

                  
                        <div className='card'>
                        <div className="device-registartion-title-container">
                            <span>{device.name}</span>
                        </div>
             
                               
                                <CustomButton onClick={() => renderDeleteForm(device)} remove={true}>Remove </CustomButton>
                                <CustomButton onClick={() => renderUpdateForm(device)} configure={true}  >Configure</CustomButton>
                                 <div class='power-options-container'>
                                <CustomButton onClick={(e) => callDeviceMethod(e, device)}   deviceId ={index+1}  >On</CustomButton>
                                <CustomButton onClick={(e) => callDeviceMethod(e, device)} deviceId ={index+1}  >Off</CustomButton>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label={`Select Schedule Time`}
                                    value={device.schedule}
                                    onChange={(newValue) => {
                                    scheduleEvent(newValue,device,(index+1))
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                                <CustomButton onClick={(e) => sendEventSchedule(e, device)} deviceId ={index+1}  >Schedule</CustomButton>
                         

                         
                        </div>
                    </div>
                })
            }
            </div>


            <CustomButton onClick={() => renderAddDeviceForm()} name="add_a_device" addDevice={true}>
                Add a new device
            </CustomButton>
            <Routes>
                <Route path="/add" element={<Modal><AddDeviceForm upDateDevices={setDevices} /></Modal>} />
                <Route path="/remove" element={<Modal><RemoveDeviceForm upDateDevices={setDevices} /></Modal>} />
                <Route path="/configure" element={<Modal><UpdateDeviceForm upDateDevices={setDevices} /></Modal>} />
            </Routes>
        </div>




    )
}

export default DeviceRegistration;