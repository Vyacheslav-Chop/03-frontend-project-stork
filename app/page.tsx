'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/useAuthStore';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
// import AddDiaryEntryModal ...

export default function Home() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleFeelingCheckClick = () => {
    if (isLoggedIn) {
      console.log('Open feeling check modal for authorized user');
      //  setIsModalOpen(true);
    } else {
      router.push('/auth/sign-up');
    }
  };

  return (
    <div>
      <div>Home</div>
      <FeelingCheckCard onButtonClick={handleFeelingCheckClick} />

      {/* {isModalOpen && <AddDiaryEntryModal onClose={handleCloseModal} />} */}
    </div>
  );
}
