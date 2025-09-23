import SideBar from '@/components/SideBar/SideBar';

interface SidebarProps {
  onClose: () => void;
}

export default function SidebarPage({ onClose }: SidebarProps) {
  return <SideBar onClose={onClose} />;
}
