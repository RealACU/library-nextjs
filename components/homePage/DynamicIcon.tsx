import type { IconType } from "react-icons";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaLock,
  FaThumbsUp,
} from "react-icons/fa";
import {
  MdSearch,
  MdNotifications,
  MdChat,
  MdCameraAlt,
  MdHelp,
} from "react-icons/md";
import {
  IoIosCart,
  IoIosSettings,
  IoIosHeart,
  IoIosStar,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { SiNextdotjs } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import { AiOutlineGoogle, AiOutlineLink, AiFillGithub } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";

interface IconMap {
  [key: string]: IconType;
}

const iconMap: IconMap = {
  "Next.js": SiNextdotjs,
  Home: FaHome,
  User: FaUser,
  Envelope: FaEnvelope,
  Calendar: FaCalendar,
  Lock: FaLock,
  "Thumbs Up": FaThumbsUp,
  Search: MdSearch,
  Notifications: MdNotifications,
  Chat: MdChat,
  Camera: MdCameraAlt,
  Help: MdHelp,
  Card: IoIosCart,
  Settings: IoIosSettings,
  Heart: IoIosHeart,
  Star: IoIosStar,
  Information: IoIosInformationCircleOutline,
  Controller: IoGameController,
  Link: AiOutlineLink,
  Code: BiCodeAlt,
  Google: AiOutlineGoogle,
  GitHub: AiFillGithub,
};

export const iconNamesList: string[] = Object.keys(iconMap);

interface DynamicIconProps {
  iconName?: string;
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size,
  className,
}) => {
  if (!iconName) {
    return <SiNextdotjs size={size} className={className} />;
  }

  const Icon = iconMap[iconName];
  if (!Icon) {
    // Return Next.js logo as the default icon
    return <SiNextdotjs size={size} className={className} />;
  }

  return <Icon size={size} className={className} />;
};

export default DynamicIcon;
