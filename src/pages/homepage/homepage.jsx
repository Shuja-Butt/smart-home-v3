import './homepage.css'
import Signin from '../../components/signin.component/signin'
import Signout from '../../components/signout.component/signout'
import {AuthenticatedTemplate,UnauthenticatedTemplate} from '@azure/msal-react'
import HomeRegistrationContainer from '../home_registration_container/home_registration_container'
const HomePage =()=>{
    return (
        <div className="homepage-container">
            <div>
                <h1>A better home is a smart home</h1>
                <UnauthenticatedTemplate>
                    <div className ="buttons-container">
                        <Signin/>
                        <Signout/>
                    </div>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                <HomeRegistrationContainer/>
                </AuthenticatedTemplate>
            </div>
        </div>
    )
}

export default HomePage;