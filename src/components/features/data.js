import { FcDataConfiguration } from "react-icons/fc";
import { GiWhirlpoolShuriken } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";
import { RiRemoteControl2Line } from "react-icons/ri";


export const FeatureList = [
  {
    id: 1,
    icon: <FcDataConfiguration color="#ffff" size={22} />,
    heading: "SECURED SOLUTION",
    text: "Authorized access to device via Azure cloud ",
  },
  {
    id: 2,
    icon: <GiWhirlpoolShuriken color="#ffff" size={22} />,
    heading: "MAINTAINING POOL OF DEVICES",
    text: "Connecting conventional non-smart devices and smart-devices with a common home hub",
  },
  {
    id: 3,
    
    icon: <MdSecurity color="#fff" size={22} />,
    heading: "DEVICES CONFIGURATION",
    text: "Maintaining fully secure database of registered users and devices",
  },
  {
    id: 4,
    icon: <RiRemoteControl2Line color="#fff" size={22} />,
    heading: "TAKE CONTROL",
    text: "Segregation of users control for each device",
  }
];
