import { Routes, Route } from 'react-router-dom'
import DeviceCategoriesContainer from '../../components/device_categories/device_categories'
import DeviceRegistration from '../../components/device_registration/device_registration'






const HomeRegistrationContainer = () => {

    return (
        <div className="DeviceCategories">
            <Routes>
                <Route path="/" element={<DeviceCategoriesContainer />} />
                <Route path="/:category/*" element={<DeviceRegistration />} />
            </Routes>
        </div>
    )
}

export default HomeRegistrationContainer;